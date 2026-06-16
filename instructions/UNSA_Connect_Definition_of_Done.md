# UNSA Connect — Definition of Done (DoD)
> Framework: Scrum Guide (Schwaber & Sutherland, 2020) + Engineering Excellence (Google, 2023)
> Alcance: Aplica a toda tarea, feature y sprint del proyecto.
> UNSA Connect · Pre-planning Fase 0 · Junio 2026

---

## Por qué una Definition of Done

Sin una DoD explícita, "terminado" significa cosas distintas para cada integrante del equipo.
Un miembro considera terminada una feature cuando el código compila. Otro, cuando pasa los
tests. Otro, cuando está en producción. Otro, cuando el usuario puede usarla sin instrucciones.

La consecuencia es deuda técnica acumulada, bugs en producción que "alguien ya revisó", y
retrabajo que consume entre el 20% y el 40% del tiempo de desarrollo en equipos sin DoD
(Forsgren et al., 2018 — State of DevOps Report).

> "The Definition of Done creates transparency by providing everyone a shared understanding
> of what work was completed as part of the Increment."
> — Schwaber & Sutherland, *The Scrum Guide* (2020)

La DoD de UNSA Connect opera en tres niveles: tarea, feature y sprint. Cada nivel hereda
todos los criterios del nivel anterior.

---

## Nivel 1 — Definition of Done: TAREA

Una tarea individual (card en el backlog) está **Done** cuando:

### Código
- [ ] El código compila sin errores (`npm run build` exitoso)
- [ ] No hay errores de TypeScript (`npx tsc --noEmit` sin output)
- [ ] ESLint pasa sin warnings (`npm run lint` limpio)
- [ ] El código sigue las convenciones de nomenclatura del proyecto:
  - Componentes: PascalCase (`ScheduleGrid.tsx`)
  - Funciones y variables: camelCase (`getFreeSlots`)
  - Constantes: UPPER_SNAKE_CASE (`MAX_SLOTS_PER_DAY`)
  - Archivos de API: kebab-case (`/api/free-slots/route.ts`)

### Commits
- [ ] El commit sigue Conventional Commits:
  - `feat:` nueva funcionalidad
  - `fix:` corrección de bug
  - `chore:` mantenimiento (deps, config)
  - `docs:` documentación
  - `test:` pruebas
  - `refactor:` refactoring sin cambio de comportamiento
- [ ] El mensaje describe el QUÉ y el POR QUÉ, no el CÓMO
  - ✅ `feat: add free slot detection algorithm for weekly schedule`
  - ❌ `feat: updated code`

### Revisión
- [ ] Al menos 1 integrante del equipo revisó el código (pull request con 1 approval)
- [ ] Ningún comentario de revisión pendiente sin respuesta

---

## Nivel 2 — Definition of Done: FEATURE

Una feature completa (épica del backlog) está **Done** cuando cumple todos los criterios
de Nivel 1 más:

### Funcionalidad
- [ ] Los criterios de aceptación del PRD para esta feature están todos satisfechos
- [ ] La feature funciona en los tres escenarios principales:
  - Happy path (flujo exitoso)
  - Edge case documentado (ej. horario vacío, repositorio sin actividades)
  - Error handling (ej. falla de red, sesión expirada)
- [ ] No hay console.log ni código de debug en el diff

### Testing
- [ ] Tests unitarios escritos para la lógica de negocio central de la feature
  - Cobertura mínima: funciones puras del motor de recomendación y detección de huecos ≥ 80%
  - Cobertura general: no hay requisito de % total, solo de lógica crítica
- [ ] Tests de integración para los endpoints de API involucrados
- [ ] La feature fue probada manualmente en móvil (Chrome DevTools Mobile) en:
  - iPhone SE (375px — viewport más pequeño del target)
  - Pixel 5 (393px)
- [ ] `npm run build` pasa en entorno limpio (sin caché local)

### Accesibilidad
- [ ] Contraste de color ≥ 4.5:1 para texto normal (WCAG 2.1 AA)
- [ ] Contraste ≥ 3:1 para texto grande (≥ 18px / ≥ 14px bold)
- [ ] Todos los elementos interactivos tienen `aria-label` o texto visible
- [ ] La feature es navegable con teclado (Tab, Enter, Escape)
- [ ] Las imágenes tienen `alt` descriptivo o `alt=""` si son decorativas

### Performance
- [ ] Ninguna página nueva supera 200KB de JavaScript en el bundle inicial
  (verificar con `npm run build` → output de tamaños)
- [ ] Las imágenes están optimizadas (Next.js `<Image />` component, no `<img>`)
- [ ] No hay fetch de datos innecesario en el cliente que pueda resolverse en servidor

### Seguridad
- [ ] Ninguna variable de entorno, token o credencial en el código fuente
- [ ] Los endpoints de API validan que el usuario está autenticado antes de operar
- [ ] Los inputs del usuario son validados en el servidor (no solo en el cliente)
- [ ] Ningún dato de otro usuario es accesible desde la sesión del usuario actual

### UX y microcopy
- [ ] Los estados vacíos tienen mensaje útil (no pantalla en blanco)
  - Ejemplo: "Aún no tienes actividades guardadas. Explora las recomendaciones para tu horario."
- [ ] Los estados de carga tienen feedback visual (skeleton o spinner)
- [ ] Los mensajes de error son comprensibles para el usuario final (no stack traces)
  - ✅ "No pudimos enviar el enlace. Verifica que tu correo sea @unsa.edu.pe"
  - ❌ "Error 500: Internal Server Error"
- [ ] El microcopy fue revisado por al menos 1 integrante no técnico del equipo

### Cumplimiento Ley N.° 29733
- [ ] Si la feature recolecta datos nuevos del usuario, el consentimiento fue actualizado
- [ ] Si la feature accede a datos existentes del usuario, el acceso está documentado
  en el registro de tratamiento de datos (tabla `data_processing_log`)

---

## Nivel 3 — Definition of Done: SPRINT

Un sprint está **Done** cuando cumple todos los criterios de Niveles 1 y 2 más:

### Calidad del sprint
- [ ] Todas las features comprometidas en el sprint planning están en Done
  (o movidas al siguiente sprint con justificación documentada)
- [ ] GitHub Actions pasa en `main`: lint ✅ · typecheck ✅
- [ ] Sentry no registra errores nuevos no resueltos en el entorno de preview
- [ ] El bundle de producción no creció más de 10% respecto al sprint anterior
  sin justificación técnica

### Documentación
- [ ] El CHANGELOG fue actualizado con las features del sprint
  (formato: `## [versión] - fecha` → lista de `feat:`, `fix:`, `chore:`)
- [ ] Los ADRs afectados por decisiones del sprint fueron actualizados
- [ ] El backlog del siguiente sprint fue refinado (al menos las 3 primeras tareas
  tienen criterios de aceptación escritos)

### Métricas
- [ ] La North Star Metric fue medida al cierre del sprint
- [ ] Al menos 1 métrica de input del árbol de métricas fue revisada
- [ ] Si el sprint incluyó cambios al motor de recomendación:
  el ratio recomendaciones_mostradas / actividades_guardadas fue medido

### Retrospectiva
- [ ] La retrospectiva del sprint fue realizada con el equipo completo
- [ ] Al menos 1 acción de mejora concreta fue acordada para el siguiente sprint
- [ ] Las acciones de mejora del sprint anterior fueron revisadas

### Despliegue
- [ ] El código de `main` está desplegado en Vercel Production
- [ ] La URL de producción fue verificada manualmente en móvil real
  (no solo en DevTools) por al menos 1 integrante
- [ ] Las variables de entorno de producción en Vercel están actualizadas
  si el sprint introdujo nuevas variables

---

## Criterios de excepción documentada

Un criterio puede ser marcado como **excepción** (no bloqueante) solo si:

1. El criterio es técnicamente imposible en el contexto del sprint (documentar por qué)
2. El criterio se postergó con una tarea de deuda técnica creada en el backlog
   con prioridad no menor a la del siguiente sprint
3. La excepción fue acordada por al menos 2 integrantes del equipo

**Criterios que NUNCA pueden ser excepción:**

| Criterio | Razón |
|---|---|
| Validación de autenticación en endpoints de API | Seguridad — dato de otro usuario expuesto = violación Ley 29733 |
| Variables de entorno fuera del código | Credenciales en repositorio público = compromiso inmediato |
| `npm run build` exitoso | Código que no compila no es código |
| Consentimiento actualizado si se recolectan datos nuevos | Obligación legal — no negociable |

---

## Checklist rápido por nivel

Para uso durante la revisión de pull requests y el sprint review.

### ✅ Checklist Nivel 1 — Tarea
```
[ ] Compila sin errores
[ ] TypeScript limpio
[ ] ESLint limpio
[ ] Conventional Commit
[ ] 1 approval de PR
```

### ✅ Checklist Nivel 2 — Feature
```
[ ] Criterios de aceptación del PRD satisfechos
[ ] Happy path + edge case + error handling probados
[ ] Tests escritos (lógica crítica)
[ ] Probado en móvil (375px y 393px)
[ ] Accesibilidad: contraste + aria + teclado
[ ] Performance: bundle < 200KB, imágenes optimizadas
[ ] Seguridad: auth en API + validación server-side
[ ] UX: estado vacío + carga + error comprensible
[ ] Ley 29733: consentimiento actualizado si aplica
```

### ✅ Checklist Nivel 3 — Sprint
```
[ ] Features comprometidas en Done o justificadas
[ ] CI/CD verde en main
[ ] Sentry sin errores nuevos abiertos
[ ] CHANGELOG actualizado
[ ] ADRs actualizados si aplica
[ ] NSM medida
[ ] Retrospectiva realizada + 1 acción acordada
[ ] Deploy verificado en móvil real
```

---

## Velocidad esperada con esta DoD

Con 5 integrantes en roles múltiples (no devs especializados) y esta DoD aplicada:

| Sprint | Duración | Features esperadas |
|---|---|---|
| Sprint 0 | 2 semanas | Setup + auth + schema DB |
| Sprint 1 | 2 semanas | Registro de horario + detección de huecos |
| Sprint 2 | 2 semanas | Repositorio de actividades + motor de recomendación v1 |
| Sprint 3 | 2 semanas | Polish + notificaciones + modo offline + piloto |

Esta estimación asume que cada feature tarda 1.5x más de lo esperado por primera vez
(factor estándar para equipos nuevos — McConnell, 2006). La DoD reduce el retrabajo
post-sprint al costo de más tiempo por feature en el sprint.

---

## Referencias

- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The science of lean software
  and DevOps*. IT Revolution Press.
- Google. (2023). *Engineering practices documentation*.
  https://google.github.io/eng-practices/
- McConnell, S. (2006). *Software estimation: Demystifying the black art*. Microsoft Press.
- Schwaber, K., & Sutherland, J. (2020). *The Scrum Guide*.
  https://scrumguides.org/scrum-guide.html
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.1*.
  https://www.w3.org/TR/WCAG21/
- Conventional Commits. (2024). *A specification for adding human and machine readable
  meaning to commit messages*. https://www.conventionalcommits.org/

---

*UNSA Connect · Definition of Done · Junio 2026*
*Revisión obligatoria: al inicio del Sprint 1 con el equipo completo.*
