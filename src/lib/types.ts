export type Category =
  | "roads"
  | "water"
  | "garbage"
  | "electricity"
  | "parks"
  | "safety";

export type Urgency = "low" | "medium" | "high" | "critical";

export type Status =
  | "submitted"
  | "under_review"
  | "in_progress"
  | "resolved"
  | "rejected";

export type Role = "citizen" | "admin" | "moderator";

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: Role;
  city?: string;
  bio?: string;
  reports_count: number;
  upvotes_given: number;
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: Category;
  urgency: Urgency;
  status: Status;
  latitude: number;
  longitude: number;
  address: string;
  area: string;
  city: string;
  department?: string;
  assigned_officer?: string;
  upvote_count: number;
  comment_count: number;
  view_count: number;
  priority_score: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  photos: string[];
}

export interface Comment {
  id: string;
  report_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  text: string;
  is_official: boolean;
  created_at: string;
}

export interface StatusUpdate {
  id: string;
  report_id: string;
  old_status: Status | null;
  new_status: Status;
  admin_note?: string;
  admin_name?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  report_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface CategoryMeta {
  id: Category;
  label: string;
  emoji: string;
  description: string;
  accent: string;
  accentBg: string;
  examples: string[];
}
