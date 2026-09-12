# FrontForge

FrontForge is a personal frontend engineering knowledge platform for organizing reusable UI patterns, code, learning notes, and references.

## Status and stack

Under active development (v0.0.0). Built with React, Vite, Tailwind CSS v4, React Router, lucide-react, Express, and Mongoose / MongoDB. The existing dark developer-tool interface supports component CRUD, favorites, search/filtering, code copying, notes, and references.

## Local development

Use a Node.js version supported by the installed Vite release (verified with Node 24).

1. Run `npm ci` in both `backend` and `frontend`.
2. Create `backend/.env` with `MONGO_URI` pointing to your MongoDB database and optionally `PORT=5000`.
3. Create `frontend/.env` with `VITE_API_URL=http://localhost:5000`.
4. Run `npm run dev` in each directory, then open the Vite URL.

Environment files are ignored by Git. Only public configuration belongs in frontend `VITE_*` variables; database credentials belong in the backend environment.

## Day 6: configurable previews

Add and Edit have a **Preview** section between Code and Learning notes:

| Preview type | Behavior |
| --- | --- |
| No preview (`none`) | Intentionally displays the Preview unavailable fallback. |
| Automatic HTML / CSS (`html`) | Renders Preview HTML and Preview CSS in an isolated iframe. Blank HTML displays the fallback. |
| Registered React preview (`registered`) | Uses a trusted component shipped in `previewRegistry.js`. An empty registry key uses the component slug; unknown keys display the fallback. |

POST and PATCH accept `preview: { type, registryKey, html, css }`, separately from code snippets.

Use `/components/new`, fill in the required component details, select Automatic HTML / CSS, paste markup and styles, and save. The detail page renders the preview automatically. Edit those fields and save to update it. Desktop is fluid; Tablet targets 768px and Mobile targets 390px, capped by available space. CSS media queries inside HTML previews respond to the iframe width.

HTML previews use `srcDoc` and an empty `sandbox`: scripts, same-origin access, forms, and popups are not enabled. Stored JSX and JavaScript remain code snippets and are never executed. HTML previews have a white canvas and a minimum height of 520px; longer content scrolls inside the iframe. External images/styles may still make network requests. Registered previews remain trusted frontend source files.

### Older MongoDB records

No migration is needed for records whose preview field is absent: the renderer falls back to a matching registered slug. The schema deliberately leaves absent preview metadata undefined on existing records. New API creations without preview settings default to `none`.

The Edit page recognizes legacy registered slugs so saving unrelated edits preserves their preview. Explicit `none` always disables rendering. If a record was already saved with `none`, select Registered React preview in Edit to re-enable it.

Existing registry keys:

- `editorial-split-hero`
- `minimal-product-navbar`
- `bento-feature-grid`

## API

- `GET /api/components` — list components
- `POST /api/components` — create, including preview metadata
- `GET /api/components/:slug` — details
- `PATCH /api/components/:slug` — update, including preview metadata
- `DELETE /api/components/:slug` — delete
- `PATCH /api/components/:slug/favorite` — toggle favorite

## Checks

```sh
cd backend
node --test src/models/Component.test.js
cd ../frontend
node --test src/previews/PreviewRenderer.test.js
npm run lint
npm run build
```

The automated checks cover preview schema validation, serialization, legacy defaults, all registered previews, fallback cases (including inherited object keys), and iframe sandbox markup. They do not connect to MongoDB or replace browser end-to-end testing.

For a browser smoke test, create an Automatic Preview Test via Add, inspect Desktop/Tablet/Mobile, edit its HTML/CSS, save, and verify the change. Also check the component list, search/filters, favorites, code copy, notes/reference tabs, and deletion of the test record. Check the browser console during these flows.

### Verification notes (Day 6)

Build, lint, and automated preview tests passed. A browser smoke test against the connected MongoDB database verified Add, Edit, persisted HTML/CSS changes, Desktop/Tablet/Mobile previews, an existing registered preview, search, combined category/difficulty filters, library favorite toggling, and detail tabs. The temporary test component was removed through the DELETE API. A fresh library load had no console errors after fixing nested filter buttons.

Known pre-existing limitations: the detail-page Favorite button has no handler (use the library card favorite control), and the production build reports a Google Fonts CSS import-order warning. The DELETE API was verified; the browser confirmation workflow was inspected but not exercised. Clipboard contents were not independently verified.
