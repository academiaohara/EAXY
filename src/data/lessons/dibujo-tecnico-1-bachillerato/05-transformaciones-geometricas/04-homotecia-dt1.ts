import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const homoteciaDt1Lesson: InteractiveLesson = {
  slug: "homotecia-dt1",
  title: "4. Homotecia",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("homotecia", "Homotecia", [], bench("homotecia-compas", [
      { title: "Un centro y una razón", text: "Una **homotecia** de centro $O$ y razón $k$ lleva cada punto $P$ a $P'$ en la **recta $OP$**, de modo que $OP' = k \\cdot OP$. Aquí $k = 2$: la figura se **amplía al doble**.", fact: "OP′ = k · OP" },
      { title: "Rectas desde O", text: "Traza las rectas que unen $O$ con cada vértice: las imágenes estarán sobre ellas." },
      { title: "Toma la medida OA", text: "Con el compás, toma la distancia $OA$: punta seca en $O$ y mina en $A$.", fact: "Abertura = OA" },
      { title: "Llévala a continuación de A", text: "Clava la punta en $A$ y, con la misma abertura, traza un arco que corte a la recta $OA$ más allá de $A$: ahí está $A'$, con $OA' = 2\\cdot OA$.", fact: "OA′ = 2·OA" },
      { title: "Toda la figura", text: "Con $B$ y $C$ se hace igual. El triángulo $A'B'C'$ tiene los lados **paralelos** a los de $ABC$ y el **doble de largos**: es **semejante** al original, no igual.", fact: "Lados paralelos y razón k" },
    ]), "stack"),

    benchTask("homotecia-practica", "Busca la imagen de A", "homotecia-practica", [
      { title: "Toma la medida OA", text: "Toca $O$ para clavar la punta y $A$ para colocar la mina: el compás queda con la longitud $OA$.", fact: "Abertura = OA" },
      { title: "Clava la punta en A", text: "Toca el vértice $A$." },
      { title: "Traza el arco", text: "Arrastra la mina para trazar un arco que **corte la recta $OA$** más allá de $A$." },
      { title: "Marca A′", text: "Toca el corte del arco con la recta $OA$ que **no** es $O$: es $A'$. Después pulsa **Comprobar**." },
    ], {
      question: "Halla la imagen A' de A en la homotecia de centro O y razón 2 usando el compás.",
      hint: "Lleva la distancia OA a continuación de A sobre la recta OA.",
      explanation: "El arco de radio OA centrado en A corta a la recta OA en O y en A′; A′ es el que cumple OA′ = OA + AA′ = 2·OA.",
    }),

    benchTask("homotecia-cuadricula", "Amplía el triángulo", "homotecia-cuadricula", [
      { title: "Marca A′", text: "Cada punto $P$ pasa a $P'$ en la recta $OP$ con $OP' = 2\\cdot OP$. Cuenta los cuadros desde $O$ hasta el vértice y **duplícalos**." },
      { title: "Marca B′", text: "Haz lo mismo con $B$: se mueve el doble en horizontal y el doble en vertical respecto de $O$." },
      { title: "Marca C′ y comprueba", text: "Marca $C'$ y pulsa **Comprobar**: la figura obtenida tiene la **misma forma** y el doble de tamaño." },
    ], {
      question: "Marca A', B' y C' al ampliar el triángulo ABC con una homotecia de centro O y razón 2.",
      hint: "Desde O, cada vértice se aleja el doble de cuadros en cada dirección.",
      explanation: "En una homotecia de razón 2 las coordenadas de cada punto respecto de O se duplican; los lados quedan paralelos y el doble de largos.",
      params: { a: 2 },
    }),

    benchTask("homotecia-negativa", "Razón negativa", "homotecia-cuadricula", [
      { title: "Marca A′", text: "Con una razón **negativa**, la imagen queda al **otro lado** de $O$: $OP' = 2\\cdot OP$, pero en sentido contrario. Toca donde queda $A'$.", fact: "k negativa: al otro lado de O" },
      { title: "Marca B′", text: "$B'$ está en la recta $BO$, al otro lado de $O$ y al doble de distancia." },
      { title: "Marca C′ y comprueba", text: "Marca $C'$ y pulsa **Comprobar**: la figura queda **invertida** y del doble de tamaño." },
    ], {
      question: "Marca A', B' y C' al aplicar al triángulo ABC una homotecia de centro O y razón −2.",
      hint: "Duplica las distancias a O, pero en el sentido contrario.",
      explanation: "Con razón negativa cada punto pasa al lado opuesto de O: la imagen tiene el mismo tamaño que con razón positiva, pero queda invertida (como un giro de 180° seguido de una ampliación).",
      params: { a: -2 },
    }),
  ],
};
