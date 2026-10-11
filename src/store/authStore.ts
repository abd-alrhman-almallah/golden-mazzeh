import { create } from "zustand";
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from "../services/authService";
import type { AuthUser, LoginInput, RegisterInput } from "../types/auth";

// Global auth state. The current user is restored synchronously from
// storage when the app starts, so a refresh never flashes "signed out".
// All authentication logic stays in authService.ts: this store only keeps
// its result so any component can read it.
interface AuthState {
  user: AuthUser | null;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: getCurrentUser(),

  // AuthError from the service is not caught here: forms show it
  login: async (input) => {
    const user = await loginRequest(input);
    set({ user });
    return user;
  },

  register: async (input) => {
    const user = await registerRequest(input);
    set({ user });
    return user;
  },

  logout: () => {
    logoutRequest();
    set({ user: null });
  },
}));

export const selectIsAuthenticated = (state: AuthState): boolean =>
  state.user !== null;