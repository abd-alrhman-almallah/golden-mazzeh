import type { Guest } from "../types/guest";
import { adminBookings } from "./adminBookings";
import { mockUser } from "./mockUser";

type GuestSeed = Omit<Guest, "bookingsCount">;

// TEMPORARY: mock guests for the UI only (no backend yet).
// Guest names match the guests in src/data/adminBookings.ts.
// The admin pages read them through src/services/adminService.ts.
export const guestSeeds: GuestSeed[] = [
  {
    id: "G-1001",
    fullName: mockUser.fullName,
    email: mockUser.email,
    phone: mockUser.phone,
    country: mockUser.country,
    status: "Active",
  },
  {
    id: "G-1002",
    fullName: "Olivia Bennett",
    email: "olivia.bennett@example.com",
    phone: "+61 2 5550 0142",
    country: "Australia",
    status: "Active",
  },
  {
    id: "G-1003",
    fullName: "Daniel Carter",
    email: "daniel.carter@example.com",
    phone: "+1 555 010 4477",
    country: "United States",
    status: "Active",
  },
  {
    id: "G-1004",
    fullName: "Amira Haddad",
    email: "amira.haddad@example.com",
    phone: "+971 4 555 0186",
    country: "United Arab Emirates",
    status: "Active",
  },
  {
    id: "G-1005",
    fullName: "Lucas Meyer",
    email: "lucas.meyer@example.com",
    phone: "+49 30 5550 0129",
    country: "Germany",
    status: "Active",
  },
  {
    id: "G-1006",
    fullName: "Yusuf Demir",
    email: "yusuf.demir@example.com",
    phone: "+90 212 555 0173",
    country: "Türkiye",
    status: "Active",
  },
  {
    id: "G-1007",
    fullName: "Emma Rossi",
    email: "emma.rossi@example.com",
    phone: "+39 06 5550 0118",
    country: "Italy",
    status: "Active",
  },
  {
    id: "G-1008",
    fullName: "Noah Williams",
    email: "noah.williams@example.com",
    phone: "+1 555 010 8821",
    country: "Canada",
    status: "Inactive",
  },
  {
    id: "G-1009",
    fullName: "Sofia Alvarez",
    email: "sofia.alvarez@example.com",
    phone: "+34 91 555 0164",
    country: "Spain",
    status: "Inactive",
  },
  {
    id: "G-1010",
    fullName: "Karim Nasser",
    email: "karim.nasser@example.com",
    phone: "+20 2 5550 0137",
    country: "Egypt",
    status: "Active",
  },
  {
    id: "G-1011",
    fullName: "Hannah Schmidt",
    email: "hannah.schmidt@example.com",
    phone: "+43 1 5550 0155",
    country: "Austria",
    status: "Inactive",
  },
];

// Static count from the original mock bookings only (kept for compatibility).
// The admin pages use getAdminGuests() in adminService.ts, which also counts
// bookings created in the app.
export const adminGuests: Guest[] = guestSeeds.map((guest) => ({
  ...guest,
  bookingsCount: adminBookings.filter(
    (booking) => booking.guest === guest.fullName
  ).length,
}));