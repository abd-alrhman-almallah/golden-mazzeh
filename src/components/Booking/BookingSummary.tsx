import type { Room } from "../../types/room";
import type { BookingFormValues } from "../../types/booking";
import { isValidStayRange } from "../../services/availabilityService";
import { getNights } from "../../utils/bookings";
import { formatPrice } from "../../utils/formatPrice";

interface BookingSummaryProps {
  formId: string;
  room?: Room;
  values: BookingFormValues;
  isSubmitting: boolean;
  submitError: string | null;
}

interface SummaryRow {
  label: string;
  value: string;
  emphasis?: boolean;
}

function formatDate(value: string): string {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const styles = `
.gh-bookingsummary {
  position: sticky;
  top: 100px;
  padding: 32px;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
  box-shadow: 0 16px 36px rgba(4, 54, 79, 0.08);
}
.gh-bookingsummary__thumb {
  position: relative;
  display: flex;
  align-items: flex-end;
  aspect-ratio: 16 / 9;
  margin: 0 0 24px;
  padding: 12px 16px;
  overflow: hidden;
  border-radius: 2px;
}
/* PLACEHOLDERS: shown only when a room has no image */
.gh-bookingsummary__thumb--a {
  background: linear-gradient(135deg, #04364F 0%, #601E34 100%);
}
.gh-bookingsummary__thumb--b {
  background: linear-gradient(135deg, #601E34 0%, #04364F 100%);
}
.gh-bookingsummary__thumb--c {
  background: linear-gradient(200deg, #04364F 0%, #601E34 100%);
}
.gh-bookingsummary__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gh-bookingsummary__caption {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FDFDFD;
  opacity: 0.8;
}
.gh-bookingsummary__title {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 700;
  color: #04364F;
}
.gh-bookingsummary__list {
  margin: 0 0 24px;
}
.gh-bookingsummary__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #EFEFF2;
}
.gh-bookingsummary__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-bookingsummary__value {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
  color: #04364F;
}
.gh-bookingsummary__value--empty {
  font-weight: 400;
  color: #93979A;
}
.gh-bookingsummary__value--emphasis {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 700;
}
.gh-bookingsummary__formula {
  margin: -12px 0 24px;
  font-size: 13px;
  text-align: right;
  color: #93979A;
}
.gh-bookingsummary__cta {
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
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.gh-bookingsummary__cta:hover:not(:disabled) {
  background: #04364F;
}
.gh-bookingsummary__cta:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.gh-bookingsummary__cta:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}
.gh-bookingsummary__notice {
  margin: 16px 0 0;
  padding: 12px 16px;
  background: #EFEFF2;
  font-size: 14px;
  line-height: 1.6;
  color: #04364F;
  border-radius: 2px;
}
.gh-bookingsummary__notice--error {
  color: #601E34;
  border-left: 3px solid #601E34;
}

@media (max-width: 1024px) {
  .gh-bookingsummary {
    position: static;
  }
}
@media (max-width: 640px) {
  .gh-bookingsummary {
    padding: 24px;
  }
}
`;

function BookingSummary({
  formId,
  room,
  values,
  isSubmitting,
  submitError,
}: BookingSummaryProps) {
  const guests = Number(values.guests);
  const roomCount = Number(values.rooms);

  // Total = room price x number of rooms x number of nights
  const nights = isValidStayRange(values.checkIn, values.checkOut)
    ? getNights(values.checkIn, values.checkOut)
    : 0;
  const total = room && nights > 0 ? room.price * roomCount * nights : null;

  const rows: SummaryRow[] = [
    { label: "Selected Room", value: room ? room.name : "" },
    { label: "Check-in", value: formatDate(values.checkIn) },
    { label: "Check-out", value: formatDate(values.checkOut) },
    {
      label: "Nights",
      value: nights > 0 ? `${nights} ${nights === 1 ? "Night" : "Nights"}` : "",
    },
    {
      label: "Guests",
      value: `${guests} ${guests === 1 ? "Guest" : "Guests"}`,
    },
    {
      label: "Rooms",
      value: `${roomCount} ${roomCount === 1 ? "Room" : "Rooms"}`,
    },
    {
      label: "Price per night",
      value: room ? `${formatPrice(room.price)} / night` : "",
    },
    {
      label: "Total",
      value: total !== null ? formatPrice(total) : "",
      emphasis: true,
    },
  ];

  return (
    <>
      <style>{styles}</style>
      <aside className="gh-bookingsummary" aria-label="Booking summary">
        {room && (
          <div
            className={`gh-bookingsummary__thumb gh-bookingsummary__thumb--${room.tone}`}
          >
            {room.image ? (
              <img
                className="gh-bookingsummary__img"
                src={room.image}
                alt={room.name}
              />
            ) : (
              <span className="gh-bookingsummary__caption">
                Room image placeholder
              </span>
            )}
          </div>
        )}

        <h2 className="gh-bookingsummary__title">Booking Summary</h2>

        <dl className="gh-bookingsummary__list">
          {rows.map((row) => {
            const valueClass = [
              "gh-bookingsummary__value",
              row.value ? "" : "gh-bookingsummary__value--empty",
              row.value && row.emphasis ? "gh-bookingsummary__value--emphasis" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={row.label} className="gh-bookingsummary__row">
                <dt className="gh-bookingsummary__label">{row.label}</dt>
                <dd className={valueClass}>{row.value || "—"}</dd>
              </div>
            );
          })}
        </dl>

        {room && total !== null && (
          <p className="gh-bookingsummary__formula">
            {formatPrice(room.price)} × {roomCount}{" "}
            {roomCount === 1 ? "room" : "rooms"} × {nights}{" "}
            {nights === 1 ? "night" : "nights"}
          </p>
        )}

        <button
          type="submit"
          form={formId}
          className="gh-bookingsummary__cta"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Booking..." : "Complete Booking"}
        </button>

        {submitError && (
          <p
            className="gh-bookingsummary__notice gh-bookingsummary__notice--error"
            role="alert"
          >
            {submitError}
          </p>
        )}
      </aside>
    </>
  );
}

export default BookingSummary;