"use client";

import { Logo } from "@/components/ui/logo";
import { MOCK } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  Users,
  MapPin,
  Settings,
  HelpCircle,
  PlusCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/report/new", label: "Report Issue", icon: PlusCircle },
  { href: "/dashboard/my-reports", label: "My Reports", icon: FileText },
  { href: "/feed", label: "Community Feed", icon: Users },
  { href: "/dashboard/map", label: "Map View", icon: MapPin },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help", icon: HelpCircle },
];

export function Sidebar() {
  const path = usePathname();
  const user = MOCK.currentUser;

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-[260px] flex-col bg-bg-secondary/60 backdrop-blur-xl border-r border-white/5 z-40">
      <div className="h-16 px-6 flex items-center border-b border-white/5">
        <Link href="/" className="focus-ring rounded-lg">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {NAV.map((item) => {
          const active = path === item.href || (item.href !== "/dashboard" && path?.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className="block focus-ring rounded-xl">
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                  active
                    ? "text-text-primary bg-civic-blue/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-civic-blue shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  />
                )}
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-transform",
                    active && "text-civic-blue-glow scale-110"
                  )}
                />
                <span className={cn(active && "font-semibold")}>{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar_url}
            alt={user.full_name}
            className="h-9 w-9 rounded-full border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{user.full_name}</div>
            <div className="text-xs text-text-muted truncate">{user.city}</div>
          </div>
          <Link
            href="/"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
