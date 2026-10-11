import { Link } from "react-router-dom";
import { rooms } from "../../data/rooms";
import type { Room } from "../../types/room";

// The rooms shown in "Featured Rooms" (ids from src/data/rooms.ts)
const FEATURED_ROOM_IDS = [1, 2, 3];

const featuredRooms = FEATURED_ROOM_IDS.map((id) =>
  rooms.find((room) => room.id === id),
).filter((room): room is Room => room !== undefined);

function getDetails(room: Room): string[] {
  return [
    `${room.size} m²`,
    `${room.guests} ${room.guests === 1 ? "Guest" : "Guests"}`,
    room.bed,
  ];
}

const styles = `
.gh-rooms {
  background: #FDFDFD;
  color: #04364F;
  padding: 96px 0;
}
.gh-rooms__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.gh-rooms__header {
  max-width: 560px;
  margin-bottom: 64px;
}
.gh-rooms__label {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-rooms__title {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 700;
  line-height: 1.15;
  color: #04364F;
}
.gh-rooms__list {
  display: flex;
  flex-direction: column;
  gap: 72px;
}
.gh-rooms__card {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 56px;
  align-items: center;
}
.gh-rooms__media {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 440px;
  padding: 20px;
  overflow: hidden;
  border-radius: 2px;
}
/* PLACEHOLDERS: shown only when a room has no image */
.gh-rooms__media--a {
  background: linear-gradient(135deg, #04364F 0%, #601E34 100%);
}
.gh-rooms__media--b {
  background: linear-gradient(135deg, #601E34 0%, #04364F 100%);
}
.gh-rooms__media--c {
  background: linear-gradient(200deg, #04364F 0%, #601E34 100%);
}
.gh-rooms__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.gh-rooms__caption {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FDFDFD;
  opacity: 0.8;
}
.gh-rooms__card--reverse .gh-rooms__media {
  order: 2;
}
.gh-rooms__details {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-rooms__name {
  margin: 0 0 16px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 700;
  color: #04364F;
}
.gh-rooms__text {
  margin: 0 0 24px;
  max-width: 420px;
  font-size: 16px;
  line-height: 1.7;
  color: #04364F;
}
.gh-rooms__link {
  display: inline-block;
  padding-bottom: 4px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #601E34;
  text-decoration: none;
  border-bottom: 2px solid #601E34;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.gh-rooms__link:hover {
  color: #04364F;
  border-bottom-color: #04364F;
}
.gh-rooms__footer {
  margin-top: 72px;
  text-align: center;
}
.gh-rooms__all {
  display: inline-block;
  padding: 14px 32px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #04364F;
  text-decoration: none;
  border: 1px solid #04364F;
  border-radius: 2px;
  transition: background 0.2s ease, color 0.2s ease;
}
.gh-rooms__all:hover {
  background: #04364F;
  color: #FDFDFD;
}
.gh-rooms a:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .gh-rooms {
    padding: 64px 0;
  }
  .gh-rooms__header {
    margin-bottom: 40px;
  }
  .gh-rooms__list {
    gap: 56px;
  }
  .gh-rooms__card {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .gh-rooms__media {
    min-height: 300px;
  }
  .gh-rooms__card--reverse .gh-rooms__media {
    order: 0;
  }
  .gh-rooms__footer {
    margin-top: 56px;
  }
}
`;

function FeaturedRooms() {
  return (
    <>
      <style>{styles}</style>
      <section className="gh-rooms" aria-labelledby="gh-rooms-title">
        <div className="gh-rooms__inner">
          <div className="gh-rooms__header">
            <p className="gh-rooms__label">Our Rooms</p>
            <h2 id="gh-rooms-title" className="gh-rooms__title">
              Featured Rooms
            </h2>
          </div>

          <div className="gh-rooms__list">
            {featuredRooms.map((room, index) => (
              <article
                key={room.id}
                className={
                  index % 2 === 1
                    ? "gh-rooms__card gh-rooms__card--reverse"
                    : "gh-rooms__card"
                }
              >
                {room.image ? (
                  <div
                    className={`gh-rooms__media gh-rooms__media--${room.tone}`}
                  >
                    <img src={room.image} alt={room.name} loading="lazy" />
                  </div>
                ) : (
                  <div
                    className={`gh-rooms__media gh-rooms__media--${room.tone}`}
                    role="img"
                    aria-label={`${room.name} image placeholder`}
                  >
                    <span className="gh-rooms__caption">
                      Room image placeholder
                    </span>
                  </div>
                )}

                <div>
                  <p className="gh-rooms__details">
                    {getDetails(room).join(" · ")}
                  </p>
                  <h3 className="gh-rooms__name">{room.name}</h3>
                  <p className="gh-rooms__text">{room.description}</p>
                  <Link to={`/rooms/${room.id}`} className="gh-rooms__link">
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="gh-rooms__footer">
            <Link to="/rooms" className="gh-rooms__all">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedRooms;