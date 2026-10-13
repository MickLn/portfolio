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
import projectsShot from "./assets/projects-shot.png"

/* ---------- Utilities ---------- */

type Rect = [number, number, number, number] // x, y, w, h in % of the source image

// Displays a region of a larger image, always covering its container.
function Crop({
  src,
  rect,
  ratio,
  alt = "",
  className = "",
}: {
  src: string
  rect: Rect
  ratio: number
  alt?: string
  className?: string
}) {
  const [x, y, w, h] = rect
  return (
    <div
      className={`relative overflow-hidden [container-type:size] ${className}`}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          width: `max(100cqw, calc(100cqh * ${ratio}))`,
          aspectRatio: ratio,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="absolute max-w-none"
          style={{
            width: `${10000 / w}%`,
            height: `${10000 / h}%`,
            left: `${(-x * 100) / w}%`,
            top: `${(-y * 100) / h}%`,
          }}
        />
      </div>
    </div>
  )
}

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

// Image with graceful fallback when the file isn't in /public yet
function Img({
  src,
  alt,
  className = "",
  fallback,
}: {
  src: string
  alt: string
  className?: string
  fallback?: ReactNode
}) {
  const [err, setErr] = useState(false)
  if (err && fallback) return <>{fallback}</>
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErr(true)}
      className={className}
    />
  )
}

/* ---------- Data ---------- */

type Page = "home" | "about"
type Cat = "all" | "branding" | "web" | "nocode"
const catLabel: Record<Cat, T> = {
  all: b("Tous", "All"),
  branding: b("Branding", "Branding"),
  web: b("Webdesign", "Webdesign"),
  nocode: b("No-code", "No-code"),
}

const CARD_Y = 27.95
const CARD_H = 52.85
const cardRect = (x: number): Rect => [x, CARD_Y, 22.05, CARD_H]

type ProjectTemplateItem = {
  src: string
  alt: string
  title: T
  desc?: T
  span?: string
}

type ProjectTemplate = {
  id: string
  title: string
  subtitle: T
  banner: string
  items: ProjectTemplateItem[]
}

type ProjectScreen = {
  src: string
  alt: string
  title: T
  desc?: T
  aspect?: "mobile" | "desktop"
}

type ProjectBoard = {
  src: string
  alt: string
  title: T
  subtitle?: T
  desc?: T
  badge?: string
}

type Project = {
  slug: string
  id: string
  title: string
  cat: Exclude<Cat, "all">
  tags: T
  year: string
  bg: string
  rect: Rect
  coverExt: string
  coverSrc?: string
  coverFit?: "cover" | "contain"
  span: string
  aspect: string
  speed: number
  light?: boolean
  role: T
  context: T
  problem: T
  solution: T
  palette: string[]
  fonts: string[]
  takeaways: T[]
  templates?: ProjectTemplate[]
  board?: ProjectBoard
  screens?: ProjectScreen[]
}

const projects: Project[] = [
  {
    slug: "pansies",
    coverSrc: "/projects/pansies/screen-home.png",
    id: "01",
    title: "Pansies",
    cat: "branding",
    year: "2025",
    bg: "#5B2366",
    rect: cardRect(3.65),
    coverExt: "png",
    tags: b("IA vocale · Identité · UX/UI", "Voice AI · Identity · UX/UI"),
    span: "md:col-span-7 md:row-span-2",
    aspect: "aspect-[4/5] md:aspect-auto md:h-full",
    speed: -0.04,
    role: b(
      "UX/UI Designer — identité, parcours & maquettes",
      "UX/UI Designer — identity, flows & mockups",
    ),
    context: b(
      "Pansies est un assistant vocal basé sur l'IA. Il fallait créer une identité chaleureuse et une interface qui rende la voix aussi lisible qu'un écran.",
      "Pansies is an AI voice assistant. The goal was a warm identity and an interface that makes voice as readable as a screen.",
    ),
    problem: b(
      "Les assistants vocaux paraissent froids et opaques : l'utilisateur ne sait pas ce que l'IA a compris.",
      "Voice assistants feel cold and opaque: users never know what the AI understood.",
    ),
    solution: b(
      "Une pensée comme symbole de confiance, une transcription en temps réel et des états visuels clairs (écoute, réflexion, réponse).",
      "A pansy as a symbol of trust, live transcription and clear visual states (listening, thinking, answering).",
    ),
    palette: ["#5B2366", "#B84FD1", "#E2B13C", "#FBF6EA"],
    fonts: ["Montserrat", "Inter"],
    takeaways: [
      b(
        "Concevoir des états d'interface pour un produit sans écran.",
        "Designing interface states for a screenless product.",
      ),
      b(
        "Une identité forte simplifie l'onboarding.",
        "A strong identity simplifies onboarding.",
      ),
    ],
    board: {
      src: "/projects/pansies/figma-board.png",
      alt: "Pansies — Architecture & Flux Figma",
      title: b(
        "Architecture globale & Parcours utilisateur",
        "Global architecture & User flow",
      ),
      subtitle: b(
        "Écosystème Figma · 11 écrans conçus",
        "Figma ecosystem · 11 screens designed",
      ),
      desc: b(
        "Vue d'ensemble de l'application : onboarding, connexion, configuration des préférences, mémos vocaux, modes clair/sombre et lecteur interactif.",
        "Application overview: onboarding, sign-in, preferences setup, voice memos, light/dark modes and interactive audio player.",
      ),
    },
    screens: [
      {
        src: "/projects/pansies/screen-home.png",
        alt: "Pansies — Écran d'accueil & Connexion",
        title: b("01 / Accueil & Connexion", "01 / Welcome & Sign-in"),
        desc: b(
          "Un univers rassurant centré sur l'emblème floral et la promesse : « Pour éviter toute fuite de pensées ».",
          "A reassuring space centered on the floral emblem and brand promise: « To prevent any thought leaks ».",
        ),
      },
      {
        src: "/projects/pansies/screen-list.jpg",
        alt: "Pansies — Liste des mémos vocaux",
        title: b("02 / Liste des mémos vocaux", "02 / Voice memos list"),
        desc: b(
          "Hiérarchie claire, recherche textuelle rapide, bascule de vues et accès instantané à la réécoute.",
          "Clear hierarchy, quick text search, view toggles and immediate playback access.",
        ),
      },
      {
        src: "/projects/pansies/screen-player.jpg",
        alt: "Pansies — Lecteur audio & Transcription",
        title: b(
          "03 / Lecteur & Transcription IA",
          "03 / Player & AI transcription",
        ),
        desc: b(
          "Visualisation dynamique de l'enregistrement, bouton de transcription instantanée et organisation par catégories (Idées, Projets).",
          "Dynamic audio playback visualization, one-tap AI transcription and category organization (Ideas, Projects).",
        ),
      },
    ],
  },
  {
    slug: "popfig",
    coverSrc: "/projects/popfig/screen-catalog.png",
    id: "02",
    title: "Pop Fig",
    cat: "branding",
    year: "2025",
    bg: "#FFBDB2",
    rect: cardRect(27.2),
    coverExt: "png",
    coverFit: "contain",
    light: true,
    tags: b("E-commerce · Figurines", "E-commerce · Figurines"),
    span: "md:col-span-5 md:mt-28",
    aspect: "aspect-[4/3]",
    speed: 0.06,
    role: b(
      "Designer — identité, e-commerce & prototype Figma",
      "Designer — identity, e-commerce & Figma prototype",
    ),
    context: b(
      "Pop Fig est une boutique en ligne de figurines de collection, pensée pour les passionnés comme pour les curieux.",
      "Pop Fig is an online store for collectible figurines, built for collectors and newcomers alike.",
    ),
    problem: b(
      "Des catalogues saturés où il est difficile de trouver une pièce et de lui faire confiance.",
      "Cluttered catalogues where finding and trusting a piece is hard.",
    ),
    solution: b(
      "Un logo-mannequin ludique, des fiches produit centrées sur l'objet et un parcours d'achat en trois étapes.",
      "A playful mannequin logo, object-first product pages and a three-step checkout.",
    ),
    palette: ["#FFBDB2", "#111111", "#FFFFFF", "#FF6F0F"],
    fonts: ["Outfit", "Geist Mono"],
    takeaways: [
      b(
        "Le ton d'une marque se joue jusque dans les micro-interactions.",
        "Brand tone lives in micro-interactions.",
      ),
      b("Tester tôt le tunnel de commande.", "Test the checkout early."),
    ],
    board: {
      src: "/projects/popfig/figma-board.jpg",
      alt: "Pop Fig — Board Figma & Système graphique",
      title: b(
        "Système visuel & Collections de figurines",
        "Visual System & Figurine Collections",
      ),
      subtitle: b(
        "Écosystème Figma · Univers Bearbrick, KAWS, Labubu & Pop Mart",
        "Figma ecosystem · Bearbrick, KAWS, Labubu & Pop Mart world",
      ),
      desc: b(
        "Direction artistique contrastée sur fond pêche poudré : palette pastel, typographie de caractère, moodboard de figurines d'art et composants e-commerce réutilisables.",
        "Contrasting art direction on a soft peach background: pastel palette, bold typography, art toy moodboard, and reusable e-commerce UI components.",
      ),
      badge: "Figma Design System",
    },
    screens: [
      {
        src: "/projects/popfig/screen-catalog.png",
        alt: "Pop Fig — Catalogue & Nouveautés",
        aspect: "desktop",
        title: b("01 / Catalogue & Nouveautés", "01 / Catalog & New arrivals"),
        desc: b(
          "Grille épurée valorisant les pièces de collection (Skullpanda, Dimoo, KAWS, Bearbrick) avec micro-interactions au survol et call-to-actions doux.",
          "Clean grid spotlighting collectible figures (Skullpanda, Dimoo, KAWS, Bearbrick) with interactive hover states and soft CTAs.",
        ),
      },
      {
        src: "/projects/popfig/screen-product.jpg",
        alt: "Pop Fig — Fiche produit BE@RBRICK Arcane Jinx",
        aspect: "desktop",
        title: b(
          "02 / Fiche produit & Spécifications",
          "02 / Product page & Specs",
        ),
        desc: b(
          "Présentation immersive avec galerie multi-vues, détails techniques (taille 70cm, ABS), repères de rareté et bouton d'ajout au panier direct.",
          "Immersive showcase with multi-angle gallery, technical specs (70cm height, ABS), rarity tags, and one-click add to cart.",
        ),
      },
      {
        src: "/projects/popfig/screen-cart.png",
        alt: "Pop Fig — Panier & Tunnel d'achat",
        aspect: "desktop",
        title: b("03 / Panier & Tunnel d'achat", "03 / Cart & Checkout flow"),
        desc: b(
          "Tunnel épuré sur fond rose poudré avec récapitulatif détaillé des pièces, application instantanée de code promo et calcul transparent du total.",
          "Refined checkout flow on powdered blush background featuring clear item breakdown, instant promo coupon field, and transparent totals.",
        ),
      },
    ],
  },
  {
    slug: "sushilin",
    coverSrc: "/projects/sushilin/screen-hero.png",
    id: "03",
    title: "Sushi Lin",
    cat: "web",
    year: "2024",
    bg: "#1B2457",
    rect: cardRect(50.75),
    coverExt: "png",
    coverFit: "contain",
    tags: b("Refonte · Site restaurant", "Redesign · Restaurant website"),
    span: "md:col-span-5 md:col-start-8 md:-mt-10",
    aspect: "aspect-square",
    speed: -0.02,
    role: b(
      "Webdesigner — refonte, mobile-first & menu digital",
      "Webdesigner — redesign, mobile-first & digital menu",
    ),
    context: b(
      "Refonte du site d'un restaurant japonais : la majorité des visites viennent du mobile, juste avant de réserver.",
      "Redesign of a Japanese restaurant's website: most visits come from mobile, right before booking.",
    ),
    problem: b(
      "Un ancien site lent, un menu en PDF illisible sur téléphone et aucune réservation en ligne.",
      "A slow old site, a PDF menu unreadable on phones and no online booking.",
    ),
    solution: b(
      "Un menu digital filtrable, un bouton de réservation toujours visible et une identité élégante bleu nuit / rose.",
      "A filterable digital menu, an always-visible booking button and an elegant navy / pink identity.",
    ),
    palette: ["#1B2457", "#E2457A", "#FFFFFF", "#0E1330"],
    fonts: ["Playfair Display", "Urbanist"],
    takeaways: [
      b(
        "Le mobile-first change la hiérarchie du contenu.",
        "Mobile-first changes content hierarchy.",
      ),
      b(
        "Un menu lisible vaut mieux que de belles photos.",
        "A readable menu beats beautiful photos.",
      ),
    ],
    board: {
      src: "/projects/sushilin/screen-hero.png",
      alt: "Sushi Lin — Direction artistique & Accueil",
      title: b(
        "Direction artistique & Accueil immersif",
        "Art Direction & Immersive Landing",
      ),
      subtitle: b(
        "Refonte Web & Mobile · Restaurant japonais aux Clayes-sous-Bois",
        "Web & Mobile redesign · Japanese restaurant in Les Clayes-sous-Bois",
      ),
      desc: b(
        "Hero header photographique en clair-obscur, typographie japonaise verticale « 絶品お料理 » et call-to-actions prioritaires vers la commande à emporter et la réservation.",
        "Moody photographic hero header, vertical Japanese typography « 絶品お料理 », and high-priority CTAs for take-away ordering and table reservations.",
      ),
      badge: "Web & Mobile Ecosystem",
    },
    screens: [
      {
        src: "/projects/sushilin/mobile-catalog.png",
        alt: "Sushi Lin — Menu digital mobile & Réductions",
        aspect: "mobile",
        title: b(
          "01 / Menu mobile-first & Remise à emporter",
          "01 / Mobile-first menu & Take-away discount",
        ),
        desc: b(
          "Navigation tactile par catégories horizontales, mise en avant du bandeau -10% immédiat et cartes plats détaillant portions et allergènes.",
          "Touch navigation with horizontal category tabs, -10% discount banner, and dish cards specifying portion sizes and allergens.",
        ),
      },
      {
        src: "/projects/sushilin/mobile-cart-crossell.png",
        alt: "Sushi Lin — Panier mobile & Suggestions gourmandes",
        aspect: "mobile",
        title: b(
          "02 / Panier interactif & Ventes croisées",
          "02 / Interactive cart & Cross-selling",
        ),
        desc: b(
          "Tiroir panier rétractable avec carrousel de compléments (boissons, gyozas), calcul en temps réel de la remise -10% et bouton de validation immédiat.",
          "Sliding cart drawer with cross-sell suggestions (drinks, gyozas), real-time 10% discount calculation, and prominent checkout CTA.",
        ),
      },
      {
        src: "/projects/sushilin/email-confirmation.png",
        alt: "Sushi Lin — Reçu & Confirmation de commande",
        aspect: "mobile",
        title: b(
          "03 / Reçu de commande & Suivi de retrait",
          "03 / Order receipt & Pickup confirmation",
        ),
        desc: b(
          "Ticket clair et rassurant : numéro d'ordre, heure précise de retrait, ventilation des plats, options de sauces choisies et coordonnées du restaurant.",
          "Clean order ticket: order ID, exact pickup time slot, line items breakdown, sauce choices, and restaurant contact details.",
        ),
      },
      {
        src: "/projects/sushilin/screen-menu.png",
        alt: "Sushi Lin — Carte desktop & Filtrage rapide",
        aspect: "desktop",
        title: b(
          "04 / Carte desktop & Navigation par catégories",
          "04 / Desktop menu & Category filtering",
        ),
        desc: b(
          "Sidebar latérale organisant 235 références en catégories clés (Entrées, Menus, Sushis, Makis...) avec recherche rapide et ajouts instantanés.",
          "Sidebar indexing 235 menu items into key categories (Starters, Menus, Sushi, Rolls...) with fast category switching and quick adds.",
        ),
      },
      {
        src: "/projects/sushilin/screen-reservation.png",
        alt: "Sushi Lin — Réservation de table en ligne",
        aspect: "desktop",
        title: b(
          "05 / Réservation de table en direct",
          "05 / Direct online table booking",
        ),
        desc: b(
          "Formulaire épuré réduisant l'abandon : choix de la date, créneau midi/soir, nombre de couverts et demandes particulières en un écran.",
          "Frictionless booking form: date picker, lunch/dinner slot selector, party size, and dietary notes in a clean single step.",
        ),
      },
      {
        src: "/projects/sushilin/screen-location.png",
        alt: "Sushi Lin — Horaires, Accès & Contact",
        aspect: "desktop",
        title: b(
          "06 / Horaires, Accès & Informations pratiques",
          "06 / Hours, Directions & Practical info",
        ),
        desc: b(
          "Triptyque d'informations essentielles (ouverture 7j/7, commandes téléphoniques, adresse) accompagné d'une carte interactive Google Maps.",
          "Three-pillar practical block (open 7 days a week, phone orders, street address) paired with interactive Google Maps integration.",
        ),
      },
    ],
  },
  {
    slug: "notion",
    coverSrc: "/projects/notion/assiette-banner.jpg",
    id: "04",
    title: "Notion Workspaces",
    cat: "nocode",
    year: "2024",
    bg: "#FFFFFF",
    rect: cardRect(74.35),
    coverExt: "svg",
    light: true,
    tags: b("Systèmes · Templates", "Systems · Templates"),
    span: "md:col-span-6 md:col-start-4 md:mt-16",
    aspect: "aspect-[16/10]",
    speed: 0.05,
    role: b(
      "Concepteur no-code — architecture & templates",
      "No-code builder — architecture & templates",
    ),
    context: b(
      "Une série d’espaces Notion pour organiser études, projets et vie perso, publiés sur mon profil Notion.",
      "A series of Notion workspaces to organise studies, projects and personal life, published on my Notion profile.",
    ),
    problem: b(
      "Des espaces vite désordonnés, des informations dupliquées et des pages impossibles à maintenir.",
      "Workspaces that get messy fast, duplicated data and pages impossible to maintain.",
    ),
    solution: b(
      "Des bases de données relationnelles, des formules et des vues filtrées pour un système modulaire et durable.",
      "Relational databases, formulas and filtered views for a modular, lasting system.",
    ),
    palette: ["#FFFFFF", "#191919", "#787774", "#F1F1EF"],
    fonts: ["Inter", "Geist Mono"],
    takeaways: [
      b(
        "Le no-code est d'abord de l'architecture d'information.",
        "No-code is information architecture first.",
      ),
      b(
        "Documenter un template, c’est le rendre utilisable.",
        "Documenting a template makes it usable.",
      ),
    ],
    templates: [
      {
        id: "assiette",
        title: "Mon Assiette",
        subtitle: b(
          "Suivi de poids & architecture de l'assiette",
          "Weight tracking & plate architecture",
        ),
        banner: "/projects/notion/assiette-banner.jpg",
        items: [
          {
            src: "/projects/notion/assiette-journal.png",
            alt: "Journal de bord",
            title: b("Journal de bord quotidien", "Daily food journal"),
            desc: b(
              "Suivi granulaire par repas (petit-déjeuner, déjeuner, collation, dîner) avec calcul automatique des calories, protéines, glucides, lipides et fibres.",
              "Granular meal tracking (breakfast, lunch, snack, dinner) with automated calculation of calories, protein, carbs, fat and fiber.",
            ),
            span: "md:col-span-12",
          },
          {
            src: "/projects/notion/assiette-quotas.png",
            alt: "Quotas nutritionnels",
            title: b("Quotas & validation", "Quotas & validation"),
            desc: b(
              "Jauge de progression quotidienne et validation automatique des cibles en kcal et macronutriments.",
              "Daily progress bar and automatic validation of kcal and macronutrient targets.",
            ),
            span: "md:col-span-6",
          },
          {
            src: "/projects/notion/assiette-evolution.png",
            alt: "Évolution du poids",
            title: b("Évolution & dynamique", "Evolution & momentum"),
            desc: b(
              "Analyse comparative quotidienne et globale pour identifier la dynamique de progression.",
              "Daily and cumulative comparative analysis to gauge progress momentum.",
            ),
            span: "md:col-span-6",
          },
          {
            src: "/projects/notion/assiette-references.png",
            alt: "Base de données Références",
            title: b("Base de données Références", "Reference food database"),
            desc: b(
              "Catalogue relationnel des aliments, catégories (légumes, féculents, protéines), types (végétal/animal) et valeurs nutritionnelles aux 100g.",
              "Relational food database indexing categories, types (plant/animal) and 100g nutritional values.",
            ),
            span: "md:col-span-12",
          },
        ],
      },
      {
        id: "invaders",
        title: "Pixel Art Collection",
        subtitle: b(
          "Collection indépendante du jeu Flash Invaders & succès",
          "Independent Flash Invaders game collection & achievements",
        ),
        banner: "/projects/notion/invaders-banner.jpg",
        items: [
          {
            src: "/projects/notion/invaders-dashboard.png",
            alt: "Invaders Dashboard",
            title: b(
              "Dashboard complet de collection & succès",
              "Comprehensive collection & achievement dashboard",
            ),
            desc: b(
              "Architecture complète combinant le profil joueur ML (rang pilote, score global, villes conquises), la galerie visuelle des Invaders capturés et le système de succès débloquables.",
              "Full system combining ML player profile (pilot rank, total score, conquered cities), visual gallery of captured Invaders and unlockable achievements.",
            ),
            span: "md:col-span-12",
          },
        ],
      },
    ],
  },
]


function Cover({
  p,
  className = "",
  fit,
}: {
  p: Project
  className?: string
  fit?: "cover" | "contain"
}) {
  const isSvg = !p.coverSrc && p.coverExt === "svg"
  const actualFit = p.coverSrc
    ? "cover"
    : (fit ?? p.coverFit ?? (isSvg ? "contain" : "cover"))
  return (
    <div
      className={`overflow-hidden ${
        className.includes("absolute") ? "" : "relative"
      } ${className}`}
      style={{ background: p.bg }}
    >
      <Img
        src={p.coverSrc ?? `/projects/${p.slug}/cover.${p.coverExt}`}
        alt={p.title}
        className={`absolute inset-0 h-full w-full ${
          actualFit === "contain"
            ? "object-contain p-6 md:p-10"
            : "object-cover object-top"
        }`}
        fallback={
          <Crop
            src={projectsShot}
            rect={p.rect}
            ratio={0.666}
            alt={p.title}
            className="absolute inset-0"
          />
        }
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

function Projects({ open }: { open: (p: Project) => void }) {
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
                  onClick={() => open(p)}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="grid w-full grid-cols-12 items-baseline gap-4 py-5 md:py-6 text-left"
                >
                  <h3 className="col-span-12 md:col-span-7 text-[clamp(1.75rem,4vw,3.25rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
                    {p.title}
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

function Block({
  n,
  title,
  children,
}: {
  n: string
  title: T
  children: ReactNode
}) {
  const t = useT()
  return (
    <section className="grid md:grid-cols-12 gap-6 border-t border-line pt-6 mt-20">
      <div className="md:col-span-3">
        <p className={caseLabel}>{n}</p>
        <h3 className="mt-2 text-2xl font-bold uppercase tracking-[-0.03em]">
          {t(title)}
        </h3>
      </div>
      <div className="md:col-span-9">{children}</div>
    </section>
  )
}

function CaseStudy({
  p,
  onClose,
  onNext,
}: {
  p: Project | null
  onClose: () => void
  onNext: () => void
}) {
  const t = useT()
  const ref = useRef<HTMLDivElement>(null)
  const [zoomImage, setZoomImage] = useState<{
    src: string
    alt: string
    title?: string
  } | null>(null)
  useEffect(() => {
    if (!p) return
    ref.current?.scrollTo(0, 0)
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [p])
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

  const label = caseLabel

  return (
    <div
      aria-hidden={!p}
      className={`fixed inset-0 z-[80] transition-visibility ${
        p ? "visible" : "invisible delay-700"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-carbon/60 transition-opacity duration-500 ${
          p ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={`absolute inset-y-0 right-0 w-full lg:w-[92vw] overflow-y-auto bg-bg text-fg transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${
          p ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {p && (
          <>
            <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-line bg-bg/85 backdrop-blur-md px-5 md:px-14 font-mono text-[11px] uppercase tracking-[0.12em]">
              <span>
                {p.id} / {p.title}
              </span>
              <button
                onClick={onClose}
                className="flex items-center gap-2 hover:text-signal"
              >
                {t(b("Fermer", "Close"))}{" "}
                <span className="text-base leading-none">×</span>
              </button>
            </div>

            <div className="px-5 md:px-14 pt-12 pb-24">
              <div className="grid md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-8">
                  <p className={label}>
                    {t(p.tags)} · {p.year}
                  </p>
                  <h2 className="mt-4 text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-[0.85] tracking-[-0.06em]">
                    {p.title}
                  </h2>
                </div>
                <dl className="md:col-span-4 grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
                  <div>
                    <dt className="text-muted">{t(b("Rôle", "Role"))}</dt>
                    <dd className="mt-1 normal-case tracking-normal text-sm font-sans">
                      {t(p.role)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">
                      {t(b("Catégorie", "Category"))}
                    </dt>
                    <dd className="mt-1">{t(catLabel[p.cat])}</dd>
                  </div>
                </dl>
              </div>

              <Cover
                p={p}
                fit="contain"
                className="mt-12 aspect-[16/8] w-full"
              />

              <Block n="01" title={b("Contexte & rôle", "Context & role")}>
                <p className="text-xl md:text-2xl leading-snug tracking-tight max-w-3xl">
                  {t(p.context)}
                </p>
              </Block>

              <Block
                n="02"
                title={b("Problème & solution", "Problem & solution")}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-line p-6">
                    <p className={label}>{t(b("Problème", "Problem"))}</p>
                    <p className="mt-4 text-lg leading-relaxed">
                      {t(p.problem)}
                    </p>
                  </div>
                  <div className="bg-fg text-bg p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">
                      Solution
                    </p>
                    <p className="mt-4 text-lg leading-relaxed">
                      {t(p.solution)}
                    </p>
                  </div>
                </div>
              </Block>

              <Block
                n="03"
                title={
                  p.templates
                    ? b("Systèmes & Templates", "Systems & Templates")
                    : p.screens
                      ? b("Architecture & Écrans", "Architecture & Screens")
                      : b("Galerie d'écrans", "Screens")
                }
              >
                {p.templates && p.templates.length > 0 ? (
                  <div className="space-y-16">
                    {p.templates.map((tpl, idx) => (
                      <div
                        key={tpl.id}
                        className="border border-line bg-fg/[0.02]"
                      >
                        <div className="p-6 md:p-8 border-b border-line flex flex-col md:flex-row md:items-end justify-between gap-4">
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">
                              0{idx + 1} / Template
                            </span>
                            <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight uppercase">
                              {tpl.title}
                            </h3>
                            <p className="mt-1 text-sm md:text-base text-fg/70 font-mono tracking-tight">
                              {t(tpl.subtitle)}
                            </p>
                          </div>
                          <span className="self-start md:self-auto font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 border border-line bg-bg">
                            Notion System
                          </span>
                        </div>

                        <div className="border-b border-line bg-carbon overflow-hidden">
                          <img
                            src={tpl.banner}
                            alt={`${tpl.title} Banner`}
                            className="w-full object-cover max-h-56"
                          />
                        </div>

                        <div className="p-6 md:p-8">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {tpl.items.map((item, i) => (
                              <div
                                key={i}
                                className={`${item.span || "md:col-span-12"} flex flex-col border border-line bg-bg group`}
                              >
                                <div
                                  className="relative overflow-hidden cursor-zoom-in bg-fg/[0.04]"
                                  onClick={() =>
                                    setZoomImage({
                                      src: item.src,
                                      alt: item.alt,
                                      title: `${tpl.title} — ${t(item.title)}`,
                                    })
                                  }
                                >
                                  <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                                    loading="lazy"
                                  />
                                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-carbon/80 text-paper font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 backdrop-blur-sm pointer-events-none">
                                    {t(b("Agrandir +", "Enlarge +"))}
                                  </div>
                                </div>
                                <div className="p-4 border-t border-line">
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="font-bold text-base tracking-tight">
                                      {t(item.title)}
                                    </h4>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                                      0{i + 1}
                                    </span>
                                  </div>
                                  {item.desc && (
                                    <p className="mt-2 text-xs md:text-sm text-fg/70 leading-relaxed font-sans">
                                      {t(item.desc)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="border border-line bg-fg text-bg p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                          Templates publics
                        </p>
                        <h4 className="mt-1 text-xl font-bold tracking-tight">
                          {t(
                            b(
                              "Retrouvez tous mes templates sur Notion",
                              "Explore all my templates on Notion",
                            ),
                          )}
                        </h4>
                        <p className="mt-1 text-xs opacity-75 font-mono">
                          @mickln_ · Systèmes & Architecture No-code
                        </p>
                      </div>
                      <a
                        href={LINKS.notion}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-bg/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] hover:bg-bg hover:text-fg transition-colors"
                      >
                        <span>{t(b("Ouvrir Notion", "Open Notion"))}</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                ) : p.screens && p.screens.length > 0 ? (
                  <div className="space-y-12">
                    {p.board && (
                      <div className="border border-line bg-fg/[0.02]">
                        <div className="p-6 md:p-8 border-b border-line flex flex-col md:flex-row md:items-end justify-between gap-4">
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">
                              00 / Architecture
                            </span>
                            <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight uppercase">
                              {t(p.board.title)}
                            </h3>
                            {p.board.subtitle && (
                              <p className="mt-1 text-sm md:text-base text-fg/70 font-mono tracking-tight">
                                {t(p.board.subtitle)}
                              </p>
                            )}
                            {p.board.desc && (
                              <p className="mt-2 text-xs md:text-sm text-muted max-w-2xl font-sans">
                                {t(p.board.desc)}
                              </p>
                            )}
                          </div>
                          <span className="self-start md:self-auto font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 border border-line bg-bg">
                            {p.board.badge ?? "Figma Ecosystem"}
                          </span>
                        </div>

                        <div
                          className="relative overflow-hidden cursor-zoom-in bg-carbon/95 group"
                          onClick={() =>
                            setZoomImage({
                              src: p.board!.src,
                              alt: p.board!.alt,
                              title: `${p.title} — ${t(p.board!.title)}`,
                            })
                          }
                        >
                          <img
                            src={p.board.src}
                            alt={p.board.alt}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                            loading="lazy"
                          />
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-carbon/80 text-paper font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 backdrop-blur-sm pointer-events-none">
                            {t(b("Agrandir le board +", "Enlarge board +"))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="mb-6 flex items-baseline justify-between border-b border-line pb-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">
                          01 / Maquettes & Parcours
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                          {p.screens.length}{" "}
                          {t(b("écrans détaillés", "detailed screens"))}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {p.screens.map((screen, i) => {
                          const isDesktop = screen.aspect === "desktop"
                          return (
                            <div
                              key={i}
                              className="flex flex-col border border-line bg-bg group"
                            >
                              <div
                                className={`relative overflow-hidden cursor-zoom-in border-b border-line flex items-center justify-center transition-colors ${
                                  isDesktop
                                    ? "p-4 md:p-6 bg-fg/[0.02] dark:bg-fg/[0.03] aspect-[16/11]"
                                    : "p-6 md:p-8 bg-fg/[0.02] dark:bg-fg/[0.04] min-h-[340px]"
                                }`}
                                onClick={() =>
                                  setZoomImage({
                                    src: screen.src,
                                    alt: screen.alt,
                                    title: `${p.title} — ${t(screen.title)}`,
                                  })
                                }
                              >
                                <img
                                  src={screen.src}
                                  alt={screen.alt}
                                  className={`w-full transition-transform duration-500 group-hover:scale-[1.02] ${
                                    isDesktop
                                      ? "h-full max-h-full object-contain rounded-lg shadow-md border border-line/40"
                                      : "max-w-[240px] h-auto object-contain rounded-2xl shadow-xl border border-line/50"
                                  }`}
                                  loading="lazy"
                                />
                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-carbon/80 text-paper font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 backdrop-blur-sm pointer-events-none">
                                  {t(b("Agrandir +", "Enlarge +"))}
                                </div>
                              </div>
                              <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="font-bold text-base tracking-tight">
                                      {t(screen.title)}
                                    </h4>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                                      0{i + 1}
                                    </span>
                                  </div>
                                  {screen.desc && (
                                    <p className="mt-2 text-xs md:text-sm text-fg/70 leading-relaxed font-sans">
                                      {t(screen.desc)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[1, 2, 3, 4].map((n, i) => (
                      <div
                        key={n}
                        className={`${["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4"][i]} ${
                          i % 3 === 0
                            ? "aspect-[16/10]"
                            : "aspect-[3/4] md:aspect-auto"
                        } col-span-2 bg-fg/[0.05] border border-line overflow-hidden cursor-zoom-in group relative`}
                        onClick={() =>
                          setZoomImage({
                            src: `/projects/${p.slug}/screen-${n}.jpg`,
                            alt: `${p.title} — ${n}`,
                          })
                        }
                      >
                        <Img
                          src={`/projects/${p.slug}/screen-${n}.jpg`}
                          alt={`${p.title} — ${n}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          fallback={
                            <div className="h-full min-h-40 grid place-items-center font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                              screen-{n}.jpg
                            </div>
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Block>
              <Block n="04" title={b("Direction artistique", "Art direction")}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-4 gap-2">
                    {p.palette.map((c) => (
                      <div key={c}>
                        <div
                          className="aspect-[3/4] border border-line"
                          style={{ background: c }}
                        />
                        <p className="mt-2 font-mono text-[11px] uppercase">
                          {c}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {p.fonts.map((f, i) => (
                      <div
                        key={f}
                        className="border-t border-line pt-3 flex items-baseline justify-between gap-4"
                      >
                        <span className="text-5xl font-semibold tracking-tight">
                          Aa
                        </span>
                        <span className="text-right">
                          <span className="block text-lg font-semibold">
                            {f}
                          </span>
                          <span className={label}>
                            {i === 0
                              ? t(b("Titres", "Headings"))
                              : t(b("Texte", "Body"))}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Block>

              <Block n="05" title={b("Bilan", "Takeaways")}>
                <ul className="space-y-4">
                  {p.takeaways.map((k, i) => (
                    <li
                      key={i}
                      className="flex gap-6 text-xl md:text-2xl tracking-tight"
                    >
                      <span className="font-mono text-sm text-signal pt-2">
                        0{i + 1}
                      </span>
                      {t(k)}
                    </li>
                  ))}
                </ul>
              </Block>

              <button
                onClick={onNext}
                className="group mt-24 w-full border-t border-line pt-6 flex items-end justify-between text-left"
              >
                <span className={label}>
                  {t(b("Projet suivant", "Next project"))}
                </span>
                <span className="text-4xl md:text-7xl font-bold uppercase tracking-[-0.05em] group-hover:text-signal transition-colors">
                  {projects[(projects.indexOf(p) + 1) % projects.length].title}{" "}
                  →
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
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
            <img
              src={zoomImage.src}
              alt={zoomImage.alt}
              className="max-h-[82vh] max-w-full object-contain shadow-2xl border border-paper/15"
            />
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
  const [active, setActive] = useState<Project | null>(null)
  const closeRef = useRef(() => setActive(null))
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
    setActive(null)
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
              <Projects open={setActive} />
              <Tools />
              <Photos />
            </>
          ) : (
            <About />
          )}
        </main>
        <Footer go={go} />
        <CaseStudy
          p={active}
          onClose={closeRef.current}
          onNext={() =>
            active &&
            setActive(
              projects[(projects.indexOf(active) + 1) % projects.length],
            )
          }
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
