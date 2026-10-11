import { guestOptions, roomCountOptions } from "../data/bookingOptions";
import type {
  BookingFormErrors,
  BookingFormValues,
} from "../types/booking";
import type { Room } from "../types/room";
import {
  isPastDate,
  isValidIsoDate,
  isValidStayRange,
} from "./availabilityService";

// Single source of truth for booking validation.
// Used by the booking page (to show errors) and by createBooking
// (so an invalid booking can never be created).
// Availability is checked separately (see availabilityService.ts).
export function validateBookingForm(
  values: BookingFormValues,
  room: Room | undefined,
): BookingFormErrors {
  const errors: BookingFormErrors = {};
  const guests = Number(values.guests);
  const roomCount = Number(values.rooms);

  if (!room) {
    errors.roomId = "Please select a room.";
  }

  const hasValidCheckIn = isValidIsoDate(values.checkIn);

  if (!values.checkIn) {
    errors.checkIn = "Please select a check-in date.";
  } else if (!hasValidCheckIn) {
    errors.checkIn = "Please enter a valid check-in date.";
  } else if (isPastDate(values.checkIn)) {
    errors.checkIn = "Check-in date cannot be in the past.";
  }

  if (!values.checkOut) {
    errors.checkOut = "Please select a check-out date.";
  } else if (!isValidIsoDate(values.checkOut)) {
    errors.checkOut = "Please enter a valid check-out date.";
  } else if (
    hasValidCheckIn &&
    !isValidStayRange(values.checkIn, values.checkOut)
  ) {
    errors.checkOut = "Check-out must be after check-in.";
  }

  if (!roomCountOptions.includes(roomCount)) {
    errors.rooms = "Please select a valid number of rooms.";
  }

  if (!guestOptions.includes(guests)) {
    errors.guests = "Please select a valid number of guests.";
  } else if (room && roomCountOptions.includes(roomCount)) {
    const capacity = room.guests * roomCount;
    if (guests > capacity) {
      errors.guests = `This selection fits up to ${capacity} ${
        capacity === 1 ? "guest" : "guests"
      }. Add rooms or reduce guests.`;
    }
  }

  return errors;
}