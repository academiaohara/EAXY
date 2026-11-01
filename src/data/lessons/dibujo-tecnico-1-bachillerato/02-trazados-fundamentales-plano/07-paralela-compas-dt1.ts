import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const paralelaCompasDt1Lesson: InteractiveLesson = {
  slug: "paralela-compas-dt1",
  title: "7. Rectas paralelas con el compás",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Rectas paralelas", [
      { kind: "steps", items: [
        "Son **rectas coplanarias que no tienen ningún punto común**: es decir, se cortan en el infinito.",
        "Se han trazado ya con escuadra y cartabón; aquí se hace **solo con compás y regla**.",
      ] },
    ], undefined, "stack"),

    slide("construccion", "Paralela a una recta por un punto P", [], bench("paralelo-compas", [
      { title: "Recta y punto", text: "Sean la recta $t$ y el punto $P$. Se quiere trazar por $P$ la **paralela** a $t$.", fact: "p ∥ t por P" },
      { title: "Primer arco", text: "Con centro en $P$ se traza un arco de radio $r$ arbitrario, que corta a la recta $t$ en $N$.", fact: "PN = r" },
      { title: "Segundo arco", text: "Con centro en $N$ y el **mismo radio** se traza el arco $\\overset{\\frown}{PM}$, que corta a $t$ en $M$.", fact: "NM = NP = r" },
      { title: "Toma MP", text: "Se toma con el compás la distancia $MP$.", fact: "Abertura = MP" },
      { title: "El punto R", text: "Con centro en $N$ y radio $MP$ se corta el primer arco en $R$: $NR = MP$.", fact: "NR = MP" },
      { title: "La paralela", text: "La recta $p \\equiv PR$ es la solución: $PRNM$ es un paralelogramo, así que $PR \\parallel t$.", fact: "PR ∥ NM" },
    ]), "stack"),

    benchTask("paralelo-compas", "Traza la paralela con el compás", "paralelo-compas-practica", [
      { title: "Clava la punta en P", text: "Toca el punto $P$." },
      { title: "Abre el compás", text: "Arrastra la mina hasta una abertura **mayor que la distancia de $P$ a la recta** y pulsa «Fijar abertura».", fact: "Radio arbitrario" },
      { title: "Primer arco", text: "Traza un arco que **corte a la recta $t$** y llegue a la altura de $P$, hacia la derecha." },
      { title: "Marca N", text: "Toca el corte del arco con $t$: es el punto $N$." },
      { title: "Clava la punta en N", text: "Toca $N$, sin cambiar la abertura." },
      { title: "Segundo arco", text: "Traza el arco que **pasa por $P$ y corta a $t$** a la izquierda." },
      { title: "Marca M", text: "Toca el corte con $t$: es el punto $M$." },
      { title: "Toma MP", text: "Toca $M$ y después $P$: el compás queda con la distancia $MP$.", fact: "Abertura = MP" },
      { title: "Clava la punta en N", text: "Toca de nuevo $N$." },
      { title: "Corta el primer arco", text: "Traza un arco que **corte al primer arco** por la derecha de $P$." },
      { title: "Marca R", text: "Toca ese corte: es el punto $R$." },
      { title: "La paralela", text: "La regla traza sola la recta $PR$: paralela a $t$ por $P$.", fact: "PR ∥ t" },
    ], {
      question: "Traza por el punto P la paralela a la recta t usando solo compás y regla.",
      hint: "Marca N y M sobre t con arcos del mismo radio, toma la distancia MP y llévala desde N: así encuentras R.",
      explanation: "NR = MP y PN = NM = r (radios iguales): PRNM es un paralelogramo (lados opuestos iguales), luego PR es paralela a NM, es decir, a t.",
    }),
  ],
};
