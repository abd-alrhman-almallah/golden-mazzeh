import { Link } from "react-router-dom";
import { rooms } from "../../data/rooms";
import type { UserBooking } from "../../types/dashboard";
import {
  formatDate,
  getBookingTotal,
  getNights,
} from "../../utils/bookings";
import { formatPrice } from "../../utils/formatPrice";

interface BookingCardProps {
  booking: UserBooking;
}

const styles = `
.gh-bcard {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  overflow: hidden;
}
.gh-bcard__thumb {
  position: relative;
  overflow: hidden;
}
.gh-bcard__thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* PLACEHOLDERS: shown only when a room has no image */
.gh-bcard__thumb--a {
  background: linear-gradient(135deg, #04364F 0%, #601E34 100%);
}
.gh-bcard__thumb--b {
  background: linear-gradient(135deg, #601E34 0%, #04364F 100%);
}
.gh-bcard__thumb--c {
  background: linear-gradient(200deg, #04364F 0%, #601E34 100%);
}
.gh-bcard__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}
.gh-bcard__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.gh-bcard__name {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  color: #04364F;
}
.gh-bcard__status {
  flex-shrink: 0;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-radius: 2px;
}
.gh-bcard__status--confirmed {
  background: #04364F;
  color: #FDFDFD;
}
.gh-bcard__status--pending {
  background: #EFEFF2;
  color: #04364F;
}
.gh-bcard__status--completed {
  background: #FDFDFD;
  color: #04364F;
  border-color: rgba(4, 54, 79, 0.3);
}
.gh-bcard__status--cancelled {
  background: #FDFDFD;
  color: #601E34;
  border-color: #601E34;
}
.gh-bcard__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 16px;
  margin: 0;
}
.gh-bcard__label {
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-bcard__value {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #04364F;
}
.gh-bcard__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #EFEFF2;
}
.gh-bcard__price {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 700;
  color: #04364F;
}
.gh-bcard__nights {
  margin-left: 8px;
  font-size: 13px;
  color: #93979A;
}

@media (max-width: 640px) {
  .gh-bcard {
    grid-template-columns: minmax(0, 1fr);
  }
  .gh-bcard__thumb {
    min-height: 120px;
  }
  .gh-bcard__body {
    padding: 20px;
  }
  .gh-bcard__footer {
    flex-wrap: wrap;
  }
}
`;

function BookingCard({ booking }: BookingCardProps) {
  const room = rooms.find((item) => item.id === booking.roomId);
  if (!room) return null;

  const nights = getNights(booking.checkIn, booking.checkOut);
  const guestsLabel = booking.guests === 1 ? "Guest" : "Guests";
  const roomsLabel = booking.rooms === 1 ? "Room" : "Rooms";

  const details = [
    { label: "Booking ID", value: booking.id },
    { label: "Check-in", value: formatDate(booking.checkIn) },
    { label: "Check-out", value: formatDate(booking.checkOut) },
    {
      label: "Guests",
      value:
        booking.rooms > 1
          ? `${booking.guests} ${guestsLabel} · ${booking.rooms} ${roomsLabel}`
          : `${booking.guests} ${guestsLabel}`,
    },
  ];

  return (
    <>
      <style>{styles}</style>
      <article className="gh-dash__card gh-bcard">
        {room.image ? (
          <div className={`gh-bcard__thumb gh-bcard__thumb--${room.tone}`}>
            <img src={room.image} alt={room.name} loading="lazy" />
          </div>
        ) : (
          <div
            className={`gh-bcard__thumb gh-bcard__thumb--${room.tone}`}
            role="img"
            aria-label={`${room.name} image placeholder`}
          />
        )}

        <div className="gh-bcard__body">
          <div className="gh-bcard__top">
            <h3 className="gh-bcard__name">{room.name}</h3>
            <span
              className={`gh-bcard__status gh-bcard__status--${booking.status.toLowerCase()}`}
            >
              {booking.status}
            </span>
          </div>

          <dl className="gh-bcard__meta">
            {details.map((detail) => (
              <div key={detail.label}>
                <dt className="gh-bcard__label">{detail.label}</dt>
                <dd className="gh-bcard__value">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <div className="gh-bcard__footer">
            <div>
              <span className="gh-bcard__price">
                {formatPrice(getBookingTotal(booking, room))}
              </span>
              <span className="gh-bcard__nights">
                {nights} {nights === 1 ? "night" : "nights"}
              </span>
            </div>
            <Link
              to={`/dashboard/bookings/${booking.id}`}
              className="gh-dash__btn gh-dash__btn--outline"
              aria-label={`View details for booking ${booking.id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export default BookingCard;