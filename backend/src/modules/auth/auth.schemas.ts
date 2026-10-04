import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe a senha."),
});

export const registerAdminSchema = z.object({
  username: z.string().min(3, "Mínimo de 3 caracteres.").max(45),
  email: z.email("Informe um e-mail válido.").max(45),
  password: z.string().min(6, "Mínimo de 6 caracteres."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterAdminInput = z.infer<typeof registerAdminSchema>;
