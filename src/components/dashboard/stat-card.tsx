"use client";

import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  trend?: number; // percent
  icon: LucideIcon;
  color: string;
  sparkline?: number[];
}

export function StatCard({ label, value, trend, icon: Icon, color, sparkline = [] }: Props) {
  const up = (trend ?? 0) >= 0;
  const chartData = sparkline.map((y, x) => ({ x, y }));
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <GlassCard className="relative overflow-hidden">
        <div
          className="absolute -top-12 -right-10 h-40 w-40 rounded-full blur-3xl opacity-40"
          style={{ background: color }}
        />
        <div className="relative flex items-start justify-between mb-6">
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center"
            style={{
              background: `${color}22`,
              border: `1px solid ${color}55`,
            }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          {trend !== undefined && (
            <div
              className={`inline-flex items-center gap-1 text-xs font-medium ${
                up ? "text-civic-teal" : "text-status-open"
              }`}
            >
              {up ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
              {Math.abs(trend).toFixed(1)}%
            </div>
          )}
        </div>
        <div className="relative">
          <div className="text-3xl font-display font-bold tabular-nums">{value}</div>
          <div className="text-xs text-text-secondary mt-1">{label}</div>
        </div>
        {chartData.length > 0 && (
          <div className="relative mt-4 -mx-5 -mb-5 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`sp-${label.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="y"
                  type="monotone"
                  stroke={color}
                  fill={`url(#sp-${label.replace(/\s+/g, "")})`}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
