import { Link } from "react-router-dom";
import { brand } from "../../data/brand";
import BrandLogo from "../General/BrandLogo";

interface FooterLink {
  label: string;
  to: string;
}

const exploreLinks: FooterLink[] = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  // TEMPORARY: no routes yet, these point to future Home sections
  { label: "Hotel", to: "/#hotel" },
  { label: "Experiences", to: "/#experiences" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// Instagram and Facebook come from src/data/brand.ts
const socialLinks = [
  { label: "Instagram", href: brand.instagramUrl },
  { label: "Facebook", href: brand.facebookUrl },
  // TEMPORARY: replace with the hotel's real X account (or remove this link)
  { label: "X", href: "https://x.com" },
];

// TEMPORARY: /privacy and /terms routes do not exist yet
const legalLinks: FooterLink[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Contact", to: "/contact" },
];

const styles = `
.gh-footer {
  background: #04364F;
  color: #FDFDFD;
}
.gh-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px 28px;
}
.gh-footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
}
.gh-footer__brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}
.gh-footer__about {
  margin: 16px 0 0;
  max-width: 320px;
  font-size: 14px;
  line-height: 1.7;
  color: #93979A;
}
.gh-footer__contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}
.gh-footer__contact .gh-footer__link {
  overflow-wrap: anywhere;
}
.gh-footer__title {
  margin: 0 0 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FDFDFD;
}
.gh-footer__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.gh-footer a {
  text-decoration: none;
}
.gh-footer__link {
  font-size: 14px;
  color: #93979A;
  transition: color 0.2s ease;
}
.gh-footer__link:hover {
  color: #FDFDFD;
}
.gh-footer a:focus-visible {
  outline: 2px solid #FDFDFD;
  outline-offset: 2px;
}
.gh-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(147, 151, 154, 0.3);
  font-size: 13px;
  color: #93979A;
}
.gh-footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.gh-footer__credit {
  margin: 20px 0 0;
  text-align: center;
  font-size: 12px;
  color: #93979A;
}

@media (max-width: 768px) {
  .gh-footer__inner {
    padding: 48px 24px 24px;
  }
  .gh-footer__grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .gh-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
`;

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{styles}</style>
      <footer className="gh-footer">
        <div className="gh-footer__inner">
          <div className="gh-footer__grid">
            <div>
              <Link to="/" className="gh-footer__brand">
                <BrandLogo tone="dark" showSlogan />
              </Link>
              <p className="gh-footer__about">
                Refined stays and timeless hospitality.
              </p>
              <ul className="gh-footer__contact">
                <li>
                  <a href={brand.phoneHref} className="gh-footer__link">
                    {brand.phone}
                  </a>
                </li>
                <li>
                  <a href={brand.emailHref} className="gh-footer__link">
                    {brand.email}
                  </a>
                </li>
              </ul>
            </div>

            <nav aria-label="Footer navigation">
              <h2 className="gh-footer__title">Explore</h2>
              <ul className="gh-footer__list">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="gh-footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="gh-footer__title">Follow Us</h2>
              <ul className="gh-footer__list">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="gh-footer__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="gh-footer__bottom">
            <span>
              © {year} {brand.name}. All rights reserved.
            </span>
            <ul className="gh-footer__legal">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="gh-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="gh-footer__credit">Made by [ENG Abd Alrhman Almallah]</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;