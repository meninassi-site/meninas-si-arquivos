import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import multer from "multer";
import { ZodError } from "zod";
import { HttpError } from "../utils/HttpError";

/** Centralized error -> HTTP response translation, kept out of every route. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Dados inválidos.",
      details: err.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
    });
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Falha no upload do arquivo: ${err.message}` });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Já existe um registro com esse valor único.", details: err.meta });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Recurso não encontrado." });
    }
    // MySQL raises this when a BLOB column is too small for the uploaded
    // file — relevant here because workshop/short_course cover_photo are
    // plain BLOB (~64KB) rather than MEDIUMBLOB, per the diagram.
    if (err.message.includes("Data too long for column")) {
      return res.status(400).json({ error: "Imagem muito grande para este tipo de conteúdo." });
    }
  }

  console.error(err);
  return res.status(500).json({ error: "Erro interno do servidor." });
}
