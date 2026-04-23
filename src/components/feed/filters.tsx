"use client";

import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/categories";
import { Category, Status } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export type SortOption = "recent" | "most_upvoted" | "trending" | "nearest";
export type StatusFilter = Status | "all";

export function FeedFilters({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  sort,
  setSort,
}: {
  search: string;
  setSearch: (v: string) => void;
  category: Category | "all";
  setCategory: (c: Category | "all") => void;
  status: StatusFilter;
  setStatus: (s: StatusFilter) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
}) {
  return (
    <div className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-xl -mx-6 px-6 py-5 border-b border-white/5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[260px]">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Search issues, areas, keywords…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          className="h-11 rounded-xl bg-bg-surface/80 border border-white/5 px-4 text-sm focus:outline-none focus:border-civic-blue"
        >
          <option value="all">All statuses</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="h-11 rounded-xl bg-bg-surface/80 border border-white/5 px-4 text-sm focus:outline-none focus:border-civic-blue"
        >
          <option value="recent">Most Recent</option>
          <option value="most_upvoted">Most Upvoted</option>
          <option value="trending">Trending</option>
          <option value="nearest">Near Me</option>
        </select>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 -mx-6 px-6">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          All
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            active={category === c.id}
            color={c.accent}
            onClick={() => setCategory(c.id)}
          >
            <span>{c.emoji}</span>
            <span>{c.label}</span>
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all",
        active
          ? "text-text-primary"
          : "text-text-secondary hover:text-text-primary border-white/10 bg-bg-surface/50"
      )}
      style={{
        background: active ? (color ? color + "22" : "rgba(59,130,246,0.18)") : undefined,
        borderColor: active ? (color ?? "#60A5FA") + "66" : undefined,
        boxShadow: active ? `0 0 0 1px ${(color ?? "#60A5FA") + "44"}` : undefined,
      }}
    >
      {children}
    </button>
  );
}
