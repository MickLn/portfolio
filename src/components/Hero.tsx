import { Fragment, useRef } from "react"
import { type Go } from "./Nav"
import { Portrait } from "./Portrait"
import { b, useT } from "../i18n"
import { HoverName } from "../ui/HoverName"
import { Logo } from "../ui/icons"
import { Parallax, Reveal, SplitLine, reduceMotion, useScrollFrame } from "../ui/motion"

export function Hero({ go }: { go: Go }) {
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
