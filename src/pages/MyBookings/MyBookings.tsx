import BookingCard from "../../components/Dashboard/BookingCard";
import EmptyState from "../../components/Dashboard/EmptyState";
import { getBookingsForUser } from "../../services/bookingStorage";
import { useAuthStore } from "../../store/authStore";

function MyBookings() {
  const user = useAuthStore((state) => state.user);

  const bookings = [...(user ? getBookingsForUser(user) : [])].sort((a, b) =>
    b.checkIn.localeCompare(a.checkIn)
  );

  return (
    <div>
      <header className="gh-dash__page-head">
        <h1 className="gh-dash__page-title">My Bookings</h1>
        <p className="gh-dash__page-text">
          Review your upcoming and past stays.
        </p>
      </header>

      {bookings.length > 0 ? (
        <ul className="gh-dash__list">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <BookingCard booking={booking} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No bookings yet"
          text="When you book a room, your reservations will appear here."
          actionLabel="Browse Rooms"
          actionTo="/rooms"
        />
      )}
    </div>
  );
}

export default MyBookings;