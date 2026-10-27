import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useI18n } from "../i18n.jsx";

const Flower3D = lazy(() => import("./Flower3D.jsx"));

// Always-visible fallback while the 3D scene loads or if WebGL fails.
function FlowerSVG() {
  const petal = "M0 0C-34-44-36-118 0-168C36-118 34-44 0 0Z";

  return (
    <svg className="flower-svg" viewBox="0 0 400 600" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="pOuter" x1="100" y1="110" x2="0" y2="-1">
          <stop offset="0" stopColor="#EE9588" />
          <stop offset="1" stopColor="#FBE2DB" />
        </linearGradient>
        <linearGradient id="pInner" x1="1110" y1="110" x2="0" y2="-1">
          <stop offset="0" stopColor="#D0BDF5" />
          <stop offset="1" stopColor="#F3A99C" />
        </linearGradient>
      </defs>
      <path d="M200 250C190 360 215 450 200 600" fill="none" stroke="#2f5d48" strokeWidth="7" strokeLinecap="round" />
      <path d="M200 420C150 410 118 380 112 340C158 346 192 376 200 420Z" fill="#3d6d55" />
      <path d="M204 480C250 470 282 440 288 400C242 406 210 436 204 480Z" fill="#2f5d48" />
      <g transform="translate(200 200) scale(1 .92)">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={`o${i}`} d={petal} transform={`rotate(${i * 40})`} fill="url(#pOuter)" stroke="#214638" strokeOpacity=".25" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <path key={`i${i}`} d={petal} transform={`rotate(${i * 51 + 20}) scale(.66)`} fill="url(#pInner)" stroke="#214638" strokeOpacity=".25" />
        ))}
        <circle r="20" fill="#D9EE83" />
        <circle r="9" fill="#214638" fillOpacity=".5" />
      </g>
    </svg>
  );
}

class Boundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("3D flower unavailable; keeping the SVG illustration visible.", error);
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function canUse3D() {
  if (typeof window === "undefined" || !("WebGLRenderingContext" in window)) return false;
  const mem = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  return !((mem && mem <= 2) || (cores && cores <= 2));
}

export default function Flower() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [want3D, setWant3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (reduced || !canUse3D()) return undefined;

    const idle = "requestIdleCallback" in window;
    const id = idle
      ? window.requestIdleCallback(() => setWant3D(true), { timeout: 1500 })
      : window.setTimeout(() => setWant3D(true), 400);

    return () => {
      if (idle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flower-stage${ready ? " is-3d" : ""}${hovered ? " is-hovered" : ""}`}
      role="img"
      aria-label={t.hero.flowerAlt}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <FlowerSVG />
      {want3D && !reduced && (
        <Boundary onError={() => setReady(false)}>
          <Suspense fallback={null}>
            <Flower3D active={visible} hovered={hovered} onReady={() => setReady(true)} />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
}
