import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { adminsRouter } from "./modules/admins/admins.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes";
import { eventsRouter } from "./modules/events/events.routes";
import { feedRouter } from "./modules/feed/feed.routes";
import { membersRouter } from "./modules/members/members.routes";
import { shortCoursesRouter } from "./modules/shortCourses/shortCourses.routes";
import { workshopsRouter } from "./modules/workshops/workshops.routes";

export const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRouter);
app.use("/api/admins", adminsRouter);
app.use("/api/members", membersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/workshops", workshopsRouter);
app.use("/api/short-courses", shortCoursesRouter);
app.use("/api/feed", feedRouter);
app.use("/api/dashboard", dashboardRouter);

app.use((_req, res) => res.status(404).json({ error: "Rota não encontrada." }));

app.use(errorHandler);
