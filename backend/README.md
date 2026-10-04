# Meninas de Sistemas — API

Express + TypeScript + Prisma (MySQL) backend for the Meninas de Sistemas site: members, events, workshops, short courses, and admin authentication. Replaces the static mockups in `meninas-de-sistemas/admim/` with a real API; `../frontend/` is the React client that consumes it.

## Setup

A `docker-compose.yml` at the repo root starts a dedicated MySQL 8 container for this project (its own database/user, separate from anything else you may have running locally). It reads its credentials from a root-level `.env` (copy `../.env.example`; the committed defaults already match `backend/.env.example`'s `DATABASE_URL`, so you only need to change both if you change either):

```bash
cd .. && cp .env.example .env   # only needed once; adjust credentials here if you don't want the defaults
docker compose up -d             # starts mysql (host port 3307 by default) and adminer (http://localhost:8081)
cd backend
cp .env.example .env            # already matches the root .env's credentials
npm install
npm run prisma:migrate          # creates the schema (prompts for a migration name on first run... already named "init" if you keep the committed migration)
npm run seed                    # loads demo data (see "Seed data" below)
npm run dev                     # starts the API on http://localhost:3333
```

`npm run seed` is safe to re-run — it clears its own tables before inserting, so it won't accumulate duplicates.

## Commands

```bash
npm run dev              # tsx watch — auto-restarting dev server
npm run build             # compile to dist/
npm start                 # run the compiled build
npm run typecheck         # tsc --noEmit
npm run prisma:generate   # regenerate the Prisma client after a schema change
npm run prisma:migrate    # create + apply a migration (dev)
npm run prisma:deploy     # apply pending migrations without prompting (CI/production)
npm run prisma:studio     # browse the database
npm run seed              # (re)load demo data
```

## Database

The schema (`prisma/schema.prisma`) follows the provided ER diagram (`admin` / `member` / `event` / `workshop` / `short_course`), with a few deliberate deviations from the diagram, each called out in the schema file itself:

- **`admin.password` is `VARCHAR(255)`**, not the diagram's `VARCHAR(45)` — a bcrypt hash doesn't fit in 45 characters.
- **`short_course`'s primary key is `id_short_course`**, not `id_workshop` as drawn. That looks like a copy/paste artifact from duplicating the workshop entity in the diagramming tool; keeping it would mean two unrelated tables share a PK name, which is actively misleading rather than just a style quirk.
- **`lenght_time` and `lacturer`** (typos for "length_time" / "lecturer") are kept exactly as drawn, since the diagram is this project's data dictionary and nothing about them is ambiguous.
- **Nearly everything except primary keys, foreign keys, and a handful of clearly-required fields (titles/names, admin credentials) is nullable.** The diagram doesn't specify nullability, and the admin UI mockups treat most fields as optional.
- **`workshop.cover_photo` / `short_course.cover_photo` are plain `BLOB` (~64KB)**, per the diagram, while `member.photo` / `event.cover_photo` are `MEDIUMBLOB` (~16MB). A photo that's too large for a `BLOB` column fails with a clear 400 error (see `middleware/errorHandler.ts`) rather than being silently truncated — if that limit is too tight in practice, widen those two columns to `MEDIUMBLOB` to match the others.

There is no separate "news" table: RF07 describes a "notícia" as simply a post of type evento/workshop/minicurso, which is exactly what the diagram already models. The public "Notícias" feed (`GET /api/feed`) is just events + workshops + short courses merged and tagged by type — see `src/modules/feed/`.

Photos/cover images are stored inline as BLOBs, not on disk or in object storage, matching the diagram. Since there's no column for the original MIME type, `GET /api/.../:id/photo` and `.../cover-photo` sniff the image format from its header bytes when serving it back (`src/utils/imageSniff.ts`).

## Seed data

`prisma/seed.ts` creates:
- One admin: `admin@meninasdesistemas.ufpa.br` / `MeninasSi@123` — **change this in anything beyond local development.**
- The 6 members from the static site's `membros/` pages, with their real photos (read from `../meninas-de-sistemas/assets/images/`).
- The 3 events that existed as static content (3° Encontro, VII Jornada, WIT), plus **one example workshop and one example short course** — RF09/RF10 are new requirements with no static-site equivalent, so those two are placeholder content to exercise the admin CRUD and public pages, not real events.

## API shape

All routes are under `/api`. Public (no auth): `GET /members`, `GET /members/:id`, `GET /members/:id/photo`, and the equivalent `GET` routes for `/events`, `/workshops`, `/short-courses` (plus `/:id/cover-photo`), and `/feed`, `/feed/upcoming`, `/feed/past`. Everything else (`POST`/`PUT`/`DELETE` on those resources, `/admins`, `/dashboard/summary`, `/auth/me`, `/auth/register-admin`) requires `Authorization: Bearer <token>` from `POST /auth/login`.

File uploads are `multipart/form-data` with a `photo` (members) or `cover_photo` (events/workshops/short courses) field.
