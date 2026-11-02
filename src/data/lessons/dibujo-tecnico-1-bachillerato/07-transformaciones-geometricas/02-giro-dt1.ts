import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const giroDt1Lesson: InteractiveLesson = {
  slug: "giro-dt1",
  title: "2. Giro o rotación",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("giro", "Giro o rotación", [
      { kind: "definition", text: "Dado un punto fijo $O$ y dos puntos $A$ y $A'$ con $OA = OA'$, el **giro** o **rotación** de centro $O$ hace corresponder a cada punto $B$ otro $B'$ con $OB = OB'$ y $\\widehat{BOB'}$ igual (orientado y convexo) a $\\widehat{AOA'}$." },
      { kind: "facts", items: [
        { tex: "\\widehat{AOA'} = \\widehat{BOB'}", label: "Amplitud del giro" },
        { tex: "OA = OA'", label: "El centro O es el único punto doble" },
      ] },
      { kind: "text", text: "En un giro hay que conocer el **ángulo** y el **sentido**. Todos los elementos de una figura giran el mismo ángulo y en el mismo sentido, por eso los triángulos $AOB$ y $A'OB'$ son directamente iguales." },
      { kind: "text", text: "La figura girada de una **recta** es otra recta: se traza la perpendicular a $r$ por $O$, se gira su pie $A$ hasta $A'$ y se traza $r'$ perpendicular a $OA'$ por $A'$. La de una **circunferencia** es otra igual, cuyo centro es el girado del centro: basta girar el centro y trazar la misma con el mismo radio." },
    ]),
    ...construccionPasos("giro-segmento", "giro-recta"),
  ],
};
