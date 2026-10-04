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
import { toPublicEvent } from "./events.mapper";
import { createEventSchema, updateEventSchema } from "./events.schemas";

export const eventsRouter = Router();

// RF01/RF03 — public listing, newest/soonest first.
eventsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const events = await prisma.event.findMany({ orderBy: { data_occurence: "desc" } });
    res.json(events.map(toPublicEvent));
  }),
);

eventsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id_event = parseIdParam(req.params.id);
    const event = await prisma.event.findUnique({ where: { id_event } });
    if (!event) throw HttpError.notFound("Evento não encontrado.");
    res.json(toPublicEvent(event));
  }),
);

eventsRouter.get(
  "/:id/cover-photo",
  asyncHandler(async (req, res) => {
    const id_event = parseIdParam(req.params.id);
    const event = await prisma.event.findUnique({ where: { id_event }, select: { cover_photo: true } });
    if (!event?.cover_photo) throw HttpError.notFound("Este evento não possui foto de capa.");
    res.setHeader("Content-Type", sniffImageContentType(event.cover_photo));
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(event.cover_photo);
  }),
);

// RF08 — admin inserts an event (title, description, organizer, location, hours, cover, link, date, time).
eventsRouter.post(
  "/",
  requireAdmin,
  upload.single("cover_photo"),
  asyncHandler(async (req, res) => {
    const data = createEventSchema.parse(req.body);

    const event = await prisma.event.create({
      data: {
        title: data.title,
        event_description: data.event_description,
        organizer: data.organizer,
        location: data.location,
        lenght_time: data.lenght_time,
        registration_link: data.registration_link,
        data_occurence: data.data_occurence ? parseDateOnly(data.data_occurence) : undefined,
        time_occurence: data.time_occurence ? parseTimeOnly(data.time_occurence) : undefined,
        cover_photo: toPrismaBytes(req.file?.buffer),
        admin_id_admin: req.admin!.id_admin,
      },
    });

    res.status(201).json(toPublicEvent(event));
  }),
);

eventsRouter.put(
  "/:id",
  requireAdmin,
  upload.single("cover_photo"),
  asyncHandler(async (req, res) => {
    const id_event = parseIdParam(req.params.id);
    const data = updateEventSchema.parse(req.body);

    const event = await prisma.event.update({
      where: { id_event },
      data: {
        ...data,
        data_occurence: data.data_occurence ? parseDateOnly(data.data_occurence) : undefined,
        time_occurence: data.time_occurence ? parseTimeOnly(data.time_occurence) : undefined,
        ...(req.file ? { cover_photo: toPrismaBytes(req.file.buffer) } : {}),
      },
    });

    res.json(toPublicEvent(event));
  }),
);

eventsRouter.delete(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id_event = parseIdParam(req.params.id);
    await prisma.event.delete({ where: { id_event } });
    res.status(204).send();
  }),
);
