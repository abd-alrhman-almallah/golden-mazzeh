import { useState } from "react";
import type { Room } from "../../types/room";

interface RoomGalleryProps {
  room: Room;
}

const styles = `
.gh-roomgallery {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 560px;
  padding: 24px;
  border-radius: 2px;
  overflow: hidden;
}
/* PLACEHOLDERS: shown only when a room has no image */
.gh-roomgallery--a {
  background: linear-gradient(135deg, #04364F 0%, #601E34 100%);
}
.gh-roomgallery--b {
  background: linear-gradient(135deg, #601E34 0%, #04364F 100%);
}
.gh-roomgallery--c {
  background: linear-gradient(200deg, #04364F 0%, #601E34 100%);
}
.gh-roomgallery__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gh-roomgallery__caption {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FDFDFD;
  opacity: 0.8;
}
.gh-roomgallery__thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}
.gh-roomgallery__thumb {
  position: relative;
  display: block;
  width: 112px;
  aspect-ratio: 3 / 2;
  padding: 0;
  overflow: hidden;
  background: #EFEFF2;
  border: 2px solid transparent;
  border-radius: 2px;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s ease, border-color 0.2s ease;
}
.gh-roomgallery__thumb:hover {
  opacity: 1;
}
.gh-roomgallery__thumb--active {
  border-color: #601E34;
  opacity: 1;
}
.gh-roomgallery__thumb:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}
.gh-roomgallery__thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 640px) {
  .gh-roomgallery {
    aspect-ratio: 4 / 3;
    padding: 16px;
  }
  .gh-roomgallery__thumb {
    width: 88px;
  }
}
`;

function RoomGallery({ room }: RoomGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Photos: the gallery when available, otherwise the single main image
  const images =
    room.gallery && room.gallery.length > 0
      ? room.gallery
      : room.image
        ? [room.image]
        : [];

  const index = Math.min(activeIndex, Math.max(images.length - 1, 0));
  const activeImage = images[index];

  return (
    <>
      <style>{styles}</style>
      <div>
        <div className={`gh-roomgallery gh-roomgallery--${room.tone}`}>
          {activeImage ? (
            <img
              className="gh-roomgallery__img"
              src={activeImage}
              alt={`${room.name}, photo ${index + 1} of ${images.length}`}
            />
          ) : (
            <span className="gh-roomgallery__caption">
              Room image placeholder
            </span>
          )}
        </div>

        {images.length > 1 && (
          <ul
            className="gh-roomgallery__thumbs"
            aria-label={`${room.name} photos`}
          >
            {images.map((image, imageIndex) => (
              <li key={image}>
                <button
                  type="button"
                  className={
                    imageIndex === index
                      ? "gh-roomgallery__thumb gh-roomgallery__thumb--active"
                      : "gh-roomgallery__thumb"
                  }
                  aria-label={`Show photo ${imageIndex + 1} of ${images.length}`}
                  aria-pressed={imageIndex === index}
                  onClick={() => setActiveIndex(imageIndex)}
                >
                  <img src={image} alt="" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default RoomGallery;