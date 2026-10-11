import { Link, useParams } from "react-router-dom";
import EmptyState from "../../components/Dashboard/EmptyState";
import { rooms } from "../../data/rooms";
import { getBookingForUser } from "../../services/bookingStorage";
import { useAuthStore } from "../../store/authStore";
import {
  formatDate,
  getBookingTotal,
  getNights,
} from "../../utils/bookings";
import { formatPrice } from "../../utils/formatPrice";

const styles = `
.gh-bdetails__back {
  display: inline-block;
  margin-bottom: 20px;
}
.gh-bdetails__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
}
.gh-bdetails__status {
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-radius: 2px;
}
.gh-bdetails__status--confirmed {
  background: #04364F;
  color: #FDFDFD;
}
.gh-bdetails__status--pending {
  background: #EFEFF2;
  color: #04364F;
  border-color: rgba(4, 54, 79, 0.3);
}
.gh-bdetails__status--completed {
  background: #FDFDFD;
  color: #04364F;
  border-color: rgba(4, 54, 79, 0.3);
}
.gh-bdetails__status--cancelled {
  background: #FDFDFD;
  color: #601E34;
  border-color: #601E34;
}
.gh-bdetails__card {
  margin-bottom: 24px;
  overflow: hidden;
}
.gh-bdetails__thumb {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 6;
  max-height: 220px;
}
.gh-bdetails__thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* PLACEHOLDERS: shown only when a room has no image */
.gh-bdetails__thumb--a {
  background: linear-gradient(135deg, #04364F 0%, #601E34 100%);
}
.gh-bdetails__thumb--b {
  background: linear-gradient(135deg, #601E34 0%, #04364F 100%);
}
.gh-bdetails__thumb--c {
  background: linear-gradient(200deg, #04364F 0%, #601E34 100%);
}
.gh-bdetails__body {
  padding: 28px;
}
.gh-bdetails__name {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 700;
  color: #04364F;
}
.gh-bdetails__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin: 0;
}
.gh-bdetails__label {
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-bdetails__value {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #04364F;
}
.gh-bdetails__price-title {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 700;
  color: #04364F;
}
.gh-bdetails__price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #EFEFF2;
}
.gh-bdetails__price-row:last-child {
  border-bottom: 0;
}
.gh-bdetails__total {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 700;
  color: #04364F;
}

@media (max-width: 640px) {
  .gh-bdetails__body {
    padding: 20px;
  }
}
`;

function BookingDetails() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);

  const booking = user && id ? getBookingForUser(id, user) : undefined;
  const room = booking
    ? rooms.find((item) => item.id === booking.roomId)
    : undefined;

  if (!booking || !room) {
    return (
      <EmptyState
        title="Booking not found"
        text="We couldn't find this booking. It may not exist or may belong to another account."
        actionLabel="Back to My Bookings"
        actionTo="/dashboard/bookings"
      />
    );
  }

  const nights = getNights(booking.checkIn, booking.checkOut);
  const guestsLabel = booking.guests === 1 ? "Guest" : "Guests";
  const roomsLabel = booking.rooms === 1 ? "Room" : "Rooms";

  const details = [
    { label: "Booking ID", value: booking.id },
    { label: "Booked On", value: formatDate(booking.bookedOn) },
    { label: "Check-in", value: formatDate(booking.checkIn) },
    { label: "Check-out", value: formatDate(booking.checkOut) },
    { label: "Nights", value: `${nights} ${nights === 1 ? "Night" : "Nights"}` },
    { label: "Guests", value: `${booking.guests} ${guestsLabel}` },
    { label: "Rooms", value: `${booking.rooms} ${roomsLabel}` },
  ];

  return (
    <>
      <style>{styles}</style>
      <div>
        <Link
          to="/dashboard/bookings"
          className="gh-dash__link gh-bdetails__back"
        >
          ← Back to My Bookings
        </Link>

        <header className="gh-dash__page-head gh-bdetails__head">
          <h1 className="gh-dash__page-title">Booking {booking.id}</h1>
          <span
            className={`gh-bdetails__status gh-bdetails__status--${booking.status.toLowerCase()}`}
          >
            {booking.status}
          </span>
        </header>

        <section className="gh-dash__card gh-bdetails__card">
          {room.image ? (
            <div className={`gh-bdetails__thumb gh-bdetails__thumb--${room.tone}`}>
              <img src={room.image} alt={room.name} />
            </div>
          ) : (
            <div
              className={`gh-bdetails__thumb gh-bdetails__thumb--${room.tone}`}
              role="img"
              aria-label={`${room.name} image placeholder`}
            />
          )}
          <div className="gh-bdetails__body">
            <h2 className="gh-bdetails__name">{room.name}</h2>
            <dl className="gh-bdetails__grid">
              {details.map((detail) => (
                <div key={detail.label}>
                  <dt className="gh-bdetails__label">{detail.label}</dt>
                  <dd className="gh-bdetails__value">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="gh-dash__card gh-bdetails__card">
          <div className="gh-bdetails__body">
            <h2 className="gh-bdetails__price-title">Price Breakdown</h2>
            <div className="gh-bdetails__price-row">
              <span className="gh-bdetails__label">Price per night</span>
              <span className="gh-bdetails__value">
                {formatPrice(room.price)}
              </span>
            </div>
            <div className="gh-bdetails__price-row">
              <span className="gh-bdetails__label">Rooms</span>
              <span className="gh-bdetails__value">× {booking.rooms}</span>
            </div>
            <div className="gh-bdetails__price-row">
              <span className="gh-bdetails__label">Nights</span>
              <span className="gh-bdetails__value">× {nights}</span>
            </div>
            <div className="gh-bdetails__price-row">
              <span className="gh-bdetails__label">Total</span>
              <span className="gh-bdetails__total">
                {formatPrice(getBookingTotal(booking, room))}
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default BookingDetails;