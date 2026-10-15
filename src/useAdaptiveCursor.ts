import { useEffect } from "react"

/* Cursor turns blue when the background under it is orange (CSS can't read what's underneath) */
export function useAdaptiveCursor() {
  useEffect(() => {
    let x = -1
    let y = -1
    let raf = 0
    const check = () => {
      raf = 0
      if (x < 0) return
      let alt = false
      // Read what is under the pointer now: scroll, curtains and hover transitions change it without a pointermove
      for (let el = document.elementFromPoint(x, y); el; el = el.parentElement) {
        const bg = getComputedStyle(el).backgroundColor
        const n = bg.match(/[\d.]+/g)?.map(Number)
        if (!n || (n[3] ?? 1) < 0.5) continue
        const k = bg.startsWith("color(") ? 255 : 1
        alt = Math.hypot(n[0] * k - 255, n[1] * k - 111, n[2] * k - 15) < 60
        break
      }
      document.documentElement.classList.toggle("cursor-alt", alt)
    }
    const schedule = () => {
      raf ||= requestAnimationFrame(check)
    }
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      schedule()
    }
    const events = ["scroll", "transitionend", "animationend"] as const
    addEventListener("pointermove", move, { passive: true })
    events.forEach((e) => addEventListener(e, schedule, { passive: true, capture: true }))
    return () => {
      removeEventListener("pointermove", move)
      events.forEach((e) => removeEventListener(e, schedule, { capture: true }))
      cancelAnimationFrame(raf)
    }
  }, [])
}
