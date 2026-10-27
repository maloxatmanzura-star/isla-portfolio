// Decorative SVG line art. All of it is aria-hidden and uses currentColor.
const LEAVES = [[330, -1, 1], [290, 1, 1.05], [240, -1, 0.95], [190, 1, 0.9], [140, -1, 0.75], [90, 1, 0.6], [50, -1, 0.45]];

export function LeafSprig({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 400" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <path d="M100 396C92 300 110 190 100 24" />
      {LEAVES.map(([y, side, k]) => (
        <path key={y} transform={`translate(100 ${y}) scale(${side * k} ${k}) rotate(-18)`} d="M0 0C-14 -8 -30 -30 -26 -62C-4 -50 12 -26 0 0Z" />
      ))}
    </svg>
  );
}


import { useEffect, useMemo, useState } from "react";

export function HangingVine({ className = "" }) {
  const [metrics, setMetrics] = useState({
    height: 1000,
    progress: 0,
  });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const startY =
          window.scrollY +
          (document.querySelector(".hanging-vine-root")
            ?.getBoundingClientRect().top ?? 0);

        const height = Math.max(
          window.innerHeight,
          document.documentElement.scrollHeight - startY
        );

        // O'simlik ko'rinadigan ekran pastigacha o'sib boradi.
        const progress = Math.max(
  0,
  Math.min(
    1,
    (window.scrollY - startY + window.innerHeight * 0.25) /
      height
  )
);

        setMetrics({ height, progress });
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const { height, progress } = metrics;

  const segments = useMemo(() => {
    const count = Math.max(2, Math.ceil(height / 650));

    return Array.from({ length: count }, (_, i) => {
      const y0 = (i / count) * height;
      const y1 = ((i + 1) / count) * height;
      const x0 = 88 + Math.sin(i * 1.05) * 24;
      const x1 = 88 + Math.sin((i + 1) * 1.05) * 24;
      const dy = y1 - y0;

      return {
        p0: [x0, y0],
        p1: [x0 + 25, y0 + dy * 0.32],
        p2: [x1 - 25, y0 + dy * 0.68],
        p3: [x1, y1],
      };
    });
  }, [height]);

  const pointAt = (s, t) => {
    const u = 1 - t;

    return [0, 1].map((axis) =>
      u ** 3 * s.p0[axis] +
      3 * u ** 2 * t * s.p1[axis] +
      3 * u * t ** 2 * s.p2[axis] +
      t ** 3 * s.p3[axis]
    );
  };

  const tangentAt = (s, t) => {
    const u = 1 - t;

    return [0, 1].map((axis) =>
      3 * u ** 2 * (s.p1[axis] - s.p0[axis]) +
      6 * u * t * (s.p2[axis] - s.p1[axis]) +
      3 * t ** 2 * (s.p3[axis] - s.p2[axis])
    );
  };

  const stemPath = segments
    .map((s, i) =>
      `${i === 0 ? "M" : "L"} ${s.p0.join(" ")} ` +
      `C ${s.p1.join(" ")} ${s.p2.join(" ")} ${s.p3.join(" ")}`
    )
    .join(" ");

  return (
    <svg
      className={`hanging-vine-root ${className}`}
      viewBox={`0 0 180 ${height}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "180px",
        height: `${height}px`,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="vine-stem-scroll" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#385B40" />
          <stop offset="50%" stopColor="#91A77A" />
          <stop offset="100%" stopColor="#526D48" />
        </linearGradient>

        <linearGradient id="vine-leaf-scroll" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D7E5B9" />
          <stop offset="48%" stopColor="#91AD7A" />
          <stop offset="100%" stopColor="#294B36" />
        </linearGradient>
      </defs>

      {/* Yumshoq soya */}

      {/* Scroll bilan chiziladigan asosiy poya */}
      <path
        d={stemPath}
        pathLength="1"
        stroke="url(#vine-stem-scroll)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1"
        strokeDashoffset={1 - progress}
      />

      {segments.map((segment, i) => {
        // Har bir segmentda bitta barg — barglar soni nazoratda.
        const t = 0.56;
        const [x, y] = pointAt(segment, t);
        const [dx, dy] = tangentAt(segment, t);
        const length = Math.hypot(dx, dy) || 1;
        const side = i % 2 === 0 ? -1 : 1;
        const nx = (-dy / length) * side;
        const ny = (dx / length) * side;

        const bx = x + nx * 14;
        const by = y + ny * 14;

        // Barg faqat scroll poyaning shu qismiga yetganda ochiladi.
        const localProgress = Math.max(
          0,
          Math.min(1, (progress - y / height) * height / 100)
        );

        const angle =
          Math.atan2(ny, nx) * (180 / Math.PI) + 90;

        return (
          <g key={i} opacity={localProgress}>
            {/* Shoxcha aynan poyadagi nuqtadan boshlanadi */}
            <path
              d={`M ${x} ${y} Q ${x + nx * 7} ${y + ny * 7} ${bx} ${by}`}
              stroke="#718D61"
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            <g
              transform={`translate(${bx} ${by}) rotate(${angle}) scale(${0.75 + (i % 3) * 0.1})`}
            >
              <path
                d="M0 0 C-8 -12 -28 -29 -23 -49 C-5 -44 8 -26 0 0Z"
                fill="url(#vine-leaf-scroll)"
                stroke="#456747"
                strokeWidth=".7"
                strokeLinejoin="round"
              />

              <path
                d="M0 0 Q-8 -25 -23 -49"
                stroke="#D4E1B8"
                strokeWidth=".8"
                strokeLinecap="round"
                opacity=".8"
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}


export function Contour({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="300" cy="300" rx={50 + i * 36} ry={34 + i * 29} transform={`rotate(${-24 + i * 7} 300 300)`} />
      ))}
    </svg>
  );
}

export function Moon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M72 10A50 50 0 1 0 110 76A40 40 0 0 1 72 10Z" />
    </svg>
  );
}

export function BrandMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <g transform="translate(20 19)">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} transform={`rotate(${r})`} fill="var(--peony)" d="M0 0C-6-5-6-12 0-15C6-12 6-5 0 0Z" />
        ))}
        <circle r="3.2" fill="var(--pist)" />
      </g>
    </svg>
    
  );
}
