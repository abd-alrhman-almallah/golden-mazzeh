import type { ReactNode } from "react";
import type { Room } from "./room";
import type { UserBooking } from "./dashboard";

export type RoomStatus = "Available" | "Occupied";

export interface AdminBooking extends UserBooking {
  /** Guest full name */
  guest: string;
}

export interface AdminRoomRow {
  room: Room;
  status: RoomStatus;
}

export interface AdminStat {
  label: string;
  value: string;
  hint: string;
}

export interface AdminColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}