import { Link } from "react-router-dom";
import type { Room } from "../../types/room";

interface RoomCardProps {
  room: Room;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const styles = `
.gh-roomcard {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.gh-roomcard:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(4, 54, 79, 0.12);
}
.gh-roomcard__media {
  position: relative;
  display: flex;
  align-items: flex-end;
  aspect-ratio: 4 / 3;
  padding: 16px;
}
/* PLACEHOLDERS: shown only when a room has no image */
.gh-roomcard__media--a {
  background: linear-gradient(135deg, #04364F 0%, #601E34 100%);
}
.gh-roomcard__media--b {
  background: linear-gradient(135deg, #601E34 0%, #04364F 100%);
}
.gh-roomcard__media--c {
  background: linear-gradient(200deg, #04364F 0%, #601E34 100%);
}
.gh-roomcard__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gh-roomcard__caption {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FDFDFD;
  opacity: 0.8;
}
.gh-roomcard__tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background: #FDFDFD;
  color: #04364F;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 2px;
}
.gh-roomcard__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
}
.gh-roomcard__name {
  margin: 0 0 10px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  color: #04364F;
}
.gh-roomcard__text {
  margin: 0 0 20px;
  font-size: 15px;
  line-height: 1.65;
  color: #04364F;
}
.gh-roomcard__meta {
  margin: 0 0 24px;
  padding-top: 16px;
  border-top: 1px solid #EFEFF2;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-roomcard__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
}
.gh-roomcard__from {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-roomcard__price {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 26px;
  font-weight: 700;
  color: #04364F;
}
.gh-roomcard__night {
  font-size: 13px;
  color: #93979A;
}
.gh-roomcard__btn {
  display: inline-block;
  padding: 12px 22px;
  background: #601E34;
  color: #FDFDFD;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  border-radius: 2px;
  transition: background 0.2s ease;
}
.gh-roomcard__btn:hover {
  background: #04364F;
}
.gh-roomcard a:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .gh-roomcard__body {
    padding: 20px;
  }
  .gh-roomcard__name {
    font-size: 22px;
  }
  .gh-roomcard__btn {
    flex: 1 1 100%;
  }
}
`;

function RoomCard({ room }: RoomCardProps) {
  const guestsLabel = room.guests === 1 ? "Guest" : "Guests";

  return (
    <>
      <style>{styles}</style>
      <article className="gh-roomcard">
        <div className={`gh-roomcard__media gh-roomcard__media--${room.tone}`}>
          {room.image ? (
            <img
              className="gh-roomcard__img"
              src={room.image}
              alt={room.name}
              loading="lazy"
            />
          ) : (
            <span className="gh-roomcard__caption">Room image placeholder</span>
          )}
          <span className="gh-roomcard__tag">{room.type}</span>
        </div>

        <div className="gh-roomcard__body">
          <h3 className="gh-roomcard__name">{room.name}</h3>
          <p className="gh-roomcard__text">{room.description}</p>
          <p className="gh-roomcard__meta">
            {room.size} m² · {room.guests} {guestsLabel} · {room.bed}
          </p>

          <div className="gh-roomcard__footer">
            <div>
              <span className="gh-roomcard__from">From</span>
              <span className="gh-roomcard__price">
                {priceFormatter.format(room.price)}
              </span>{" "}
              <span className="gh-roomcard__night">/ night</span>
            </div>
            <Link
              to={`/rooms/${room.id}`}
              className="gh-roomcard__btn"
              aria-label={`View details for ${room.name}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export default RoomCard;