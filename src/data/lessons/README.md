# Lecciones interactivas (datos)

Árbol alineado con el catálogo en `src/content/curriculum.ts`:

```text
src/data/lessons/
├── index.ts                    # registro `interactiveLessons` (generable)
├── shared.ts                   # subtítulos por unidad/tema
├── interactive-lesson-slug-redirects.ts
├── matematicas-1-eso/
│   ├── 01-numeros-naturales/
│   │   ├── 01-sistemas-numeracion-naturales.ts
│   │   ├── 02-suma-resta-naturales.ts
│   │   └── …
│   ├── 02-potencias-y-raices/
│   └── …
├── matematicas-4-eso/
│   └── 01-sistemas-de-ecuaciones/
└── _unlisted/                  # slugs en el registro pero fuera del catálogo
```

Convención de nombres:

- **Curso:** slug del curso (`matematicas-1-eso`, …).
- **Tema (módulo):** `NN-<slug-modulo>` (`01-numeros-naturales`, …).
- **Lección:** `NN-<interactiveSlug>.ts` (`01-sistemas-numeracion-naturales.ts`, …).

El prefijo numérico coincide con `orderIndex` del catálogo para ordenar carpetas como en la app (Tema 1 → Lección 1).

## Mantenimiento

Tras mover o añadir lecciones en el árbol:

```bash
npx tsx scripts/generate-lessons-index.ts
```

Para reubicar en bloque desde ficheros planos (migración):

```bash
npx tsx scripts/relocate-lessons-to-tree.ts
```

Importar lecciones en código de producto vía `@/data/lessons` (`interactiveLessons`), no por ruta profunda salvo que edites el propio fichero de la lección.
