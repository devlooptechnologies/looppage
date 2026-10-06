import type { ReactNode } from "react";
import { LoopMark, Wordmark } from "@/components/brand/logo";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="auth-shell min-h-dvh w-full">
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-[26rem]">
          <header className="mb-7 flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-surface-raised shadow-[0_12px_32px_-18px_rgba(46,125,255,0.9)]">
                <LoopMark className="size-7" />
              </span>
              <Wordmark />
            </div>
            <p className="mt-2.5 text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase">
              by DevLoop Technologies
            </p>
          </header>

          <section className="auth-card rounded-3xl p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-xl font-semibold tracking-tight text-ink">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>
              ) : null}
            </div>

            {children}
          </section>

          <footer className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-subtle">
            <span className="inline-block size-1.5 rounded-full bg-brand" />
            © {new Date().getFullYear()} DevLoop Technologies
          </footer>
        </div>
      </main>
    </div>
  );
}
