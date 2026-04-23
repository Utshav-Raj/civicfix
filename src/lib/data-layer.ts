/**
 * Swappable data layer. Today it returns in-memory mock data.
 * Replace these functions with Supabase queries when credentials are wired in.
 */

import { MOCK } from "./mock-data";
import { Category, Comment, Report, Status, StatusUpdate, Urgency, User } from "./types";

export interface ReportFilters {
  search?: string;
  category?: Category | "all";
  status?: Status | "all";
  urgency?: Urgency | "all";
  city?: string;
  sort?: "recent" | "most_upvoted" | "nearest" | "trending";
  onlyMine?: boolean;
  userId?: string;
}

function matchesFilter(r: Report, f: ReportFilters): boolean {
  if (f.search) {
    const q = f.search.toLowerCase();
    if (
      !r.title.toLowerCase().includes(q) &&
      !r.description.toLowerCase().includes(q) &&
      !r.address.toLowerCase().includes(q)
    )
      return false;
  }
  if (f.category && f.category !== "all" && r.category !== f.category) return false;
  if (f.status && f.status !== "all" && r.status !== f.status) return false;
  if (f.urgency && f.urgency !== "all" && r.urgency !== f.urgency) return false;
  if (f.city && r.city !== f.city) return false;
  if (f.onlyMine && r.user_id !== f.userId) return false;
  return true;
}

export async function getReports(f: ReportFilters = {}): Promise<Report[]> {
  let out = MOCK.reports.filter((r) => matchesFilter(r, f));
  switch (f.sort) {
    case "most_upvoted":
      out = [...out].sort((a, b) => b.upvote_count - a.upvote_count);
      break;
    case "trending":
      out = [...out].sort((a, b) => b.priority_score - a.priority_score);
      break;
    case "recent":
    default:
      out = [...out].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
  }
  return out;
}

export async function getReport(id: string): Promise<Report | null> {
  return MOCK.reports.find((r) => r.id === id) ?? null;
}

export async function getCurrentUser(): Promise<User> {
  return MOCK.currentUser;
}

export async function getUser(id: string): Promise<User | null> {
  return MOCK.users.find((u) => u.id === id) ?? null;
}

export async function getCommentsForReport(reportId: string): Promise<Comment[]> {
  return MOCK.comments
    .filter((c) => c.report_id === reportId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

export async function getStatusUpdatesForReport(
  reportId: string
): Promise<StatusUpdate[]> {
  return MOCK.statusUpdates
    .filter((s) => s.report_id === reportId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

export async function createReport(input: {
  title: string;
  description: string;
  category: Category;
  urgency: Urgency;
  latitude: number;
  longitude: number;
  address: string;
  area: string;
  city: string;
  photos: string[];
}): Promise<Report> {
  const now = new Date().toISOString();
  const report: Report = {
    id: `rpt_${Math.random().toString(36).slice(2, 10)}`,
    user_id: MOCK.currentUser.id,
    title: input.title,
    description: input.description,
    category: input.category,
    urgency: input.urgency,
    status: "submitted",
    latitude: input.latitude,
    longitude: input.longitude,
    address: input.address,
    area: input.area,
    city: input.city,
    upvote_count: 0,
    comment_count: 0,
    view_count: 0,
    priority_score: 5,
    is_featured: false,
    created_at: now,
    updated_at: now,
    photos: input.photos,
  };
  MOCK.reports.unshift(report);
  MOCK.statusUpdates.push({
    id: `su_${Math.random().toString(36).slice(2, 10)}`,
    report_id: report.id,
    old_status: null,
    new_status: "submitted",
    created_at: now,
  });
  return report;
}

export async function upvoteReport(
  reportId: string,
  currentlyUpvoted: boolean
): Promise<Report | null> {
  const r = MOCK.reports.find((x) => x.id === reportId);
  if (!r) return null;
  r.upvote_count = Math.max(0, r.upvote_count + (currentlyUpvoted ? -1 : 1));
  return r;
}

export async function addComment(
  reportId: string,
  text: string
): Promise<Comment | null> {
  const u = MOCK.currentUser;
  const r = MOCK.reports.find((x) => x.id === reportId);
  if (!r) return null;
  const c: Comment = {
    id: `cmt_${Math.random().toString(36).slice(2, 10)}`,
    report_id: reportId,
    user_id: u.id,
    user_name: u.full_name,
    user_avatar: u.avatar_url,
    text,
    is_official: false,
    created_at: new Date().toISOString(),
  };
  MOCK.comments.push(c);
  r.comment_count += 1;
  return c;
}

export async function getTrendingReport(): Promise<Report | null> {
  const list = [...MOCK.reports]
    .filter((r) => r.status !== "resolved")
    .sort((a, b) => b.priority_score - a.priority_score);
  return list[0] ?? null;
}

export async function getStats(): Promise<{
  total: number;
  resolved: number;
  open: number;
  in_progress: number;
  resolution_rate: number;
  cities: number;
}> {
  const total = MOCK.reports.length;
  const resolved = MOCK.reports.filter((r) => r.status === "resolved").length;
  const in_progress = MOCK.reports.filter((r) => r.status === "in_progress").length;
  const open = MOCK.reports.filter((r) => r.status !== "resolved").length;
  const cities = new Set(MOCK.reports.map((r) => r.city)).size;
  return {
    total,
    resolved,
    open,
    in_progress,
    resolution_rate: total ? Math.round((resolved / total) * 100) : 0,
    cities,
  };
}
