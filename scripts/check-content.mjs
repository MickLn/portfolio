// Checks every content file in src/content/ before a build: required fields, FR+EN texts,
// unique project ids, and that every image or file it points to exists in public/.
import { existsSync, readdirSync, readFileSync } from "node:fs"

const content = new URL("../src/content/", import.meta.url)
const projectsDir = new URL("projects/", content)
const root = new URL("../public/", import.meta.url)
const problems = []
const isT = (v) => v && typeof v.fr === "string" && typeof v.en === "string" && v.fr && v.en
const isStr = (v) => typeof v === "string" && v.length > 0
const need = (file, key, ok) => ok || problems.push(`${file}: "${key}" missing or empty`)
const file = (where, src) =>
  (isStr(src) && existsSync(new URL(src, root))) ||
  problems.push(`${where}: file not found in public/ -> ${src}`)
const read = (url, name) => {
  try {
    return JSON.parse(readFileSync(url, "utf8"))
  } catch (e) {
    problems.push(`${name}: invalid or missing JSON (${e.message})`)
  }
}

// Projects: one file per project
const ids = new Set()
let count = 0
for (const name of readdirSync(projectsDir).filter((f) => f.endsWith(".json"))) {
  const f = `projects/${name}`
  const p = read(new URL(name, projectsDir), f)
  if (!p) continue
  count++
  for (const k of ["slug", "id", "title", "year", "bg", "tools"]) need(f, k, isStr(p[k]))
  for (const k of ["tags", "summary", "role", "team", "duration", "result"]) need(f, k, isT(p[k]))
  need(f, "context", Array.isArray(p.context) && p.context.length > 0 && p.context.every(isT))
  need(f, "choices", Array.isArray(p.choices) && p.choices.every(isT))
  need(f, "slug matches file name", p.slug === name.replace(".json", ""))
  need(f, "id unique", !ids.has(p.id))
  ids.add(p.id)
  file(f, p.coverSrc)
  if (p.logo) file(f, p.logo)
  if (p.board) { file(f, p.board.src); need(f, "board.caption", isT(p.board.caption)) }
  if (p.link) need(f, "link", p.link.href?.startsWith("http") && isT(p.link.label))
  for (const s of p.screens ?? []) {
    file(f, s.src)
    need(f, `screens[].caption (${s.src})`, isT(s.caption))
    need(f, `screens[].aspect (${s.src})`, s.aspect === "mobile" || s.aspect === "desktop")
  }
  for (const t of p.templates ?? []) {
    need(f, `templates[].desc (${t.id})`, isT(t.desc))
    for (const it of t.items) { file(f, it.src); need(f, `items[].title (${it.src})`, isT(it.title)) }
  }
}

// Contact links
const links = read(new URL("links.json", content), "links.json")
if (links) {
  for (const k of ["email", "linkedin", "cv", "notion"]) need("links.json", k, isStr(links[k]))
  file("links.json", links.cv)
}

// Home: photo strip and tools
for (const ph of read(new URL("photos.json", content), "photos.json") ?? []) {
  file("photos.json", ph.src)
  need("photos.json", `alt (${ph.src})`, isT(ph.alt))
}
for (const t of read(new URL("tools.json", content), "tools.json") ?? []) {
  need("tools.json", "name", isStr(t.name))
  need("tools.json", `accent (${t.name})`, t.accent === "signal" || t.accent === "blue")
  need("tools.json", `logo (${t.name})`, isStr(t.logo))
  need("tools.json", `desc (${t.name})`, isT(t.desc))
}

// "Moi" page
const about = read(new URL("about.json", content), "about.json")
if (about) {
  for (const s of about.softSkills ?? []) need("about.json", "softSkills[]", isT(s.name) && isT(s.desc))
  for (const p of about.passions ?? []) {
    need("about.json", "passions[]", isT(p.name) && isT(p.desc))
    for (const st of p.stats ?? []) need("about.json", `stats (${p.name?.fr})`, isStr(st.value) && isT(st.label))
    if (p.link) need("about.json", `link (${p.name?.fr})`, p.link.href?.startsWith("http") && isStr(p.link.label))
  }
  for (const l of about.languages ?? []) need("about.json", "languages[]", isT(l.name) && isStr(l.level) && isT(l.word))
}

if (problems.length) {
  console.error(problems.map((x) => "✗ " + x).join("\n"))
  process.exit(1)
}
console.log(`✓ content OK: ${count} projects, links, photos, tools, about`)
