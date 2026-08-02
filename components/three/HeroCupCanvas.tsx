"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
} from "@react-three/drei";
import {
  useFinePointer,
  usePrefersReducedMotion,
  useMediaQuery,
} from "@/lib/useMediaQuery";

/** Branded hero cup wrap: white paper, electric-green band, repeated wordmark. */
function makeHeroTexture() {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // hairlines
  ctx.fillStyle = "rgba(15,18,17,0.08)";
  ctx.fillRect(0, h * 0.22, w, 2);
  ctx.fillRect(0, h * 0.78 - 2, w, 2);

  // green band
  const bandY = h * 0.37;
  const bandH = h * 0.26;
  ctx.fillStyle = "#39ff14";
  ctx.fillRect(0, bandY, w, bandH);

  // repeated wordmark on the band
  ctx.fillStyle = "#0f1211";
  ctx.font = "800 58px Assistant, ui-sans-serif, sans-serif";
  ctx.textBaseline = "middle";
  const unit = "ERA PACK      YOUR BRAND      ";
  const uw = ctx.measureText(unit).width;
  const midY = bandY + bandH / 2;
  for (let x = 0; x < w + uw; x += uw) ctx.fillText(unit, x, midY);

  // small strapline under the band
  ctx.fillStyle = "rgba(15,18,17,0.5)";
  ctx.font = "700 24px Assistant, ui-sans-serif, sans-serif";
  ctx.fillText("FULL-COLOUR · UK FACTORY-DIRECT", 44, h * 0.86);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function Cup({ spin }: { spin: boolean }) {
  const g = useRef<THREE.Group>(null);
  const tex = useMemo(() => makeHeroTexture(), []);
  useEffect(() => () => tex.dispose(), [tex]);

  useFrame((_, dt) => {
    if (spin && g.current) g.current.rotation.y += dt * 0.3;
  });

  const H = 1.4;
  const rTop = 0.56;
  const rBot = 0.4;

  return (
    <group ref={g} rotation={[0.06, 0.5, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[rTop, rBot, H, 96, 1, true]} />
        <meshStandardMaterial map={tex} roughness={0.74} metalness={0} />
      </mesh>
      <mesh>
        <cylinderGeometry
          args={[rTop * 0.95, rBot * 0.95, H - 0.02, 96, 1, true]}
        />
        <meshStandardMaterial
          color="#f3f3ef"
          roughness={0.95}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0, H / 2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[rTop, 0.02, 16, 96]} />
        <meshStandardMaterial color="#ffffff" roughness={0.55} />
      </mesh>
      <mesh position={[0, -H / 2 + 0.02, 0]}>
        <cylinderGeometry args={[rBot, rBot * 0.96, 0.04, 64]} />
        <meshStandardMaterial color="#ededea" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function HeroCupCanvas() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => window.dispatchEvent(new Event("resize"))),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Canvas
      shadows
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.3, 3.9], fov: 32 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[3, 5, 2.5]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <Suspense fallback={null}>
        <Cup spin={!reduced} />
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[2, 3, 3]}
            scale={[4, 4, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[-3, 1, -2]}
            scale={[3, 3, 1]}
            color="#eafff0"
          />
        </Environment>
        <ContactShadows
          position={[0, -0.82, 0]}
          opacity={0.32}
          scale={6}
          blur={2.6}
          far={2.2}
          resolution={512}
          color="#0f1211"
        />
      </Suspense>

      {/* Orbit (no zoom, so the page still scrolls) on fine pointers only. */}
      {fine && !reduced && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI * 0.34}
          maxPolarAngle={Math.PI * 0.62}
          enableDamping
          dampingFactor={0.08}
        />
      )}
    </Canvas>
  );
}
