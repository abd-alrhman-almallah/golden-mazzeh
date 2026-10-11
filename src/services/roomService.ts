import { rooms } from "../data/rooms";
import type { Room } from "../types/room";

// Data source for now: static data in src/data/rooms.ts.
// Later (Step 19+), only the bodies of these functions change to call the
// real API through apiRequest. The signatures stay the same.

export function getRooms(): Promise<Room[]> {
  return Promise.resolve([...rooms]);
}

export function getRoomById(id: number): Promise<Room | undefined> {
  return Promise.resolve(rooms.find((room) => room.id === id));
}