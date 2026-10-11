import { brand } from "../../data/brand";

const styles = `
.gh-contact {
  width: 100%;
  background: #EFEFF2;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-contact *,
.gh-contact *::before,
.gh-contact *::after {
  box-sizing: border-box;
}
.gh-contact__hero {
  background: linear-gradient(120deg, #04364F 0%, #04364F 60%, #601E34 100%);
  padding: 104px 0 96px;
}
.gh-contact__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.gh-contact__label {
  margin: 0 0 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #EFEFF2;
}
.gh-contact__title {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 700;
  line-height: 1.1;
  color: #FDFDFD;
}
.gh-contact__subtitle {
  margin: 0;
  max-width: 560px;
  font-size: 17px;
  line-height: 1.7;
  color: #EFEFF2;
}
.gh-contact__content {
  padding: 72px 0 96px;
}
.gh-contact__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}
.gh-contact__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 32px;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
  box-shadow: 0 8px 24px rgba(4, 54, 79, 0.05);
}
.gh-contact__card::before {
  content: "";
  display: block;
  width: 32px;
  height: 2px;
  margin-bottom: 12px;
  background: #601E34;
}
.gh-contact__card-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-contact__value {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  color: #04364F;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 0.2s ease;
}
.gh-contact__value:hover {
  color: #601E34;
}
.gh-contact__text {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.6;
  color: #04364F;
}
.gh-contact__btn {
  display: inline-block;
  margin-top: auto;
  padding: 12px 24px;
  background: #601E34;
  color: #FDFDFD;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border: 1px solid #601E34;
  border-radius: 2px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.gh-contact__btn:hover {
  background: #04364F;
  border-color: #04364F;
}
.gh-contact__btn--outline {
  background: transparent;
  color: #04364F;
  border-color: #04364F;
}
.gh-contact__btn--outline:hover {
  background: #04364F;
  color: #FDFDFD;
}
.gh-contact__social {
  margin-top: 24px;
  padding: 32px;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
}
.gh-contact__social-title {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  color: #04364F;
}
.gh-contact__social-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}
.gh-contact a:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}

@media (max-width: 760px) {
  .gh-contact__hero {
    padding: 72px 0 64px;
  }
  .gh-contact__content {
    padding: 48px 0 64px;
  }
  .gh-contact__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .gh-contact__card,
  .gh-contact__social {
    padding: 24px;
  }
}
`;

function Contact() {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-contact">
        <header className="gh-contact__hero">
          <div className="gh-contact__container">
            <p className="gh-contact__label">Contact</p>
            <h1 className="gh-contact__title">Get in Touch</h1>
            <p className="gh-contact__subtitle">
              Questions about a stay at {brand.name}, {brand.slogan}? Call or
              write to us and we will be happy to help.
            </p>
          </div>
        </header>

        <section className="gh-contact__content" aria-label="Contact details">
          <div className="gh-contact__container">
            <div className="gh-contact__grid">
              <div className="gh-contact__card">
                <span className="gh-contact__card-label">Phone</span>
                <a href={brand.phoneHref} className="gh-contact__value">
                  {brand.phone}
                </a>
                <p className="gh-contact__text">
                  Call us about rooms, rates or an existing reservation.
                </p>
                <a href={brand.phoneHref} className="gh-contact__btn">
                  Call Now
                </a>
              </div>

              <div className="gh-contact__card">
                <span className="gh-contact__card-label">Email</span>
                <a href={brand.emailHref} className="gh-contact__value">
                  {brand.email}
                </a>
                <p className="gh-contact__text">
                  Send us a message and we will reply as soon as we can.
                </p>
                <a href={brand.emailHref} className="gh-contact__btn">
                  Send Email
                </a>
              </div>
            </div>

            <div className="gh-contact__social">
              <h2 className="gh-contact__social-title">Follow Us</h2>
              <p className="gh-contact__text">
                Stay close to {brand.name} on social media.
              </p>
              <div className="gh-contact__social-actions">
                <a
                  href={brand.instagramUrl}
                  className="gh-contact__btn gh-contact__btn--outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href={brand.facebookUrl}
                  className="gh-contact__btn gh-contact__btn--outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;