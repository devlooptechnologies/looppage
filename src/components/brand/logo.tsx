import { cn } from "@/lib/utils";

export function LoopMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      className={cn("size-10", className)}
    >
      <defs>
        <linearGradient id="looppage-mark" x1="6" y1="6" x2="42" y2="42">
          <stop stopColor="#5B9BFF" />
          <stop offset="0.55" stopColor="#2E7DFF" />
          <stop offset="1" stopColor="#1D63E6" />
        </linearGradient>
      </defs>
      <path
        d="M17 15.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c3.7 0 6.4-2.2 8.6-5.4l2.6-3.8c2.1-3.1 4.6-5.3 8.2-5.3 4.7 0 8.5 3.8 8.5 8.5s-3.8 8.5-8.5 8.5"
        stroke="url(#looppage-mark)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="35.5" cy="24" r="3.6" fill="url(#looppage-mark)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-baseline gap-0.5 text-2xl font-semibold tracking-tight text-ink">
      Loop
      <span className="text-brand-soft">Page</span>
    </span>
  );
}
