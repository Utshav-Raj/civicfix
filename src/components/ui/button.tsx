"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus-ring select-none whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white shadow-[0_0_20px_rgba(249,115,22,0.4),0_0_60px_rgba(249,115,22,0.15)] hover:brightness-110",
        secondary:
          "bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white shadow-[0_0_20px_rgba(59,130,246,0.3),0_0_60px_rgba(59,130,246,0.1)] hover:brightness-110",
        ghost:
          "bg-transparent text-text-primary hover:bg-white/5 border border-transparent hover:border-white/10",
        outline:
          "bg-transparent border border-white/10 text-text-primary hover:bg-white/5 hover:border-white/20",
        glass:
          "glass text-text-primary hover:border-[rgba(99,179,237,0.3)]",
        danger:
          "bg-red-500/90 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-14 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type Props = HTMLMotionProps<"button"> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
