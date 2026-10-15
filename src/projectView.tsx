import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { type Project, projects } from "./content"
import { reduceMotion } from "./ui/motion"

export type View = "hidden" | "shown" | "leaving"
type Box = Record<string, string>

const FLY_MS = 700
const FLY_EASE = "cubic-bezier(.7,0,.2,1)"
const FULL: Box = { left: "0px", top: "0px", width: "100vw", height: "100vh" }
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const rectBox = (r: DOMRect): Box => ({
  left: `${r.left}px`,
  top: `${r.top}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
})
// One box per word: a long title wraps differently in the list and on the page, so each word travels on its own
const wordBoxes = (el: Element | null): Box[] =>
  [...(el?.querySelectorAll("[data-w]") ?? [])].map((w) => {
    const r = w.getBoundingClientRect()
    const c = getComputedStyle(w)
    return {
      left: `${r.left}px`,
      top: `${r.top}px`,
      fontSize: c.fontSize,
      letterSpacing: c.letterSpacing,
    }
  })

// Title split into words so the project transition can move each one
export function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span data-w>{w}</span>
        </Fragment>
      ))}
    </>
  )
}

// A page-coloured band and the title words, drawn above everything and moved between the list row and the page title
function flight(words: string[], band: Box, at: Box[]) {
  const layer = document.createElement("div")
  layer.setAttribute("aria-hidden", "true")
  const bandEl = document.createElement("div")
  bandEl.className = "fixed z-[95] bg-bg"
  Object.assign(bandEl.style, band)
  const wordEls = words.map((w, i) => {
    const el = document.createElement("span")
    el.className =
      "pointer-events-none fixed z-[96] whitespace-nowrap font-bold uppercase leading-normal text-fg"
    el.textContent = w
    Object.assign(el.style, at[i])
    return el
  })
  layer.append(bandEl, ...wordEls)
  document.body.append(layer)
  return {
    move(toBand: Box, toWords: Box[]) {
      void layer.offsetWidth // start from the placed positions, not from nowhere
      const tr = (props: string[]) =>
        props.map((p) => `${p} ${FLY_MS}ms ${FLY_EASE}`).join(", ")
      bandEl.style.transition = tr(["left", "top", "width", "height"])
      Object.assign(bandEl.style, toBand)
      wordEls.forEach((el, i) => {
        el.style.transition = tr(["left", "top", "font-size", "letter-spacing"])
        Object.assign(el.style, toWords[i])
      })
      return sleep(FLY_MS + 20)
    },
    remove: () => layer.remove(),
  }
}

const projectFromHash = () =>
  projects.find((p) => location.hash === `#projet/${p.slug}`) ?? null
const onScreen = (el: Element) => {
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.top < window.innerHeight
}

// The open project page, its #projet/<slug> address, and the transitions between list and page
export function useProjectView() {
  const [active, setActive] = useState(projectFromHash)
  const [view, setView] = useState<View>(() =>
    projectFromHash() ? "shown" : "hidden",
  )
  const current = useRef(active)
  const busy = useRef(false)
  useLayoutEffect(() => {
    current.current = active
  })

  const show = (p: Project | null) => {
    setActive(p)
    setView(p ? "shown" : "hidden")
  }
  const open = async (p: Project, row?: HTMLElement) => {
    if (busy.current) return
    history.pushState({ project: p.slug }, "", `#projet/${p.slug}`)
    const from = row?.querySelector("h3")
    if (!row || !from || reduceMotion) return show(p)
    busy.current = true
    const fly = flight(
      p.title.split(" "),
      rectBox(row.getBoundingClientRect()),
      wordBoxes(from),
    )
    // The page is laid out but invisible, so its title can be measured as the landing spot
    flushSync(() => {
      setActive(p)
      setView("hidden")
    })
    await fly.move(FULL, wordBoxes(document.querySelector("[data-case-title]")))
    flushSync(() => setView("shown"))
    fly.remove()
    busy.current = false
  }
  // shortcut: a back press during the 0.7 s flight is ignored and the page stays open; queue it if that ever matters
  const close = async () => {
    const p = current.current
    if (!p || busy.current) return
    const row = document.querySelector<HTMLElement>(`[data-project="${p.slug}"]`)
    if (!row || !onScreen(row) || reduceMotion) {
      show(null)
      row?.focus({ preventScroll: true })
      return
    }
    busy.current = true
    setView("leaving")
    await sleep(300)
    const fly = flight(
      p.title.split(" "),
      FULL,
      wordBoxes(document.querySelector("[data-case-title]")),
    )
    flushSync(() => setView("hidden"))
    await fly.move(rectBox(row.getBoundingClientRect()), wordBoxes(row.querySelector("h3")))
    flushSync(() => setActive(null))
    fly.remove()
    row.focus({ preventScroll: true })
    busy.current = false
  }
  const next = async () => {
    const p = current.current
    if (!p || busy.current) return
    const n = projects[(projects.indexOf(p) + 1) % projects.length]
    busy.current = true
    history.replaceState({ project: n.slug }, "", `#projet/${n.slug}`)
    setView("leaving")
    await sleep(300)
    show(n)
    busy.current = false
  }
  // Our close button goes back in history when we added the entry, so it and the browser's back button agree
  const dismiss = () => {
    if (history.state?.project) history.back()
    else {
      history.replaceState(null, "", location.pathname + location.search)
      close()
    }
  }
  const reset = () => {
    if (!current.current) return
    history.replaceState(null, "", location.pathname + location.search)
    show(null)
  }
  useEffect(() => {
    // Only refs and state setters are used, so the first render's handlers stay valid
    const onPop = () => {
      const p = projectFromHash()
      if (!p) close()
      else if (p.slug !== current.current?.slug) show(p)
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])
  return { active, view, open, next, dismiss, reset }
}
