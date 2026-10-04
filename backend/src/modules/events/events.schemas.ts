import { z } from "zod";
import { optionalText } from "../../validators/common";
import { activityBaseShape } from "../../validators/activityBase";

export const createEventSchema = z.object({
  title: z.string().min(1, "Informe o título.").max(100),
  organizer: optionalText(45),
  ...activityBaseShape,
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
