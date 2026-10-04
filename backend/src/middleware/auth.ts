import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/HttpError";
import { type AdminTokenPayload, verifyAdminToken } from "../utils/jwt";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: AdminTokenPayload;
    }
  }
}

/** Requires a valid `Authorization: Bearer <token>` header for every RF05+ admin action. */
export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw HttpError.unauthorized("Token de autenticação ausente.");
  }

  const token = header.slice("Bearer ".length).trim();

  try {
    req.admin = verifyAdminToken(token);
    next();
  } catch {
    throw HttpError.unauthorized("Token de autenticação inválido ou expirado.");
  }
}
