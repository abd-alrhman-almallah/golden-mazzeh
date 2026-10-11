import { mockUser } from "../data/mockUser";
import type { AuthUser } from "../types/auth";
import type { UserProfile } from "../types/dashboard";

// The demo account is built from mockUser (see authService.ts).
// This is the single place that decides who the demo user is.
export function isDemoUser(user: AuthUser): boolean {
  return user.email === mockUser.email.trim().toLowerCase();
}

// Profile data for the signed-in user. The auth account only stores name and
// email, so phone and country exist only for the demo user (from mockUser).
export function getUserProfile(user: AuthUser): UserProfile {
  if (isDemoUser(user)) {
    return { ...mockUser, fullName: user.fullName, email: user.email };
  }

  return {
    fullName: user.fullName,
    email: user.email,
    phone: "",
    country: "",
  };
}