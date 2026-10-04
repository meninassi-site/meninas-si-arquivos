import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { asyncHandler } from "../../utils/asyncHandler";
import { toPublicEvent } from "../events/events.mapper";
import { toPublicShortCourse } from "../shortCourses/shortCourses.mapper";
import { toPublicWorkshop } from "../workshops/workshops.mapper";

export const feedRouter = Router();

/**
 * The static site's "Notícias" section and the ER diagram don't line up 1:1:
 * RF07 describes a "notícia" as simply a post of type evento/workshop/
 * minicurso, and the diagram has no separate news table. So the public feed
 * is just events + workshops + short courses merged together, each tagged
 * with its `type`, newest occurrence first.
 */
async function loadFeedItems() {
  const [events, workshops, shortCourses] = await Promise.all([
    prisma.event.findMany(),
    prisma.workshop.findMany(),
    prisma.shortCourse.findMany(),
  ]);

  return [
    ...events.map(toPublicEvent),
    ...workshops.map(toPublicWorkshop),
    ...shortCourses.map(toPublicShortCourse),
  ];
}

function sortByDate(items: Awaited<ReturnType<typeof loadFeedItems>>, direction: "asc" | "desc") {
  return [...items].sort((a, b) => {
    if (!a.data_occurence) return 1;
    if (!b.data_occurence) return -1;
    const comparison = a.data_occurence.localeCompare(b.data_occurence);
    return direction === "asc" ? comparison : -comparison;
  });
}

// RF03 — "notícias" feed: every event/workshop/minicurso, newest first.
feedRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const items = await loadFeedItems();
    res.json(sortByDate(items, "desc"));
  }),
);

// Home "Próximos Eventos" carousel + Eventos "Próximos" tab.
feedRouter.get(
  "/upcoming",
  asyncHandler(async (_req, res) => {
    const today = new Date().toISOString().slice(0, 10);
    const items = (await loadFeedItems()).filter((item) => item.data_occurence && item.data_occurence >= today);
    res.json(sortByDate(items, "asc"));
  }),
);

// Eventos "Eventos que Participamos" tab.
feedRouter.get(
  "/past",
  asyncHandler(async (_req, res) => {
    const today = new Date().toISOString().slice(0, 10);
    const items = (await loadFeedItems()).filter((item) => item.data_occurence && item.data_occurence < today);
    res.json(sortByDate(items, "desc"));
  }),
);
