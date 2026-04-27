"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-10 max-w-xl text-center border-civic-blue/20"
      >
        <div className="h-14 w-14 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-civic-blue/10 border border-civic-blue/20 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
          <Sparkles className="h-6 w-6 text-civic-blue-glow" />
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-civic-blue-glow mb-3">
          Coming in Phase 3
        </div>
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-text-secondary max-w-md mx-auto">{description}</p>
        <Link
          href="/dashboard"
          className="inline-flex mt-6 items-center gap-2 px-4 py-2 rounded-xl bg-civic-blue/15 border border-civic-blue/30 text-civic-blue-glow text-sm font-medium hover:bg-civic-blue/25 transition-colors"
        >
          ← Back to overview
        </Link>
      </motion.div>
    </div>
  );
}
