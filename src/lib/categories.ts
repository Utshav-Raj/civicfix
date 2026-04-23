import { CategoryMeta } from "./types";

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "roads",
    label: "Roads & Infrastructure",
    emoji: "🚧",
    description: "Potholes, broken signals, damaged signage",
    accent: "#F97316",
    accentBg: "rgba(249,115,22,0.12)",
    examples: ["Potholes", "Broken traffic lights", "Damaged signs", "Road cracks"],
  },
  {
    id: "water",
    label: "Water & Drainage",
    emoji: "💧",
    description: "Leakages, clogged drains, supply issues",
    accent: "#3B82F6",
    accentBg: "rgba(59,130,246,0.12)",
    examples: ["Pipe leaks", "Clogged drains", "Water shortage", "Sewage"],
  },
  {
    id: "garbage",
    label: "Waste Management",
    emoji: "🗑️",
    description: "Overflowing bins, missed pickups, illegal dumping",
    accent: "#14B8A6",
    accentBg: "rgba(20,184,166,0.12)",
    examples: ["Overflow", "Missed pickup", "Dumping", "Recycling"],
  },
  {
    id: "electricity",
    label: "Electricity",
    emoji: "⚡",
    description: "Power cuts, flickering, exposed wiring",
    accent: "#F59E0B",
    accentBg: "rgba(245,158,11,0.12)",
    examples: ["Power cut", "Broken street lights", "Exposed wires"],
  },
  {
    id: "parks",
    label: "Parks & Environment",
    emoji: "🌳",
    description: "Trees, pollution, green space maintenance",
    accent: "#22C55E",
    accentBg: "rgba(34,197,94,0.12)",
    examples: ["Tree falls", "Littering", "Park damage", "Pollution"],
  },
  {
    id: "safety",
    label: "Public Safety",
    emoji: "🚨",
    description: "Unlit areas, vandalism, hazards",
    accent: "#8B5CF6",
    accentBg: "rgba(139,92,246,0.12)",
    examples: ["Unlit zones", "Vandalism", "Hazards", "Public nuisance"],
  },
];

export const CATEGORY_MAP: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

export const STATUS_META: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  submitted: {
    label: "Submitted",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.15)",
  },
  under_review: {
    label: "Under Review",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.15)",
  },
  in_progress: {
    label: "In Progress",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.15)",
  },
  resolved: {
    label: "Resolved",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.15)",
  },
  rejected: {
    label: "Rejected",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.15)",
  },
};

export const URGENCY_META: Record<
  string,
  { label: string; color: string; weight: number }
> = {
  low: { label: "Low", color: "#22C55E", weight: 5 },
  medium: { label: "Medium", color: "#F59E0B", weight: 20 },
  high: { label: "High", color: "#F97316", weight: 50 },
  critical: { label: "Critical", color: "#EF4444", weight: 100 },
};
