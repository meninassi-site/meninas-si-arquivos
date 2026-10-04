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
import { toPublicWorkshop } from "./workshops.mapper";
import { createWorkshopSchema, updateWorkshopSchema } from "./workshops.schemas";

export const workshopsRouter = Router();

// RF01/RF03 — public listing.
workshopsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const workshops = await prisma.workshop.findMany({ orderBy: { data_occurence: "desc" } });
    res.json(workshops.map(toPublicWorkshop));
  }),
);

workshopsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id_workshop = parseIdParam(req.params.id);
    const workshop = await prisma.workshop.findUnique({ where: { id_workshop } });
    if (!workshop) throw HttpError.notFound("Workshop não encontrado.");
    res.json(toPublicWorkshop(workshop));
  }),
);

workshopsRouter.get(
  "/:id/cover-photo",
  asyncHandler(async (req, res) => {
    const id_workshop = parseIdParam(req.params.id);
    const workshop = await prisma.workshop.findUnique({ where: { id_workshop }, select: { cover_photo: true } });
    if (!workshop?.cover_photo) throw HttpError.notFound("Este workshop não possui foto de capa.");
    res.setHeader("Content-Type", sniffImageContentType(workshop.cover_photo));
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(workshop.cover_photo);
  }),
);

// RF09 — admin inserts a workshop (title, description, lecturer, location, hours, cover, link, date, time).
workshopsRouter.post(
  "/",
  requireAdmin,
  upload.single("cover_photo"),
  asyncHandler(async (req, res) => {
    const data = createWorkshopSchema.parse(req.body);

    const workshop = await prisma.workshop.create({
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

    res.status(201).json(toPublicWorkshop(workshop));
  }),
);

workshopsRouter.put(
  "/:id",
  requireAdmin,
  upload.single("cover_photo"),
  asyncHandler(async (req, res) => {
    const id_workshop = parseIdParam(req.params.id);
    const data = updateWorkshopSchema.parse(req.body);

    const workshop = await prisma.workshop.update({
      where: { id_workshop },
      data: {
        ...data,
        data_occurence: data.data_occurence ? parseDateOnly(data.data_occurence) : undefined,
        time_occurence: data.time_occurence ? parseTimeOnly(data.time_occurence) : undefined,
        ...(req.file ? { cover_photo: toPrismaBytes(req.file.buffer) } : {}),
      },
    });

    res.json(toPublicWorkshop(workshop));
  }),
);

workshopsRouter.delete(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id_workshop = parseIdParam(req.params.id);
    await prisma.workshop.delete({ where: { id_workshop } });
    res.status(204).send();
  }),
);
