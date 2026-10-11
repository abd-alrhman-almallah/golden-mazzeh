import type { Room } from "../types/room";
import type { AdminBooking, AdminStat, RoomStatus } from "../types/admin";
import { getBookingTotal } from "./bookings";
import { formatPrice } from "./formatPrice";

/** A room is occupied when a confirmed booking is currently in-house */
export function getRoomStatus(
  roomId: number,
  bookings: AdminBooking[]
): RoomStatus {
  const today = new Date().toLocaleDateString("en-CA");
  const isOccupied = bookings.some(
    (booking) =>
      booking.roomId === roomId &&
      booking.status === "Confirmed" &&
      booking.checkIn <= today &&
      today < booking.checkOut
  );
  return isOccupied ? "Occupied" : "Available";
}

export function getAdminStats(
  rooms: Room[],
  bookings: AdminBooking[]
): AdminStat[] {
  const occupied = rooms.filter(
    (room) => getRoomStatus(room.id, bookings) === "Occupied"
  ).length;

  // Mock revenue: confirmed and completed stays only
  const revenue = bookings.reduce((sum, booking) => {
    if (booking.status !== "Confirmed" && booking.status !== "Completed") {
      return sum;
    }
    const room = rooms.find((item) => item.id === booking.roomId);
    return room ? sum + getBookingTotal(booking, room) : sum;
  }, 0);

  return [
    {
      label: "Total Rooms",
      value: String(rooms.length),
      hint: "Room types in the hotel",
    },
    {
      label: "Available Rooms",
      value: String(rooms.length - occupied),
      hint: "Ready to be booked",
    },
    {
      label: "Occupied Rooms",
      value: String(occupied),
      hint: "Currently in-house",
    },
    {
      label: "Total Bookings",
      value: String(bookings.length),
      hint: "All statuses",
    },
    {
      label: "Revenue",
      value: formatPrice(revenue),
      hint: "Confirmed and completed stays",
    },
  ];
}