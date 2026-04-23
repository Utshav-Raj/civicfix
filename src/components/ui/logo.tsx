import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 36,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        aria-label="CivicFix logo"
      >
        <defs>
          <linearGradient id="cf-g" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#60A5FA" />
            <stop offset="0.6" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="cf-o" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#FB923C" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <path
          d="M24 3L42 11V23C42 33 34 41 24 45C14 41 6 33 6 23V11L24 3Z"
          fill="url(#cf-g)"
          opacity="0.15"
        />
        <path
          d="M24 3L42 11V23C42 33 34 41 24 45C14 41 6 33 6 23V11L24 3Z"
          stroke="url(#cf-g)"
          strokeWidth="2"
        />
        {/* city skyline cutout */}
        <g fill="url(#cf-o)">
          <rect x="14" y="26" width="4" height="9" rx="0.5" />
          <rect x="19" y="22" width="3.5" height="13" rx="0.5" />
          <rect x="23.5" y="17" width="5" height="18" rx="0.5" />
          <rect x="29.5" y="24" width="3.5" height="11" rx="0.5" />
          <rect x="34" y="28" width="3" height="7" rx="0.5" />
          <circle cx="26" cy="15" r="1.4" />
        </g>
        <path
          d="M14 34 H34"
          stroke="url(#cf-g)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-tight">
          Civic<span className="text-civic-orange">Fix</span>
        </span>
      )}
    </div>
  );
}
