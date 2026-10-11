import type { Room } from "../types/room";
import { getRoomImages } from "../utils/roomImages";

// TEMPORARY: static sample data for the UI only (no API yet).
// Ids 1-3 are the rooms shown in "Featured Rooms" on the Home page.
// Photos are not written here: they are attached below from
// src/assets/images/rooms/<Room-Name>/ by the room's name.
const roomData: Room[] = [
  {
    id: 1,
    name: "Deluxe Room",
    type: "Deluxe",
    description:
      "A calm, elegant retreat with refined furnishings and generous natural light.",
    price: 240,
    guests: 2,
    size: 35,
    bed: "King Bed",
    tone: "a",
  },
  {
    id: 2,
    name: "Executive Suite",
    type: "Suite",
    description:
      "A spacious suite with a separate living area, designed for comfort and privacy.",
    price: 420,
    guests: 3,
    size: 55,
    bed: "King Bed",
    tone: "b",
  },
  {
    id: 3,
    name: "Presidential Suite",
    type: "Signature",
    description:
      "Our most exclusive address, with two bedrooms and a private lounge.",
    price: 890,
    guests: 4,
    size: 90,
    bed: "Two Bedrooms",
    tone: "c",
  },
  {
    id: 4,
    name: "Classic Twin Room",
    type: "Classic",
    description:
      "A quiet, well-appointed room with two single beds, ideal for friends or colleagues.",
    price: 190,
    guests: 2,
    size: 30,
    bed: "Twin Beds",
    tone: "b",
  },
  {
    id: 5,
    name: "Junior Suite",
    type: "Suite",
    description:
      "An airy suite with a comfortable sitting corner and elegant finishing touches.",
    price: 340,
    guests: 2,
    size: 45,
    bed: "King Bed",
    tone: "c",
  },
  {
    id: 6,
    name: "Family Suite",
    type: "Family",
    description:
      "Generous space for the whole family, with flexible sleeping arrangements.",
    price: 520,
    guests: 4,
    size: 65,
    bed: "King + Twin Beds",
    tone: "a",
  },
  {
    id: 7,
    name: "Superior Room",
    type: "Superior",
    description:
      "A refined room with a larger layout, a writing desk, and soft, warm lighting.",
    price: 280,
    guests: 2,
    size: 40,
    bed: "King Bed",
    tone: "b",
  },
  {
    id: 8,
    name: "Deluxe Twin Room",
    type: "Deluxe",
    description:
      "Two comfortable single beds in a bright, elegant room with a relaxed seating area.",
    price: 260,
    guests: 2,
    size: 38,
    bed: "Twin Beds",
    tone: "c",
  },
  {
    id: 9,
    name: "Premier Suite",
    type: "Suite",
    description:
      "A graceful suite with a distinct living space, ideal for longer, more comfortable stays.",
    price: 380,
    guests: 3,
    size: 50,
    bed: "King Bed",
    tone: "a",
  },
];

export const rooms: Room[] = roomData.map((room) => {
  const images = getRoomImages(room.name);

  return {
    ...room,
    image: images.main,
    gallery: images.gallery,
  };
});