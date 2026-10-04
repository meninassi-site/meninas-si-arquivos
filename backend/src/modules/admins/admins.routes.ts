import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { toPublicAdmin } from "./admins.mapper";

export const adminsRouter = Router();

adminsRouter.get(
  "/",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const admins = await prisma.admin.findMany({ orderBy: { created_time: "asc" } });
    res.json(admins.map(toPublicAdmin));
  }),
);
