import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const traslacionDt1Lesson: InteractiveLesson = {
  slug: "traslacion-dt1",
  title: "1. Traslación",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("traslacion", "Trasladar una figura", [], bench("traslacion-compas", [
      { title: "Un vector y una figura", text: "Una **traslación** mueve todos los puntos de una figura la **misma distancia**, en la **misma dirección** y en el **mismo sentido**. Lo marca un vector $\\vec{v}$, aquí $\\overrightarrow{AA'}$." },
      { title: "Toma la medida del vector", text: "Con el compás, toma la longitud de $AA'$: punta seca en $A$ y mina en $A'$.", fact: "Abertura = AA′" },
      { title: "Arco desde B", text: "Con esa abertura, clava la punta en $B$ y traza un arco **en la dirección del vector**." },
      { title: "Arco desde A′", text: "Toma ahora la medida $AB$, clava la punta en $A'$ y traza otro arco. Donde se cortan está $B'$.", fact: "AA′B′B es un paralelogramo" },
      { title: "Toda la figura", text: "Los otros vértices se trasladan igual: $BB'$ y $CC'$ son **iguales y paralelos** a $AA'$. El triángulo $A'B'C'$ es **igual** al original: la traslación no cambia ni la forma ni el tamaño.", fact: "Todos los puntos se mueven igual" },
    ]), "stack"),

    benchTask("traslacion-construye", "Traslada el triángulo", "traslacion-practica", [
      ...["B", "C"].flatMap((n) => [
        { title: `${n} · Toma la medida AA′`, text: "Toca $A$ para clavar la punta y $A'$ para colocar la mina: el compás queda con la longitud del vector.", fact: "Abertura = AA′" },
        { title: `${n} · Clava la punta en ${n}`, text: `Toca el vértice $${n}$.` },
        { title: `${n} · Primer arco`, text: `Arrastra la mina para trazar un arco **en la dirección del vector**, por donde estará $${n}'$.` },
        { title: `${n} · Toma la medida A${n}`, text: `Mide ahora la distancia entre $A$ y $${n}$: toca $A$ y luego $${n}$.`, fact: `Abertura = A${n}` },
        { title: `${n} · Clava la punta en A′`, text: "Toca el punto $A'$." },
        { title: `${n} · Segundo arco`, text: "Arrastra la mina para trazar un arco que **corte al anterior**." },
        { title: `${n} · Marca ${n}′`, text: `Toca el punto donde se cortan los dos arcos: es $${n}'$.` },
      ]),
      { title: "Une los puntos", text: "La regla traza sola los tres lados: $A'B'$, $B'C'$ y $C'A'$. Con eso queda construida la figura transformada.", fact: "Tres pasadas de la regla" },
    ], {
      question: "Traslada el triángulo ABC según el vector AA' con el compás y une los puntos con la regla.",
      hint: "B′ y C′ salen de cortar un arco de radio AA′ desde el vértice con otro de radio igual al lado desde A′.",
      explanation: "Cada vértice se traslada igual que A: BB′ y CC′ son iguales y paralelos a AA′, y el triángulo A′B′C′ es igual que ABC.",
    }),
  ],
};
