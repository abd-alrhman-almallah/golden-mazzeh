import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/Navigation/DashboardSidebar";
import { useAuthStore } from "../store/authStore";
import { getInitials } from "../utils/user";

function getSectionTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard/bookings")) return "My Bookings";
  if (pathname.startsWith("/dashboard/profile")) return "Profile";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  return "Overview";
}

const styles = `
.gh-dash {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  min-height: 100vh;
  background: #EFEFF2;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-dash *,
.gh-dash *::before,
.gh-dash *::after {
  box-sizing: border-box;
}

/* Sidebar shell */
.gh-dash__sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  background: #04364F;
}
.gh-dash__overlay {
  display: none;
}

/* Top bar */
.gh-dash__body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.gh-dash__topbar {
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
.gh-dash__topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.gh-dash__topbar-title {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-dash__topbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}
.gh-dash__site-link {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #04364F;
  text-decoration: none;
  transition: color 0.2s ease;
}
.gh-dash__site-link:hover {
  color: #601E34;
}
.gh-dash__user {
  display: flex;
  align-items: center;
  gap: 12px;
}
.gh-dash__user-name {
  font-size: 14px;
  font-weight: 600;
}
.gh-dash__avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #04364F;
  color: #FDFDFD;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.gh-dash__menu-btn {
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
.gh-dash__menu-bar {
  display: block;
  width: 24px;
  height: 2px;
  background: #04364F;
}

/* Main area */
.gh-dash__main {
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px 72px;
}

/* Shared dashboard primitives */
.gh-dash__card {
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
}
.gh-dash__page-head {
  margin-bottom: 32px;
}
.gh-dash__page-title {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(28px, 3.5vw, 36px);
  font-weight: 700;
  line-height: 1.15;
  color: #04364F;
}
.gh-dash__page-text {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #04364F;
}
.gh-dash__section {
  margin-top: 48px;
}
.gh-dash__section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}
.gh-dash__section-title {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  color: #04364F;
}
.gh-dash__link {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #601E34;
  text-decoration: none;
  transition: color 0.2s ease;
}
.gh-dash__link:hover {
  color: #04364F;
}
.gh-dash__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.gh-dash__btn {
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
.gh-dash__btn:hover {
  background: #04364F;
  border-color: #04364F;
}
.gh-dash__btn--outline {
  background: transparent;
  color: #04364F;
  border-color: #04364F;
}
.gh-dash__btn--outline:hover {
  background: #04364F;
  color: #FDFDFD;
}
.gh-dash__btn--light {
  background: #FDFDFD;
  color: #04364F;
  border-color: #FDFDFD;
}
.gh-dash__btn--light:hover {
  background: #EFEFF2;
  border-color: #EFEFF2;
}
.gh-dash__notice {
  margin: 0;
  padding: 12px 16px;
  background: #EFEFF2;
  font-size: 14px;
  line-height: 1.6;
  color: #04364F;
  border-radius: 2px;
}
.gh-dash__check {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}
.gh-dash__check input {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin: 2px 0 0;
  accent-color: #601E34;
  cursor: pointer;
}
.gh-dash__check span {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 15px;
  color: #04364F;
}
.gh-dash__check small {
  font-size: 13px;
  color: #93979A;
}

/* Form primitives shared with AuthField (mirrors the .gh-auth__* rules) */
.gh-dash .gh-auth__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.gh-dash .gh-auth__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-dash .gh-auth__input {
  width: 100%;
  padding: 14px 16px;
  font: inherit;
  font-size: 15px;
  color: #04364F;
  background: #FDFDFD;
  border: 1px solid #93979A;
  border-radius: 2px;
  transition: border-color 0.2s ease;
}
.gh-dash .gh-auth__input:focus {
  outline: none;
  border-color: #04364F;
  box-shadow: 0 0 0 1px #04364F;
}
.gh-dash .gh-auth__input--invalid {
  border-color: #601E34;
}
.gh-dash .gh-auth__error {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #601E34;
}

.gh-dash__main a:focus-visible,
.gh-dash__main button:focus-visible,
.gh-dash__topbar a:focus-visible,
.gh-dash__topbar button:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}

@media (max-width: 900px) {
  .gh-dash {
    grid-template-columns: minmax(0, 1fr);
  }
  .gh-dash__sidebar {
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
  .gh-dash__sidebar--open {
    transform: none;
    visibility: visible;
    transition: transform 0.25s ease;
  }
  .gh-dash__overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1050;
    background: rgba(4, 54, 79, 0.5);
  }
  .gh-dash__menu-btn {
    display: flex;
  }
  .gh-dash__topbar {
    padding: 0 16px;
  }
  .gh-dash__site-link,
  .gh-dash__user-name {
    display: none;
  }
  .gh-dash__main {
    padding: 28px 16px 56px;
  }
}
`;

function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);
  const userName = user ? user.fullName : "";

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
      <div className="gh-dash">
        <aside
          id="gh-dash-sidebar"
          className={
            isMenuOpen
              ? "gh-dash__sidebar gh-dash__sidebar--open"
              : "gh-dash__sidebar"
          }
        >
          <DashboardSidebar onNavigate={closeMenu} />
        </aside>
        {isMenuOpen && (
          <div
            className="gh-dash__overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        <div className="gh-dash__body">
          <header className="gh-dash__topbar">
            <div className="gh-dash__topbar-left">
              <button
                type="button"
                className="gh-dash__menu-btn"
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="gh-dash-sidebar"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="gh-dash__menu-bar" />
                <span className="gh-dash__menu-bar" />
                <span className="gh-dash__menu-bar" />
              </button>
              <p className="gh-dash__topbar-title">{getSectionTitle(pathname)}</p>
            </div>

            <div className="gh-dash__topbar-right">
              <Link to="/" className="gh-dash__site-link">
                Back to Website
              </Link>
              <div className="gh-dash__user">
                <span className="gh-dash__avatar" aria-hidden="true">
                  {getInitials(userName)}
                </span>
                <span className="gh-dash__user-name">{userName}</span>
              </div>
            </div>
          </header>

          <main className="gh-dash__main">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;