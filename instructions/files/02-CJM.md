# CJM — Customer Journey Map
## UNSA Connect

| Campo | Valor |
|---|---|
| Versión | 1.0 |
| Documento base | 01-PRD.md |
| Persona | Kenedy — estudiante de pregrado UNSA |
| Alcance cubierto | Fase 1 (v1.0), con nota de Fases 2-3 donde aplica |

---

## 1. Propósito de este documento

Mapear el recorrido completo de Kenedy a través de UNSA Connect, identificando en cada etapa: qué hace, qué piensa/siente, qué puede salir mal, y qué oportunidad de diseño existe. Este mapa alimenta directamente las **User Stories** (siguiente documento), priorizando primero las etapas con mayor riesgo de abandono.

---

## 2. Resumen visual

Las 4 etapas centrales de la Fase 1, con su tono emocional dominante:

| Etapa | Tono | Riesgo principal |
|---|---|---|
| 1. Descubrimiento | Neutral | Que Kenedy nunca se entere de que la app existe |
| 2. Registro y onboarding | Fricción | Abandono si el formulario es largo o confuso |
| 3. Carga de horario | Fricción | Tedio si ingresar ~20 clases toma demasiado tiempo |
| 4. Dashboard y exploración | Valor (momento "aha") | Que el valor no se perciba inmediatamente |

---

## 3. Etapa 1 — Descubrimiento

| Aspecto | Detalle |
|---|---|
| **Acciones** | Kenedy ve una publicación de Imagen Institucional en redes sociales, un afiche en el campus, o recibe la recomendación de un compañero. Hace clic en el enlace. |
| **Touchpoints** | Instagram/Facebook de UNSA, grupos de WhatsApp de la facultad, afiches físicos con código QR |
| **Pensamientos** | "¿Otra app más de la universidad?" — escepticismo inicial |
| **Emociones** | Curiosidad leve, escepticismo |
| **Puntos de dolor** | Saturación de apps/canales institucionales; riesgo de ser ignorada como "spam académico" |
| **Oportunidades** | Mensaje de difusión enfocado en el beneficio concreto ("descubre qué hacer en tus horas libres"), no en lo institucional. Splash screen del prototipo ya comunica esto: *"Convierte tus huecos en oportunidades de desarrollo"* |

---

## 4. Etapa 2 — Registro y onboarding

| Aspecto | Detalle |
|---|---|
| **Acciones** | Ve 3 slides de onboarding → toca "Comenzar" → ingresa correo `@unsa.edu.pe` y contraseña → acepta tratamiento de datos (Ley 29733) |
| **Touchpoints** | Pantallas Onboarding y Login del prototipo |
| **Pensamientos** | "¿Esto es solo para gente de mi facultad o de toda la UNSA?" / "¿Por qué necesitan mi correo institucional?" |
| **Emociones** | Cautela (datos personales), impaciencia si el formulario es largo |
| **Puntos de dolor** | Validación estricta de correo institucional puede generar errores confusos si el estudiante usa otro correo por error; checkbox legal puede sentirse como "letra pequeña" |
| **Oportunidades** | Permitir "Omitir" en onboarding (ya contemplado); mensaje claro de por qué se requiere correo institucional ("así verificamos que eres de la UNSA y tus certificados son válidos") |

---

## 5. Etapa 3 — Carga del horario académico

| Aspecto | Detalle |
|---|---|
| **Acciones** | Ingresa cada curso: nombre, día, hora inicio, hora fin. Repite ~15-25 veces (carga típica de un semestre) |
| **Touchpoints** | Formulario de horario (ya construido como primer prototipo funcional) |
| **Pensamientos** | "Esto va a tomar rato" / "¿Vale la pena hacerlo ahora?" |
| **Emociones** | Esta es la etapa de **mayor riesgo de abandono** de toda la Fase 1 — fricción pura sin recompensa inmediata |
| **Puntos de dolor** | 20+ entradas manuales es tedioso; si el estudiante abandona aquí, nunca llega al "momento aha" |
| **Oportunidades** | (v1.0) Mensajes de progreso ("¡Ya tienes 5 cursos! Con 2-3 más verás tu primer hueco libre"); permitir guardar y continuar después. (v2.0) OCR por foto elimina esta fricción por completo — **es la mejora de mayor impacto en retención** |

---

## 6. Etapa 4 — Dashboard y exploración (momento "aha")

| Aspecto | Detalle |
|---|---|
| **Acciones** | Ve su horario de hoy con los huecos libres resaltados; ve actividades disponibles en esos horarios; toca una para ver el detalle |
| **Touchpoints** | Dashboard (Home) y pantalla de Detalle del prototipo |
| **Pensamientos** | "Ah, mira — tengo 2 horas libres y hay un taller de mindfulness justo en ese horario" |
| **Emociones** | Sorpresa positiva, sensación de utilidad real — **este es el momento que justifica todo el esfuerzo anterior** |
| **Puntos de dolor** | Si el catálogo de actividades está vacío (porque Imagen Institucional no lo alimentó), este momento se rompe y la app pierde su propuesta de valor |
| **Oportunidades** | Garantizar que **siempre** haya contenido mínimo en el catálogo antes del lanzamiento (aunque sea curado manualmente al inicio); mostrar mensajes alternativos si no hay actividades exactas ("no hay actividades en este horario, pero aquí hay servicios que puedes visitar" → enlaza con Fase 3, geolocalización) |

---

## 7. Etapas futuras (Fase 2-3, referencia)

| Etapa | Fase | Nota |
|---|---|---|
| 5. Inscripción a actividad | v1.1 | Kenedy confirma su asistencia, se reserva un cupo |
| 6. Recordatorio / notificación | v1.1 | La app le avisa antes de que empiece la actividad |
| 7. Participación y certificación | v1.2 | Tras participar, descarga su certificado en PDF |
| 8. Retorno habitual | v1.2+ | Kenedy revisa la app cada mañana como rutina, similar a revisar el clima |

---

## 8. Conclusión para priorización

Las etapas 2 y 3 (registro y carga de horario) son las de mayor riesgo y **menor recompensa percibida** — son "el precio de entrada". El diseño de las User Stories debe priorizar minimizar la fricción ahí, y maximizar la claridad del valor en la etapa 4, que es donde se decide si Kenedy vuelve a usar la app al día siguiente.
