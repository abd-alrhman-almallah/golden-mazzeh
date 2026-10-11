export type BookingStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

export interface UserBooking {
  /** Booking ID shown to the user, also used in /dashboard/bookings/:id */
  id: string;
  /** Points to a room in src/data/rooms.ts */
  roomId: number;
  /** ISO dates (YYYY-MM-DD) */
  checkIn: string;
  checkOut: string;
  guests: number;
  /** Number of rooms booked */
  rooms: number;
  status: BookingStatus;
  /** ISO date the booking was made */
  bookedOn: string;
  /** Owner of a booking created in the app (absent on the original mock data) */
  userId?: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  country: string;
}