"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fpsLimit: 60,
  background: { color: "transparent" },
  fullScreen: { enable: false },
  particles: {
    number: { value: 50, density: { enable: true } },
    color: { value: ["#60A5FA", "#8B5CF6", "#F97316"] },
    links: {
      enable: true,
      color: "#3B82F6",
      distance: 140,
      opacity: 0.18,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      random: true,
      outModes: { default: "bounce" },
    },
    opacity: { value: 0.55 },
    size: { value: { min: 1, max: 2.5 } },
  },
  detectRetina: true,
};

export function ParticlesBg() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);
  if (!ready) return null;
  return (
    <Particles
      id="landing-particles"
      options={options}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
