import type { ShortCourse } from "@prisma/client";
import { formatDateOnly, formatTimeOnly } from "../../utils/datetime";

export function toPublicShortCourse(shortCourse: ShortCourse) {
  return {
    type: "minicurso" as const,
    id_short_course: shortCourse.id_short_course,
    title: shortCourse.title,
    event_description: shortCourse.event_description,
    lacturer: shortCourse.lacturer,
    location: shortCourse.location,
    lenght_time: shortCourse.lenght_time,
    registration_link: shortCourse.registration_link,
    data_occurence: formatDateOnly(shortCourse.data_occurence),
    time_occurence: formatTimeOnly(shortCourse.time_occurence),
    admin_id_admin: shortCourse.admin_id_admin,
    cover_photo_url: shortCourse.cover_photo
      ? `/api/short-courses/${shortCourse.id_short_course}/cover-photo`
      : null,
  };
}
