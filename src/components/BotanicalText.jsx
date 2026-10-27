
import { motion, useReducedMotion } from "motion/react";

const effects = ["leaf", "bloom", "sway", "glow", "leaf"];

export default function BotanicalText({
  text,
  className = "",
  as: Tag = "span",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Tag className={`botanical-text ${className}`}>
      {Array.from(text).map((char, index) => {
        const effect = effects[index % effects.length];

        if (char === " ") {
          return (
            <span
              key={`${char}-${index}`}
              className="botanical-space"
              aria-hidden="true"
            >
              {" "}
            </span>
          );
        }

        return (
          <motion.span
            key={`${char}-${index}`}
            className={`botanical-letter effect-${effect}`}
            data-char={char}
            aria-hidden="true"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -5,
                    scale: 1.12,
                    rotate: effect === "sway" ? 7 : -3,
                    transition: {
                      type: "spring",
                      stiffness: 320,
                      damping: 12,
                    },
                  }
            }
          >
            <span className="letter-glyph">{char}</span>
            <span className="letter-botanical" aria-hidden="true" />
          </motion.span>
        );
      })}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
