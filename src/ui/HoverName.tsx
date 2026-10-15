import { useEffect, useRef, useState } from "react"

type ShapeKey = "arch" | "quarter" | "circle" | "star" | "leaves"

const SHAPE_PATHS: Record<ShapeKey, {
  fill: string
  d?: string
  circle?: boolean
}[]> = {
  arch: [
    {
      fill: "var(--blue)",
      d: "M0 35.0707C0 15.7017 15.7017 0 35.0707 0C54.4397 0 70.1413 15.7017 70.1413 35.0707V70.1413H0V35.0707Z",
    },
  ],
  quarter: [
    {
      fill: "var(--color-signal)",
      d: "M0 70.1413C0 31.4033 31.4033 0 70.1413 0V70.1413H0Z",
    },
  ],
  circle: [{ fill: "var(--blue)", circle: true }],
  star: [
    {
      fill: "var(--color-signal)",
      d: "M35.1006 0C35.0823 0.465208 35.0703 0.932651 35.0703 1.40234C35.0703 20.4688 50.2856 35.9819 69.2363 36.4619L70.1416 36.4736C51.2424 36.4736 35.8369 51.4229 35.1006 70.1416H35.041C34.3165 51.7226 19.389 36.9537 0.905273 36.4854L0 36.4736C19.369 36.4736 35.0703 20.7713 35.0703 1.40234C35.0703 0.932655 35.0593 0.465204 35.041 0H35.1006Z",
    },
  ],
  leaves: [
    {
      fill: "var(--color-signal)",
      d: "M0 35.0707C0 15.7017 15.7017 0 35.0707 0H50.101C50.101 27.67 27.67 50.101 0 50.101V35.0707Z",
    },
    {
      fill: "var(--color-signal)",
      d: "M70.1414 35.0707C70.1414 54.4397 54.4397 70.1414 35.0707 70.1414H20.0404C20.0404 42.4714 42.4714 20.0404 70.1414 20.0404V35.0707Z",
    },
  ],
}

// [shape, clockwise rotation in quarter turns, flipX]; null = empty cell
type Tile = [ShapeKey, number, boolean?] | null
const A0: Tile = ["arch", 0]
const A180: Tile = ["arch", 2]
const CI: Tile = ["circle", 0]
const STEM: Tile[][] = [[A0], [CI], [A180]]

const GLYPHS: Record<string, Tile[][]> = {
  I: STEM,
  M: [
    [A0, ["arch", 2], A0],
    [CI, null, CI],
    [A180, null, A180],
  ],
  N: [
    [A0, null, A0],
    [CI, ["leaves", 0], CI],
    [A180, null, A180],
  ],
  C: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, null],
    [
      ["quarter", 3],
      ["quarter", 2],
    ],
  ],
  K: [
    [A0, ["leaves", 0, true]],
    [CI, null],
    [A180, ["leaves", 0]],
  ],
  A: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, CI],
    [A0, A0],
  ],
  E: [
    [
      ["quarter", 0],
      ["arch", 1],
    ],
    [CI, ["arch", 1]],
    [
      ["quarter", 3],
      ["arch", 1],
    ],
  ],
  O: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, CI],
    [
      ["quarter", 3],
      ["quarter", 2],
    ],
  ],
  P: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, CI],
    [A180, null],
  ],
  R: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, CI],
    [A180, ["leaves", 0]],
  ],
  S: [
    [
      ["quarter", 0],
      ["arch", 1],
    ],
    [
      ["quarter", 2],
      ["quarter", 1],
    ],
    [
      ["arch", 3],
      ["quarter", 2],
    ],
  ],
  G: [
    [
      ["quarter", 0],
      ["quarter", 1],
    ],
    [CI, ["arch", 1]],
    [
      ["quarter", 3],
      ["quarter", 2],
    ],
  ],
  U: [
    [A0, A0],
    [CI, CI],
    [
      ["quarter", 3],
      ["quarter", 2],
    ],
  ],
  F: [
    [
      ["quarter", 0],
      ["arch", 1],
    ],
    [CI, ["arch", 1]],
    [A180, null],
  ],
  H: [
    [A0, null, A0],
    [CI, CI, CI],
    [A180, null, A180],
  ],
  T: [
    [["arch", 3], CI, ["arch", 1]],
    [null, CI, null],
    [null, A180, null],
  ],
  W: [
    [A0, null, A0],
    [CI, null, CI],
    [A180, A0, A180],
  ],
  L: [
    [A0, null],
    [CI, null],
    [
      ["quarter", 3],
      ["arch", 1],
    ],
  ],
}

function ShapeTile({ tile }: { tile: Tile }) {
  if (!tile) return <span />
  const [k, rot, flip] = tile
  return (
    <svg
      viewBox="0 0 71 71"
      className="block h-full w-full"
      style={{
        transform: `${flip ? "scaleX(-1) " : ""}rotate(${rot * 90}deg)`,
      }}
    >
      {SHAPE_PATHS[k].map((p, i) =>
        p.circle ? (
          <circle
            key={i}
            cx="35.07"
            cy="35.07"
            r="35.07"
            style={{ fill: p.fill }}
          />
        ) : (
          <path key={i} d={p.d} style={{ fill: p.fill }} />
        ),
      )}
    </svg>
  )
}

export function HoverName({ text }: { text: string }) {
  const [on, setOn] = useState<Record<number, boolean>>({})
  const timers = useRef<Record<number, number>>({})
  useEffect(() => {
    const pending = timers.current
    return () => Object.values(pending).forEach(window.clearTimeout)
  }, [])
  const swap = (i: number) => {
    window.clearTimeout(timers.current[i])
    setOn((o) => ({ ...o, [i]: true }))
    timers.current[i] = window.setTimeout(
      () => setOn((o) => ({ ...o, [i]: false })),
      600,
    )
  }
  return (
    <span aria-label={text}>
      {text.split("").map((ch, i) => {
        if (ch === " ") return " "
        const g =
          GLYPHS[
            ch
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toUpperCase()
          ]
        const cols = g ? g[0].length : 0
        return (
          <span
            key={i}
            aria-hidden
            onMouseEnter={() => g && swap(i)}
            className="relative inline-block"
          >
            <span
              className={`inline-block transition-opacity duration-500 ease-in-out ${
                on[i] ? "opacity-0 delay-100" : "opacity-100 delay-300"
              }`}
            >
              {ch}
            </span>
            {g && (
              <span
                className="pointer-events-none absolute left-1/2 bottom-[0.06em] grid -translate-x-1/2"
                style={{
                  width: `${cols * 0.24}em`,
                  height: "0.72em",
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gridTemplateRows: "repeat(3, 1fr)",
                }}
              >
                {g.flatMap((row, r) =>
                  row.map((tile, c) => (
                    <span
                      key={`${r}-${c}`}
                      className="block"
                      style={{
                        transform: on[i] ? "scale(1)" : "scale(0.4)",
                        opacity: on[i] ? 1 : 0,
                        transitionProperty: "transform, opacity",
                        transitionDuration: on[i]
                          ? "700ms, 500ms"
                          : "600ms, 600ms",
                        transitionTimingFunction: on[i]
                          ? "cubic-bezier(.22,1,.36,1), ease-out"
                          : "cubic-bezier(.65,0,.35,1), ease-in-out",
                        transitionDelay: `${(r * cols + c) * (on[i] ? 70 : 40)}ms`,
                      }}
                    >
                      <ShapeTile tile={tile} />
                    </span>
                  )),
                )}
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
