import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const propiedadesPeriodicasFq4Lesson: InteractiveLesson = {
  slug: "propiedades-periodicas-fq4",
  title: "3. Propiedades periódicas",
  subtitle: FQ4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Propiedades que se repiten", [
      { kind: "steps", items: [
        "Las **propiedades periódicas** varían de forma **regular** a lo largo de la tabla, porque dependen de la configuración electrónica.",
        "**Radio atómico**: tamaño del átomo. **Energía de ionización**: energía para arrancar el electrón más externo de un átomo neutro y gaseoso. **Electronegatividad**: tendencia a atraer los electrones de un enlace.",
        "Dependen de dos factores: la **carga nuclear efectiva** (cuánto atrae el núcleo a los electrones externos) y la **distancia** (número de capas).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Tendencias", [
      { kind: "text", text: "Elige una propiedad y recorre los 36 primeros elementos. Compara periodos y grupos." },
    ], tool("fq4-propiedades-periodicas-explorador"), "visual-top"),
    slide("tend", "Las tendencias", [
      { kind: "steps", items: [
        "**En un periodo** (de izquierda a derecha): el **radio disminuye**, y la **energía de ionización** y la **electronegatividad aumentan** (más protones atraen a electrones de la misma capa).",
        "**En un grupo** (de arriba abajo): el **radio aumenta** (más capas), y la **energía de ionización** y la **electronegatividad disminuyen**.",
        "El **flúor** es el elemento más electronegativo; el **helio** tiene la mayor energía de ionización; el **cesio/francio** son los menos electronegativos.",
        "Un **catión** es **más pequeño** que su átomo neutro y un **anión**, **más grande**.",
      ] },
    ]),
    calc("calc-gru", "Radio en un grupo", "Los radios del Li, Na y K son 128, 166 y 203 pm. ¿Cuánto aumenta el radio del Li al K, en pm?", nums(75), "203 − 128 = 75 pm.", "Resta los dos radios."),
    calc("calc-ei", "Ionización", "La energía de ionización del Na es 496 kJ/mol y la del Cl, 1251 kJ/mol. ¿Cuántos kJ/mol más cuesta arrancar el electrón al Cl?", nums(755), "1251 − 496 = 755 kJ/mol.", "Resta."),
    calc("calc-en", "Electronegatividad", "Si F tiene 3,98 y Na 0,93, ¿cuánto vale la diferencia de electronegatividad? (un decimal)", nums(3.1, 3.05), "3,98 − 0,93 = 3,05 ≈ 3,1: enlace claramente iónico.", "Resta."),
    sort("clasifica", "Tendencia", "Clasifica cada afirmación.",
      [["a", "Aumenta de izquierda a derecha en un periodo", "emerald"], ["d", "Disminuye de izquierda a derecha en un periodo", "rose"]],
      [["Energía de ionización", "a"], ["Electronegatividad", "a"], ["Carga nuclear efectiva", "a"], ["Radio atómico", "d"], ["Tamaño del átomo", "d"], ["Carácter metálico", "d"]],
      "Los protones crecen y atraen más a los electrones externos.",
    ),
    pick("check", "Ionización", "¿Por qué el sodio pierde con facilidad su electrón de valencia?",
      "Porque tiene baja energía de ionización",
      [["Porque tiene alta electronegatividad", "Es baja en el sodio."], ["Porque es un gas noble", "Es un metal alcalino."], ["Porque su radio es muy pequeño", "Su radio es grande."]],
      "Un solo electrón externo lejos del núcleo.",
    ),
  ],
};
