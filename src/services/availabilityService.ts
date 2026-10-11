import type { AdminBooking } from "../types/admin";
import type { BookingStatus } from "../types/dashboard";
import { getAllBookings } from "./bookingStorage";

// Only these statuses hold a room. Cancelled and Completed bookings do not.
const BLOCKING_STATUSES: BookingStatus[] = ["Confirmed", "Pending"];

export interface AvailabilityResult {
  available: boolean;
  reason?: "invalid-dates" | "booked";
}

// Parses a strict YYYY-MM-DD string to a UTC timestamp (no timezone drift).
// Returns null for malformed or impossible dates.
function parseIsoDate(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  const time = Date.UTC(year, month - 1, day);
  const date = new Date(time);

  const isSameDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  return isSameDate ? time : null;
}

// True for a real calendar date in YYYY-MM-DD format.
export function isValidIsoDate(value: string): boolean {
  return parseIsoDate(value) !== null;
}

// True when the date is before today (today itself is allowed).
// Invalid dates return false: they are reported by isValidIsoDate instead.
export function isPastDate(value: string): boolean {
  const time = parseIsoDate(value);
  if (time === null) return false;

  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return time < today;
}

// A stay needs two valid dates, with check-out after check-in.
export function isValidStayRange(checkIn: string, checkOut: string): boolean {
  const start = parseIsoDate(checkIn);
  const end = parseIsoDate(checkOut);
  return start !== null && end !== null && end > start;
}

// Two stays overlap when each starts before the other ends.
// A stay ending on the day another one starts is NOT an overlap.
export function datesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
): boolean {
  const aStart = parseIsoDate(startA);
  const aEnd = parseIsoDate(endA);
  const bStart = parseIsoDate(startB);
  const bEnd = parseIsoDate(endB);

  if (aStart === null || aEnd === null || bStart === null || bEnd === null) {
    return false;
  }

  return aStart < bEnd && aEnd > bStart;
}

export function findConflictingBookings(
  roomId: number,
  checkIn: string,
  checkOut: string,
  bookings: AdminBooking[] = getAllBookings(),
): AdminBooking[] {
  return bookings.filter(
    (booking) =>
      booking.roomId === roomId &&
      BLOCKING_STATUSES.includes(booking.status) &&
      datesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut),
  );
}

// Data source for now: static bookings + bookings saved locally
// (see bookingStorage.ts). Later, only the body of this function changes to
// call the real API.
export function checkRoomAvailability(
  roomId: number,
  checkIn: string,
  checkOut: string,
): Promise<AvailabilityResult> {
  if (!isValidStayRange(checkIn, checkOut)) {
    return Promise.resolve<AvailabilityResult>({
      available: false,
      reason: "invalid-dates",
    });
  }

  const conflicts = findConflictingBookings(roomId, checkIn, checkOut);

  return Promise.resolve<AvailabilityResult>(
    conflicts.length === 0
      ? { available: true }
      : { available: false, reason: "booked" },
  );
}