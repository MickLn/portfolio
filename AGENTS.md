# Portfolio — Mickael Lin (guide for AI agents)

Read `README.md` (French) before changing anything: architecture, the project JSON schema, commands, publishing flow and rules. This file is the short version.

## What this is

- A static, bilingual (FR/EN) portfolio, content in JSON (`src/content/`): React 19 + TypeScript + Vite 8 + Tailwind CSS v4. No server, no database.
- Published on GitHub Pages at https://mickln.github.io/portfolio/ (repository `MickLn/portfolio`).
- Toolchain: pnpm 10.34.3 and Node 22 (`.mise.toml`). Dev server: `pnpm dev` on port 8443 (not started automatically).

## Where things are

- `src/content/` — **all editable content**, as JSON: `projects/<slug>.json` (one per project), `about.json` ("Moi" page), `tools.json`, `photos.json`, `links.json`. `content/index.ts` loads and types them. Change content here, not in components.
- `src/components/` — one section per file (Nav, Footer, Hero, Projects, Tools, Photos, CaseStudy, Cover, Portrait); `src/pages/About.tsx` — the "Moi" page.
- `src/ui/` — shared building blocks: `motion.tsx` (useScrollFrame, Reveal, SplitLine, Parallax, reduceMotion), `HoverName.tsx`, `icons.tsx`.
- `src/projectView.tsx` — project open/close, `#projet/<slug>` address, transition (`flight`, `Words`). `src/i18n.ts` — `T`, `useT`, `b`.
- `src/App.tsx` — assembles the site: global state (page, language, dark mode), navigation, curtain.
- `scripts/check-content.mjs` — `pnpm check` validates every content file (fields, FR+EN texts, unique ids, files present in `public/`).
- `src/index.css` — theme variables (light/dark), custom cursor, global animations.
- `public/` — images, CV, favicon, cursors. `.figma/make/site.json` — page title, description, indexing.
- `.github/workflows/deploy.yml` — check + build on every push; publishes only from `main`.

## Rules

1. **Never push to `main` without the owner's explicit OK** — `main` is the live site. Work on `refonte` (builds, never publishes).
2. **Every visible text exists in French and English**: `{ "fr": "…", "en": "…" }` in `src/content/*.json`; `b(fr, en)` only for interface labels inside components.
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
