import type { Room } from "../types/room";
import type { UserBooking } from "../types/dashboard";

export function getNights(checkIn: string, checkOut: string): number {
  const start = new Date(`${checkIn}T00:00:00`).getTime();
  const end = new Date(`${checkOut}T00:00:00`).getTime();
  return Math.max(1, Math.round((end - start) / 86400000));
}

/** Total for the whole stay: room price x rooms x nights */
export function getBookingTotal(booking: UserBooking, room: Room): number {
  return (
    room.price * booking.rooms * getNights(booking.checkIn, booking.checkOut)
  );
}

export function isUpcoming(booking: UserBooking): boolean {
  const today = new Date().toLocaleDateString("en-CA");
  return (
    (booking.status === "Confirmed" || booking.status === "Pending") &&
    booking.checkIn >= today
  );
}

export function formatDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}