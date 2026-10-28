import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transformacionesGeometricasClasificacionDt2Lesson: InteractiveLesson = {
  slug: "transformaciones-geometricas-clasificacion-dt2",
  title: "1. Transformaciones geométricas y lo que conservan",
  subtitle: DT2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Mover figuras sin romperlas", [
      { kind: "steps", items: [
        "Una **transformación geométrica** hace corresponder a cada punto de una figura otro punto, su **homólogo**, para obtener otra figura.",
        "Se clasifican por lo que **conservan**: las **isometrías** (traslación, giro, simetría) conservan distancias y ángulos; la **semejanza** (homotecia) conserva ángulos; la **afinidad** conserva el paralelismo; la **homología** (proyectiva) solo la alineación.",
        "Cada clase **contiene** a la anterior: las isometrías son semejanzas de razón 1; las semejanzas son afinidades; las afinidades son homologías con el centro en el infinito.",
        "Las **proyecciones** de los sistemas de representación son transformaciones: por eso conviene conocerlas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prueba una transformación", [
      { kind: "text", text: "Elige un ejemplo o cambia la matriz y mira cómo se transforma el cuadrado: ¿qué se conserva?" },
    ], tool("dt2-transformaciones-generales-explorador"), "visual-top"),
    slide("invariantes", "Invariantes", [
      { kind: "steps", items: [
        "**Isometría**: se conservan **longitudes, ángulos, áreas y paralelismo**.",
        "**Semejanza** de razón $k$: ángulos y paralelismo; las longitudes se multiplican por $k$ y las áreas por $k^2$.",
        "**Afinidad**: **paralelismo** y la **razón simple** de tres puntos alineados; las áreas se multiplican por una constante, $|\\det|$.",
        "**Homología**: la **alineación** (rectas se transforman en rectas) y la **razón doble** de cuatro puntos alineados.",
      ] },
    ]),
    calc("calc-cizalla", "Cizalla", "La transformación (x, y) → (x + 0,75y, y) tiene determinante 1·1 − 0,75·0 = 1. ¿Por cuánto se multiplican las áreas?", nums(1), "|det| = 1: se conservan las áreas, pero no los ángulos.", "Las áreas se multiplican por |det|."),
    calc("calc-afin", "Afinidad con k = 0,5", "La transformación (x, y) → (x, 0,5y). ¿Por cuánto se multiplican las áreas?", nums(0.5), "det = 1 · 0,5 = 0,5.", "Producto de la diagonal."),
    calc("calc-ang", "Ángulo entre los ejes transformados", "En la cizalla, las columnas son (1, 0) y (0,75, 1), de longitudes 1 y 1,25, y su producto escalar es 0,75. ¿Qué ángulo forman, en grados? (un decimal)", nums(53.1, 53.13), "cos θ = 0,75/(1·1,25) = 0,6 ⇒ θ ≈ 53,1° (los ejes perpendiculares ya no lo son).", "Arcocoseno de 0,6."),
    sort("clasifica-tr", "¿Qué transformación es?", "Clasifica cada descripción.",
      [["iso", "Isometría", "cobalt"], ["sem", "Semejanza", "amber"], ["afi", "Afinidad", "emerald"], ["hom", "Homología", "rose"]],
      [["Un giro de 30°", "iso"], ["Una simetría axial", "iso"], ["Una homotecia de razón 1,5", "sem"], ["Una ampliación con giro", "sem"], ["Una cizalla", "afi"], ["Escalar solo la altura de una figura", "afi"], ["La perspectiva de un plano sobre el cuadro", "hom"], ["Las rectas se transforman en rectas pero se pierde el paralelismo", "hom"]],
      "Cada tipo conserva menos propiedades que el anterior.",
    ),
    pick("check-cons", "Qué se conserva", "¿Cuál es la propiedad que conservan todas estas transformaciones (isometría, semejanza, afinidad y homología)?",
      "La alineación: una recta se transforma en otra recta",
      [["Las longitudes", "Solo las isometrías."], ["Los ángulos", "Las afinidades y homologías los deforman."], ["El paralelismo", "La homología lo pierde."]],
      "Todas son transformaciones proyectivas: llevan rectas en rectas.",
    ),
  ],
};
