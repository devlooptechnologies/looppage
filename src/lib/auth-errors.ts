type AuthErrorLike = {
  code?: string;
  message?: string;
};

export function getLoginErrorMessage(error: AuthErrorLike): string {
  const code = (error.code ?? "").toLowerCase();
  const message = (error.message ?? "").toLowerCase();

  if (code === "invalid_credentials" || message.includes("invalid login")) {
    return "El correo o la contraseña son incorrectos.";
  }

  if (code === "email_not_confirmed" || message.includes("confirm")) {
    return "Debes confirmar tu correo electrónico antes de iniciar sesión.";
  }

  if (
    code === "over_request_rate_limited" ||
    code === "too_many_requests" ||
    message.includes("rate limit")
  ) {
    return "Demasiados intentos. Espera unos minutos y vuelve a intentarlo.";
  }

  if (
    message.includes("failed to fetch") ||
    message.includes("network") ||
    code === "network_error"
  ) {
    return "No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";
  }

  if (code === "provider_email_needs_verification") {
    return "Debes verificar tu correo electrónico antes de iniciar sesión.";
  }

  return "No se pudo iniciar sesión. Revisa tus datos e inténtalo de nuevo.";
}

export function getRegisterErrorMessage(error: AuthErrorLike): string {
  const code = (error.code ?? "").toLowerCase();
  const message = (error.message ?? "").toLowerCase();

  if (
    code === "email_exists" ||
    code === "user_already_exists" ||
    message.includes("already registered") ||
    message.includes("already been registered")
  ) {
    return "Este correo ya está registrado. Intenta iniciar sesión.";
  }

  if (
    code === "weak_password" ||
    code === "password_too_short" ||
    message.includes("at least 8 characters") ||
    message.includes("password should be")
  ) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  if (message.includes("invalid email")) {
    return "Introduce un correo electrónico válido.";
  }

  if (
    code === "over_request_rate_limited" ||
    code === "too_many_requests" ||
    message.includes("rate limit")
  ) {
    return "Demasiados intentos. Espera unos minutos y vuelve a intentarlo.";
  }

  if (
    message.includes("failed to fetch") ||
    message.includes("network") ||
    code === "network_error"
  ) {
    return "No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";
  }

  return "No pudimos crear tu cuenta. Inténtalo nuevamente.";
}
