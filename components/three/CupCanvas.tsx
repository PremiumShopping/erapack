"use client";

import { Suspense, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import EspressoCup from "./EspressoCup";

/**
 * The R3F stage for the espresso cup. Lighting is built from drei Lightformers
 * inside <Environment> — a studio look with NO external HDRI fetch, so it works
 * offline and respects the artifact-style "self-contained" constraint.
 */
export default function CupCanvas({
  progressRef,
  dpr = [1, 2],
}: {
  progressRef: RefObject<number>;
  dpr?: [number, number];
}) {
  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.42, 4], fov: 30 }}
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true;
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3.5, 5, 2.5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-3, 3, 3, -3, 0.1, 12]}
        />
      </directionalLight>

      <Suspense fallback={null}>
        <EspressoCup progressRef={progressRef} />

        <Environment resolution={256}>
          {/* key */}
          <Lightformer
            form="rect"
            intensity={3}
            position={[2, 3, 3]}
            scale={[4, 4, 1]}
            color="#fff4e6"
          />
          {/* cool rim from behind for separation on the dark backdrop */}
          <Lightformer
            form="rect"
            intensity={2.2}
            position={[-3, 1.5, -2]}
            scale={[3, 3, 1]}
            color="#ffd9b3"
          />
          {/* soft fill */}
          <Lightformer
            form="circle"
            intensity={1.4}
            position={[0, -2, 2]}
            scale={[3, 3, 1]}
            color="#c8a97e"
          />
        </Environment>

        <ContactShadows
          position={[0, -0.72, 0]}
          opacity={0.55}
          scale={6}
          blur={2.8}
          far={2.2}
          resolution={512}
          color="#0c0906"
        />
      </Suspense>
    </Canvas>
  );
}
