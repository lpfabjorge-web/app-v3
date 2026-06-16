# CONTEXT — Handoff para próxima sesión de Claude
## UNSA Connect · Documentación en progreso · Junio 2026

> Este archivo es el punto de partida obligatorio. Léelo completo antes de generar cualquier documento.
> No inventes decisiones que no estén aquí — todo lo relevante ya fue resuelto.

---

## 1. Qué es este proyecto

**UNSA Connect** — plataforma web mobile-first para los **26,648 estudiantes** de la Universidad Nacional de San Agustín (UNSA), Arequipa, Perú.

**Propuesta de valor en una línea:** registras tu horario académico → la app detecta tus huecos libres → te recomienda actividades universitarias (talleres, deportes, conferencias) compatibles con ese tiempo.

**Diferencia clave vs. SISACAPP (app oficial UNSA) y app PUCP:** ellas son informativas/consultivas. UNSA Connect convierte tiempo muerto en acción recomendada, con geolocalización y certificación digital.

---

## 2. Stack técnico — DECIDIDO, no cambiar

| Capa | Tecnología | Doc de referencia |
|---|---|---|
| Framework | Next.js 15 (App Router, sin Turbopack) | ADR-001 |
| Estilos | Tailwind CSS v4 | 01-PRD |
| Base de datos | Neon Postgres + Drizzle ORM | ADR-002 |
| Autenticación | NextAuth v5 magic link (@unsa.edu.pe) | ADR-003 |
| Motor recomendación | Algoritmo de intersección de intervalos (sin ML en v1) | ADR-004 |
| PWA | @ducanh2912/next-pwa | ADR-005 |
| Deploy | Vercel (ya conectado a GitHub: lpfabjorge-web/mi-app) | 01-PRD |
| Monitoreo | Sentry (ya integrado) | 07-Sprint0Audit |
| Email | Resend (magic link) | 04-ADRs |
| Mapa | Leaflet + OpenStreetMap (fase 3) | 01-PRD |
| Tests | Vitest + Testing Library | 07-Sprint0Audit |

**Estructura de carpetas objetivo:**
```
src/
├── app/
│   ├── (auth)/login/, /consent/, /verify/
│   └── (app)/dashboard/, /horario/, /actividades/, /perfil/
├── components/ui/, pwa/, schedule/, activities/
├── lib/db/index.ts, schema.ts · free-slots.ts · recommendations.ts · auth.ts
├── types/
└── tests/lib/, api/
```

---

## 3. Personas — DEFINIDAS

**Kenedy** (usuario principal): estudiante de pregrado UNSA, celular como dispositivo primario, tiene huecos entre clases sin aprovechar, le interesan certificados para su CV.

**Gestor Imagen Institucional** (admin de contenido): publica y gestiona eventos/talleres/actividades desde un panel simple dentro de la misma app.

---

## 4. Fases del producto — DEFINIDAS en 01-PRD

| Fase | Alcance | Estado |
|---|---|---|
| v1.0 | Horario manual + tiempos libres + catálogo actividades + panel admin | 🔨 En construcción |
| v1.1 | Motor recomendación por reglas + notificaciones + inscripción con cupos | ⏳ Pendiente |
| v1.2 | Geolocalización (Leaflet) + certificados digitales PDF | ⏳ Pendiente |
| v2.0 | OCR por foto + recomendación IA + gamificación | ⏳ Pendiente |

**Regla de oro:** no se empieza una fase hasta que la anterior esté en producción con usuarios reales.

---

## 5. North Star Metric — DEFINIDA en 03-NorthStar

```
NSM = Huecos aprovechados / usuario activo / semana
Targets: piloto ≥ 0.5 · lanzamiento ≥ 1.0 · año 1 ≥ 1.5
```

---

## 6. Decisiones de arquitectura ya tomadas (04-ADRs)

- **ADR-001:** Next.js App Router con API Routes (no servidor separado)
- **ADR-002:** Drizzle ORM + Neon Postgres (no Prisma, no Supabase)
- **ADR-003:** NextAuth magic link, solo @unsa.edu.pe, sin contraseñas
- **ADR-004:** Motor de recomendación = intersección de intervalos de tiempo (no ML)
- **ADR-005:** PWA con @ducanh2912/next-pwa (no app nativa, no Expo)

---

## 7. Marco legal — CRÍTICO

**Ley N.° 29733** (Protección de Datos Personales, Perú): consentimiento explícito obligatorio antes del primer uso. La pantalla de consentimiento ya está contemplada en el prototipo (Login screen). El campo `consent_accepted_at` debe grabarse en la tabla `users`. Cualquier feature que recolecte datos nuevos requiere actualizar el consentimiento.

---

## 8. Prototipo visual existente

El archivo `Entregable_v4_Prototipo_App_UNSA_Connect.html` contiene 6 pantallas:
- **Splash:** logo UNSA Connect, tagline "Convierte tus huecos en oportunidades"
- **Onboarding:** 3 slides de propuesta de valor, botón "Omitir"
- **Login:** campo correo @unsa.edu.pe, checkbox consentimiento Ley 29733
- **Dashboard (Home):** huecos libres del día + actividades recomendadas + navegación inferior (Inicio/Horario/Alertas/Perfil)
- **Detalle:** info completa de una actividad (ubicación, cupos, descripción, beneficios)
- **Perfil:** datos del estudiante, carrera, semestre, historial

**Identidad visual del prototipo:**
- Colores: azul UNSA (#003087 aprox.) + dorado (#FFD700 aprox.)
- Tipografías: Syne (headings) + DM Sans (body)
- Navegación: bottom navigation bar, 4 ítems

---

## 9. Documentos ya completados

| # | Archivo | Contenido | Estado |
|---|---|---|---|
| 00 | CONTEXT.md | Este archivo | ✅ |
| 01 | PRD.md | Requisitos, fases, métricas, restricciones | ✅ |
| 02 | CJM.md | Journey de Kenedy, 4 etapas, riesgos | ✅ |
| 03 | NorthStar.md | NSM, árbol de métricas, anti-métricas | ✅ |
| 04 | ADRs.md | 5 decisiones de arquitectura con contexto y consecuencias | ✅ |
| 05 | AssumptionMap.md | Supuestos críticos con experimentos de validación | ✅ |
| 06 | DoD.md | Definition of Done en 3 niveles (tarea/feature/sprint) | ✅ |
| 07 | Sprint0Audit.md | Gaps técnicos del repo actual con soluciones paso a paso | ✅ |

---

## 10. Documentos pendientes — tu tarea

Genera cada uno en orden. Cada documento depende del anterior.

### 08-US.md — User Stories
- Formato: "Como [rol], quiero [acción], para [beneficio]"
- Criterios de aceptación por historia (formato Given/When/Then)
- Prioridad MoSCoW (Must/Should/Could/Won't) por fase
- Roles: Kenedy (estudiante), Gestor Imagen Institucional (admin)
- Mapeadas a las fases del PRD (v1.0 primero, luego v1.1, v1.2)
- Las etapas de mayor riesgo del CJM (registro + carga de horario) deben tener más historias de calidad UX que las demás
- Incluir historias para el panel de administración (Imagen Institucional)

### 09-UC.md — Use Cases
- Versión técnica detallada de las User Stories más críticas
- Flujo principal + flujos alternativos + flujos de error
- Precondiciones y postcondiciones
- Foco en: "registrar horario", "detectar tiempos libres", "ver recomendaciones", "inscribirse a actividad", "publicar actividad (admin)"

### 10-AI.md — Arquitectura de Información
- Mapa de navegación completo (todas las rutas de la app)
- Jerarquía de contenido por pantalla
- Basarse en las 6 pantallas del prototipo + panel admin
- Incluir estructura de URL (ej. /horario, /actividades/[id], /admin/actividades)
- Navegación bottom bar: Inicio / Horario / Alertas / Perfil

### 11-UF.md — User Flows
- Diagramas de flujo paso a paso (texto estructurado con → y ramas)
- Flujos obligatorios: onboarding completo, registro de primera clase, ver primera recomendación, inscribirse a actividad, publicar actividad (admin), recuperar sesión expirada
- Incluir decisiones (rombos) y estados de error

### 12-WF.md — Wireframes
- Formalización textual/estructurada de las 6 pantallas del prototipo + panel admin
- Descripción componente a componente por pantalla
- Especificar comportamiento de cada elemento interactivo
- Anotar los estados vacíos y de carga (DoD Nivel 2 los requiere)

### 13-UIKit.md — UI Kit
- Extraído del prototipo visual (colores, tipografías, espaciados)
- Colores en HEX: primario (azul UNSA), secundario (dorado), neutros, semánticos (error/success/warning)
- Tipografías: Syne (headings h1-h4) + DM Sans (body, labels, captions) con tamaños en px/rem
- Componentes base: Button (variantes), Input, Card, Badge, BottomNav, Modal, Skeleton loader, Toast/Alert
- Para cada componente: variantes, estados (default/hover/disabled/error), especificaciones CSS/Tailwind

### 14-ERD.md — Entity Relationship Diagram
- Basarse en las 13 tablas del Sprint 0 Audit: users, accounts, sessions, verification_tokens, schedules, schedule_blocks, free_slots, categories, activities, activity_slots, user_activities, user_interests, data_processing_log
- Para cada tabla: campos con tipo, PK, FK, constraints, índices relevantes
- Diagrama textual (notación ERD simplificada) + descripción de relaciones
- Incluir campo `consent_accepted_at` en users (Ley 29733)
- Incluir campo `CURRENT_SEMESTER` como constante desde env (no hardcodeado)
- La tabla `free_slots` debe soportar el algoritmo de intersección del ADR-004

### 15-TDD.md — Technical Design Document
- Arquitectura completa del sistema (cómo se conectan todos los componentes)
- Flujo de autenticación magic link paso a paso (Resend → NextAuth → Neon)
- Algoritmo de detección de tiempos libres (pseudocódigo + complejidad O(n))
- Algoritmo de recomendación v1 (intersección de intervalos, ADR-004)
- Endpoints de API (rutas Next.js): lista con método, ruta, auth requerida, input/output
- Variables de entorno: tabla completa con descripción, ejemplo y dónde configurar
- Límites de tiers gratuitos y plan de contingencia si se acercan

---

## 11. Restricciones de formato

- Un archivo Markdown por documento
- Numeración: `08-US.md`, `09-UC.md`, etc.
- Cada documento debe referenciar el número de documento base del que depende
- Tablas para información comparativa, prosa para explicaciones, bloques de código para especificaciones técnicas
- No inventar decisiones tecnológicas — todo está en los ADRs
- No cambiar el stack ni las fases — están cerradas en el PRD

---

## 12. Cómo empezar

1. Lee este archivo completo (ya lo hiciste)
2. Pide al usuario: "¿Continúo con 08-US.md (User Stories)?"
3. Genera el documento, preséntalo, espera aprobación
4. Continúa con el siguiente en orden

No generes más de un documento por turno sin aprobación del usuario.
