import type { Workshop } from "@prisma/client";
import { formatDateOnly, formatTimeOnly } from "../../utils/datetime";

export function toPublicWorkshop(workshop: Workshop) {
  return {
    type: "workshop" as const,
    id_workshop: workshop.id_workshop,
    title: workshop.title,
    event_description: workshop.event_description,
    lacturer: workshop.lacturer,
    location: workshop.location,
    lenght_time: workshop.lenght_time,
    registration_link: workshop.registration_link,
    data_occurence: formatDateOnly(workshop.data_occurence),
    time_occurence: formatTimeOnly(workshop.time_occurence),
    admin_id_admin: workshop.admin_id_admin,
    cover_photo_url: workshop.cover_photo ? `/api/workshops/${workshop.id_workshop}/cover-photo` : null,
  };
}
