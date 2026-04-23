"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";

const MiniMap = dynamic(
  () => import("./mini-map").then((m) => m.MiniMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-bg-surface animate-pulse" /> }
);

export function MapPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="map" ref={ref} className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between flex-wrap gap-6 mb-10"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-civic-blue-glow mb-3">
              Live map
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold max-w-xl">
              See your city,{" "}
              <span className="gradient-text">issue by issue</span>
            </h2>
          </div>
          <Link href="/feed">
            <Button variant="glass">
              Explore Live Map
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl overflow-hidden p-2 shadow-[0_40px_120px_rgba(59,130,246,0.15)]"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 mx-4 h-7 rounded-lg bg-bg-primary/60 border border-white/5 flex items-center px-3 text-xs text-text-muted">
              civicfix.app/map/bengaluru
            </div>
          </div>
          <div className="h-[420px] rounded-b-2xl overflow-hidden">
            <MiniMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
