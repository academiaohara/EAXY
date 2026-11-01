import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const sumaDiferenciaSegmentosDt1Lesson: InteractiveLesson = {
  slug: "suma-diferencia-segmentos-dt1",
  title: "4. Suma y diferencia de segmentos",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("suma", "Suma de segmentos", [], bench("suma-segmentos-compas", [
      { title: "Tres segmentos", text: "Para sumar los segmentos $a = AB$, $b = CD$ y $c = EF$ se colocan **sobre una recta, uno a continuación de otro**. El segmento resultante $NM$ es la suma.", fact: "NM = a + b + c" },
      { title: "Primero a", text: "Con el compás toma $a$ y, con la punta en $N$, marca el primer punto sobre la recta.", fact: "Abertura = a" },
      { title: "Después b", text: "Toma $b$ y, con la punta en el punto anterior, marca el siguiente.", fact: "Abertura = b" },
      { title: "Por último c", text: "Toma $c$ y, desde el último punto, marca $M$.", fact: "Abertura = c" },
      { title: "El resultado", text: "El segmento $NM$ vale $a + b + c$: los tres segmentos están colocados seguidos sobre la recta.", fact: "NM = a + b + c" },
    ]), "stack"),

    benchTask("suma-segmentos", "Suma tres segmentos", "suma-segmentos-practica", [
      { title: "Toma a", text: "Toca los dos extremos del segmento $a$.", fact: "Abertura = a" },
      { title: "Clava la punta en N", text: "Toca el punto $N$ de la recta." },
      { title: "Arco", text: "Arrastra la mina para trazar un arco que **corte a la recta**." },
      { title: "Marca el corte", text: "Toca el punto donde el arco corta a la recta." },
      { title: "Toma b", text: "Toca los dos extremos del segmento $b$.", fact: "Abertura = b" },
      { title: "Clava la punta", text: "Toca el punto que acabas de marcar." },
      { title: "Arco", text: "Traza el arco que corta a la recta a continuación." },
      { title: "Marca el corte", text: "Toca el nuevo punto de la recta." },
      { title: "Toma c", text: "Toca los dos extremos del segmento $c$.", fact: "Abertura = c" },
      { title: "Clava la punta", text: "Toca el último punto marcado." },
      { title: "Arco", text: "Traza el último arco sobre la recta." },
      { title: "Marca M", text: "Toca el corte: es el punto $M$." },
      { title: "El resultado", text: "La regla marca sola el segmento $NM$.", fact: "NM = a + b + c" },
    ], {
      question: "Suma los segmentos a, b y c colocándolos seguidos sobre la recta a partir de N.",
      hint: "Toma cada segmento con el compás y llévalo a continuación del anterior, usando como centro el último punto marcado.",
      explanation: "Cada arco corta a la recta a la distancia del segmento que se transporta, medida desde el punto anterior. Al ponerlos seguidos, NM = a + b + c.",
    }),

    slide("diferencia", "Diferencia de segmentos", [], bench("diferencia-segmentos-compas", [
      { title: "Dos segmentos", text: "Sean los segmentos $m = AB$ y $n = CD$, con $m > n$. Se busca $m - n$.", fact: "m > n" },
      { title: "Se coloca m", text: "Se coloca el segmento $m$ sobre una recta: $AB$.", fact: "AB = m" },
      { title: "Se lleva n desde A", text: "Con el compás se toma $n$ y, **a partir del origen $A$**, se marca sobre $AB$ el punto $E$.", fact: "AE = n" },
      { title: "El resultado", text: "El segmento $EB$ es la **diferencia**: $EB = m - n$.", fact: "EB = m − n" },
    ]), "stack"),

    benchTask("diferencia-segmentos", "Resta dos segmentos", "diferencia-segmentos-practica", [
      { title: "Toma n", text: "Toca los dos extremos del segmento $n$: es el que se resta.", fact: "Abertura = n" },
      { title: "Clava la punta en A", text: "Toca el origen $A$ del segmento $m$." },
      { title: "Traza el arco", text: "Arrastra la mina para que el arco **corte al segmento $AB$**." },
      { title: "Marca E", text: "Toca el corte del arco con $AB$: es el punto $E$." },
      { title: "La diferencia", text: "La regla marca sola el segmento $EB$.", fact: "EB = m − n" },
    ], {
      question: "Halla la diferencia m − n de los dos segmentos dados.",
      hint: "Lleva n sobre m desde el origen A: lo que queda hasta B es la diferencia.",
      explanation: "El arco con centro en A y radio n corta a AB en E, con AE = n. Entonces EB = AB − AE = m − n.",
    }),
  ],
};
