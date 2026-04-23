"use client";

import { Input } from "@/components/ui/input";
import { MOCK } from "@/lib/mock-data";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function crumbs(path: string): { label: string; href: string }[] {
  const parts = path.split("/").filter(Boolean);
  const out: { label: string; href: string }[] = [];
  let href = "";
  for (const p of parts) {
    href += `/${p}`;
    out.push({
      label: p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href,
    });
  }
  return out;
}

export function Topbar() {
  const path = usePathname() ?? "/";
  const c = crumbs(path);
  const user = MOCK.currentUser;
  return (
    <div className="h-16 lg:ml-[260px] sticky top-0 z-30 flex items-center gap-4 px-6 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5">
      <nav className="hidden md:flex items-center gap-2 text-xs text-text-muted min-w-0">
        <Link href="/dashboard" className="hover:text-text-primary">
          CivicFix
        </Link>
        {c.map((bc, i) => (
          <span key={bc.href} className="flex items-center gap-2">
            <span>/</span>
            <Link
              href={bc.href}
              className={
                i === c.length - 1
                  ? "text-text-primary font-medium"
                  : "hover:text-text-primary"
              }
            >
              {bc.label}
            </Link>
          </span>
        ))}
      </nav>

      <div className="flex-1 max-w-md ml-auto hidden md:block">
        <Input
          placeholder="Search issues, categories (⌘K)"
          icon={<Search className="h-4 w-4" />}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-10 w-10 rounded-xl border border-white/5 bg-bg-surface/60 flex items-center justify-center hover:border-white/15"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-civic-orange text-[10px] font-bold text-white flex items-center justify-center">
          3
        </span>
      </motion.button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user.avatar_url}
        alt={user.full_name}
        className="h-10 w-10 rounded-full border border-white/10"
      />
    </div>
  );
}
