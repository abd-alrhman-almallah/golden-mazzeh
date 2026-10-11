import type { UserBooking } from "../../types/dashboard";
import { isUpcoming } from "../../utils/bookings";

interface DashboardStatsProps {
  bookings: UserBooking[];
}

const styles = `
.gh-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.gh-stats__card {
  padding: 24px;
}
.gh-stats__label {
  display: block;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-stats__value {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  color: #04364F;
}

@media (max-width: 1024px) {
  .gh-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .gh-stats {
    grid-template-columns: minmax(0, 1fr);
  }
}
`;

function DashboardStats({ bookings }: DashboardStatsProps) {
  const stats = [
    { label: "Total Bookings", value: bookings.length },
    { label: "Upcoming Stays", value: bookings.filter(isUpcoming).length },
    {
      label: "Completed Stays",
      value: bookings.filter((booking) => booking.status === "Completed").length,
    },
    {
      label: "Cancelled",
      value: bookings.filter((booking) => booking.status === "Cancelled").length,
    },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="gh-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="gh-dash__card gh-stats__card">
            <span className="gh-stats__label">{stat.label}</span>
            <span className="gh-stats__value">{stat.value}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default DashboardStats;