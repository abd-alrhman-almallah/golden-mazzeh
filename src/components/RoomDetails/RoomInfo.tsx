import type { Room } from "../../types/room";

interface RoomInfoProps {
  room: Room;
}

// TEMPORARY: static amenities for the UI only (same list for every room)
const amenities = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Smart TV",
  "Room Service",
  "Mini Bar",
  "Safe",
  "Daily Housekeeping",
];

const styles = `
.gh-roominfo__type {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-roominfo__name {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 4.5vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  color: #04364F;
}
.gh-roominfo__description {
  margin: 0 0 36px;
  max-width: 640px;
  font-size: 17px;
  line-height: 1.7;
  color: #04364F;
}
.gh-roominfo__specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 0 0 48px;
  padding: 0;
  list-style: none;
}
.gh-roominfo__spec {
  padding: 20px;
  background: #EFEFF2;
  border-radius: 2px;
}
.gh-roominfo__spec-label {
  display: block;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-roominfo__spec-value {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 700;
  color: #04364F;
}
.gh-roominfo__heading {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 26px;
  font-weight: 700;
  color: #04364F;
}
.gh-roominfo__amenities {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.gh-roominfo__amenity {
  padding: 14px 0;
  border-bottom: 1px solid #EFEFF2;
  font-size: 15px;
  color: #04364F;
}
.gh-roominfo__amenity::before {
  content: "✓";
  margin-right: 12px;
  font-weight: 700;
  color: #601E34;
}
`;

function RoomInfo({ room }: RoomInfoProps) {
  const guestsLabel = room.guests === 1 ? "Guest" : "Guests";

  return (
    <>
      <style>{styles}</style>
      <div>
        <p className="gh-roominfo__type">{room.type}</p>
        <h1 className="gh-roominfo__name">{room.name}</h1>
        <p className="gh-roominfo__description">{room.description}</p>

        <ul className="gh-roominfo__specs">
          <li className="gh-roominfo__spec">
            <span className="gh-roominfo__spec-label">Guests</span>
            <span className="gh-roominfo__spec-value">
              {room.guests} {guestsLabel}
            </span>
          </li>
          <li className="gh-roominfo__spec">
            <span className="gh-roominfo__spec-label">Room Size</span>
            <span className="gh-roominfo__spec-value">{room.size} m²</span>
          </li>
          <li className="gh-roominfo__spec">
            <span className="gh-roominfo__spec-label">Bed Type</span>
            <span className="gh-roominfo__spec-value">{room.bed}</span>
          </li>
        </ul>

        <h2 className="gh-roominfo__heading">Amenities</h2>
        <ul className="gh-roominfo__amenities">
          {amenities.map((amenity) => (
            <li key={amenity} className="gh-roominfo__amenity">
              {amenity}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RoomInfo;