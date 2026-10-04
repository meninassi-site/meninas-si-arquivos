import { z } from "zod";
import { optionalText } from "../../validators/common";
import { activityBaseShape } from "../../validators/activityBase";

export const createShortCourseSchema = z.object({
  title: z.string().min(1, "Informe o título.").max(100),
  lacturer: optionalText(45),
  ...activityBaseShape,
});

export const updateShortCourseSchema = createShortCourseSchema.partial();

export type CreateShortCourseInput = z.infer<typeof createShortCourseSchema>;
export type UpdateShortCourseInput = z.infer<typeof updateShortCourseSchema>;
