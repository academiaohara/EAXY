# Arquitectura

## Resumen

Aplicación **Next.js 16 (App Router)** con lógica de dominio en TypeScript puro, persistencia en **Supabase (PostgreSQL)** y autenticación con **Supabase Auth**. La UI usa **Tailwind CSS v4** y **shadcn/ui**.

```
┌─────────────────────────────────────────────────────────────┐
│                     Cliente (navegador)                      │
│  React 19 · shadcn/ui · componentes interactivos de ejercicio│
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────▼──────────────────────────────────┐
│              Next.js (App Router + Server Actions)           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │   Routes    │  │ Server       │  │ Route Handlers      │ │
│  │  (RSC/SSR)  │  │ Actions      │  │ (webhooks, APIs)    │ │
│  └──────┬──────┘  └──────┬───────┘  └──────────┬──────────┘ │
│         └────────────────┼─────────────────────┘            │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │              Capa de dominio (src/lib/)                │  │
│  │  exercise-engine · mastery · recommendations · rules   │  │
│  └───────────────────────┬───────────────────────────────┘  │
└──────────────────────────┼──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼───────┐  ┌───────▼───────┐  ┌───────▼───────┐
│  PostgreSQL   │  │ Supabase Auth │  │   Realtime    │
│  + RLS        │  │               │  │ (live sessions)│
└───────────────┘  └───────────────┘  └───────────────┘
```

## Capas

### 1. Presentación (`src/app/`, `src/components/`)

- **App Router** para rutas, layouts y loading states.
- **React Server Components** para lecturas que no requieren interactividad (listados, dashboards del profesor).
- **Client Components** solo donde haya estado local, widgets de ejercicio o suscripciones Realtime.
- Componentes de UI reutilizables en `src/components/ui/` (shadcn).
- Componentes de dominio en subcarpetas: `exercises/`, `classroom/`, `live/`, `learning/`.

### 2. Aplicación (`src/app/actions/`, `src/app/api/`)

- **Server Actions** para mutaciones iniciadas por el usuario (enviar intento, crear aula, aprobar asignación).
- **Route Handlers** para casos que no encajan en Actions (p. ej. callbacks, exportaciones).
- Validación de entrada con **Zod** en el límite servidor.
- Los Actions delegan en servicios de dominio; no contienen lógica de negocio compleja.

### 3. Dominio (`src/lib/`)

Módulos puros, testables con Vitest, sin dependencia de React:

| Módulo | Responsabilidad |
|---|---|
| `exercise-engine/` | Esquemas Zod, validación de respuestas, puntuación |
| `mastery/` | Cálculo y actualización de dominio por concepto |
| `recommendations/` | Motor de recomendaciones explicables |
| `assignment-rules/` | Evaluación de reglas y generación de propuestas |
| `live-sessions/` | Estado de sesión, agregación de respuestas |
| `content/` | Resolución de rutas de aprendizaje (curso → unidad → lección) |

### 4. Datos (`src/lib/supabase/`, migraciones SQL)

- Cliente Supabase para servidor (`createServerClient`) y cliente para navegador.
- Tipos generados desde el esquema (`src/types/database.ts`).
- Migraciones versionadas en `supabase/migrations/`.
- RLS como capa principal de autorización (ver `security.md`).

### 5. Tiempo real

- **Supabase Realtime** para sesiones en vivo: estado de la pregunta actual, respuestas agregadas, participación.
- Canales por `live_session_id`; el profesor publica transiciones; los alumnos envían respuestas vía Server Action + broadcast opcional.

## Flujos principales

### Intento de ejercicio (personal o asignado)

```
Estudiante responde → Client valida formato → Server Action
  → exercise-engine valida respuesta
  → INSERT en attempts (append-only)
  → mastery service recalcula concepto(s) afectados
  → (opcional) assignment-rules evalúa reglas del aula
  → respuesta con feedback + mastery actualizado
```

### Asignación automática

```
Trigger: fin de intento | cron | acción del profesor
  → assignment-rules lee reglas activas del aula
  → evalúa condiciones sobre mastery del alumno
  → genera propuesta o asignación según modo (auto / approval / off)
  → persiste en assignments + assignment_rule_runs (auditoría)
```

### Sesión en vivo

```
Profesor inicia sesión → alumnos se unen (código o enlace)
  → profesor lanza pregunta
  → modo móvil: alumno responde → attempt + live_session_response
  → modo manual: profesor marca por alumno → attempt + live_session_response
  → agregación en tiempo real para el dashboard del profesor
  → al cerrar: mastery actualizado igual que cualquier otro intento
```

## Estructura de carpetas propuesta

Evolución sobre la base actual:

```
src/
├── app/
│   ├── (auth)/              # login, registro, recuperación
│   ├── (student)/           # rutas del estudiante
│   │   ├── curso/
│   │   ├── practicar/
│   │   └── progreso/
│   ├── (teacher)/           # rutas del profesor
│   │   ├── aulas/
│   │   └── sesiones/
│   ├── (live)/              # UI mínima para sesión en vivo (móvil)
│   ├── actions/             # Server Actions agrupadas por dominio
│   └── api/                 # Route handlers puntuales
├── components/
│   ├── ui/                  # shadcn (existente)
│   ├── exercises/           # widgets interactivos por tipo
│   ├── learning/            # progreso, mastery, recomendaciones
│   ├── classroom/           # aulas, asignaciones, listados
│   └── live/                # lobby, pregunta, resultados
├── lib/
│   ├── supabase/            # clientes, helpers, middleware
│   ├── exercise-engine/
│   ├── mastery/
│   ├── recommendations/
│   ├── assignment-rules/
│   ├── live-sessions/
│   └── content/
├── hooks/                   # hooks de cliente (Realtime, formularios)
├── types/                   # tipos compartidos + database.ts generado
└── tests/
    └── unit/                # tests de dominio (existente)

supabase/
├── migrations/              # SQL versionado
├── seed/                    # datos de desarrollo
└── config.toml

e2e/                         # Playwright (existente)
docs/                        # documentación (este directorio)
```

### Convenciones

- Alias `@/*` → `src/*` (ya configurado).
- Esquemas Zod junto al módulo de dominio que los consume.
- Sin lógica de negocio en componentes de página; solo composición y fetching.
- Contenido curricular (definición de ejercicios) en BD en producción; JSON en repo solo para seeds/fixtures de desarrollo.

## Decisiones técnicas (aprobadas)

| Decisión | Elección | Motivo |
|---|---|---|
| Backend | Supabase (PostgreSQL) | Auth, RLS, Realtime y SQL en un solo stack |
| Entornos Supabase | Local (CLI) + remoto dev; prod separado pre-lanzamiento | Aislar datos reales |
| Lógica de dominio | TypeScript puro en `src/lib/` | Testeable con Vitest sin montar Next.js |
| Ejercicios | Esquema JSON + Zod + widgets React | Extensible, validación compartida cliente/servidor |
| Contenido curricular | BD en producción; JSON en repo para seeds/CI | Publicación sin despliegue de código |
| Estado de sesión en vivo | PostgreSQL + Realtime | Consistencia + baja latencia para UI del profesor |
| Feedback en vivo | Configurable por sesión; **default: al cerrar pregunta** | Menos distracción en aula |
| Mastery | Media ponderada con decaimiento; tabla derivada recalculada en cada intento | Consultas rápidas; historial en `attempts` |
| Umbrales cualitativos | Globales fijos en MVP | Simplicidad |
| Navegación | Libre; bloqueo opcional por unidad (curso/aula) | Flexibilidad pedagógica |
| Recomendaciones | Calculadas on-demand + cache opcional | Siempre explicables; sin jobs opacos en MVP |
| Auth menores | Cuentas provisionadas por profesor; sin email del menor | Privacidad y cumplimiento |
| Auth adultos | Registro público email + contraseña | Modo personal |
| Co-docencia | Varios teachers por aula, mismos permisos | Equipos docentes |
| Selección de ejercicios en asignación | Manual en MVP; auto-selección en fase 4 | Control docente primero |
| Marca | **Eaxy** en documentación y UI | — |

## Testing (resumen)

| Capa | Herramienta | Qué cubrir |
|---|---|---|
| Dominio | Vitest | exercise-engine, mastery, recommendations, assignment-rules |
| Componentes | Vitest + Testing Library | widgets de ejercicio, formularios críticos |
| Integración | Vitest + Supabase local | RLS, triggers, funciones SQL |
| E2E | Playwright | flujos estudiante, profesor, sesión en vivo |

Detalle de estrategia en `roadmap.md` (fase de testing).

## Documentos relacionados

- `database.md` — modelo de datos
- `security.md` — auth y RLS
- `exercises.md` — exercise engine
- `learning-model.md` — mastery y progreso
