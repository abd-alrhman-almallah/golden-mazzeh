import { Link, useSearchParams } from "react-router-dom";
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
.gh-bsuccess {
  width: 100%;
  min-height: 100vh;
  background: #EFEFF2;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-bsuccess *,
.gh-bsuccess *::before,
.gh-bsuccess *::after {
  box-sizing: border-box;
}
.gh-bsuccess__hero {
  background: linear-gradient(120deg, #04364F 0%, #04364F 60%, #601E34 100%);
  padding: 88px 0 80px;
}
.gh-bsuccess__container {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px;
}
.gh-bsuccess__label {
  margin: 0 0 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-bsuccess__title {
  margin: 0 0 16px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 700;
  line-height: 1.1;
  color: #FDFDFD;
}
.gh-bsuccess__subtitle {
  margin: 0;
  max-width: 520px;
  font-size: 17px;
  line-height: 1.7;
  color: #EFEFF2;
}
.gh-bsuccess__content {
  padding: 56px 0 96px;
}
.gh-bsuccess__card {
  padding: 32px;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
  box-shadow: 0 16px 36px rgba(4, 54, 79, 0.08);
}
.gh-bsuccess__photo {
  position: relative;
  margin: 0 0 24px;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  background: #EFEFF2;
  border-radius: 2px;
}
.gh-bsuccess__photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gh-bsuccess__room {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 26px;
  font-weight: 700;
  color: #04364F;
}
.gh-bsuccess__list {
  margin: 0 0 28px;
}
.gh-bsuccess__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #EFEFF2;
}
.gh-bsuccess__row-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-bsuccess__row-value {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
  color: #04364F;
}
.gh-bsuccess__row-value--total {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
}
.gh-bsuccess__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.gh-bsuccess__btn {
  display: inline-block;
  padding: 14px 28px;
  background: #601E34;
  color: #FDFDFD;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border: 1px solid #601E34;
  border-radius: 2px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.gh-bsuccess__btn:hover {
  background: #04364F;
  border-color: #04364F;
}
.gh-bsuccess__btn--outline {
  background: transparent;
  color: #04364F;
  border-color: #04364F;
}
.gh-bsuccess__btn--outline:hover {
  background: #04364F;
  color: #FDFDFD;
}
.gh-bsuccess__notfound {
  text-align: center;
}
.gh-bsuccess__notfound p {
  margin: 0 auto 24px;
  max-width: 420px;
  line-height: 1.7;
}
.gh-bsuccess a:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .gh-bsuccess__hero {
    padding: 64px 0 56px;
  }
  .gh-bsuccess__content {
    padding: 40px 0 64px;
  }
  .gh-bsuccess__card {
    padding: 24px;
  }
}
`;

function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const user = useAuthStore((state) => state.user);

  const bookingId = searchParams.get("booking") ?? "";
  const booking =
    user && bookingId ? getBookingForUser(bookingId, user) : undefined;
  const room = booking
    ? rooms.find((item) => item.id === booking.roomId)
    : undefined;

  if (!booking || !room) {
    return (
      <>
        <style>{styles}</style>
        <div className="gh-bsuccess">
          <section className="gh-bsuccess__content">
            <div className="gh-bsuccess__container">
              <div className="gh-bsuccess__card gh-bsuccess__notfound">
                <h1 className="gh-bsuccess__room">Booking Not Found</h1>
                <p>
                  We couldn't find this booking. You can review your
                  reservations in My Bookings.
                </p>
                <Link to="/dashboard/bookings" className="gh-bsuccess__btn">
                  My Bookings
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  const nights = getNights(booking.checkIn, booking.checkOut);
  const guestsLabel = booking.guests === 1 ? "Guest" : "Guests";
  const roomsLabel = booking.rooms === 1 ? "Room" : "Rooms";

  const rows = [
    { label: "Booking ID", value: booking.id },
    { label: "Status", value: booking.status },
    { label: "Check-in", value: formatDate(booking.checkIn) },
    { label: "Check-out", value: formatDate(booking.checkOut) },
    { label: "Nights", value: `${nights} ${nights === 1 ? "Night" : "Nights"}` },
    { label: "Guests", value: `${booking.guests} ${guestsLabel}` },
    { label: "Rooms", value: `${booking.rooms} ${roomsLabel}` },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="gh-bsuccess">
        <header className="gh-bsuccess__hero">
          <div className="gh-bsuccess__container">
            <p className="gh-bsuccess__label">Reservation Received</p>
            <h1 className="gh-bsuccess__title">Booking Confirmed</h1>
            <p className="gh-bsuccess__subtitle">
              Thank you. Your reservation {booking.id} has been created and is
              awaiting confirmation from the hotel.
            </p>
          </div>
        </header>

        <section className="gh-bsuccess__content" aria-label="Booking summary">
          <div className="gh-bsuccess__container">
            <div className="gh-bsuccess__card">
              {room.image && (
                <div className="gh-bsuccess__photo">
                  <img src={room.image} alt={room.name} />
                </div>
              )}

              <h2 className="gh-bsuccess__room">{room.name}</h2>

              <dl className="gh-bsuccess__list">
                {rows.map((row) => (
                  <div key={row.label} className="gh-bsuccess__row">
                    <dt className="gh-bsuccess__row-label">{row.label}</dt>
                    <dd className="gh-bsuccess__row-value">{row.value}</dd>
                  </div>
                ))}
                <div className="gh-bsuccess__row">
                  <dt className="gh-bsuccess__row-label">Total</dt>
                  <dd className="gh-bsuccess__row-value gh-bsuccess__row-value--total">
                    {formatPrice(getBookingTotal(booking, room))}
                  </dd>
                </div>
              </dl>

              <div className="gh-bsuccess__actions">
                <Link
                  to={`/dashboard/bookings/${booking.id}`}
                  className="gh-bsuccess__btn"
                >
                  View Booking Details
                </Link>
                <Link
                  to="/dashboard/bookings"
                  className="gh-bsuccess__btn gh-bsuccess__btn--outline"
                >
                  My Bookings
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default BookingSuccess;