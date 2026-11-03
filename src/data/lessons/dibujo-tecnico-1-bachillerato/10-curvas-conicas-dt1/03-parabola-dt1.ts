import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const parabolaDt1Lesson: InteractiveLesson = {
  slug: "parabola-dt1",
  title: "3. La parábola",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("parabola", "La parábola: definición y elementos", [
      { kind: "definition", text: "La **parábola** es una curva plana, abierta y de una rama: el lugar geométrico de los puntos del plano que **equidistan** de un punto fijo $F$, el **foco**, y de una recta fija $d$, la **directriz**." },
      { kind: "facts", items: [
        { tex: "\\overline{PF} = \\overline{PN}", label: "Radios vectores de un punto P" },
        { tex: "\\overline{VA} = \\overline{VF} = \\dfrac{p}{2}", label: "El vértice equidista de la directriz y del foco" },
      ] },
      { kind: "text", text: "Tiene un **vértice** $V$ y un **eje de simetría**, perpendicular a la directriz, que pasa por $V$ y por el foco. La **tangente en el vértice** es paralela a la directriz y hace de circunferencia principal. El **parámetro** $2p$ es la longitud de la cuerda perpendicular al eje por el foco. La directriz es la circunferencia focal, de radio infinito." },
    ]),
    ...construccionPasos("parabola-puntos", "parabola-vertice-punto", "parabola-envolventes"),
  ],
};
