import { Link } from "react-router-dom";
import experiencesImage from "../../assets/images/home/experiences.webp";
import HeroSection from "../../components/Home/HeroSection";
import FeaturedRooms from "../../components/Home/FeaturedRooms";
import Testimonials from "../../components/Home/Testimonials";
import { brand } from "../../data/brand";

// Google Maps embed for the hotel (no API key needed).
// If the pin is not exactly right: open the hotel in Google Maps, choose
// Share > Embed a map, and paste the src="..." value here.
// brand.locationUrl (src/data/brand.ts) is the link that opens Google Maps.
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Golden+Mazzeh+Hotel,+Mazzeh,+Damascus,+Syria&hl=en&output=embed";

const experiences = [
  { title: "Fine Dining", text: "Seasonal menus crafted with care." },
  { title: "Spa & Wellness", text: "Quiet spaces to restore and unwind." },
  { title: "Pool", text: "A serene place to swim and relax." },
  { title: "Fitness", text: "A well-equipped space to keep your routine." },
  { title: "Events", text: "Elegant settings for meetings and celebrations." },
];

const whyFeatures = [
  {
    title: "Exceptional Hospitality",
    text: "Warm, attentive care from the moment you arrive.",
  },
  {
    title: "Personalized Service",
    text: "Thoughtful touches tailored to every guest.",
  },
  {
    title: "Premium Facilities",
    text: "Elegant spaces designed for comfort and calm.",
  },
  {
    title: "Prime Location",
    text: "Effortless access to the best of the city.",
  },
];

// TEMPORARY: generic sample attractions, replace with real ones later
const attractions = [
  "Historic Old Town",
  "Central Park",
  "Waterfront Promenade",
  "Shopping District",
];

const styles = `
.gh-home {
  width: 100%;
  background: #FDFDFD;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-home *,
.gh-home *::before,
.gh-home *::after {
  box-sizing: border-box;
}
.gh-home__section {
  padding: 96px 0;
  scroll-margin-top: 90px;
}
.gh-home__section--light {
  background: #EFEFF2;
}
.gh-home__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.gh-home__split {
  display: grid;
  gap: 64px;
  align-items: center;
}
.gh-home__split--media-left {
  grid-template-columns: 1fr 1fr;
}
.gh-home__split--media-right {
  grid-template-columns: 1fr 1.2fr;
}
.gh-home__label {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-home__title {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 700;
  line-height: 1.15;
  color: #04364F;
}
.gh-home__text {
  margin: 0 0 32px;
  max-width: 480px;
  font-size: 16px;
  line-height: 1.7;
  color: #04364F;
}
.gh-home__media {
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  overflow: hidden;
  border-radius: 2px;
}
.gh-home__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.gh-home__media--experiences {
  min-height: 560px;
  background: #EFEFF2;
}
/* Location: the map fills the box (same size as the old image area) */
.gh-home__media--location {
  min-height: 480px;
  padding: 0;
  background: #EFEFF2;
}
.gh-home__map-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.gh-home__maplink {
  position: absolute;
  left: 50%;
  bottom: 16px;
  z-index: 2;
  transform: translateX(-50%);
  padding: 12px 22px;
  background: #601E34;
  color: #FDFDFD;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 2px;
  box-shadow: 0 8px 20px rgba(4, 54, 79, 0.25);
  transition: background 0.2s ease;
}
.gh-home__maplink:hover {
  background: #04364F;
}
.gh-home__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.gh-home__exp-item {
  padding: 18px 0;
  border-top: 1px solid rgba(4, 54, 79, 0.15);
}
.gh-home__exp-item:last-child {
  border-bottom: 1px solid rgba(4, 54, 79, 0.15);
}
.gh-home__exp-title {
  margin: 0 0 4px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 700;
  color: #04364F;
}
.gh-home__exp-text {
  margin: 0;
  font-size: 14px;
  color: #93979A;
}
.gh-home__why-header {
  max-width: 560px;
  margin-bottom: 56px;
}
.gh-home__why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}
.gh-home__why-item::before {
  content: "";
  display: block;
  width: 40px;
  height: 2px;
  margin-bottom: 20px;
  background: #601E34;
}
.gh-home__why-title {
  margin: 0 0 10px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 700;
  color: #04364F;
}
.gh-home__why-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #04364F;
}
.gh-home__nearby-title {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-home__nearby-item {
  padding: 8px 0;
  font-size: 16px;
  color: #04364F;
}
.gh-home__nearby-item::before {
  content: "— ";
  color: #601E34;
}
.gh-home__cta {
  text-align: center;
}
.gh-home__cta-title {
  margin: 0 0 32px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  color: #04364F;
}
.gh-home__btn {
  display: inline-block;
  padding: 14px 36px;
  background: #601E34;
  color: #FDFDFD;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  transition: background 0.2s ease;
}
.gh-home__btn:hover {
  background: #04364F;
}
.gh-home a:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .gh-home__section {
    padding: 64px 0;
  }
  .gh-home__split--media-left,
  .gh-home__split--media-right {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .gh-home__media--experiences,
  .gh-home__media--location {
    min-height: 300px;
  }
  /* keep the map above the text on mobile for the location section */
  .gh-home__split--media-right .gh-home__media {
    order: -1;
  }
  .gh-home__why-header {
    margin-bottom: 40px;
  }
  .gh-home__why-grid {
    grid-template-columns: 1fr 1fr;
    gap: 36px 28px;
  }
}
@media (max-width: 560px) {
  .gh-home__why-grid {
    grid-template-columns: 1fr;
  }
}
`;

function Home() {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-home">
        <HeroSection />

        <FeaturedRooms />

        {/* Experiences (editorial) */}
        <section
          id="experiences"
          className="gh-home__section gh-home__section--light"
          aria-labelledby="gh-experiences-title"
        >
          <div className="gh-home__container">
            <div className="gh-home__split gh-home__split--media-left">
              <div className="gh-home__media gh-home__media--experiences">
                <img
                  src={experiencesImage}
                  alt={`${brand.name} experiences`}
                  loading="lazy"
                />
              </div>

              <div>
                <p className="gh-home__label">Experiences</p>
                <h2 id="gh-experiences-title" className="gh-home__title">
                  Moments beyond the room
                </h2>
                <p className="gh-home__text">
                  From memorable meals to quiet moments of calm, every
                  experience at {brand.name} is designed with care.
                </p>
                <ul className="gh-home__list">
                  {experiences.map((item) => (
                    <li key={item.title} className="gh-home__exp-item">
                      <h3 className="gh-home__exp-title">{item.title}</h3>
                      <p className="gh-home__exp-text">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why the hotel (minimal 4 features) */}
        <section
          id="hotel"
          className="gh-home__section"
          aria-labelledby="gh-why-title"
        >
          <div className="gh-home__container">
            <div className="gh-home__why-header">
              <p className="gh-home__label">The Hotel</p>
              <h2 id="gh-why-title" className="gh-home__title">
                Why {brand.name}
              </h2>
            </div>
            <div className="gh-home__why-grid">
              {whyFeatures.map((feature) => (
                <div key={feature.title} className="gh-home__why-item">
                  <h3 className="gh-home__why-title">{feature.title}</h3>
                  <p className="gh-home__why-text">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guest Reviews */}
        <Testimonials />

        {/* Location (editorial) with an embedded Google Map */}
        <section
          className="gh-home__section"
          aria-labelledby="gh-location-title"
        >
          <div className="gh-home__container">
            <div className="gh-home__split gh-home__split--media-right">
              <div>
                <p className="gh-home__label">Location</p>
                <h2 id="gh-location-title" className="gh-home__title">
                  In the heart of it all
                </h2>
                <p className="gh-home__text">
                  Set in a prime position, {brand.name} puts the city's finest
                  experiences within easy reach.
                </p>
                <h3 className="gh-home__nearby-title">Nearby</h3>
                <ul className="gh-home__list">
                  {attractions.map((place) => (
                    <li key={place} className="gh-home__nearby-item">
                      {place}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="gh-home__media gh-home__media--location">
                <iframe
                  className="gh-home__map-frame"
                  title={`${brand.name} on Google Maps`}
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {brand.locationUrl && (
                  <a
                    href={brand.locationUrl}
                    className="gh-home__maplink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Maps ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="gh-home__section gh-home__section--light gh-home__cta"
          aria-labelledby="gh-cta-title"
        >
          <div className="gh-home__container">
            <h2 id="gh-cta-title" className="gh-home__cta-title">
              Your stay starts here.
            </h2>
            <Link to="/booking" className="gh-home__btn">
              Book Your Stay
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;