import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { Contour, LeafSprig } from "./Botanicals.jsx";
import Flower from "./Flower.jsx";
import BotanicalText from "./BotanicalText.jsx";
import { HangingVine } from "./Botanicals.jsx";

export default function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  // One orchestrated entrance; skipped entirely for reduced motion.
  const rise = (i) => reduce ? {} : {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] },
  };

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <Contour className="bg-art hero-contour" />
<HangingVine className="bg-art hero-sprig" />      <div className="section-wrap hero-inner">
        <Flower />
        <div className="hero-copy">
          <motion.p className="hero-kicker" {...rise(0)}>{t.hero.kicker}</motion.p>
          <motion.p
  className="hero-name"
  {...rise(0)}
>
  <span className="hero-name-prefix">Created by</span>
  <BotanicalText
    text="Erkinova Malohat"
    className="hero-name-text"
  />
</motion.p>
          <h1 id="hero-title" className="hero-title">
            {t.hero.lines.map((line, i) => (
              <motion.span key={i} className={`hero-line hero-line-${i}`} {...rise(i + 1)}>{line}</motion.span>
            ))}
          </h1>
          <motion.p className="hero-intro" {...rise(4)}>{t.hero.intro}</motion.p>
          <motion.div className="hero-cta" {...rise(5)}>
            <a className="btn btn-solid" href="#project">{t.hero.ctaProjects}</a>
            <a className="btn btn-ghost" href="#contact">{t.hero.ctaContact}</a>
          </motion.div>
        </div>
        <p className="hero-caption">{t.hero.caption}</p>
        <a className="scroll-cue" href="#about">{t.hero.scroll}<ArrowDownRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
