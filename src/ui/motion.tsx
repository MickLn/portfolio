import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

// One shared scroll/resize listener for the whole app. Subscribers write styles
// straight to the DOM, so scrolling never re-renders React components.
export const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const scrollSubs = new Set<() => void>()
let scrollFrame = 0
export const runScrollSubs = () => {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0
    scrollSubs.forEach((f) => f())
  })
}
export function useScrollFrame(update: () => void) {
  const latest = useRef(update)
  useLayoutEffect(() => {
    latest.current = update
  })
  useEffect(() => {
    const f = () => latest.current()
    if (!scrollSubs.size) {
      window.addEventListener("scroll", runScrollSubs, { passive: true })
      window.addEventListener("resize", runScrollSubs)
    }
    scrollSubs.add(f)
    f()
    return () => {
      scrollSubs.delete(f)
      if (!scrollSubs.size) {
        window.removeEventListener("scroll", runScrollSubs)
        window.removeEventListener("resize", runScrollSubs)
      }
    }
  }, [])
}

export function Parallax({
  speed,
  children,
  className = "",
}: {
  speed: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollFrame(() => {
    const el = ref.current
    if (!el || reduceMotion) return
    const r = el.getBoundingClientRect()
    const offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed
    el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
  })
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Scroll-triggered reveal
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "section"
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

// Text that slides up line-by-line on reveal
export function SplitLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <Reveal className={`split ${className}`} delay={delay}>
      <span className="block">{children}</span>
    </Reveal>
  )
}
