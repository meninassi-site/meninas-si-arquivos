import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { HttpError } from "../../utils/HttpError";
import { signAdminToken } from "../../utils/jwt";
import { toPublicAdmin } from "../admins/admins.mapper";
import { loginSchema, registerAdminSchema } from "./auth.schemas";

export const authRouter = Router();

// RF05 — admin login with username/email and password.
authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      throw HttpError.unauthorized("E-mail ou senha incorretos.");
    }

    const passwordMatches = await bcrypt.compare(password, admin.password);
    if (!passwordMatches) {
      throw HttpError.unauthorized("E-mail ou senha incorretos.");
    }

    const token = signAdminToken({ id_admin: admin.id_admin, username: admin.username, email: admin.email });
    res.json({ token, admin: toPublicAdmin(admin) });
  }),
);

authRouter.get(
  "/me",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const admin = await prisma.admin.findUniqueOrThrow({ where: { id_admin: req.admin!.id_admin } });
    res.json(toPublicAdmin(admin));
  }),
);

// Lets a logged-in admin create another admin account — the static mockup's
// sidebar has a "Cadastrar Administrador" link with nowhere real to go; this
// is that feature, gated behind an existing admin session rather than left
// open to the public.
authRouter.post(
  "/register-admin",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const data = registerAdminSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(data.password, 10);

    const admin = await prisma.admin.create({
      data: { username: data.username, email: data.email, password: passwordHash },
    });

    res.status(201).json(toPublicAdmin(admin));
  }),
);
