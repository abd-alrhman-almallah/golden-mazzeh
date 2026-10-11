import type { ReactNode } from "react";
import type { Room } from "../../types/room";
import type {
  BookingFieldHint,
  BookingFormErrors,
  BookingFormValues,
} from "../../types/booking";
import { guestOptions, roomCountOptions } from "../../data/bookingOptions";
import { formatPrice } from "../../utils/formatPrice";

interface BookingFormProps {
  formId: string;
  rooms: Room[];
  values: BookingFormValues;
  errors: BookingFormErrors;
  /** Live availability message shown under the room field */
  roomHint?: BookingFieldHint | null;
  onChange: (field: keyof BookingFormValues, value: string) => void;
  onSubmit: () => void;
}

const ids: Record<keyof BookingFormValues, string> = {
  roomId: "gh-booking-room",
  checkIn: "gh-booking-checkin",
  checkOut: "gh-booking-checkout",
  guests: "gh-booking-guests",
  rooms: "gh-booking-rooms",
};

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: BookingFieldHint | null;
  children: ReactNode;
}

function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div className="gh-bookingform__field">
      <label className="gh-bookingform__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="gh-bookingform__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${id}-hint`}
          className={`gh-bookingform__hint gh-bookingform__hint--${hint.tone}`}
          role="status"
        >
          {hint.text}
        </p>
      ) : null}
    </div>
  );
}

const styles = `
.gh-bookingform {
  padding: 40px;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.08);
  border-radius: 2px;
}
.gh-bookingform__group + .gh-bookingform__group {
  margin-top: 36px;
}
.gh-bookingform__heading {
  margin: 0 0 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-bookingform__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.gh-bookingform__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.gh-bookingform__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-bookingform__input {
  width: 100%;
  padding: 14px 16px;
  font: inherit;
  font-size: 15px;
  color: #04364F;
  background: #FDFDFD;
  border: 1px solid #93979A;
  border-radius: 2px;
  color-scheme: light;
  transition: border-color 0.2s ease;
}
.gh-bookingform__input:focus {
  outline: none;
  border-color: #04364F;
  box-shadow: 0 0 0 1px #04364F;
}
.gh-bookingform__input--invalid {
  border-color: #601E34;
}
.gh-bookingform__error {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #601E34;
}
.gh-bookingform__hint {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #93979A;
}
.gh-bookingform__hint--success {
  font-weight: 600;
  color: #04364F;
}
.gh-bookingform__hint--error {
  font-weight: 600;
  color: #601E34;
}

@media (max-width: 640px) {
  .gh-bookingform {
    padding: 24px;
  }
  .gh-bookingform__row {
    grid-template-columns: 1fr;
  }
}
`;

function BookingForm({
  formId,
  rooms,
  values,
  errors,
  roomHint,
  onChange,
  onSubmit,
}: BookingFormProps) {
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

  const controlProps = (field: keyof BookingFormValues) => ({
    id: ids[field],
    className: errors[field]
      ? "gh-bookingform__input gh-bookingform__input--invalid"
      : "gh-bookingform__input",
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${ids[field]}-error` : undefined,
  });

  return (
    <>
      <style>{styles}</style>
      <form
        id={formId}
        className="gh-bookingform"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="gh-bookingform__group">
          <h2 className="gh-bookingform__heading">Select Room</h2>
          <Field
            id={ids.roomId}
            label="Room"
            error={errors.roomId}
            hint={roomHint}
          >
            <select
              {...controlProps("roomId")}
              value={values.roomId}
              onChange={(event) => onChange("roomId", event.target.value)}
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} — {formatPrice(room.price)} / night
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="gh-bookingform__group">
          <h2 className="gh-bookingform__heading">Your Dates</h2>
          <div className="gh-bookingform__row">
            <Field id={ids.checkIn} label="Check-in" error={errors.checkIn}>
              <input
                type="date"
                {...controlProps("checkIn")}
                min={today}
                value={values.checkIn}
                onChange={(event) => onChange("checkIn", event.target.value)}
              />
            </Field>
            <Field id={ids.checkOut} label="Check-out" error={errors.checkOut}>
              <input
                type="date"
                {...controlProps("checkOut")}
                min={values.checkIn || today}
                value={values.checkOut}
                onChange={(event) => onChange("checkOut", event.target.value)}
              />
            </Field>
          </div>
        </div>

        <div className="gh-bookingform__group">
          <h2 className="gh-bookingform__heading">Guests &amp; Rooms</h2>
          <div className="gh-bookingform__row">
            <Field id={ids.guests} label="Guests" error={errors.guests}>
              <select
                {...controlProps("guests")}
                value={values.guests}
                onChange={(event) => onChange("guests", event.target.value)}
              >
                {guestOptions.map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={ids.rooms} label="Rooms" error={errors.rooms}>
              <select
                {...controlProps("rooms")}
                value={values.rooms}
                onChange={(event) => onChange("rooms", event.target.value)}
              >
                {roomCountOptions.map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "Room" : "Rooms"}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      </form>
    </>
  );
}

export default BookingForm;