import { mockUser } from "../data/mockUser";
import type {
  AuthUser,
  LoginInput,
  RegisterInput,
  StoredUser,
} from "../types/auth";
import {
  clearSession,
  readSession,
  readUsers,
  saveSession,
  saveUsers,
} from "./authStorage";

// TEMPORARY MOCK AUTHENTICATION (frontend only, NOT production-secure).
// Everything lives in the browser, so anyone with access to it can read it.
// Passwords are hashed (SHA-256 + salt) only so they are not stored as plain
// text. Later, only the bodies of the functions below change to call a real
// API. The signatures stay the same.

// Demo account built from mockUser so there is always a valid login to test
const DEMO_PASSWORD = "Welcome123";

export type AuthErrorCode = "invalid-credentials" | "email-taken";

export class AuthError extends Error {
  readonly code: AuthErrorCode;

  constructor(message: string, code: AuthErrorCode) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

function randomHex(byteCount: number): string {
  const bytes = new Uint8Array(byteCount);
  crypto.getRandomValues(bytes);
  return toHex(bytes);
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(new Uint8Array(digest));
}

function toAuthUser(user: StoredUser): AuthUser {
  return { id: user.id, fullName: user.fullName, email: user.email };
}

async function ensureDemoUser(): Promise<void> {
  const email = normalizeEmail(mockUser.email);
  if (readUsers().some((user) => user.email === email)) return;

  const salt = randomHex(16);
  const passwordHash = await hashPassword(DEMO_PASSWORD, salt);

  // Read again after the await so we never overwrite a newer list
  const users = readUsers();
  if (users.some((user) => user.email === email)) return;

  saveUsers([
    ...users,
    {
      id: "user-demo",
      fullName: mockUser.fullName,
      email,
      passwordSalt: salt,
      passwordHash,
      createdAt: new Date().toISOString(),
    },
  ]);
}

export async function register(input: RegisterInput): Promise<AuthUser> {
  const email = normalizeEmail(input.email);

  await ensureDemoUser();

  const salt = randomHex(16);
  const passwordHash = await hashPassword(input.password, salt);

  // Check and save without awaiting in between
  const users = readUsers();
  if (users.some((user) => user.email === email)) {
    throw new AuthError(
      "An account with this email already exists.",
      "email-taken",
    );
  }

  const user: StoredUser = {
    id: `user-${randomHex(8)}`,
    fullName: input.fullName.trim(),
    email,
    passwordSalt: salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);

  // Sign the new user in right away
  const authUser = toAuthUser(user);
  saveSession(authUser, true);
  return authUser;
}

export async function login(input: LoginInput): Promise<AuthUser> {
  const email = normalizeEmail(input.email);

  await ensureDemoUser();

  const user = readUsers().find((item) => item.email === email);
  const passwordHash = user
    ? await hashPassword(input.password, user.passwordSalt)
    : null;

  // Same error for unknown email and wrong password
  if (!user || passwordHash !== user.passwordHash) {
    throw new AuthError("Invalid email or password.", "invalid-credentials");
  }

  const authUser = toAuthUser(user);
  saveSession(authUser, input.rememberMe);
  return authUser;
}

export function logout(): void {
  clearSession();
}

// The signed-in user (restored after a refresh), or null when signed out
export function getCurrentUser(): AuthUser | null {
  return readSession();
}