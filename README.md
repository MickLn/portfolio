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

## Ajouter ou modifier un projet

Chaque projet est un fichier JSON dans `src/projects/`. Pour en ajouter un :

1. Copier un fichier existant, par exemple `popfig.json`, sous un nouveau nom (`mon-projet.json`).
2. Changer `slug` (identique au nom du fichier), `id` (il fixe l'ordre dans la liste), les textes FR/EN et les images.
3. Déposer les images dans `public/projects/mon-projet/`.
4. Lancer `pnpm check` : il signale tout champ manquant, texte non traduit ou image introuvable.

Le projet apparaît ensuite tout seul dans la liste, avec son adresse `#projet/mon-projet`. Une capture plus haute que son cadre défile à l'intérieur : il suffit de l'ajouter à la liste `screens` du projet.

## Structure

- `src/App.tsx` : l'application (accueil, page « Moi », mise en page des projets, textes FR/EN).
- `src/projects/*.json` : un fichier par projet (textes FR/EN, couleurs, polices, images, liens).
- `scripts/check-projects.mjs` : vérifie ces fichiers avant chaque mise en ligne.
- `src/index.css` : thème (clair et sombre), curseur personnalisé, animations.
- `public/` : images des projets, photos, CV, favicon et curseurs.
- `.figma/make/site.json` : titre, description et réglages d'indexation.

## Contact

- E-mail : mickael.lin.etud@gmail.com
- LinkedIn : https://www.linkedin.com/in/mickael-lin/
- CV : `public/cv-mickael-lin.pdf`
