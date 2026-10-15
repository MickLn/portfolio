import { createContext, useContext } from "react"

export type Lang = "fr" | "en"
export type T = { fr: string; en: string }
export const LangCtx = createContext<Lang>("fr")
export const useT = () => {
  const lang = useContext(LangCtx)
  return (o: T) => o[lang]
}
export const b = (fr: string, en: string): T => ({ fr, en })
