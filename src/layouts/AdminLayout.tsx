import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/Navigation/AdminSidebar";
import { useAuthStore } from "../store/authStore";
import { getInitials } from "../utils/user";

function getSectionTitle(pathname: string): string {
  if (pathname.startsWith("/admin/rooms")) return "Rooms";
  if (pathname.startsWith("/admin/bookings")) return "Bookings";
  if (pathname.startsWith("/admin/guests")) return "Guests";
  if (pathname === "/admin") return "Dashboard";
  return "Admin Panel";
}

const styles = `
.gh-admin {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  min-height: 100vh;
  background: #EFEFF2;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-admin *,
.gh-admin *::before,
.gh-admin *::after {
  box-sizing: border-box;
}

/* Sidebar shell */
.gh-admin__sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  background: #04364F;
}
.gh-admin__overlay {
  display: none;
}

/* Top bar */
.gh-admin__body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.gh-admin__topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 72px;
  padding: 0 32px;
  background: #FDFDFD;
  border-bottom: 1px solid #EFEFF2;
}
.gh-admin__topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.gh-admin__topbar-title {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-admin__topbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}
.gh-admin__site-link {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #04364F;
  text-decoration: none;
  transition: color 0.2s ease;
}
.gh-admin__site-link:hover {
  color: #601E34;
}
.gh-admin__user {
  display: flex;
  align-items: center;
  gap: 12px;
}
.gh-admin__user-name {
  font-size: 14px;
  font-weight: 600;
}
.gh-admin__avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #601E34;
  color: #FDFDFD;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.gh-admin__menu-btn {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.gh-admin__menu-bar {
  display: block;
  width: 24px;
  height: 2px;
  background: #04364F;
}

/* Main area */
.gh-admin__main {
  flex: 1;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 32px 72px;
}

/* Shared admin page primitives */
.gh-admin__page-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px 24px;
  margin-bottom: 32px;
}
.gh-admin__page-title {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(28px, 3.5vw, 36px);
  font-weight: 700;
  line-height: 1.15;
  color: #04364F;
}
.gh-admin__page-text {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #04364F;
}
.gh-admin__section {
  margin-top: 48px;
}
.gh-admin__section-title {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  color: #04364F;
}
.gh-admin__btn {
  display: inline-block;
  padding: 12px 24px;
  background: #601E34;
  color: #FDFDFD;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #601E34;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.gh-admin__btn:hover {
  background: #04364F;
  border-color: #04364F;
}
.gh-admin__btn--outline {
  background: transparent;
  color: #04364F;
  border-color: #04364F;
}
.gh-admin__btn--outline:hover {
  background: #04364F;
  color: #FDFDFD;
}

.gh-admin__main a:focus-visible,
.gh-admin__main button:focus-visible,
.gh-admin__topbar a:focus-visible,
.gh-admin__topbar button:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}

@media (max-width: 900px) {
  .gh-admin {
    grid-template-columns: minmax(0, 1fr);
  }
  .gh-admin__sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1100;
    width: 280px;
    height: auto;
    transform: translateX(-100%);
    visibility: hidden;
    transition: transform 0.25s ease, visibility 0s linear 0.25s;
  }
  .gh-admin__sidebar--open {
    transform: none;
    visibility: visible;
    transition: transform 0.25s ease;
  }
  .gh-admin__overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1050;
    background: rgba(4, 54, 79, 0.5);
  }
  .gh-admin__menu-btn {
    display: flex;
  }
  .gh-admin__topbar {
    padding: 0 16px;
  }
  .gh-admin__site-link,
  .gh-admin__user-name {
    display: none;
  }
  .gh-admin__main {
    padding: 28px 16px 56px;
  }
}
`;

function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);

  // The signed-in user. There are no admin roles yet (planned for later).
  const adminName = user ? user.fullName : "Admin";
  const adminInitials = user ? getInitials(user.fullName) : "AD";

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <style>{styles}</style>
      <div className="gh-admin">
        <aside
          id="gh-admin-sidebar"
          className={
            isMenuOpen
              ? "gh-admin__sidebar gh-admin__sidebar--open"
              : "gh-admin__sidebar"
          }
        >
          <AdminSidebar onNavigate={closeMenu} />
        </aside>
        {isMenuOpen && (
          <div
            className="gh-admin__overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        <div className="gh-admin__body">
          <header className="gh-admin__topbar">
            <div className="gh-admin__topbar-left">
              <button
                type="button"
                className="gh-admin__menu-btn"
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="gh-admin-sidebar"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="gh-admin__menu-bar" />
                <span className="gh-admin__menu-bar" />
                <span className="gh-admin__menu-bar" />
              </button>
              <p className="gh-admin__topbar-title">
                {getSectionTitle(pathname)}
              </p>
            </div>

            <div className="gh-admin__topbar-right">
              <Link to="/" className="gh-admin__site-link">
                Back to Website
              </Link>
              <div className="gh-admin__user">
                <span className="gh-admin__avatar" aria-hidden="true">
                  {adminInitials}
                </span>
                <span className="gh-admin__user-name">{adminName}</span>
              </div>
            </div>
          </header>

          <main className="gh-admin__main">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;