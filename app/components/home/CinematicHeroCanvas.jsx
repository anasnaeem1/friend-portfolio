"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Suspense, useLayoutEffect, useState } from "react";
import * as THREE from "three";
import HeroThreeScene from "./HeroThreeScene";

import { CLASS_LIGHT } from "@/lib/theme";

function readCssHex(varName, fallback) {
  const color = new THREE.Color();
  try {
    if (typeof window === "undefined") {
      color.setStyle(fallback);
      return color.getHex();
    }
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    color.setStyle(raw || fallback);
    return color.getHex();
  } catch {
    color.setStyle(fallback);
    return color.getHex();
  }
}

function isLightTheme() {
  if (typeof window === "undefined") return false;
  return document.documentElement.classList.contains(CLASS_LIGHT);
}

/**
 * Maps `globals.css` `html.theme-light` / `html.theme-dark` tokens into scene colors.
 * Light branch follows cream / mist / peach / dust / brown from the light theme block.
 */
function readThemeSceneColors() {
  if (isLightTheme()) {
    return {
      backgroundHex: readCssHex("--scheme-canvas", "#faf8f6"),
      ambientHex: readCssHex("--palette-mist", "#f3f0ec"),
      ambientIntensity: 0.22,
      lightWarm: readCssHex("--palette-peach", "#f0cdb9"),
      lightMid: readCssHex("--palette-dust", "#a89086"),
      lightAccent: readCssHex("--scheme-accent", "#6b3d2e"),
      glowHex: readCssHex("--palette-peach", "#f0cdb9"),
      fogDensity: 0.018,
      lightWarmIntensity: 0.2,
      lightMidIntensity: 0.12,
      lightAccentIntensity: 0.07,
    };
  }

  return {
    backgroundHex: readCssHex("--scheme-canvas", "#141414"),
    ambientHex: readCssHex("--scheme-body-muted", "#f0cdb9"),
    ambientIntensity: 0.12,
    lightWarm: readCssHex("--scheme-on-accent", "#f0cdb9"),
    lightMid: readCssHex("--scheme-accent-2", "#7b3f24"),
    lightAccent: readCssHex("--scheme-accent", "#813e21"),
    glowHex: readCssHex("--scheme-on-accent", "#f0cdb9"),
    fogDensity: 0.034,
    lightWarmIntensity: 0.22,
    lightMidIntensity: 0.14,
    lightAccentIntensity: 0.08,
  };
}

function CanvasFallback() {
  return <div className="absolute inset-0 bg-scheme-canvas" aria-hidden />;
}

export default function CinematicHeroCanvas() {
  const [ready, setReady] = useState(false);
  const [scene, setScene] = useState(() => readThemeSceneColors());

  useLayoutEffect(() => {
    const root = document.documentElement;
    const sync = () => setScene(readThemeSceneColors());

    sync();
    setReady(true);

    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("storage", sync);

    return () => {
      mo.disconnect();
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!ready) {
    return <CanvasFallback />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 min-h-full w-full bg-scheme-canvas">
      <Canvas
        className="h-full w-full"
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          depth: true,
          powerPreference: "default",
        }}
        camera={{ fov: 40, position: [0, 0.12, 9], near: 0.1, far: 48 }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr />
          <HeroThreeScene
            backgroundHex={scene.backgroundHex}
            fogDensity={scene.fogDensity}
            ambientHex={scene.ambientHex}
            ambientIntensity={scene.ambientIntensity}
            lightWarm={scene.lightWarm}
            lightWarmIntensity={scene.lightWarmIntensity}
            lightMid={scene.lightMid}
            lightMidIntensity={scene.lightMidIntensity}
            lightAccent={scene.lightAccent}
            lightAccentIntensity={scene.lightAccentIntensity}
            glowHex={scene.glowHex}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
