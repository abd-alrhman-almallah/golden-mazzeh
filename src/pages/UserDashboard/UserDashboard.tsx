import { Link } from "react-router-dom";
import BookingCard from "../../components/Dashboard/BookingCard";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import EmptyState from "../../components/Dashboard/EmptyState";
import { brand } from "../../data/brand";
import { getBookingsForUser } from "../../services/bookingStorage";
import { useAuthStore } from "../../store/authStore";
import { isUpcoming } from "../../utils/bookings";
import { getFirstName } from "../../utils/user";

const styles = `
.gh-overview__welcome {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
  padding: 40px;
  background: linear-gradient(120deg, #04364F 0%, #04364F 60%, #601E34 100%);
  border-radius: 2px;
}
.gh-overview__title {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(26px, 3.5vw, 34px);
  font-weight: 700;
  line-height: 1.15;
  color: #FDFDFD;
}
.gh-overview__text {
  margin: 0;
  max-width: 460px;
  font-size: 16px;
  line-height: 1.6;
  color: #EFEFF2;
}

@media (max-width: 640px) {
  .gh-overview__welcome {
    padding: 28px 24px;
  }
}
`;

function UserDashboard() {
  const user = useAuthStore((state) => state.user);
  const bookings = user ? getBookingsForUser(user) : [];
  const firstName = user ? getFirstName(user.fullName) : "";

  const nextBooking = bookings
    .filter(isUpcoming)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0];

  const recentBookings = [...bookings]
    .sort((a, b) => b.bookedOn.localeCompare(a.bookedOn))
    .slice(0, 3);

  return (
    <>
      <style>{styles}</style>
      <div>
        <section className="gh-overview__welcome" aria-label="Welcome">
          <div>
            <h1 className="gh-overview__title">
              {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
            </h1>
            <p className="gh-overview__text">
              Here is an overview of your stays with {brand.name}.
            </p>
          </div>
          <Link to="/rooms" className="gh-dash__btn gh-dash__btn--light">
            Book a Stay
          </Link>
        </section>

        <DashboardStats bookings={bookings} />

        <section className="gh-dash__section" aria-labelledby="gh-next-title">
          <div className="gh-dash__section-head">
            <h2 id="gh-next-title" className="gh-dash__section-title">
              Next Stay
            </h2>
          </div>
          {nextBooking ? (
            <BookingCard booking={nextBooking} />
          ) : (
            <EmptyState
              title="No upcoming stays"
              text="You have no upcoming bookings yet. Explore our rooms and plan your next stay."
              actionLabel="Browse Rooms"
              actionTo="/rooms"
            />
          )}
        </section>

        <section className="gh-dash__section" aria-labelledby="gh-recent-title">
          <div className="gh-dash__section-head">
            <h2 id="gh-recent-title" className="gh-dash__section-title">
              Recent Bookings
            </h2>
            <Link to="/dashboard/bookings" className="gh-dash__link">
              View All
            </Link>
          </div>
          {recentBookings.length > 0 ? (
            <ul className="gh-dash__list">
              {recentBookings.map((booking) => (
                <li key={booking.id}>
                  <BookingCard booking={booking} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="No bookings yet"
              text="Your bookings will appear here once you make a reservation."
            />
          )}
        </section>
      </div>
    </>
  );
}

export default UserDashboard;