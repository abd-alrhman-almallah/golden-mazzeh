export interface BookingFormValues {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  rooms: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

// A short helper line under a booking field (for example live availability)
export interface BookingFieldHint {
  tone: "neutral" | "success" | "error";
  text: string;
}