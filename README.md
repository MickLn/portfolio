# Portfolio de Mickael Lin

Portfolio personnel de **Mickael Lin**, étudiant en Création Digitale & Design d'Interface à l'ESD Paris. Il présente ses projets d'UX/UI, de webdesign et de no-code, en français et en anglais, dans le cadre d'une recherche d'alternance.

Site en ligne : https://mickln.github.io/portfolio/

**Commence ici : lis `STATUS.md`** (état du projet). Les décisions sont dans `DECISIONS.md`, le journal de travail dans `journal/`.

Ce document s'adresse aussi bien à une personne qu'à une IA qui reprend le projet. Les sections « Structure des fichiers », « Où modifier quoi », « Ajouter un projet » et « Règles » sont à lire avant toute modification.

---

## 1. Vue d'ensemble

- **Une seule page** avec deux vues : l'accueil (« Bienvenue ») et la page « Moi ».
- **Le contenu est séparé du code** : tous les textes, liens, photos et projets sont des fichiers JSON dans `src/content/`. Pour changer un texte ou ajouter un projet, on modifie un fichier JSON, pas le code.
- **Les projets** sont un fichier JSON chacun, dans `src/content/projects/`. La liste les découvre automatiquement.
- **Tout le contenu est bilingue** : chaque texte existe en français (`fr`) et en anglais (`en`). Aucun texte ne doit être ajouté dans une seule langue.
- **Le site est statique** : aucun serveur, aucune base de données, aucun formulaire. Il est compilé en fichiers HTML, CSS et JavaScript, puis publié sur GitHub Pages.

## 2. Stack

| Élément | Choix | Remarque |
|---|---|---|
| Interface | React 19 + TypeScript 5 | un fichier par section, contenu en JSON |
| Build | Vite 8 | `pnpm dev`, `pnpm build` |
| Style | Tailwind CSS v4 (plugin `@tailwindcss/vite`) | pas de fichier de configuration Tailwind |
| Gestionnaire de paquets | pnpm **10.34.3** (fixé dans `.mise.toml`) | le fichier de verrouillage est `pnpm-lock.yaml` |
| Node | **22** | fixé dans `.mise.toml` |
| Formatage | oxfmt (`pnpm format`) | ne pas le relancer sans vérifier le code : il retire certains `;` |
| Polices | Outfit et Geist Mono (Google Fonts) | chargées dans `src/index.css` |

**Bibliothèques.** Le projet n'utilise que React. Aucune autre bibliothèque d'animation ou de rendu 3D n'est installée. GSAP et Three.js ont été évoqués pour plus tard : ne les ajouter que sur demande explicite.

## 3. Structure des fichiers

```
STATUS.md                  État du projet : étapes, briques, stack, style, points d'attention
DECISIONS.md               Décisions prises et pourquoi (la plus récente en haut)
journal/                   Un fichier par jour de travail (AAAA-MM-JJ.md)
src/
  App.tsx                  Assemble le site : état global (page, langue, mode sombre), navigation, rideau
  main.tsx                 Point d'entrée React
  i18n.ts                  Langues : type T = { fr, en }, useT(), b(fr, en)
  projectView.tsx          Ouverture/fermeture d'un projet, adresse #projet/<slug>, transition (flight, Words)
  useAdaptiveCursor.ts     Curseur qui passe en bleu sur fond orange
  index.css                Thème clair/sombre (variables CSS), curseur, animations globales
  content/                 TOUT LE CONTENU ÉDITABLE
    index.ts               Charge et type les fichiers ci-dessous (ne contient pas de texte)
    projects/<slug>.json   Un fichier par projet
    about.json             Page « Moi » : qualités, passions (avec chiffres et lien), langues
    tools.json             Section « Outils » de l'accueil
    photos.json            Section « Photographie » de l'accueil
    links.json             E-mail, LinkedIn, CV, Notion
  components/              Une section du site par fichier
    Nav.tsx, Footer.tsx    En-tête et pied de page
    Hero.tsx               Haut de l'accueil
    Projects.tsx           Liste des projets
    Tools.tsx, Photos.tsx  Sections « Outils » et « Photographie »
    CaseStudy.tsx          Page d'un projet (étapes, captures, zoom, sélecteur de templates)
    Cover.tsx, Portrait.tsx
  pages/About.tsx          Page « Moi »
  ui/                      Briques réutilisables
    motion.tsx             Défilement partagé (useScrollFrame), Reveal, SplitLine, Parallax, reduceMotion
    HoverName.tsx          Titres dont les lettres se transforment au survol
    icons.tsx              Logo, flèche
scripts/check-content.mjs  Vérifie tout le contenu (lancé par `pnpm check`)
public/                    Images, CV, favicon, curseurs (chemins relatifs, voir section 8)
.figma/make/site.json      Titre, description et indexation (utilisé par le build)
.github/workflows/deploy.yml   Contrôle, compilation et mise en ligne
```

## 4. Où modifier quoi

| Je veux… | Fichier |
|---|---|
| Changer un texte de la page « Moi », une passion, un record de course | `src/content/about.json` |
| Ajouter ou modifier un projet | `src/content/projects/<slug>.json` (voir section 5) |
| Changer une photo de la section Photographie | `src/content/photos.json` + l'image dans `public/about/` |
| Changer un outil | `src/content/tools.json` (`accent` : `"signal"` = orange, `"blue"` = bleu) |
| Changer l'e-mail, LinkedIn, le CV | `src/content/links.json` (+ le PDF dans `public/`) |
| Changer un libellé d'interface (bouton, titre de section) | le composant concerné dans `src/components/` ou `src/pages/` (textes en `b(fr, en)`) |
| Changer la mise en page d'une section | le composant concerné |
| Changer les couleurs du thème | `src/index.css` (variables `--bg`, `--fg`, `--muted`, `--blue`, `--line`) |

**À savoir sur le code :**
- **Défilement :** `useScrollFrame` (dans `ui/motion.tsx`) est le seul écouteur de défilement. Les composants qui réagissent au défilement écrivent directement dans le DOM. Ne pas ajouter de `useState` mis à jour à chaque défilement.
- **Transition de projet :** elle vit dans `projectView.tsx`. Toute modification doit être testée dans quatre cas : ouverture, fermeture, bouton retour du navigateur, lien direct `#projet/<slug>`.
- **Couleurs :** les variables CSS changent avec le mode sombre (classe `dark` sur `<html>`). Utiliser `bg-bg`, `text-fg`, `text-muted`, `border-line`, `var(--blue)` plutôt que des couleurs en dur.

## 5. Ajouter ou modifier un projet

Chaque projet est un fichier `src/content/projects/<slug>.json`. Le fichier `popfig.json` sert de modèle.

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
| `choices` | liste de `{fr, en}` | oui (peut être vide) | étape 2 : les décisions |
| `result` | `{fr, en}` | oui | étape 3 : ce que tu en retiens |
| `credit` | `{fr, en}` | non | mention d'un travail d'équipe |
| `logo` | chemin | non | image du logo |
| `colors` | liste de `[nom, hex]` | non | palette affichée |
| `fonts` | liste de texte | non | polices |
| `board` | `{src, alt, caption}` | non | grand visuel (board Figma) avec légende |
| `screens` | liste | non | captures : `{src, alt, caption: {fr,en}, aspect: "mobile" \| "desktop"}` |
| `templates` | liste | non | pour un projet qui regroupe plusieurs modèles (voir `notion.json`) |

**Procédure :**
1. Copier `popfig.json` vers `src/content/projects/<nouveau-slug>.json`.
2. Mettre à jour `slug` (le même que le nom du fichier), `id`, les textes en français **et** en anglais, et les images.
3. Déposer les images dans `public/projects/<nouveau-slug>/`.
4. Lancer `pnpm check`. Il signale tout champ manquant, toute traduction vide, toute image introuvable et tout `id` en double.
5. Lancer `pnpm dev` et vérifier le rendu à `http://localhost:8443`.

Le projet apparaît tout seul dans la liste. Aucune modification de code n'est nécessaire. Une capture plus haute que son cadre défile à l'intérieur : il suffit de l'ajouter à `screens`.

## 6. Commandes

```bash
pnpm install        # installer les dépendances (pnpm 10.34.3, Node 22)
pnpm dev            # serveur local sur http://localhost:8443
pnpm check          # vérifier tout le contenu (src/content/)
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
- **Ne pas recréer la transition de projet** à la main : elle est dans `src/projectView.tsx` (`useProjectView`, `flight()`). La modifier demande de vérifier les quatre cas (ouverture, fermeture, bouton retour, lien direct).
- **Après toute modification :** `pnpm check` puis `pnpm build` doivent passer avant un envoi.

## 9. Points d'attention connus

- **Curseur personnalisé :** le navigateur le charge depuis `public/cursor*.svg` ; sur un écran tactile il n'a aucun effet.
- **Captures très hautes :** une image nettement plus haute que son cadre défile à l'intérieur du cadre. Le seuil est dans `Shot` (`src/components/CaseStudy.tsx`, 15 % de marge).
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
