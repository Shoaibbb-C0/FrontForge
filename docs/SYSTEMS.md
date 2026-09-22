# FrontForge Systems

## Libraries and discovery

`ComponentsPage` and `AnimationsPage` load their respective collections, provide combined client-side discovery controls, show result counts, and preserve active filters in the URL. Library cards link to detail views and expose favorite controls. `FavoritesPage` combines both resource types.

## Knowledge views

Component details organize preview, code, notes, reference, and implementation guidance. Animation details organize preview, code, learning notes, performance, and accessibility guidance. `NotesPage` aggregates resources containing learning notes, while `ReferencesPage` lists external sources attached to components.

## Forms and CRUD

Create and edit pages map form fields to the nested Mongoose document shapes. Successful writes navigate to the saved detail route. Failed initial edit loads are non-submittable. Detail pages confirm deletion and return to the appropriate library after success.

## Preview registration

Trusted component previews live in `frontend/src/previews/level1` and are mapped in `previewRegistry.js`. Trusted Motion previews live in `frontend/src/animation-previews/registered` and are mapped in `animationPreviewRegistry.js`. Add a registry entry only for reviewed source shipped with the application.

## Verification

Backend schema tests cover legacy component preview compatibility, preview validation, URL-safe slugs, reference URLs, and animation enums. Frontend preview tests cover fallback behavior, iframe sandboxing, registered previews, supported JavaScript, the pinned GSAP runtime, and reduced-motion setup. The final release gate also includes ESLint, a Vite production build, live API health/read checks, temporary CRUD smoke records, and responsive browser inspection.
