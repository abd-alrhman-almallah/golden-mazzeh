import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorState from "../../components/General/ErrorState";
import Loader from "../../components/General/Loader";
import RoomGallery from "../../components/RoomDetails/RoomGallery";
import RoomInfo from "../../components/RoomDetails/RoomInfo";
import { getRoomById } from "../../services/roomService";
import type { Room } from "../../types/room";
import { formatPrice } from "../../utils/formatPrice";

const styles = `
.gh-roomdetails {
  width: 100%;
  background: #FDFDFD;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-roomdetails *,
.gh-roomdetails *::before,
.gh-roomdetails *::after {
  box-sizing: border-box;
}
.gh-roomdetails__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 96px;
}
.gh-roomdetails__back {
  display: inline-block;
  margin-bottom: 24px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #601E34;
  text-decoration: none;
  transition: color 0.2s ease;
}
.gh-roomdetails__back:hover {
  color: #04364F;
}
.gh-roomdetails__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 56px;
  align-items: start;
  margin-top: 56px;
}
.gh-roomdetails__booking {
  position: sticky;
  top: 100px;
  padding: 32px;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
  box-shadow: 0 16px 36px rgba(4, 54, 79, 0.08);
}
.gh-roomdetails__from {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-roomdetails__price-row {
  margin: 0 0 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #EFEFF2;
}
.gh-roomdetails__price {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 36px;
  font-weight: 700;
  color: #04364F;
}
.gh-roomdetails__night {
  font-size: 14px;
  color: #93979A;
}
.gh-roomdetails__cta {
  display: block;
  width: 100%;
  padding: 16px 24px;
  background: #601E34;
  color: #FDFDFD;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.gh-roomdetails__cta:hover {
  background: #04364F;
}
.gh-roomdetails__notfound {
  padding: 72px 0 24px;
  text-align: center;
}
.gh-roomdetails__notfound-title {
  margin: 0 0 16px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: #04364F;
}
.gh-roomdetails__notfound-text {
  margin: 0 auto 32px;
  max-width: 420px;
  font-size: 16px;
  line-height: 1.7;
  color: #04364F;
}
.gh-roomdetails__notfound .gh-roomdetails__cta {
  display: inline-block;
  width: auto;
  padding: 14px 32px;
}
.gh-roomdetails a:focus-visible,
.gh-roomdetails button:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}

@media (max-width: 1024px) {
  .gh-roomdetails__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
    margin-top: 40px;
  }
  .gh-roomdetails__booking {
    position: static;
  }
}
@media (max-width: 640px) {
  .gh-roomdetails__container {
    padding: 28px 20px 64px;
  }
  .gh-roomdetails__booking {
    padding: 24px;
  }
}
`;

interface LoadResult {
  id: string | undefined;
  room: Room | undefined;
  hasError: boolean;
}

function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<LoadResult | null>(null);
  const [attempt, setAttempt] = useState(0);

  const roomId = Number(id);
  const isValidId =
    id !== undefined && Number.isInteger(roomId) && String(roomId) === id;

  useEffect(() => {
    if (!isValidId) return;

    let isCancelled = false;

    getRoomById(roomId)
      .then((found) => {
        if (isCancelled) return;
        setResult({ id, room: found, hasError: false });
      })
      .catch(() => {
        if (isCancelled) return;
        setResult({ id, room: undefined, hasError: true });
      });

    return () => {
      isCancelled = true;
    };
  }, [id, roomId, isValidId, attempt]);

  const handleRetry = () => {
    setResult(null);
    setAttempt((current) => current + 1);
  };

  const isLoading = isValidId && (result === null || result.id !== id);
  const hasError = isValidId && !isLoading && result?.hasError === true;
  const room = isValidId && !isLoading ? result?.room : undefined;

  return (
    <>
      <style>{styles}</style>
      <div className="gh-roomdetails">
        <div className="gh-roomdetails__container">
          {isLoading ? (
            <Loader message="Loading room..." />
          ) : hasError ? (
            <ErrorState
              message="We couldn't load this room. Please try again."
              onRetry={handleRetry}
            />
          ) : room ? (
            <>
              <Link to="/rooms" className="gh-roomdetails__back">
                ← Back to Rooms
              </Link>

              <RoomGallery room={room} />

              <div className="gh-roomdetails__layout">
                <RoomInfo room={room} />

                <aside
                  className="gh-roomdetails__booking"
                  aria-label="Room booking"
                >
                  <div className="gh-roomdetails__price-row">
                    <span className="gh-roomdetails__from">From</span>
                    <span className="gh-roomdetails__price">
                      {formatPrice(room.price)}
                    </span>{" "}
                    <span className="gh-roomdetails__night">/ night</span>
                  </div>
                  <Link
                    to={`/booking?room=${room.id}`}
                    className="gh-roomdetails__cta"
                  >
                    Book This Room
                  </Link>
                </aside>
              </div>
            </>
          ) : (
            <div className="gh-roomdetails__notfound">
              <h1 className="gh-roomdetails__notfound-title">Room Not Found</h1>
              <p className="gh-roomdetails__notfound-text">
                The room you are looking for doesn't exist or is no longer
                available.
              </p>
              <Link to="/rooms" className="gh-roomdetails__cta">
                Back to Rooms
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RoomDetails;