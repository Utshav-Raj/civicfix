import { STATUS_META, CATEGORY_MAP } from "@/lib/categories";
import { getCommentsForReport, getReport, getStatusUpdatesForReport } from "@/lib/data-layer";
import { MOCK } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import { ArrowUp, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusPill } from "@/components/ui/status-pill";

export function generateStaticParams() {
  return MOCK.reports.map((r) => ({ id: r.id }));
}

export default async function ReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const report = await getReport(params.id);
  if (!report) return notFound();
  const cat = CATEGORY_MAP[report.category];
  const status = STATUS_META[report.status];
  const updates = await getStatusUpdatesForReport(report.id);
  const comments = await getCommentsForReport(report.id);

  const STEPS: { key: string; label: string }[] = [
    { key: "submitted", label: "Submitted" },
    { key: "under_review", label: "Under Review" },
    { key: "in_progress", label: "In Progress" },
    { key: "resolved", label: "Resolved" },
  ];
  const currentIdx = Math.max(
    0,
    STEPS.findIndex((s) => s.key === report.status)
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative h-[42vh] min-h-[320px] overflow-hidden"
        style={{
          background: report.photos[0]
            ? `url(${report.photos[0]}) center/cover`
            : cat.accentBg,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/30 to-bg-primary" />
        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-10">
          <nav className="text-xs text-text-secondary mb-4 flex items-center gap-2">
            <Link href="/feed" className="hover:text-text-primary">Feed</Link>
            <span>/</span>
            <Link href={`/feed?category=${report.category}`} className="hover:text-text-primary capitalize">
              {cat.label}
            </Link>
            <span>/</span>
            <span className="text-text-primary">#{report.id.slice(-6).toUpperCase()}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <StatusPill status={report.status} />
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
              style={{ background: cat.accentBg, color: cat.accent, border: `1px solid ${cat.accent}50` }}
            >
              {cat.emoji} {cat.label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
              <MapPin className="h-3.5 w-3.5" />
              {report.address}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold max-w-4xl leading-tight">
            {report.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-3">Description</h2>
            <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
              {report.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-civic-orange/10 text-civic-orange border border-civic-orange/30 px-4 py-2 text-sm hover:bg-civic-orange/20 transition-colors">
                <ArrowUp className="h-4 w-4" />
                Upvote · {report.upvote_count}
              </button>
              <div className="inline-flex items-center gap-2 text-sm text-text-secondary">
                <MessageSquare className="h-4 w-4" />
                {report.comment_count} comments
              </div>
            </div>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">
              Comments ({comments.length})
            </h2>
            {comments.length === 0 ? (
              <div className="text-sm text-text-muted">
                No comments yet. Be the first to weigh in.
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.user_avatar ?? "https://i.pravatar.cc/80"}
                      alt=""
                      className="h-9 w-9 rounded-full border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="font-semibold text-text-primary">
                          {c.user_name}
                        </span>
                        {c.is_official && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-civic-blue/20 text-civic-blue-glow border border-civic-blue/40">
                            Official
                          </span>
                        )}
                        <span>·</span>
                        <span>{formatRelativeTime(c.created_at)}</span>
                      </div>
                      <p className="mt-1 text-sm">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
              Current Status
            </div>
            <div
              className="text-xl font-display font-bold mb-4"
              style={{ color: status.color }}
            >
              {status.label}
            </div>

            <ol className="relative space-y-4">
              <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-white/5" />
              {STEPS.map((s, i) => {
                const done = i < currentIdx;
                const current = i === currentIdx;
                const update = updates.find((u) => u.new_status === s.key);
                const c = STATUS_META[s.key]?.color ?? "#94A3B8";
                return (
                  <li key={s.key} className="relative pl-8">
                    <span
                      className={`absolute left-0 top-0.5 h-6 w-6 rounded-full flex items-center justify-center ${
                        done
                          ? "bg-civic-teal"
                          : current
                          ? "bg-bg-surface border-2 animate-pulse"
                          : "bg-bg-surface border border-white/10"
                      }`}
                      style={{
                        borderColor: current ? c : undefined,
                        boxShadow: current ? `0 0 14px ${c}55` : undefined,
                      }}
                    >
                      {done && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="text-white"
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                    <div className={`text-sm font-semibold ${done || current ? "text-text-primary" : "text-text-muted"}`}>
                      {s.label}
                    </div>
                    {update && (
                      <div className="text-[11px] text-text-muted mt-0.5">
                        {formatRelativeTime(update.created_at)}
                        {update.admin_note && (
                          <div className="text-text-secondary mt-1">{update.admin_note}</div>
                        )}
                      </div>
                    )}
                    {current && (
                      <div className="text-[11px] text-civic-blue-glow mt-1 font-medium">
                        Currently here
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-text-muted mb-3">
              Issue stats
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="Upvotes" value={report.upvote_count} />
              <Stat label="Views" value={report.view_count} />
              <Stat label="Comments" value={report.comment_count} />
              <Stat label="Priority" value={Math.round(report.priority_score)} />
            </div>
          </section>

          {report.department && (
            <section className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
                Assigned Department
              </div>
              <div className="font-semibold">{report.department}</div>
              {report.assigned_officer && (
                <div className="text-sm text-text-secondary mt-1">
                  {report.assigned_officer}
                </div>
              )}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-bg-surface/60 border border-white/5 p-3">
      <div className="text-[11px] text-text-muted uppercase tracking-wider">{label}</div>
      <div className="text-lg font-display font-bold tabular-nums">{value}</div>
    </div>
  );
}
