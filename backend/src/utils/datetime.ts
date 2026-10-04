/**
 * Helpers to go between the plain "YYYY-MM-DD" / "HH:mm" strings the API and
 * admin forms use, and the Date objects Prisma needs for @db.Date / @db.Time
 * columns (MySQL TIME values round-trip through Prisma as a Date with an
 * arbitrary 1970-01-01 date part).
 */

export function parseDateOnly(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

export function formatDateOnly(value: Date | null): string | null {
  if (!value) return null;
  return value.toISOString().slice(0, 10);
}

export function parseTimeOnly(value: string): Date {
  return new Date(`1970-01-01T${value}:00.000Z`);
}

export function formatTimeOnly(value: Date | null): string | null {
  if (!value) return null;
  return value.toISOString().slice(11, 16);
}
