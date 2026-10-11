export type GuestStatus = "Active" | "Inactive";

export interface Guest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  /** Number of bookings made by this guest */
  bookingsCount: number;
  status: GuestStatus;
}