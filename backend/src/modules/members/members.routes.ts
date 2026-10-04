import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../middleware/auth";
import { upload } from "../../middleware/upload";
import { asyncHandler } from "../../utils/asyncHandler";
import { HttpError } from "../../utils/HttpError";
import { sniffImageContentType } from "../../utils/imageSniff";
import { parseIdParam } from "../../utils/parseIdParam";
import { toPrismaBytes } from "../../utils/toPrismaBytes";
import { toPublicMember } from "./members.mapper";
import { createMemberSchema, updateMemberSchema } from "./members.schemas";

export const membersRouter = Router();

// RF02 — public listing of members.
membersRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const members = await prisma.member.findMany({ orderBy: { id_member: "asc" } });
    res.json(members.map(toPublicMember));
  }),
);

membersRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id_member = parseIdParam(req.params.id);
    const member = await prisma.member.findUnique({ where: { id_member } });
    if (!member) throw HttpError.notFound("Membro não encontrado.");
    res.json(toPublicMember(member));
  }),
);

membersRouter.get(
  "/:id/photo",
  asyncHandler(async (req, res) => {
    const id_member = parseIdParam(req.params.id);
    const member = await prisma.member.findUnique({ where: { id_member }, select: { photo: true } });
    if (!member?.photo) throw HttpError.notFound("Este membro não possui foto.");
    res.setHeader("Content-Type", sniffImageContentType(member.photo));
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(member.photo);
  }),
);

// RF06 — admin inserts a member (name, photo, bio, contact e-mail, class, Lattes, LinkedIn).
membersRouter.post(
  "/",
  requireAdmin,
  upload.single("photo"),
  asyncHandler(async (req, res) => {
    const data = createMemberSchema.parse(req.body);

    const member = await prisma.member.create({
      data: {
        ...data,
        photo: toPrismaBytes(req.file?.buffer),
        admin_id_admin: req.admin!.id_admin,
      },
    });

    res.status(201).json(toPublicMember(member));
  }),
);

// RF06 — full management also means edit...
membersRouter.put(
  "/:id",
  requireAdmin,
  upload.single("photo"),
  asyncHandler(async (req, res) => {
    const id_member = parseIdParam(req.params.id);
    const data = updateMemberSchema.parse(req.body);

    const member = await prisma.member.update({
      where: { id_member },
      data: {
        ...data,
        ...(req.file ? { photo: toPrismaBytes(req.file.buffer) } : {}),
      },
    });

    res.json(toPublicMember(member));
  }),
);

// ...and delete.
membersRouter.delete(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id_member = parseIdParam(req.params.id);
    await prisma.member.delete({ where: { id_member } });
    res.status(204).send();
  }),
);
