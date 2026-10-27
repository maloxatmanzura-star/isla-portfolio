import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  MathUtils,
  PlaneGeometry,
  TubeGeometry,
  Vector3,
} from "three";

const RINGS = [
  { n: 8, len: 2.1, wid: 1.0, tilt: 1.2, curl: 0.35, c1: "#F3A99C", c2: "#FBE2DB", off: 0 },
  { n: 8, len: 1.7, wid: 0.95, tilt: 0.85, curl: 0.1, c1: "#EC8F81", c2: "#F3A99C", off: 0.39 },
  { n: 6, len: 1.25, wid: 0.8, tilt: 0.5, curl: -0.25, c1: "#D0BDF5", c2: "#F3A99C", off: 0.2 },
  { n: 5, len: 0.7, wid: 0.6, tilt: 0.2, curl: -0.2, c1: "#D9EE83", c2: "#D0BDF5", off: 0.6 },
];

function petalGeometry({ len, wid, curl, c1, c2 }) {
  const geometry = new PlaneGeometry(1, 1, 8, 12);
  const positions = geometry.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const colorStart = new Color(c1);
  const colorEnd = new Color(c2);
  const mixedColor = new Color();

  for (let i = 0; i < positions.count; i++) {
    const u = positions.getX(i) * 2;
    const v = positions.getY(i) + 0.5;
    const width = (Math.sin(Math.PI * Math.pow(v, 0.75)) * 0.5 + 0.08) * wid;
    const x = u * width;

    positions.setXYZ(i, x, v * len, curl * v * v - x * x * 0.6);
    mixedColor.copy(colorStart).lerp(colorEnd, v);
    colors.set([mixedColor.r, mixedColor.g, mixedColor.b], i * 3);
  }

  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function Bloom({ dragRotation, hovered }) {
  const group = useRef();

  const { petals, leaf, stem } = useMemo(() => {
    const petals = RINGS.map((ring) => ({ ...ring, geo: petalGeometry(ring) }));
    const leaf = petalGeometry({ len: 1.9, wid: 1.1, curl: 0.3, c1: "#214638", c2: "#4d7a5f" });
    const curve = new CatmullRomCurve3([
      new Vector3(0, 0, 0),
      new Vector3(0.05, -1.2, -0.1),
      new Vector3(-0.15, -2.6, -0.2),
      new Vector3(0.1, -4.2, -0.3),
    ]);

    return { petals, leaf, stem: new TubeGeometry(curve, 24, 0.06, 8) };
  }, []);

  useEffect(() => () => {
    petals.forEach((petal) => petal.geo.dispose());
    leaf.dispose();
    stem.dispose();
  }, [petals, leaf, stem]);

 

useFrame((state, dt) => {
  const g = group.current;
  if (!g) return;

  const time = state.clock.elapsedTime;

  // Mouse pozitsiyasini silliq kuzatish
  const pointerX = state.pointer.x;
  const pointerY = state.pointer.y;

  const targetY =
    dragRotation.current.y +
    pointerX * 0.22 +
    time * 0.035;

  const targetX =
    dragRotation.current.x -
    pointerY * 0.12 +
    (hovered ? -0.015 : 0) +
    Math.sin(time * 0.45) * 0.012;

  // Nafis, sekin ergashish
  g.rotation.y = MathUtils.damp(
    g.rotation.y,
    targetY,
    1.8,
    dt
  );

  g.rotation.x = MathUtils.damp(
    g.rotation.x,
    targetX,
    1.8,
    dt
  );

  g.rotation.z = MathUtils.damp(
    g.rotation.z,
    hovered ? 0.012 : 0,
    1.2,
    dt
  );
});



  const petalMat = (
    <meshPhysicalMaterial
      vertexColors
      side={DoubleSide}
      roughness={0.48}
      sheen={1}
      sheenColor="#ffffff"
      sheenRoughness={0.45}
      emissive="#F3A99C"
      emissiveIntensity={hovered ? 0.2 : 0.09}
    />
  );

  return (
    <group ref={group} position={[0, 0.9, 0]}>
      <group rotation={[0.85, 0, 0]}>
        {petals.map((ring, ringIndex) =>
          Array.from({ length: ring.n }, (_, i) => (
            <group key={`${ringIndex}-${i}`} rotation={[0, ring.off + (i * Math.PI * 2) / ring.n, 0]}>
              <mesh geometry={ring.geo} rotation={[ring.tilt, 0, 0]}>{petalMat}</mesh>
            </group>
          ))
        )}

        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#D9EE83" roughness={0.5} emissive="#D9EE83" emissiveIntensity={hovered ? 0.55 : 0.25} />
        </mesh>

        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.3, 0.2, Math.sin(angle) * 0.3]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#F5F1E7" roughness={0.6} emissive="#F5F1E7" emissiveIntensity={hovered ? 0.35 : 0.08} />
            </mesh>
          );
        })}
      </group>

      <mesh geometry={stem}>
        <meshStandardMaterial color="#2f5d48" roughness={0.7} />
      </mesh>

      <mesh geometry={leaf} position={[-0.05, -1.7, -0.1]} rotation={[0.2, 1.2, -1.0]}>{petalMat}</mesh>
      <mesh geometry={leaf} position={[0.05, -2.7, -0.2]} rotation={[0.2, -1.2, 1.0]} scale={0.85}>{petalMat}</mesh>
    </group>
  );
}

export default function Flower3D({ active = true, onReady, hovered = false, dragRotation }) {
  const defaultRotation = useRef({ x: 0, y: 0 });
  const rotation = dragRotation ?? defaultRotation;

  return (
    <Canvas
      className="flower-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.3, 12], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      onCreated={() => onReady?.()}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[-4, 6, 5]} intensity={2.2} color="#fff3df" />
      <directionalLight position={[5, 2, -4]} intensity={1.2} color="#D0BDF5" />
      <pointLight position={[0, 1, 4]} intensity={hovered ? 10 : 7} distance={9} color="#F3A99C" />
      <pointLight position={[-2, 0, 2]} intensity={hovered ? 2.5 : 1.2} distance={6} color="#D0BDF5" />
      <Bloom dragRotation={rotation} hovered={hovered} />
    </Canvas>
  );
}
