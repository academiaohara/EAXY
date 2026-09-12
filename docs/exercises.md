# Exercise Engine

Motor de ejercicios interactivos: definición declarativa, validación compartida y widgets React.

## Objetivos

1. **Un solo esquema** de verdad (Zod) para definición y respuesta.
2. **Validación en cliente** para feedback inmediato; **revalidación en servidor** antes de persistir el intento.
3. **Extensible** — nuevos tipos de ejercicio sin cambiar el núcleo.
4. **Vinculado a conceptos** — cada ejercicio declara qué conceptos evalúa.

## Arquitectura del motor

```
exercise.definition (JSON en BD)
        │
        ▼
┌───────────────────┐
│  Zod schema       │  src/lib/exercise-engine/schemas/
│  (por tipo)       │
└─────────┬─────────┘
          │
    ┌─────▼─────┐
    │  Engine   │  checkAnswer(definition, response) → Result
    └─────┬─────┘
          │
    ┌─────▼──────────────┐
    │  Widget React      │  src/components/exercises/
    │  (interactivo)     │
    └────────────────────┘
```

## Tipos de ejercicio (MVP)

| Tipo | Descripción | Prioridad |
|---|---|---|
| `tap_select` | Elegir una o varias opciones | Fase 1 |
| `number_input` | Introducir número (con tolerancia) | Fase 1 |
| `fraction_input` | Fracción o número mixto | Fase 1 |
| `ordering` | Ordenar elementos | Fase 2 |
| `drag_match` | Emparejar conceptos | Fase 2 |
| `graph_point` | Señalar punto en plano | Fase 3 |

Cada tipo tiene:

- `definitionSchema` — estructura del enunciado y datos del widget.
- `responseSchema` — forma de la respuesta del alumno.
- `checkAnswer(def, response)` — lógica pura, retorna `{ correct, score, feedback }`.
- `ExerciseWidget` — componente React.

## Estructura de definición (ejemplo)

```json
{
  "type": "tap_select",
  "schemaVersion": 1,
  "prompt": "¿Cuál de estas fracciones es equivalente a $\\frac{1}{2}$?",
  "options": [
    { "id": "a", "label": "$\\frac{2}{4}$" },
    { "id": "b", "label": "$\\frac{1}{3}$" },
    { "id": "c", "label": "$\\frac{3}{6}$" }
  ],
  "correctOptionIds": ["a", "c"],
  "multiSelect": true,
  "feedback": {
    "correct": "¡Correcto! Fracciones equivalentes representan la misma cantidad.",
    "incorrect": "Recuerda: multiplica o divide numerador y denominador por el mismo número."
  },
  "conceptWeights": {
    "fracciones-equivalentes": 1.0
  }
}
```

## Flujo de un intento

1. **Carga** — el cliente obtiene `exercise.definition` (ya validado al publicar).
2. **Interacción** — el widget gestiona estado local de la respuesta.
3. **Comprobación local** — `checkAnswer` en cliente → feedback inmediato (opcional: solo tras «Comprobar»).
4. **Envío** — Server Action recibe `{ exerciseId, response, timeSpentMs, source, sourceId }`.
5. **Comprobación servidor** — misma función `checkAnswer`; el servidor es la fuente de verdad.
6. **Persistencia** — INSERT en `attempts`; recálculo de mastery.

> Nunca confiar solo en la validación del cliente para `is_correct` o `score`.

## Puntuación

| Resultado | score |
|---|---|
| Correcto | 1.0 |
| Parcialmente correcto (multi-select) | aciertos / total |
| Incorrecto | 0.0 |
| Con tolerancia numérica | 1.0 si `|respuesta - correcta| ≤ ε` |

El `score` alimenta el cálculo de mastery (ver `learning-model.md`).

## Fórmulas matemáticas

- KaTeX en el cliente para renderizar `$...$` y `$$...$$` en enunciados y opciones.
- Componente `MathText` reutilizable en `src/components/learning/`.

## Registro de widgets

En `src/lib/exercise-engine/registry.ts`:

```ts
const registry: Record<ExerciseType, {
  definitionSchema: ZodSchema;
  responseSchema: ZodSchema;
  checkAnswer: CheckAnswerFn;
  Widget: ComponentType<ExerciseWidgetProps>;
}> = { ... };
```

`LessonPlayer` / `ExercisePlayer` resuelve el tipo y monta el widget correspondiente.

## Publicación de contenido (decisión aprobada)

- **Producción:** catálogo en BD (tablas `courses`, `exercises`, etc.).
- **Repo:** JSON en `supabase/seed/` solo para seeds de desarrollo y fixtures de CI.
- Validación Zod al insertar (trigger o Server Action de admin).
- `schemaVersion` permite migrar definiciones antiguas con adaptadores.

## Validación al publicar

Script `npm run validate:exercises` (futuro):

- Recorre todos los ejercicios del seed o BD.
- Valida contra Zod.
- Comprueba que `concept_ids` existen.
- Falla el CI si hay errores.

## Testing

| Qué | Cómo |
|---|---|
| `checkAnswer` por tipo | Vitest con casos borde (tolerancia, multi-select, vacío) |
| Schemas Zod | Vitest con definiciones válidas e inválidas |
| Widgets | Testing Library: interacción + estado |
| Flujo completo | E2E Playwright: responder y ver feedback |

## Documentos relacionados

- `learning-model.md` — cómo los intentos alimentan mastery
- `live-sessions.md` — ejercicios en sesión en vivo
- `architecture.md` — ubicación en `src/lib/exercise-engine/`
