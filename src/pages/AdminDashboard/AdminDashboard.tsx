import { Link } from "react-router-dom";
import AdminStatsCards from "../../components/Admin/AdminStatsCards";
import { brand } from "../../data/brand";
import { getAdminDashboardStats } from "../../services/adminService";

const shortcuts = [
  {
    title: "Rooms",
    text: "Review room availability, prices and status.",
    to: "/admin/rooms",
    label: "Manage Rooms",
  },
  {
    title: "Bookings",
    text: "Track reservations and follow their status.",
    to: "/admin/bookings",
    label: "Manage Bookings",
  },
  {
    title: "Guests",
    text: "Browse guest profiles and booking activity.",
    to: "/admin/guests",
    label: "Manage Guests",
  },
];

const styles = `
.gh-adash__shortcuts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.gh-adash__shortcut {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 28px;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
  box-shadow: 0 8px 24px rgba(4, 54, 79, 0.05);
}
.gh-adash__shortcut-title {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  color: #04364F;
}
.gh-adash__shortcut-text {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.6;
  color: #04364F;
}
`;

function AdminDashboard() {
  const stats = getAdminDashboardStats();

  return (
    <>
      <style>{styles}</style>
      <div>
        <header className="gh-admin__page-head">
          <div>
            <h1 className="gh-admin__page-title">Admin Dashboard</h1>
            <p className="gh-admin__page-text">
              An overview of rooms, bookings and revenue at {brand.name}.
            </p>
          </div>
        </header>

        <AdminStatsCards stats={stats} />

        <section className="gh-admin__section" aria-labelledby="gh-adash-manage">
          <h2 id="gh-adash-manage" className="gh-admin__section-title">
            Manage
          </h2>
          <div className="gh-adash__shortcuts">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.to} className="gh-adash__shortcut">
                <h3 className="gh-adash__shortcut-title">{shortcut.title}</h3>
                <p className="gh-adash__shortcut-text">{shortcut.text}</p>
                <Link
                  to={shortcut.to}
                  className="gh-admin__btn gh-admin__btn--outline"
                >
                  {shortcut.label}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminDashboard;