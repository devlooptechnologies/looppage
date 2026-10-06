import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Recuperar contraseña · LoopPage",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Recuperar contraseña"
      subtitle="El enlace de recuperación estará disponible muy pronto."
    >
      <p className="text-sm leading-relaxed text-ink-muted">
        Estamos habilitando la recuperación de contraseñas por correo
        electrónico. Si no puedes acceder a tu cuenta, vuelve a intentarlo más
        tarde.
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
