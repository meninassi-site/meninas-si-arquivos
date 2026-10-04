import type { Event } from "@prisma/client";
import { formatDateOnly, formatTimeOnly } from "../../utils/datetime";

export function toPublicEvent(event: Event) {
  return {
    type: "evento" as const,
    id_event: event.id_event,
    title: event.title,
    event_description: event.event_description,
    organizer: event.organizer,
    location: event.location,
    lenght_time: event.lenght_time,
    registration_link: event.registration_link,
    data_occurence: formatDateOnly(event.data_occurence),
    time_occurence: formatTimeOnly(event.time_occurence),
    admin_id_admin: event.admin_id_admin,
    cover_photo_url: event.cover_photo ? `/api/events/${event.id_event}/cover-photo` : null,
  };
}
