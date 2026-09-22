# FrontForge Architecture

## Request flow

The React application uses `VITE_API_URL` to call the Express API. Express routes delegate to resource-specific controllers, and controllers use Mongoose models backed by MongoDB. Responses use `{ success, data }`; list responses also include `count`. Central middleware returns JSON for missing endpoints and failures.

## Frontend

`AppLayout` provides the persistent developer-tool shell. React Router maps library, detail, create, edit, saved, notes, reference, and not-found pages. Pages use local React state and `fetch`; discovery filters are derived with `useMemo` and reflected in URL search parameters.

## Backend and database

Components and animations are independent timestamped Mongoose documents addressed by unique slugs. Schemas validate required metadata, supported enum values, URL-safe slugs, preview modes, and component reference URLs. CRUD routes and dedicated favorite-toggle routes are mounted below `/api/components` and `/api/animations`.

Update controllers accept only documented writable fields. Mongoose validation and duplicate-key errors are normalized by the shared error middleware. JSON bodies are limited to 1 MB, and allowed browser origins can be configured with `CLIENT_URL`.

## Preview architecture

`ResponsivePreviewFrame` controls the available canvas width without executing code.

- Component HTML/CSS previews use `HtmlPreview` in a sandboxed `srcDoc` iframe.
- CSS and supported JavaScript animation previews use that same isolated iframe.
- GSAP previews load the pinned GSAP runtime inside the iframe before running stored JavaScript.
- React/Motion previews resolve a trusted key through `animationPreviewRegistry` and render shipped React source.
- Component React previews use the equivalent `previewRegistry`.
- Replay remounts an animation preview.
- CSS, JavaScript startup, and registered Motion previews account for reduced-motion preferences.

Stored JSX is display-only and is never evaluated. Script-enabled iframes do not receive `allow-same-origin`, forms, navigation, or popup permissions.

## Deployment boundary

The frontend and API can be hosted separately. Production hosting must provide a client-side routing fallback to `index.html`, set `VITE_API_URL`, configure `CLIENT_URL`, and keep `MONGO_URI` server-only. The application is designed as a personal system; authentication is required before allowing untrusted public write access.
