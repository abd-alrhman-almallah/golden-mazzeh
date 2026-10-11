import type { UserProfile } from "../types/dashboard";

// TEMPORARY: mock user for the UI only (no real authentication yet)
export const mockUser: UserProfile = {
  fullName: "Sarah Mitchell",
  email: "sarah.mitchell@example.com",
  phone: "+44 20 7946 0123",
  country: "United Kingdom",
};