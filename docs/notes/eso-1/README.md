# 1º ESO — Matemáticas

Apuntes de referencia para diseñar lecciones interactivas de primer curso de ESO.

## Estructura

| Carpeta / archivo | Uso |
|-------------------|-----|
| `source/` | PDFs originales del temario (material de referencia, no se sirven en la web) |
| `../../content/math/curriculum.json` | Catálogo de temas y enlace con lecciones publicadas |

## Temas

1. Los números naturales — *lección disponible: `numeros-naturales-intro`*
2. Potencias y raíces
3. Divisibilidad
4. Los números enteros
5. Los números decimales
6. El sistema métrico decimal
7. Las fracciones — *lección disponible: `fracciones-intro`*
8. Operaciones con fracciones
9. Proporcionalidad y porcentajes
10. Álgebra
11. Rectas y ángulos
12. Figuras geométricas
13. Áreas y perímetros
14. Tablas y gráficas

## Cómo crear lecciones a partir de un tema

1. Consulta el PDF en `source/` para el contenido pedagógico.
2. Diseña 5–8 pasos interactivos (no copies el texto literal).
3. Crea el JSON en `content/math/` y añade el `slug` al array `lessonSlugs` del tema en `curriculum.json`.
4. Ejecuta `npm run validate:lessons`.
