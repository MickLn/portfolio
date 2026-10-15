import { Portrait } from "../components/Portrait"
import { about } from "../content"
import { b, useT } from "../i18n"
import { HoverName } from "../ui/HoverName"
import { Arrow } from "../ui/icons"
import { Reveal, SplitLine } from "../ui/motion"

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

export function About() {
  const t = useT()
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
              {about.languages.map(({ name, level, word }) => (
                <span key={level + name.fr}>
                  {t(name)} {level} · {t(word)}
                </span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={200} className="md:col-span-4 md:order-first">
            <Portrait
              src="about/portrait-etretat.jpg"
              alt={t(
                b(
                  "Mickael Lin au coucher du soleil à Étretat",
                  "Mickael Lin at sunset in Étretat",
                ),
              )}
              className="aspect-[4/5] w-full"
            />
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
          {about.softSkills.map(({ name: n, desc: d }, i) => (
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
          {about.passions.map((ps, i) => (
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
                  {ps.stats.map(({ value: v, label: l }) => (
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
