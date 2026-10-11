import RoomCard from "./RoomCard";
import type { Room } from "../../types/room";

interface RoomListProps {
  rooms: Room[];
}

const styles = `
.gh-roomlist {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 1024px) {
  .gh-roomlist {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }
}
@media (max-width: 640px) {
  .gh-roomlist {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
`;

function RoomList({ rooms }: RoomListProps) {
  return (
    <>
      <style>{styles}</style>
      <ul className="gh-roomlist">
        {rooms.map((room) => (
          <li key={room.id}>
            <RoomCard room={room} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default RoomList;