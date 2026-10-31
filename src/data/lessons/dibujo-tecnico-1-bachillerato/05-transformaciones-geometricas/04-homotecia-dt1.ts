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

    ...["A", "B", "C"].map((n, i) =>
      benchTask(`homotecia-${n.toLowerCase()}`, `Busca la imagen de ${n}`, "homotecia-practica", [
        { title: `Toma la medida O${n}`, text: `Toca $O$ para clavar la punta y $${n}$ para colocar la mina: el compás queda con la longitud $O${n}$.`, fact: `Abertura = O${n}` },
        { title: `Clava la punta en ${n}`, text: `Toca el vértice $${n}$.` },
        { title: "Traza el arco", text: `Arrastra la mina para trazar un arco que **corte la recta $O${n}$** más allá de $${n}$.` },
        { title: `Marca ${n}′`, text: `Toca el corte del arco con la recta $O${n}$ que **no** es $O$: es $${n}'$. Después pulsa **Comprobar**.${i > 0 ? " Las imágenes anteriores ya están hechas." : ""}` },
      ], {
        question: `Halla la imagen ${n}' de ${n} en la homotecia de centro O y razón 2 usando el compás.`,
        hint: `Lleva la distancia O${n} a continuación de ${n} sobre la recta O${n}.`,
        explanation: `El arco de radio O${n} centrado en ${n} corta a la recta O${n} en O y en ${n}′; ${n}′ es el que cumple O${n}′ = O${n} + ${n}${n}′ = 2·O${n}.`,
        params: { b: i },
      }),
    ),

    benchTask("homotecia-union", "Une A′, B′ y C′", "union-imagen", [
      { title: "Une los puntos", text: "Pasa la regla por **dos puntos** cada vez: primero $A'$ y $B'$, luego $B'$ y $C'$ y por último $C'$ y $A'$. Toca los dos extremos de cada lado. Después pulsa **Comprobar**.", fact: "Tres pasadas de la regla" },
    ], {
      question: "Une con la regla los puntos A', B' y C' para obtener el triángulo ampliado.",
      hint: "Hay tres lados: A′B′, B′C′ y C′A′.",
      explanation: "El triángulo A′B′C′ es semejante a ABC (razón 2): sus lados son paralelos a los de ABC y el doble de largos.",
      params: { a: 3 },
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
