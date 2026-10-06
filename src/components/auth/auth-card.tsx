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
        <div className="w-full max-w-[27rem]">
          <header className="mb-8 flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <span className="flex size-14 items-center justify-center rounded-2xl border border-line bg-surface-raised shadow-[0_14px_36px_-16px_rgba(46,125,255,0.95)]">
                <LoopMark className="size-9" />
              </span>
              <Wordmark />
            </div>
            <p className="mt-1 text-[11px] font-medium tracking-[0.16em] text-ink-subtle uppercase">
              by DevLoop Technologies
            </p>
          </header>

          <section className="auth-card rounded-3xl p-7 sm:p-9">
            <div className="mb-7">
              <h1 className="text-2xl font-semibold tracking-tight text-ink">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {subtitle}
                </p>
              ) : null}
            </div>

            {children}
          </section>

          <footer className="mt-8 flex items-center justify-center gap-2 text-xs text-ink-subtle">
            <span className="inline-block size-1.5 rounded-full bg-brand" />
            © {new Date().getFullYear()} DevLoop Technologies
          </footer>
        </div>
      </main>
    </div>
  );
}