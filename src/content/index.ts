// All editable content of the site. Texts are { fr, en }; images are paths inside public/.
// Edit the JSON files next to this one; `pnpm check` validates them.
import type { T } from "../i18n"
import aboutData from "./about.json"
import linksData from "./links.json"
import photosData from "./photos.json"
import toolsData from "./tools.json"

export type ProjectScreen = {
  src: string
  alt: string
  caption: T
  aspect: "mobile" | "desktop"
}

export type ProjectTemplate = {
  id: string
  title: string
  desc: T
  items: { src: string; alt: string; title: T; span?: string }[]
}

export type Project = {
  slug: string
  id: string
  title: string
  year: string
  bg: string
  coverSrc: string
  tags: T
  summary: T
  role: T
  team: T
  duration: T
  tools: string
  link?: { href: string; label: T }
  context: T[]
  choices: T[]
  credit?: T
  logo?: string
  colors?: [string, string][] // [name, hex]
  fonts?: string[]
  board?: { src: string; alt: string; caption: T }
  screens?: ProjectScreen[]
  templates?: ProjectTemplate[]
  result: T
}

export type Tool = { name: string; accent: "signal" | "blue"; logo: string; desc: T }
export type Photo = { src: string; alt: T }
export type About = {
  softSkills: { name: T; desc: T }[]
  passions: {
    name: T
    desc: T
    stats: { value: string; label: T }[]
    link?: { href: string; label: string }
  }[]
  languages: { name: T; level: string; word: T }[]
}

// One JSON file per project in projects/: add a file there and it shows up in the list, ordered by "id"
export const projects = Object.values(
  import.meta.glob<Project>("./projects/*.json", {
    eager: true,
    import: "default",
  }),
).sort((x, y) => x.id.localeCompare(y.id))

export const LINKS: { email: string; linkedin: string; cv: string; notion: string } = linksData
export const tools = toolsData as Tool[]
export const photos: Photo[] = photosData
export const about: About = aboutData
