"use client";

import { CATEGORY_MAP } from "@/lib/categories";
import { Report } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import Link from "next/link";
import { StatusPill } from "../ui/status-pill";
import { motion } from "framer-motion";

export function MiniReportCard({ r }: { r: Report }) {
  const cat = CATEGORY_MAP[r.category];
  return (
    <motion.div whileHover={{ y: -4 }} className="shrink-0 w-[280px]">
      <Link
        href={`/report/${r.id}`}
        className="block glass rounded-2xl overflow-hidden hover:border-civic-blue transition-all"
      >
        {r.photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={r.photos[0]}
            alt=""
            className="w-full h-28 object-cover"
          />
        ) : (
          <div
            className="w-full h-28 flex items-center justify-center text-4xl"
            style={{ background: cat.accentBg }}
          >
            {cat.emoji}
          </div>
        )}
        <div className="p-4">
          <StatusPill status={r.status} />
          <div className="mt-2 text-sm font-medium line-clamp-2">{r.title}</div>
          <div className="mt-3 text-[11px] text-text-muted flex items-center justify-between">
            <span>{r.area}</span>
            <span>{formatRelativeTime(r.created_at)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
