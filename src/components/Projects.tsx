import { useRef, useState } from "react"
import { Cover } from "./Cover"
import { type Project, projects } from "../content"
import { b, useT } from "../i18n"
import { Words } from "../projectView"
import { HoverName } from "../ui/HoverName"
import { Arrow } from "../ui/icons"
import { Reveal, SplitLine } from "../ui/motion"

export function Projects({
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
