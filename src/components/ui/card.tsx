import * as React from "react";
import { cn } from "@/lib/utils";

export const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass rounded-2xl p-5 relative overflow-hidden",
      className
    )}
    {...props}
  />
));
GlassCard.displayName = "GlassCard";

export const SurfaceCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-white/5 bg-bg-secondary/60 p-5 transition-all",
      className
    )}
    {...props}
  />
));
SurfaceCard.displayName = "SurfaceCard";
