import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import BrandLogo from "../General/BrandLogo";
import ConfirmDialog from "../General/ConfirmDialog";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";

interface NavItem {
  label: string;
  to: string;
  end?: boolean;
  // TEMPORARY: items marked as anchors have no route yet (Hotel, Experiences)
  anchor?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/", end: true },
  { label: "Rooms", to: "/rooms" },
  { label: "Hotel", to: "/#hotel", anchor: true },
  { label: "Experiences", to: "/#experiences", anchor: true },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const styles = `
.gh-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #FDFDFD;
  border-bottom: 1px solid #EFEFF2;
  box-shadow: 0 2px 12px rgba(4, 54, 79, 0.06);
}
.gh-nav__inner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.gh-nav__brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}
.gh-nav__menu {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 24px;
}
.gh-nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
  margin: 0 auto;
  padding: 0;
}
.gh-nav__link {
  display: inline-block;
  padding: 8px 0;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #04364F;
  text-decoration: none;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.gh-nav__link:hover {
  color: #601E34;
}
.gh-nav__link--active {
  color: #601E34;
  border-bottom-color: #601E34;
}
.gh-nav__link-btn {
  font-family: inherit;
  background: transparent;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  cursor: pointer;
}
.gh-nav__auth {
  display: flex;
  align-items: center;
  gap: 20px;
}
.gh-nav__cta {
  display: inline-block;
  padding: 12px 26px;
  background: #601E34;
  color: #FDFDFD;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  border-radius: 2px;
  transition: background 0.2s ease;
}
.gh-nav__cta:hover {
  background: #04364F;
}
.gh-nav__toggle {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.gh-nav__bar {
  display: block;
  width: 24px;
  height: 2px;
  background: #04364F;
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.gh-nav__toggle--open .gh-nav__bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.gh-nav__toggle--open .gh-nav__bar:nth-child(2) {
  opacity: 0;
}
.gh-nav__toggle--open .gh-nav__bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
.gh-nav a:focus-visible,
.gh-nav button:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}

/* Tighter spacing on small laptops so the full menu still fits */
@media (min-width: 1101px) and (max-width: 1240px) {
  .gh-nav__menu {
    gap: 16px;
  }
  .gh-nav__links {
    gap: 18px;
  }
  .gh-nav__auth {
    gap: 16px;
  }
  .gh-nav__link {
    letter-spacing: 0.06em;
  }
  .gh-nav__cta {
    padding: 12px 20px;
  }
}

/* Mobile and tablet: the menu becomes a dropdown */
@media (max-width: 1100px) {
  .gh-nav__toggle {
    display: flex;
  }
  .gh-nav__menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding: 8px 24px 24px;
    max-height: calc(100vh - 76px);
    max-height: calc(100dvh - 76px);
    overflow-y: auto;
    background: #FDFDFD;
    border-bottom: 1px solid #EFEFF2;
    box-shadow: 0 8px 12px rgba(4, 54, 79, 0.06);
  }
  .gh-nav__menu--open {
    display: flex;
  }
  .gh-nav__links {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin: 0;
  }
  .gh-nav__auth {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
  .gh-nav__link {
    display: block;
    padding: 14px 0;
    border-bottom: 1px solid #EFEFF2;
  }
  .gh-nav__link-btn {
    width: 100%;
    text-align: left;
  }
  .gh-nav__link--active {
    border-bottom-color: #EFEFF2;
  }
}

/* Very small phones: keep the brand and the menu button on one line */
@media (max-width: 480px) {
  .gh-nav__inner {
    padding: 0 16px;
    gap: 12px;
  }
  .gh-nav__menu {
    padding: 8px 16px 24px;
  }
}
`;

function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleConfirmLogout = () => {
    setIsConfirmOpen(false);
    logout();
    navigate("/");
    toast.info("You have been signed out.");
  };

  return (
    <>
      <style>{styles}</style>
      <header className="gh-nav">
        <div className="gh-nav__inner">
          <Link to="/" className="gh-nav__brand" onClick={closeMenu}>
            <BrandLogo tone="light" showSlogan />
          </Link>

          <button
            type="button"
            className={
              isOpen ? "gh-nav__toggle gh-nav__toggle--open" : "gh-nav__toggle"
            }
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="gh-nav-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="gh-nav__bar" />
            <span className="gh-nav__bar" />
            <span className="gh-nav__bar" />
          </button>

          <nav
            id="gh-nav-menu"
            aria-label="Main navigation"
            className={
              isOpen ? "gh-nav__menu gh-nav__menu--open" : "gh-nav__menu"
            }
          >
            <ul className="gh-nav__links">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.anchor ? (
                    <Link
                      to={item.to}
                      className="gh-nav__link"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        isActive
                          ? "gh-nav__link gh-nav__link--active"
                          : "gh-nav__link"
                      }
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="gh-nav__auth">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="gh-nav__link"
                    onClick={closeMenu}
                  >
                    Account
                  </Link>
                  <button
                    type="button"
                    className="gh-nav__link gh-nav__link-btn"
                    onClick={() => {
                      closeMenu();
                      setIsConfirmOpen(true);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="gh-nav__link"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="gh-nav__link"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            <Link to="/booking" className="gh-nav__cta" onClick={closeMenu}>
              Book Now
            </Link>
          </nav>
        </div>
      </header>

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

export default Navbar;