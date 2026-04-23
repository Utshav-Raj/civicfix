"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, MapPin, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ACTIONS = [
  { label: "Quick photo report", icon: Camera, href: "/report/new?mode=photo" },
  { label: "Pin on map", icon: MapPin, href: "/report/new?mode=map" },
  { label: "Full wizard", icon: Sparkles, href: "/report/new" },
];

export function FAB() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
            className="flex flex-col items-end gap-2"
          >
            {ACTIONS.map((a) => (
              <motion.div
                key={a.label}
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
              >
                <Link
                  href={a.href}
                  className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium hover:border-civic-blue transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <a.icon className="h-4 w-4 text-civic-blue-glow" />
                  {a.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={{
          rotate: open ? 45 : 0,
        }}
        onClick={() => setOpen((s) => !s)}
        aria-label="Report new issue"
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-civic-orange to-[#EA580C] flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.5),0_0_60px_rgba(249,115,22,0.2)]"
      >
        <Plus className="h-6 w-6 text-white" strokeWidth={2.5} />
        {!open && (
          <span className="absolute inset-0 rounded-full border-2 border-civic-orange-glow animate-ping opacity-40" />
        )}
      </motion.button>
    </div>
  );
}
