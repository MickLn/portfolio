# Workflow & Execution Rules for Antigravity

## 1. Obligation de Transparence Systématique sur les Skills Utilisés
- **Règle absolue** : À chaque réponse apportée à une requête de l'utilisateur, l'IA **DOIT SYSTÉMATIQUEMENT** mentionner en début ou fin de réponse la liste exacte des **skills mobilisés et consultés** pour traiter la demande (par exemple : `taste-skill`, `human-copywriter`, `anti-ai-writing`, `design-system-consistency`, etc.).
- **Objectif** : Fournir une preuve formelle, traçable et vérifiable à chaque interaction que les compétences spécifiques sont bien lues, activées et appliquées.

---

## 2. Protocole Strict de Git & Commits
- **Zéro commit automatique** : L'IA ne doit JAMAIS effectuer de commande `git commit` de sa propre initiative sans accord explicite et préalable de l'utilisateur.
- **Proposition systématique** : À la fin de chaque modification validée, l'IA propose un message de commit clair et conventionnel (`feat:`, `style:`, `fix:`, `content:`) et attend la validation de l'utilisateur.
- **Commits atomiques** : Séparer les tâches distinctes en commits individuels.

---

## 3. Respect Intransigeant de la Direction Artistique (DA)
- **Typographie** : Geist Sans pour les titrages et corps de texte, Space Mono pour les métadonnées, labels techniques et navigation.
- **Grille & Structure** : Bordures fines `1px border-[#1A1A1A]` ou `1px border-[#D5D4CE]`, angles nets (`rounded-none`), palette papier écru `#F4F3EF` / `#EAE8E2` et noir carbone `#1A1A1A`.
- **Anti-Template / Anti-Slop** : Pas de composants génériques ou de cartes arrondies standard. Tout doit respirer l'exigence d'un portfolio UX/UI sur-mesure.
