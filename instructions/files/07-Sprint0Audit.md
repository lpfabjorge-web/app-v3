# UNSA Connect — Auditoría Sprint 0
> Estado actual del repo `mi-app` vs. requisitos de los 5 skills
> Fecha: Junio 2026

---

## Resumen ejecutivo

| Skill | Estado | Gaps críticos |
|---|---|---|
| nextjs-pwa-setup | 🔴 Bloqueante | Sin `src/`, sin PWA, Turbopack activo |
| drizzle-neon-schema | 🔴 Bloqueante | Sin ORM, sin schema, sin migraciones |
| nextauth-magic-link | 🔴 Bloqueante | Sin auth, sin middleware, sin env vars |
| github-actions-ci | 🟡 Parcial | Sin tests ni build en el workflow |
| vitest-setup | 🔴 Bloqueante | Sin Vitest, sin tests, sin coverage |

**El repo actual tiene la base correcta (Next.js 15 + Vercel + Neon + Sentry) pero
le faltan todas las capas de aplicación. Sprint 0 está por comenzar — no hay deuda
técnica acumulada que limpiar, solo instalación y configuración.**

---

## Gap 1 — ESTRUCTURA DEL PROYECTO (Bloqueante para todo lo demás)

### Problema
El proyecto fue creado con `--no-src-dir`. Los 5 skills asumen estructura `src/`.
Además, se aceptó **Turbopack** durante el setup — el skill nextjs-pwa-setup indica
explícitamente que Turbopack es **incompatible con @ducanh2912/next-pwa**.

### Estado actual
```
mi-app/
├── app/          ← debería ser src/app/
├── public/
├── next.config.ts
└── ...
```

### Estado requerido
```
mi-app/
└── src/
    ├── app/
    ├── components/
    ├── lib/
    ├── types/
    └── tests/
```

### Solución — bloque único PowerShell

```powershell
cd C:\Users\Usuario\mi-app

# 1. Mover app/ y public/ dentro de src/
New-Item -ItemType Directory -Path src
Move-Item app src\app
New-Item -ItemType Directory -Path src\components\ui
New-Item -ItemType Directory -Path src\components\pwa
New-Item -ItemType Directory -Path src\components\schedule
New-Item -ItemType Directory -Path src\components\activities
New-Item -ItemType Directory -Path src\lib\db
New-Item -ItemType Directory -Path src\types
New-Item -ItemType Directory -Path src\tests\lib
New-Item -ItemType Directory -Path src\tests\api

# 2. Instalar todas las dependencias del Sprint 0
npm install @ducanh2912/next-pwa drizzle-orm @neondatabase/serverless dotenv clsx tailwind-merge lucide-react next-auth@beta @auth/drizzle-adapter resend zod
npm install -D drizzle-kit vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @vitest/coverage-v8 vitest-mock-extended
```

---

## Gap 2 — PWA (skill: nextjs-pwa-setup)

### Lo que falta

| Artefacto | Ruta | Estado |
|---|---|---|
| PWA config | `next.config.ts` | ❌ Sin @ducanh2912/next-pwa |
| Manifest | `public/manifest.json` | ❌ No existe |
| Íconos | `public/icons/` | ❌ No existe |
| Layout mobile | `src/app/layout.tsx` | ❌ Sin metadata PWA |
| InstallBanner | `src/components/pwa/InstallBanner.tsx` | ❌ No existe |
| Vars de entorno | `.env.local` | ❌ Sin `NEXT_PUBLIC_SEMESTER` |
| .gitignore | `.gitignore` | ❌ Sin entradas de sw.js |

### Archivos a crear (contenido en el skill nextjs-pwa-setup)

1. `next.config.ts` → reemplazar con config PWA (withPWAInit)
2. `public/manifest.json` → crear
3. `public/icons/` → generar en realfavicongenerator.net
4. `src/app/layout.tsx` → reemplazar con layout mobile-first
5. `src/components/pwa/InstallBanner.tsx` → crear
6. `src/app/(app)/layout.tsx` → crear con InstallBanner
7. Agregar a `.gitignore`:
   ```
   public/sw.js
   public/workbox-*.js
   public/sw.js.map
   public/workbox-*.js.map
   ```

### Variables de entorno a agregar a `.env.local` y Vercel
```
NEXT_PUBLIC_SEMESTER="2026-I"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Gap 3 — BASE DE DATOS (skill: drizzle-neon-schema)

### Lo que falta

| Artefacto | Ruta | Estado |
|---|---|---|
| Conexión DB | `src/lib/db/index.ts` | ❌ No existe |
| Schema | `src/lib/db/schema.ts` | ❌ No existe |
| Config Drizzle | `drizzle.config.ts` | ❌ No existe |
| Constante semestre | `src/lib/constants.ts` | ❌ No existe |
| Free slots | `src/lib/free-slots.ts` | ❌ No existe |
| Recomendaciones | `src/lib/recommendations.ts` | ❌ No existe |
| NSM query | `src/lib/metrics.ts` | ❌ No existe |
| Scripts npm | `package.json` | ❌ Sin db:push, db:studio, db:seed |

### Scripts a agregar en `package.json`
```json
{
  "scripts": {
    "db:push":   "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:seed":   "npx tsx src/lib/db/seed.ts"
  }
}
```

### Variables de entorno — ya configuradas ✅
`DATABASE_URL` ya está en `.env.local` y Vercel. Solo falta agregar:
```
NEXT_PUBLIC_SEMESTER="2026-I"
```

### Tablas que se crearán con `db:push` (10 en total)
```
users · accounts · sessions · verification_tokens
schedules · schedule_blocks · free_slots
categories · activities · activity_slots
user_activities · user_interests · data_processing_log
```

---

## Gap 4 — AUTENTICACIÓN (skill: nextauth-magic-link)

### Lo que falta

| Artefacto | Ruta | Estado |
|---|---|---|
| Config auth | `src/lib/auth.ts` | ❌ No existe |
| Tipos sesión | `src/types/next-auth.d.ts` | ❌ No existe |
| Route handler | `src/app/api/auth/[...nextauth]/route.ts` | ❌ No existe |
| Middleware | `src/middleware.ts` | ❌ No existe |
| Login page | `src/app/(auth)/login/page.tsx` | ❌ No existe |
| Verify page | `src/app/(auth)/login/verify/page.tsx` | ❌ No existe |
| Consent page | `src/app/(auth)/consent/page.tsx` | ❌ No existe (Ley 29733) |
| Session helper | `src/lib/get-session.ts` | ❌ No existe |

### Variables de entorno faltantes — CRÍTICO
Agregar a `.env.local` Y a Vercel:
```
AUTH_SECRET="genera con: openssl rand -base64 32"
AUTH_URL="http://localhost:3000"
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="noreply@unsaconnect.edu.pe"
```

> **Resend:** Crear cuenta gratuita en resend.com.
> Free tier: 100 emails/día, 3,000/mes — suficiente para el piloto de 500 usuarios.

---

## Gap 5 — CI/CD (skill: github-actions-ci)

### Estado actual del `.github/workflows/ci.yml`
```yaml
# Lo que tiene ahora:
- Lint ✅
- Typecheck ✅

# Lo que le falta:
- Tests ❌
- Build check ❌
```

### `.github/workflows/ci.yml` — reemplazar completamente

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    name: Lint · Typecheck · Tests
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: ESLint
        run: npm run lint

      - name: TypeScript
        run: npx tsc --noEmit

      - name: Unit tests
        run: npm run test
        env:
          DATABASE_URL: "postgresql://mock:mock@localhost/mock"
          NEXT_PUBLIC_SEMESTER: "2026-I"

      - name: Build check
        run: npm run build
        env:
          DATABASE_URL: "postgresql://mock:mock@localhost/mock"
          AUTH_SECRET: "ci-secret-placeholder-32-chars-min"
          AUTH_URL: "http://localhost:3000"
          RESEND_API_KEY: "re_placeholder"
          EMAIL_FROM: "noreply@unsaconnect.edu.pe"
          NEXT_PUBLIC_SEMESTER: "2026-I"
          NEXT_PUBLIC_APP_URL: "http://localhost:3000"
```

### Protección de rama (GitHub UI — hacerlo manualmente)
```
GitHub → Settings → Branches → Add rule:
Branch: main
✅ Require pull request before merging
✅ Require status checks: "Lint · Typecheck · Tests"
✅ Require branches up to date
```

---

## Gap 6 — TESTS (skill: vitest-setup)

### Lo que falta

| Artefacto | Ruta | Estado |
|---|---|---|
| Config Vitest | `vitest.config.ts` | ❌ No existe |
| Setup global | `src/tests/setup.ts` | ❌ No existe |
| Mock DB | `src/tests/mocks/db.ts` | ❌ No existe |
| Tests free-slots | `src/tests/lib/free-slots.test.ts` | ❌ No existe |
| Tests recommendations | `src/tests/lib/recommendations.test.ts` | ❌ No existe |
| Scripts npm | `package.json` | ❌ Sin test, test:watch, test:coverage |

### Scripts a agregar en `package.json`
```json
{
  "scripts": {
    "test":          "vitest run",
    "test:watch":    "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## Variables de entorno — estado consolidado

| Variable | `.env.local` | Vercel | Estado |
|---|---|---|---|
| `DATABASE_URL` | ✅ | ✅ | Listo |
| `SENTRY_AUTH_TOKEN` | ✅ (via Sentry wizard) | ✅ | Listo |
| `NEXT_PUBLIC_SEMESTER` | ❌ | ❌ | **Falta** |
| `NEXT_PUBLIC_APP_URL` | ❌ | ❌ | **Falta** |
| `AUTH_SECRET` | ❌ | ❌ | **Falta** |
| `AUTH_URL` | ❌ | ❌ | **Falta** |
| `RESEND_API_KEY` | ❌ | ❌ | **Falta** |
| `EMAIL_FROM` | ❌ | ❌ | **Falta** |

---

## Orden de ejecución del Sprint 0

```
Paso 1 — Estructura (hoy, 15 min)
  → Crear src/, mover app/, instalar dependencias

Paso 2 — Variables de entorno (hoy, 10 min)
  → Agregar las 5 variables faltantes a .env.local y Vercel
  → Crear cuenta Resend y obtener API key

Paso 3 — PWA config (hoy, 20 min)
  → next.config.ts, manifest.json, layout.tsx, InstallBanner
  → Generar íconos en realfavicongenerator.net

Paso 4 — Base de datos (día 2, 30 min)
  → src/lib/db/index.ts, schema.ts, drizzle.config.ts
  → npm run db:push → verificar 10 tablas en Neon
  → constants.ts, free-slots.ts, recommendations.ts

Paso 5 — Autenticación (día 2-3, 45 min)
  → auth.ts, middleware.ts
  → login/page.tsx, verify/page.tsx, consent/page.tsx
  → get-session.ts

Paso 6 — Tests (día 3, 20 min)
  → vitest.config.ts, setup.ts, tests/
  → npm run test → verde

Paso 7 — CI actualizado (día 3, 10 min)
  → Reemplazar ci.yml con versión completa
  → git push → verificar Actions verde

Paso 8 — Verificación final (día 3-4)
  → npm run build sin errores
  → npm start → instalar PWA en móvil real
  → Chrome DevTools → Service Workers activo
  → Login con @unsa.edu.pe → consent → dashboard
```

---

## Checklist de salida del Sprint 0 (DoD Nivel 3)

```
ESTRUCTURA
[ ] src/ directory con todas las subcarpetas
[ ] No hay código en app/ raíz (movido a src/app/)

PWA
[ ] @ducanh2912/next-pwa instalado y configurado
[ ] manifest.json con íconos en public/icons/
[ ] layout.tsx sin userScalable (WCAG 2.1 AA)
[ ] InstallBanner funcionando en móvil real
[ ] sw.js y workbox-*.js en .gitignore

BASE DE DATOS
[ ] 10 tablas creadas en Neon (db:push sin errores)
[ ] CURRENT_SEMESTER desde env (no hardcodeado)
[ ] free-slots.ts y recommendations.ts implementados

AUTENTICACIÓN
[ ] Magic link funciona con @unsa.edu.pe
[ ] Rechaza correos que no sean @unsa.edu.pe
[ ] Pantalla de consentimiento Ley 29733 activa
[ ] consent_accepted_at se graba en users
[ ] getSessionUser() redirige si no hay consentimiento

CI/CD
[ ] GitHub Actions: lint ✅ typecheck ✅ tests ✅ build ✅
[ ] Branch protection activa en main
[ ] Badge CI en README

TESTS
[ ] vitest.config.ts con alias @/* y thresholds
[ ] Tests free-slots: todos en verde
[ ] Tests recommendations: todos en verde
[ ] Coverage ≥ 80% en free-slots.ts y recommendations.ts

VARIABLES DE ENTORNO
[ ] Todas las 8 variables en .env.local
[ ] Todas las 8 variables en Vercel
```

---

*UNSA Connect · Auditoría Sprint 0 · Junio 2026*
