import { guestSeeds } from "../data/adminGuests";
import { rooms } from "../data/rooms";
import type { AdminBooking, AdminRoomRow, AdminStat } from "../types/admin";
import type { Guest } from "../types/guest";
import { getAdminStats, getRoomStatus } from "../utils/admin";
import { readUsers } from "./authStorage";
import { getAllBookings } from "./bookingStorage";

// Data source for the admin pages: the same bookings, rooms and users the rest
// of the app uses (original mock bookings + bookings saved locally + signed-up
// users). Later, only the bodies of these functions change to call a real API.

export function getAdminBookings(): AdminBooking[] {
  return getAllBookings();
}

export function getAdminRoomRows(): AdminRoomRow[] {
  const bookings = getAllBookings();

  return rooms.map((room) => ({
    room,
    status: getRoomStatus(room.id, bookings),
  }));
}

// Demo guests + every account that signed up in the app
export function getAdminGuests(): Guest[] {
  const bookings = getAllBookings();
  const seedEmails = new Set(
    guestSeeds.map((guest) => guest.email.trim().toLowerCase()),
  );

  // Demo guests are matched to bookings by name, as before
  const seededGuests: Guest[] = guestSeeds.map((guest) => ({
    ...guest,
    bookingsCount: bookings.filter(
      (booking) => booking.guest === guest.fullName,
    ).length,
  }));

  // Signed-up accounts own their bookings through userId.
  // An account whose email belongs to a demo guest is not listed twice.
  const registeredGuests: Guest[] = readUsers()
    .filter((user) => !seedEmails.has(user.email))
    .map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: "",
      country: "",
      bookingsCount: bookings.filter((booking) => booking.userId === user.id)
        .length,
      status: "Active" as const,
    }));

  return [...seededGuests, ...registeredGuests];
}

export function getAdminDashboardStats(): AdminStat[] {
  const guests = getAdminGuests();
  const activeGuests = guests.filter((guest) => guest.status === "Active");

  return [
    ...getAdminStats(rooms, getAllBookings()),
    {
      label: "Guests",
      value: String(guests.length),
      hint: `${activeGuests.length} active`,
    },
  ];
}