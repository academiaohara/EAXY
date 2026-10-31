import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const simetriaDt1Lesson: InteractiveLesson = {
  slug: "simetria-dt1",
  title: "3. Simetría axial y central",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("simetria", "Simetría axial", [], bench("simetria-compas", [
      { title: "Un eje y una figura", text: "Una **simetría axial** de eje $e$ lleva cada punto a otro situado al **otro lado** del eje, a la **misma distancia** de él, de modo que el segmento que los une es **perpendicular** al eje." },
      { title: "Elige dos puntos del eje", text: "Para hallar el simétrico de $A$ sin trazar perpendiculares, marca dos puntos del eje: $P$ y $Q$." },
      { title: "Arco desde P", text: "Con la punta seca en $P$ y la mina en $A$, traza un arco que cruce el eje: pasa por $A$ **y por su simétrico**.", fact: "PA = PA′" },
      { title: "Arco desde Q", text: "Repite desde $Q$ con radio $QA$. Los dos arcos se cortan en $A$ y en $A'$: el punto nuevo es $A'$.", fact: "QA = QA′" },
      { title: "Toda la figura", text: "Al hacer lo mismo con $B$ y con $C$ se obtiene $A'B'C'$. Cada $AA'$ es **perpendicular** a $e$ y el eje lo corta por su punto medio: $e$ es la **mediatriz** de $AA'$.", fact: "El eje es la mediatriz de cada AA′" },
    ]), "stack"),

    ...["A", "B", "C"].map((n, i) =>
      benchTask(`simetria-${n.toLowerCase()}`, `Busca el simétrico de ${n}`, "simetria-practica", [
        { title: `Toma la medida P${n}`, text: `Toca $P$ para clavar la punta y $${n}$ para colocar la mina: el compás queda con el radio $P${n}$.`, fact: `Abertura = P${n}` },
        { title: "Clava la punta en P", text: "Toca el punto $P$ del eje." },
        { title: "Traza el primer arco", text: "Arrastra la mina para trazar un arco que **cruce el eje**, hacia el otro lado." },
        { title: `Toma la medida Q${n}`, text: `Ahora mide la distancia entre $Q$ y $${n}$.`, fact: `Abertura = Q${n}` },
        { title: "Clava la punta en Q", text: "Toca el punto $Q$ del eje." },
        { title: "Traza el segundo arco", text: "Arrastra la mina para trazar un arco que **corte al anterior**." },
        { title: `Marca ${n}′`, text: `Toca el corte de los dos arcos que **no** es $${n}$: es $${n}'$. Después pulsa **Comprobar**.${i > 0 ? " Los puntos anteriores ya están hallados." : ""}` },
      ], {
        question: `Halla el simétrico ${n}' del punto ${n} respecto del eje e usando solo el compás.`,
        hint: `Los arcos de radio P${n} desde P y de radio Q${n} desde Q se cortan en ${n} y en su simétrico ${n}′.`,
        explanation: `${n}′ está a la misma distancia de P que ${n} y a la misma distancia de Q que ${n}; por eso el eje es la mediatriz de ${n}${n}′.`,
        params: { b: i },
      }),
    ),

    benchTask("simetria-union", "Une A′, B′ y C′", "union-imagen", [
      { title: "Une los puntos", text: "Pasa la regla por **dos puntos** cada vez: primero $A'$ y $B'$, luego $B'$ y $C'$ y por último $C'$ y $A'$. Toca los dos extremos de cada lado. Después pulsa **Comprobar**.", fact: "Tres pasadas de la regla" },
    ], {
      question: "Une con la regla los puntos A', B' y C' para obtener el triángulo simétrico.",
      hint: "Hay tres lados: A′B′, B′C′ y C′A′.",
      explanation: "El triángulo A′B′C′ es igual que ABC, pero con la orientación invertida: es su simétrico respecto del eje.",
      params: { a: 2 },
    }),

    benchTask("simetria-cuadricula", "Refleja el triángulo", "simetria-cuadricula", [
      { title: "Marca A′", text: "Cada punto se refleja respecto del eje $e$: a la **misma distancia**, al **otro lado** y en **perpendicular**. Toca donde queda $A'$." },
      { title: "Marca B′", text: "Refleja $B$ igual: cuenta los cuadros que lo separan del eje." },
      { title: "Marca C′ y comprueba", text: "Marca $C'$ y pulsa **Comprobar**: la figura simétrica es igual que la original, pero con la orientación invertida." },
    ], {
      question: "Marca A', B' y C' al reflejar el triángulo ABC respecto del eje e.",
      hint: "Cada vértice y su simétrico están a la misma distancia del eje, uno a cada lado.",
      explanation: "En una simetría axial cada punto pasa al otro lado del eje conservando su distancia a él; el segmento que une un punto con su simétrico es perpendicular al eje.",
      params: { a: 0 },
    }),

    benchTask("simetria-central", "Simetría central", "giro-cuadricula", [
      { title: "Marca A′", text: "Una **simetría central** de centro $O$ lleva cada punto $P$ a $P'$ de modo que $O$ es el **punto medio** de $PP'$. Equivale a un **giro de $180^\\circ$**. Toca donde queda $A'$.", fact: "O es el punto medio de AA′" },
      { title: "Marca B′", text: "Haz lo mismo con $B$: $B'$ está en la recta $BO$, al otro lado de $O$ y a la misma distancia." },
      { title: "Marca C′ y comprueba", text: "Marca $C'$ y pulsa **Comprobar**." },
    ], {
      question: "Marca A', B' y C' al hacer la simetría central del triángulo ABC respecto de O.",
      hint: "Cada punto, el centro O y su simétrico están alineados, con O en medio.",
      explanation: "En una simetría central O es el punto medio de cada segmento PP′: es un giro de 180° alrededor de O.",
      params: { a: 180 },
    }),
  ],
};
