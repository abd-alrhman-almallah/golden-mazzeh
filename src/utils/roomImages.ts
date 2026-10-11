// Room photos live in src/assets/images/rooms/<Room-Name>/main.webp and
// second.webp. A folder is matched to a room by the room's name:
//   "Deluxe Twin Room" -> "deluxe-twin-room" -> rooms/Deluxe-Twin-Room/
// rooms-hero.webp sits directly in rooms/ (not inside a room folder), so the
// "*/*.webp" pattern below never picks it up.

const imageModules = import.meta.glob<string>(
  "../assets/images/rooms/*/*.webp",
  { eager: true, import: "default" },
);

interface RoomImageFiles {
  main?: string;
  second?: string;
}

const imagesByFolder: Record<string, RoomImageFiles | undefined> = {};

for (const [path, url] of Object.entries(imageModules)) {
  const match = /\/rooms\/([^/]+)\/([^/]+)\.webp$/i.exec(path);
  if (!match) continue;

  const folder = match[1].toLowerCase();
  const file = match[2].toLowerCase();
  const files = imagesByFolder[folder] ?? {};

  if (file === "main") files.main = url;
  if (file === "second") files.second = url;

  imagesByFolder[folder] = files;
}

// The "Executive Suite" photos are in a folder spelled "Executiv-Suite".
// Once that folder is renamed to "Executive-Suite" this line is no longer
// needed (the exact match is used first), and it can be removed.
const FOLDER_ALIASES: Record<string, string | undefined> = {
  "executive-suite": "executiv-suite",
};

function toFolderKey(roomName: string): string {
  return roomName.trim().toLowerCase().replace(/\s+/g, "-");
}

export interface RoomImages {
  /** The first available photo (main.webp) */
  main?: string;
  /** Every available photo, in order: main, then second */
  gallery: string[];
}

// A missing photo is simply left out, so the UI falls back to its placeholder.
export function getRoomImages(roomName: string): RoomImages {
  const key = toFolderKey(roomName);
  const aliasKey = FOLDER_ALIASES[key];
  const files =
    imagesByFolder[key] ?? (aliasKey ? imagesByFolder[aliasKey] : undefined);

  const gallery = [files?.main, files?.second].filter(
    (url): url is string => Boolean(url),
  );

  return { main: gallery[0], gallery };
}