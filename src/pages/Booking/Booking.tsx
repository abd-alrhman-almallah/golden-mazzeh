import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookingForm from "../../components/Booking/BookingForm";
import BookingSummary from "../../components/Booking/BookingSummary";
import { guestOptions, roomCountOptions } from "../../data/bookingOptions";
import { brand } from "../../data/brand";
import { rooms } from "../../data/rooms";
import {
  checkRoomAvailability,
  isPastDate,
  isValidStayRange,
} from "../../services/availabilityService";
import { BookingError, createBooking } from "../../services/bookingService";
import { validateBookingForm } from "../../services/bookingValidation";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";
import type {
  BookingFieldHint,
  BookingFormErrors,
  BookingFormValues,
} from "../../types/booking";
import { focusFirstInvalid } from "../../utils/focus";

const FORM_ID = "gh-booking-form";

const emptyValues: BookingFormValues = {
  roomId: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  rooms: "1",
};

type AvailabilityStatus = "available" | "booked" | "error";

interface AvailabilityState {
  key: string;
  status: AvailabilityStatus;
}

function findRoom(roomId: string) {
  return rooms.find((room) => String(room.id) === roomId);
}

// Starting values from the page address, for example:
// /booking?room=3 or /booking?checkIn=2026-11-01&checkOut=2026-11-04&guests=2&rooms=1
// Anything missing or invalid is ignored.
function readInitialValues(searchParams: URLSearchParams): BookingFormValues {
  const requestedRoom = findRoom(searchParams.get("room") ?? "");
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests"));
  const roomCount = Number(searchParams.get("rooms"));

  const hasValidDates =
    isValidStayRange(checkIn, checkOut) && !isPastDate(checkIn);

  return {
    roomId: requestedRoom ? String(requestedRoom.id) : "",
    checkIn: hasValidDates ? checkIn : "",
    checkOut: hasValidDates ? checkOut : "",
    guests: guestOptions.includes(guests) ? String(guests) : emptyValues.guests,
    rooms: roomCountOptions.includes(roomCount)
      ? String(roomCount)
      : emptyValues.rooms,
  };
}

// Identifies a room + dates selection, or null if it can't be checked yet
function getAvailabilityKey(
  roomId: string,
  checkIn: string,
  checkOut: string,
): string | null {
  const room = findRoom(roomId);
  if (
    !room ||
    isPastDate(checkIn) ||
    !isValidStayRange(checkIn, checkOut)
  ) {
    return null;
  }
  return `${room.id}|${checkIn}|${checkOut}`;
}

// Live message under the room field, shown as soon as room and dates are set
function getRoomHint(
  status: AvailabilityStatus | null,
  canCheck: boolean,
): BookingFieldHint | null {
  if (!canCheck) return null;

  if (status === null) {
    return { tone: "neutral", text: "Checking availability…" };
  }
  if (status === "available") {
    return { tone: "success", text: "✓ Available for these dates." };
  }
  if (status === "booked") {
    return {
      tone: "error",
      text: "✕ Not available for these dates. Try different dates or another room.",
    };
  }
  return {
    tone: "error",
    text: "We couldn't check availability. Please try again.",
  };
}

// Form rules come from bookingValidation.ts; availability is added on top
function validate(
  values: BookingFormValues,
  availabilityStatus: AvailabilityStatus | null,
): BookingFormErrors {
  const errors = validateBookingForm(values, findRoom(values.roomId));

  if (!errors.roomId) {
    if (availabilityStatus === "booked") {
      errors.roomId =
        "This room is not available for the selected dates. Please choose different dates or another room.";
    } else if (availabilityStatus === "error") {
      errors.roomId = "We couldn't check availability. Please try again.";
    }
  }

  return errors;
}

const styles = `
.gh-bookingpage {
  width: 100%;
  background: #EFEFF2;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
.gh-bookingpage *,
.gh-bookingpage *::before,
.gh-bookingpage *::after {
  box-sizing: border-box;
}
.gh-bookingpage__hero {
  background: linear-gradient(120deg, #04364F 0%, #04364F 60%, #601E34 100%);
  padding: 96px 0 88px;
}
.gh-bookingpage__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.gh-bookingpage__label {
  margin: 0 0 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-bookingpage__title {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 700;
  line-height: 1.1;
  color: #FDFDFD;
}
.gh-bookingpage__subtitle {
  margin: 0;
  max-width: 560px;
  font-size: 17px;
  line-height: 1.7;
  color: #EFEFF2;
}
.gh-bookingpage__content {
  padding: 72px 0 96px;
}
.gh-bookingpage__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 32px;
  align-items: start;
}

@media (max-width: 1024px) {
  .gh-bookingpage__layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 900px) {
  .gh-bookingpage__hero {
    padding: 72px 0 64px;
  }
  .gh-bookingpage__content {
    padding: 48px 0 64px;
  }
}
`;

function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useAuthStore((state) => state.user);

  const [values, setValues] = useState<BookingFormValues>(() =>
    readInitialValues(searchParams),
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityState | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // A ref blocks repeated submits instantly (state updates are not immediate)
  const isSubmittingRef = useRef(false);

  const { roomId, checkIn, checkOut } = values;

  // Check availability whenever a valid room + dates selection changes
  useEffect(() => {
    const room = findRoom(roomId);
    const key = getAvailabilityKey(roomId, checkIn, checkOut);
    if (!room || key === null) return;

    let isCancelled = false;

    checkRoomAvailability(room.id, checkIn, checkOut)
      .then((result) => {
        if (isCancelled) return;
        setAvailability({
          key,
          status: result.available
            ? "available"
            : result.reason === "booked"
              ? "booked"
              : "error",
        });
      })
      .catch(() => {
        if (isCancelled) return;
        setAvailability({ key, status: "error" });
      });

    return () => {
      isCancelled = true;
    };
  }, [roomId, checkIn, checkOut]);

  // Only trust a result that belongs to the current selection
  const currentKey = getAvailabilityKey(roomId, checkIn, checkOut);
  const availabilityStatus =
    availability !== null && availability.key === currentKey
      ? availability.status
      : null;

  const roomHint = getRoomHint(availabilityStatus, currentKey !== null);

  // Errors appear after the first submit, then update live as the user edits
  const errors = hasSubmitted ? validate(values, availabilityStatus) : {};

  const handleChange = (field: keyof BookingFormValues, value: string) => {
    setValues((previous) => {
      const next = { ...previous, [field]: value };

      // A check-out that is no longer after the new check-in is cleared
      if (
        field === "checkIn" &&
        value &&
        previous.checkOut &&
        !isValidStayRange(value, previous.checkOut)
      ) {
        next.checkOut = "";
      }

      return next;
    });
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    if (isSubmittingRef.current) return;

    setHasSubmitted(true);
    setSubmitError(null);

    // Never create a booking while there are validation errors
    if (Object.keys(validate(values, availabilityStatus)).length > 0) {
      focusFirstInvalid(FORM_ID);
      return;
    }

    const room = findRoom(values.roomId);
    if (!room) return;

    // The route is protected, this only keeps TypeScript and the service safe
    if (!user) {
      setSubmitError("Please sign in to complete your booking.");
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const booking = await createBooking(
        {
          roomId: room.id,
          checkIn: values.checkIn,
          checkOut: values.checkOut,
          guests: Number(values.guests),
          rooms: Number(values.rooms),
        },
        user,
      );

      // The toast stays visible on the confirmation page
      toast.success(`Booking ${booking.id} created. Status: Pending.`);

      // Stay in the "submitting" state until the page changes, so a second
      // click can never create a second booking
      navigate(`/booking-success?booking=${encodeURIComponent(booking.id)}`);
    } catch (error) {
      if (error instanceof BookingError && error.code === "unavailable") {
        // Someone booked it after the UI check: show the normal room error
        if (currentKey !== null) {
          setAvailability({ key: currentKey, status: "booked" });
        }
        toast.error(
          "This room was just booked for those dates. Please choose different dates or another room.",
        );
      } else {
        setSubmitError("We couldn't create your booking. Please try again.");
        toast.error("We couldn't create your booking. Please try again.");
      }
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="gh-bookingpage">
        <header className="gh-bookingpage__hero">
          <div className="gh-bookingpage__container">
            <p className="gh-bookingpage__label">Reservations</p>
            <h1 className="gh-bookingpage__title">Book Your Stay</h1>
            <p className="gh-bookingpage__subtitle">
              Choose your room and dates, and start planning a comfortable,
              effortless stay at {brand.name}.
            </p>
          </div>
        </header>

        <section className="gh-bookingpage__content" aria-label="Booking">
          <div className="gh-bookingpage__container">
            <div className="gh-bookingpage__layout">
              <BookingForm
                formId={FORM_ID}
                rooms={rooms}
                values={values}
                errors={errors}
                roomHint={roomHint}
                onChange={handleChange}
                onSubmit={() => {
                  void handleSubmit();
                }}
              />
              <BookingSummary
                formId={FORM_ID}
                room={findRoom(values.roomId)}
                values={values}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Booking;