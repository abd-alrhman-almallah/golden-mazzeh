import { useEffect, useState } from "react";
import roomsHeroImage from "../../assets/images/rooms/rooms-hero.webp";
import RoomList from "../../components/Rooms/RoomList";
import EmptyState from "../../components/General/EmptyState";
import ErrorState from "../../components/General/ErrorState";
import Loader from "../../components/General/Loader";
import { getRooms } from "../../services/roomService";
import type { Room } from "../../types/room";

// A dark overlay in the brand colors keeps the white hero text easy to read
const heroBackground = `linear-gradient(120deg, rgba(4, 54, 79, 0.86) 0%, rgba(4, 54, 79, 0.7) 60%, rgba(96, 30, 52, 0.6) 100%), url(${roomsHeroImage})`;

const styles = `
.gh-roomspage {
  width: 100%;
  background: #EFEFF2;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-roomspage *,
.gh-roomspage *::before,
.gh-roomspage *::after {
  box-sizing: border-box;
}
.gh-roomspage__hero {
  background-color: #04364F;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 104px 0 96px;
}
.gh-roomspage__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.gh-roomspage__label {
  margin: 0 0 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #EFEFF2;
}
.gh-roomspage__title {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 700;
  line-height: 1.1;
  color: #FDFDFD;
}
.gh-roomspage__subtitle {
  margin: 0;
  max-width: 560px;
  font-size: 17px;
  line-height: 1.7;
  color: #EFEFF2;
}
.gh-roomspage__listing {
  padding: 72px 0 96px;
}

@media (max-width: 900px) {
  .gh-roomspage__hero {
    padding: 72px 0 64px;
  }
  .gh-roomspage__listing {
    padding: 48px 0 64px;
  }
}
`;

function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    getRooms()
      .then((data) => {
        if (isCancelled) return;
        setRooms(data);
        setIsLoading(false);
      })
      .catch(() => {
        if (isCancelled) return;
        setError("We couldn't load the rooms. Please try again.");
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [attempt]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setAttempt((current) => current + 1);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="gh-roomspage">
        <header
          className="gh-roomspage__hero"
          style={{ backgroundImage: heroBackground }}
        >
          <div className="gh-roomspage__container">
            <p className="gh-roomspage__label">Rooms &amp; Suites</p>
            <h1 className="gh-roomspage__title">Our Rooms</h1>
            <p className="gh-roomspage__subtitle">
              Thoughtfully designed rooms and suites, each offering comfort,
              privacy and a refined sense of calm.
            </p>
          </div>
        </header>

        <section className="gh-roomspage__listing" aria-label="Room listing">
          <div className="gh-roomspage__container">
            {isLoading ? (
              <Loader message="Loading rooms..." />
            ) : error ? (
              <ErrorState message={error} onRetry={handleRetry} />
            ) : rooms.length === 0 ? (
              <EmptyState
                title="No rooms to show"
                text="Our rooms are not available to display right now. Please check back soon."
                actionLabel="Back to Home"
                actionTo="/"
              />
            ) : (
              <RoomList rooms={rooms} />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Rooms;