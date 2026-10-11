import DashboardSidebar from "./DashboardSidebar";
import type { SidebarNavItem } from "../../types/navigation";

interface AdminSidebarProps {
  /** Called after any link is clicked (used to close the mobile drawer) */
  onNavigate?: () => void;
}

const adminNavItems: SidebarNavItem[] = [
  { label: "Dashboard", to: "/admin", end: true },
  { label: "Rooms", to: "/admin/rooms" },
  { label: "Bookings", to: "/admin/bookings" },
  { label: "Guests", to: "/admin/guests" },
];

function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  return (
    <DashboardSidebar
      items={adminNavItems}
      sectionLabel="Admin Panel"
      ariaLabel="Admin navigation"
      onNavigate={onNavigate}
    />
  );
}

export default AdminSidebar;