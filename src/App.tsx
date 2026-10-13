import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { flushSync } from "react-dom"

/* ---------- Utilities ---------- */

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 133 105"
      fill="currentColor"
      role="img"
      aria-label="Logo Mickael Lin"
      className={`inline-block aspect-[133/105] ${className}`}
    >
      <path d="M50.0009 98.5775L2.21002 4.35708C1.19777 2.36142 2.64782 0 4.88552 0H28.22C29.3535 0 30.3902 0.638868 30.8997 1.65139L64.473 68.3636C64.831 69.0751 64.8914 69.8999 64.6408 70.656L55.524 98.1642C54.6851 100.696 51.2072 100.956 50.0009 98.5775Z" />
      <rect
        x="34.8871"
        y="67.7419"
        width="33.871"
        height="33.871"
        rx="16.9355"
        transform="rotate(90 34.8871 67.7419)"
      />
      <path d="M67.7419 0C83.4553 0 96.1936 12.7382 96.1936 28.4516V101.613C80.4802 101.613 67.7419 88.8747 67.7419 73.1613V0Z" />
      <path d="M115.839 67.7419C125.192 67.7419 132.774 75.3242 132.774 84.6774C132.774 94.0306 125.192 101.613 115.839 101.613H98.9032V67.7419H115.839Z" />
    </svg>
  )
}

// Scroll-triggered reveal
function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "section"
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

// Text that slides up line-by-line on reveal
function SplitLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <Reveal className={`split ${className}`} delay={delay}>
      <span className="block">{children}</span>
    </Reveal>
  )
}

type ShapeKey = "arch" | "quarter" | "circle" | "star" | "leaves"

const SHAPE_PATHS: Record<ShapeKey, {
  fill: string
  d?: string
  circle?: boolean
}[]> = {
  arch: [
    {
      fill: "var(--blue)",
      d: "M0 35.0707C0 15.7017 15.7017 0 35.0707 0C54.4397 0 70.1413 15.7017 70.1413 35.0707V70.1413H0V35.0707Z",
    },
  ],
  quarter: [
    {
      fill: "var(--color-signal)",
      d: "M0 70.1413C0 31.4033 31.4033 0 70.1413 0V70.1413H0Z",
    },
  ],
  circle: [{ fill: "var(--blue)", circle: true }],
  star: [
    {
      fill: "var(--color-signal)",
      d: "M35.1006 0C35.0823 0.465208 35.0703 0.932651 35.0703 1.40234C35.0703 20.4688 50.2856 35.9819 69.2363 36.4619L70.1416 36.4736C51.2424 36.4736 35.8369 51.4229 35.1006 70.1416H35.041C34.3165 51.7226 19.389 36.9537 0.905273 36.4854L0 36.4736C19.369 36.4736 35.0703 20.7713 35.0703 1.40234C35.0703 0.932655 35.0593 0.465204 35.041 0H35.1006Z",
    },
  ],
  leaves: [
    {
      fill: "var(--color-signal)",
      d: "M0 35.0707C0 15.7017 15.7017 0 35.0707 0H50.101C50.101 27.67 27.67 50.101 0 50.101V35.0707Z",
    },
    {
      fill: "var(--color-signal)",
      d: "M70.1414 35.0707C70.1414 54.4397 54.4397 70.1414 35.0707 70.1414H20.0404C20.0404 42.4714 42.4714 20.0404 70.1414 20.0404V35.0707Z",
    },
  ],
}

// [shape, clockwise rotation in quarter turns, flipX]; null = empty cell
type Tile = [ShapeKey, number, boolean?] | null
const A0: Tile = ["arch", 0]
const A180: Tile = ["arch", 2]
const CI: Tile = ["circle", 0]
const STEM: Tile[][] = [[A0], [CI], [A180]]

const GLYPHS: Record<string, Tile[][]> = {
  I: STEM,
  M: [
    [A0, ["arch", 2], A0],
    [CI, null, CI],
    [A180, null, A180],
  ],
  N: [
    [A0, null, A0],
    [CI, ["leaves", 0], CI],
    [A180, null, A180],
  ],
  C: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, null],
    [
      ["quarter", 3],
      ["quarter", 2],
    ],
  ],
  K: [
    [A0, ["leaves", 0, true]],
    [CI, null],
    [A180, ["leaves", 0]],
  ],
  A: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, CI],
    [A0, A0],
  ],
  E: [
    [
      ["quarter", 0],
      ["arch", 1],
    ],
    [CI, ["arch", 1]],
    [
      ["quarter", 3],
      ["arch", 1],
    ],
  ],
  O: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, CI],
    [
      ["quarter", 3],
      ["quarter", 2],
    ],
  ],
  P: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, CI],
    [A180, null],
  ],
  R: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, CI],
    [A180, ["leaves", 0]],
  ],
  S: [
    [
      ["quarter", 0],
      ["arch", 1],
    ],
    [
      ["quarter", 2],
      ["quarter", 1],
    ],
    [
      ["arch", 3],
      ["quarter", 2],
    ],
  ],
  G: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, ["arch", 1]],
    [
      ["quarter", 3],
      ["quarter", 2],
    ],
  ],
  U: [
    [A0, A0],
    [CI, CI],
    [
      ["quarter", 3],
      ["quarter", 2],
    ],
  ],
  F: [
    [
      ["quarter", 0],
      ["arch", 1],
    ],
    [CI, ["arch", 1]],
    [A180, null],
  ],
  H: [
    [A0, null, A0],
    [CI, CI, CI],
    [A180, null, A180],
  ],
  T: [
    [["arch", 3], CI, ["arch", 1]],
    [null, CI, null],
    [null, A180, null],
  ],
  W: [
    [A0, null, A0],
    [CI, null, CI],
    [A180, A0, A180],
  ],
  L: [
    [A0, null],
    [CI, null],
    [
      ["quarter", 3],
      ["arch", 1],
    ],
  ],
}

function ShapeTile({ tile }: { tile: Tile }) {
  if (!tile) return <span />
  const [k, rot, flip] = tile
  return (
    <svg
      viewBox="0 0 71 71"
      className="block h-full w-full"
      style={{
        transform: `${flip ? "scaleX(-1) " : ""}rotate(${rot * 90}deg)`,
      }}
    >
      {SHAPE_PATHS[k].map((p, i) =>
        p.circle ? (
          <circle
            key={i}
            cx="35.07"
            cy="35.07"
            r="35.07"
            style={{ fill: p.fill }}
          />
        ) : (
          <path key={i} d={p.d} style={{ fill: p.fill }} />
        ),
      )}
    </svg>
  )
}

function HoverName({ text }: { text: string }) {
  const [on, setOn] = useState<Record<number, boolean>>({})
  const timers = useRef<Record<number, number>>({})
  useEffect(() => {
    const pending = timers.current
    return () => Object.values(pending).forEach(window.clearTimeout)
  }, [])
  const swap = (i: number) => {
    window.clearTimeout(timers.current[i])
    setOn((o) => ({ ...o, [i]: true }))
    timers.current[i] = window.setTimeout(
      () => setOn((o) => ({ ...o, [i]: false })),
      600,
    )
  }
  return (
    <span aria-label={text}>
      {text.split("").map((ch, i) => {
        if (ch === " ") return " "
        const g =
          GLYPHS[
            ch
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toUpperCase()
          ]
        const cols = g ? g[0].length : 0
        return (
          <span
            key={i}
            aria-hidden
            onMouseEnter={() => g && swap(i)}
            className="relative inline-block"
          >
            <span
              className={`inline-block transition-opacity duration-500 ease-in-out ${
                on[i] ? "opacity-0 delay-100" : "opacity-100 delay-300"
              }`}
            >
              {ch}
            </span>
            {g && (
              <span
                className="pointer-events-none absolute left-1/2 bottom-[0.06em] grid -translate-x-1/2"
                style={{
                  width: `${cols * 0.24}em`,
                  height: "0.72em",
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gridTemplateRows: "repeat(3, 1fr)",
                }}
              >
                {g.flatMap((row, r) =>
                  row.map((tile, c) => (
                    <span
                      key={`${r}-${c}`}
                      className="block"
                      style={{
                        transform: on[i] ? "scale(1)" : "scale(0.4)",
                        opacity: on[i] ? 1 : 0,
                        transitionProperty: "transform, opacity",
                        transitionDuration: on[i]
                          ? "700ms, 500ms"
                          : "600ms, 600ms",
                        transitionTimingFunction: on[i]
                          ? "cubic-bezier(.22,1,.36,1), ease-out"
                          : "cubic-bezier(.65,0,.35,1), ease-in-out",
                        transitionDelay: `${(r * cols + c) * (on[i] ? 70 : 40)}ms`,
                      }}
                    >
                      <ShapeTile tile={tile} />
                    </span>
                  )),
                )}
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}

// One shared scroll/resize listener for the whole app. Subscribers write styles
// straight to the DOM, so scrolling never re-renders React components.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const scrollSubs = new Set<() => void>()
let scrollFrame = 0
const runScrollSubs = () => {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0
    scrollSubs.forEach((f) => f())
  })
}
function useScrollFrame(update: () => void) {
  const latest = useRef(update)
  useLayoutEffect(() => {
    latest.current = update
  })
  useEffect(() => {
    const f = () => latest.current()
    if (!scrollSubs.size) {
      window.addEventListener("scroll", runScrollSubs, { passive: true })
      window.addEventListener("resize", runScrollSubs)
    }
    scrollSubs.add(f)
    f()
    return () => {
      scrollSubs.delete(f)
      if (!scrollSubs.size) {
        window.removeEventListener("scroll", runScrollSubs)
        window.removeEventListener("resize", runScrollSubs)
      }
    }
  }, [])
}

function Parallax({
  speed,
  children,
  className = "",
}: {
  speed: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollFrame(() => {
    const el = ref.current
    if (!el || reduceMotion) return
    const r = el.getBoundingClientRect()
    const offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed
    el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
  })
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

const Arrow = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

/* ---------- i18n ---------- */

type Lang = "fr" | "en"
type T = { fr: string; en: string }
const LangCtx = createContext<Lang>("fr")
const useT = () => {
  const lang = useContext(LangCtx)
  return (o: T) => o[lang]
}
const b = (fr: string, en: string): T => ({ fr, en })

const LINKS = {
  email: "mickael.lin.etud@gmail.com",
  linkedin: "https://www.linkedin.com/in/mickael-lin/",
  cv: "/cv-mickael-lin.pdf",
  notion: "https://www.notion.com/fr/@mickln_",
  strava: "https://www.strava.com/athletes/135239970",
}

/* ---------- Data ---------- */

type Page = "home" | "about"

type ProjectScreen = {
  src: string
  alt: string
  caption: T
  aspect: "mobile" | "desktop"
}

type ProjectTemplate = {
  id: string
  title: string
  desc: T
  items: { src: string; alt: string; title: T; span?: string }[]
}

type Project = {
  slug: string
  id: string
  title: string
  year: string
  bg: string
  coverSrc: string
  tags: T
  summary: T
  role: T
  team: T
  duration: T
  tools: string
  link?: { href: string; label: T }
  context: T[]
  choices: T[]
  credit?: T
  logo?: string
  colors?: [string, string][] // [name, hex]
  fonts?: string[]
  board?: { src: string; alt: string; caption: T }
  screens?: ProjectScreen[]
  templates?: ProjectTemplate[]
  result: T
}

const projects: Project[] = [
  {
    slug: "pansies",
    id: "01",
    title: "Pansies",
    year: "2025",
    bg: "#E8DEF8",
    coverSrc: "/projects/pansies/figma-board.png",
    tags: b("IA vocale & productivité", "AI audio & productivity"),
    summary: b(
      "Assistant vocal IA & organisation de flux de pensées.",
      "AI vocal assistant & brain-dumps organizer.",
    ),
    role: b("UX/UI Designer", "UX/UI Designer"),
    team: b("Groupe de 3", "Team of 3"),
    duration: b(
      "Sprint de 4 jours et demi (fin 2025)",
      "4.5-day sprint (late 2025)",
    ),
    tools: "Figma",
    context: [
      b(
        "Le brief : concevoir l'interface d'une application mobile. Notre groupe de trois a choisi une application vocale pour s'enregistrer, avec un système de notifications.",
        "The brief: design the interface of a mobile app. Our team of three chose a voice-recording app with a notification system.",
      ),
      b(
        "Lors d'un sprint intensif de 4 jours et demi, nous avons constaté que noter une idée spontanée sur mobile est souvent freiné par la saisie au clavier et le tri manuel dans des dossiers. L'utilisateur perd son élan avant même d'avoir structuré sa pensée.",
        "During a fast-paced 4.5-day sprint, we identified that capturing spontaneous thoughts on mobile is often interrupted by slow text inputs, rigid folders, and friction. Users lose momentum before structuring their raw ideas.",
      ),
    ],
    choices: [
      b(
        "Nous avons conçu Pansies autour d'une interaction unique : l'enregistrement vocal immédiat. L'application convertit la voix en notes structurées, tâches et synthèses prêtes à l'action. J'ai particulièrement travaillé sur les parcours de capture rapide, la hiérarchie des cartes, les micro-interactions de validation et les boutons d'action (CTA).",
        "We designed Pansies around a single gesture: instant audio capture. The interface processes raw speech into structured notes, tasks, and summaries with zero manual sorting. I focused on the quick-capture flows, the card hierarchy, the validation micro-interactions and the call-to-action buttons.",
      ),
      b(
        "Une palette douce lavande et fusain qui évoque la sérénité, associée à des formes douces pour limiter la fatigue visuelle lors des sessions de capture quotidienne.",
        "A soothing lavender and charcoal palette designed to evoke calm, paired with soft organic shapes that reduce visual fatigue during daily capture.",
      ),
    ],
    credit: b(
      "Logo, couleurs et typographies : réalisés par une coéquipière.",
      "Logo, colours and typefaces: created by a teammate.",
    ),
    logo: "/projects/pansies/cover.png",
    colors: [
      ["Soft Lavender", "#E8DEF8"],
      ["Charcoal Dark", "#1D1B20"],
      ["Deep Violet", "#61286C"],
    ],
    fonts: ["Cabinet Grotesk", "Geist Sans"],
    screens: [
      {
        src: "/projects/pansies/screen-home.png",
        alt: "Pansies — Écran d'accueil & Connexion",
        aspect: "mobile",
        caption: b("Accueil & connexion", "Welcome & sign-in"),
      },
      {
        src: "/projects/pansies/screen-list.jpg",
        alt: "Pansies — Liste des mémos vocaux",
        aspect: "mobile",
        caption: b("Liste des mémos vocaux", "Voice memos list"),
      },
      {
        src: "/projects/pansies/screen-player.jpg",
        alt: "Pansies — Lecteur audio & Transcription",
        aspect: "mobile",
        caption: b("Lecteur & transcription IA", "Player & AI transcription"),
      },
    ],
    result: b(
      "Travailler sur un sprint de 4 jours et demi m'a appris à prioriser sans compromis sur l'essentiel : concentrer l'effort sur le parcours de capture principal pour livrer un prototype mobile tactile, cohérent et immédiatement fluide.",
      "Working under a tight 4.5-day sprint reinforced the necessity of ruthless prioritization. Focusing on the core capture flow over edge cases allowed us to deliver an intuitive and tactile mobile prototype.",
    ),
  },
  {
    slug: "popfig",
    id: "02",
    title: "PopFig",
    year: "2025",
    bg: "#FFBCB3",
    coverSrc: "/projects/popfig/screen-catalog.png",
    tags: b(
      "Webdesign e-commerce & intégration CMS",
      "E-commerce webdesign & CMS integration",
    ),
    summary: b(
      "Site e-commerce de figurines de collection avec recherche dynamique et parcours d'achat épuré.",
      "Collectible figurines e-commerce store with live search filtering and seamless product exploration.",
    ),
    role: b("Web Designer & Intégrateur", "Web Designer & Integrator"),
    team: b("Solo", "Solo"),
    duration: b(
      "4 jours et demi · projet d'études (2025)",
      "4.5 days · academic project (2025)",
    ),
    tools: "Figma · WordPress · WooCommerce · Elementor Pro",
    context: [
      b(
        "Le brief : créer un site e-commerce. J'ai choisi les figurines de collection, parce que j'en collectionne. L'objectif était d'offrir une expérience d'achat fluide, aérée et intuitive. Je me suis inspiré des codes visuels de Pop Mart pour leur approche épurée qui valorise immédiatement chaque pièce de collection.",
        "The brief: build an e-commerce site. I chose collectible figurines because I collect them myself. The goal was a clean, intuitive and smooth shopping experience. I drew inspiration from Pop Mart's minimalist visual language, which keeps the focus entirely on each collectible.",
      ),
    ],
    choices: [
      b(
        "Côté fonctionnalités, le site structure un catalogue varié avec une barre de recherche dynamique qui filtre les figurines instantanément dès la frappe. J'ai conçu une fiche produit immersive (visuels grand format, spécifications techniques, matière, sélecteur rapide) et un tunnel d'ajout au panier direct pour minimiser les étapes avant la commande.",
        "The shop features a diverse collectible catalog equipped with a live search bar that filters products in real time as the user types. I designed a focused product page (high-resolution zoom, material specs, instant quantity selector) and an effortless cart flow to minimize friction from discovery to checkout.",
      ),
      b(
        "Un univers graphique qui associe la douceur d'un rose saumon à la clarté d'un blanc cassé, pour une expérience pop et chaleureuse sans jamais surcharger la lecture des produits.",
        "A visual identity blending a soft salmon pink with crisp off-white tones, creating an inviting pop universe while keeping the focus on collectible details.",
      ),
    ],
    logo: "/projects/popfig/cover.png",
    colors: [
      ["Salmon Pink", "#FFBCB3"],
      ["Off-White", "#F8F8F8"],
      ["Carbon Black", "#1A1A1A"],
    ],
    fonts: ["Bebas Neue", "Work Sans"],
    board: {
      src: "/projects/popfig/figma-board.jpg",
      alt: "PopFig — Board Figma & système graphique",
      caption: b(
        "Le board Figma : système visuel et collections",
        "The Figma board: visual system and collections",
      ),
    },
    screens: [
      {
        src: "/projects/popfig/screen-catalog.png",
        alt: "PopFig — Catalogue & Nouveautés",
        aspect: "desktop",
        caption: b("Catalogue & nouveautés", "Catalog & new arrivals"),
      },
      {
        src: "/projects/popfig/screen-product.jpg",
        alt: "PopFig — Fiche produit",
        aspect: "desktop",
        caption: b("Fiche produit & spécifications", "Product page & specs"),
      },
      {
        src: "/projects/popfig/screen-cart.png",
        alt: "PopFig — Panier & Tunnel d'achat",
        aspect: "desktop",
        caption: b("Panier & tunnel d'achat", "Cart & checkout flow"),
      },
    ],
    result: b(
      "Mon tout premier site e-commerce conçu et intégré sous WordPress (WooCommerce et Elementor Pro). Ce projet m'a permis de relier concrètement l'UX et l'UI : structurer la recherche en temps réel, optimiser le parcours d'achat et concevoir une fiche produit claire, tout en respectant une identité visuelle affirmée.",
      "My very first e-commerce store, designed and built on WordPress (WooCommerce and Elementor Pro). It bridged UX research with practical UI execution: structuring live filtering, streamlining the buying journey, and designing intuitive product pages within a cohesive brand identity.",
    ),
  },
  {
    slug: "sushilin",
    id: "03",
    title: "Sushi Lin",
    year: "2026",
    bg: "#1E2442",
    coverSrc: "/projects/sushilin/screen-hero.png",
    tags: b(
      "Refonte webdesign & e-commerce restauration",
      "E-commerce redesign & restaurant UI",
    ),
    summary: b(
      "Refonte proactive du parcours de commande à emporter, cross-selling, espace d'administration et emails transactionnels.",
      "Proactive redesign of online takeout ordering, cross-selling modules, admin dashboard, and transactional emails.",
    ),
    role: b("UX/UI & Webdesigner", "UX/UI & Webdesigner"),
    team: b("Solo", "Solo"),
    duration: b(
      "1 semaine · projet proactif (2026)",
      "1 week · proactive project (2026)",
    ),
    tools: "Figma · IA (Antigravity)",
    link: {
      href: "https://mickln.github.io/sushi_lin/",
      label: b("Voir le site en ligne", "Visit live site"),
    },
    context: [
      b(
        "Aucun brief : refonte complète pour le restaurant japonais Sushi Lin (Les Clayes-sous-Bois), partie de ma propre initiative. L'objectif était de moderniser leur présence en ligne et de fluidifier la commande à emporter avec un parcours de conversion épuré, pour éviter que les clients ne se perdent dans le catalogue. Interface, backend et mentions légales inclus, le tout réalisé en une semaine.",
        "No brief: a complete redesign for the Japanese restaurant Sushi Lin (Les Clayes-sous-Bois), started on my own initiative. The goal was to modernise their online presence and streamline takeout ordering with a clean conversion flow, so customers don't get lost in the catalogue. Front end, backend and legal notices included, all done in one week.",
      ),
    ],
    choices: [
      b(
        "Conception mobile-first avec navigation rapide par catégories et pastilles portions claires. Intégration d'un module de cross-selling au moment du panier (« Pour accompagner votre repas ») pour suggérer des accompagnements (boissons, raviolis gyoza) et augmenter le panier moyen. Le site intègre également la réservation de table en ligne et la génération automatique d'un email de confirmation détaillé pour le client et le restaurant.",
        "Designed with a mobile-first philosophy featuring intuitive category carousels and clear portion badges. Integrated a dedicated cross-selling module at checkout to recommend drink and side pairings, alongside online table reservations and automated confirmation emails.",
      ),
      b(
        "Une palette de couleurs directement inspirée de la salle du restaurant et de leur carte (Bleu Nuit indigo, Rose poudré et Blanc riz), associant tradition japonaise et modernité épurée.",
        "A color palette directly inspired by the restaurant interior and printed menu (Midnight Indigo, Powder Pink, and Rice White), paired with traditional Japanese typography.",
      ),
    ],
    logo: "/projects/sushilin/logo-badge.png",
    colors: [
      ["Indigo Dark", "#1E2442"],
      ["Powder Pink", "#FFD2E5"],
      ["Rice White", "#FDFBFA"],
    ],
    fonts: ["Shippori Mincho", "Outfit"],
    screens: [
      {
        src: "/projects/sushilin/mobile-catalog.png",
        alt: "Sushi Lin — Menu digital mobile & Réductions",
        aspect: "mobile",
        caption: b(
          "Menu mobile-first & remise à emporter",
          "Mobile-first menu & takeaway discount",
        ),
      },
      {
        src: "/projects/sushilin/mobile-cart-crossell.png",
        alt: "Sushi Lin — Panier mobile & Suggestions gourmandes",
        aspect: "mobile",
        caption: b(
          "Panier interactif & ventes croisées",
          "Interactive cart & cross-selling",
        ),
      },
      {
        src: "/projects/sushilin/email-confirmation.png",
        alt: "Sushi Lin — Reçu & Confirmation de commande",
        aspect: "mobile",
        caption: b(
          "Reçu de commande & suivi de retrait",
          "Order receipt & pickup confirmation",
        ),
      },
      {
        src: "/projects/sushilin/screen-menu.png",
        alt: "Sushi Lin — Carte desktop & Filtrage rapide",
        aspect: "desktop",
        caption: b(
          "Carte desktop & navigation par catégories",
          "Desktop menu & category filtering",
        ),
      },
      {
        src: "/projects/sushilin/screen-reservation.png",
        alt: "Sushi Lin — Réservation de table en ligne",
        aspect: "desktop",
        caption: b(
          "Réservation de table en direct",
          "Direct online table booking",
        ),
      },
      {
        src: "/projects/sushilin/screen-location.png",
        alt: "Sushi Lin — Horaires, Accès & Contact",
        aspect: "desktop",
        caption: b(
          "Horaires, accès & informations pratiques",
          "Hours, directions & practical info",
        ),
      },
    ],
    result: b(
      "Développement de l'interface et intégration d'un espace d'administration permettant au restaurateur de modifier les prix, ajouter des plats et gérer les fermetures exceptionnelles. Pour la partie backend (domaine qui m'était inconnu), j'ai travaillé avec l'assistance d'outils IA (Antigravity) pour structurer la logique de données. Des tests utilisateurs ont ensuite permis de valider la fluidité du tunnel d'achat.",
      "Built the interface and a custom admin dashboard that lets the restaurant owner edit prices, add dishes and manage exceptional closures. For the backend, a domain that was new to me, I worked with AI tools (Antigravity) to structure the data logic. User testing then validated the smoothness of the ordering flow.",
    ),
  },
  {
    slug: "notion",
    id: "04",
    title: "Notion Workspaces",
    year: "2026",
    bg: "#FFFFFF",
    coverSrc: "/projects/notion/assiette-banner.jpg",
    tags: b(
      "Templates Notion & systèmes no-code",
      "Notion templates & no-code systems",
    ),
    summary: b(
      "Templates Notion modulaires conçus pour le suivi nutritionnel et la gamification de Street Art.",
      "Modular Notion templates engineered for daily nutrition tracking and Street Art collection gamification.",
    ),
    role: b("No-Code Designer", "No-Code Designer"),
    team: b("Solo", "Solo"),
    duration: b("Projets personnels (2026)", "Personal projects (2026)"),
    tools: "Notion",
    link: {
      href: LINKS.notion,
      label: b("Voir mon profil Notion", "View Notion profile"),
    },
    context: [
      b(
        "Passionné par l'écosystème Notion, je conçois des templates pour structurer mes habitudes, mes loisirs et mon quotidien. Chaque workspace est pensé pour fonctionner à 100 % sur le plan gratuit de Notion (sans extension payante ni abonnement IA), afin de rester léger, accessible et duplicable en un clic.",
        "Passionate about Notion, I design templates to structure personal habits, daily routines, and hobbies. Each workspace is intentionally built to operate 100% on Notion's free plan, requiring zero paid add-ons or AI subscriptions, making them lightweight, accessible, and instantly duplicable.",
      ),
    ],
    choices: [],
    templates: [
      {
        id: "assiette",
        title: "Mon Assiette",
        desc: b(
          "Un système complet pour gérer son alimentation au quotidien (perte, prise de masse ou maintien). Il enregistre les repas par moment de la journée, utilise des formules pour calculer automatiquement les calories et les macronutriments (protéines, glucides, lipides, fibres) par rapport aux quotas cibles, et suit l'évolution quotidienne du poids.",
          "A structured food logging system designed for weight management (loss, gain, or maintenance). It records meals across key time slots, uses dynamic formulas to calculate calories and macronutrients (proteins, carbs, fats, fibers) against target quotas, and tracks weight trends over time.",
        ),
        items: [
          {
            src: "/projects/notion/assiette-journal.png",
            alt: "Mon Assiette — Journal de bord",
            title: b("Journal de bord quotidien", "Daily food journal"),
            span: "md:col-span-12",
          },
          {
            src: "/projects/notion/assiette-quotas.png",
            alt: "Mon Assiette — Quotas nutritionnels",
            title: b("Quotas & validation", "Quotas & validation"),
            span: "md:col-span-6",
          },
          {
            src: "/projects/notion/assiette-evolution.png",
            alt: "Mon Assiette — Évolution du poids",
            title: b("Évolution & dynamique", "Evolution & momentum"),
            span: "md:col-span-6",
          },
          {
            src: "/projects/notion/assiette-references.png",
            alt: "Mon Assiette — Base de données Références",
            title: b("Base de données Références", "Reference food database"),
            span: "md:col-span-12",
          },
        ],
      },
      {
        id: "invaders",
        title: "Invaders",
        desc: b(
          "Un espace dédié au recensement des mosaïques urbaines de l'artiste Invader. En plus de documenter les œuvres flashées avec leurs caractéristiques (points, ville, date), le dashboard intègre un système de succès déblocables, des jauges de complétion et des grades qui évoluent selon le score total.",
          "An urban mosaic tracking workspace inspired by the street artist Invader. Beyond cataloging photographed artworks with metadata (points, city, date), the dashboard introduces customized unlockable achievements, completion progress gauges, and tiered player ranks based on the global score.",
        ),
        items: [
          {
            src: "/projects/notion/invaders-dashboard.png",
            alt: "Invaders — Dashboard",
            title: b(
              "Dashboard de collection & succès",
              "Collection & achievement dashboard",
            ),
            span: "md:col-span-12",
          },
        ],
      },
    ],
    result: b(
      "Ces deux templates reposent sur des bases de données interconnectées (Relations & Rollups) et des formules conditionnelles pour automatiser les calculs sans aucun outil payant. Cette pratique m'a permis de perfectionner ma vision de l'architecture de données, de l'ergonomie de saisie et de la clarté d'information.",
      "Both workspaces leverage relational databases (Relations & Rollups) combined with conditional formulas to compute progress without external tools. This practice deepened my understanding of data architecture, friction-free input flows, and clean information hierarchy.",
    ),
  },
]

function Cover({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div
      className={`overflow-hidden ${
        className.includes("absolute") ? "" : "relative"
      } ${className}`}
      style={{ background: p.bg }}
    >
      <img
        src={p.coverSrc}
        alt={p.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  )
}

/* ---------- Shared chrome ---------- */

type Go = (p: Page, hash?: string) => void

function Nav({
  page,
  go,
  dark,
  setDark,
  lang,
  setLang,
}: {
  page: Page
  go: Go
  dark: boolean
  setDark: (v: boolean) => void
  lang: Lang
  setLang: (l: Lang) => void
}) {
  const t = useT()
  const link =
    "relative py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-signal after:transition-transform hover:after:scale-x-100"
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav className="grid h-14 grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center gap-4 px-5 md:px-14 font-mono text-[11px] uppercase tracking-[0.12em] [&_button]:uppercase">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setDark(!dark)}
            className="hidden sm:flex items-center gap-2 text-muted hover:text-fg"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                dark ? "bg-current" : "border border-current"
              }`}
            />
            {dark ? "Light" : "Dark"}
          </button>
        </div>
        <ul className="flex justify-center gap-5 md:gap-10">
          <li>
            <button
              className={`${link} ${
                page === "home" ? "after:scale-x-100" : ""
              }`}
              onClick={() => go("home")}
            >
              {t(b("Bienvenue", "Welcome"))}
            </button>
          </li>
          <li>
            <button
              className={`${link} ${
                page === "about" ? "after:scale-x-100" : ""
              }`}
              onClick={() => go("about")}
            >
              {t(b("Moi", "Me"))}
            </button>
          </li>
          <li>
            <button className={link} onClick={() => go("home", "projets")}>
              {t(b("Creations", "Creations"))}
            </button>
          </li>
        </ul>
        <div className="flex items-center justify-end gap-2">
          {(["en", "fr"] as Lang[]).map((l, i) => (
            <span key={l} className="flex items-center gap-2">
              {i > 0 && <span className="text-fg/25">|</span>}
              <button
                onClick={() => setLang(l)}
                className={
                  lang === l
                    ? "text-fg underline underline-offset-4"
                    : "text-muted hover:text-fg"
                }
              >
                {l}
              </button>
            </span>
          ))}
        </div>
      </nav>
    </header>
  )
}

function Footer({ go }: { go: Go }) {
  const t = useT()
  const btn =
    "border border-fg/30 px-5 py-3.5 uppercase hover:bg-[var(--blue)] hover:border-[var(--blue)] hover:text-bg transition-colors"
  return (
    <footer
      id="contact"
      className="relative bg-bg text-fg border-t border-line overflow-hidden scroll-mt-14"
    >
      <div className="px-5 md:px-14 pt-20 md:pt-28 pb-10">
        <Reveal className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>{t(b("Recherche alternance", "Seeking apprenticeship"))}</span>
          <span>UX/UI · No-code · Webdesign</span>
          <span>
            {t(
              b(
                "Disponible dès que possible — Paris",
                "Available ASAP — Paris",
              ),
            )}
          </span>
        </Reveal>
        <div className="grid md:grid-cols-12 gap-10 mt-14">
          <div className="md:col-span-8">
            <SplitLine className="text-[clamp(2.6rem,7vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.045em] uppercase">
              {t(b("Chaud", "Keen"))} <span className="text-signal">?</span>
            </SplitLine>
            <Reveal
              delay={200}
              className="mt-8 max-w-xl text-lg text-fg/70 leading-relaxed"
            >
              {t(
                b(
                  "Je conçois des parcours fluides et des designs soignés prêts à être intégrés. Je cherche justement une alternance en UX/UI ou No-code pour rejoindre une équipe et bosser sur de vrais projets. Fais-moi signe si tu as une place !",
                  "I design smooth user flows and polished, build-ready interfaces. I'm looking for a UX/UI or No-code apprenticeship to join a team and work on real projects. Give me a shout if you have a spot!",
                ),
              )}
            </Reveal>
            <Reveal
              delay={300}
              className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.12em]"
            >
              <a
                href={`mailto:${LINKS.email}`}
                className="flex items-center gap-2 bg-signal text-ink px-5 py-3.5 hover:bg-[var(--blue)] hover:text-bg transition-colors"
              >
                {t(b("N'hésite pas", "Get in touch"))}
              </a>
              <a
                href={LINKS.cv}
                target="_blank"
                rel="noreferrer"
                className={btn}
              >
                CV (PDF)
              </a>
              <button onClick={() => go("about")} className={btn}>
                {t(b("Moi", "Me"))}
              </button>
            </Reveal>
          </div>
          <Reveal
            delay={150}
            className="md:col-span-4 flex md:justify-end items-end"
          >
            <Logo className="w-40 md:w-64 text-[var(--blue)] transition-colors duration-300 hover:text-signal" />
          </Reveal>
        </div>
        <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              LinkedIn
            </a>
            <a
              href={LINKS.notion}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              Notion
            </a>
            <a
              href={`mailto:${LINKS.email}`}
              className="hover:text-fg normal-case"
            >
              {LINKS.email}
            </a>
            <a
              href={LINKS.cv}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              CV (PDF)
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span>© 2026 Mickael Lin</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Top"
              className="grid h-11 w-11 place-items-center rounded-full border border-fg/30 hover:bg-signal hover:border-signal transition-colors"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

const Portrait = ({ className = "" }: { className?: string }) => (
  <img
    src="/profile/profile.jpg"
    alt="Mickael Lin"
    className={`object-cover object-top ${className}`}
  />
)

/* ---------- Home ---------- */

function Hero({ go }: { go: Go }) {
  const t = useT()
  const nameA = useRef<HTMLHeadingElement>(null)
  const nameB = useRef<HTMLDivElement>(null)
  useScrollFrame(() => {
    if (reduceMotion) return
    const x = window.scrollY * 0.15
    if (nameA.current) nameA.current.style.transform = `translateX(${-x}px)`
    if (nameB.current) nameB.current.style.transform = `translateX(${x}px)`
  })
  return (
    <section className="relative h-[100dvh] pt-14 flex flex-col border-b border-line overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid grid-cols-4 md:grid-cols-12 px-5 md:px-14"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`border-l border-line ${i === 11 ? "border-r" : ""} ${
              i > 3 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>

      <div className="relative flex-1 min-h-0 grid grid-cols-4 md:grid-cols-12 px-5 md:px-14 pt-10 md:pt-14 grid-rows-[auto_auto_1fr]">
        <div className="col-span-4 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted md:pl-3 space-y-1">
          <Reveal delay={80} className="flex items-center gap-2 text-fg">
            <span className="relative flex h-2 w-2">
              <span className="relative h-2 w-2 rounded-full bg-signal" />
            </span>
            {t(b("Disponible — alternance", "Available — apprenticeship"))}
          </Reveal>
        </div>
        <div className="hidden md:block md:col-span-6" />
        <Reveal
          delay={120}
          className="hidden md:flex md:col-span-3 justify-end pr-3"
        >
          <Logo className="w-24 text-signal transition-colors duration-300 hover:text-[var(--blue)]" />
        </Reveal>

        <div className="col-span-4 md:col-span-12 self-start mt-6 md:mt-2">
          <h1
            ref={nameA}
            className="font-bold uppercase leading-[0.82] tracking-[-0.06em] text-[clamp(4.2rem,min(17.5vw,18dvh),17rem)]"
          >
            <SplitLine>
              <HoverName text="Mickael" />
            </SplitLine>
          </h1>
          <div className="grid grid-cols-4 md:grid-cols-12 items-end">
            <div
              ref={nameB}
              className="col-span-4 md:col-span-5 font-bold uppercase leading-[0.82] tracking-[-0.06em] text-[clamp(4.2rem,min(17.5vw,18dvh),17rem)]"
            >
              <SplitLine delay={120}>
                <HoverName text="Lin" />
                <span className="text-[var(--blue)] transition-colors duration-300 hover:text-signal">
                  .
                </span>
              </SplitLine>
            </div>
          </div>
        </div>

        <div className="col-span-4 md:col-span-12 self-end grid grid-cols-4 md:grid-cols-12 items-end">
          <Reveal
            delay={260}
            className="col-span-2 md:col-span-3 md:col-start-7 pb-3 md:pb-6 pl-3"
          >
            <p className="text-base md:text-xl leading-snug font-medium tracking-tight max-w-xs">
              {t(
                b(
                  "UX/UI Design · Webdesign · Intégration No-code · Photo",
                  "UX/UI Design · Web Design · No-code Integration · Photography",
                ),
              )
                .split(" · ")
                // Keep each skill on one line; breaks only fall between skills
                .map((s, i) => (
                  <Fragment key={s}>
                    {i > 0 && " · "}
                    <span className="whitespace-nowrap">{s}</span>
                  </Fragment>
                ))}
            </p>
          </Reveal>
          <Reveal
            delay={340}
            className="col-span-2 md:col-span-3 md:col-start-10 pb-3 md:pb-6 pl-3 pr-3"
          >
            <Parallax speed={-0.08}>
              <div className="relative ml-auto w-fit">
                <Portrait className="aspect-[4/5] h-[min(28dvh,50vw)] md:h-[min(34dvh,28vw)] w-auto grayscale hover:grayscale-0 transition duration-700" />
                <span className="absolute -left-3 -top-3 bg-signal text-paper font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1">
                  Paris, FR
                </span>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-3 items-center gap-4 border-t border-line px-5 md:px-14 h-14 font-mono text-[11px] uppercase tracking-[0.12em]">
        <span>UX/UI / No-code / Webdesign</span>
        <button
          onClick={() => go("home", "projets")}
          className="hidden md:flex justify-center items-center gap-2 text-muted hover:text-fg"
        >
          <span className="inline-block animate-bounce">↓</span>{" "}
          {t(b("Défiler pour continuer", "Scroll to continue"))}
        </button>
        <span className="text-right">
          {t(b("Alternance — Paris", "Apprenticeship — Paris"))}
        </span>
      </div>
    </section>
  )
}

function Projects({
  open,
}: {
  open: (p: Project, row?: HTMLElement) => void
}) {
  const t = useT()
  const [hover, setHover] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  return (
    <section
      id="projets"
      className="px-5 md:px-14 py-24 md:py-36 scroll-mt-14"
    >
      <div className="grid md:grid-cols-12 gap-8 items-end border-b border-line pb-8">
        <div className="md:col-span-7">
          <h2 className="text-[clamp(3.5rem,11vw,10rem)] font-bold uppercase leading-[0.82] tracking-[-0.06em]">
            <SplitLine>
              <HoverName text={t(b("Creations", "Creations"))} />
            </SplitLine>
          </h2>
        </div>
      </div>

      <div
        className="relative"
        onMouseMove={(e) => {
          const el = previewRef.current
          if (el)
            el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
        }}
        onMouseLeave={() => setHover(null)}
      >
        <ul>
          {projects.map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={i * 80}
              className="border-b border-line"
            >
              <button
                  data-project={p.slug}
                  onClick={(e) => {
                    setHover(null)
                    open(p, e.currentTarget)
                  }}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="grid w-full grid-cols-12 items-baseline gap-4 py-5 md:py-6 text-left"
                >
                  <h3 className="col-span-12 md:col-span-7 text-[clamp(1.75rem,4vw,3.25rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
                    <Words text={p.title} />
                  </h3>
                  <span className="col-span-8 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {t(p.tags)}
                  </span>
                  <span className="col-span-4 md:col-span-2 flex items-center justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {p.year}
                    <Arrow className="w-4 h-4 text-fg" />
                  </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        >
          <div
            className={`relative w-[min(30vw,420px)] aspect-[4/3] overflow-hidden rounded-xl border border-fg/10 shadow-[0_30px_80px_-30px_rgba(26,26,26,0.45)] transition-[opacity,scale] duration-300 ease-[cubic-bezier(.2,.7,.1,1)] ${
              hover !== null ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  hover === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Cover p={p} className="absolute inset-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Case study ---------- */

const caseLabel = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
const caseText = "text-xl md:text-2xl leading-snug tracking-tight max-w-3xl"

// Black or paper text, whichever reads better on a swatch
const ink = (hex: string) => {
  const [R, G, B] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return R * 0.299 + G * 0.587 + B * 0.114 > 150 ? "#1a1915" : "#f4f3ef"
}

type Zoom = { src: string; alt: string; title?: string }

// One label per step, kept in view on the left while its content scrolls
function Step({ label, children }: { label: T; children: ReactNode }) {
  const t = useT()
  return (
    <section className="mt-24 grid gap-6 md:mt-36 md:grid-cols-12">
      <p className={`${caseLabel} md:col-span-3 md:sticky md:top-24 md:self-start`}>
        {t(label)}
      </p>
      <div className="grid gap-10 md:col-span-9">{children}</div>
    </section>
  )
}

// A screenshot that opens full screen: a real button, so keyboard users can zoom too.
// In a device frame, an image taller than the frame scrolls inside it (long page captures).
function Shot({
  src,
  alt,
  caption,
  onZoom,
  frame,
  className = "",
}: {
  src: string
  alt: string
  caption?: T
  onZoom: () => void
  frame?: "desktop" | "mobile"
  className?: string
}) {
  const t = useT()
  const [tall, setTall] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const limit = frame === "mobile" ? 19.5 / 9 : 10 / 16 // frame height / width
  const hint =
    "pointer-events-none absolute bottom-3 bg-carbon/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper backdrop-blur-sm"
  const body = (
    <button
      type="button"
      onClick={onZoom}
      aria-label={`${t(b("Agrandir", "Enlarge"))} : ${alt}`}
      className="group relative block w-full cursor-zoom-in overflow-hidden bg-fg/[0.04]"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={(e) =>
          frame &&
          setTall(
            // 15% margin: a few pixels taller is not worth a scroll box
            e.currentTarget.naturalHeight / e.currentTarget.naturalWidth > limit * 1.15,
          )
        }
        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
      />
      {!tall && (
        <span
          className={`${hint} right-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100`}
        >
          {t(b("Agrandir +", "Enlarge +"))}
        </span>
      )}
    </button>
  )
  return (
    <figure className={className}>
      {frame ? (
        <div
          className={`relative overflow-hidden border border-line ${
            frame === "mobile" ? "rounded-[1.6rem]" : ""
          }`}
        >
          {frame === "desktop" && (
            <div aria-hidden className="flex h-7 items-center gap-1.5 border-b border-line px-3">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-2 w-2 rounded-full bg-fg/20" />
              ))}
            </div>
          )}
          <div
            onScroll={() => setScrolled(true)}
            tabIndex={tall ? 0 : undefined}
            role={tall ? "region" : undefined}
            aria-label={tall ? `${alt} (${t(b("défilable", "scrollable"))})` : undefined}
            className={
              tall
                ? `${frame === "mobile" ? "aspect-[9/19.5]" : "aspect-[16/10]"} overflow-y-auto [scrollbar-width:thin]`
                : ""
            }
          >
            {body}
          </div>
          {tall && !scrolled && (
            <span aria-hidden className={`${hint} left-1/2 -translate-x-1/2`}>
              {t(b("Défiler ↓", "Scroll ↓"))}
            </span>
          )}
        </div>
      ) : (
        body
      )}
      {caption && <figcaption className={`mt-3 ${caseLabel}`}>{t(caption)}</figcaption>}
    </figure>
  )
}

// Several workspaces in one project: the visitor picks the one to look at
function Templates({
  templates,
  zoomTo,
}: {
  templates: ProjectTemplate[]
  zoomTo: (z: Zoom) => void
}) {
  const t = useT()
  const [i, setI] = useState(0)
  const tpl = templates[i]
  return (
    <div className="grid gap-8">
      <div
        role="group"
        aria-label={t(b("Choisir un template", "Choose a template"))}
        className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line"
      >
        {templates.map((x, j) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={i === j}
            onClick={() => setI(j)}
            className={`-mb-px border-b-2 pb-3 text-[clamp(1.25rem,2.4vw,2rem)] font-bold uppercase leading-none tracking-[-0.04em] transition-colors ${
              i === j ? "border-signal text-fg" : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {x.title}
          </button>
        ))}
      </div>
      <p className={caseText}>{t(tpl.desc)}</p>
      <div className="grid gap-6 md:grid-cols-12">
        {tpl.items.map((it) => (
          <Shot
            key={it.src}
            src={it.src}
            alt={it.alt}
            caption={it.title}
            frame="desktop"
            className={it.span ?? "md:col-span-12"}
            onZoom={() =>
              zoomTo({ src: it.src, alt: it.alt, title: `${tpl.title} — ${t(it.title)}` })
            }
          />
        ))}
      </div>
    </div>
  )
}

// Long captures (a whole page) open at reading width and scroll; the rest fit the screen
function ZoomedImage({ src, alt }: { src: string; alt: string }) {
  const [long, setLong] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      onLoad={(e) =>
        setLong(e.currentTarget.naturalHeight / e.currentTarget.naturalWidth > 2.5)
      }
      className={`${
        long ? "h-auto w-full max-w-3xl self-start" : "max-h-[82vh] max-w-full object-contain"
      } shadow-2xl border border-paper/15`}
    />
  )
}

// Consecutive screens of the same kind share a row: phones side by side, desktops in pairs
function ScreenRuns({
  screens,
  zoomTo,
}: {
  screens: ProjectScreen[]
  zoomTo: (z: Zoom) => void
}) {
  const t = useT()
  const runs = screens.reduce<{ mobile: boolean; items: ProjectScreen[] }[]>(
    (acc, s) => {
      const mobile = s.aspect === "mobile"
      const last = acc[acc.length - 1]
      if (last && last.mobile === mobile) last.items.push(s)
      else acc.push({ mobile, items: [s] })
      return acc
    },
    [],
  )
  return (
    <>
      {runs.map((run, r) => (
        <div
          key={r}
          className={
            run.mobile
              ? "grid grid-cols-2 gap-6 md:grid-cols-3"
              : "grid gap-6 md:grid-cols-2"
          }
        >
          {run.items.map((s, i) => (
            <Shot
              key={s.src}
              src={s.src}
              alt={s.alt}
              caption={s.caption}
              frame={s.aspect}
              className={!run.mobile && i === 0 && run.items.length % 2 ? "md:col-span-2" : ""}
              onZoom={() => zoomTo({ src: s.src, alt: s.alt, title: t(s.caption) })}
            />
          ))}
        </div>
      ))}
    </>
  )
}

function CaseStudy({
  p,
  view,
  onClose,
  onNext,
}: {
  p: Project | null
  view: View
  onClose: () => void
  onNext: () => void
}) {
  const t = useT()
  const ref = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const [zoomImage, setZoomImage] = useState<Zoom | null>(null)
  // Layout effect: the title must sit at the top before the transition measures it
  useLayoutEffect(() => {
    ref.current?.scrollTo(0, 0)
  }, [p])
  useEffect(() => {
    if (!p) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [p])
  const shown = view === "shown"
  useEffect(() => {
    // Keyboard users land in the page instead of on the list behind it
    if (shown) closeBtn.current?.focus({ preventScroll: true })
  }, [shown])
  // Everything but the title fades: the title is what travels to and from the list
  const fade = `transition-[opacity,translate] duration-500 ${
    shown ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-4"
  }`
  useEffect(() => {
    if (!p) return
    const k = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (zoomImage) setZoomImage(null)
      else onClose()
    }
    window.addEventListener("keydown", k)
    return () => window.removeEventListener("keydown", k)
  }, [p, onClose, zoomImage])

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={p?.title}
      aria-hidden={!p || view === "hidden"}
      className={`fixed inset-0 z-[80] overflow-y-auto bg-bg text-fg ${
        p && view !== "hidden" ? "visible" : "invisible"
      }`}
    >
        {p && (
          <>
            <div
              className={`sticky top-0 z-10 flex h-14 items-center justify-between border-b border-line bg-bg/85 backdrop-blur-md px-5 md:px-14 font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity duration-500 ${
                shown ? "opacity-100" : "opacity-0"
              }`}
            >
              <span>{p.title}</span>
              <button
                ref={closeBtn}
                onClick={onClose}
                className="flex items-center gap-2 hover:text-signal"
              >
                {t(b("Fermer", "Close"))}{" "}
                <span className="text-base leading-none">×</span>
              </button>
            </div>

            <div className="px-5 md:px-14 pt-12 pb-24">
              <h2
                data-case-title
                className="text-[clamp(3rem,10vw,9rem)] font-bold uppercase leading-[0.85] tracking-[-0.06em]"
              >
                <Words text={p.title} />
              </h2>

              <div className={fade}>
              <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="text-[clamp(1.4rem,2.4vw,2.2rem)] leading-tight tracking-[-0.02em]">
                    {t(p.summary)}
                  </p>
                  {p.link && (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 border border-fg/30 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-[var(--blue)] hover:bg-[var(--blue)] hover:text-bg"
                    >
                      {t(p.link.label)} <Arrow className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:col-span-5">
                  {(
                    [
                      [b("Rôle", "Role"), t(p.role)],
                      [b("Équipe", "Team"), t(p.team)],
                      [b("Durée", "Duration"), t(p.duration)],
                      [b("Outils", "Tools"), p.tools],
                    ] as [T, string][]
                  ).map(([k, v]) => (
                    <div key={k.fr}>
                      <dt className={caseLabel}>{t(k)}</dt>
                      <dd className="mt-1 text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Cover p={p} className="mt-12 aspect-[16/8] w-full" />

              <Step label={b("Le contexte", "Context")}>
                {p.context.map((c) => (
                  <p key={c.fr} className={caseText}>
                    {t(c)}
                  </p>
                ))}
              </Step>

              {(p.choices.length > 0 || p.colors || p.board) && (
                <Step label={b("Mes choix", "My choices")}>
                  {p.choices.map((c) => (
                    <p key={c.fr} className={caseText}>
                      {t(c)}
                    </p>
                  ))}
                  {(p.logo || p.colors || p.fonts) && (
                    <div className="grid gap-6 md:grid-cols-[1fr_1.2fr_1fr]">
                      {p.logo && (
                        <div className="aspect-[4/5] overflow-hidden bg-fg/[0.04]">
                          <img
                            src={p.logo}
                            alt={`${p.title} — logo`}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      {p.colors && (
                        <ul className="grid min-h-48 grid-cols-2 grid-rows-[3fr_2fr] gap-3 font-mono text-[11px] uppercase tracking-[0.12em]">
                          {p.colors.map(([name, hex], i) => (
                            <li
                              key={hex}
                              className={`flex flex-col justify-end gap-1 border border-line p-3 ${
                                i === 0 ? "col-span-2" : ""
                              }`}
                              style={{ background: hex, color: ink(hex) }}
                            >
                              <span>{name}</span>
                              <span>{hex}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {p.fonts && (
                        <ul className="flex flex-col justify-between border-t border-line">
                          {p.fonts.map((f) => (
                            <li
                              key={f}
                              className="flex items-baseline justify-between gap-4 border-b border-line py-4"
                            >
                              <span className="text-5xl font-semibold leading-none tracking-tight md:text-6xl">
                                Aa
                              </span>
                              <span className={`${caseLabel} text-right`}>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {p.credit && <p className={caseLabel}>{t(p.credit)}</p>}
                  {p.board && (
                    <Shot
                      src={p.board.src}
                      alt={p.board.alt}
                      caption={p.board.caption}
                      onZoom={() =>
                        setZoomImage({
                          src: p.board!.src,
                          alt: p.board!.alt,
                          title: `${p.title} — ${t(p.board!.caption)}`,
                        })
                      }
                    />
                  )}
                </Step>
              )}

              <Step label={b("Le résultat", "The result")}>
                {p.screens && <ScreenRuns screens={p.screens} zoomTo={setZoomImage} />}
                {p.templates && (
                  <Templates key={p.slug} templates={p.templates} zoomTo={setZoomImage} />
                )}
                <p className={`border-t border-line pt-6 ${caseText}`}>{t(p.result)}</p>
              </Step>

              <button
                onClick={onNext}
                className="group mt-24 w-full border-t border-line pt-6 flex items-end justify-between text-left"
              >
                <span className={caseLabel}>
                  {t(b("Projet suivant", "Next project"))}
                </span>
                <span className="text-4xl md:text-7xl font-bold uppercase tracking-[-0.05em] group-hover:text-signal transition-colors">
                  {projects[(projects.indexOf(p) + 1) % projects.length].title}{" "}
                  →
                </span>
              </button>
              </div>
            </div>
          </>
        )}
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomImage.title || zoomImage.alt}
          className="fixed inset-0 z-[100] flex flex-col bg-carbon/95 text-paper backdrop-blur-md p-4 md:p-8"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="flex items-center justify-between pb-4 border-b border-paper/20 font-mono text-[11px] uppercase tracking-[0.12em]"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-paper/70 truncate max-w-[70vw]">
              {zoomImage.title || zoomImage.alt}
            </span>
            <button
              autoFocus
              onClick={() => setZoomImage(null)}
              className="flex items-center gap-2 hover:text-signal transition-colors px-3 py-1 border border-paper/30"
            >
              {t(b("Fermer [Échap]", "Close [Esc]"))}{" "}
              <span className="text-base leading-none">×</span>
            </button>
          </div>
          <div
            className="flex-1 flex items-center justify-center p-2 md:p-6 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ZoomedImage key={zoomImage.src} src={zoomImage.src} alt={zoomImage.alt} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- About ---------- */

const photos = [
  {
    src: "/about/food-table.jpg",
    alt: b("Table de restaurant", "Restaurant table"),
  },
  {
    src: "/about/paris-eiffel.jpg",
    alt: b("Paris vu du ciel", "Paris from above"),
  },
  { src: "/about/sunset-road.jpg", alt: b("Coucher de soleil", "Sunset") },
  {
    src: "/about/pool-architecture.jpg",
    alt: b("Piscine et arches", "Pool and arches"),
  },
  {
    src: "/about/donburi-karaage.jpg",
    alt: b("Donburi karaage", "Karaage donburi"),
  },
  {
    src: "/about/dessert-gastronomique.jpg",
    alt: b("Dessert gastronomique", "Gastronomic dessert"),
  },
  {
    src: "/about/medaille-finisher.jpg",
    alt: b("Médaille finisher", "Finisher medal"),
  },
  {
    src: "/about/running-quais-seine.jpg",
    alt: b("Running quais de Seine", "Running along the Seine"),
  },
]

function SectionHead({ title }: { title: string }) {
  return (
    <div className="border-b border-line pb-8">
      <h2 className="text-[clamp(3.5rem,11vw,10rem)] font-bold uppercase leading-[0.82] tracking-[-0.06em]">
        <SplitLine>
          <HoverName text={title} />
        </SplitLine>
      </h2>
    </div>
  )
}

// Logo paths from Simple Icons (CC0), 24x24 viewBox
const tools: { name: string; color: string; logo: string; desc: T }[] = [
  {
    name: "Figma",
    color: "text-signal",
    logo: "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z",
    desc: b(
      "Je conçois la structure, j'organise les éléments et je teste les parcours.",
      "I design the structure, organise the elements and test the user flows.",
    ),
  },
  {
    name: "Notion",
    color: "text-klein dark:text-azur",
    logo: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z",
    desc: b(
      "Je centralise toutes les données, les notes et le suivi des projets.",
      "I centralise all data, notes and project tracking.",
    ),
  },
  {
    name: "DaVinci Resolve",
    color: "text-signal",
    logo: "M17.621 0 5.977.004c-1.37 0-2.756.345-3.762 1.11a4.925 4.925 0 0 0-1.61 2.003C.233 3.93 0 5.02 0 5.951l.012 12.2c.002 1.604.479 3.057 1.461 4.112.984 1.056 2.462 1.683 4.331 1.691L16.856 24c1.26.005 3.095-.036 4.303-.714 1.075-.605 2.025-1.556 2.497-2.984.278-.84.345-2.084.344-3.147l-.021-11.13c-.002-.888-.15-2.023-.547-2.934-.425-.976-1.181-1.815-2.322-2.425C20.353.26 19.123 0 17.622 0zm0 .93c1.378 0 2.538.295 3.04.565.977.523 1.544 1.166 1.889 1.96.315.721.47 1.793.473 2.572l.018 11.13c.002 1.013-.097 2.257-.298 2.86-.396 1.202-1.146 1.946-2.063 2.462-.814.457-2.612.593-3.82.588l-11.05-.044c-1.657-.007-2.832-.534-3.626-1.386-.792-.851-1.212-2.06-1.212-3.485L.999 5.95c0-.829.196-1.827.474-2.437.345-.757.75-1.207 1.365-1.674C3.585 1.27 4.868.97 6.08.97zm-5.66 3.423c-1.976.089-3.204 1.658-3.214 3.29.019 1.443 1.635 3.481 2.884 4.53.12.099.154.109.33.18.062.025.198-.047.327-.135.36-.245.993-.947 1.648-1.738a7.67 7.67 0 0 0 1.031-1.683c.409-.89.261-1.599.235-1.888a3.983 3.983 0 0 0-.99-1.692 3.36 3.36 0 0 0-2.251-.864zm4.172 7.922a10.185 10.185 0 0 0-3.244.61c-.15.058-.26.1-.374.17-.057.036-.11.135-.105.292.017.433.29 1.278.624 2.27.384 1.135 1.066 2.27 1.844 2.74a3.23 3.23 0 0 0 2.53.342c.832-.243 1.595-.868 1.962-1.546.986-1.818.19-3.548-1.121-4.417-.447-.296-1.133-.445-1.89-.46-.074 0-.15-.002-.226-.001zm-8.432.038a6.201 6.201 0 0 0-.752.047c-.596.078-.932.273-1.29.51a3.177 3.177 0 0 0-1.365 1.979c-.075.552-.086 1.053.033 1.507.433 1.389 1.326 2.222 2.847 2.452.636.028 1.37-.063 1.99-.45 1.269-.782 2.08-3.17 2.412-4.742.053-.176.035-.357-.013-.42-.005-.067-.044-.113-.19-.183-.398-.192-1.32-.417-2.375-.6a7.68 7.68 0 0 0-1.297-.1z",
    desc: b(
      "Je traite les rushs et peaufine les montages pour les réseaux sociaux et les sites.",
      "I process raw footage and polish edits for social media and websites.",
    ),
  },
  {
    name: "CMS",
    color: "text-klein dark:text-azur",
    logo: "M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0",
    desc: b(
      "J'utilise des outils No-code pour créer des landing pages et des sites web.",
      "I use no-code tools to build landing pages and websites.",
    ),
  },
]

function Tools() {
  const t = useT()
  return (
    <section
      id="outils"
      className="px-5 md:px-14 pb-24 md:pb-36 scroll-mt-14"
    >
      <div className="border-b border-line pb-8">
        <h2 className="text-[clamp(3.5rem,11vw,10rem)] font-bold uppercase leading-[0.82] tracking-[-0.06em]">
          <SplitLine>
            <HoverName text={t(b("Outils", "Tools"))} />
          </SplitLine>
        </h2>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 border-l border-line">
        {tools.map((tool, i) => (
          <Reveal
            as="li"
            key={tool.name}
            delay={i * 80}
            className="group border-r border-b border-line"
          >
            <div className="flex h-full min-h-56 md:min-h-80 flex-col justify-between p-5 md:p-6 transition-colors duration-500 group-hover:bg-[var(--blue)] group-hover:text-bg">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                className={`h-8 w-8 md:h-10 md:w-10 self-end transition-colors duration-500 group-hover:text-bg ${tool.color}`}
              >
                <path d={tool.logo} />
              </svg>
              <div>
                <h3 className="text-2xl md:text-[clamp(1.5rem,2.4vw,2.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
                  {tool.name}
                </h3>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted group-hover:text-bg">
                  {t(tool.desc)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

// Vertical scroll drives a horizontal photo track; plain swipeable row with reduced motion
function Photos() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  const still = reduceMotion
  useScrollFrame(() => {
    const s = ref.current
    const tr = track.current
    if (still || !s || !tr) return
    const p = dist
      ? Math.min(1, Math.max(0, -s.getBoundingClientRect().top / dist))
      : 0
    tr.style.transform = `translate3d(${(-p * dist).toFixed(1)}px, 0, 0)`
    if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(3)})`
    const zoom = `scale(${(1.12 - p * 0.12).toFixed(3)})`
    tr.querySelectorAll("img").forEach((img) => (img.style.transform = zoom))
  })
  // re-apply transforms once the track width is known
  useEffect(runScrollSubs, [dist])
  useEffect(() => {
    const measure = () =>
      track.current &&
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])
  return (
    <section
      id="photographie"
      ref={ref}
      className="relative border-t border-line"
      style={still ? undefined : { height: `calc(100dvh + ${dist}px)` }}
    >
      <div
        className={
          still
            ? "overflow-x-auto py-24"
            : "sticky top-0 flex h-[100dvh] items-center overflow-hidden"
        }
      >
        <div
          ref={track}
          className="flex w-max items-center gap-6 md:gap-10 px-5 md:px-14"
        >
          <div className="shrink-0 pr-4 md:pr-10">
            <h2 className="whitespace-nowrap text-[clamp(3rem,8vw,8rem)] font-bold uppercase leading-[0.82] tracking-[-0.06em]">
              <SplitLine>
                <HoverName text={t(b("Photographie", "Photography"))} />
              </SplitLine>
            </h2>
            <Reveal
              delay={150}
              className="mt-6 max-w-[min(24rem,80vw)] text-lg leading-snug tracking-tight text-fg/70"
            >
              {t(
                b(
                  "Je passe mon temps à prendre des photos que ce soit préparé ou spontané.",
                  "I spend my time taking photos, whether planned or spontaneous.",
                ),
              )}
            </Reveal>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              iPhone 16 Pro Max · {t(b("Défile", "Scroll"))} →
            </p>
          </div>
          {photos.map((ph, i) => (
            <figure
              key={ph.src}
              className={`shrink-0 ${i % 2 ? "-mt-[10dvh]" : "mt-[10dvh]"}`}
            >
              <div className="overflow-hidden">
                <img
                  src={ph.src}
                  alt={t(ph.alt)}
                  loading="lazy"
                  className="aspect-[3/4] h-[52dvh] md:h-[60dvh] w-auto object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {t(ph.alt)}
              </figcaption>
            </figure>
          ))}
        </div>
        {!still && (
          <div className="absolute bottom-8 left-5 right-5 md:left-14 md:right-14 h-px bg-line">
            <div
              ref={bar}
              className="h-full origin-left bg-signal"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

function About() {
  const t = useT()
  const soft: [T, T][] = [
    [
      b("Empathique", "Empathetic"),
      b(
        "J'écoute toujours en me mettant à la place des autres, pour vraiment comprendre leurs besoins.",
        "I always listen by putting myself in other people's shoes, to truly understand their needs.",
      ),
    ],
    [
      b("Pointilleux", "Meticulous"),
      b(
        "Je fais attention aux détails, même au quotidien : j'aime quand tout est bien aligné.",
        "I pay attention to details, even in everyday life: I like it when everything lines up.",
      ),
    ],
    [
      b("Résilient", "Resilient"),
      b(
        "Face à un défi, je cherche toujours la solution, même si cela prend du temps.",
        "When facing a challenge, I always look for the solution, even if it takes time.",
      ),
    ],
    [
      b("Franc", "Straightforward"),
      b(
        "Je dis toujours ce que je pense, avec nuance, car je ne cherche jamais à blesser.",
        "I always say what I think, with nuance, because I never mean to hurt anyone.",
      ),
    ],
    [
      b("Discipliné", "Disciplined"),
      b(
        "Je garde un rythme de vie sain pour progresser un peu chaque jour.",
        "I keep a healthy routine to get a little better every day.",
      ),
    ],
    [
      b("Polyvalent", "Versatile"),
      b(
        "Je touche à tout pour découvrir là où j'excelle.",
        "I try my hand at everything to find out where I excel.",
      ),
    ],
  ]
  // Records from Strava best efforts, checked 2026-10-12; update by hand when beaten
  const passions: {
    name: T
    desc: T
    stats: [string, T][]
    link?: { href: string; label: string }
  }[] = [
    {
      name: b("Nourriture", "Food"),
      desc: b(
        "Toujours à l'affût de bonnes adresses. J'aime découvrir des cuisines d'ailleurs et goûter des spécialités que je ne connais pas. Me faire surprendre par ce qu'il y a dans l'assiette, c'est ce qui me plaît le plus. Dénicher ces endroits, c'est clairement l'une de mes activités préférées.",
        "Always on the lookout for good spots. I love discovering cuisines from elsewhere and tasting specialities I don't know yet. Being surprised by what's on the plate is what I enjoy most. Hunting down these places is easily one of my favourite things to do.",
      ),
      stats: [["150+", b("adresses testées", "places tried")]],
    },
    {
      name: b("Running", "Running"),
      desc: b(
        "Je suis tombé amoureux de ce sport : je me sens libre en courant à travers Paris, en explorant des coins où je n'aurais jamais pensé mettre les pieds. Ça me permet aussi de me défouler et de rester en bonne santé. Mon défi : courir le Marathon de Paris 2027 !",
        "I fell in love with this sport: I feel free running across Paris, exploring corners I never thought I'd set foot in. It also helps me let off steam and stay healthy. My challenge: running the 2027 Paris Marathon!",
      ),
      stats: [
        ["23:12", b("5 km", "5 km")],
        ["47:09", b("10 km", "10 km")],
        ["1:41:13", b("20 km", "20 km")],
        ["2:05:17", b("Semi-marathon", "Half marathon")],
        ["2027", b("Marathon · objectif", "Marathon · goal")],
      ],
      link: LINKS.strava ? { href: LINKS.strava, label: "Strava" } : undefined,
    },
  ]
  const languages: [T, string, T][] = [
    [b("Français", "French"), "C2", b("fluide", "fluent")],
    [b("Anglais", "English"), "B2", b("courant", "upper-intermediate")],
    [b("Chinois", "Chinese"), "B2", b("courant", "upper-intermediate")],
  ]
  const itemTitle =
    "col-span-12 md:col-span-5 text-[clamp(1.75rem,4vw,3.25rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]"
  const itemText = "text-base md:text-lg leading-relaxed text-fg/70 max-w-2xl"
  return (
    <div className="px-5 md:px-14">
      <section className="min-h-[100dvh] flex flex-col justify-center pt-28 pb-16">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <h1 className="text-[clamp(3.5rem,12vw,11rem)] font-bold uppercase leading-[0.82] tracking-[-0.06em]">
              <SplitLine>
                <HoverName text={t(b("Moi", "Me"))} />
              </SplitLine>
            </h1>
            <Reveal
              delay={150}
              className="mt-8 max-w-2xl text-xl md:text-2xl leading-snug tracking-tight"
            >
              {t(
                b(
                  "Étudiant en 3ᵉ année de Création Digitale & Design d'Interface à l'ESD Paris. Je teste et reteste mes maquettes jusqu'à ce qu'elles me plaisent, pour concevoir des sites aussi beaux que fonctionnels.",
                  "Third-year Digital Creation & Interface Design student at ESD Paris. I test and retest my mockups until I'm happy with them, to build websites that look good and work well.",
                ),
              )}
            </Reveal>
            <Reveal
              delay={250}
              className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs md:text-sm uppercase tracking-[0.12em] text-muted"
            >
              {languages.map(([name, level, word]) => (
                <span key={level + name.fr}>
                  {t(name)} {level} · {t(word)}
                </span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={200} className="md:col-span-4 md:order-first">
            <Portrait className="aspect-[4/5] w-full" />
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-3 font-mono text-xs md:text-sm uppercase tracking-[0.12em]">
          <span className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-75 motion-safe:animate-ping" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-signal" />
            </span>
            {t(
              b(
                "Disponible dès que possible · Paris",
                "Available ASAP · Paris",
              ),
            )}
          </span>
          <span className="text-muted">
            {t(b("Contrat d'apprentissage", "Apprenticeship contract"))}
          </span>
        </Reveal>
      </section>

      <section className="mt-28 md:mt-36">
        <SectionHead title="Soft skills" />
        <ul>
          {soft.map(([n, d], i) => (
            <Reveal
              as="li"
              key={n.fr}
              delay={i * 60}
              className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-line py-5 md:py-6"
            >
              <h3 className={itemTitle}>{t(n)}</h3>
              <p className={`col-span-12 md:col-span-7 ${itemText}`}>{t(d)}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-28 md:mt-36">
        <SectionHead title="Passions" />
        <ul>
          {passions.map((ps, i) => (
            <Reveal
              as="li"
              key={ps.name.fr}
              delay={i * 80}
              className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-b border-line py-6 md:py-8"
            >
              <h3 className={itemTitle}>{t(ps.name)}</h3>
              <div className="col-span-12 md:col-span-7">
                <p className={itemText}>{t(ps.desc)}</p>
                <dl className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
                  {ps.stats.map(([v, l]) => (
                    <div key={l.fr} className="flex flex-col-reverse">
                      <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                        {t(l)}
                      </dt>
                      <dd className="text-3xl md:text-4xl font-bold tracking-[-0.04em]">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
                {ps.link && (
                  <a
                    href={ps.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] hover:text-signal transition-colors"
                  >
                    {t(b("Voir sur", "See on"))} {ps.link.label}
                    <Arrow className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  )
}

/* ---------- Project transition ---------- */

type View = "hidden" | "shown" | "leaving"
type Box = Record<string, string>

const FLY_MS = 700
const FLY_EASE = "cubic-bezier(.7,0,.2,1)"
const FULL: Box = { left: "0px", top: "0px", width: "100vw", height: "100vh" }
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const rectBox = (r: DOMRect): Box => ({
  left: `${r.left}px`,
  top: `${r.top}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
})
// One box per word: a long title wraps differently in the list and on the page, so each word travels on its own
const wordBoxes = (el: Element | null): Box[] =>
  [...(el?.querySelectorAll("[data-w]") ?? [])].map((w) => {
    const r = w.getBoundingClientRect()
    const c = getComputedStyle(w)
    return {
      left: `${r.left}px`,
      top: `${r.top}px`,
      fontSize: c.fontSize,
      letterSpacing: c.letterSpacing,
    }
  })

// Title split into words so the project transition can move each one
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span data-w>{w}</span>
        </Fragment>
      ))}
    </>
  )
}

// A page-coloured band and the title words, drawn above everything and moved between the list row and the page title
function flight(words: string[], band: Box, at: Box[]) {
  const layer = document.createElement("div")
  layer.setAttribute("aria-hidden", "true")
  const bandEl = document.createElement("div")
  bandEl.className = "fixed z-[95] bg-bg"
  Object.assign(bandEl.style, band)
  const wordEls = words.map((w, i) => {
    const el = document.createElement("span")
    el.className =
      "pointer-events-none fixed z-[96] whitespace-nowrap font-bold uppercase leading-normal text-fg"
    el.textContent = w
    Object.assign(el.style, at[i])
    return el
  })
  layer.append(bandEl, ...wordEls)
  document.body.append(layer)
  return {
    move(toBand: Box, toWords: Box[]) {
      void layer.offsetWidth // start from the placed positions, not from nowhere
      const tr = (props: string[]) =>
        props.map((p) => `${p} ${FLY_MS}ms ${FLY_EASE}`).join(", ")
      bandEl.style.transition = tr(["left", "top", "width", "height"])
      Object.assign(bandEl.style, toBand)
      wordEls.forEach((el, i) => {
        el.style.transition = tr(["left", "top", "font-size", "letter-spacing"])
        Object.assign(el.style, toWords[i])
      })
      return sleep(FLY_MS + 20)
    },
    remove: () => layer.remove(),
  }
}

const projectFromHash = () =>
  projects.find((p) => location.hash === `#projet/${p.slug}`) ?? null
const onScreen = (el: Element) => {
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.top < window.innerHeight
}

// The open project page, its #projet/<slug> address, and the transitions between list and page
function useProjectView() {
  const [active, setActive] = useState(projectFromHash)
  const [view, setView] = useState<View>(() =>
    projectFromHash() ? "shown" : "hidden",
  )
  const current = useRef(active)
  const busy = useRef(false)
  useLayoutEffect(() => {
    current.current = active
  })

  const show = (p: Project | null) => {
    setActive(p)
    setView(p ? "shown" : "hidden")
  }
  const open = async (p: Project, row?: HTMLElement) => {
    if (busy.current) return
    history.pushState({ project: p.slug }, "", `#projet/${p.slug}`)
    const from = row?.querySelector("h3")
    if (!row || !from || reduceMotion) return show(p)
    busy.current = true
    const fly = flight(
      p.title.split(" "),
      rectBox(row.getBoundingClientRect()),
      wordBoxes(from),
    )
    // The page is laid out but invisible, so its title can be measured as the landing spot
    flushSync(() => {
      setActive(p)
      setView("hidden")
    })
    await fly.move(FULL, wordBoxes(document.querySelector("[data-case-title]")))
    flushSync(() => setView("shown"))
    fly.remove()
    busy.current = false
  }
  // shortcut: a back press during the 0.7 s flight is ignored and the page stays open; queue it if that ever matters
  const close = async () => {
    const p = current.current
    if (!p || busy.current) return
    const row = document.querySelector<HTMLElement>(`[data-project="${p.slug}"]`)
    if (!row || !onScreen(row) || reduceMotion) {
      show(null)
      row?.focus({ preventScroll: true })
      return
    }
    busy.current = true
    setView("leaving")
    await sleep(300)
    const fly = flight(
      p.title.split(" "),
      FULL,
      wordBoxes(document.querySelector("[data-case-title]")),
    )
    flushSync(() => setView("hidden"))
    await fly.move(rectBox(row.getBoundingClientRect()), wordBoxes(row.querySelector("h3")))
    flushSync(() => setActive(null))
    fly.remove()
    row.focus({ preventScroll: true })
    busy.current = false
  }
  const next = async () => {
    const p = current.current
    if (!p || busy.current) return
    const n = projects[(projects.indexOf(p) + 1) % projects.length]
    busy.current = true
    history.replaceState({ project: n.slug }, "", `#projet/${n.slug}`)
    setView("leaving")
    await sleep(300)
    show(n)
    busy.current = false
  }
  // Our close button goes back in history when we added the entry, so it and the browser's back button agree
  const dismiss = () => {
    if (history.state?.project) history.back()
    else {
      history.replaceState(null, "", location.pathname + location.search)
      close()
    }
  }
  const reset = () => {
    if (!current.current) return
    history.replaceState(null, "", location.pathname + location.search)
    show(null)
  }
  useEffect(() => {
    // Only refs and state setters are used, so the first render's handlers stay valid
    const onPop = () => {
      const p = projectFromHash()
      if (!p) close()
      else if (p.slug !== current.current?.slug) show(p)
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])
  return { active, view, open, next, dismiss, reset }
}

/* ---------- App ---------- */

/* Cursor turns blue when the background under it is orange (CSS can't read what's underneath) */
function useAdaptiveCursor() {
  useEffect(() => {
    let x = -1
    let y = -1
    let raf = 0
    const check = () => {
      raf = 0
      if (x < 0) return
      let alt = false
      // Read what is under the pointer now: scroll, curtains and hover transitions change it without a pointermove
      for (let el = document.elementFromPoint(x, y); el; el = el.parentElement) {
        const bg = getComputedStyle(el).backgroundColor
        const n = bg.match(/[\d.]+/g)?.map(Number)
        if (!n || (n[3] ?? 1) < 0.5) continue
        const k = bg.startsWith("color(") ? 255 : 1
        alt = Math.hypot(n[0] * k - 255, n[1] * k - 111, n[2] * k - 15) < 60
        break
      }
      document.documentElement.classList.toggle("cursor-alt", alt)
    }
    const schedule = () => {
      raf ||= requestAnimationFrame(check)
    }
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      schedule()
    }
    const events = ["scroll", "transitionend", "animationend"] as const
    addEventListener("pointermove", move, { passive: true })
    events.forEach((e) => addEventListener(e, schedule, { passive: true, capture: true }))
    return () => {
      removeEventListener("pointermove", move)
      events.forEach((e) => removeEventListener(e, schedule, { capture: true }))
      cancelAnimationFrame(raf)
    }
  }, [])
}

type Phase = "idle" | "closing" | "opening"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [phase, setPhase] = useState<Phase>("opening")
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState<Lang>("fr")
  const project = useProjectView()
  useAdaptiveCursor()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  // body background follows the theme too
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])
  useEffect(() => {
    const t = setTimeout(() => setPhase("idle"), 1100)
    return () => clearTimeout(t)
  }, [])

  const go: Go = (p, hash) => {
    project.reset()
    const scroll = () =>
      hash &&
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" })
    if (p === page)
      return hash ? scroll() : window.scrollTo({ top: 0, behavior: "smooth" })
    if (phase !== "idle") return
    setPhase("closing")
    setTimeout(() => {
      setPage(p)
      window.scrollTo(0, 0)
      setPhase("opening")
      setTimeout(scroll, 50)
      setTimeout(() => setPhase("idle"), 1100)
    }, 750)
  }

  return (
    <LangCtx.Provider value={lang}>
      <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-500">
        <Nav
          page={page}
          go={go}
          dark={dark}
          setDark={setDark}
          lang={lang}
          setLang={setLang}
        />
        <main key={page}>
          {page === "home" ? (
            <>
              <Hero go={go} />
              <Projects open={project.open} />
              <Tools />
              <Photos />
            </>
          ) : (
            <About />
          )}
        </main>
        <Footer go={go} />
        <CaseStudy
          p={project.active}
          view={project.view}
          onClose={project.dismiss}
          onNext={project.next}
        />

        <div aria-hidden className={`curtains ${phase}`}>
          <div className="curtain bg-signal" />
          <div className="curtain bg-klein" />
          <div className="curtain bg-bg grid place-items-center">
            <Logo className="w-24 text-fg curtain-logo" />
          </div>
        </div>
      </div>
    </LangCtx.Provider>
  )
}
