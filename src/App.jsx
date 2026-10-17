import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Code2,
  Globe2, Leaf, Menu, Moon, Sun, X, Sparkles, Sprout
} from "lucide-react";



const copy = {
  en: {
    nav: ["About", "Skills", "Projects", "Contact"],
    eyebrow: "ASPIRING SOFTWARE ENGINEER · DIGITAL BOTANICA",
    titleA: "Growing ideas",
    titleB: "into digital",
    titleC: "experiences.",
    intro: "I’m Isla Studio — an aspiring software engineer learning to turn thoughtful ideas into useful, delightful web experiences.",
    explore: "Explore my garden",
    projects: "View projects",
    scroll: "SCROLL TO WANDER",
    note: "A work in progress, by design.",
    aboutTag: "A LITTLE ABOUT ME",
    aboutTitle: "Curious by nature.",
    aboutText: "I’m learning how thoughtful design and code can work together. I enjoy exploring frontend development, building small experiments, and improving one detail at a time. This space grows as I do.",
    currently: "CURRENTLY GROWING",
    learning: "Frontend foundations",
    learningText: "Practising the craft, learning by building, and getting more comfortable solving real problems.",
    skillsTag: "TOOLS IN MY GARDEN",
    skillsTitle: "A toolkit that keeps growing.",
    skillsText: "These are the tools I’m learning and using. The list will grow alongside real projects and experience.",
    projectsTag: "THINGS I’M GROWING",
    projectsTitle: "Small beginnings. Real progress.",
    tinyLabel: "FEATURED · IN PROGRESS",
    tinyTitle: "TinyToons",
    tinyText: "A children’s streaming-platform concept built with React. I’m developing the interface and exploring how to make browsing feel simple and playful.",
    tinyStatus: "In progress",
    viewCode: "GitHub profile",
    approachTag: "MY APPROACH",
    approachTitle: "Make it clear. Make it useful. Then make it lovely.",
    approachText: "I start by understanding the goal, break the work into manageable pieces, and improve the result through testing and iteration. Visual details matter—but so do accessibility, speed, and clarity.",
    contactTag: "LET’S CONNECT",
    contactTitle: "Every good idea starts somewhere.",
    contactText: "Have a project, a thoughtful suggestion, or a chance to learn together? I’d be glad to hear from you.",
    email: "Email me",
    footer: "Grown with curiosity and care.",
    top: "Back to top",
    themeDay: "Switch to night garden",
    themeNight: "Switch to day garden",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    skillNames: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Responsive UI"],
  },
  uz: {
    nav: ["Men haqimda", "Ko‘nikmalar", "Loyihalar", "Aloqa"],
    eyebrow: "DASTURIY INJENERLIKKA INTILUVCHI · DIGITAL BOTANICA",
    titleA: "G‘oyalarni",
    titleB: "raqamli",
    titleC: "tajribaga aylantiraman.",
    intro: "Men — Isla Studio. Mazmunli g‘oyalarni foydali va yoqimli veb-tajribaga aylantirishni o‘rganayotgan bo‘lajak dasturiy injinerman.",
    explore: "Bog‘imni kashf et",
    projects: "Loyihalarni ko‘rish",
    scroll: "DAVOM ETISH UCHUN PASTGA",
    note: "Bu loyiha o‘sishda davom etadi.",
    aboutTag: "MEN HAQIMDA QISQACHA",
    aboutTitle: "Tabiatan izlanuvchanman.",
    aboutText: "Men puxta dizayn va kod qanday uyg‘un ishlashini o‘rganyapman. Frontend dasturlashni o‘rganish, kichik tajribalar yaratish va har bir detalni yaxshilash menga yoqadi. Bu makon men bilan birga rivojlanadi.",
    currently: "HOZIR NIMA USTIDA ISHLAYAPMAN",
    learning: "Frontend asoslari",
    learningText: "Amaliyot qilish, loyiha orqali o‘rganish va haqiqiy muammolarni hal qilishga ko‘nikish.",
    skillsTag: "BOG‘IMDAGI VOSITALAR",
    skillsTitle: "Doim kengayib borayotgan bilimlar.",
    skillsText: "Bular o‘rganayotganim va ishlatayotgan vositalarim. Ro‘yxat haqiqiy loyihalar va tajriba bilan kengayadi.",
    projectsTag: "PARVARISH QILAYOTGAN LOYIHALARIM",
    projectsTitle: "Kichik boshlanish. Haqiqiy o‘sish.",
    tinyLabel: "ASOSIY LOYIHA · JARAYONDA",
    tinyTitle: "TinyToons",
    tinyText: "React yordamida yaratilayotgan bolalar uchun striming platformasi konsepsiyasi. Interfeys ustida ishlayapman va kontentni ko‘rishni sodda hamda qiziqarli qilish yo‘llarini o‘rganyapman.",
    tinyStatus: "Jarayonda",
    viewCode: "GitHub profilim",
    approachTag: "ISHLASH USLUBIM",
    approachTitle: "Avval tushunarli. Keyin foydali. So‘ng chiroyli.",
    approachText: "Avval maqsadni tushunaman, vazifani kichik bosqichlarga ajrataman va sinov orqali natijani yaxshilayman. Vizual detallar muhim, ammo qulaylik, tezlik va tushunarlilik ham shunchalik muhim.",
    contactTag: "BOG‘LANISH",
    contactTitle: "Har bir yaxshi g‘oya nimadandir boshlanadi.",
    contactText: "Loyiha, foydali taklif yoki birga o‘rganish imkoniyati bormi? Xabaringizni mamnuniyat bilan kutaman.",
    email: "Email yozish",
    footer: "Qiziquvchanlik va e’tibor bilan yaratildi.",
    top: "Yuqoriga qaytish",
    themeDay: "Tungi bog‘ rejimiga o‘tish",
    themeNight: "Kunduzgi bog‘ rejimiga o‘tish",
    openMenu: "Navigatsiya menyusini ochish",
    closeMenu: "Navigatsiya menyusini yopish",
    skillNames: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Moslashuvchan UI"],
  },
};

const skillIcons = ["<>", "✳", "JS", "⚛", "TW", "↔"];
const skillDetails = [
  "Structure and accessible markup",
  "Layouts, styling, and visual systems",
  "Interactive behaviour and core concepts",
  "Component-based interfaces",
  "Utility-first styling workflow",
  "Layouts for mobile, tablet, and desktop",
];

function FlowerArtwork() {
  return (
    <div className="flower-art" aria-label="Decorative abstract flower illustration" role="img">
      <div className="flower-orbit orbit-one" />
      <div className="flower-orbit orbit-two" />
      <div className="flower-stem" />
      <div className="flower-leaf leaf-one" />
      <div className="flower-leaf leaf-two" />
      <div className="flower-head">
        {Array.from({ length: 8 }, (_, i) => (
          <span className="petal" style={{ "--i": i }} key={i} />
        ))}
        <span className="flower-center" />
      </div>
      <span className="flower-star star-one">✳</span>
      <span className="flower-star star-two">✧</span>
      <span className="flower-caption">FIG. 01 — IDEAS IN BLOOM</span>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("isla-language") || "en");
  const [theme, setTheme] = useState(() => localStorage.getItem("isla-theme") || "day");
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const t = copy[language];

  useEffect(() => {
    localStorage.setItem("isla-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem("isla-theme", theme);
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content", theme === "night" ? "#18251f" : "#f5f1e7"
    );
  }, [theme]);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  const reveal = reducedMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65, ease: "easeOut" } };

  return (
    <div className={`site-shell theme-${theme}`}>
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Isla Studio home" onClick={() => setMenuOpen(false)}>
          <span className="wordmark-icon"><Sprout size={20} strokeWidth={1.7} /></span>
          <span>isla<span className="wordmark-light"> studio</span><i>.</i></span>
        </a>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {t.nav.map((label, index) => (
            <button key={label} onClick={() => goTo(["about", "skills", "projects", "contact"][index])}>{label}</button>
          ))}
          <div className="mobile-controls">
            <button className="language-button" onClick={() => setLanguage(language === "en" ? "uz" : "en")} aria-label="Change language">
              <Globe2 size={15} /> {language.toUpperCase()}
            </button>
            <button className="icon-button" onClick={() => setTheme(theme === "day" ? "night" : "day")} aria-label={theme === "day" ? t.themeDay : t.themeNight}>
              {theme === "day" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
          </div>
        </nav>
        <div className="header-actions">
          <button className="language-button" onClick={() => setLanguage(language === "en" ? "uz" : "en")} aria-label="Change language">
            <Globe2 size={15} /> {language.toUpperCase()}
          </button>
          <button className="icon-button" onClick={() => setTheme(theme === "day" ? "night" : "day")} aria-label={theme === "day" ? t.themeDay : t.themeNight}>
            {theme === "day" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.closeMenu : t.openMenu} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.p className="eyebrow" {...reveal}><span className="eyebrow-dot" />{t.eyebrow}</motion.p>
            <motion.h1 {...reveal} transition={{ duration: 0.75, delay: 0.08 }}>
              {t.titleA}<br /><em>{t.titleB}</em><br />{t.titleC}
            </motion.h1>
            <motion.p className="hero-intro" {...reveal} transition={{ duration: 0.7, delay: 0.15 }}>{t.intro}</motion.p>
            <motion.div className="hero-actions" {...reveal} transition={{ duration: 0.7, delay: 0.2 }}>
              <button className="button button-primary" onClick={() => goTo("about")}>{t.explore}<ArrowDownRight size={17} /></button>
              <button className="text-link" onClick={() => goTo("projects")}>{t.projects}<ArrowUpRight size={16} /></button>
            </motion.div>
            <div className="hero-footnote"><span className="tiny-line" />{t.note}</div>
          </div>
          <div className="hero-visual">
            <FlowerArtwork />
            <div className="visual-index"><span>01</span><span>—</span><span>05</span></div>
          </div>
          <button className="scroll-cue" onClick={() => goTo("about")}><span className="scroll-line" />{t.scroll}</button>
          <span className="hero-side-note">GROW AT YOUR OWN PACE</span>
        </section>

        <section className="about section-wrap section-block" id="about">
          <motion.div className="section-label" {...reveal}><span>01</span><span className="label-line" />{t.aboutTag}</motion.div>
          <div className="about-grid">
            <motion.h2 {...reveal}>{t.aboutTitle}<span className="heading-period">✳</span></motion.h2>
            <motion.div className="about-body" {...reveal}>
              <p>{t.aboutText}</p>
              <div className="currently-card">
                <div className="currently-icon"><Sprout size={20} /></div>
                <div><span className="mini-label">{t.currently}</span><h3>{t.learning}</h3><p>{t.learningText}</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="skills section-wrap section-block" id="skills">
          <motion.div className="section-label" {...reveal}><span>02</span><span className="label-line" />{t.skillsTag}</motion.div>
          <motion.h2 className="section-title" {...reveal}>{t.skillsTitle}</motion.h2>
          <motion.p className="section-intro" {...reveal}>{t.skillsText}</motion.p>
          <div className="skills-grid">
            {t.skillNames.map((name, i) => (
              <motion.article className="skill-card" key={name} {...reveal} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <span className="skill-symbol">{skillIcons[i]}</span>
                <span className="skill-name">{name}</span>
                <span className="skill-detail">{skillDetails[i]}</span>
                <ArrowUpRight className="skill-arrow" size={17} />
              </motion.article>
            ))}
          </div>
          <p className="honesty-note"><Sparkles size={14} /> {language === "en" ? "A learning snapshot, not a claim of mastery." : "Bu — o‘rganish jarayoni, mukammal bilish da’vosi emas."}</p>
        </section>

        <section className="projects section-wrap section-block" id="projects">
          <motion.div className="section-label" {...reveal}><span>03</span><span className="label-line" />{t.projectsTag}</motion.div>
          <div className="projects-heading">
            <motion.h2 {...reveal}>{t.projectsTitle}</motion.h2>
            <motion.span className="project-count" {...reveal}>01 / SELECTED</motion.span>
          </div>
          <motion.article className="featured-project" {...reveal}>
            <div className="project-art">
              <div className="project-window">
                <div className="window-bar"><span /><span /><span /><small>TINYTOONS</small></div>
                <div className="tiny-screen">
                  <span className="tiny-kicker">A LITTLE WORLD OF STORIES</span>
                  <div className="tiny-sun" />
                  <div className="tiny-hill hill-back" />
                  <div className="tiny-hill hill-front" />
                  <div className="tiny-cloud cloud-one" />
                  <div className="tiny-cloud cloud-two" />
                  <span className="tiny-screen-title">little stories,<br /><i>big wonder.</i></span>
                  <span className="tiny-screen-foot">A CONCEPT IN PROGRESS</span>
                </div>
              </div>
              <span className="art-caption">PROJECT STUDY — 001</span>
            </div>
            <div className="project-info">
              <span className="project-label"><span className="status-dot" />{t.tinyLabel}</span>
              <h3>{t.tinyTitle}<span>.</span></h3>
              <p>{t.tinyText}</p>
              <div className="tech-tags"><span>React</span><span>JavaScript</span><span>Tailwind CSS</span><span>Vite</span></div>
              <div className="project-links">
                <span className="status-pill"><span className="status-dot" />{t.tinyStatus}</span>
                <a href="https://github.com/maloxatmanzura-star" target="_blank" rel="noreferrer">{t.viewCode}<ArrowUpRight size={15} /></a>
              </div>
            </div>
          </motion.article>
        </section>

        <section className="approach section-wrap section-block" id="approach">
          <motion.div className="section-label" {...reveal}><span>04</span><span className="label-line" />{t.approachTag}</motion.div>
          <motion.div className="approach-card" {...reveal}>
            <div className="approach-mark"><Code2 size={26} strokeWidth={1.4} /><span>IDEA → ITERATION</span></div>
            <div><h2>{t.approachTitle}</h2><p>{t.approachText}</p></div>
            <span className="approach-spark">✳</span>
          </motion.div>
        </section>

        <section className="contact section-wrap section-block" id="contact">
          <motion.div className="section-label" {...reveal}><span>05</span><span className="label-line" />{t.contactTag}</motion.div>
          <div className="contact-grid">
            <motion.h2 {...reveal}>{t.contactTitle}<span className="heading-period">✳</span></motion.h2>
            <motion.div className="contact-body" {...reveal}>
  <p>{t.contactText}</p>
  <a className="button button-primary contact-button" href="mailto:maloxat.manzura@gmail.com">{t.email}<ArrowRight size={17} /></a>
  <a className="github-link" href="https://github.com/maloxatmanzura-star" target="_blank" rel="noreferrer">
    <span>✳ </span> github.com/maloxatmanzura-star <ArrowUpRight size={14} />
  </a>
</motion.div>

          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark footer-wordmark" href="#home"><span className="wordmark-icon"><Sprout size={18} /></span><span>isla<span className="wordmark-light"> studio</span><i>.</i></span></a>
        <p>{t.footer}</p>
        <button className="back-top" onClick={() => goTo("home")}>{t.top}<ArrowUpRight size={15} /></button>
        <span className="copyright">© {new Date().getFullYear()} Isla Studio</span>
      </footer>
    </div>
  );
}

export default App;