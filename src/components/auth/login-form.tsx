"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { getLoginErrorMessage } from "@/lib/auth-errors";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  email?: string;
  password?: string;
};

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!email) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!password) {
    errors.password = "Ingresa tu contraseña.";
  }

  return errors;
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px]"
    >
      {hidden ? (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 5.1A9.9 9.9 0 0 1 12 5c5.5 0 9 5.5 9 7a12 12 0 0 1-2.4 3.3" />
          <path d="M6.2 7.2C3.9 8.9 3 11.2 3 12c0 1.5 3.5 7 9 7a9.7 9.7 0 0 0 4.5-1.1" />
          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </>
      ) : (
        <>
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const errors = validate(trimmedEmail, password);

    setFieldErrors(errors);
    setFormError(null);

    if (errors.email || errors.password) return;

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        setFormError(getLoginErrorMessage(error));
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setFormError(
        message.includes("Faltan las variables")
          ? message
          : "No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {formError ? (
        <div
          role="alert"
          className="rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          {formError}
        </div>
      ) : null}

      <TextField
        label="Correo electrónico"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        spellCheck={false}
        placeholder="tu@correo.com"
        value={email}
        error={fieldErrors.email}
        disabled={loading}
        onChange={(event) => {
          setEmail(event.target.value);
          if (fieldErrors.email) {
            setFieldErrors((current) => ({ ...current, email: undefined }));
          }
        }}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-ink-muted"
          >
            Contraseña
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-brand-soft transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft rounded"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            disabled={loading}
            aria-invalid={fieldErrors.password ? true : undefined}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
            className="field-input pr-12"
            onChange={(event) => {
              setPassword(event.target.value);
              if (fieldErrors.password) {
                setFieldErrors((current) => ({
                  ...current,
                  password: undefined,
                }));
              }
            }}
          />

          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-pressed={showPassword}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="absolute inset-y-0 right-1.5 flex size-9 items-center justify-center rounded-lg text-ink-subtle transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
          >
            <EyeIcon hidden={!showPassword} />
          </button>
        </div>

        {fieldErrors.password ? (
          <p id="password-error" className="text-sm text-danger">
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      <Button type="submit" loading={loading}>
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-soft transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft rounded"
        >
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
