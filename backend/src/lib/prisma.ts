import { PrismaClient } from "@prisma/client";

// A single shared PrismaClient instance for the whole process.
export const prisma = new PrismaClient();
