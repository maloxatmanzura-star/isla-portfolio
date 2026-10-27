import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "./content/en.js";
import uz from "./content/uz.js";

// To add a language: create src/content/xx.js (same shape as en.js),
// import it here and add it to LANGS. Missing keys fall back to English.
export const LANGS = { en, uz };
const DEFAULT = "en";

export const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

const merge = (base, over) => {
  if (over === undefined) return base;
  if (Array.isArray(base) || base === null || typeof base !== "object") return over;
  const out = { ...base };
  for (const k of Object.keys(over)) out[k] = merge(base[k], over[k]);
  return out;
};

const Ctx = createContext(null);

export function I18nProvider({ children }) {
  const [code, setCode] = useState(() => {
    const saved = store.get("isla-language");
    return saved && saved in LANGS ? saved : DEFAULT;
  });
  const t = useMemo(() => merge(LANGS[DEFAULT], LANGS[code]), [code]);
  const codes = Object.keys(LANGS);
  const next = codes[(codes.indexOf(code) + 1) % codes.length];

  useEffect(() => {
    store.set("isla-language", code);
    document.documentElement.lang = code;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [code, t]);

  const toggle = useCallback(() => setCode(next), [next]);
  const value = useMemo(() => ({ t, code, next, toggle }), [t, code, next, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
