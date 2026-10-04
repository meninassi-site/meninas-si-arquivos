# Meninas de Sistemas — Frontend

React (Vite, plain JS) client for the Meninas de Sistemas site. Reimplements the pages from `../meninas-de-sistemas/` (home, notícias, eventos, membros, sobre) backed by the real API in `../backend/`, plus an admin area (login, dashboard, member/event/workshop/minicurso CRUD) replacing the static mockups in `meninas-de-sistemas/admim/`.

## Setup

Needs the backend running first (see `../backend/README.md`) — the dev server proxies `/api` to `http://localhost:3333`.

```bash
npm install
npm run dev       # http://localhost:5173
```

## Commands

```bash
npm run dev       # Vite dev server with API proxy (vite.config.js)
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
```

For a production build served from a different origin than the API, set `VITE_API_URL` (e.g. `VITE_API_URL=https://api.example.org/api npm run build`); otherwise it defaults to the relative `/api`.

## Structure

- `src/api/` — the axios client (attaches the stored JWT to every request) and the events/workshops/short-courses helpers, since those three resources share the same shape but live at different endpoints.
- `src/context/AuthContext.jsx` + `src/components/ProtectedRoute.jsx` — admin session state (JWT in `localStorage`) and route guarding.
- `src/pages/` — public pages at the top level, admin pages under `pages/admin/`. `ActivityDetail.jsx` is one shared detail layout for events/workshops/short-courses (the static site had three near-duplicate versions of this page, one per type); `PostForm.jsx` is similarly one form with a type selector, covering RF08–RF10.
- `public/assets/` — the static site's own `css/style.css` and `images/`, copied over so the pages keep their original look. A few components (`admin login`, member profile, admin dashboard overview cards) relied on `<style>` blocks that lived inline in individual HTML pages rather than in the shared stylesheet; those rules were promoted into `style.css` (clearly marked with a comment) instead of being duplicated again here.

## Known gaps vs. the original static mockups

- Member "areas of interest" tags and Instagram/Facebook links from the static profile pages aren't in the ER diagram's `member` table (only `contact_email`, `lattes`, `linkedin`), so they aren't editable here. `lattes`/`linkedin` are rendered when present.
- The old admin pages had an unwired, decorative "⋮" menu on each row; the admin lists here use plain "Editar"/"Excluir" actions instead, since those are the only two operations RF06/RF07 actually call for.
