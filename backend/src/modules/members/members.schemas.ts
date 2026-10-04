import { z } from "zod";
import { optionalEmail, optionalText, optionalUrl } from "../../validators/common";

export const createMemberSchema = z.object({
  name: z.string().min(1, "Informe o nome.").max(100),
  biography: optionalText(),
  contact_email: optionalEmail(45),
  class_name: optionalText(45),
  lattes: optionalUrl(),
  linkedin: optionalUrl(),
});

export const updateMemberSchema = createMemberSchema.partial();

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
