export function getFirstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "";
}

export function getInitials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}