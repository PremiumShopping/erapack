"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
} from "@react-three/drei";
import { useConfigurator } from "@/store/configurator";
import { useFinePointer, useMediaQuery } from "@/lib/useMediaQuery";
import { drawCupArtwork, ART_W, ART_H, CUP_DIMS } from "@/lib/cupArtwork";

function Cup({ spin }: { spin: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const config = useConfigurator();
  const { size, baseColor, logoDataUrl } = config;
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);

  // Live wrap texture on an offscreen canvas.
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = ART_W;
    c.height = ART_H;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return { canvas: c, texture: tex };
  }, []);

  // load the uploaded logo (state is only set inside the async callback)
  useEffect(() => {
    if (!logoDataUrl) return;
    const img = new Image();
    img.onload = () => setLogoImg(img);
    img.src = logoDataUrl;
  }, [logoDataUrl]);

  // redraw whenever anything visual changes; if there's no logo now, draw none
  useEffect(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawCupArtwork(ctx, config, logoDataUrl ? logoImg : null);
    texture.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canvas,
    texture,
    logoImg,
    logoDataUrl,
    config.baseColor,
    config.logoScale,
    config.logoX,
    config.logoY,
    config.logoRotation,
    config.textLines,
  ]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((_, dt) => {
    if (spin && groupRef.current) groupRef.current.rotation.y += dt * 0.35;
  });

  const { H, rTop, rBot } = CUP_DIMS[size];
  const inTop = rTop * 0.95;
  const inBot = rBot * 0.95;

  return (
    <group ref={groupRef}>
      {/* body — printed wrap */}
      <mesh castShadow>
        <cylinderGeometry args={[rTop, rBot, H, 96, 1, true]} />
        <meshStandardMaterial map={texture} roughness={0.78} metalness={0} />
      </mesh>

      {/* interior liner */}
      <mesh>
        <cylinderGeometry args={[inTop, inBot, H - 0.02, 96, 1, true]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.95}
          side={THREE.BackSide}
        />
      </mesh>

      {/* rolled rim */}
      <mesh position={[0, H / 2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[rTop, 0.02, 16, 96]} />
        <meshStandardMaterial color={baseColor} roughness={0.6} />
      </mesh>

      {/* base disc */}
      <mesh position={[0, -H / 2 + 0.02, 0]}>
        <cylinderGeometry args={[rBot, rBot * 0.96, 0.04, 64]} />
        <meshStandardMaterial color={baseColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function ConfiguratorCanvas({
  onReady,
}: {
  onReady?: (gl: THREE.WebGLRenderer) => void;
}) {
  const fine = useFinePointer();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Nudge R3F to remeasure after mount (covers 0-size-at-mount edge cases).
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
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true, // needed for the lock snapshot
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.3, 3.6], fov: 32 }}
      onCreated={({ gl }) => onReady?.(gl)}
    >
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[3, 5, 2.5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <Suspense fallback={null}>
        <Cup spin={!fine} />
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={2.6}
            position={[2, 3, 3]}
            scale={[4, 4, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.8}
            position={[-3, 1, -2]}
            scale={[3, 3, 1]}
            color="#eafff0"
          />
        </Environment>
        <ContactShadows
          position={[0, -0.85, 0]}
          opacity={0.4}
          scale={6}
          blur={2.6}
          far={2.2}
          resolution={512}
          color="#0f1211"
        />
      </Suspense>

      {/* Manual orbit/zoom only on fine pointers — on touch the canvas keeps
          default touch-action so the page scrolls (the cup self-rotates). */}
      {fine && (
        <OrbitControls
          enablePan={false}
          minDistance={2.4}
          maxDistance={5.5}
          minPolarAngle={Math.PI * 0.15}
          maxPolarAngle={Math.PI * 0.82}
          enableDamping
          dampingFactor={0.08}
        />
      )}
    </Canvas>
  );
}
