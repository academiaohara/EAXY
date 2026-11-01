import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { benchParte, slide } from "@/data/lessons/tec1-helpers";

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

    slide("ej-equidistan", "Lugares geométricos que equidistan", [], benchParte("lugar-geometrico", 0, [
      { title: "La circunferencia", text: "**La circunferencia**: todos sus puntos **equidistan del centro**. Su distancia al centro es el radio $R$.", fact: "Equidista del centro" },
      { title: "Mediatriz de un segmento", text: "**La mediatriz de un segmento**: todos sus puntos **equidistan de los extremos** del segmento.", fact: "Equidista de A y B" },
      { title: "Bisectriz de un ángulo", text: "**La bisectriz de un ángulo**: todos sus puntos **equidistan de los lados** del ángulo.", fact: "Equidista de los lados" },
    ]), "stack"),

    slide("ej-elipse", "La elipse", [], benchParte("lugar-geometrico", 3, [
      { title: "La elipse", text: "La **elipse** es el lugar geométrico de los puntos del plano cuya **suma de distancias a dos puntos fijos**, los **focos**, es una constante igual a $2a$. Desde cualquier punto $P$ de la elipse, la distancia al foco 1 ($d_1$) más la distancia al foco 2 ($d_2$) **siempre da la misma cantidad**: mira cómo una crece cuando la otra disminuye.", fact: "d₁ + d₂ = 2a" },
    ]), "stack"),

    slide("ej-hiperbola", "La hipérbola", [], benchParte("lugar-geometrico", 4, [
      { title: "La hipérbola", text: "La **hipérbola** es el lugar geométrico de los puntos del plano cuya **diferencia de distancias a dos puntos fijos**, los **focos**, es constante en valor absoluto e igual a $2a$. Es decir, la distancia de $P$ a un foco **menos** la distancia de $P$ al otro foco es siempre la distancia entre los vértices ($a + a = 2a$). Tiene **dos ramas**.", fact: "|d₁ − d₂| = 2a" },
    ]), "stack"),

    slide("ej-parabola", "La parábola", [], benchParte("lugar-geometrico", 5, [
      { title: "La parábola", text: "La **parábola** es el lugar geométrico de los puntos del plano que **equidistan de un punto fijo**, el **foco**, y de una **recta fija**, la **directriz**. Es decir, la distancia de cualquier punto de la parábola al foco (que queda «dentro» de la curva) es **igual** a su distancia a la directriz (que queda «fuera»).", fact: "d₁ = d₂" },
    ]), "stack"),
  ],
};
