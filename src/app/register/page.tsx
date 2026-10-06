import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Crear cuenta · LoopPage",
  description:
    "Crea tu cuenta en LoopPage y empieza a construir tu presencia digital en una sola página.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Crea tu cuenta"
      subtitle="Empieza a construir tu presencia digital en LoopPage."
    >
      <RegisterForm />
    </AuthCard>
  );
}