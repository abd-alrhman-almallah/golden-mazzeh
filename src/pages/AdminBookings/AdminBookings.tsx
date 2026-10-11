import AdminActions from "../../components/Admin/AdminActions";
import AdminBadge from "../../components/Admin/AdminBadge";
import AdminTable from "../../components/Admin/AdminTable";
import { rooms } from "../../data/rooms";
import { getAdminBookings } from "../../services/adminService";
import type { AdminBooking, AdminColumn } from "../../types/admin";
import { formatDate } from "../../utils/bookings";

function getRoomName(roomId: number): string {
  return rooms.find((room) => room.id === roomId)?.name ?? "Unknown room";
}

const columns: AdminColumn<AdminBooking>[] = [
  {
    key: "id",
    header: "Booking ID",
    render: (booking) => (
      <span className="gh-atable__primary">{booking.id}</span>
    ),
  },
  {
    key: "guest",
    header: "Guest",
    render: (booking) => (
      <div className="gh-atable__stack">
        <span className="gh-atable__primary">{booking.guest}</span>
        <span className="gh-atable__secondary">
          {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
        </span>
      </div>
    ),
  },
  {
    key: "room",
    header: "Room",
    render: (booking) => (
      <div className="gh-atable__stack">
        <span>{getRoomName(booking.roomId)}</span>
        {booking.rooms > 1 && (
          <span className="gh-atable__secondary">{booking.rooms} rooms</span>
        )}
      </div>
    ),
  },
  {
    key: "checkIn",
    header: "Check-in",
    render: (booking) => formatDate(booking.checkIn),
  },
  {
    key: "checkOut",
    header: "Check-out",
    render: (booking) => formatDate(booking.checkOut),
  },
  {
    key: "status",
    header: "Status",
    render: (booking) => <AdminBadge status={booking.status} />,
  },
  {
    key: "actions",
    header: "Actions",
    render: (booking) => (
      <AdminActions
        subject={`booking ${booking.id}`}
        actions={[
          { label: "View" },
          { label: "Edit" },
          {
            label: "Cancel",
            danger: true,
            disabled:
              booking.status === "Cancelled" || booking.status === "Completed",
          },
        ]}
      />
    ),
  },
];

function AdminBookings() {
  const rows = [...getAdminBookings()].sort((a, b) =>
    b.checkIn.localeCompare(a.checkIn)
  );

  return (
    <div>
      <header className="gh-admin__page-head">
        <div>
          <h1 className="gh-admin__page-title">Bookings Management</h1>
          <p className="gh-admin__page-text">
            Track reservations and their current status.
          </p>
        </div>
      </header>

      <AdminTable
        caption="Bookings"
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.id}
        emptyTitle="No bookings yet"
        emptyText="Guest reservations will appear here."
      />
    </div>
  );
}

export default AdminBookings;