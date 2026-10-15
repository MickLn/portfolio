import { useEffect, useState } from "react"
import { CaseStudy } from "./components/CaseStudy"
import { Footer } from "./components/Footer"
import { Hero } from "./components/Hero"
import { type Go, Nav, type Page } from "./components/Nav"
import { Photos } from "./components/Photos"
import { Projects } from "./components/Projects"
import { Tools } from "./components/Tools"
import { type Lang, LangCtx } from "./i18n"
import { About } from "./pages/About"
import { useProjectView } from "./projectView"
import { Logo } from "./ui/icons"
import { useAdaptiveCursor } from "./useAdaptiveCursor"

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
