import { z } from "zod";
import { optionalText } from "../../validators/common";
import { activityBaseShape } from "../../validators/activityBase";

export const createWorkshopSchema = z.object({
  title: z.string().min(1, "Informe o título.").max(100),
  lacturer: optionalText(45),
  ...activityBaseShape,
});

export const updateWorkshopSchema = createWorkshopSchema.partial();

export type CreateWorkshopInput = z.infer<typeof createWorkshopSchema>;
export type UpdateWorkshopInput = z.infer<typeof updateWorkshopSchema>;
