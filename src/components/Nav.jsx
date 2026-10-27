
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { BrandMark } from "./Botanicals.jsx";

const IDS = ["about", "skills", "project", "approach", "contact"];

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = IDS.map((id) => document.getElementById(id)).filter(Boolean);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActive(e.target.id)
        ),
      { rootMargin: "-45% 0px -50% 0px" }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return active;
}

export default function Nav({ theme, onTheme }) {
  const { t, next, toggle } = useI18n();
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => e.key === "Escape" && setOpen(false);

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = IDS.map((id) => (
    <li key={id}>
      <a
        href={`#${id}`}
        aria-current={active === id ? "true" : undefined}
        onClick={() => setOpen(false)}
      >
        {t.nav[id]}
      </a>
    </li>
  ));

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={t.a11y.home}>
        <BrandMark className="wordmark-mark" />
        <span>
          Isla <em>Studio</em>
        </span>
      </a>

      <nav className="main-nav" aria-label={t.a11y.primaryNav}>
        <ul>{links}</ul>
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="chip"
          onClick={toggle}
          aria-label={t.a11y.switchTo.replace("{lang}", t.languages[next])}
        >
          {next.toUpperCase()}
        </button>

        <button
          type="button"
          className="chip chip-round"
          onClick={onTheme}
          aria-label={theme === "night" ? t.a11y.toDay : t.a11y.toNight}
        >
          {theme === "night" ? (
            <Sun size={18} aria-hidden="true" />
          ) : (
            <Moon size={18} aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          className="chip chip-round menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
        >
          {open ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>

        <a className="hire-link" href="#contact">
          Hire me <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label={t.a11y.mobileNav}
        hidden={!open}
      >
        <ul>{links}</ul>
      </nav>
    </header>
  );
}
