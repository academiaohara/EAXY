# Next.js y React en Eaxy

## Next.js 16 — advertencia

Este proyecto **no** es Next.js 14/15 de memoria del modelo. Antes de usar APIs nuevas o dudosas:

1. Lee el bloque «This is NOT the Next.js you know» en `AGENTS.md`.
2. Consulta la documentación embebida: `node_modules/next/dist/docs/` (desde la raíz del repo donde está instalado `next`).

## App Router: convenciones del repo

### Server Components (por defecto)

- Los archivos `page.tsx` y `layout.tsx` son **async** cuando hacen fetch de datos.
- Importa funciones de lectura desde `src/lib/**/queries.ts` o similares, no fetch ad hoc a Supabase en la página si ya existe un helper.
- Usa `export const metadata` o `generateMetadata` en layouts/páginas que lo necesiten.

Ejemplo de estilo (datos en paralelo):

```tsx
export default async function SomePage() {
  const userId = await getAuthenticatedUserIdOrNull();
  const [a, b] = await Promise.all([loadA(), userId ? loadB(userId) : null]);
  return (/* JSX */);
}
```

Referencia: `src/app/aprender/page.tsx`.

### Client Components

Añade `"use client"` **solo** si necesitas:

- `useState`, `useEffect`, refs, event handlers en el mismo archivo
- Context providers de lección/ejercicio
- Suscripciones Realtime (cuando existan)

Ubicación típica: `src/components/exercises/*`, `src/components/lesson/*`, navegación (`app-nav.tsx`).

**No** marques toda una página como client si basta un hijo interactivo.

### Composición página + componentes

- **Página:** orquestación, fetching, layout de secciones.
- **Componentes en `src/components/`:** UI reutilizable y widgets.
- **Evita** lógica de mastery, validación de ejercicios o reglas de aula dentro del JSX; llama a `src/lib/`.

## Server Actions

En este repo las acciones viven en **`src/lib/<dominio>/actions.ts`** (o `*-actions.ts`), con `"use server"` al inicio del archivo.

Ejemplos existentes:

- `src/lib/auth/actions.ts`, `adult-actions.ts`
- `src/lib/classrooms/actions.ts`
- `src/lib/exercises/actions.ts`
- `src/lib/learning-paths/actions.ts`

Patrón:

1. Validar entrada con **Zod** en el servidor.
2. Comprobar sesión / permisos (helpers en `src/lib/auth/`, `src/lib/classrooms/authorization.ts`).
3. Delegar en funciones puras de dominio cuando sea posible.
4. Devolver `{ ok: true, ... }` o errores tipados; no lanzar excepciones genéricas para flujos esperados.

Desde Client Components: importar la action y usarla en formularios (`form action={...}`) o en handlers con `useTransition`.

## Route Handlers

Pocos; p. ej. `src/app/auth/callback/route.ts` para OAuth. Preferir Server Actions para mutaciones de usuario.

## Enlaces y navegación

- Rutas internas: `import Link from "next/link"`.
- Redirecciones en servidor: `redirect()` de `next/navigation`.
- Parámetros dinámicos: carpetas `[param]`; en Next 16 sigue las convenciones actuales del paquete (docs embebidas).

## TypeScript

- Tipos explícitos en APIs públicas de `lib/`.
- Reutiliza tipos de `src/types/` y generados de Supabase cuando existan.
- `as const` para listas de configuración estática en páginas (ver `QUICK_LINKS` en aprender).

## Tests

- **Dominio** (`src/lib/`): Vitest en `src/tests/unit/` — funciones puras, exercise-engine, etc.
- **E2E:** Playwright en `e2e/` — flujos de `/aprender`, auth, etc.
- Tras cambiar una ruta crítica, ejecuta al menos `npm run lint` y `npm run test:run`.

## Checklist antes de entregar una feature web

- [ ] ¿La ruta nueva tiene layout padre adecuado (`src/app/aprender/layout.tsx`, etc.)?
- [ ] ¿Fetching solo en servidor salvo necesidad client?
- [ ] ¿Strings de UI en español?
- [ ] ¿Sin estilos móvil-first prohibidos (ver `03-ui-estilos.md`)?
- [ ] ¿Server Action con validación si hay mutación?
