import type { AdminBooking } from "../types/admin";
import type { AuthUser } from "../types/auth";
import type { BookingFormValues } from "../types/booking";
import { checkRoomAvailability } from "./availabilityService";
import { getAllBookings, saveLocalBooking } from "./bookingStorage";
import { validateBookingForm } from "./bookingValidation";
import { getRoomById } from "./roomService";

export interface CreateBookingInput {
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  /** Number of rooms requested (stored as-is, there is no room inventory yet) */
  rooms: number;
}

export type BookingErrorCode = "invalid-input" | "unavailable";

export class BookingError extends Error {
  readonly code: BookingErrorCode;

  constructor(message: string, code: BookingErrorCode) {
    super(message);
    this.name = "BookingError";
    this.code = code;
  }
}

// Next ID in the existing GH-NNNNN format
function generateBookingId(): string {
  const highest = getAllBookings().reduce((max, booking) => {
    const match = /^GH-(\d+)$/.exec(booking.id);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 10000);

  return `GH-${highest + 1}`;
}

// Data source for now: localStorage (see bookingStorage.ts).
// Later, only the body of this function changes to call the real API.
export async function createBooking(
  input: CreateBookingInput,
  user: AuthUser,
): Promise<AdminBooking> {
  const room = await getRoomById(input.roomId);

  // Same rules as the booking form (see bookingValidation.ts)
  const values: BookingFormValues = {
    roomId: String(input.roomId),
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: String(input.guests),
    rooms: String(input.rooms),
  };
  const errors = validateBookingForm(values, room);
  const firstError = Object.values(errors).find(Boolean);

  if (!room || firstError) {
    throw new BookingError(
      firstError ?? "Invalid booking details.",
      "invalid-input",
    );
  }

  // Re-check availability here, not only in the UI
  const availability = await checkRoomAvailability(
    room.id,
    input.checkIn,
    input.checkOut,
  );
  if (!availability.available) {
    throw new BookingError(
      "This room is no longer available for the selected dates.",
      availability.reason === "booked" ? "unavailable" : "invalid-input",
    );
  }

  const booking: AdminBooking = {
    id: generateBookingId(),
    guest: user.fullName,
    userId: user.id,
    roomId: room.id,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    rooms: input.rooms,
    status: "Pending",
    bookedOn: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD
  };

  saveLocalBooking(booking);
  return booking;
}