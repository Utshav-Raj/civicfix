"use client";

import { motion, useInView } from "framer-motion";
import { Camera, MapPin, Megaphone } from "lucide-react";
import { useRef } from "react";

const STEPS = [
  {
    icon: Camera,
    title: "Capture & Describe",
    description:
      "Snap a photo, pin the location on the map, and tell us what's wrong. Takes 30 seconds, no jargon needed.",
    color: "#3B82F6",
  },
  {
    icon: Megaphone,
    title: "Community Amplifies",
    description:
      "Your neighbours upvote and comment. Issues trend in your city — authorities can't miss them.",
    color: "#F97316",
  },
  {
    icon: MapPin,
    title: "Track Until Fixed",
    description:
      "Watch every status change live: Under Review → In Progress → Resolved. Full transparency, always.",
    color: "#8B5CF6",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <section id="how" ref={ref} className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-civic-blue-glow mb-4">
            How it works
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Three steps between{" "}
            <span className="gradient-text">problem and resolution</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated dashed line */}
          <svg
            className="absolute top-16 left-0 right-0 w-full h-2 hidden md:block pointer-events-none"
            viewBox="0 0 1200 2"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="100"
              y1="1"
              x2="1100"
              y2="1"
              stroke="url(#sg)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="sg">
                <stop stopColor="#3B82F6" />
                <stop offset="0.5" stopColor="#F97316" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            variants={{
              animate: { transition: { staggerChildren: 0.18 } },
            }}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            className="grid md:grid-cols-3 gap-6 relative"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                variants={{
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-8 relative"
              >
                <div
                  className="absolute -top-3 right-5 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: step.color,
                    boxShadow: `0 0 20px ${step.color}60`,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}40, ${step.color}10)`,
                    border: `1px solid ${step.color}40`,
                  }}
                >
                  <step.icon
                    className="h-7 w-7"
                    style={{ color: step.color }}
                  />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
