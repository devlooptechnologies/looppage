# LoopPage

**LoopPage by DevLoop Technologies** — presencia digital en una sola página.

SaaS construido con Next.js (App Router), React, TypeScript, Tailwind CSS y Supabase Auth. Listo para desplegar en Vercel.

## Estado actual

Etapa 1: **sistema de Login** con Supabase Auth (sesión, validaciones, errores y redirección). El resto de funcionalidades (register, dashboard, editor, perfiles públicos, analytics, billing, etc.) se habilitarán por etapas.

## Requisitos

- Node.js 20.9+
- Un proyecto en [Supabase](https://supabase.com)

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores (Supabase Dashboard → Project Settings → API):

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

En Vercel, configura las mismas variables en *Project Settings → Environment Variables*. `.env.local` nunca se commitea.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La raíz redirige a `/login`.

## Scripts

| Comando         | Descripción              |
| --------------- | ------------------------ |
| `npm run dev`   | Servidor de desarrollo   |
| `npm run build` | Build de producción      |
| `npm run start` | Sirve el build           |
| `npm run lint`  | ESLint                   |

## Estructura

```
src/
  app/
    login/              Pantalla de Login
    register/           Ruta preparada (próximamente)
    forgot-password/    Ruta preparada (próximamente)
    dashboard/          Ruta protegida (placeholder de la etapa 2)
  components/
    auth/               Login form, shell de auth, logout
    brand/              Logo y wordmark
    ui/                 Button, TextField reutilizables
  lib/
    supabase/           Clientes browser/server y validación de env
  proxy.ts              Refresco de sesión y protección de rutas
```

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS 4
- Supabase Auth (`@supabase/supabase-js`, `@supabase/ssr`)
- Vercel
