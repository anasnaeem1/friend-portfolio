"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function mulberry32(a) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function FogAndBackground({ backgroundHex, fogDensity }) {
  const { scene, gl } = useThree();
  useLayoutEffect(() => {
    const prevFog = scene.fog;
    const prevBg = scene.background;
    const bg = new THREE.Color(backgroundHex);
    scene.fog = new THREE.FogExp2(backgroundHex, fogDensity);
    scene.background = bg;
    gl.setClearColor(backgroundHex, 1);
    return () => {
      scene.fog = prevFog;
      scene.background = prevBg;
    };
  }, [scene, gl, backgroundHex, fogDensity]);
  return null;
}

function PulsingPointLight({ position, color, baseIntensity, phase = 0 }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.intensity = baseIntensity + 0.05 * Math.sin(t * 0.28 + phase);
  });
  return <pointLight ref={ref} position={position} color={color} distance={28} decay={2} />;
}

function SoftGlowPoints({ glowHex }) {
  const rnd = useMemo(() => mulberry32(90210), []);
  const points = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      x: (rnd() - 0.5) * 14,
      y: (rnd() - 0.5) * 8,
      z: -rnd() * 9 - 0.5,
      s: 0.55 + rnd() * 0.55,
      phase: rnd() * Math.PI * 2,
      hue: rnd() * 0.08,
    }));
  }, [rnd]);

  const mats = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    mats.current.forEach((mat, i) => {
      if (!mat) return;
      const ph = t * 0.32 + points[i].phase;
      mat.opacity = 0.06 + 0.055 * (0.5 + 0.5 * Math.sin(ph));
    });
  });

  return (
    <group key={glowHex}>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} scale={p.s}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial
            ref={(m) => {
              mats.current[i] = m;
            }}
            color={glowHex}
            transparent
            toneMapped={false}
            depthWrite={false}
            opacity={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function GentleCameraSway() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.04) * 0.06;
    camera.position.y = 0.12 + Math.sin(t * 0.031) * 0.04;
  });
  return null;
}

export default function HeroThreeScene({
  backgroundHex = 0xffffff,
  fogDensity = 0.032,
  ambientHex = 0xa89086,
  ambientIntensity = 0.12,
  lightWarm = 0xf0cdb9,
  lightWarmIntensity = 0.22,
  lightMid = 0x7a4a32,
  lightMidIntensity = 0.14,
  lightAccent = 0x6b3d2e,
  lightAccentIntensity = 0.08,
  glowHex = 0xf0cdb9,
}) {
  return (
    <>
      <FogAndBackground backgroundHex={backgroundHex} fogDensity={fogDensity} />
      <ambientLight color={ambientHex} intensity={ambientIntensity} />
      <PulsingPointLight position={[5.5, 2.8, 5]} color={lightWarm} baseIntensity={lightWarmIntensity} phase={0} />
      <PulsingPointLight position={[-5, -1.5, 4]} color={lightMid} baseIntensity={lightMidIntensity} phase={1.7} />
      <PulsingPointLight position={[0, 4, -2]} color={lightAccent} baseIntensity={lightAccentIntensity} phase={3.1} />
      <SoftGlowPoints glowHex={glowHex} />
      <GentleCameraSway />
    </>
  );
}
