# UNSA Connect — North Star Metric & Árbol de Métricas
> Framework: North Star Metric (Ellis, 2010; Amplitude, 2024)
> Complemento: Metric Trees (Cagan, 2017) + HEART Framework (Google, 2010)
> UNSA Connect · Pre-planning Fase 0 · Junio 2026

---

## Por qué una North Star Metric

Las bigtechs operan con una única métrica polar que representa el valor que el producto entrega
al usuario — no el valor que el negocio extrae de él. Si esa métrica sube, todo lo demás sube
en consecuencia: retención, ingresos, NPS, boca a boca.

Sin una North Star definida, los equipos optimizan métricas locales que pueden crecer mientras
el producto muere: más registros de usuarios que nunca activan el producto, más actividades en
el repositorio que nadie consulta, más sesiones cortas que no generan valor real.

> "The North Star Metric is the single metric that best captures the core value your product
> delivers to your customers."
> — Amplitude, *North Star Playbook* (2024)

---

## Proceso de definición

Una North Star válida cumple seis criterios (Amplitude, 2024):

| Criterio | Pregunta de verificación |
|---|---|
| Expresa valor al usuario | ¿Representa algo que el usuario quiere, no solo que el negocio mide? |
| Representa la visión del producto | ¿Si esta métrica crece, el producto está cumpliendo su propósito? |
| Es un leading indicator | ¿Predice el éxito futuro, no solo registra el pasado? |
| Es accionable | ¿El equipo puede influir en ella con decisiones de producto? |
| Es comprensible | ¿Cualquier integrante del equipo puede explicarla en una oración? |
| No es una vanity metric | ¿Sería difícil manipularla artificialmente sin entregar valor real? |

---

## Candidatas evaluadas

### Candidata 1 — Registros de usuarios (DAU/MAU)
Usuarios activos diarios o mensuales.

**Problema:** Es una vanity metric. Un usuario puede abrir la app, ver que no hay actividades
compatibles con su horario, y cerrarla. El registro de sesión no implica valor entregado.
Rechazada por no expresar valor al usuario (criterio 1).

---

### Candidata 2 — Actividades en el repositorio
Número de actividades publicadas por las unidades UNSA.

**Problema:** Es una métrica de supply, no de valor al usuario. Un repositorio con 500
actividades desactualizadas o irrelevantes no entrega ningún valor. Rechazada por no ser
accionable desde el lado del usuario (criterio 4).

---

### Candidata 3 — Actividades guardadas por usuario activo por semana
Número promedio de actividades que un usuario guarda en "Mis actividades" en una semana.

**Problema:** Guardar una actividad no implica asistir. El usuario puede guardar 10 actividades
y no ir a ninguna. Es un proxy débil del valor real. Útil como input metric, no como North Star.

---

### Candidata 4 — Huecos aprovechados por usuario activo por semana ← ELEGIDA
Número promedio de intervalos de tiempo libre en los que el usuario asistió a una actividad
recomendada por la plataforma, por semana, entre usuarios con horario registrado y al menos
1 semana de uso.

**Evaluación contra los seis criterios:**

| Criterio | Evaluación |
|---|---|
| Expresa valor al usuario | ✅ Captura exactamente la propuesta de valor: transformar tiempo muerto en tiempo aprovechado |
| Representa la visión | ✅ Si este número sube, el producto está cumpliendo su misión declarada |
| Leading indicator | ✅ Predice retención (usuario que aprovecha huecos tiene razón para volver), NPS e ingresos premium |
| Accionable | ✅ El equipo puede influir via: calidad del motor de recomendación, volumen del repositorio, notificaciones, UX del onboarding |
| Comprensible | ✅ "Cuántos huecos por semana convierte la app en tiempo aprovechado, por estudiante" |
| No es vanity metric | ✅ Solo sube si el estudiante realmente asiste; requiere comportamiento real, no solo uso de la app |

---

## North Star Metric definida

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   HUECOS APROVECHADOS POR USUARIO ACTIVO POR SEMANA             ║
║                                                                  ║
║   Definición técnica:                                            ║
║   Promedio de intervalos libres en los que el usuario marcó      ║
║   asistencia a una actividad recomendada, en los últimos 7       ║
║   días, entre usuarios con horario registrado y ≥ 1 semana       ║
║   de uso de la plataforma.                                       ║
║                                                                  ║
║   Fórmula:                                                       ║
║   NSM = Σ(asistencias_marcadas) / usuarios_activos_semana        ║
║                                                                  ║
║   Targets:                                                       ║
║   Piloto beta (semana 4):  NSM ≥ 0.5                            ║
║   Lanzamiento (Q4 2026):   NSM ≥ 1.0                            ║
║   Año 1 estable (2027):    NSM ≥ 1.5                            ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

**Interpretación de los targets:**
- NSM = 0.5 significa que, en promedio, cada usuario activo aprovecha al menos 1 hueco
  cada 2 semanas. Umbral mínimo de viabilidad del concepto.
- NSM = 1.0 significa 1 hueco aprovechado por semana por usuario. Punto de inflexión:
  el producto se vuelve parte del hábito semanal del estudiante.
- NSM = 1.5 significa que usuarios con 3-4 huecos semanales aprovechan al menos 1-2.
  Nivel de consolidación consistente con retención D28 ≥ 40%.

---

## Árbol de métricas (Metric Tree)

El árbol descompone la North Star en métricas de input accionables por el equipo.
Basado en Cagan (2017) y el modelo de Amplitude (2024).

```
                    NORTH STAR
         Huecos aprovechados / usuario / semana
                          │
          ┌───────────────┼───────────────┐
          │               │               │
    AMPLITUD          FRECUENCIA       CONVERSIÓN
  ¿Cuántos          ¿Con qué         ¿Del hueco a
  usuarios          frecuencia       la asistencia?
  tienen huecos     vuelven?
  detectados?
          │               │               │
    ┌─────┴────┐    ┌─────┴────┐    ┌─────┴────┐
    │          │    │          │    │          │
  % usuarios  Vol. Retención  NPS  % huecos   Ratio
  con horario activ. D7/D28        con rec.   rec→asist.
  registrado  en repo.             disponible
    │                                    │
    └──────────────┬─────────────────────┘
                   │
           MÉTRICAS DE PROCESO
           (upstream, más accionables)
                   │
    ┌──────────────┼──────────────┐
    │              │              │
  % completación  Actividades   Tiempo promedio
  onboarding      en repositorio  1ª rec. → guardar
  (A-01)          actualizadas    (UX friction)
                  (A-06)
```

---

## Métricas de input por capa

### Capa 1 — Amplitud (¿cuántos usuarios llegan al valor?)

| Métrica | Definición | Target piloto | Palanca de equipo |
|---|---|---|---|
| **Tasa de activación** | % de usuarios que completa el registro de horario en las primeras 24h | ≥ 60% | UX onboarding (A-01) |
| **Huecos detectados / usuario** | Promedio de intervalos libres identificados por el algoritmo por usuario activo | ≥ 3 / semana | Algoritmo de detección |
| **Cobertura del repositorio** | % de huecos que tienen al menos 1 actividad compatible disponible | ≥ 50% | Convenio Bienestar UNSA (A-06) |

### Capa 2 — Frecuencia (¿con qué regularidad vuelven?)

| Métrica | Definición | Target piloto | Palanca de equipo |
|---|---|---|---|
| **Retención D7** | % de usuarios que vuelve a la app 7 días después del primer uso | ≥ 40% | Notificaciones, valor de recomendaciones |
| **Retención D28** | % de usuarios que vuelve 28 días después | ≥ 25% | Variedad de actividades, personalización |
| **Sesiones / usuario / semana** | Promedio de veces que el usuario abre la app | ≥ 2 | Push notifications, novedad del repositorio |

### Capa 3 — Conversión (¿del descubrimiento a la asistencia?)

| Métrica | Definición | Target piloto | Palanca de equipo |
|---|---|---|---|
| **Ratio rec → guardada** | Actividades guardadas / actividades recomendadas mostradas | ≥ 15% | Calidad del motor de recomendación (ADR-004) |
| **Ratio guardada → asistida** | Actividades marcadas como asistidas / actividades guardadas | ≥ 40% | Notificaciones de recordatorio, UX de asistencia |
| **Tiempo a primera asistencia** | Días desde registro hasta primera asistencia marcada | ≤ 7 días | Onboarding, calidad del repositorio inicial |

---

## Anti-métricas (lo que NO se optimiza)

Las anti-métricas son indicadores que el equipo podría inflar artificialmente sin entregar
valor real. Documentarlas explícitamente previene incentivos perversos (Goodhart, 1975).

| Anti-métrica | Por qué no optimizarla |
|---|---|
| **Número de registros totales** | Un usuario registrado que nunca activa el horario no entrega valor. Se puede inflar con campañas agresivas de adquisición. |
| **Páginas vistas / sesión** | Más páginas puede significar confusión en la navegación, no engagement. |
| **Actividades en el repositorio** | 500 actividades desactualizadas son peores que 50 verificadas y vigentes. |
| **Tiempo en la app** | UNSA Connect no es una red social. El éxito es que el usuario encuentre la actividad rápido y vaya. Una sesión de 30 segundos que termina en asistencia es mejor que 10 minutos de exploración sin resultado. |
| **NPS como métrica principal** | El NPS mide satisfacción declarada, que puede divergir del comportamiento real. Útil como métrica de salud, no como North Star. |

> "Cuando una medida se convierte en un objetivo, deja de ser una buena medida."
> — Goodhart, C. (1975). *Problems of monetary management*. (Ley de Goodhart)

---

## Conexión con el modelo de negocio freemium

La North Star conecta directamente con la sostenibilidad financiera del proyecto:

```
NSM ↑ (más huecos aprovechados)
    ↓
Mayor retención D28
    ↓
Mayor base de usuarios activos mensuales (UAM)
    ↓
Mayor exposición al módulo premium (certificados digitales)
    ↓
Mayor tasa de conversión premium (target: ≥ 5% de UAM al año 2)
    ↓
Ingresos propios que cubren costo de mantenimiento (S/ 1,500-5,000/mes)
```

Un NSM de 1.5 en una base de 7,994 UAM (escenario moderado 2027) implica ~12,000 asistencias
semanales a actividades UNSA. Cada una de esas asistencias es un candidato a solicitar un
certificado digital (módulo premium), lo que convierte el valor de usuario en ingreso real.

---

## Implementación técnica de la medición

```typescript
// Tabla en Neon Postgres — ya incluida en el ERD (Doc 6)
// user_activities: { id, user_id, activity_id, status, attended_at }

// Query para calcular NSM semanal
SELECT
  COUNT(*) FILTER (WHERE ua.status = 'attended'
                   AND ua.attended_at >= NOW() - INTERVAL '7 days')
  /
  NULLIF(COUNT(DISTINCT u.id) FILTER (
    WHERE u.has_schedule = true
    AND u.created_at <= NOW() - INTERVAL '7 days'
  ), 0) AS nsm_semanal
FROM users u
LEFT JOIN user_activities ua ON ua.user_id = u.id;
```

**Dashboard de métricas:**
- Herramienta: Vercel Analytics (gratis) para métricas de frontend.
- Métricas de negocio: query directa a Neon desde panel admin (Next.js route protegida).
- Sentry: alertas si el NSM cae > 20% semana sobre semana.

---

## Cadencia de revisión

| Frecuencia | Qué se revisa | Quién |
|---|---|---|
| Semanal (piloto) | NSM, tasa de activación, ratio rec→asistida | Todo el equipo |
| Quincenal (piloto) | Retención D7, cobertura del repositorio | Responsable de producto |
| Mensual (post-lanzamiento) | NSM vs. target, anti-métricas, árbol completo | Todo el equipo |
| Por sprint | ¿Las features del sprint movieron alguna métrica de input? | Retrospectiva |

---

## Referencias

- Amplitude. (2024). *North Star Playbook: How to find your product's North Star Metric*.
  https://amplitude.com/north-star
- Cagan, M. (2017). *Inspired: How to create tech products customers love* (2.ª ed.).
  Wiley. Cap. 7: Defining product success.
- Ellis, S. (2010). *Find a growth hacker for your startup*. Startup Marketing Blog.
  https://www.startup-marketing.com/where-are-all-the-growth-hackers/
- Google. (2010). *Measuring the user experience on a large scale: User-centered metrics
  for web applications* (HEART Framework). CHI 2010.
- Goodhart, C. A. E. (1975). Problems of monetary management: The UK experience.
  Papers in Monetary Economics, Reserve Bank of Australia.
- Hernández García, J., et al. (2024). Gestión del tiempo en estudiantes universitarios.
  *Revista de Psicología Educativa, 30*(1), 12-28.
- INEI. (2025). *Informe técnico TIC II Trimestre 2025*. Lima: INEI.
- UNSA. (2024). *Memoria Anual 2024*. Arequipa: Universidad Nacional de San Agustín.

---

*UNSA Connect · North Star Metric · Junio 2026*
*Próxima revisión: semana 4 del piloto beta con datos reales.*
