"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { makeCupWrapTexture, makeSoftCircleTexture } from "./cupTextures";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

// Cup proportions (a stylised truncated cone).
const H = 1.3;
const R_TOP = 0.56;
const R_BOT = 0.39;
const IN_TOP = 0.53;
const IN_BOT = 0.365;
const IN_BOTTOM_Y = -H / 2 + 0.04; // interior floor (above the base disc)
const IN_TOP_Y = H / 2 - 0.015; // interior lip
const IN_H = IN_TOP_Y - IN_BOTTOM_Y;

/**
 * A branded paper cup that fills with espresso as `progressRef` (0→1) rises.
 * The espresso surface is a world-space clipping plane, so it stays level like
 * real liquid even while the cup rotates/tilts. Crema settles, steam lifts.
 */
export default function EspressoCup({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const crema = useRef<THREE.Mesh>(null);
  const steam = useRef<THREE.Group>(null);
  const shown = useRef(0);

  const wrap = useMemo(() => makeCupWrapTexture(), []);
  const soft = useMemo(() => makeSoftCircleTexture(), []);

  // Clipping plane for the espresso surface (world space, normal down → keeps
  // the volume BELOW the surface height). Mutated per-frame in useFrame — the
  // standard R3F pattern (react-hooks/immutability is disabled for this folder).
  const surfacePlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, -1, 0), IN_BOTTOM_Y),
    [],
  );

  const espressoMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#2a1206",
        roughness: 0.22,
        metalness: 0,
        clearcoat: 0.7,
        clearcoatRoughness: 0.35,
        clippingPlanes: [surfacePlane],
        clipShadows: true,
      }),
    [surfacePlane],
  );

  // Free the imperatively-created material + textures on unmount.
  useEffect(() => {
    return () => {
      espressoMat.dispose();
      wrap.dispose();
      soft.dispose();
    };
  }, [espressoMat, wrap, soft]);

  const steamSprites = useMemo(
    () => [
      { x: -0.12, phase: 0.0, speed: 0.6, scale: 0.5 },
      { x: 0.1, phase: 1.7, speed: 0.5, scale: 0.62 },
      { x: 0.0, phase: 3.1, speed: 0.7, scale: 0.44 },
    ],
    [],
  );

  useFrame((state, dt) => {
    const target = progressRef.current ?? 0;
    // Critically-damped follow for a premium, non-linear feel.
    shown.current += (target - shown.current) * Math.min(1, dt * 3.5);
    const p = shown.current;
    const t = state.clock.elapsedTime;

    // Fill: espresso pours over the middle of the scroll.
    const fill = range(p, 0.14, 0.62);
    surfacePlane.constant = IN_BOTTOM_Y + fill * IN_H;

    // Crema settles on the surface once there's enough coffee.
    const cremaIn = range(p, 0.5, 0.72);
    if (crema.current) {
      const surfaceY = IN_BOTTOM_Y + fill * IN_H;
      const surfaceR = THREE.MathUtils.lerp(IN_BOT, IN_TOP, fill);
      crema.current.position.y = surfaceY - 0.004;
      const s = cremaIn * 0.98;
      crema.current.scale.set(surfaceR * s, 1, surfaceR * s);
      crema.current.visible = cremaIn > 0.02;
    }

    // Steam lifts after it's brewed.
    const steamIn = range(p, 0.66, 0.9);
    if (steam.current) {
      steam.current.visible = steamIn > 0.02;
      steam.current.children.forEach((sprite, i) => {
        const cfg = steamSprites[i];
        const rise = ((t * cfg.speed + cfg.phase) % 2) / 2; // 0..1 loop
        sprite.position.y = IN_TOP_Y + 0.05 + rise * 0.95;
        sprite.position.x = cfg.x + Math.sin(t * 0.8 + cfg.phase) * 0.06;
        const fade = Math.sin(rise * Math.PI); // fade in+out over the rise
        const m = (sprite as THREE.Sprite).material as THREE.SpriteMaterial;
        m.opacity = fade * 0.5 * steamIn;
        const sc = cfg.scale * (0.6 + rise * 0.9);
        sprite.scale.set(sc, sc, sc);
      });
    }

    // Rotation: gentle idle spin + a progress-driven reveal + pointer parallax.
    if (group.current) {
      const px = state.pointer.x;
      const py = state.pointer.y;
      group.current.rotation.y = p * Math.PI * 1.35 + t * 0.12 + px * 0.35;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -py * 0.12 + 0.04,
        Math.min(1, dt * 4),
      );
      group.current.position.y = Math.sin(t * 0.7) * 0.015; // faint float
    }
  });

  return (
    <group ref={group}>
      {/* body */}
      <mesh castShadow>
        <cylinderGeometry args={[R_TOP, R_BOT, H, 96, 1, true]} />
        <meshStandardMaterial
          map={wrap}
          roughness={0.82}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* rolled rim */}
      <mesh position={[0, H / 2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[R_TOP, 0.022, 18, 96]} />
        <meshStandardMaterial color="#EFE7D6" roughness={0.7} />
      </mesh>

      {/* base disc */}
      <mesh position={[0, -H / 2 + 0.02, 0]}>
        <cylinderGeometry args={[R_BOT, R_BOT * 0.96, 0.04, 64]} />
        <meshStandardMaterial color="#E7DCC6" roughness={0.9} />
      </mesh>

      {/* interior liner (so we don't see through the open cup) */}
      <mesh>
        <cylinderGeometry args={[IN_TOP, IN_BOT, H - 0.02, 96, 1, true]} />
        <meshStandardMaterial
          color="#EFE7D6"
          roughness={0.95}
          side={THREE.BackSide}
        />
      </mesh>

      {/* espresso volume (clipped at the surface plane) */}
      <mesh
        position={[0, (IN_BOTTOM_Y + IN_TOP_Y) / 2, 0]}
        material={espressoMat}
      >
        <cylinderGeometry args={[IN_TOP, IN_BOT, IN_H, 96]} />
      </mesh>

      {/* crema */}
      <mesh ref={crema} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.012, 64]} />
        <meshStandardMaterial
          color="#c77f49"
          roughness={0.6}
          emissive="#5a2e12"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* steam */}
      <group ref={steam}>
        {steamSprites.map((_, i) => (
          <sprite key={i}>
            <spriteMaterial
              map={soft}
              transparent
              opacity={0}
              depthWrite={false}
              color="#ffffff"
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}
