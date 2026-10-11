import AdminActions from "../../components/Admin/AdminActions";
import AdminBadge from "../../components/Admin/AdminBadge";
import AdminTable from "../../components/Admin/AdminTable";
import { getAdminRoomRows } from "../../services/adminService";
import { toast } from "../../store/toastStore";
import type { AdminColumn, AdminRoomRow } from "../../types/admin";
import { formatPrice } from "../../utils/formatPrice";

const columns: AdminColumn<AdminRoomRow>[] = [
  {
    key: "room",
    header: "Room",
    render: ({ room }) => (
      <div className="gh-atable__stack">
        <span className="gh-atable__primary">{room.name}</span>
        <span className="gh-atable__secondary">
          {room.size} m² · {room.guests} {room.guests === 1 ? "guest" : "guests"} ·{" "}
          {room.bed}
        </span>
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: ({ room }) => room.type,
  },
  {
    key: "price",
    header: "Price",
    render: ({ room }) => (
      <span className="gh-atable__primary">
        {formatPrice(room.price)}{" "}
        <span className="gh-atable__secondary">/ night</span>
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: ({ status }) => <AdminBadge status={status} />,
  },
  {
    key: "actions",
    header: "Actions",
    render: ({ room }) => (
      <AdminActions
        subject={room.name}
        actions={[{ label: "Edit" }, { label: "Delete", danger: true }]}
      />
    ),
  },
];

function AdminRooms() {
  const rows = getAdminRoomRows();

  return (
    <div>
      <header className="gh-admin__page-head">
        <div>
          <h1 className="gh-admin__page-title">Rooms Management</h1>
          <p className="gh-admin__page-text">
            Manage room types, pricing and availability.
          </p>
        </div>
        {/* Adding rooms is not implemented yet: tell the user honestly */}
        <button
          type="button"
          className="gh-admin__btn"
          onClick={() => toast.info("Adding rooms isn't available yet.")}
        >
          Add Room
        </button>
      </header>

      <AdminTable
        caption="Rooms"
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.room.id}
        emptyTitle="No rooms yet"
        emptyText="Rooms you add will appear here."
      />
    </div>
  );
}

export default AdminRooms;