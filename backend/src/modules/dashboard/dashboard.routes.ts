import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";

export const dashboardRouter = Router();

// Backs the admin dashboard's overview cards (home_user.html: events,
// members, admins — "notícias" there is really events+workshops+short courses).
dashboardRouter.get(
  "/summary",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [events, workshops, shortCourses, members, admins] = await Promise.all([
      prisma.event.count(),
      prisma.workshop.count(),
      prisma.shortCourse.count(),
      prisma.member.count(),
      prisma.admin.count(),
    ]);

    res.json({ events, workshops, shortCourses, members, admins, posts: events + workshops + shortCourses });
  }),
);
