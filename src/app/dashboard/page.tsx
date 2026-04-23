"use client";

import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { DashboardMap } from "@/components/dashboard/dashboard-map";
import { MiniReportCard } from "@/components/dashboard/mini-report-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { MOCK } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader, ThumbsUp, AlertCircle } from "lucide-react";
import Link from "next/link";

function greetingFor(date: Date) {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const user = MOCK.currentUser;
  const my = MOCK.reports.filter((r) => r.user_id === user.id);
  const myOpen = my.filter((r) => r.status !== "resolved" && r.status !== "rejected");
  const myInProgress = my.filter((r) => r.status === "in_progress");
  const myResolved = my.filter((r) => r.status === "resolved");

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const sparkA = [8, 10, 9, 11, 13, 12, 14, 15, 18, 16, 19, 22];
  const sparkB = [5, 7, 6, 9, 8, 11, 10, 14, 13, 16, 18, 20];
  const sparkC = [2, 3, 3, 5, 4, 6, 8, 7, 10, 12, 11, 14];
  const sparkD = [30, 35, 32, 38, 40, 42, 45, 48, 46, 50, 52, 55];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-civic-blue/20 blur-3xl" />
        <div className="absolute -bottom-10 left-20 h-40 w-40 rounded-full bg-civic-purple/15 blur-3xl" />
        <div className="relative flex flex-wrap gap-4 items-start justify-between">
          <div>
            <div className="text-xs text-text-secondary uppercase tracking-widest mb-2">
              {dateStr}
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              {greetingFor(now)}, {user.full_name.split(" ")[0]} 👋
            </h1>
            <p className="mt-2 text-text-secondary max-w-lg">
              You have <span className="text-civic-orange font-semibold">{myOpen.length} active reports</span>.
              Two of them trended in your area this week — citizens in Koramangala need your voice.
            </p>
          </div>
          <Link
            href="/report/new"
            className="inline-flex items-center gap-2 glass rounded-xl px-4 py-2.5 text-sm font-medium hover:border-civic-orange transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-civic-orange animate-pulse" />
            Report a new issue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="My Open Reports"
          value={myOpen.length}
          trend={12.4}
          icon={AlertCircle}
          color="#EF4444"
          sparkline={sparkA}
        />
        <StatCard
          label="In Progress"
          value={myInProgress.length}
          trend={4.1}
          icon={Loader}
          color="#3B82F6"
          sparkline={sparkB}
        />
        <StatCard
          label="Resolved"
          value={myResolved.length}
          trend={18.2}
          icon={CheckCircle2}
          color="#22C55E"
          sparkline={sparkC}
        />
        <StatCard
          label="Upvotes Given"
          value={user.upvotes_given}
          trend={6.3}
          icon={ThumbsUp}
          color="#8B5CF6"
          sparkline={sparkD}
        />
      </section>

      <section className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3 min-h-[460px]">
          <DashboardMap />
        </div>
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-lg font-semibold">Activity</h3>
              <p className="text-xs text-text-muted">Latest status updates across your reports</p>
            </div>
          </div>
          <ActivityTimeline />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-semibold">Your recent reports</h3>
            <p className="text-xs text-text-muted">Track them from submission to resolution</p>
          </div>
          <Link
            href="/dashboard/my-reports"
            className="text-xs text-civic-blue-glow hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
          {my.slice(0, 8).map((r) => (
            <div key={r.id} className="snap-start">
              <MiniReportCard r={r} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
