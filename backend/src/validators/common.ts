import { z } from "zod";

/** multipart/form-data sends every field as a string (or omits it); blank
 * inputs from the admin forms arrive as "". Treat both as "not provided". */
const blankToUndefined = (value: unknown) => (value === "" || value === null ? undefined : value);

/** `.optional()` has to wrap the schema *inside* the preprocess step, not
 * outside it: Zod's optional() only short-circuits when the raw input is
 * already `undefined`, but here the raw input is "" — it only becomes
 * `undefined` after blankToUndefined runs. Optional outside the preprocess
 * never sees that; the inner schema does, so it has to be the optional one. */
function optional<T extends z.ZodType>(schema: T) {
  return z.preprocess(blankToUndefined, schema.optional());
}

export const optionalText = (max?: number) => optional(max ? z.string().max(max) : z.string());

export const optionalEmail = (max: number) => optional(z.email().max(max));

export const optionalUrl = () => optional(z.url());

export const optionalInt = () => optional(z.coerce.number().int().nonnegative());

export const optionalDateOnly = () => optional(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD."));

export const optionalTimeOnly = () => optional(z.string().regex(/^\d{2}:\d{2}$/, "Use o formato HH:mm."));
