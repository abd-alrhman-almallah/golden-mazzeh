function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Where to go after a successful login/register.
// ProtectedRoute sends the page the user wanted in location.state.from.
// Anything missing or unsafe falls back to "/".
export function getPostAuthRedirect(state: unknown): string {
  if (!isRecord(state) || !isRecord(state.from)) return "/";

  const { pathname, search, hash } = state.from;

  // Must be an in-app path: starts with "/" but not "//" or "/\"
  if (typeof pathname !== "string" || !/^\/(?![/\\])/.test(pathname)) {
    return "/";
  }

  // Never send the user back to the auth pages themselves
  if (pathname === "/login" || pathname === "/register") return "/";

  return `${pathname}${typeof search === "string" ? search : ""}${
    typeof hash === "string" ? hash : ""
  }`;
}