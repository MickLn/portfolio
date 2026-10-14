// Checks every src/projects/*.json before a build: required fields, FR+EN texts, and that every image exists in public/
import { existsSync, readdirSync, readFileSync } from "node:fs"

const dir = new URL("../src/projects/", import.meta.url)
const root = new URL("../public/", import.meta.url)
const problems = []
const isT = (v) => v && typeof v.fr === "string" && typeof v.en === "string" && v.fr && v.en
const need = (file, key, ok) => ok || problems.push(`${file}: "${key}" missing or empty`)
const img = (file, src) =>
  (typeof src === "string" && existsSync(new URL(src, root))) ||
  problems.push(`${file}: image not found in public/ -> ${src}`)

const ids = new Set()
for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  let p
  try {
    p = JSON.parse(readFileSync(new URL(file, dir), "utf8"))
  } catch (e) {
    problems.push(`${file}: invalid JSON (${e.message})`)
    continue
  }
  for (const k of ["slug", "id", "title", "year", "bg", "tools"]) need(file, k, p[k] && typeof p[k] === "string")
  for (const k of ["tags", "summary", "role", "team", "duration", "result"]) need(file, k, isT(p[k]))
  need(file, "context", Array.isArray(p.context) && p.context.length > 0 && p.context.every(isT))
  need(file, "choices", Array.isArray(p.choices) && p.choices.every(isT))
  need(file, "slug matches file name", p.slug === file.replace(".json", ""))
  need(file, "id unique", !ids.has(p.id))
  ids.add(p.id)
  img(file, p.coverSrc)
  if (p.logo) img(file, p.logo)
  if (p.board) { img(file, p.board.src); need(file, "board.caption", isT(p.board.caption)) }
  if (p.link) need(file, "link", p.link.href?.startsWith("http") && isT(p.link.label))
  for (const s of p.screens ?? []) {
    img(file, s.src)
    need(file, `screens[].caption (${s.src})`, isT(s.caption))
    need(file, `screens[].aspect (${s.src})`, s.aspect === "mobile" || s.aspect === "desktop")
  }
  for (const t of p.templates ?? []) {
    need(file, `templates[].desc (${t.id})`, isT(t.desc))
    for (const it of t.items) { img(file, it.src); need(file, `items[].title (${it.src})`, isT(it.title)) }
  }
}
if (problems.length) {
  console.error(problems.map((x) => "✗ " + x).join("\n"))
  process.exit(1)
}
console.log(`✓ ${ids.size} projects OK`)
