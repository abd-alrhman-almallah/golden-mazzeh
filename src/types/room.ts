export type RoomTone = "a" | "b" | "c";

export interface Room {
  id: number;
  name: string;
  /** Short category label shown on the card image */
  type: string;
  description: string;
  /** Optional image URL. When missing, a placeholder is shown. */
  image?: string;
  /** Optional photos shown in the room gallery (main photo first) */
  gallery?: string[];
  /** Price per night (USD) */
  price: number;
  guests: number;
  /** Room size in m² */
  size: number;
  bed: string;
  /** Placeholder gradient variant */
  tone: RoomTone;
}