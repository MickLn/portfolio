# Portfolio de Mickael Lin

Portfolio personnel de **Mickael Lin**, étudiant en Création Digitale & Design d'Interface à l'ESD Paris. Il présente ses projets d'UX/UI, de webdesign et de no-code, en français et en anglais, dans le cadre d'une recherche d'alternance.

Site en ligne : https://mickln.github.io/portfolio/

Ce document s'adresse aussi bien à une personne qu'à une IA qui reprend le projet. Les sections « Architecture », « Règles » et « Ajouter un projet » sont à lire avant toute modification.

---

## 1. Vue d'ensemble

- **Une seule page** (`src/App.tsx`) avec deux vues : l'accueil (« Bienvenue ») et la page « Moi ».
- **Les projets** sont des fichiers JSON dans `src/projects/`, un par projet. La liste les découvre automatiquement.
- **Tout le contenu est bilingue** : chaque texte existe en français (`fr`) et en anglais (`en`). Aucun texte ne doit être ajouté dans une seule langue.
- **Le site est statique** : aucun serveur, aucune base de données, aucun formulaire. Il est compilé en fichiers HTML, CSS et JavaScript, puis publié sur GitHub Pages.

## 2. Stack

| Élément | Choix | Remarque |
|---|---|---|
| Interface | React 19 + TypeScript 5 | un seul composant principal |
| Build | Vite 8 | `pnpm dev`, `pnpm build` |
| Style | Tailwind CSS v4 (plugin `@tailwindcss/vite`) | pas de fichier de configuration Tailwind |
| Gestionnaire de paquets | pnpm **10.34.3** (fixé dans `.mise.toml`) | le fichier de verrouillage est `pnpm-lock.yaml` |
| Node | **22** | fixé dans `.mise.toml` |
| Formatage | oxfmt (`pnpm format`) | ne pas le relancer sans vérifier le code : il retire certains `;` |
| Polices | Outfit et Geist Mono (Google Fonts) | chargées dans `src/index.css` |

**Bibliothèques.** Le projet n'utilise que React. Aucune autre bibliothèque d'animation ou de rendu 3D n'est installée. GSAP et Three.js ont été évoqués pour plus tard : ne les ajouter que sur demande explicite.

## 3. Structure des fichiers

```
src/
  App.tsx              Le site entier : accueil, projets, transitions, page « Moi », textes FR/EN
  index.css            Thème clair/sombre (variables CSS), curseur, animations globales
  main.tsx             Point d'entrée React
  projects/*.json      Un fichier par projet (contenu, voir section 5)
scripts/
  check-projects.mjs   Vérifie les fichiers de projets (lancé par `pnpm check`)
public/
  projects/<slug>/     Images des projets (captures, couvertures, board)
  about/               Photos de la page « Moi »
  profile/             Photo de l'accueil
  cursor*.svg          Curseur personnalisé (orange, bleu, azur pour le mode sombre)
  favicon.svg, apple-touch-icon.png
  cv-mickael-lin.pdf   CV (public)
.figma/make/site.json  Titre, description et réglages d'indexation (utilisé par le build)
.github/workflows/deploy.yml   Compilation, contrôle et mise en ligne
```

## 4. Architecture de `App.tsx`

Ordre des sections du fichier :

1. **Utilitaires** : `Logo`, `Reveal` (apparition au défilement), `SplitLine` (texte qui monte ligne par ligne), `HoverName` (lettres animées au survol, en formes géométriques).
2. **Défilement partagé** : `useScrollFrame` est le seul écouteur de défilement. Les composants qui réagissent au défilement (parallaxe, hero, photos) écrivent directement dans le DOM. Ne pas ajouter de `useState` dans ces composants, cela provoquerait des rendus à chaque défilement.
3. **Données** : les projets viennent des fichiers JSON (`import.meta.glob` dans `App.tsx`, triés par `id`).
4. **Chrome** : `Nav` (en-tête), `Footer`, `Cover` (couverture d'un projet).
5. **Accueil** : `Hero`, `Projects` (la liste), `Tools`, `Photos` (défilement horizontal).
6. **Transition projet** : `useProjectView` gère l'ouverture et la fermeture d'un projet, son adresse `#projet/<slug>`, et le bouton retour du navigateur. `flight()` anime le fond de la ligne et chaque mot du titre. Le titre est découpé en mots avec `Words`.
7. **Page projet** : `CaseStudy`, avec trois étapes (`Step` : « Le contexte », « Mes choix », « Le résultat »), la section `Templates` (sélecteur, utilisé par Notion), et les captures (`Shot`, avec cadre et défilement interne pour les images très hautes).
8. **Page « Moi »** : `About`, avec les qualités, les passions et les liens.
9. **`App`** : état global (page, langue, mode sombre), navigation, rideau entre les pages.

Une variable CSS donne les couleurs : `--bg`, `--fg`, `--muted`, `--blue`, `--line`. Le mode sombre change ces variables via la classe `dark` sur `<html>`. Utiliser ces variables plutôt que des couleurs en dur.

## 5. Ajouter ou modifier un projet

Chaque projet est un fichier `src/projects/<slug>.json`. Le fichier `popfig.json` sert de modèle.

| Champ | Type | Obligatoire | Rôle |
|---|---|---|---|
| `slug` | texte | oui | identifiant dans l'adresse ; **doit être identique au nom du fichier** |
| `id` | texte | oui | ordre dans la liste (« 01 », « 02 »…) ; unique |
| `title` | texte | oui | nom affiché |
| `year` | texte | oui | année |
| `bg` | couleur (hex) | oui | couleur de fond de la couverture |
| `coverSrc` | chemin | oui | image de couverture, dans `public/` |
| `tags` | `{fr, en}` | oui | catégorie affichée dans la liste |
| `summary` | `{fr, en}` | oui | phrase de résumé |
| `role`, `team`, `duration` | `{fr, en}` | oui | repères |
| `tools` | texte | oui | outils, en une ligne (pas de traduction) |
| `link` | `{href, label}` | non | bouton « voir le site » ; `label` est traduit |
| `context` | liste de `{fr, en}` | oui | étape 1 : le brief ou le contexte |
| `choices` | liste de `{fr, en}` | oui (peut être vide) | étape 2 : tes décisions |
| `result` | `{fr, en}` | oui | étape 3 : ce que tu en retiens |
| `credit` | `{fr, en}` | non | mention d'un travail d'équipe (logo, typo, couleurs faits par quelqu'un d'autre) |
| `logo` | chemin | non | image du logo |
| `colors` | liste de `[nom, hex]` | non | palette affichée |
| `fonts` | liste de texte | non | polices (deux maximum, la première pour les titres) |
| `board` | `{src, alt, caption}` | non | grand visuel (board Figma) avec légende |
| `screens` | liste | non | captures : `{src, alt, caption: {fr,en}, aspect: "mobile" \| "desktop"}` |
| `templates` | liste | non | pour un projet qui regroupe plusieurs modèles (voir `notion.json`) |

**Procédure :**
1. Copier `popfig.json` vers `src/projects/<nouveau-slug>.json`.
2. Mettre à jour `slug` (le même que le nom du fichier), `id`, les textes en français **et** en anglais, et les images.
3. Déposer les images dans `public/projects/<nouveau-slug>/`.
4. Lancer `pnpm check`. Il signale tout champ manquant, toute traduction vide, toute image introuvable et tout `id` en double.
5. Lancer `pnpm dev` et vérifier le rendu à `http://localhost:8443`.

Le projet apparaît tout seul dans la liste. Aucune modification de `App.tsx` n'est nécessaire.

## 6. Commandes

```bash
pnpm install        # installer les dépendances (pnpm 10.34.3, Node 22)
pnpm dev            # serveur local sur http://localhost:8443
pnpm check          # vérifier les fichiers de projets
pnpm build          # compiler dans dist/
pnpm preview        # tester le build localement
```

## 7. Publication

- **`refonte`** : branche de travail. Chaque envoi déclenche la compilation et le contrôle, mais **rien n'est publié**.
- **`main`** : seule branche publiée. Chaque envoi (ou fusion) sur `main` compile le site et le met en ligne sur GitHub Pages en une minute environ.
- Une compilation qui échoue ne publie rien : le site en ligne reste dans son dernier état correct.

## 8. Règles pour toute modification

- **Bilingue :** chaque texte visible a une version française et une version anglaise.
- **Pas de dépendance ajoutée sans demande.** Vérifier d'abord ce que React, Tailwind et le navigateur savent déjà faire.
- **Chemins relatifs :** les images et fichiers sont référencés sans barre initiale (`projects/…`, pas `/projects/…`), pour que le site marche aussi dans le sous-dossier `/portfolio/` de GitHub Pages.
- **Couleurs :** utiliser les variables CSS (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `var(--blue)`), pour que le mode sombre fonctionne.
- **Accessibilité :** toute image cliquable est un `<button>` avec un libellé ; les dialogues ont un `aria-label` ; le focus clavier est géré à l'ouverture et à la fermeture d'un projet ; les animations respectent `prefers-reduced-motion`.
- **Ne pas recréer la transition de projet** à la main : elle est dans `useProjectView` et `flight()`. La modifier demande de vérifier les quatre cas (ouverture, fermeture, bouton retour, lien direct).
- **Après toute modification :** `pnpm check` puis `pnpm build` doivent passer avant un envoi.

## 9. Points d'attention connus

- **Curseur personnalisé :** le navigateur le charge depuis `public/cursor*.svg` ; sur un écran tactile il n'a aucun effet.
- **Captures très hautes :** une image nettement plus haute que son cadre défile à l'intérieur du cadre. Le seuil est dans `Shot` (15 % de marge).
- **Google :** le site est indexable (`.figma/make/site.json`, `robots.index: true`).
- **Ancienne version :** l'historique de `main` contient l'ancien site, réalisé avec Figma Make. Il est volontairement conservé dans git, pas dans le projet actuel.

## 10. Ce qui n'est pas vérifié

- Le rendu sur téléphone de la transition de projet et de la page « Moi ».
- Le rendu en mode sombre des captures et des palettes.
- La vérification de l'animation en mouvement (seules des positions ont été mesurées).

## Contact

- E-mail : mickael.lin.etud@gmail.com
- LinkedIn : https://www.linkedin.com/in/mickael-lin/
- CV : `public/cv-mickael-lin.pdf`
