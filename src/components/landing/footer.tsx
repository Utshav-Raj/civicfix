import { Logo } from "@/components/ui/logo";
import { Mail } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.42-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.467-2.382 1.236-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403 11.52 11.52 0 013.003.403c2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.244 2.873.12 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.807 5.624-5.48 5.921.43.37.823 1.102.823 2.222 0 1.606-.014 2.9-.014 3.293 0 .32.216.694.825.576C20.565 22.092 24 17.597 24 12.297 24 5.67 18.627.297 12 .297z" />
  </svg>
);
const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.77-6.23L4.8 22H2l7.05-8.06L2 2h6.914l4.3 5.66L18.244 2zm-2.4 18h1.88L7.25 4H5.34l10.504 16z" />
  </svg>
);
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.22 8h4.54v15.5H.22V8zm7.44 0h4.35v2.12h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.43 3.02 5.43 6.94V23.5h-4.52v-7.26c0-1.73-.03-3.95-2.4-3.95-2.4 0-2.77 1.87-2.77 3.82V23.5H7.66V8z" />
  </svg>
);

const SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Live Feed", href: "/feed" },
      { label: "Report Issue", href: "/report/new" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Map View", href: "#map" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 bg-bg-secondary/60 border-t border-white/5">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-text-secondary max-w-xs">
              Civic intelligence for the people. Built to make cities listen.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-text-secondary hover:border-civic-blue hover:text-civic-blue-glow transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <div className="text-sm font-semibold text-text-primary mb-4">
                {s.title}
              </div>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} CivicFix. Built with ❤️ for citizens.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-text-primary">
              Privacy
            </Link>
            <Link href="#" className="hover:text-text-primary">
              Terms
            </Link>
            <Link href="#" className="hover:text-text-primary">
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
