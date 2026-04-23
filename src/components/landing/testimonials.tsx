"use client";

import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Priya Iyer",
    city: "Bengaluru",
    avatar: "https://i.pravatar.cc/120?img=5",
    quote:
      "The pothole outside my daughter's school was fixed within 4 days of reporting. I've never seen anything move this fast from BBMP.",
    rating: 5,
  },
  {
    name: "Rahul Menon",
    city: "Mumbai",
    avatar: "https://i.pravatar.cc/120?img=13",
    quote:
      "Water logging in our lane every monsoon — finally solved. CivicFix pooled 240 neighbours into one report. Authorities couldn't ignore it.",
    rating: 5,
  },
  {
    name: "Sana Khan",
    city: "Delhi",
    avatar: "https://i.pravatar.cc/120?img=47",
    quote:
      "The transparency is unreal. I can see exactly which officer is on my case and when they last updated. Civic tech done right.",
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section ref={ref} className="relative py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-civic-blue-glow mb-3">
            Trusted by citizens
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Real stories,{" "}
            <span className="gradient-text">real impact</span>
          </h2>
        </motion.div>

        <div
          className="relative h-[280px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={false}
              animate={{
                opacity: idx === i ? 1 : 0,
                y: idx === i ? 0 : 20,
                scale: idx === i ? 1 : 0.98,
              }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-10 absolute inset-0 flex flex-col justify-center"
              style={{ pointerEvents: idx === i ? "auto" : "none" }}
            >
              <div className="flex gap-1 mb-4 text-civic-orange">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xl md:text-2xl font-display leading-relaxed mb-8">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-12 w-12 rounded-full border border-white/10"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-text-muted">{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "bg-civic-blue w-8" : "bg-white/15 w-2 hover:bg-white/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
