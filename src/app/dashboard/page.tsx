import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard · LoopPage",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="auth-shell min-h-dvh">
      <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center px-4 py-16">
        <div className="auth-card w-full rounded-3xl p-8 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase">
            Sesión iniciada
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
            Tu Dashboard está en construcción
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            Estamos preparando el panel de LoopPage. Tu sesión está activa, así
            que pronto podrás acceder aquí con todo tu contenido.
          </p>

          {user.email ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-canvas-raised px-3.5 py-1.5 text-xs font-medium text-ink-muted">
              <span className="size-1.5 rounded-full bg-brand" />
              {user.email}
            </p>
          ) : null}

          <div className="mt-7 flex justify-center">
            <LogoutButton />
          </div>
        </div>
      </main>
    </div>
  );
}
