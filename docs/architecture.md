# Arquitectura de Eaxy

## Resumen

Eaxy es una aplicación Next.js (App Router) con lecciones definidas en JSON, validadas con Zod, y renderizadas por un motor de lecciones con widgets interactivos.

```
content/math/*.json  →  Zod schema  →  LessonPlayer  →  Widgets
                              ↓
                      lesson-engine (check)
                              ↓
                      FeedbackPanel + localStorage
```

## Motor de lecciones

### Flujo de un paso

1. El alumno lee el contenido del paso (`intro`, `interaction` o `explanation`).
2. Si hay widget, interactúa con él.
3. Si el paso requiere comprobación (`requiresCheck` o widget con respuesta), pulsa **Comprobar**.
4. El motor devuelve un `CheckResult`:

```typescript
interface CheckResult {
  correct: boolean;
  explanation: string;
  hints: string[];
  userAnswer: unknown;
  correctAnswer: unknown;
}
```

5. Si es correcto (o el paso no requiere comprobación), puede pulsar **Continuar**.
6. El progreso se persiste en `localStorage` bajo la clave `eaxy-lesson-progress`.

### Archivos clave

| Archivo | Responsabilidad |
|---------|-----------------|
| `src/lib/lesson-schema.ts` | Esquema Zod + tipos TypeScript |
| `src/lib/lesson-engine.ts` | Lógica de comprobación y avance |
| `src/lib/lesson-loader.ts` | Carga de JSON desde `content/math/` |
| `src/lib/progress.ts` | Persistencia en localStorage |
| `src/components/lesson/LessonPlayer.tsx` | Orquestador del flujo |

### Reglas de comprobación

- `tap_select` — Siempre requiere comprobación; compara `selectedId` con `correctOptionId`.
- `fraction_bar` — Siempre requiere comprobación; compara partes sombreadas con el objetivo.
- `slider_explore` — Solo requiere comprobación si tiene `checkValue`; usa `tolerance` para comparar.

## Widgets

Cada widget es un componente React en `src/components/widgets/` con props tipadas.

### `tap_select`

Selección de una opción entre varias. Soporta imágenes SVG inline y etiquetas con KaTeX.

```json
{
  "type": "tap_select",
  "options": [{ "id": "a", "label": "Opción A" }],
  "correctOptionId": "a",
  "hints": ["Pista 1"]
}
```

### `slider_explore`

Slider con visualización en tiempo real. Tipos de visualización:

- `rect_division` — Barra dividida en N partes (N = valor del slider)
- `number_line` — Recta numérica con marcador

```json
{
  "type": "slider_explore",
  "min": 2,
  "max": 8,
  "step": 1,
  "initial": 2,
  "label": "Número de partes",
  "visual": { "type": "rect_division", "totalParts": 8 },
  "checkValue": 4,
  "hints": []
}
```

### `fraction_bar`

Barra dividida en partes iguales que el alumno sombrea tocando casillas.

```json
{
  "type": "fraction_bar",
  "totalParts": 4,
  "targetNumerator": 2,
  "targetDenominator": 4,
  "hints": []
}
```

## Esquema JSON de lección

```json
{
  "id": "string",
  "slug": "string",
  "title": "string",
  "description": "string",
  "subject": "math",
  "topic": "string",
  "estimatedMinutes": 10,
  "steps": [
    {
      "id": "string",
      "type": "intro | interaction | explanation",
      "title": "string (opcional)",
      "content": "string (markdown ligero + KaTeX: $inline$ y $$bloque$$)",
      "widget": { "...": "opcional" },
      "requiresCheck": false
    }
  ]
}
```

## Validación

El script `scripts/validate-lessons.ts` valida todos los JSON de `content/math/` contra el esquema Zod.

```bash
npm run validate:lessons
```

## Fórmulas matemáticas

Se usa KaTeX. En el contenido de los pasos:

- Inline: `$\\frac{1}{2}$`
- Bloque: `$$\\frac{2}{4} = \\frac{1}{2}$$`

El componente `MathContent` renderiza el HTML de KaTeX.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Listado de lecciones |
| `/leccion/[slug]` | Reproductor de lección |

## Decisiones de diseño

- **App única** (no monorepo) — Simplicidad para el MVP; fácil migrar a monorepo después.
- **JSON estático** — Sin CMS; las lecciones viven en el repo y se validan en CI.
- **Client-side progress** — Sin backend por ahora.
- **Framer Motion** — Animaciones suaves en transiciones y feedback.
