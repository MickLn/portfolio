# Mickael Lin — Portfolio

Portfolio de **Mickael Lin**, étudiant en Création Digitale & Design d'Interface à l'ESD Paris, à la recherche d'une alternance en UX/UI, webdesign et intégration No-code.

Le site est disponible en français et en anglais.

## Projets présentés

- **Pansies** — application mobile vocale (projet de groupe, 3 personnes), maquettée et prototypée sur Figma.
- **PopFig** — site e-commerce de figurines (WordPress, WooCommerce, Elementor Pro).
- **Sushi Lin** — refonte d'un site de restaurant japonais, en solo, avec un espace d'administration.
- **Notion Workspaces** — templates Notion (suivi nutritionnel, collection Street Art).

## Stack technique

- React 19 et TypeScript
- Vite 8
- Tailwind CSS v4
- Polices Outfit et Geist Mono

## Lancer le projet en local

Le projet utilise pnpm 10 (version fixée dans `.mise.toml`).

```bash
pnpm install
pnpm dev
```

Le site est ensuite visible sur http://localhost:8443.

## Construire le site

```bash
pnpm build
```

Le résultat se trouve dans `dist/`. Les chemins sont relatifs, donc le site fonctionne à la racine d'un domaine comme dans un sous-dossier (par exemple `/portfolio/` sur GitHub Pages).

## Structure

- `src/App.tsx` : l'application complète (accueil, projets, page « Moi », textes FR/EN).
- `src/index.css` : thème (clair et sombre), curseur personnalisé, animations.
- `public/` : images des projets, photos, CV, favicon et curseurs.
- `.figma/make/site.json` : titre, description et réglages d'indexation.

## Contact

- E-mail : mickael.lin.etud@gmail.com
- LinkedIn : https://www.linkedin.com/in/mickael-lin/
- CV : `public/cv-mickael-lin.pdf`
