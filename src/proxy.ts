import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";

const AUTH_ROUTES = ["/", "/login", "/register", "/forgot-password"];
const PROTECTED_ROUTES = ["/dashboard"];

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

async function getSessionUser(
  request: NextRequest,
  response: { current: NextResponse },
): Promise<User | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error(
      "[LoopPage] Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY: la sesión se trata como inexistente.",
    );
    return null;
  }

  try {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          response.current = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.current.cookies.set(name, value, options),
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error("[LoopPage] No se pudo verificar la sesión:", error);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const response = { current: NextResponse.next({ request }) };
  const user = await getSessionUser(request, response);

  const { pathname } = request.nextUrl;

  if (user && matchesRoute(pathname, AUTH_ROUTES)) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!user && matchesRoute(pathname, PROTECTED_ROUTES)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return response.current;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
