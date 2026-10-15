import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Cover } from "./Cover"
import { type Project, type ProjectScreen, type ProjectTemplate, projects } from "../content"
import { type T, b, useT } from "../i18n"
import { type View, Words } from "../projectView"
import { Arrow } from "../ui/icons"

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

export function CaseStudy({
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
