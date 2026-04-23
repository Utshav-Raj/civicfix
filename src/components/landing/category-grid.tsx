"use client";

import { CATEGORIES } from "@/lib/categories";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function CategoryGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <section id="categories" ref={ref} className="relative py-28 bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-civic-blue-glow mb-4">
            Categories
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Report{" "}
            <span className="gradient-text">any issue</span> in seconds
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            From potholes to power cuts — choose a category, add a photo, and
            let the community amplify your voice.
          </p>
        </motion.div>

        <motion.div
          variants={{ animate: { transition: { staggerChildren: 0.06 } } }}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.id}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -6,
                boxShadow: `0 0 0 1px ${c.accent}55, 0 20px 60px ${c.accent}30`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group rounded-2xl p-6 border border-white/5 bg-bg-surface relative overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(145deg, ${c.accentBg}, transparent 60%)`,
              }}
            >
              <div
                className="absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ background: c.accent }}
              />
              <div className="relative">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform group-hover:scale-110"
                  style={{ background: c.accentBg, border: `1px solid ${c.accent}40` }}
                >
                  {c.emoji}
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">
                  {c.label}
                </h3>
                <p className="text-sm text-text-secondary mb-5">
                  {c.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">
                    {(1200 + i * 340).toLocaleString()} issues
                  </span>
                  <Link
                    href={`/feed?category=${c.id}`}
                    className="inline-flex items-center gap-1 font-medium transition-colors"
                    style={{ color: c.accent }}
                  >
                    View Issues
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
