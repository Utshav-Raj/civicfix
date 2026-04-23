"use client";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#categories", label: "Categories" },
  { href: "/feed", label: "Live Feed" },
  { href: "#map", label: "Map" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 80);
  });

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#040812]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="focus-ring rounded-lg">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors group"
              >
                {link.label}
                <span className="absolute left-4 right-4 bottom-1 h-px bg-gradient-to-r from-civic-blue to-civic-purple scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/report/new">
              <Button size="sm" className="relative">
                <span className="absolute inset-0 shimmer rounded-xl opacity-40" />
                <span className="relative">Report Issue</span>
              </Button>
            </Link>
          </div>
          <button
            className="md:hidden h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#040812]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <Logo />
              <button
                className="h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
              className="flex flex-col px-6 pt-10 gap-5"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="text-2xl font-display font-semibold text-text-primary"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="flex flex-col gap-3 pt-6 border-t border-white/5"
              >
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/report/new" onClick={() => setOpen(false)}>
                  <Button size="lg" className="w-full">
                    Report Issue
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
