import type { AuthUser, StoredUser } from "../types/auth";

// TEMPORARY: local storage for mock authentication (no backend yet).
const USERS_KEY = "grand-hotel:users";
const SESSION_KEY = "grand-hotel:session";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isAuthUser(value: unknown): value is AuthUser {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.fullName === "string" &&
    typeof value.email === "string"
  );
}

function isStoredUser(value: unknown): value is StoredUser {
  if (!isRecord(value) || !isAuthUser(value)) return false;

  return (
    typeof value.passwordSalt === "string" &&
    typeof value.passwordHash === "string" &&
    typeof value.createdAt === "string"
  );
}

export function readUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isStoredUser) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: StoredUser[]): void {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSessionFrom(storage: Storage): AuthUser | null {
  try {
    const raw = storage.getItem(SESSION_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return isAuthUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function readSession(): AuthUser | null {
  return (
    readSessionFrom(window.localStorage) ??
    readSessionFrom(window.sessionStorage)
  );
}

// persistent = true  -> localStorage (survives closing the browser)
// persistent = false -> sessionStorage (survives refresh, ends with the tab)
export function saveSession(user: AuthUser, persistent: boolean): void {
  clearSession();

  const storage = persistent ? window.localStorage : window.sessionStorage;
  storage.setItem(
    SESSION_KEY,
    JSON.stringify({ id: user.id, fullName: user.fullName, email: user.email }),
  );
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}