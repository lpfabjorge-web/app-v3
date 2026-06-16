# UNSA Connect — Mapa de Suposiciones Críticas
## Pre-planning Phase · Validación antes del Sprint 0

> **Propósito:** Identificar, clasificar y priorizar las suposiciones no verificadas que,
> si resultan falsas, invalidan el producto o bloquean el desarrollo.
> Metodología: Assumption Mapping (Torres, 2021) × Matriz de riesgo (prob. × impacto).

---

## Marco metodológico

Las suposiciones se clasifican en cuatro cuadrantes según Torres (2021):

```
                    ALTA IMPORTANCIA
                          │
          Validar primero │ Monitorear
          (críticas)      │ (observar)
  ─────────────────────────────────────────
          Deprioritizar   │ Validar después
          (bajo riesgo)   │ (si hay tiempo)
                          │
                    BAJA IMPORTANCIA
              ALTA           BAJA
           INCERTIDUMBRE   INCERTIDUMBRE
```

**Prioridad = Importancia × Incertidumbre**

---

## Categoría 1 — Suposiciones sobre el USUARIO
### Cuadrante: Validar primero (alta importancia + alta incertidumbre)

---

### A-01 · El estudiante completará el registro de horario manual

**Suposición:** El estudiante ingresará sus bloques de clase manualmente la primera vez que use la app, sin abandonar en el proceso.

**Por qué importa:** Es el paso de activación del producto. Sin horario registrado, el motor de recomendación no puede operar. Si la tasa de completación es baja, el núcleo funcional del MVP no llega a activarse.

**Nivel de riesgo:** 🔴 Crítico

**Evidencia que la sostiene:**
- El 95.6% de jóvenes peruanos de 19-24 años usa Internet activamente (INEI, 2025).
- El focus group (Blas, 2026) reportó "intención productiva" y disposición a aprovechar el tiempo libre.

**Evidencia que la cuestiona:**
- Hernández García et al. (2024) identifican que los estudiantes universitarios evitan herramientas con alta carga cognitiva inicial; el registro manual de horario es una tarea de 5-10 minutos con alta fricción percibida.
- El abandono en onboarding de apps de productividad ocurre en el 60-80% de los casos durante el primer paso de configuración (Uxcam, 2023).

**Experimento de validación:**
Prototipo navegable (Figma) con flujo de registro de 3 pantallas. Prueba con 10 estudiantes reales (2 por área académica). Métrica: % que completa el registro sin ayuda externa. Umbral de viabilidad: ≥ 70%.

**Plan de contingencia si la suposición es falsa:**
Agregar importación automática de horario vía archivo PDF o foto (OCR) como flujo alternativo en Sprint 1.

---

### A-02 · Los estudiantes perciben sus huecos como tiempo desperdiciado

**Suposición:** La mayoría de estudiantes experimenta frustración o culpa por no aprovechar los intervalos libres entre clases, y esto los motiva a buscar una solución.

**Nivel de riesgo:** 🟡 Alto

**Evidencia que la sostiene:**
- El mapa de empatía (Blas, 2026) registra explícitamente: "Miedo a que la universidad pase desapercibida", "Quiere descansar pero siente culpa".
- El 63% de la población estudiantil UNSA reporta estrés moderado vinculado a gestión ineficiente del tiempo (UNSA, 2024, citado en el estudio de mercado).
- Hernández García et al. (2024) confirman que la gestión del tiempo es variable determinante en el desempeño universitario.

**Evidencia que la cuestiona:**
- El mapa de empatía también registra: "Deambula, finge estudiar, o va a casa si el 'hueco' es largo", lo que sugiere que la respuesta conductual real es la evasión, no la búsqueda activa de solución.
- Díaz-Iso et al. (2020) advierten que la intención declarada de participar en actividades extracurriculares diverge significativamente del comportamiento observado.

**Experimento de validación:**
Pregunta directa en encuesta (n=379 ya planificada): "En tu última semana de clases, ¿qué hiciste durante tus horas libres en el campus?" (respuesta abierta). Si > 50% describe comportamiento pasivo o evasivo, la motivación intrínseca es insuficiente y el producto necesita un mecanismo de activación externo (notificación push proactiva).

---

### A-03 · Los estudiantes confiarán sus datos académicos a la plataforma

**Suposición:** El estudiante aceptará registrar su horario y datos personales en una plataforma nueva, sin antecedentes institucionales formales.

**Nivel de riesgo:** 🔴 Crítico

**Evidencia que la sostiene:**
- El 95.6% de jóvenes peruanos usa servicios digitales con registro (INEI, 2025).
- El correo institucional como método de autenticación genera mayor confianza que redes sociales en contexto universitario (Alicia CONCYTEC, 2024).

**Evidencia que la cuestiona:**
- El focus group identificó la privacidad de datos como la principal barrera de adopción (riesgo R1 del estudio, clasificado como CRÍTICO).
- La Ley N.° 29733 exige consentimiento informado explícito; su ausencia o redacción ambigua genera rechazo.
- El estudio reporta que el ítem de disposición a compartir datos obtuvo las puntuaciones más bajas en la encuesta piloto.

**Experimento de validación:**
Incluir en la encuesta n=379 (ítem P12 ya diseñado): "¿Qué tan dispuesto está a registrar sus datos académicos?" (Likert 1-5). Si la media < 3.5, rediseñar el flujo de consentimiento con opción de uso anónimo parcial antes de construir el módulo de autenticación.

**Regulación aplicable:**
- Ley N.° 29733 — Ley de Protección de Datos Personales: consentimiento, derechos ARCO obligatorios.
- D.S. 003-2013-JUS: cifrado de datos sensibles (hábitos, salud mental).

---

## Categoría 2 — Suposiciones sobre el PRODUCTO
### Cuadrante: Validar primero

---

### A-04 · El algoritmo de intersección de slots genera recomendaciones percibidas como útiles

**Suposición:** Cruzar `huecos del estudiante ∩ horario de actividades` produce sugerencias que el estudiante percibe como relevantes y accionables, sin necesidad de personalización por IA.

**Nivel de riesgo:** 🟡 Alto

**Evidencia que la sostiene:**
- La lógica es matemáticamente correcta: si el hueco existe y la actividad ocurre en ese intervalo, la recomendación es temporalmente viable.
- Rogers (2003) indica que la compatibilidad percibida entre innovación y necesidad existente es el principal predictor de adopción.

**Evidencia que la cuestiona:**
- La compatibilidad temporal no implica compatibilidad de preferencias. Un estudiante de Ingeniería con un hueco de 45 minutos no necesariamente quiere asistir a un taller de teatro aunque coincida en horario.
- Sin perfil de intereses, las primeras recomendaciones serán genéricas, lo que puede generar percepción de baja calidad.

**Experimento de validación:**
En el piloto beta (semana 1), medir el ratio: actividades recomendadas / actividades guardadas por usuario. Si < 10% de las recomendaciones se guardan, el motor v1 necesita un filtro de categoría preferida antes del lanzamiento oficial. Agregar selección de intereses (3 categorías) en el onboarding.

---

### A-05 · Una PWA es suficiente para el comportamiento de uso esperado

**Suposición:** Los estudiantes usarán UNSA Connect desde el navegador móvil o instalando la PWA, sin necesitar una app nativa en App Store o Play Store.

**Nivel de riesgo:** 🟢 Moderado

**Evidencia que la sostiene:**
- El 90% de estudiantes accede a Internet desde teléfonos celulares (INEI, 2025).
- El Marco de Arquitectura Digital del Estado Peruano v3.0 exige diseño mobile-first, no necesariamente app nativa.
- La conectividad variable en el campus (84-92%, OSIPTEL, 2025) favorece PWA con modo offline sobre app nativa que requiere instalación con datos.

**Evidencia que la cuestiona:**
- Las PWA tienen tasas de retención menores que apps nativas en segmentos jóvenes de alta penetración de smartphones (Haller et al., 2022).
- Las notificaciones push de PWA en iOS tienen soporte limitado hasta iOS 16.4+.

**Experimento de validación:**
En piloto beta, registrar el porcentaje de usuarios que instala la PWA desde el banner ("Agregar a pantalla de inicio") vs. los que solo navegan desde el browser. Si < 30% instala, evaluar app nativa para v2.

---

## Categoría 3 — Suposiciones sobre el CONTEXTO INSTITUCIONAL
### Cuadrante: Validar primero (bloquean el lanzamiento si son falsas)

---

### A-06 · Bienestar Universitario UNSA actualizará el repositorio de actividades

**Suposición:** Las unidades organizadoras (Bienestar Universitario, OUIS, Upacorp) se comprometerán formalmente a ingresar y mantener actualizado el repositorio de actividades antes del piloto.

**Nivel de riesgo:** 🔴 Crítico — **Bloquea el lanzamiento**

**Evidencia que la sostiene:**
- El proyecto se alinea con PEI UNSA 2025-2030 (OEI.02 y OEI.04), lo que facilita la obtención de apoyo institucional formal.
- RCU 0127-2025 y RCU 0136-2025 ya regulan servicios (comedor, gimnasio IDUNSA) que deben estar en el repositorio, lo que da marco normativo al convenio.
- La UNSA ya opera TV Canal 45 y Radio UNSA para difusión, lo que implica infraestructura institucional de comunicación que necesita modernizarse.

**Evidencia que la cuestiona:**
- Ninguna fuente documenta que una unidad UNSA haya mantenido un canal digital de difusión actualizado de forma sostenida.
- El estudio de mercado identifica explícitamente la "desactualización del repositorio" como riesgo operativo crónico (R2).
- La burocracia universitaria pública peruana tiene ciclos de aprobación de convenios de 30-90 días hábiles (MEF, 2024, ciclo Invierte.pe).

**Acción requerida antes del Sprint 0 (no es un experimento, es un prerequisito):**
1. Reunión formal con Director de Bienestar Universitario UNSA.
2. Firma de carta de intención (no convenio completo) que comprometa a un responsable de contenidos.
3. Definir SLA de actualización: máximo 48h para publicar una actividad desde que es comunicada al responsable.
4. Si la carta de intención no se obtiene en 2 semanas: activar plan B (repositorio seed con datos históricos públicos de unsa.edu.pe + roles admin abiertos a centros de estudiantes).

---

### A-07 · Los horarios de la UNSA son suficientemente regulares para ser modelados semanalmente

**Suposición:** Los horarios de clases de los estudiantes se repiten semana a semana con estructura fija durante el semestre, lo que permite modelarlos como un grid semanal estático.

**Nivel de riesgo:** 🟡 Alto

**Evidencia que la sostiene:**
- El sistema académico UNSA opera por semestres con horarios asignados al inicio del ciclo.
- El estudio identifica patrones diferenciados y predecibles por área: Ingenierías (bloques largos de laboratorio), Sociales (alta variabilidad), Biomédicas (prácticas clínicas predecibles).

**Evidencia que la cuestiona:**
- El propio estudio señala que los horarios del área de Sociales tienen "mayor variabilidad horaria", lo que contradice el modelo de grid fijo.
- Clases canceladas, recuperaciones y eventos especiales generan variabilidad no capturada por un horario estático.
- No existe API pública del sistema académico UNSA para verificar horarios en tiempo real.

**Experimento de validación:**
Entrevistar a 5 estudiantes de distintas áreas (1 por área + 2 Sociales por ser el caso más variable). Preguntar: "¿Tu horario esta semana es exactamente igual al de la semana pasada?" Si > 40% reporta variaciones frecuentes, agregar funcionalidad de "modificar horario esta semana" al MVP.

---

## Categoría 4 — Suposiciones sobre el MERCADO Y COMPETENCIA
### Cuadrante: Monitorear (alta importancia + baja incertidumbre)

---

### A-08 · Los grupos de WhatsApp no satisfacen la necesidad de forma suficiente

**Suposición:** Los canales informales actuales (WhatsApp, Instagram por facultad) tienen brechas funcionales suficientemente grandes como para que los estudiantes adopten una plataforma formal.

**Nivel de riesgo:** 🟡 Alto

**Evidencia que la sostiene:**
- El estudio de mercado documenta 6 limitaciones estructurales de los canales informales: sin personalización horaria, información no verificada, fragmentación por facultad, ruido informativo, sin geolocalización, sin integración con calendario personal.
- La demanda insatisfecha calculada es de 18,510 estudiantes (2026), que no tienen acceso a una herramienta integrada.

**Evidencia que la cuestiona:**
- Los grupos de WhatsApp tienen penetración alta, cero fricción de adopción y comunicación bidireccional rápida.
- El escenario pesimista del modelo logístico (r=0.25) asume precisamente que WhatsApp compite efectivamente y reduce la adopción al 47% en 5 años.
- Christensen et al. (2016) documentan que la competencia de "no consumo" (hacer nada o usar lo que ya existe) es el rival más frecuente de las innovaciones en educación.

**Acción:** Incluir en la encuesta n=379 la pregunta: "¿Qué tan satisfecho está con la información que recibe actualmente sobre actividades UNSA?" (Likert 1-5). Si media > 3.5, el problema percibido no es suficientemente agudo para motivar el cambio de comportamiento.

---

### A-09 · El precio óptimo del módulo premium es entre S/ 12 y S/ 20/mes

**Suposición:** El método Van Westendorp aplicado a la muestra n=379 confirmará un Precio Óptimo de Mercado en el rango estimado de S/ 12-20/mes.

**Nivel de riesgo:** 🟢 Moderado (se valida con la encuesta ya planificada)

**Evidencia que la sostiene:**
- Análisis de referencia del mercado peruano EdTech 2025: S/ 15-60/mes para servicios universitarios digitales.
- La elasticidad precio-demanda estimada (EPD ≈ –0.30) sugiere demanda relativamente inelástica para el segmento S3 (ciclos avanzados).

**Evidencia que la cuestiona:**
- El ingreso promedio de un estudiante universitario UNSA (universidad pública) es significativamente menor que el promedio nacional.
- El 57.3% de estudiantes UNSA recibe algún tipo de beca o apoyo económico institucional (UNSA, Memoria 2024), lo que comprime la disposición a pagar.

**Acción:** Aplicar Van Westendorp como ítem P6-P9 en la encuesta n=379. No asumir el rango S/ 12-20 hasta tener el dato empírico. El modelo de negocio debe ser viable incluso si el OPP resulta en S/ 5-8/mes.

---

## Mapa consolidado de priorización

```
ALTA IMPORTANCIA │
                 │
    A-06 ────────┤──── A-01
    A-03         │     A-04
                 │     A-07
─────────────────┼──────────────────
    A-08         │     A-02
    A-09         │     A-05
                 │
BAJA IMPORTANCIA │
                 
           ALTA              BAJA
        INCERTIDUMBRE    INCERTIDUMBRE
```

**Orden de validación:**

| Prioridad | Suposición | Método | Tiempo estimado | Prerequisito |
|---|---|---|---|---|
| 🔴 1 | A-06 Convenio Bienestar UNSA | Reunión institucional + carta de intención | 2 semanas | Sí — bloquea Sprint 0 |
| 🔴 2 | A-03 Confianza en datos | Encuesta ítem P12 (n=379) | 1 semana | No |
| 🔴 3 | A-01 Completación de onboarding | Test con prototipo Figma (n=10) | 3 días | No |
| 🟡 4 | A-07 Regularidad de horarios | 5 entrevistas estudiantiles | 2 días | No |
| 🟡 5 | A-02 Motivación real | Encuesta pregunta abierta | 1 semana | No |
| 🟡 6 | A-04 Calidad de recomendaciones | Piloto beta semana 1 | Sprint 3 | Depende de A-01 |
| 🟡 7 | A-08 Ventaja sobre WhatsApp | Encuesta ítem de satisfacción | 1 semana | No |
| 🟢 8 | A-05 PWA vs nativa | Métricas de instalación piloto | Sprint 3 | No |
| 🟢 9 | A-09 Precio premium | Van Westendorp encuesta | 1 semana | No |

---

## Criterios de go/no-go para el Sprint 0

El Sprint 0 (desarrollo) solo inicia cuando se cumplen **los tres criterios críticos**:

| Criterio | Umbral | Fuente de verificación |
|---|---|---|
| Carta de intención firmada con Bienestar UNSA | Al menos 1 unidad | Documento firmado |
| Disposición a registrar datos ≥ 3.5/5 | Media encuesta ítem P12 | Resultados n=379 |
| Completación de onboarding en prototipo ≥ 70% | % de usuarios de prueba | Test Figma con n=10 |

Si alguno de los tres no se cumple, se ajusta el diseño antes de construir — no después.

---

## Referencias

- Blas Amante, K. X. (2026). *Focus group sobre uso del tiempo libre en el campus UNSA* [Documento interno]. UNSA.
- Christensen, C., Hall, T., Dillon, K., & Duncan, D. (2016). *Know your customers' jobs to be done*. Harvard Business Review.
- Díaz-Iso, A., Eizaguirre, A., & García-Olalla, A. (2020). Actividades extracurriculares en la educación superior: revisión sistemática. *Revista de Investigación Educativa, 38*(1), 45–62.
- Haller, K., Lee, J., & Cheung, J. (2022). *Meet the 2022 consumers driving change*. IBM Institute for Business Value.
- Hernández García, J., et al. (2024). Gestión del tiempo en estudiantes universitarios: una revisión actualizada. *Revista de Psicología Educativa, 30*(1), 12–28.
- INEI. (2025). *Informe técnico TIC II Trimestre 2025*. Lima: INEI.
- Ley N.° 29733. Ley de Protección de Datos Personales. Congreso de la República del Perú.
- MEF. (2024). *Guía General de Identificación, Formulación y Evaluación de Proyectos de Inversión*. Lima: Ministerio de Economía y Finanzas.
- OSIPTEL. (2025). Calidad del servicio móvil por distrito — Arequipa.
- Rogers, E. M. (2003). *Diffusion of innovations* (5.ª ed.). Free Press.
- Torres, T. (2021). *Continuous discovery habits*. Product Talk LLC.
- UNSA. (2024). *Memoria Anual 2024*. Arequipa: Universidad Nacional de San Agustín.
- Uxcam. (2023). *Mobile app onboarding statistics and best practices 2023*. https://uxcam.com/blog/app-onboarding-statistics/

---

*Documento vivo — revisar al inicio de cada sprint con nuevos datos empíricos.*
*UNSA Connect · Fase 0 Pre-planning · Junio 2026*
