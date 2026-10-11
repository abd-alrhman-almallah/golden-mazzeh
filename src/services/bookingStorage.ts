import { adminBookings } from "../data/adminBookings";
import { mockBookings } from "../data/mockBookings";
import type { AdminBooking } from "../types/admin";
import type { AuthUser } from "../types/auth";
import type { BookingStatus, UserBooking } from "../types/dashboard";
import { isDemoUser } from "../utils/userProfile";

// TEMPORARY: local persistence until a real backend exists.
// Original mock data is never modified; new bookings are stored separately.
const STORAGE_KEY = "grand-hotel:local-bookings";

const STATUSES: BookingStatus[] = [
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredBooking(value: unknown): value is AdminBooking {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.guest === "string" &&
    typeof value.roomId === "number" &&
    typeof value.checkIn === "string" &&
    typeof value.checkOut === "string" &&
    typeof value.guests === "number" &&
    typeof value.rooms === "number" &&
    typeof value.status === "string" &&
    STATUSES.includes(value.status as BookingStatus) &&
    typeof value.bookedOn === "string" &&
    (value.userId === undefined || typeof value.userId === "string")
  );
}

export function readLocalBookings(): AdminBooking[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isStoredBooking) : [];
  } catch {
    return [];
  }
}

export function saveLocalBooking(booking: AdminBooking): void {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...readLocalBookings(), booking]),
  );
}

// Original mock bookings + bookings created locally by the user
export function getAllBookings(): AdminBooking[] {
  return [...adminBookings, ...readLocalBookings()];
}

// Bookings that belong to one signed-in user.
// The demo account (built from mockUser) also owns the original mock bookings.
export function getBookingsForUser(user: AuthUser): UserBooking[] {
  const own = readLocalBookings().filter(
    (booking) => booking.userId === user.id,
  );

  return isDemoUser(user) ? [...mockBookings, ...own] : own;
}

export function getBookingForUser(
  id: string,
  user: AuthUser,
): UserBooking | undefined {
  return getBookingsForUser(user).find((booking) => booking.id === id);
}