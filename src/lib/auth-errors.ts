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
