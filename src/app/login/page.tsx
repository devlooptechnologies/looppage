import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión · LoopPage",
  description:
    "Accede a tu cuenta de LoopPage, tu presencia digital en una sola página.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Bienvenido de nuevo"
      subtitle="Inicia sesión para continuar gestionando tu presencia digital."
    >
      <LoginForm />
    </AuthCard>
  );
}
