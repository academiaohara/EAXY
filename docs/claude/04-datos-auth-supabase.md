# Datos, auth y Supabase

## Separación de capas

| Qué | Dónde |
| --- | ----- |
| Lecturas SQL / Supabase | `src/lib/**/queries.ts` (desde Server Components o actions) |
| Mutaciones | `src/lib/**/actions.ts` con `"use server"` |
| Reglas de negocio puras | `src/lib/exercise-engine/`, `mastery/`, `recommendations/`, etc. |
| Cliente Supabase browser | Solo en Client Components o hooks; vía helpers en `src/lib/supabase/` |
| Cliente servidor | Helpers SSR (`createServerClient` pattern del repo) |

No dupliques queries: si existe `getCourseCatalog()`, reutilízala.

## Auth y sesión

- Helpers de sesión: `src/lib/auth/session.ts`, acciones en `src/lib/auth/actions.ts` y `adult-actions.ts`.
- Autorización por rol/aula: `src/lib/classrooms/authorization.ts` (`getAuthenticatedUserIdOrNull`, etc.).
- Callback OAuth: `src/app/auth/callback/route.ts`.

Flujo típico en página:

```tsx
const studentId = await getAuthenticatedUserIdOrNull();
// ramas con/sin usuario autenticado
```

Menores vs adultos, RLS y permisos: [`docs/security.md`](../security.md).

## Modo preview / desarrollo sin Supabase real

- Variable `CONTENT_PREVIEW_MODE` (ver bootstrap en `AGENTS.md`).
- Catálogo embebido para `/aprender`; progreso puede persistir en localStorage del navegador.
- No asumas que toda feature tiene filas en BD en el entorno del agente.

## Esquema y migraciones

- SQL versionado: `supabase/migrations/`.
- Modelo conceptual: [`docs/database.md`](../database.md).
- Tipos: `src/types/database.ts` (generados; no editar a mano salvo flujo de regeneración documentado).

## Validación

- **Zod** en frontera servidor (actions, route handlers).
- Esquemas de ejercicios compartidos con cliente cuando aplica (`exercise-engine`).

## Realtime (fases futuras / sesiones en vivo)

Diseño en [`docs/live-sessions.md`](../live-sessions.md). Canales por sesión; mutaciones siguen yendo por Server Actions.

## Checklist Supabase

- [ ] ¿La query respeta RLS (probada con usuario correcto)?
- [ ] ¿No filtras datos sensibles en el cliente?
- [ ] ¿Las actions revalidan o refrescan datos según patrón existente (`revalidatePath`, etc., si ya se usa en el dominio)?
