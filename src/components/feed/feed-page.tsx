"use client";

import { Navbar } from "@/components/landing/navbar";
import { getReports, getTrendingReport } from "@/lib/data-layer";
import { Category, Report, Status } from "@/lib/types";
import { motion } from "framer-motion";
import { Flame, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FeedFilters, SortOption } from "./filters";
import { ReportCard } from "./report-card";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-bg-secondary/60 h-[320px] relative overflow-hidden">
      <div className="absolute inset-0 shimmer" />
    </div>
  );
}

export function CommunityFeedPage() {
  const params = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">(
    (params.get("category") as Category | null) ?? "all"
  );
  const [status, setStatus] = useState<Status | "all">("all");
  const [sort, setSort] = useState<SortOption>("recent");
  const [reports, setReports] = useState<Report[] | null>(null);
  const [trending, setTrending] = useState<Report | null>(null);
  const [trendingDismissed, setTrendingDismissed] = useState(false);
  const [loadLimit, setLoadLimit] = useState(12);

  useEffect(() => {
    setReports(null);
    getReports({ search, category, status, sort: sort === "nearest" ? "recent" : sort }).then((r) =>
      setReports(r)
    );
  }, [search, category, status, sort]);

  useEffect(() => {
    getTrendingReport().then((r) => setTrending(r));
  }, []);

  const visible = useMemo(() => reports?.slice(0, loadLimit) ?? [], [reports, loadLimit]);
  const hasMore = (reports?.length ?? 0) > loadLimit;

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        setLoadLimit((n) => n + 12);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-end justify-between flex-wrap gap-4"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-civic-blue-glow mb-2">
                <Sparkles className="inline h-3 w-3 mr-1" />
                Community feed
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                Every issue. Every citizen. <span className="gradient-text">Fully public.</span>
              </h1>
              <p className="text-text-secondary mt-2 max-w-2xl">
                Browse real reports from your city. Upvote to amplify, comment to rally neighbours, and track resolution live.
              </p>
            </div>
          </motion.div>

          {trending && !trendingDismissed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative glass rounded-2xl px-5 py-4 mb-6 flex items-center gap-4 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 bg-civic-orange/30 rounded-full blur-3xl" />
              <div className="h-10 w-10 rounded-xl bg-civic-orange/20 border border-civic-orange/40 flex items-center justify-center shrink-0 relative">
                <Flame className="h-5 w-5 text-civic-orange" />
              </div>
              <div className="flex-1 min-w-0 relative">
                <div className="text-xs font-semibold text-civic-orange uppercase tracking-wider">
                  Trending in {trending.city}
                </div>
                <div className="text-sm font-medium truncate">
                  {trending.title} ·{" "}
                  <span className="text-text-muted">{trending.upvote_count} upvotes</span>
                </div>
              </div>
              <Link
                href={`/report/${trending.id}`}
                className="hidden sm:inline text-xs text-civic-blue-glow hover:underline relative"
              >
                View →
              </Link>
              <button
                onClick={() => setTrendingDismissed(true)}
                className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-text-muted relative"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          <FeedFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
            sort={sort}
            setSort={setSort}
          />

          <motion.div
            key={`${search}-${category}-${status}-${sort}`}
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
          >
            {reports === null ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : visible.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-bold mb-2">No issues found</h3>
                <p className="text-text-secondary mb-6">
                  Try widening your filters — or be the first to report a new issue.
                </p>
                <Link href="/report/new" className="inline-flex items-center rounded-xl bg-civic-orange px-5 py-2.5 text-sm font-medium text-white">
                  Report an issue
                </Link>
              </div>
            ) : (
              visible.map((r) => <ReportCard key={r.id} r={r} />)
            )}
          </motion.div>

          {hasMore && reports !== null && (
            <div className="mt-8 text-center text-xs text-text-muted">
              Loading more…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
