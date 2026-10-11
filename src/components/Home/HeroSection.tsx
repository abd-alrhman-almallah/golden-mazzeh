import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/home/hero.webp";
import { brand } from "../../data/brand";
import {
  isPastDate,
  isValidStayRange,
} from "../../services/availabilityService";
import { toast } from "../../store/toastStore";

const guestOptions = [1, 2, 3, 4, 5, 6];
const roomOptions = [1, 2, 3, 4];

const styles = `
.gh-hero {
  background: #FDFDFD;
  color: #04364F;
  padding-bottom: 24px;
}
.gh-hero__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 64px;
  align-items: center;
}
.gh-hero__label {
  margin: 0 0 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-hero__title {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 700;
  line-height: 1.1;
  color: #04364F;
  overflow-wrap: break-word;
}
.gh-hero__text {
  margin: 0 0 32px;
  max-width: 460px;
  font-size: 17px;
  line-height: 1.7;
  color: #04364F;
}
.gh-hero__cta {
  display: inline-block;
  padding: 14px 32px;
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
.gh-hero__cta:hover {
  background: #04364F;
}
.gh-hero__media {
  position: relative;
  z-index: 1;
  min-height: 520px;
  overflow: hidden;
  border-radius: 2px;
}

.gh-hero__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.gh-hero__caption {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FDFDFD;
  opacity: 0.8;
}
.gh-hero__search-wrap {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: -56px auto 0;
  padding: 0 24px;
}
.gh-search {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
  align-items: stretch;
  background: #FDFDFD;
  border: 1px solid #EFEFF2;
  border-radius: 2px;
  box-shadow: 0 12px 32px rgba(4, 54, 79, 0.12);
}
.gh-search__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 18px 22px;
  border-right: 1px solid #EFEFF2;
  transition: background 0.2s ease;
}
.gh-search__field:focus-within {
  background: #EFEFF2;
}
.gh-search__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-search__input {
  width: 100%;
  min-width: 0;
  padding: 2px 0;
  font: inherit;
  font-size: 15px;
  color: #04364F;
  background: transparent;
  border: 0;
  outline: none;
  color-scheme: light;
}
.gh-search__button {
  padding: 0 36px;
  background: #04364F;
  color: #FDFDFD;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
  transition: background 0.2s ease;
}
.gh-search__button:hover {
  background: #601E34;
}
.gh-hero a:focus-visible,
.gh-hero button:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}

@media (max-width: 900px) {
  .gh-hero__inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
    padding-top: 32px;
  }
  .gh-hero__media {
    min-height: 320px;
  }
  .gh-hero__search-wrap {
    margin-top: -32px;
  }
  .gh-search {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .gh-search__field {
    border-bottom: 1px solid #EFEFF2;
  }
  .gh-search__field:nth-child(2n) {
    border-right: 0;
  }
  .gh-search__button {
    grid-column: 1 / -1;
    padding: 18px;
  }
}
@media (max-width: 560px) {
  .gh-search {
    grid-template-columns: minmax(0, 1fr);
  }
  .gh-search__field {
    border-right: 0;
  }
}
`;

function HeroSection() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

  // Sends the search to the booking page, which fills its form from the address
  const handleSearch = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const checkInValue = String(data.get("checkIn") ?? "");
    const checkOutValue = String(data.get("checkOut") ?? "");

    if (Boolean(checkInValue) !== Boolean(checkOutValue)) {
      toast.error("Please choose both a check-in and a check-out date.");
      return;
    }

    if (checkInValue && checkOutValue) {
      if (isPastDate(checkInValue)) {
        toast.error("Check-in can't be in the past.");
        return;
      }
      if (!isValidStayRange(checkInValue, checkOutValue)) {
        toast.error("Check-out must be after check-in.");
        return;
      }
    }

    const params = new URLSearchParams();
    if (checkInValue && checkOutValue) {
      params.set("checkIn", checkInValue);
      params.set("checkOut", checkOutValue);
    }
    params.set("guests", String(data.get("guests") ?? ""));
    params.set("rooms", String(data.get("rooms") ?? ""));

    navigate(`/booking?${params.toString()}`);
  };

  return (
    <>
      <style>{styles}</style>
      <section className="gh-hero" aria-labelledby="gh-hero-title">
        <div className="gh-hero__inner">
          <div>
            <p className="gh-hero__label">Welcome to {brand.name}</p>
            <h1 id="gh-hero-title" className="gh-hero__title">
              Where every stay feels extraordinary
            </h1>
            <p className="gh-hero__text">
              Discover refined rooms, exceptional service and unforgettable
              moments at {brand.name}.
            </p>
            <Link to="/rooms" className="gh-hero__cta">
              Explore Rooms
            </Link>
          </div>

          <div className="gh-hero__media">
            <img src={heroImage} alt={brand.name} />
          </div>
        </div>

        <div className="gh-hero__search-wrap">
          <form
            className="gh-search"
            aria-label="Booking search"
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch(event.currentTarget);
            }}
          >
            <div className="gh-search__field">
              <label className="gh-search__label" htmlFor="gh-checkin">
                Check-in
              </label>
              <input
                id="gh-checkin"
                name="checkIn"
                className="gh-search__input"
                type="date"
                min={today}
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </div>

            <div className="gh-search__field">
              <label className="gh-search__label" htmlFor="gh-checkout">
                Check-out
              </label>
              <input
                id="gh-checkout"
                name="checkOut"
                className="gh-search__input"
                type="date"
                min={checkIn || today}
              />
            </div>

            <div className="gh-search__field">
              <label className="gh-search__label" htmlFor="gh-guests">
                Guests
              </label>
              <select
                id="gh-guests"
                name="guests"
                className="gh-search__input"
                defaultValue="2"
              >
                {guestOptions.map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <div className="gh-search__field">
              <label className="gh-search__label" htmlFor="gh-rooms">
                Rooms
              </label>
              <select
                id="gh-rooms"
                name="rooms"
                className="gh-search__input"
                defaultValue="1"
              >
                {roomOptions.map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "Room" : "Rooms"}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="gh-search__button">
              Search Rooms
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default HeroSection;