import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const homoteciaDt1Lesson: InteractiveLesson = {
  slug: "homotecia-dt1",
  title: "4. Homotecia",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("homotecia", "Homotecia", [], bench("homotecia-compas", [
      { title: "Un centro y una razón", text: "Una **homotecia** de centro $O$ y razón $k$ lleva cada punto $P$ a $P'$ en la **recta $OP$**, de modo que $OP' = k \\cdot OP$. Aquí $k = 2$: la figura se **amplía al doble**.", fact: "OP′ = k · OP" },
      { title: "Rectas desde O", text: "Traza las rectas que unen $O$ con cada vértice: las imágenes estarán sobre ellas." },
      { title: "Toma la medida OA", text: "Con el compás, toma la distancia $OA$: punta seca en $O$ y mina en $A$.", fact: "Abertura = OA" },
      { title: "Llévala a continuación de A", text: "Clava la punta en $A$ y, con la misma abertura, traza un arco que corte a la recta $OA$ más allá de $A$: ahí está $A'$, con $OA' = 2\\cdot OA$.", fact: "OA′ = 2·OA" },
      { title: "Toda la figura", text: "Con $B$ y $C$ se hace igual. El triángulo $A'B'C'$ tiene los lados **paralelos** a los de $ABC$ y el **doble de largos**: es **semejante** al original, no igual.", fact: "Lados paralelos y razón k" },
    ]), "stack"),

    benchTask("homotecia-construye", "Amplía el triángulo", "homotecia-practica", [
      ...["A", "B", "C"].flatMap((n) => [
        { title: `${n}; Toma la medida O${n}`, text: `Toca $O$ para clavar la punta y $${n}$ para colocar la mina: el compás queda con la longitud $O${n}$.`, fact: `Abertura = O${n}` },
        { title: `${n}; Clava la punta en ${n}`, text: `Toca el vértice $${n}$.` },
        { title: `${n}; Traza el arco`, text: `Arrastra la mina para trazar un arco que **corte la recta $O${n}$** más allá de $${n}$.` },
        { title: `${n}; Marca ${n}′`, text: `Toca el corte del arco con la recta $O${n}$ que **no** es $O$: es $${n}'$.` },
      ]),
      { title: "Une los puntos", text: "La regla traza sola los tres lados: $A'B'$, $B'C'$ y $C'A'$. Con eso queda construida la figura transformada.", fact: "Tres pasadas de la regla" },
    ], {
      question: "Amplía el triángulo ABC con una homotecia de centro O y razón 2 usando el compás, y une los puntos.",
      hint: "Lleva la distancia de O a cada vértice a continuación del vértice, sobre la recta que los une.",
      explanation: "Con razón 2, cada imagen está sobre la recta que une O con el vértice, al doble de distancia de O: A′B′C′ es semejante a ABC, con lados paralelos y el doble de largos.",
    }),
  ],
};
