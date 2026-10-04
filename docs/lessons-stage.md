# Lecciones con escenario (stage)

Las lecciones interactivas pueden declarar un **escenario** con tema visual y pasos que usan **módulos SVG** registrados.

## Activar escenario en una lección

En el objeto `InteractiveLesson` (`src/data/lessons/*.ts`):

```ts
export const miLeccion: InteractiveLesson = {
  slug: "mi-slug",
  title: "…",
  subtitle: "…",
  stage: { theme: "paper" }, // o "board" (pizarra oscura)
  steps: [ /* … */ ],
};
```

- **`paper`**: tokens actuales de Eaxy (`--paper`, `--ink`, `--cobalt`, …).
- **`board`**: clase `.lesson-stage-theme-board` con tokens `--stage-surface`, `--stage-ink`, `--stage-accent`, …

## Tipos de paso de escenario

| Tipo | Uso | Continuar |
|------|-----|-----------|
| `narrate` | Animación guiada + caja de definición | Cuando el módulo avisa `ready` |
| `predict` | Pregunta numérica u opción múltiple | Tras **Comprobar** (como práctica) |
| `explore` | Manipulación libre con **objetivo** | **Comprobar** cuando se cumple el goal |
| `reveal` | Demostración (p. ej. bloques conmutativos) | Cuando el alumno interactúa |

Campos comunes en datos:

- `definitionBox?: string` — definición breve (Markdown ligero + `$LaTeX$`).
- `optional?: true` — no cuenta para estrellas; se puede saltar.

### Ejemplo `narrate`

```ts
{
  id: "sumar-narrate",
  type: "narrate",
  title: "Sumar",
  definitionBox: "Sumar es **unir**, **juntar**, **añadir**.",
  module: "tienda-ciclista",
  scene: "sumar-cesta",
  tienda: {
    items: [{ id: "bici", label: "Bici", price: 583 }],
    mode: "sumar-cesta",
  },
}
```

### Ejemplo `predict`

```ts
{
  id: "sumar-predict",
  type: "predict",
  title: "Total",
  question: "¿Cuánto cuesta todo?",
  mode: "numeric",
  correctAnswers: ["828"],
  module: "tienda-ciclista",
  scene: "sumar-reveal",
  tienda: { items: [...], mode: "sumar-cesta" },
}
```

### Ejemplo `explore`

```ts
{
  id: "parentesis-explore",
  type: "explore",
  title: "Paréntesis",
  question: "Consigue que valga $5$.",
  module: "piramide-reduccion",
  scene: "explorar-parentesis",
  goal: {
    kind: "expression-result",
    tokens: ["9", "-", "1", "+", "3"],
    target: 5,
  },
}
```

## Registro de módulos

Lista canónica: `STAGE_MODULE_REGISTRY` en `src/components/lesson/stage/StageModuleRenderer.tsx`.

| Módulo | Escenas / modos | Archivo |
|--------|------------------|---------|
| `tienda-ciclista` | `sumar-cesta`, `restar-cartera`, `explorar-compra` | `stage/modules/tienda-ciclista/` |
| `bloques-numericos` | `conmutativa`, `asociativa` | `stage/modules/bloques-numericos/` |
| `piramide-reduccion` | `dual-parentesis`, `explorar-parentesis` | `stage/modules/piramide-reduccion/` |
| `mul-div-naturales` | `multiplicar-repetido`, `multiplicar-conteo`, `multiplicacion-mano`, `conmutativa-producto`, `asociativa-producto`, `distributiva-bloques`, `puente-mult-div`, `reparto-igual`, `division-mano`, `reparto-manual`, `exacta-entera` | `stage/modules/mul-div-naturales/` |

Para añadir un módulo:

1. Crear componente SVG bajo `src/components/lesson/stage/modules/<nombre>/`.
2. Añadir el id a `StageModuleId` en `src/lib/lesson/types.ts`.
3. Registrar props en `StageModuleRenderer` y documentar escenas aquí.
4. Respetar `prefers-reduced-motion`, teclado, `aria-label` y limpiar timers al desmontar.

## Progreso

- Estado de minijuegos: `toolState[stepId]` en `localStorage` (`interactiveLessons` del store local).
- Hook: `usePersistedLessonToolState(stepId, createDefault)`.
- Intentos de `predict` / `explore`: `stepAttempts` + snapshots (`predict`, `explore`).

## Piloto

Referencia completa: `src/data/lessons/suma-resta-naturales.ts` (Tema 1 · 1.º ESO · Suma y resta).
