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
      { title: "Toda la figura", text: "Al hacer lo mismo con $B$ y con $C$ se obtiene $A'B'C'$. Cada $AA'$ es **perpendicular** a $e$ y el eje lo corta por su punto medio: $e$ es la **mediatriz** de $AA'$. Si en lugar de un eje hay un **centro** $O$ que es el punto medio de cada $PP'$, es una **simetría central**: equivale a un giro de $180^\\circ$.", fact: "Axial: eje = mediatriz · Central: centro = punto medio" },
    ]), "stack"),

    benchTask("simetria-construye", "Refleja el triángulo", "simetria-practica", [
      ...["A", "B", "C"].flatMap((n) => [
        { title: `${n} · Toma la medida P${n}`, text: `Toca $P$ para clavar la punta y $${n}$ para colocar la mina: el compás queda con el radio $P${n}$.`, fact: `Abertura = P${n}` },
        { title: `${n} · Clava la punta en P`, text: "Toca el punto $P$ del eje." },
        { title: `${n} · Primer arco`, text: "Arrastra la mina para trazar un arco que **cruce el eje**, hacia el otro lado." },
        { title: `${n} · Toma la medida Q${n}`, text: `Mide ahora la distancia entre $Q$ y $${n}$.`, fact: `Abertura = Q${n}` },
        { title: `${n} · Clava la punta en Q`, text: "Toca el punto $Q$ del eje." },
        { title: `${n} · Segundo arco`, text: "Arrastra la mina para trazar un arco que **corte al anterior**." },
        { title: `${n} · Marca ${n}′`, text: `Toca el corte de los dos arcos que **no** es $${n}$: es $${n}'$.` },
      ]),
      { title: "Une los puntos", text: "Pasa la regla por **dos puntos** cada vez: primero $A'$ y $B'$, luego $B'$ y $C'$ y por último $C'$ y $A'$. Solo puedes tocar los tres vértices nuevos y no se repite ningún lado.", fact: "Tres pasadas de la regla" },
    ], {
      question: "Halla el simétrico del triángulo ABC respecto del eje e con el compás y une los puntos con la regla.",
      hint: "Para cada vértice, los arcos desde P y desde Q se cortan en el vértice y en su simétrico.",
      explanation: "Cada vértice y su simétrico equidistan de P y de Q, así que el eje es la mediatriz de todos los segmentos AA′, BB′ y CC′ y A′B′C′ es la figura simétrica de ABC.",
    }),
  ],
};
