# Portfolio — Mickael Lin (guide for AI agents)

Read `README.md` (French) before changing anything: architecture, the project JSON schema, commands, publishing flow and rules. This file is the short version.

## What this is

- A static, bilingual (FR/EN) portfolio: React 19 + TypeScript + Vite 8 + Tailwind CSS v4. No server, no database.
- Published on GitHub Pages at https://mickln.github.io/portfolio/ (repository `MickLn/portfolio`).
- Toolchain: pnpm 10.34.3 and Node 22 (`.mise.toml`). Dev server: `pnpm dev` on port 8443 (not started automatically).

## Where things are

- `src/App.tsx` — the whole site: home, project list, project page and its transition, "Moi" page, UI texts.
- `src/projects/<slug>.json` — one file per project. Adding a file adds a project; no code change needed.
- `scripts/check-projects.mjs` — `pnpm check` validates every project file (fields, FR+EN texts, unique ids, images present).
- `src/index.css` — theme variables (light/dark), custom cursor, global animations.
- `public/` — images, CV, favicon, cursors. `.figma/make/site.json` — page title, description, indexing.
- `.github/workflows/deploy.yml` — check + build on every push; publishes only from `main`.

## Rules

1. **Never push to `main` without the owner's explicit OK** — `main` is the live site. Work on `refonte` (builds, never publishes).
2. **Every visible text exists in French and English**: `b(fr, en)` in code, `{ "fr": "…", "en": "…" }` in JSON.
3. **No new dependency unless the owner asks.** GSAP and Three.js are the only libraries considered for later; add them only on request.
4. **Relative asset paths** (`projects/…`, never `/projects/…`): the site lives in the `/portfolio/` sub-folder.
5. **Colours through theme variables** (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `var(--blue)`); dark mode is the `dark` class on `<html>`.
6. **Scroll-driven components** use `useScrollFrame` and write to the DOM; never put per-scroll values in React state.
7. **Project transition** (`useProjectView`, `flight`, `Words`): after any change, test open, close, the browser back button and a direct `#projet/<slug>` link.
8. **Before pushing**: `pnpm check && pnpm build` must pass (the CI runs the same).

## Code quality

- French texts contain apostrophes: use double quotes for those strings, or the build breaks.
- `pnpm format` (oxfmt) removes `;` in inline object types; review its diff before committing.
- Keep JSX tags closed and braces balanced; `App` stays the default export.
