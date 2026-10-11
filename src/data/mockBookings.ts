import type { UserBooking } from "../types/dashboard";

// Dates are relative to today so there are always upcoming and past bookings
function daysFromToday(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-CA"); // YYYY-MM-DD
}

// TEMPORARY: mock bookings for the UI only (no backend yet).
// roomId values match src/data/rooms.ts. Set this to [] to preview empty states.
export const mockBookings: UserBooking[] = [
  {
    id: "GH-10482",
    roomId: 2,
    checkIn: daysFromToday(14),
    checkOut: daysFromToday(17),
    guests: 2,
    rooms: 1,
    status: "Confirmed",
    bookedOn: daysFromToday(-9),
  },
  {
    id: "GH-10517",
    roomId: 1,
    checkIn: daysFromToday(48),
    checkOut: daysFromToday(52),
    guests: 2,
    rooms: 1,
    status: "Pending",
    bookedOn: daysFromToday(-2),
  },
  {
    id: "GH-10390",
    roomId: 4,
    checkIn: daysFromToday(-12),
    checkOut: daysFromToday(-10),
    guests: 3,
    rooms: 2,
    status: "Completed",
    bookedOn: daysFromToday(-40),
  },
  {
    id: "GH-10233",
    roomId: 6,
    checkIn: daysFromToday(-30),
    checkOut: daysFromToday(-26),
    guests: 4,
    rooms: 1,
    status: "Completed",
    bookedOn: daysFromToday(-70),
  },
  {
    id: "GH-10091",
    roomId: 3,
    checkIn: daysFromToday(-95),
    checkOut: daysFromToday(-93),
    guests: 3,
    rooms: 1,
    status: "Completed",
    bookedOn: daysFromToday(-120),
  },
  {
    id: "GH-09874",
    roomId: 5,
    checkIn: daysFromToday(-140),
    checkOut: daysFromToday(-137),
    guests: 2,
    rooms: 1,
    status: "Cancelled",
    bookedOn: daysFromToday(-160),
  },
];