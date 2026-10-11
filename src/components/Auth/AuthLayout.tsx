import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import loginImage from "../../assets/images/auth/login.webp";
import BrandLogo from "../General/BrandLogo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  /** Image for the left panel. Defaults to auth/login.webp (used by Login and Register). */
  image?: string;
}

const styles = `
.gh-auth {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: #FDFDFD;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-auth *,
.gh-auth *::before,
.gh-auth *::after {
  box-sizing: border-box;
}

/* Visual side */
.gh-auth__visual {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 48px;
  padding: 48px;
  overflow: hidden;
  /* Shown only while the image is loading or missing */
  background: linear-gradient(160deg, #04364F 0%, #601E34 100%);
}
.gh-auth__visual-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Brand-color overlay so the white text stays easy to read */
.gh-auth__visual::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(4, 54, 79, 0.78) 0%,
    rgba(96, 30, 52, 0.55) 100%
  );
}
.gh-auth__visual > *:not(.gh-auth__visual-img) {
  position: relative;
  z-index: 1;
}
.gh-auth__brand {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  text-decoration: none;
}
.gh-auth__tagline {
  margin: 0;
  max-width: 420px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 700;
  line-height: 1.2;
  color: #FDFDFD;
}

/* Form side */
.gh-auth__panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
}
.gh-auth__card {
  width: 100%;
  max-width: 440px;
}
.gh-auth__title {
  margin: 0 0 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(30px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.15;
  color: #04364F;
}
.gh-auth__subtitle {
  margin: 0 0 32px;
  font-size: 16px;
  line-height: 1.6;
  color: #04364F;
}

/* Shared form primitives (used by LoginForm and RegisterForm) */
.gh-auth__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.gh-auth__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.gh-auth__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-auth__input {
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
.gh-auth__input:focus {
  outline: none;
  border-color: #04364F;
  box-shadow: 0 0 0 1px #04364F;
}
.gh-auth__input--invalid {
  border-color: #601E34;
}
.gh-auth__error {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #601E34;
}
.gh-auth__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 16px;
}
.gh-auth__check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #04364F;
  cursor: pointer;
}
.gh-auth__check input {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin: 1px 0 0;
  accent-color: #601E34;
  cursor: pointer;
}
.gh-auth__link,
.gh-auth__link-btn {
  padding: 0;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #601E34;
  background: none;
  border: 0;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
}
.gh-auth__link:hover,
.gh-auth__link-btn:hover {
  color: #04364F;
}
.gh-auth__submit {
  width: 100%;
  padding: 16px 24px;
  background: #601E34;
  color: #FDFDFD;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.gh-auth__submit:hover {
  background: #04364F;
}
.gh-auth__notice {
  margin: 0;
  padding: 12px 16px;
  background: #EFEFF2;
  font-size: 14px;
  line-height: 1.6;
  color: #04364F;
  border-radius: 2px;
}
.gh-auth__switch {
  margin: 28px 0 0;
  font-size: 14px;
  text-align: center;
  color: #04364F;
}
.gh-auth a:focus-visible,
.gh-auth button:focus-visible,
.gh-auth input[type="checkbox"]:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}
.gh-auth .gh-auth__brand:focus-visible {
  outline-color: #FDFDFD;
}

@media (max-width: 900px) {
  .gh-auth {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .gh-auth__visual {
    gap: 32px;
    padding: 28px 24px;
  }
  .gh-auth__tagline {
    font-size: 22px;
  }
  .gh-auth__panel {
    padding: 40px 24px 56px;
  }
}
`;

function AuthLayout({ title, subtitle, children, image }: AuthLayoutProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-auth">
        <div className="gh-auth__visual">
          <img
            className="gh-auth__visual-img"
            src={image ?? loginImage}
            alt=""
            aria-hidden="true"
          />
          <Link to="/" className="gh-auth__brand">
            <BrandLogo tone="dark" showSlogan />
          </Link>
          <p className="gh-auth__tagline">
            Refined stays and timeless hospitality.
          </p>
        </div>

        <section className="gh-auth__panel">
          <div className="gh-auth__card">
            <h1 className="gh-auth__title">{title}</h1>
            <p className="gh-auth__subtitle">{subtitle}</p>
            {children}
          </div>
        </section>
      </div>
    </>
  );
}

export default AuthLayout;