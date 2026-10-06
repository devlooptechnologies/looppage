import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Crear cuenta · LoopPage",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Crear cuenta"
      subtitle="El registro estará disponible muy pronto."
    >
      <p className="text-sm leading-relaxed text-ink-muted">
        Estamos preparando el alta de cuentas en LoopPage. Por ahora, ya puedes
        iniciar sesión si ya tienes una cuenta.
      </p>

      <Link
        href="/login"
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl border border-line-strong bg-surface-raised px-4 text-sm font-semibold text-ink transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
      >
        Volver a iniciar sesión
      </Link>
    </AuthCard>
  );
}
