import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  color?: string;
  bg?: string;
};

export function Badge({
  className,
  color = "#60A5FA",
  bg = "rgba(99,179,237,0.12)",
  style,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border",
        className
      )}
      style={{
        color,
        background: bg,
        borderColor: color + "40",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
