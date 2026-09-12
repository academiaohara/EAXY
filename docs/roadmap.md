# Roadmap por fases

Plan de implementación incremental. Cada fase entrega valor usable y construye sobre la anterior.

---

## Fase 0 — Boilerplate ✅

**Estado: completado**

- Next.js 16 + TypeScript + Tailwind + shadcn/ui
- ESLint + Prettier + Vitest + Playwright
- Estructura de carpetas base
- Documentación técnica (`docs/`)

---

## Fase 1 — Fundamentos y auth

**Objetivo:** usuarios autenticados, esquema de BD core, primer ejercicio funcional.

### Entregables

- [ ] Supabase **local (CLI)** + proyecto **remoto dev** + variables de entorno (prod separado, no ahora)
- [ ] Migraciones: `profiles`, `student_credentials`, `concepts`, `courses/units/lessons`, `content_items`, `exercises`, `attempts`, `concept_mastery`
- [ ] RLS básico (perfiles, intentos propios, credenciales provisionadas)
- [ ] Auth autoregistro: registro adulto (email + contraseña), login, logout, middleware
- [ ] Auth provisionado: alta masiva por nombres (username+contraseña generados); login en `/entrar` sin email del menor
- [ ] Auth Google OAuth para adultos (`self_registered`); sin acceso como alumno de aula vía OAuth
- [ ] Exercise Engine: tipos `tap_select` y `number_input`
- [ ] Página `/practicar` con un ejercicio de demo
- [ ] Pipeline intento → mastery (media ponderada con decaimiento)
- [ ] Seed: curso demo con 3 lecciones y 10 ejercicios (JSON en repo → carga en BD)

### Tests

- Vitest: `checkAnswer`, mastery calculator
- E2E: autoregistro adulto → login → completar ejercicio
- E2E: profesor crea alumno provisionado → alumno entra con credenciales → ejercicio

### Criterio de éxito

Un adulto autoregistrado puede practicar y ver su mastery actualizarse. Un profesor puede crear un alumno sin email y ese alumno puede iniciar sesión.

---

## Fase 2 — Aprendizaje personal completo

**Objetivo:** curso navegable, recomendaciones, progreso visible.

### Entregables

- [ ] UI de curso: unidades, lecciones, vídeos embebidos
- [ ] `learning_paths` (lecciones completadas)
- [ ] Motor de recomendaciones (reglas R1–R7)
- [ ] Dashboard `/progreso` con mapa de conceptos
- [ ] Más tipos de ejercicio: `fraction_input`
- [ ] KaTeX en enunciados
- [ ] `recommendation_logs`

### Tests

- Vitest: cada regla de recomendación con fixtures
- E2E: flujo «practicar → recomendación → siguiente ejercicio»

### Criterio de éxito

Estudiante sin profesor recorre el curso con guía adaptativa explicable.

---

## Fase 3 — Aulas y asignaciones manuales

**Objetivo:** profesor gestiona aula y asigna tareas; estudiante las completa.

### Entregables

- [ ] Tablas: `classrooms`, `classroom_members`, `assignments`, `assignment_targets`
- [ ] RLS por aula
- [ ] CRUD aulas (profesor) + co-docencia (varios teachers)
- [ ] Alta masiva de alumnos provisionados (lista de nombres → credenciales)
- [ ] Crear asignación manual con selección explícita de contenido/ejercicios (tipos: task, reinforcement, recovery, advance, recommended)
- [ ] Vista alumno: tareas pendientes del aula
- [ ] Dashboard profesor: lista alumnos + mastery por concepto
- [ ] `attempts.classroom_id` para trazabilidad

### Tests

- Integración RLS: aislamiento entre aulas
- E2E: profesor crea aula → alumno se une → completa tarea

### Criterio de éxito

Profesor asigna tarea; alumno la ve y completa; profesor ve el resultado.

---

## Fase 4 — Reglas de asignación automática

**Objetivo:** motor de assignment rules con modos auto / approval / manual.

### Entregables

- [ ] Tablas: `assignment_rules`, `assignment_rule_runs`
- [ ] Evaluador de condiciones (all/any/none)
- [ ] Triggers: `after_attempt`, `scheduled` (cron)
- [ ] UI: CRUD reglas, plantillas, cola de aprobación
- [ ] Modos: auto, approval, manual por aula
- [ ] Dry-run «probar con alumno»
- [ ] Prevención de duplicados
- [ ] Auto-selección de ejercicios por `concept_ids` (cuando la regla no especifica contenido concreto)

### Tests

- Vitest: condiciones compuestas, modos, deduplicación
- E2E: regla auto → asignación activa; regla approval → profesor aprueba

### Criterio de éxito

Profesor configura regla de refuerzo; el sistema asigna automáticamente cuando mastery < 40%.

---

## Fase 5 — Sesiones en vivo

**Objetivo:** Kahoot integrado con dos modos (móvil y manual).

### Entregables

- [ ] Tablas: `live_sessions`, `live_session_questions`, `live_session_participants`, `live_session_responses`
- [ ] Supabase Realtime: canal por sesión
- [ ] Modo móvil: alumno responde → attempt
- [ ] Modo manual: profesor marca → attempt (`submitted_by=teacher`)
- [ ] UI profesor: panel host, resultados agregados
- [ ] UI alumno móvil: `/sesion/[sid]/pregunta`
- [ ] Post-sesión: resumen + acción «asignar refuerzo»
- [ ] Integración con assignment-rules post-sesión (opcional)

### Tests

- Vitest: agregación, transiciones de estado
- E2E: sesión completa modo móvil; sesión modo manual

### Criterio de éxito

Profesor lanza sesión; alumnos responden; mastery se actualiza; profesor ve resultados en tiempo real.

---

## Fase 6 — Contenido y pulido

**Objetivo:** catálogo real, rendimiento, accesibilidad.

### Entregables

- [ ] Importación de contenido ESO 1 (unidades del curso real)
- [ ] Panel admin básico para publicar ejercicios
- [ ] Más widgets: `ordering`, `drag_match`
- [ ] Accesibilidad: ARIA, teclado, contraste
- [ ] Responsive completo (móvil, tablet)
- [ ] Optimización: índices BD, cache de recomendaciones
- [ ] CI: lint + test + validate exercises + E2E en PR

### Criterio de éxito

Curso de 1º ESO publicado; usable en móvil; CI verde.

---

## Fase 7 — Escala y extensiones (futuro)

No comprometido. Posibles líneas:

- OAuth / SSO para centros
- Informes PDF por aula
- Modo offline / PWA
- API pública para integraciones LMS
- IA para generación de ejercicios (opt-in)
- Multi-tenant (varios centros)
- Gamificación (rachas, logros)

---

## Dependencias entre fases

```
Fase 0 ✅
  └── Fase 1 (auth + BD + ejercicio)
        └── Fase 2 (curso + recomendaciones)
              ├── Fase 3 (aulas + asignaciones manuales)
              │     ├── Fase 4 (assignment rules)
              │     └── Fase 5 (live sessions)
              └── Fase 6 (contenido + pulido)
```

Fases 4 y 5 pueden paralelizarse tras Fase 3.

## Métricas de progreso

| Fase | Métrica clave |
|---|---|
| 1 | Ejercicio completado con mastery actualizado |
| 2 | Recomendación generada con explicación |
| 3 | Tarea asignada y completada en aula |
| 4 | Regla automática ejecutada sin intervención |
| 5 | Sesión en vivo con ≥ 1 respuesta → attempt |
| 6 | Curso ESO 1 publicado con ≥ 50 ejercicios |

## Documentos relacionados

- Todos los docs de `docs/` describen el diseño que guía cada fase.
