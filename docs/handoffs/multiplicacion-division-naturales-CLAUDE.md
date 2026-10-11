# Lección «Multiplicación y división» — contexto para Claude

**URL:** https://eaxy-nine.vercel.app/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/multiplicacion-division-naturales

**Slug:** `multiplicacion-division-naturales`

## Qué hay en este paquete

| Carpeta / archivo | Para qué sirve |
|-------------------|----------------|
| `data/lessons/multiplicacion-division-naturales.ts` | Definición de los 6 pasos |
| `app/.../leccion/[lessonSlug]/` | Ruta Next.js |
| `components/lesson/` | Orquestación UI (contenedor, frame, pasos stage) |
| `components/lesson/stage/modules/mul-div-naturales/` | Escenas visuales (tickets, bombones, pizarra) |
| `lib/lesson/types.ts` | Tipos `InteractiveLesson`, escenas mul-div |
| `lib/local-progress/` | Persistencia en navegador |
| `content/curriculum-lesson-snippet.ts` | Entrada en catálogo (extracto) |
| `public/lesson/mul-div-naturales/` | Imágenes PNG |
| `docs/lessons-stage.md` | Documentación tipos de paso stage |

## Flujo resumido

1. URL validada contra `curriculum` + registro `interactiveLessons[slug]`.
2. `InteractiveLessonEntryGate` → `LessonContainer` (progreso localStorage).
3. Cada paso: `InteractiveQuestion` → `NarrateStepView` / `RevealStepView` / `PredictStepView`.
4. Escenario: `StageModuleRenderer` → `MulDivNaturalesModule` según `mulDiv.scene`.

## Pasos de la lección

1. narrate — multiplicar-repetido (8×5)
2. reveal — conmutativa-producto (3×5)
3. predict — distributiva-bloques (8,5,2)
4. narrate — reparto-igual (150÷6)
5. narrate — division-mano (156÷6)
6. narrate — exacta-entera (interactivo resto)

Plataforma **solo escritorio** (≥768px).
