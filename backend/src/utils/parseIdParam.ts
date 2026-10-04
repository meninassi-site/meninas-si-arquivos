import { HttpError } from "./HttpError";

export function parseIdParam(raw: string | string[] | undefined, label = "id"): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const id = Number(value);
  if (!value || !Number.isInteger(id) || id <= 0) {
    throw HttpError.badRequest(`${label} inválido.`);
  }
  return id;
}
