# UNSA Connect — Architecture Decision Records (ADRs)
> Formato: MADR v3.0 (Markdown Any Decision Records — Zimmermann et al., 2021)
> Estado del documento: Vivo — cada ADR se revisa si el contexto cambia.
> Equipo: UNSA Connect · Formulación de Proyectos 2026

---

## Índice

| ID | Título | Estado | Fecha |
|---|---|---|---|
| ADR-001 | Next.js API Routes vs. backend separado | Aceptada | Jun 2026 |
| ADR-002 | Drizzle ORM vs. Prisma | Aceptada | Jun 2026 |
| ADR-003 | Magic link vs. OAuth / contraseña | Aceptada | Jun 2026 |
| ADR-004 | Algoritmo de intersección v1 vs. ML | Aceptada | Jun 2026 |
| ADR-005 | PWA vs. app nativa (React Native / Flutter) | Aceptada | Jun 2026 |

---

## ADR-001 — Next.js API Routes como capa backend

**Estado:** Aceptada  
**Deciders:** Equipo UNSA Connect  
**Fecha:** Junio 2026

### Contexto

El proyecto necesita una capa de backend que exponga endpoints REST para autenticación, gestión de horarios, repositorio de actividades y motor de recomendación. El equipo tiene experiencia nula o mínima en desarrollo backend dedicado. El presupuesto es S/ 0 y la infraestructura de hosting ya está definida como Vercel.

### Opciones consideradas

**Opción A — Next.js API Routes (serverless en Vercel)** ← Elegida  
Las API Routes de Next.js permiten definir endpoints en `/app/api/[ruta]/route.ts` dentro del mismo repositorio. Se despliegan como Vercel Serverless Functions automáticamente.

**Opción B — Express.js en servidor dedicado (Render / Fly.io)**  
Backend Node.js clásico en servidor propio. Requiere configuración de CORS, gestión de proceso, y un servidor persistente separado.

**Opción C — FastAPI (Python)**  
Framework Python de alto rendimiento con generación automática de docs OpenAPI. Relevante dado que el equipo tiene experiencia en Python por la formación en econometría.

### Matriz de decisión

| Criterio | Peso | Next.js API Routes | Express.js | FastAPI |
|---|---|---|---|---|
| Curva de aprendizaje del equipo | 30% | ✅ Alto (mismo repo) | 🟡 Medio | 🟡 Medio |
| Costo de infraestructura | 25% | ✅ S/ 0 (Vercel free) | 🟡 Free tier con spin-down | 🟡 Free tier con spin-down |
| Velocidad de desarrollo MVP | 25% | ✅ Alto | 🟡 Medio | 🟡 Medio |
| Escalabilidad a largo plazo | 10% | 🟡 Limitaciones de tiempo de ejecución | ✅ Alto | ✅ Alto |
| Observabilidad / debugging | 10% | ✅ Sentry integrado | 🟡 Requiere config adicional | 🟡 Requiere config adicional |

### Decisión

Se adopta **Next.js API Routes**. La reducción de fricción operacional (un solo repositorio, un solo deploy, cero configuración de CORS, integración nativa con Vercel) supera las limitaciones de escalabilidad, que no son relevantes en el horizonte del MVP (500 usuarios beta) ni del lanzamiento oficial (< 8,000 UAM en 2027).

### Consecuencias

**Positivas:**
- Un solo `git push` despliega frontend y backend simultáneamente.
- Tipos TypeScript compartidos entre frontend y API eliminan una categoría entera de bugs.
- El free tier de Vercel cubre el volumen proyectado para MVP y piloto.

**Negativas:**
- Las Serverless Functions de Vercel tienen un límite de 10 segundos de ejecución en el free tier. El motor de recomendación debe ser computacionalmente ligero (confirmado por ADR-004).
- Si el proyecto escala a > 100,000 usuarios, esta decisión debe revisarse hacia un backend dedicado.

**Revisión recomendada:** Cuando el número de usuarios activos supere 10,000 o cuando el tiempo promedio de ejecución de `/api/recommendations` supere 3 segundos.

### Referencias
- Vercel. (2025). *Serverless Functions limits*. https://vercel.com/docs/functions/runtimes#max-duration
- Wieruch, R. (2023). *Next.js API Routes vs. separate backend*. https://www.robinwieruch.de/next-js-api-routes/
- Zimmermann, O., Kopp, O., & Zdun, U. (2021). *Markdown architectural decision records*. https://adr.github.io/madr/

---

## ADR-002 — Drizzle ORM como capa de acceso a datos

**Estado:** Aceptada  
**Deciders:** Equipo UNSA Connect  
**Fecha:** Junio 2026

### Contexto

El proyecto requiere un ORM (Object-Relational Mapper) para interactuar con Neon Postgres desde Next.js. La elección del ORM afecta directamente la experiencia de desarrollo, el rendimiento de las queries y la compatibilidad con el entorno serverless.

### Opciones consideradas

**Opción A — Drizzle ORM** ← Elegida  
ORM TypeScript-first, ligero (~7.4KB), con soporte nativo para conexiones serverless (Neon HTTP driver). Sintaxis cercana a SQL puro.

**Opción B — Prisma ORM**  
El ORM más adoptado en el ecosistema Next.js. Genera un cliente tipado, pero usa conexiones TCP persistentes que son problemáticas en entornos serverless.

**Opción C — Queries SQL directas con `postgres.js`**  
Sin abstracción ORM. Máximo control, mínima magia, pero requiere escribir SQL manualmente para cada operación.

### Matriz de decisión

| Criterio | Peso | Drizzle | Prisma | SQL directo |
|---|---|---|---|---|
| Compatibilidad con Neon serverless | 35% | ✅ Nativo (HTTP driver) | 🔴 Requiere Prisma Accelerate (pago) | ✅ Compatible |
| Type safety end-to-end | 25% | ✅ Inferencia automática | ✅ Cliente generado | 🔴 Manual |
| Tamaño del bundle | 20% | ✅ ~7.4KB | 🔴 ~6MB (genera cliente) | ✅ Mínimo |
| Curva de aprendizaje | 20% | 🟡 Medio (sintaxis SQL-like) | ✅ Bajo (abstracción alta) | 🔴 Alto |

### Decisión

Se adopta **Drizzle ORM**. El factor determinante es la compatibilidad con Neon serverless sin costo adicional. Prisma requiere Prisma Accelerate para gestionar conexiones en entornos serverless, lo que introduce un servicio de pago incompatible con el presupuesto del proyecto. Drizzle usa el driver HTTP de Neon, diseñado específicamente para este caso de uso.

### Consecuencias

**Positivas:**
- El schema de Drizzle define los tipos TypeScript automáticamente: el ERD del Doc 6 se convierte directamente en código.
- Queries tipadas en tiempo de compilación eliminan errores de tipo en accesos a base de datos.
- Compatible con el plan gratuito de Neon sin configuración adicional.

**Negativas:**
- Drizzle no genera migraciones automáticas tan maduras como Prisma; requiere mayor atención manual al evolucionar el schema.
- La comunidad y documentación son más pequeñas que Prisma, aunque han crecido significativamente en 2024-2025.

### Referencias
- Drizzle Team. (2025). *Drizzle ORM with Neon Postgres*. https://orm.drizzle.team/docs/connect-neon
- Neon. (2025). *Serverless driver*. https://neon.tech/docs/serverless/serverless-driver
- Prisma. (2025). *Prisma Accelerate pricing*. https://www.prisma.io/pricing

---

## ADR-003 — Magic link como mecanismo de autenticación

**Estado:** Aceptada  
**Deciders:** Equipo UNSA Connect  
**Fecha:** Junio 2026

### Contexto

La plataforma requiere autenticación de usuarios vinculada al correo institucional UNSA (`@unsa.edu.pe`) para garantizar que solo estudiantes activos accedan al servicio. La autenticación es además el punto de mayor fricción en el onboarding (ver A-01 en Assumption Map) y el nodo de cumplimiento de la Ley N.° 29733.

### Opciones consideradas

**Opción A — Magic link por correo (NextAuth.js Email Provider)** ← Elegida  
El usuario ingresa su correo `@unsa.edu.pe` y recibe un enlace de un solo uso con expiración de 10 minutos. Sin contraseñas.

**Opción B — OAuth con Google (`@gmail.com`)**  
Autenticación delegada a Google. Rápido de implementar, pero no vincula con el correo institucional UNSA.

**Opción C — Usuario y contraseña tradicional**  
Formulario de registro con email + contraseña. Requiere gestión de hashing (bcrypt), recuperación de contraseña y almacenamiento seguro.

**Opción D — OAuth con Microsoft (correo institucional UNSA)**  
Si la UNSA usa Microsoft 365, el correo `@unsa.edu.pe` podría autenticarse vía Azure AD. Requiere integración con la infraestructura de TI de la OUIS-UNSA.

### Matriz de decisión

| Criterio | Peso | Magic link | Google OAuth | Usuario/contraseña | Microsoft OAuth |
|---|---|---|---|---|---|
| Vinculación con correo UNSA | 35% | ✅ Directo | 🔴 No garantiza | ✅ Si se valida dominio | 🟡 Depende de OUIS |
| Seguridad (sin contraseñas que filtrar) | 25% | ✅ Alto | ✅ Alto | 🔴 Riesgo de breach | ✅ Alto |
| Fricción de onboarding | 20% | 🟡 Medio (requiere acceder al correo) | ✅ Bajo (1 click) | 🔴 Alto (formulario) | 🟡 Medio |
| Dependencia externa | 20% | ✅ Solo SMTP | 🟡 Google API | ✅ Ninguna | 🔴 OUIS-UNSA |

### Decisión

Se adopta **magic link con NextAuth.js Email Provider**, validando que el dominio del correo sea `@unsa.edu.pe` antes de enviar el enlace.

La autenticación por contraseña fue descartada porque introduce gestión de secretos del usuario (hashing, rotación, recuperación) que el equipo no está en posición de implementar de forma segura. OAuth con Google no garantiza la vinculación institucional. La integración con Microsoft/Azure AD depende de la OUIS-UNSA, una dependencia institucional fuera del control del equipo (consistente con el riesgo A-06 del Assumption Map).

### Consecuencias

**Positivas:**
- Cumplimiento de Ley N.° 29733: no se almacenan contraseñas, minimización de datos sensibles.
- El correo `@unsa.edu.pe` actúa como verificación implícita de membresía institucional.
- NextAuth.js maneja sesiones, tokens y rotación automáticamente.

**Negativas:**
- Depende de que el estudiante tenga acceso operativo a su correo UNSA. Si el correo está desactivado (egresados, suspendidos) o el estudiante no lo usa habitualmente, el flujo falla.
- Latencia de entrega del email puede generar fricción en el primer acceso (mitigación: indicar al usuario que revise spam).

**Revisión recomendada:** Si en el piloto beta el % de usuarios que completa el login desde el magic link es < 80%, evaluar agregar Google OAuth como alternativa secundaria (con validación de dominio).

### Referencias
- Auth0. (2024). *Passwordless authentication*. https://auth0.com/blog/passwordless-authentication-the-future-of-identity/
- NextAuth.js. (2025). *Email provider documentation*. https://next-auth.js.org/providers/email
- NIST. (2024). *Digital Identity Guidelines SP 800-63B*. https://pages.nist.gov/800-63-3/sp800-63b.html
- Ley N.° 29733 — Ley de Protección de Datos Personales. Art. 13: principio de seguridad.

---

## ADR-004 — Algoritmo de intersección de conjuntos v1 vs. ML para recomendaciones

**Estado:** Aceptada  
**Deciders:** Equipo UNSA Connect  
**Fecha:** Junio 2026

### Contexto

El núcleo diferencial de UNSA Connect es el motor de recomendación que cruza los huecos libres del estudiante con las actividades disponibles. La elección del algoritmo afecta la calidad percibida de las recomendaciones, la complejidad de implementación, el cumplimiento regulatorio y la trazabilidad (D.S. 115-2025-PCM — Reglamento de IA Ética).

### Opciones consideradas

**Opción A — Intersección de conjuntos + filtros deterministas** ← Elegida  
`Recomendaciones = free_slots ∩ activity_slots`, ordenadas por: (1) categorías de interés declaradas en onboarding, (2) campus del estudiante, (3) duración compatible.

**Opción B — Filtrado colaborativo (Collaborative Filtering)**  
Recomienda actividades que estudiantes con perfil similar han guardado. Requiere masa crítica de datos (cold start problem) y no funciona con < 1,000 usuarios.

**Opción C — Content-based filtering con embeddings (LLM)**  
Genera representaciones vectoriales de actividades y perfil del estudiante. Alta calidad de recomendaciones, pero requiere llamadas a API de embeddings (costo), latencia adicional y cumplimiento estricto del D.S. 115-2025-PCM.

**Opción D — Híbrido (intersección + ML post-piloto)**  
Comenzar con Opción A y migrar parcialmente a ML después de acumular datos del piloto.

### Matriz de decisión

| Criterio | Peso | Intersección | Collab. Filtering | LLM Embeddings | Híbrido |
|---|---|---|---|---|---|
| Viabilidad con 0-500 usuarios | 30% | ✅ Funciona desde usuario 1 | 🔴 Cold start problem | ✅ Funciona | 🟡 Parcial |
| Explicabilidad (D.S. 115-2025-PCM) | 25% | ✅ 100% trazable | 🟡 Difícil de explicar | 🔴 Caja negra | 🟡 Parcial |
| Costo de implementación | 25% | ✅ S/ 0 | 🟡 Complejidad alta | 🔴 API de pago | 🟡 Medio |
| Calidad de recomendación (largo plazo) | 20% | 🟡 Limitada | ✅ Alta | ✅ Muy alta | ✅ Alta |

### Decisión

Se adopta **Opción A — Intersección de conjuntos** para v1, con compromiso explícito de migrar a Opción D (híbrido) en v2, una vez que el piloto acumule datos de comportamiento suficientes.

El D.S. 115-2025-PCM exige uso ético, transparente y explicable de algoritmos que manejan datos de estudiantes. La intersección determinista cumple este requisito de forma nativa: cada recomendación puede explicarse al usuario con texto generado por plantilla ("Te recomendamos *Taller de Fotografía* porque tienes un hueco libre el **martes de 10:00 a 12:00** y esta actividad ocurre en ese intervalo en el **campus Sociales**"). El filtrado colaborativo y los embeddings no pueden dar esta explicación sin trabajo adicional significativo.

### Consecuencias

**Positivas:**
- Implementación en < 1 sprint (una función SQL + lógica de ordenamiento).
- Cumplimiento automático del D.S. 115-2025-PCM sin overhead de documentación de IA.
- Determinista y testeable: dado el mismo horario + actividades, siempre produce el mismo resultado.

**Negativas:**
- No aprende del comportamiento del usuario. Si un estudiante nunca guarda actividades deportivas, el sistema seguirá recomendándolas si coinciden en horario.
- La calidad de recomendación es directamente proporcional a la calidad del repositorio de actividades. Si el repositorio está incompleto, las recomendaciones serán pocas o nulas (riesgo A-06).

**Mitigación de la limitación principal:**
Agregar en el onboarding la selección de 3 categorías de interés. Esto filtra el resultado de la intersección y mejora la percepción de personalización sin necesidad de ML.

**Revisión recomendada:** Al finalizar el piloto beta, si el ratio recomendaciones_mostradas / actividades_guardadas es < 10%, iniciar implementación de filtrado colaborativo con los datos acumulados.

### Referencias
- D.S. 115-2025-PCM. Reglamento de Inteligencia Artificial Ética. Presidencia del Consejo de Ministros del Perú.
- Ricci, F., Rokach, L., & Shapira, B. (2022). *Recommender systems handbook* (3.ª ed.). Springer.
- Schrage, M. (2020). *Recommendation engines*. MIT Press Essential Knowledge Series.
- Zhang, S., Yao, L., & Sun, A. (2019). Deep learning based recommender system: A survey and new perspectives. *ACM Computing Surveys, 52*(1).

---

## ADR-005 — PWA vs. aplicación nativa móvil

**Estado:** Aceptada  
**Deciders:** Equipo UNSA Connect  
**Fecha:** Junio 2026

### Contexto

El producto es, por definición, una aplicación móvil ("de las que todos tenemos en el móvil"). La elección de la plataforma de entrega determina la experiencia del usuario, el alcance de distribución, la complejidad de desarrollo y los costos operativos. El 90% de los estudiantes UNSA accede a Internet desde teléfonos celulares (INEI, 2025).

### Opciones consideradas

**Opción A — PWA (Progressive Web App)** ← Elegida  
Aplicación web que puede instalarse en la pantalla de inicio del móvil, funcionar offline parcialmente y recibir notificaciones push. Se construye sobre el stack Next.js ya configurado.

**Opción B — React Native (Expo)**  
Framework JavaScript para apps nativas iOS y Android desde una sola codebase. Requiere publicación en App Store (USD 99/año) y Google Play (USD 25 único).

**Opción C — Flutter**  
Framework de Google con Dart. Alta calidad visual, apps nativas verdaderas, pero requiere aprender un lenguaje nuevo (Dart) y los mismos costos de publicación.

**Opción D — Web responsiva sin PWA**  
Solo aplicación web mobile-friendly, sin capacidades de instalación ni offline.

### Matriz de decisión

| Criterio | Peso | PWA | React Native | Flutter | Web responsiva |
|---|---|---|---|---|---|
| Costo de distribución | 25% | ✅ S/ 0 | 🔴 USD 124/año | 🔴 USD 124/año | ✅ S/ 0 |
| Reutilización del stack existente | 25% | ✅ Total | 🟡 Parcial (JS) | 🔴 Ninguna (Dart) | ✅ Total |
| Experiencia de usuario móvil | 20% | 🟡 Buena | ✅ Nativa | ✅ Nativa | 🔴 Básica |
| Funcionamiento offline | 15% | 🟡 Parcial (Service Worker) | ✅ Completo | ✅ Completo | 🔴 No |
| Velocidad de lanzamiento | 15% | ✅ Inmediata (ya desplegado) | 🟡 4-6 semanas adicionales | 🔴 8-12 semanas | ✅ Inmediata |

### Decisión

Se adopta **PWA** para v1, con evaluación de React Native / Expo para v2 si el piloto confirma que las limitaciones de la PWA afectan la retención.

El Marco de Arquitectura Digital del Estado Peruano v3.0 exige enfoque Cloud First y diseño mobile-first, pero no requiere apps nativas. La PWA cumple ambos requisitos. Los costos de publicación en stores representan una barrera real para un proyecto universitario de presupuesto cero. La conectividad variable del campus (84-92% según OSIPTEL, 2025) favorece la PWA con Service Worker para cache offline del horario, funcionalidad crítica cuando el estudiante está en zonas de cobertura reducida.

### Consecuencias

**Positivas:**
- El stack Next.js 15 ya instalado y desplegado en Vercel es directamente la PWA. No hay trabajo adicional de setup, solo agregar `next-pwa` y el manifest.
- Sin fricción de descarga de App Store. El usuario accede con una URL, instala desde el banner del navegador.
- Updates instantáneos sin proceso de aprobación de stores.

**Negativas:**
- Las notificaciones push en iOS requieren iOS 16.4+; usuarios con versiones anteriores no las recibirán.
- Las PWA no pueden acceder a algunas APIs nativas (Bluetooth, NFC, contactos). No es relevante para v1, pero limita funcionalidades futuras como check-in de asistencia por NFC.
- La tasa de instalación de PWAs es históricamente menor que la de apps nativas descargadas desde stores (Haller et al., 2022).

**Mitigación:**
Implementar un banner de instalación (`beforeinstallprompt`) en el primer acceso con copy motivador: "Instala UNSA Connect en tu celular para recibir alertas de actividades". Medir tasa de instalación en piloto (KPI definido en A-05 del Assumption Map).

**Revisión recomendada:** Si en el piloto la tasa de retención D28 es < 30% y las entrevistas de usuario atribuyen esto a la experiencia PWA (no a problemas de contenido), iniciar evaluación de React Native con Expo en v2. El código de lógica de negocio (API Routes, Drizzle, motor de recomendación) es reutilizable en ambos casos.

### Referencias
- Fransson, G., & Holmberg, J. (2023). Mobile applications in higher education. *International Journal of Mobile and Blended Learning, 15*(1).
- Google Developers. (2025). *Progressive Web Apps overview*. https://web.dev/explore/progressive-web-apps
- Haller, K., Lee, J., & Cheung, J. (2022). *Meet the 2022 consumers driving change*. IBM Institute for Business Value.
- INEI. (2025). *Informe técnico TIC II Trimestre 2025*.
- Marco de Arquitectura Digital del Estado Peruano v3.0. PCM/SGTD.
- OSIPTEL. (2025). *Calidad del servicio móvil por distrito — Arequipa*.

---

## Log de cambios

| Fecha | ADR | Cambio | Motivo |
|---|---|---|---|
| Jun 2026 | Todos | Creación inicial | Pre-planning Sprint 0 |

---

*Próxima revisión: al inicio del Sprint 2 o cuando alguna suposición del Assumption Map sea invalidada.*  
*UNSA Connect · Architecture Decision Records · Junio 2026*
