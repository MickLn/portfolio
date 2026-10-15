import { useEffect, useRef, useState } from "react"
import { photos } from "../content"
import { b, useT } from "../i18n"
import { HoverName } from "../ui/HoverName"
import { Reveal, SplitLine, reduceMotion, runScrollSubs, useScrollFrame } from "../ui/motion"

// Vertical scroll drives a horizontal photo track; plain swipeable row with reduced motion
export function Photos() {
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
