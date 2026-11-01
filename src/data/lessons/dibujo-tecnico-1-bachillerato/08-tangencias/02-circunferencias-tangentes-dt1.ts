import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const circunferenciasTangentesDt1Lesson: InteractiveLesson = {
  slug: "circunferencias-tangentes-dt1",
  title: "2. Circunferencias tangentes y tangentes comunes",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Posiciones relativas", [], bench("circunferencias-posiciones", [
      { title: "Exteriores", text: "Dos circunferencias de radios $R$ y $r$ con centros a distancia $d$ son **exteriores** si $d > R + r$. Tienen **4 tangentes comunes**: 2 **exteriores** y 2 **interiores** (que se cruzan entre ellas).", fact: "d > R + r" },
      { title: "Tangentes exteriormente", text: "Si $d = R + r$ se tocan en un punto $T$, que está **siempre sobre la recta que une los centros**. Quedan 3 tangentes comunes.", fact: "d = R + r" },
      { title: "Secantes", text: "Si $R - r < d < R + r$ se cortan en dos puntos: solo hay 2 tangentes comunes, las exteriores.", fact: "R − r < d < R + r" },
      { title: "Tangentes interiormente", text: "Si $d = R - r$ una está dentro de la otra y se tocan en $T$, también sobre la recta de los centros. Solo hay 1 tangente común.", fact: "d = R − r" },
      { title: "Interiores", text: "Si $d < R - r$ una circunferencia queda dentro de la otra sin tocarla: no hay tangentes comunes.", fact: "d < R − r" },
    ]), "stack"),

    slide("construir", "Tangentes comunes", [
      { kind: "steps", items: [
        "Las tangentes comunes exteriores miden $\\sqrt{d^2 - (R-r)^2}$ entre los puntos de tangencia; las interiores, $\\sqrt{d^2 - (R+r)^2}$.",
        "**Exteriores**: se traza la **circunferencia auxiliar** de radio $R - r$ con el mismo centro que la mayor, se trazan las tangentes desde el centro de la menor a esa circunferencia y se **desplazan** una distancia $r$.",
        "**Interiores**: igual, con circunferencia auxiliar de radio $R + r$.",
        "Los puntos de tangencia se hallan prolongando los **radios** (perpendiculares a las tangentes). Se usan en el dibujo de **correas y cadenas** entre dos poleas.",
      ] },
    ], undefined, "stack"),

    benchTask("circ-tangente-construye", "Circunferencia tangente en un punto", "circ-tangente-practica", [
      { title: "Recta de los centros", text: "El centro de una circunferencia tangente en $T$ está **en la recta $OT$**. Toca $O$ y $T$ para trazarla con la regla.", fact: "Centros y T alineados" },
      { title: "Toma el radio r", text: "Toca los dos extremos del segmento $r$: el compás queda con esa abertura.", fact: "Abertura = r" },
      { title: "Clava la punta en T", text: "Toca el punto de tangencia $T$." },
      { title: "Corta la recta", text: "Arrastra la mina para trazar un arco que **corte a la recta $OT$ fuera de la circunferencia**." },
      { title: "Marca el centro C", text: "Toca el punto donde el arco corta a la recta: es el centro $C$ de la nueva circunferencia." },
      { title: "Clava la punta en C", text: "Toca $C$, sin cambiar la abertura." },
      { title: "Traza la circunferencia", text: "Arrastra la mina para trazar el arco que **pasa por $T$**: las dos circunferencias son tangentes exteriores.", fact: "d = R + r" },
    ], {
      question: "Traza una circunferencia de radio r tangente exterior a la dada en el punto T.",
      hint: "Su centro está en la recta OT, a distancia r de T: traza la recta y corta con un arco de radio r desde T.",
      explanation: "En el punto de tangencia los dos radios son perpendiculares a la tangente común, así que están alineados: el centro está en la recta OT, a r de T, y la distancia entre centros es R + r.",
    }),
  ],
};
