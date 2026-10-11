import AdminActions from "../../components/Admin/AdminActions";
import AdminBadge from "../../components/Admin/AdminBadge";
import AdminTable from "../../components/Admin/AdminTable";
import { getAdminGuests } from "../../services/adminService";
import type { AdminColumn } from "../../types/admin";
import type { Guest } from "../../types/guest";

const columns: AdminColumn<Guest>[] = [
  {
    key: "guest",
    header: "Guest",
    render: (guest) => (
      <div className="gh-atable__stack">
        <span className="gh-atable__primary">{guest.fullName}</span>
        <span className="gh-atable__secondary">{guest.id}</span>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (guest) => guest.email,
  },
  {
    key: "phone",
    header: "Phone",
    render: (guest) => guest.phone || "—",
  },
  {
    key: "country",
    header: "Country",
    render: (guest) => guest.country || "—",
  },
  {
    key: "bookings",
    header: "Bookings",
    render: (guest) => (
      <span className="gh-atable__primary">
        {guest.bookingsCount}{" "}
        <span className="gh-atable__secondary">
          {guest.bookingsCount === 1 ? "booking" : "bookings"}
        </span>
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (guest) => <AdminBadge status={guest.status} />,
  },
  {
    key: "actions",
    header: "Actions",
    render: (guest) => (
      <AdminActions
        subject={guest.fullName}
        actions={[
          { label: "View" },
          { label: "Edit" },
          { label: "Delete", danger: true },
        ]}
      />
    ),
  },
];

function AdminGuests() {
  // Most active guests first, then alphabetical
  const rows = [...getAdminGuests()].sort(
    (a, b) =>
      b.bookingsCount - a.bookingsCount || a.fullName.localeCompare(b.fullName)
  );

  return (
    <div>
      <header className="gh-admin__page-head">
        <div>
          <h1 className="gh-admin__page-title">Guests Management</h1>
          <p className="gh-admin__page-text">
            Manage guest profiles and booking activity.
          </p>
        </div>
      </header>

      <AdminTable
        caption="Guests"
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.id}
        emptyTitle="No guests yet"
        emptyText="Guest profiles will appear here once guests make a booking."
      />
    </div>
  );
}

export default AdminGuests;