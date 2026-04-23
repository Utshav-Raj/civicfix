"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Globe = dynamic(() => import("./globe").then((m) => m.Globe), {
  ssr: false,
  loading: () => null,
});
const ParticlesBg = dynamic(
  () => import("./particles-bg").then((m) => m.ParticlesBg),
  { ssr: false }
);

const HEADLINE_1 = "Your City Has a Voice.";
const HEADLINE_2 = "Make It Heard.";

function useCountUp(target: number, durationMs = 1600, run = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, run]);
  return val;
}

const floatingCards = [
  {
    emoji: "🚧",
    title: "Pothole on MG Road",
    status: "In Progress",
    color: "#F97316",
    top: "12%",
    right: "62%",
    delay: 0,
  },
  {
    emoji: "💧",
    title: "Water leak, Koramangala",
    status: "Under Review",
    color: "#3B82F6",
    top: "32%",
    right: "8%",
    delay: 0.6,
  },
  {
    emoji: "🗑️",
    title: "Garbage overflow",
    status: "Resolved",
    color: "#22C55E",
    top: "62%",
    right: "56%",
    delay: 1.1,
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(2847, 1500, inView);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] pt-28 pb-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ParticlesBg />
      </div>

      <div className="absolute right-[-6%] top-[10%] w-[620px] h-[620px] -z-10 hidden lg:block opacity-90">
        <Globe />
      </div>

      {/* Floating issue cards */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingCards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + c.delay * 0.3, duration: 0.6 }}
            style={{ top: c.top, right: c.right }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: c.delay,
              }}
              className="glass rounded-2xl p-3 pr-4 flex items-center gap-3 min-w-[220px]"
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: c.color + "22", border: `1px solid ${c.color}55` }}
              >
                {c.emoji}
              </div>
              <div>
                <div className="text-xs font-medium">{c.title}</div>
                <div
                  className="text-[10px] mt-0.5 font-semibold"
                  style={{ color: c.color }}
                >
                  • {c.status}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-civic-blue-glow animate-ping opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-civic-blue-glow" />
            </span>
            <Sparkles className="h-3 w-3 text-civic-blue-glow" />
            Civic Technology Platform
          </div>

          <h1 className="font-display font-bold leading-[0.95] tracking-tight text-[48px] sm:text-[64px] md:text-[80px]">
            <span className="inline-block text-text-primary">
              {HEADLINE_1.split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.15 + i * 0.1,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="gradient-text inline-block"
            >
              {HEADLINE_2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-6 text-lg text-text-secondary max-w-xl"
          >
            Report urban problems in seconds. Track every fix from submission to
            resolution. Hold your city accountable — with the full power of
            community data behind every issue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/report/new">
              <Button size="lg" className="group">
                Report an Issue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/feed">
              <Button size="lg" variant="glass">
                Explore Live Feed
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mt-10 flex items-center gap-3 text-sm"
          >
            <div className="flex -space-x-2">
              {[12, 33, 5, 44].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-bg-primary bg-bg-surface overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.pravatar.cc/80?img=${i}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-text-secondary">
              <span className="font-semibold text-text-primary tabular-nums">
                {count.toLocaleString()}
              </span>{" "}
              issues resolved this month
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
