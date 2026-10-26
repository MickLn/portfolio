# Décisions

## 2026-10-26  Fichiers de suivi du projet
Décision : ajouter `STATUS.md` et `DECISIONS.md` à la racine, sans déplacer les fichiers existants. Le journal de travail est privé, dans le dossier du projet Claude (pas dans ce dépôt public).
Pourquoi : chaque nouvelle conversation avec une IA reprend le contexte sans qu'il faille le répéter.
Écarté : dépôt privé (GitHub Pages ne marche pas sur un dépôt privé avec un compte gratuit) ; réorganiser le dossier selon le modèle du skill (`code/`, `design/`…), qui casserait le build et les chemins du site.

## 2026-10-15  Contenu en JSON, un fichier par section
Décision : tous les textes, liens et projets sont dans `src/content/*.json`, en FR et EN ; un composant par section.
Pourquoi : modifier le contenu sans toucher au code, et ajouter un projet en ajoutant un fichier.
Écarté : textes écrits dans les composants (difficile à relire et à traduire).

## 2026-10-13  Refonte en React + Vite, publication sur GitHub Pages
Décision : remplacer la version Figma Make par un projet React/TypeScript/Tailwind, publié depuis `main` ; la branche `refonte` ne fait que vérifier le build.
Pourquoi : code maîtrisé, hébergement gratuit, mise en ligne automatique.
Écarté : WordPress/Elementor (coût et maintenance d'un serveur), garder Figma Make (code généré peu maintenable). L'ancien site reste dans l'historique git.
