"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { compactNumber } from "@/lib/utils";

const STATS = [
  { label: "Issues Reported", value: 127483, suffix: "", format: (n: number) => n.toLocaleString() },
  { label: "Issues Resolved", value: 94211, suffix: "", format: (n: number) => n.toLocaleString() },
  { label: "Resolution Rate", value: 74, suffix: "%", format: (n: number) => n.toString() },
  { label: "Cities Active", value: 48, suffix: "", format: (n: number) => n.toString() },
];

function useCount(target: number, run: boolean, durationMs = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf: number;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, durationMs]);
  return val;
}

function Stat({ label, value, suffix, format, run }: (typeof STATS)[number] & { run: boolean }) {
  const v = useCount(value, run);
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }}
      className="relative"
    >
      <div className="text-4xl sm:text-5xl font-display font-bold tabular-nums gradient-text-blue">
        {format(v)}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-text-secondary uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <section ref={ref} className="relative py-16 border-y border-white/5 bg-bg-secondary/40">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <motion.div
        initial="initial"
        animate={inView ? "animate" : "initial"}
        variants={{
          animate: { transition: { staggerChildren: 0.12 } },
        }}
        className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {STATS.map((s) => (
          <Stat key={s.label} {...s} run={inView} />
        ))}
      </motion.div>
    </section>
  );
}

export { compactNumber };
