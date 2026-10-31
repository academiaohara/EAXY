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

    ...["B", "C"].map((n, i) =>
      benchTask(`traslacion-${n.toLowerCase()}`, `Traslada ${n}`, "traslacion-practica", [
        { title: "Toma la medida AA′", text: "Toca $A$ para clavar la punta y $A'$ para colocar la mina: el compás queda con la longitud del vector.", fact: "Abertura = AA′" },
        { title: `Clava la punta en ${n}`, text: `Toca el vértice $${n}$.` },
        { title: "Traza el primer arco", text: `Arrastra la mina para trazar un arco **en la dirección del vector**, por donde crees que estará $${n}'$.` },
        { title: `Toma la medida A${n}`, text: `Ahora mide la distancia entre $A$ y $${n}$: toca $A$ y luego $${n}$.`, fact: `Abertura = A${n}` },
        { title: "Clava la punta en A′", text: "Toca el punto $A'$." },
        { title: "Traza el segundo arco", text: "Arrastra la mina para trazar un arco que **corte al anterior**." },
        { title: `Marca ${n}′`, text: `Toca el punto donde se cortan los dos arcos: es $${n}'$. Después pulsa **Comprobar**.${i === 1 ? " Ya tienes $A'$ y $B'$." : ""}` },
      ], {
        question: `Traslada el punto ${n} según el vector AA' usando solo el compás.`,
        hint: `${n}′ es el cuarto vértice del paralelogramo AA′${n}′${n}: sale de cortar un arco de radio AA′ desde ${n} con otro de radio A${n} desde A′.`,
        explanation: `${n}${n}′ debe ser igual y paralelo a AA′; por eso AA′${n}′${n} es un paralelogramo y ${n}′ está a distancia AA′ de ${n} y a distancia A${n} de A′.`,
        params: { b: i + 1 },
      }),
    ),

    benchTask("traslacion-union", "Une A′, B′ y C′", "union-imagen", [
      { title: "Une los puntos", text: "Pasa la regla por **dos puntos** cada vez: primero $A'$ y $B'$, luego $B'$ y $C'$ y por último $C'$ y $A'$. Toca los dos extremos de cada lado. Después pulsa **Comprobar**.", fact: "Tres pasadas de la regla" },
    ], {
      question: "Une con la regla los puntos A', B' y C' para obtener el triángulo trasladado.",
      hint: "Hay tres lados: A′B′, B′C′ y C′A′.",
      explanation: "El triángulo A′B′C′ es igual que ABC: la traslación mueve todos los puntos el mismo vector.",
      params: { a: 0 },
    }),

    benchTask("traslacion-cuadricula", "Traslada el triángulo", "traslacion-cuadricula", [
      { title: "Marca A′", text: "Cada vértice se mueve **igual** que el vector. Toca la intersección de la cuadrícula donde queda $A'$." },
      { title: "Marca B′", text: "Mueve $B$ el mismo número de cuadros, en la misma dirección." },
      { title: "Marca C′ y comprueba", text: "Marca $C'$ y pulsa **Comprobar**: la figura trasladada debe ser igual que la original." },
    ], {
      question: "Marca A', B' y C' al trasladar el triángulo ABC según el vector dado.",
      hint: "Cuenta los cuadros del vector en horizontal y en vertical y aplícalos a cada vértice.",
      explanation: "Una traslación suma el mismo vector a todos los puntos: cada vértice se mueve los mismos cuadros a la derecha y los mismos hacia arriba.",
      params: { a: 9, b: 3 },
    }),
  ],
};
