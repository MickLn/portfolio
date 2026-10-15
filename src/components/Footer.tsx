import { type Go } from "./Nav"
import { LINKS } from "../content"
import { b, useT } from "../i18n"
import { Logo } from "../ui/icons"
import { Reveal, SplitLine } from "../ui/motion"

export function Footer({ go }: { go: Go }) {
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
