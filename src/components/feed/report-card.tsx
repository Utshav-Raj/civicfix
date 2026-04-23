"use client";

import { CATEGORY_MAP } from "@/lib/categories";
import { upvoteReport } from "@/lib/data-layer";
import { Report } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUp, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { StatusPill } from "../ui/status-pill";
import { MOCK } from "@/lib/mock-data";

export function ReportCard({ r }: { r: Report }) {
  const cat = CATEGORY_MAP[r.category];
  const [upvoted, setUpvoted] = useState(false);
  const [count, setCount] = useState(r.upvote_count);
  const author = MOCK.users.find((u) => u.id === r.user_id);

  async function toggleUpvote(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setUpvoted((u) => !u);
    setCount((c) => c + (upvoted ? -1 : 1));
    await upvoteReport(r.id, upvoted);
  }

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 0 0 1px rgba(99,179,237,0.3), 0 20px 60px rgba(59,130,246,0.2)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group rounded-2xl overflow-hidden border border-white/5 bg-bg-secondary/60 hover:border-white/20 transition-all"
    >
      <Link href={`/report/${r.id}`} className="block">
        <div
          className="h-1"
          style={{
            background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}88, transparent)`,
          }}
        />
        {r.photos[0] ? (
          <div className="relative h-40 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.photos[0]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <StatusPill status={r.status} />
            </div>
            <div
              className="absolute top-3 right-3 h-9 w-9 rounded-xl flex items-center justify-center text-lg backdrop-blur-sm"
              style={{ background: cat.accentBg, border: `1px solid ${cat.accent}55` }}
            >
              {cat.emoji}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          <div
            className="h-28 flex items-center justify-center relative"
            style={{ background: `linear-gradient(145deg, ${cat.accentBg}, transparent 70%)` }}
          >
            <span className="text-5xl opacity-90">{cat.emoji}</span>
            <div className="absolute top-3 left-3">
              <StatusPill status={r.status} />
            </div>
          </div>
        )}
        <div className="p-5">
          <h3 className="font-display font-semibold text-base leading-tight line-clamp-2 mb-2">
            {r.title}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-3 mb-4">
            {r.description}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-text-muted mb-3">
            <MapPin className="h-3 w-3" />
            {r.area}, {r.city}
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-white/5">
            {author && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={author.avatar_url}
                alt=""
                className="h-6 w-6 rounded-full border border-white/10"
              />
            )}
            <div className="text-[11px] text-text-muted flex-1 min-w-0">
              <span className="font-medium text-text-secondary truncate">
                {author?.full_name ?? "Citizen"}
              </span>
              <span className="mx-1.5">·</span>
              {formatRelativeTime(r.created_at)}
            </div>
            <button
              type="button"
              onClick={toggleUpvote}
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-all ${
                upvoted
                  ? "bg-civic-orange/20 text-civic-orange border border-civic-orange/40"
                  : "text-text-secondary hover:bg-white/5"
              }`}
            >
              <motion.span
                animate={upvoted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </motion.span>
              <span className="tabular-nums">{count}</span>
            </button>
            <div className="inline-flex items-center gap-1 text-[11px] text-text-muted">
              <MessageSquare className="h-3 w-3" />
              {r.comment_count}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
