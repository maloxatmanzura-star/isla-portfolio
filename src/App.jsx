import { useCallback, useEffect, useState } from "react";
import { I18nProvider, store, useI18n } from "./i18n.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import { HangingVine } from "./components/Botanicals.jsx";
import { About, Skills, Project, Approach, Contact, Footer } from "./components/Sections.jsx";

function useTheme() {
  // The inline script in index.html has already set data-theme before first paint.
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === "night" ? "night" : "day");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    store.set("isla-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "night" ? "#18251f" : "#f5f1e7");
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === "night" ? "day" : "night")), []);
  return [theme, toggle];
}

function Shell() {
  const { t } = useI18n();
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">{t.a11y.skip}</a>
      <div className="bg-layer" aria-hidden="true" />
      <Nav theme={theme} onTheme={toggleTheme} />
      <main id="main">
      <HangingVine />
        <Hero />
        <About />
        <Skills />
        <Project />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <I18nProvider><Shell /></I18nProvider>;
}
