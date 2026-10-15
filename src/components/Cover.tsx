import { type Project } from "../content"

export function Cover({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div
      className={`overflow-hidden ${
        className.includes("absolute") ? "" : "relative"
      } ${className}`}
      style={{ background: p.bg }}
    >
      <img
        src={p.coverSrc}
        alt={p.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  )
}
