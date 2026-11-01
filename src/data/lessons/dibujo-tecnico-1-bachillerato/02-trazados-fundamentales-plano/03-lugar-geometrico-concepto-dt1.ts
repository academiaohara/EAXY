import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const lugarGeometricoConceptoDt1Lesson: InteractiveLesson = {
  slug: "lugar-geometrico-concepto-dt1",
  title: "3. Concepto de lugar geométrico",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una propiedad que comparten todos los puntos", [
      { kind: "steps", items: [
        "Un **lugar geométrico** es el **conjunto de puntos** (del plano o del espacio) que gozan **todos** de una misma propiedad.",
        "Es un concepto muy importante: casi todas las construcciones se resuelven buscando un punto como **intersección de dos lugares geométricos**.",
      ] },
    ], undefined, "stack"),

    slide("ejemplos", "Ejemplos de lugares geométricos", [], bench("lugar-geometrico", [
      { title: "La circunferencia", text: "**La circunferencia**: todos sus puntos **equidistan del centro**. Su distancia al centro es el radio $R$.", fact: "Equidista del centro" },
      { title: "Mediatriz de un segmento", text: "**La mediatriz de un segmento**: todos sus puntos **equidistan de los extremos** del segmento.", fact: "Equidista de A y B" },
      { title: "Bisectriz de un ángulo", text: "**La bisectriz de un ángulo**: todos sus puntos **equidistan de los lados** del ángulo.", fact: "Equidista de los lados" },
      { title: "La elipse", text: "**La elipse**: la **suma** de las distancias de cada punto de ella a otros dos puntos fijos (los focos) es **constante**.", fact: "PF₁ + PF₂ = constante" },
      { title: "La hipérbola", text: "**La hipérbola**: la **diferencia** de las distancias de cada punto de ella a otros dos puntos fijos es **constante**.", fact: "|PF₁ − PF₂| = constante" },
      { title: "La parábola", text: "**La parábola**: todos sus puntos **equidistan de un punto y de una recta** dados (el foco y la directriz).", fact: "Equidista de F y de d" },
    ]), "stack"),

    slide("espacio", "En el espacio", [
      { kind: "steps", items: [
        "**La esfera**: todos sus puntos **equidistan del centro**. Es el equivalente en el espacio de la circunferencia.",
        "Las **cónicas** (elipse, hipérbola y parábola) se estudian con detalle más adelante, en el tema de curvas cónicas.",
      ] },
    ], undefined, "stack"),
  ],
};
