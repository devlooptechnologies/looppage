"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { getRegisterErrorMessage } from "@/lib/auth-errors";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function validate(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): FieldErrors {
  const errors: FieldErrors = {};

  if (!name) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!email) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Introduce un correo electrónico válido.";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirma tu contraseña.";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
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

function PasswordToggle({
  show,
  onToggle,
  label,
}: {
  show: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={show}
      aria-label={show ? `Ocultar ${label}` : `Mostrar ${label}`}
      className="flex size-9 items-center justify-center rounded-lg text-ink-subtle transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
    >
      <EyeIcon hidden={!show} />
    </button>
  );
}

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-brand/40 bg-brand/10 shadow-[0_12px_32px_-18px_rgba(46,125,255,0.9)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-7 text-brand"
        >
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      </span>

      <h2 className="mt-5 text-xl font-semibold tracking-tight text-ink">
        Revisa tu correo electrónico
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Te enviamos un enlace para confirmar tu cuenta de LoopPage.
      </p>

      <Link
        href="/login"
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl border border-line-strong bg-surface-raised px-4 text-sm font-semibold text-ink transition hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft"
      >
        Volver a iniciar sesión
      </Link>
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  if (signedUp) {
    return <SuccessScreen />;
  }

  function clearFieldError(field: keyof FieldErrors) {
    if (fieldErrors[field]) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const errors = validate(
      trimmedName,
      trimmedEmail,
      password,
      confirmPassword,
    );

    setFieldErrors(errors);
    setFormError(null);

    if (errors.name || errors.email || errors.password || errors.confirmPassword) {
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            full_name: trimmedName,
          },
        },
      });

      if (error) {
        setFormError(getRegisterErrorMessage(error));
        return;
      }

      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setSignedUp(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setFormError(
        message.includes("Faltan las variables")
          ? message
          : "No pudimos crear tu cuenta. Inténtalo nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError ? (
        <div
          role="alert"
          className="rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          {formError}
        </div>
      ) : null}

      <TextField
        label="Nombre"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Tu nombre"
        value={name}
        error={fieldErrors.name}
        disabled={loading}
        onChange={(event) => {
          setName(event.target.value);
          clearFieldError("name");
        }}
      />

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
          clearFieldError("email");
        }}
      />

      <TextField
        label="Contraseña"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="••••••••"
        value={password}
        error={fieldErrors.password}
        disabled={loading}
        trailing={
          <PasswordToggle
            show={showPassword}
            label="la contraseña"
            onToggle={() => setShowPassword((visible) => !visible)}
          />
        }
        onChange={(event) => {
          setPassword(event.target.value);
          clearFieldError("password");
        }}
      />

      <TextField
        label="Confirmar contraseña"
        name="confirmPassword"
        type={showPasswordConfirm ? "text" : "password"}
        autoComplete="new-password"
        placeholder="••••••••"
        value={confirmPassword}
        error={fieldErrors.confirmPassword}
        disabled={loading}
        trailing={
          <PasswordToggle
            show={showPasswordConfirm}
            label="la confirmación de contraseña"
            onToggle={() => setShowPasswordConfirm((visible) => !visible)}
          />
        }
        onChange={(event) => {
          setConfirmPassword(event.target.value);
          clearFieldError("confirmPassword");
        }}
      />

      <Button type="submit" loading={loading}>
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-soft transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft rounded"
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}