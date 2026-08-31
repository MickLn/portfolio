# Technical Specification: Mickael LIN — Minimalist Editorial UX/UI Portfolio

**Date:** 2026-08-31  
**Candidate:** Mickael LIN — Junior UX/UI Designer  
**Objective:** UX/UI Apprenticeship (Available Immediately / ASAP)  
**Target:** GitHub Pages static site (Full width, zero framework bloat, fast 30s recruiter scan, no numbering)  
**Stack:** Vanilla HTML5, Vanilla CSS3, Vanilla JS, GSAP + ScrollTrigger (Robust Bidirectional Scroll Accordion), Vite (Dev/Build)  
**Language:** 100% English for the website  

---

## 1. Design System & Visual Charter

### Editorial Raw Minimalism
- **Borders:** Sharp `1px` structural borders (`#1A1A1A` or `#D5D4CE`). No box-shadows, zero gradients.
- **Background:** Off-white matte paper `#F4F3EF`.
- **Text & Contrast Elements:** Matte Carbon Black `#1A1A1A`.
- **Footer Section:** Dark background `#141414` / `#1A1A1A`.
- **Muted Text:** `#666664`.
- **Numbering Policy:** Zero arbitrary numbers (`[01]`, `01.`, `02.`) anywhere on the site for a pure, distraction-free typographic hierarchy.

### Typography
- **Geist (Sans-serif):** Main name, section titles, project titles, flash concepts, and body descriptions.
- **Space Mono (Monospace):** Navigation links, status tags, tools tags, and metadata (live clock, UTC/Local time).

---

## 2. Page Structure & Components

### A. Minimalist Header
- **Fixed, Zero Background:** Completely transparent background.
- **3 Direct Anchors (No numbering):** `HOME`, `ABOUT`, `PROJECTS` in Space Mono with custom underline drawer animation.

### B. Hero Section (3-Column Layout Strict)
- **Left Column:** Candidate name **Mickael LIN** + primary title **Junior UX/UI Designer** (Header tag: `CANDIDATE PROFILE`).
- **Middle Column:** Centered profile portrait with sharp 1px frame and corner crosshair markers.
- **Right Column:** High-visibility Apprenticeship Status:
  - *STATUS: AVAILABLE* with live pulsing indicator.
  - *SEEKING APPRENTICESHIP — IMMEDIATE / ASAP*.
  - *Strictly scoped:* Zero generic pitch or fluff text.

### C. Projects Section (Full Width, Scroll-Driven Dynamic Accordion)
- **Full Width Layout:** Zero restrictive margin wrapper (`container-full` with edge padding `2.5rem`), taking full advantage of the screen width.
- **Title:** `Projects` with subtitle `SELECTED WORK`.
- **Architecture & Interaction:**
  - Chaque projet est un élément d'accordéon (`.project-accordion-item`).
  - **Ligne de résumé permanente (Sans numérotation) :** Titre du projet (`Geist`) + Flash concept + Tags en Space Mono.
  - **Corps extensible (`.accordion-content`) :**
    - **Gauche :** Bloc média miniature (`.accordion-media-block`) avec image, cadre 1px et badge de sprint.
    - **Droite :** Sous-liste textuelle (`THE FRICTION`, `THE DESIGN SYSTEM SOLUTION`, `DELIVERABLES & METRICS`, bouton `VIEW FULL CASE STUDY ↗`).
- **Comportement ScrollTrigger Infaillible (Bidirectionnel) :**
  - Synchronisation continue au défilement en descente comme en montée avec `ScrollTrigger.refresh()` à chaque transition de hauteur.
  - Transition de hauteur fluide (`power2.out`, 0.45s).
  - Repli automatique et doux de la section précédente (`power2.inOut`, 0.35s).
  - Clic manuel possible sur l'en-tête pour forcer l'ouverture d'une carte spécifique.

### D. Dark Uncover Footer
- **Visual:** High contrast dark carbon background (`#141414`).
- **Kinetic Headline:** *"Let's work together."*
- **Live Local Clock:** Real-time Paris clock in Space Mono with live pulsing availability dot.
- **Magnetic Back-to-Top Button:** Circular button with 45-degree rotation on hover and smooth scroll to top.
