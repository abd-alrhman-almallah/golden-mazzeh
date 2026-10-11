import type { AdminBooking } from "../types/admin";
import { mockBookings } from "./mockBookings";
import { mockUser } from "./mockUser";

// Dates are relative to today so there are always current, upcoming and past bookings
function daysFromToday(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-CA"); // YYYY-MM-DD
}

// The user dashboard bookings belong to the mock user
const userBookings: AdminBooking[] = mockBookings.map((booking) => ({
  ...booking,
  guest: mockUser.fullName,
}));

// TEMPORARY: extra mock bookings from other guests (no backend yet).
// roomId values match src/data/rooms.ts.
const otherGuestBookings: AdminBooking[] = [
  {
    id: "GH-10560",
    guest: "Olivia Bennett",
    roomId: 1,
    checkIn: daysFromToday(-1),
    checkOut: daysFromToday(2),
    guests: 2,
    rooms: 1,
    status: "Confirmed",
    bookedOn: daysFromToday(-20),
  },
  {
    id: "GH-10561",
    guest: "Daniel Carter",
    roomId: 3,
    checkIn: daysFromToday(0),
    checkOut: daysFromToday(3),
    guests: 3,
    rooms: 1,
    status: "Confirmed",
    bookedOn: daysFromToday(-14),
  },
  {
    id: "GH-10575",
    guest: "Amira Haddad",
    roomId: 6,
    checkIn: daysFromToday(5),
    checkOut: daysFromToday(9),
    guests: 4,
    rooms: 1,
    status: "Pending",
    bookedOn: daysFromToday(-1),
  },
  {
    id: "GH-10588",
    guest: "Lucas Meyer",
    roomId: 5,
    checkIn: daysFromToday(21),
    checkOut: daysFromToday(24),
    guests: 2,
    rooms: 1,
    status: "Confirmed",
    bookedOn: daysFromToday(-6),
  },
  {
    id: "GH-10602",
    guest: "Yusuf Demir",
    roomId: 2,
    checkIn: daysFromToday(30),
    checkOut: daysFromToday(33),
    guests: 3,
    rooms: 1,
    status: "Pending",
    bookedOn: daysFromToday(-3),
  },
  {
    id: "GH-10441",
    guest: "Emma Rossi",
    roomId: 2,
    checkIn: daysFromToday(-20),
    checkOut: daysFromToday(-17),
    guests: 2,
    rooms: 1,
    status: "Completed",
    bookedOn: daysFromToday(-45),
  },
  {
    id: "GH-10312",
    guest: "Noah Williams",
    roomId: 4,
    checkIn: daysFromToday(-50),
    checkOut: daysFromToday(-48),
    guests: 2,
    rooms: 1,
    status: "Completed",
    bookedOn: daysFromToday(-75),
  },
  {
    id: "GH-10209",
    guest: "Sofia Alvarez",
    roomId: 1,
    checkIn: daysFromToday(-65),
    checkOut: daysFromToday(-62),
    guests: 2,
    rooms: 1,
    status: "Cancelled",
    bookedOn: daysFromToday(-90),
  },
];

export const adminBookings: AdminBooking[] = [
  ...userBookings,
  ...otherGuestBookings,
];