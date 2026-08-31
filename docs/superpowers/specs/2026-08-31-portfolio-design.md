# Technical Specification: Mickael LIN — Minimalist Editorial UX/UI Portfolio

**Date:** 2026-08-31  
**Candidate:** Mickael LIN — Junior UX/UI Designer  
**Objective:** UX/UI Apprenticeship (Available Immediately / ASAP)  
**Target:** GitHub Pages static site (Fast 30s recruiter scan, content-first)  
**Stack:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion & GSAP (ScrollTrigger)  
**Language:** 100% English for the website  

---

## 1. Design System & Visual Charter

### Editorial Raw Minimalism
- **Borders:** Sharp `1px` structural borders (`#1A1A1A` or `#D5D4CE`). No box-shadows, zero gradients, zero rounded bubble cards.
- **Background:** Off-white matte paper `#F4F3EF`.
- **Text & Contrast Elements:** Matte Carbon Black `#1A1A1A`.
- **Footer Section:** High-contrast Matte Carbon Black `#1A1A1A` with subtle deep violet touch `#61286C`.
- **Muted Text:** `#666664`.

### Typography
- **Geist (Sans-serif):** Main name, section titles, project titles, flash concepts, and body descriptions.
- **Space Mono (Monospace):** Navigation links, project indices, status tags, tools tags, and metadata (live clock, UTC/Local time).

---

## 2. Structure & Sections (Strictly Scoped)

### A. Minimalist Header
- **Navigation:** 3 monospace links (`Home`, `About`, `Projects`) using Space Mono.
- **Sticky / Fixed Top Bar:** Clean 1px bottom border with blur-free crisp background.

### B. Hero Section (3-Column Layout — Strictly Scoped)
- **Left Column:** Name & Surname (**Mickael LIN**) and primary title (**Junior UX/UI Designer**).
- **Middle Column:** Centered profile portrait with sharp 1px frame and monochromatic editorial filter.
- **Right Column:** High-visibility Apprenticeship Status:
  - *"Available for Apprenticeship — Starting ASAP"* with pulsing status badge.
- *Strict constraint:* No extra pitch, fluff, or generic marketing copy.

### C. Interactive Projects Section
- **Typography:** Geist for titles & flash concepts; Space Mono for project numbers `[01]`, `[02]`, `[03]` and tool tags.
- **Projects Data (3 Key Cases):**
  1. **Pansies (Mobile App):** Instant voice capture app with smart notifications (Academic project / 4-day Figma sprint). Tools: `Figma`, `UX Research`, `Interactive Prototyping`.
  2. **CMS & AI Websites:** High-efficiency web design leveraging CMS and AI tools. Tools: `Webflow`, `Framer`, `AI Workflows`, `UI Systems`.
  3. **Notion Templates:** Productivity frameworks and system design templates. Tools: `Notion`, `Information Architecture`, `Wireframing`.
- **Motion & Interactions:**
  - **Entry Animation:** Scroll-triggered staggered fade-up (`y: 30` to `0`, `opacity: 0` to `1`, stagger `0.15s`).
  - **Hover Effects:**
    - Subtle scale lift (`scale: 1.015`) and border highlight shift.
    - Floating / integrated thumbnail preview zoom (`scale: 1.05`) with smooth overflow clipping.
    - Tool tags in Space Mono illuminate on hover.
    - Sibling project rows dim to `0.3` opacity.
  - **Interactive CTA:** "View Case Study →" with magnetic cursor tracking.
  - **Case Study Drawer / Modal:** Clean slide-over drawer detailing the *Problem → Solution → Measurable Result* for each project without AI jargon.

### D. Footer Section (Dark Sticky Uncover)
- **Visual:** Deep matte carbon `#1A1A1A` / deep violet `#61286C` uncovers smoothly from underneath the main page content as user scrolls past Projects.
- **Kinetic Headline:** Bold typography reveal (*"Let's work together" / "Looking for an apprenticeship"*).
- **Link Interactions:** Underline drawer animation (slides in from left on hover, exits to right on leave) for social links (LinkedIn, GitHub, Email, Figma).
- **Live System Status:** Pulsing green indicator + real-time Local/UTC Clock rendered in Space Mono.
- **Back-to-Top Button:** Minimal circular button with magnetic hover interaction and a 45-degree rotation on hover that smoothly scrolls to the top.

---

## 3. Technical Architecture & Component Tree

```
src/
├── components/
│   ├── Header.tsx           // Space Mono nav (Home, About, Projects)
│   ├── Hero.tsx             // 3-column raw layout (Name, Portrait, Apprenticeship status)
│   ├── Projects.tsx         // Editorial interactive project cards/table with hover reveal & dimming
│   ├── ProjectDrawer.tsx    // Detail case study modal/drawer (Problem -> Solution -> Result)
│   └── Footer.tsx           // Dark uncover footer with live clock, status dot & back-to-top
├── data/
│   └── projects.ts          // Project details, metadata, tools, and case studies
├── index.css                // CSS variables, font imports (Geist & Space Mono), Tailwind setup
├── App.tsx                  // Main page layout with sticky uncover footer architecture
└── main.tsx                 // React DOM root
```
