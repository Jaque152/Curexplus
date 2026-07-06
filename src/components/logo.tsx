import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
  showWord?: boolean;
};

export function LogoMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  // tone refers to the background it sits on
  const badge = tone === "dark" ? "hsl(var(--paper))" : "hsl(var(--pine))";
  const strandA = tone === "dark" ? "hsl(var(--pine))" : "hsl(var(--paper))";
  const strandB = "hsl(var(--clay))";

  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10", className)}
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="41" height="41" rx="13" fill={badge} />
      <rect
        x="1.5"
        y="1.5"
        width="41"
        height="41"
        rx="13"
        stroke="hsl(var(--pine) / 0.18)"
      />
      {/* helix strands */}
      <path
        d="M15 11C29 16 15 23 29 28"
        stroke={strandA}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M29 16C15 21 29 28 15 33"
        stroke={strandB}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* rungs */}
      <path
        d="M18.5 13.5L25.5 15.2M18 21.5L26 21.5M18.5 29L25.6 30.6"
        stroke={strandA}
        strokeOpacity="0.55"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, tone = "dark", showWord = true }: LogoProps) {
  const word = tone === "dark" ? "text-ink" : "text-paper";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="h-9 w-9" />
      {showWord && (
        <span
          className={cn(
            "font-display text-[1.35rem] font-semibold tracking-tight",
            word,
          )}
        >
          Curex<span className="text-clay">Plus</span>
        </span>
      )}
    </span>
  );
}
