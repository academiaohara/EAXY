import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

const vertice = (n: number) => `V${n}`;

export const construccionPoligonosRegularesDt1Lesson: InteractiveLesson = {
  slug: "construccion-poligonos-regulares-dt1",
  title: "5. Construcción de polígonos regulares inscritos",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Construcciones exactas y método general", [
      { kind: "steps", items: [
        "Con regla y compás hay construcciones **exactas** para $n = 3, 4, 5, 6, 8, 10, 12$ y sus dobles. Para **cualquier** $n$ existe el **método general**, que es **aproximado**.",
        "**Triángulo**: se unen vértices alternos del hexágono. **Dodecágono**: se bisecan los arcos del hexágono.",
        "**Cuadrado**: dos diámetros perpendiculares. **Octógono**: se bisecan los arcos del cuadrado.",
        "**Pentágono y decágono**: se construyen con el **lado áureo** (el lado del decágono es $R/\\varphi$).",
        "Los polígonos de **7, 9 y 11 lados** no se pueden construir exactamente con regla y compás.",
      ] },
    ], undefined, "stack"),

    slide("hexagono", "Hexágono regular", [], bench("hexagono-compas", [
      { title: "Circunferencia y radio", text: "El **hexágono regular** se inscribe en una circunferencia de radio $R$. Su lado vale **exactamente el radio**: $l = R$.", fact: "l = R" },
      { title: "Toma el radio", text: "Clava la punta en el centro $O$ y abre el compás hasta un punto $V_1$ de la circunferencia: la abertura es $R$.", fact: "Abertura = R" },
      { title: "Primer arco", text: "Sin cambiar la abertura, clava la punta en $V_1$ y traza un arco: corta a la circunferencia en el vértice siguiente, $V_2$." },
      { title: "Los demás vértices", text: "Repite desde cada nuevo vértice. Tras cinco arcos tienes los seis vértices; un sexto arco desde $V_6$ caería justo en $V_1$: la circunferencia se cierra.", fact: "6 · 60° = 360°" },
      { title: "Une los vértices", text: "Une los vértices consecutivos con la regla. Se forman **seis triángulos equiláteros** de lado $R$. Uniendo vértices alternos sale el **triángulo equilátero**.", fact: "Lado del hexágono = radio" },
    ]), "stack"),

    benchTask("hexagono-construye", "Inscribe un hexágono", "hexagono-practica", [
      { title: "Toma el radio", text: "Toca el centro $O$ y después el punto $V_1$ de la circunferencia: el compás queda con la abertura $R$.", fact: "Abertura = R" },
      ...[1, 2, 3, 4, 5].flatMap((n) => [
        { title: `Clava la punta en ${vertice(n)}`, text: `Toca el vértice ${vertice(n)}, sin cambiar la abertura.` },
        { title: `Arco desde ${vertice(n)}`, text: "Arrastra la mina para trazar un arco que corte a la circunferencia." },
        { title: `Marca ${vertice(n + 1)}`, text: `Toca el punto donde el arco corta a la circunferencia: es el vértice ${vertice(n + 1)}.`, ...(n === 5 ? { fact: "Cierra en V1" } : {}) },
      ]),
      { title: "Une los vértices", text: "Une cada vértice con el siguiente, tocando sus extremos con la regla: seis lados en total.", fact: "6 lados iguales a R" },
    ], {
      question: "Inscribe un hexágono regular en la circunferencia llevando el radio sobre ella con el compás.",
      hint: "No cambies la abertura: es el radio. Cada arco, centrado en un vértice, corta a la circunferencia en el siguiente.",
      explanation: "El lado del hexágono es igual al radio, porque cada lado forma con el centro un triángulo equilátero (ángulo central de 60°). Seis cuerdas de longitud R cierran la circunferencia.",
    }),
  ],
};
