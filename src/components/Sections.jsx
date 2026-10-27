import { ArrowUpRight, Heart, Play, Search, Sprout, Star } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { PROFILE } from "../profile.js";
import { Contour, LeafSprig, Moon } from "./Botanicals.jsx";
import ProjectCard from "./ProjectCard.jsx";

const ExternalLink = ({ href, className, children }) => {
  const { t } = useI18n();
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}<span className="sr-only"> {t.a11y.newTab}</span>
    </a>
  );
};

export function About() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <section id="about" className="section band" aria-labelledby="about-title">
      <Contour className="bg-art about-contour" />
      <div className="section-wrap about-grid">
        <div className="about-text">
          <h2 id="about-title" className="display">{a.title}</h2>
          <p className="lead">{a.p1}</p>
          <p>{a.p2}</p>
        </div>
        <aside className="specimen" aria-labelledby="profile-title">
          <h3 id="profile-title" className="specimen-title">{a.profile}</h3>
          <dl>
            <div><dt>{a.rows.name}</dt><dd className="serif">{PROFILE.name}</dd></div>
            <div><dt>{a.rows.studio}</dt><dd>{PROFILE.brand}</dd></div>
            <div><dt>{a.rows.role}</dt><dd>{a.role}</dd></div>
            <div><dt>{a.rows.languages}</dt><dd>{a.languages}</dd></div>
            <div><dt>{a.rows.github}</dt><dd><ExternalLink className="text-link" href={PROFILE.github}>{PROFILE.githubHandle}<ArrowUpRight size={15} aria-hidden="true" /></ExternalLink></dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export function Skills() {
  const { t } = useI18n();
  const s = t.skills;
  const List = ({ items, soft }) => (
    <ul className={`index${soft ? " index-soft" : ""}`}>
      {items.map((i) => (
        <li key={i.name}>
          {soft && <Sprout size={18} aria-hidden="true" />}
          <span className="index-name">{i.name}</span>
          <span className="index-note">{i.note}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <LeafSprig className="bg-art skills-sprig" />
      <div className="section-wrap">
        <h2 id="skills-title" className="display">{s.title}</h2>
        <p className="lead narrow">{s.intro}</p>
        <div className="skills-grid">
          <div><h3 className="mini-title">{s.nowTitle}</h3><List items={s.now} /></div>
          <div><h3 className="mini-title">{s.learningTitle}</h3><List items={s.learning} soft /></div>
        </div>
      </div>
    </section>
  );
}

// Concept illustration only. It is labelled as such and hidden from assistive tech.
function TinyMock() {
  const { t } = useI18n();
  const tiles = ["a", "b", "c", "d", "e", "f"];
  return (
    <figure className="mock" aria-label={t.project.previewLabel}>
      <div className="mock-bar" aria-hidden="true"><i /><i /><i /><span>tinytoons · {t.project.conceptTag}</span></div>
      <div className="mock-body" aria-hidden="true">
        <div className="mock-side"><Sprout size={18} /><Search size={18} /><Heart size={18} /><Star size={18} /></div>
        <div className="mock-main">
          <div className="mock-banner"><strong>TinyToons</strong><span className="mock-play"><Play size={18} /></span></div>
          <div className="mock-row">{tiles.map((k) => <span key={k} className={`tile tile-${k}`} />)}</div>
          <div className="mock-row">{tiles.slice().reverse().map((k) => <span key={k} className={`tile tile-${k}`} />)}</div>
        </div>
      </div>
      <figcaption>{t.project.previewNote}</figcaption>
    </figure>
  );
}

export function Project() {
  const { t } = useI18n();
  const p = t.project;
  const m = t.more;
  return (
    <section id="project" className="section band" aria-labelledby="project-heading">
      <div className="section-wrap">
        <h2 id="project-heading" className="sr-only">{p.label}</h2>
        <ProjectCard featured id="tinytoons" label={p.label} title={p.title} status={p.status} description={p.description} concept={p.concept} stackTitle={p.stackTitle} stack={p.stack} note={p.links} preview={<TinyMock />} />
        <div className="more">
          <h3 className="display small">{m.title}</h3>
          {m.items.length > 0 ? (
            <div className="more-list">{m.items.map((it, i) => <ProjectCard key={it.title} id={`more-${i}`} {...it} />)}</div>
          ) : (
            <div className="bed">
              <Sprout size={28} aria-hidden="true" />
              <div>
                <p className="serif bed-title">{m.empty}</p>
                <p>{m.text}</p>
                <ExternalLink className="text-link" href={PROFILE.github}>{m.cta}<ArrowUpRight size={16} aria-hidden="true" /></ExternalLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Approach() {
  const { t } = useI18n();
  const a = t.approach;
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="section-wrap approach-grid">
        <div>
          <h2 id="approach-title" className="display">{a.title}</h2>
          <p className="lead narrow">{a.intro}</p>
        </div>
        <ul className="principles">
          {a.items.map((i) => (
            <li key={i.title}><h3 className="serif">{i.title}</h3><p>{i.text}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  return (
    <section id="contact" className="section moon contact" aria-labelledby="contact-title">
      <div className="stars" aria-hidden="true" />
      <Moon className="moon-orb" />
      <LeafSprig className="bg-art moon-sprig" />
      <div className="section-wrap contact-inner">
        <p className="project-label">{c.moon}</p>
        <h2 id="contact-title" className="display">{c.title}</h2>
        <p className="lead narrow">{c.text}</p>
        <p className="contact-mail-label">{c.emailLabel}</p>
        <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <p><ExternalLink className="btn btn-pist" href={PROFILE.github}>{c.github}<ArrowUpRight size={18} aria-hidden="true" /></ExternalLink></p>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  const ids = ["about", "skills", "project", "approach", "contact"];
  return (
    <footer className="site-footer moon">
      <div className="section-wrap footer-inner">
        <div><p className="serif footer-brand">Isla Studio</p><p>{t.footer.statement}</p></div>
        <nav aria-label={t.footer.nav}>
          <ul>{ids.map((id) => <li key={id}><a href={`#${id}`}>{t.nav[id]}</a></li>)}<li><a href="#top">{t.footer.back}</a></li></ul>
        </nav>
      </div>
    </footer>
  );
}
