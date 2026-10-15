import { type Lang, b, useT } from "../i18n"

export type Page = "home" | "about"

export type Go = (p: Page, hash?: string) => void

export function Nav({
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
                    ? "text-fg underline decoration-signal underline-offset-4"
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
