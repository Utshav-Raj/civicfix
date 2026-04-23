"use client";

import { STATUS_META } from "@/lib/categories";
import { MOCK } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import { motion } from "framer-motion";

interface Item {
  id: string;
  title: string;
  time: string;
  status: string;
  message: string;
}

function buildItems(): Item[] {
  const updates = MOCK.statusUpdates
    .slice(-10)
    .reverse()
    .map((s) => {
      const r = MOCK.reports.find((x) => x.id === s.report_id);
      return {
        id: s.id,
        title: r?.title ?? "Report updated",
        time: s.created_at,
        status: s.new_status,
        message: s.admin_note ?? `Status changed to ${STATUS_META[s.new_status]?.label}`,
      };
    });
  return updates;
}

export function ActivityTimeline() {
  const items = buildItems();
  return (
    <div className="relative">
      <div className="absolute left-[14px] top-3 bottom-3 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
      <motion.div
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.06 } } }}
        className="space-y-4"
      >
        {items.map((i) => {
          const meta = STATUS_META[i.status] ?? STATUS_META.submitted;
          return (
            <motion.div
              key={i.id}
              variants={{
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
              }}
              className="relative pl-10"
            >
              <span
                className="absolute left-0 top-1 h-7 w-7 rounded-full flex items-center justify-center"
                style={{
                  background: meta.bg,
                  border: `1px solid ${meta.color}55`,
                  boxShadow: `0 0 12px ${meta.color}40`,
                }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: meta.color }}
                />
              </span>
              <div className="text-sm font-medium line-clamp-1">{i.title}</div>
              <div className="text-xs text-text-secondary line-clamp-1">
                {i.message}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">
                {formatRelativeTime(i.time)}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
