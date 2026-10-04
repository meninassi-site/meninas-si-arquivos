import { optionalDateOnly, optionalInt, optionalText, optionalTimeOnly, optionalUrl } from "./common";

/**
 * Event, Workshop and ShortCourse share every field except the
 * organizer/lecturer one (RF08 calls it "organizador", RF09/RF10 call it
 * "ministrante" — the diagram mirrors that as `organizer` on event and
 * `lacturer` on workshop/short_course). This shape covers everything else so
 * each module's schema only has to add that one field.
 */
export const activityBaseShape = {
  event_description: optionalText(),
  location: optionalText(45),
  lenght_time: optionalInt(),
  registration_link: optionalUrl(),
  data_occurence: optionalDateOnly(),
  time_occurence: optionalTimeOnly(),
};
