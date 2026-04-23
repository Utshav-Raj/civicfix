"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-11 rounded-xl bg-bg-surface/80 border border-white/5 px-4 text-sm text-text-primary placeholder:text-text-muted transition-all",
            "focus:outline-none focus:border-civic-blue focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]",
            icon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full min-h-[120px] rounded-xl bg-bg-surface/80 border border-white/5 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all resize-none",
      "focus:outline-none focus:border-civic-blue focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
