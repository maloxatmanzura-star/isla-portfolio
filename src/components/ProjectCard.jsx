import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n.jsx";

// Reusable project block. Pass `links` only for URLs that are real and verified.
export default function ProjectCard({ id, label, title, status, description, concept, stackTitle, stack = [], links = [], note, preview, featured = false }) {
  const { t } = useI18n();
  return (
    <article className={`project${featured ? " project-featured" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="project-text">
        {label && <p className="project-label">{label}</p>}
        <h3 id={`${id}-title`} className="project-title">{title}</h3>
        {status && <p className="status"><span className="status-dot" aria-hidden="true" />{status}</p>}
        <p className="lead">{description}</p>
        {concept && <p>{concept}</p>}
        {stack.length > 0 && (
          <>
            <h4 className="mini-title">{stackTitle}</h4>
            <ul className="stack">{stack.map((s) => <li key={s}>{s}</li>)}</ul>
          </>
        )}
        {links.length > 0 && (
          <p className="project-links">
            {links.map((l) => (
              <a key={l.href} className="text-link" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">{t.a11y.newTab}</span>
              </a>
            ))}
          </p>
        )}
        {note && <p className="muted">{note}</p>}
      </div>
      {preview && <div className="project-preview">{preview}</div>}
    </article>
  );
}
