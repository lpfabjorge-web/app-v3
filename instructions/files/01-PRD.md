# PRD — Product Requirements Document
## UNSA Connect

| Campo | Valor |
|---|---|
| Versión | 1.0 |
| Fecha | Junio 2026 |
| Estado | Borrador para revisión |
| Producto | UNSA Connect — Plataforma web (mobile-first) |
| Plataforma técnica | Next.js + Tailwind + Supabase + Vercel |

---

## 1. Resumen ejecutivo

UNSA Connect es una plataforma web mobile-first dirigida a los **26,648 estudiantes** de la Universidad Nacional de San Agustín de Arequipa. Permite a cada estudiante registrar su horario académico, detectar automáticamente sus tiempos libres durante el día, y descubrir actividades (deportivas, culturales, académicas, de bienestar) compatibles con esos espacios — con geolocalización de servicios universitarios y certificación digital de participación.

A diferencia de la app oficial SISACAPP (que solo permite *consultar* información académica), UNSA Connect convierte esa información en **acción**: tiempo libre detectado → oportunidad de desarrollo personal recomendada.

---

## 2. Problema y oportunidad

**Problema:** los estudiantes tienen huecos entre clases que no aprovechan porque no saben qué actividades existen, dónde son, ni si coinciden con su disponibilidad. La información de eventos/talleres está dispersa (redes sociales, carteles físicos, boletines de cada facultad).

**Oportunidad:** centralizar esa información, cruzarla automáticamente con el horario personal de cada estudiante, y presentarla en el momento y formato correcto (mobile, en el celular que ya llevan).

**Diferenciación frente a referentes (ej. app PUCP / SISACAPP UNSA):**
- Ambas son principalmente informativas/consultivas.
- UNSA Connect además **recomienda activamente** según el tiempo libre real del estudiante.
- Incluye **geolocalización de servicios** y **certificación digital** como incentivo de participación.

---

## 3. Usuarios objetivo

### Persona principal — "Kenedy"
Estudiante de pregrado (ej. Economía, VII semestre). Usa el celular como dispositivo principal. Tiene horario fijo por semestre, con huecos entre clases que hoy pasa en el celular sin un propósito definido. Le interesa certificados/constancias que sumen a su CV.

### Persona secundaria — "Gestor de Imagen Institucional"
Personal administrativo de la oficina de Imagen Institucional. Necesita publicar eventos, talleres, charlas y actividades deportivas/culturales de forma rápida, sin depender de un desarrollador, con control de cupos y fechas.

---

## 4. Objetivos y métricas de éxito

| Objetivo | Métrica (KPI) | Meta v1 |
|---|---|---|
| Adopción | Estudiantes registrados | 500 en el primer mes (piloto) |
| Activación | % que completa su horario | > 60% de registrados |
| Engagement | % que ve recomendaciones al menos 1x/semana | > 40% |
| Valor real | Inscripciones a actividades vía la app | > 100 en el primer mes |
| Calidad técnica | Errores críticos en producción (Sentry) | 0 críticos sin resolver > 48h |

---

## 5. Alcance del producto (fases)

Se reestructura la visión completa del prototipo en **fases ejecutables**. Cada fase es un producto usable por sí mismo — no se libera nada a medio terminar.

### Fase 1 (v1.0) — Núcleo: Horario + Tiempos libres + Catálogo de actividades
- Registro/login de estudiante (correo institucional `@unsa.edu.pe`, vía Supabase Auth)
- Registro manual del horario semanal (curso, día, hora inicio/fin)
- Cálculo automático y visual de tiempos libres por día
- Dashboard: "hoy tienes X horas libres, hay Y actividades disponibles"
- Catálogo de actividades (eventos, talleres, conferencias, deportivas) — alimentado manualmente por Imagen Institucional vía panel de administración simple
- Pantalla de detalle de actividad (ubicación en texto, horario, cupos, descripción)
- Perfil básico del estudiante

### Fase 2 (v1.1) — Recomendaciones + Notificaciones
- Motor de recomendación por reglas: cruza tiempos libres del estudiante con horarios de actividades disponibles (sin IA todavía, basado en filtros/coincidencias)
- Sistema de alertas/notificaciones (nuevas actividades que calzan con su horario)
- Inscripción a actividades desde la app, con control de cupos

### Fase 3 (v1.2) — Geolocalización + Certificados
- Mapa de servicios universitarios y ubicación de actividades (Leaflet + OpenStreetMap, gratis)
- Generación de certificados digitales (PDF) por participación
- Historial de actividades del estudiante en su perfil

### Fase 4 (v2.0) — Inteligencia y escalamiento
- Importación de horario por foto (OCR + IA)
- Recomendaciones personalizadas por IA (no solo reglas)
- Gamificación (insignias, ranking de participación)
- Posible alianza institucional con DSA/UNSA para integración oficial

> **Regla de oro:** no se empieza una fase hasta que la anterior esté funcionando en producción (Vercel) con usuarios reales probándola.

---

## 6. Funcionalidades — Fase 1 en detalle

| Módulo | Descripción | Pantallas del prototipo asociadas |
|---|---|---|
| Onboarding | Presentación breve de la propuesta de valor (3 slides) | Onboarding |
| Autenticación | Registro/login con correo `@unsa.edu.pe`, aceptación de tratamiento de datos (Ley 29733) | Login |
| Horario | CRUD de clases (curso, día, hora inicio/fin), vista semanal | Dashboard (sección horario) |
| Detección de tiempos libres | Cálculo automático de huecos por día, mostrado visualmente | Dashboard |
| Catálogo de actividades | Lista de actividades por categoría (deportiva, académica, cultural, bienestar), con horario, ubicación (texto), cupos | Dashboard (recomendaciones) |
| Detalle de actividad | Información completa: descripción, beneficios, organiza, costo, cupos | Detalle |
| Perfil | Datos del estudiante, carrera, semestre | Perfil |
| Panel Imagen Institucional | CRUD de actividades (crear/editar/eliminar), accesible solo para rol "admin" | *(nuevo, no está en el prototipo visual)* |

---

## 7. Requisitos no funcionales

- **Seguridad:** autenticación vía Supabase Auth, contraseñas nunca en texto plano, variables sensibles en `.env.local` (nunca en el repo), HTTPS por defecto (Vercel).
- **Privacidad:** cumplimiento con la Ley N.° 29733 (Protección de Datos Personales, Perú) — consentimiento explícito ya contemplado en el prototipo (pantalla Login).
- **Accesibilidad:** contraste mínimo AA (ya mencionado como buena práctica en el prototipo).
- **Rendimiento:** carga inicial < 3s en conexión móvil 4G.
- **Disponibilidad:** monitoreo de errores activo (Sentry, ya integrado).
- **Escalabilidad:** base de datos (Supabase/Postgres) debe soportar hasta 26,648 usuarios potenciales sin rediseño de esquema.

---

## 8. Restricciones y supuestos

- No existe API pública del sistema académico de la UNSA (SISACAD/SISACAPP) → el horario se ingresa manualmente en Fase 1 (OCR queda para v2).
- El contenido de actividades depende de que la oficina de Imagen Institucional lo mantenga actualizado vía el panel de administración.
- Presupuesto: **$0** — toda la infraestructura debe operar dentro de tiers gratuitos (Vercel, Supabase, Sentry).
- No se requiere publicación en Play Store / App Store (es una web app responsive).

---

## 9. Roles y stakeholders

| Rol | Responsabilidad |
|---|---|
| Estudiante (usuario final) | Usa la app: horario, recomendaciones, inscripciones |
| Imagen Institucional (administrador de contenido) | Publica y gestiona actividades/eventos |
| Desarrollador (tú) | Construye, mantiene y despliega la plataforma |

---

## 10. Riesgos principales

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Imagen Institucional no alimenta el catálogo de actividades | Catálogo vacío, sin valor diferencial | Panel simple, definir flujo y responsable antes del lanzamiento |
| Estudiantes no quieren registrar su horario manualmente | Baja activación | UX simple, onboarding claro, valor visible inmediato |
| Límites de tiers gratuitos (Supabase/Vercel) ante 26,648 usuarios | Caída de servicio | Monitorear uso desde el inicio, plan de migración si se acerca al límite |

---

## 11. Glosario

- **MVP:** Producto Mínimo Viable — versión más simple que ya entrega valor real.
- **Tiempo libre / hueco:** espacio entre dos clases consecutivas en el horario del estudiante.
- **Imagen Institucional:** oficina de la UNSA responsable de comunicación y difusión de actividades.

---

## 12. Documentos relacionados (próximos)

- `02-CJM.md` — Customer Journey Map
- `03-US.md` — User Stories
- `04-UC.md` — Use Cases
- `05-AI.md` — Arquitectura de Información
- `06-UF.md` — User Flows
- `07-WF.md` — Wireframes (formalización del prototipo)
- `08-UIKIT.md` — UI Kit
- `09-ERD.md` — Entity Relationship Diagram
- `10-TDD.md` — Technical Design Document
