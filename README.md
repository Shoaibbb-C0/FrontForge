# FrontForge

FrontForge is a personal frontend-engineering knowledge system for studying, storing, previewing, and reusing UI components and motion patterns.

## Purpose

FrontForge keeps implementation code, design reasoning, accessibility notes, performance observations, and source references beside the patterns they describe. It supports frontend learning, portfolio work, client projects, and future website development rather than acting as a public component marketplace.

## Features

- Component and animation libraries with CRUD and persistent favorites.
- Search and combined filtering with URL-persisted discovery state.
- Saved-items, learning-notes, and reference views.
- JSX, CSS, and JavaScript storage with copy feedback.
- Responsive desktop, tablet, and mobile preview frames.
- Sandboxed HTML/CSS and supported JavaScript previews.
- CSS animation and pinned GSAP runtime previews.
- Trusted Motion/React previews through a registered preview system.
- Replay controls and reduced-motion protection.
- Loading, empty, no-match, error, and not-found states.

## Tech Stack

- React 19, Vite 8, React Router 7
- Tailwind CSS 4, Geist, Space Grotesk, Lucide React
- Motion 13 and GSAP 3.13 preview runtime
- Node.js, Express 5
- MongoDB and Mongoose 9
- Node's test runner and ESLint

## Architecture

The React frontend communicates with an Express REST API. Mongoose validates and persists component and animation resources in MongoDB.

HTML, CSS, GSAP, and supported JavaScript previews render in an isolated `iframe` using `srcDoc`. Scripts receive `allow-scripts` only when required; same-origin access, forms, popups, and parent-page access are not granted. React/Motion examples never execute stored JSX and instead use trusted preview components registered in frontend source.

See [Architecture](docs/ARCHITECTURE.md) and [Systems](docs/SYSTEMS.md).

## Project Structure

```text
backend/src/
  config/                 MongoDB connection
  controllers/            component and animation request handling
  middleware/             API errors and 404 handling
  models/                 Mongoose schemas and schema tests
  routes/                 REST endpoints
frontend/src/
  animation-previews/     animation renderer and trusted Motion previews
  components/             shared application UI
  layouts/                application shell
  pages/                  routed library, detail, and form views
  previews/               iframe, responsive frame, and component registry
docs/                     architecture and system documentation
```

## Local Setup

Use a Node.js release supported by Vite 8. The project was verified with Node.js 24.

```sh
cd backend
npm ci
copy src\.env.example .env
npm run dev
```

In a second terminal:

```sh
cd frontend
npm ci
copy .env.example .env
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## Environment Variables

Backend `.env`:

- `MONGO_URI` — required MongoDB connection string.
- `PORT` — optional API port; defaults to `5000`.
- `CLIENT_URL` — optional comma-separated allowed frontend origins.
- `NODE_ENV` — `development` includes API stack traces.

Frontend `.env`:

- `VITE_API_URL` — API origin, such as `http://localhost:5000`.

Never commit credentials. Frontend `VITE_*` values are public at build time.

## API Overview

The API also exposes `GET /api/health`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/components` | List components |
| POST | `/api/components` | Create a component |
| GET | `/api/components/:slug` | Read one component |
| PATCH | `/api/components/:slug` | Update a component |
| DELETE | `/api/components/:slug` | Delete a component |
| PATCH | `/api/components/:slug/favorite` | Toggle component favorite |
| GET | `/api/animations` | List animations |
| POST | `/api/animations` | Create an animation |
| GET | `/api/animations/:slug` | Read one animation |
| PATCH | `/api/animations/:slug` | Update an animation |
| DELETE | `/api/animations/:slug` | Delete an animation |
| PATCH | `/api/animations/:slug/favorite` | Toggle animation favorite |

## Checks

```sh
cd backend
npm test

cd ../frontend
npm run lint
npm run build
node --test src/previews/PreviewRenderer.test.js src/animation-previews/AnimationPreviewRenderer.test.js
```

## Accessibility

FrontForge includes visible keyboard focus, accessible favorite labels, responsive controls, and descriptive empty/error states. Preview CSS respects `prefers-reduced-motion`; script animation startup is suppressed for reduced-motion users; registered Motion previews use Motion's reduced-motion hook.

## Future Improvements

- Add authentication before exposing write APIs publicly.
- Add API integration tests with an isolated test database.
- Add more trusted Motion preview registrations as the library grows.
