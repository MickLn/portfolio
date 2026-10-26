# État du projet — Portfolio de Mickael Lin

**Le projet :** portfolio bilingue (FR/EN) pour trouver une alternance en UX/UI, webdesign et no-code. En ligne sur https://mickln.github.io/portfolio/.
**Aujourd'hui (2026-10-26) :** le site refait en React est en ligne. Phase de maintenance et de modifications de design.

## Plan des étapes

1. Première version avec Figma Make (août–sept. 2026) : fait
2. Refonte en React + contenu en JSON (13–15 oct. 2026) : fait
3. Mise en ligne sur GitHub Pages : fait
4. Modifications de design et de contenu, au fil des demandes : en cours
5. Tests sur téléphone et en mode sombre (voir README, section 10) : à faire

## Fonctionnalités en briques

| Fonctionnalité | Rôle | Fichiers | État |
|---|---|---|---|
| Socle : navigation, langue, mode sombre, rideau | Assembler le site | `src/App.tsx`, `src/components/Nav.tsx` | fait |
| Accueil (Hero) | Présentation, nom animé | `src/components/Hero.tsx` | fait |
| Liste des projets | Un fichier JSON par projet | `src/components/Projects.tsx`, `src/content/projects/` | fait (4 projets) |
| Page projet + transition | Étapes, captures, zoom | `src/components/CaseStudy.tsx`, `src/projectView.tsx` | fait |
| Outils | Cartes d'outils | `src/components/Tools.tsx`, `src/content/tools.json` | fait |
| Photographie | Défilement horizontal | `src/components/Photos.tsx`, `src/content/photos.json` | fait |
| Page « Moi » | Qualités, passions, langues | `src/pages/About.tsx`, `src/content/about.json` | fait |
| Pied de page / contact | Liens, CV | `src/components/Footer.tsx`, `src/content/links.json` | fait |
| Curseur personnalisé | Optionnel | `src/useAdaptiveCursor.ts`, `public/cursor*.svg` | fait |

## Stack et pourquoi

- **React 19 + TypeScript + Vite 8** : un fichier par section, compilation rapide. Écarté : rester sur Figma Make (code difficile à maintenir), WordPress (serveur et coût inutiles pour un site vitrine).
- **Tailwind CSS v4** : styles directement dans les composants, couleurs du thème dans `src/index.css`.
- **Contenu en JSON** (`src/content/`) : changer un texte ou ajouter un projet sans toucher au code. `pnpm check` vérifie tout.
- **GitHub Pages** : hébergement gratuit, publication automatique depuis `main`.
- Pas d'autre bibliothèque. GSAP et Three.js seulement sur demande.

## Style visuel

- Couleurs : papier `#f4f3ef`, carbone `#1a1915`, orange Signal `#ff6f0f`, bleu Klein `#002fa7`, azur `#6b8bff` (bleu en mode sombre).
- Polices : Outfit (titres et texte), Geist Mono (petits libellés en majuscules).
- Titres très grands, en majuscules, interlettrage serré ; grille fine de lignes ; animations au défilement.

## Points d'attention

- **Images :** compressées le 2026-10-26 (6,3 Mo → 2,9 Mo, chacune sous 200 Ko, mêmes noms et formats). `.gitattributes` (règles Git LFS jamais utilisées) a été retiré : les images sont des fichiers normaux du dépôt.
- **Règle des langues à moitié tenue :** les libellés d'interface sont écrits dans le code (`b(fr, en)`). Ajouter une 3ᵉ langue demande de modifier le code.
- **Publication :** rien sur `main` sans l'accord explicite de Mickael.

## Questions ouvertes

- Déplacer les libellés d'interface dans des fichiers de langue ?

## Idées pour plus tard

- Langues : espagnol, italien, allemand.
- Animations avec GSAP ou 3D avec Three.js.

## Historique

- (rien d'archivé pour l'instant)
