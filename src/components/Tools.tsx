import { tools } from "../content"
import { b, useT } from "../i18n"
import { HoverName } from "../ui/HoverName"
import { Reveal, SplitLine } from "../ui/motion"

// Tailwind needs the full class names in code, so the JSON only says which accent
const ACCENT = { signal: "text-signal", blue: "text-klein dark:text-azur" }

export function Tools() {
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
                className={`h-8 w-8 md:h-10 md:w-10 self-end transition-colors duration-500 group-hover:text-bg ${ACCENT[tool.accent]}`}
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
