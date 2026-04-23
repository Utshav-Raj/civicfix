"use client";

import { CATEGORY_MAP, STATUS_META } from "@/lib/categories";
import { MOCK } from "@/lib/mock-data";
import { Report } from "@/lib/types";
import { ArrowUp, MapPin } from "lucide-react";

function TickerCard({ r }: { r: Report }) {
  const cat = CATEGORY_MAP[r.category];
  const status = STATUS_META[r.status];
  return (
    <div className="shrink-0 w-[320px] glass rounded-xl px-4 py-3 flex items-center gap-3">
      <div
        className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center text-xl"
        style={{ background: cat.accentBg, border: `1px solid ${cat.accent}40` }}
      >
        {cat.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium truncate">{r.title}</div>
        <div className="flex items-center gap-2 mt-1 text-[10px] text-text-secondary">
          <MapPin className="h-3 w-3" />
          {r.area}, {r.city}
          <span className="mx-1">•</span>
          <span style={{ color: status.color }}>{status.label}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-text-muted tabular-nums">
        <ArrowUp className="h-3.5 w-3.5 text-civic-orange" />
        {r.upvote_count}
      </div>
    </div>
  );
}

export function LiveTicker() {
  const rows = [...MOCK.reports].sort((a, b) => b.upvote_count - a.upvote_count).slice(0, 14);
  return (
    <section className="relative py-16 border-y border-white/5 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center gap-3">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-status-open shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-pulse" />
        <span className="text-xs uppercase tracking-[0.3em] text-text-secondary">
          Live feed across all cities
        </span>
      </div>
      <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
        {[...rows, ...rows].map((r, i) => (
          <TickerCard key={`${r.id}-${i}`} r={r} />
        ))}
      </div>
    </section>
  );
}
