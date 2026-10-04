import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../middleware/auth";
import { upload } from "../../middleware/upload";
import { asyncHandler } from "../../utils/asyncHandler";
import { parseDateOnly, parseTimeOnly } from "../../utils/datetime";
import { HttpError } from "../../utils/HttpError";
import { sniffImageContentType } from "../../utils/imageSniff";
import { parseIdParam } from "../../utils/parseIdParam";
import { toPrismaBytes } from "../../utils/toPrismaBytes";
import { toPublicShortCourse } from "./shortCourses.mapper";
import { createShortCourseSchema, updateShortCourseSchema } from "./shortCourses.schemas";

export const shortCoursesRouter = Router();

// RF01/RF03 — public listing.
shortCoursesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const shortCourses = await prisma.shortCourse.findMany({ orderBy: { data_occurence: "desc" } });
    res.json(shortCourses.map(toPublicShortCourse));
  }),
);

shortCoursesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id_short_course = parseIdParam(req.params.id);
    const shortCourse = await prisma.shortCourse.findUnique({ where: { id_short_course } });
    if (!shortCourse) throw HttpError.notFound("Minicurso não encontrado.");
    res.json(toPublicShortCourse(shortCourse));
  }),
);

shortCoursesRouter.get(
  "/:id/cover-photo",
  asyncHandler(async (req, res) => {
    const id_short_course = parseIdParam(req.params.id);
    const shortCourse = await prisma.shortCourse.findUnique({
      where: { id_short_course },
      select: { cover_photo: true },
    });
    if (!shortCourse?.cover_photo) throw HttpError.notFound("Este minicurso não possui foto de capa.");
    res.setHeader("Content-Type", sniffImageContentType(shortCourse.cover_photo));
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(shortCourse.cover_photo);
  }),
);

// RF10 — admin inserts a minicurso (title, description, lecturer, location, hours, cover, link, date, time).
shortCoursesRouter.post(
  "/",
  requireAdmin,
  upload.single("cover_photo"),
  asyncHandler(async (req, res) => {
    const data = createShortCourseSchema.parse(req.body);

    const shortCourse = await prisma.shortCourse.create({
      data: {
        title: data.title,
        event_description: data.event_description,
        lacturer: data.lacturer,
        location: data.location,
        lenght_time: data.lenght_time,
        registration_link: data.registration_link,
        data_occurence: data.data_occurence ? parseDateOnly(data.data_occurence) : undefined,
        time_occurence: data.time_occurence ? parseTimeOnly(data.time_occurence) : undefined,
        cover_photo: toPrismaBytes(req.file?.buffer),
        admin_id_admin: req.admin!.id_admin,
      },
    });

    res.status(201).json(toPublicShortCourse(shortCourse));
  }),
);

shortCoursesRouter.put(
  "/:id",
  requireAdmin,
  upload.single("cover_photo"),
  asyncHandler(async (req, res) => {
    const id_short_course = parseIdParam(req.params.id);
    const data = updateShortCourseSchema.parse(req.body);

    const shortCourse = await prisma.shortCourse.update({
      where: { id_short_course },
      data: {
        ...data,
        data_occurence: data.data_occurence ? parseDateOnly(data.data_occurence) : undefined,
        time_occurence: data.time_occurence ? parseTimeOnly(data.time_occurence) : undefined,
        ...(req.file ? { cover_photo: toPrismaBytes(req.file.buffer) } : {}),
      },
    });

    res.json(toPublicShortCourse(shortCourse));
  }),
);

shortCoursesRouter.delete(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id_short_course = parseIdParam(req.params.id);
    await prisma.shortCourse.delete({ where: { id_short_course } });
    res.status(204).send();
  }),
);
