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
      { title: "Primero a", text: "El compás toma la medida de $a$ (punta en un extremo, mina en el otro), se lleva a la recta y, con la punta en $N$, se traza un arco que marca el primer punto $P$.", fact: "Abertura = a" },
      { title: "Después b", text: "Se toma $b$ con el compás y, con la punta en el punto anterior, se traza el arco que marca el siguiente punto $Q$.", fact: "Abertura = b" },
      { title: "Por último c", text: "Se toma $c$ con el compás y, desde el último punto, se traza el arco que marca $M$.", fact: "Abertura = c" },
      { title: "El resultado", text: "Con los puntos ya marcados, se traza el segmento $NM$ (en rojo): vale $a + b + c$, porque los tres segmentos están colocados seguidos sobre la recta.", fact: "NM = a + b + c" },
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
      { title: "Se lleva n desde B", text: "El compás toma la medida de $n$ y, con la punta en el extremo $B$, se traza un arco **hacia $A$** que corta a $AB$ en $E$: así $EB = n$.", fact: "EB = n" },
      { title: "El resultado", text: "Lo que queda desde $A$ hasta el corte $E$ (en rojo) es la **diferencia**: $AE = m - n$.", fact: "AE = m − n" },
    ]), "stack"),

    benchTask("diferencia-segmentos", "Resta dos segmentos", "diferencia-segmentos-practica", [
      { title: "Toma n", text: "Toca los dos extremos del segmento $n$: es el que se resta.", fact: "Abertura = n" },
      { title: "Clava la punta en B", text: "Toca el extremo $B$ del segmento $m$." },
      { title: "Traza el arco", text: "Arrastra la mina para que el arco, hacia $A$, **corte al segmento $AB$**." },
      { title: "Marca E", text: "Toca el corte del arco con $AB$: es el punto $E$." },
      { title: "La diferencia", text: "La regla marca sola el segmento $AE$ (en rojo).", fact: "AE = m − n" },
    ], {
      question: "Halla la diferencia m − n de los dos segmentos dados.",
      hint: "Lleva n sobre m desde el extremo B hacia A: lo que queda desde A hasta el corte es la diferencia.",
      explanation: "El arco con centro en B y radio n corta a AB en E, con EB = n. Entonces AE = AB − EB = m − n.",
    }),
  ],
};
