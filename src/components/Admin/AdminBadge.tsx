import type { RoomStatus } from "../../types/admin";
import type { BookingStatus } from "../../types/dashboard";
import type { GuestStatus } from "../../types/guest";

interface AdminBadgeProps {
  status: BookingStatus | RoomStatus | GuestStatus;
}

const styles = `
.gh-abadge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 2px;
}
.gh-abadge::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.gh-abadge--confirmed {
  background: #04364F;
  color: #FDFDFD;
}
.gh-abadge--pending {
  background: #EFEFF2;
  color: #04364F;
}
.gh-abadge--completed {
  background: #FDFDFD;
  color: #04364F;
  border-color: rgba(4, 54, 79, 0.3);
}
.gh-abadge--cancelled {
  background: #FDFDFD;
  color: #601E34;
  border-color: #601E34;
}
.gh-abadge--available {
  background: #FDFDFD;
  color: #04364F;
  border-color: #04364F;
}
.gh-abadge--occupied {
  background: #601E34;
  color: #FDFDFD;
}
.gh-abadge--active {
  background: #04364F;
  color: #FDFDFD;
}
.gh-abadge--inactive {
  background: #FDFDFD;
  color: #04364F;
  border-color: #93979A;
}
`;

function AdminBadge({ status }: AdminBadgeProps) {
  return (
    <>
      <style>{styles}</style>
      <span className={`gh-abadge gh-abadge--${status.toLowerCase()}`}>
        {status}
      </span>
    </>
  );
}

export default AdminBadge;