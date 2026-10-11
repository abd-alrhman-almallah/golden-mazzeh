import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import BrandLogo from "../General/BrandLogo";
import ConfirmDialog from "../General/ConfirmDialog";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";
import type { SidebarNavItem } from "../../types/navigation";

interface DashboardSidebarProps {
  /** Called after any link is clicked (used to close the mobile drawer) */
  onNavigate?: () => void;
  /** Navigation items. Defaults to the user dashboard items. */
  items?: SidebarNavItem[];
  sectionLabel?: string;
  ariaLabel?: string;
}

const defaultItems: SidebarNavItem[] = [
  { label: "Overview", to: "/dashboard", end: true },
  { label: "My Bookings", to: "/dashboard/bookings" },
  { label: "Profile", to: "/dashboard/profile" },
  { label: "Settings", to: "/dashboard/settings" },
];

const styles = `
.gh-dsb {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 28px 20px;
}
.gh-dsb__brand {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin-bottom: 40px;
  padding: 0 16px;
  text-decoration: none;
}
.gh-dsb__label {
  margin: 0 0 12px;
  padding: 0 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-dsb__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.gh-dsb__link {
  display: block;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #93979A;
  text-decoration: none;
  border-left: 3px solid transparent;
  border-radius: 2px;
  transition: color 0.2s ease, background 0.2s ease;
}
.gh-dsb__link:hover {
  color: #FDFDFD;
  background: rgba(253, 253, 253, 0.08);
}
.gh-dsb__link--active {
  color: #FDFDFD;
  background: rgba(253, 253, 253, 0.12);
  border-left-color: #FDFDFD;
}
.gh-dsb__logout {
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid rgba(147, 151, 154, 0.3);
}
.gh-dsb__logout-btn {
  width: 100%;
  margin: 0;
  font-family: inherit;
  text-align: left;
  background: transparent;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  cursor: pointer;
}
.gh-dsb a:focus-visible,
.gh-dsb button:focus-visible {
  outline: 2px solid #FDFDFD;
  outline-offset: 2px;
}
`;

function DashboardSidebar({
  onNavigate,
  items = defaultItems,
  sectionLabel = "My Account",
  ariaLabel = "Dashboard navigation",
}: DashboardSidebarProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsConfirmOpen(false);
    logout();
    onNavigate?.();
    navigate("/login");
    toast.info("You have been signed out.");
  };

  return (
    <>
      <style>{styles}</style>
      <nav className="gh-dsb" aria-label={ariaLabel}>
        <Link to="/" className="gh-dsb__brand" onClick={onNavigate}>
          <BrandLogo tone="dark" size="sm" />
        </Link>

        <p className="gh-dsb__label">{sectionLabel}</p>
        <ul className="gh-dsb__list">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  isActive
                    ? "gh-dsb__link gh-dsb__link--active"
                    : "gh-dsb__link"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout asks for confirmation, then clears the session (authStore) */}
        <div className="gh-dsb__logout">
          <button
            type="button"
            className="gh-dsb__link gh-dsb__logout-btn"
            onClick={() => setIsConfirmOpen(true)}
          >
            Logout
          </button>
        </div>
      </nav>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Sign out?"
        message="You will need to sign in again to see your bookings and manage your stays."
        confirmLabel="Sign Out"
        cancelLabel="Stay Signed In"
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}

export default DashboardSidebar;