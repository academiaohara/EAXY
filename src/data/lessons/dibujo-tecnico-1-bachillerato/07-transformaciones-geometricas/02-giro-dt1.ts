import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide } from "@/data/lessons/tec1-helpers";

export const giroDt1Lesson: InteractiveLesson = {
  slug: "giro-dt1",
  title: "2. Giro o rotación",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("giro", "El giro", [
      { kind: "definition", text: "El **giro** de centro $O$ lleva cada punto $B$ a otro $B'$ con $OB = OB'$ y $\\widehat{BOB'}$ igual (orientado) a $\\widehat{AOA'}$, la **amplitud** del giro." },
      { kind: "facts", items: [
        { tex: "\\widehat{AOA'} = \\widehat{BOB'}", label: "Mismo ángulo y sentido en todos los puntos" },
        { tex: "AOB \\equiv A'OB'", label: "Triángulos directamente iguales" },
      ] },
    ], anim("dt1-giro"), "visual-top"),
    slide("giro-propiedades", "Qué ocurre con las figuras", [
      { kind: "relations", items: [
        { left: "Una recta", relation: "gira hasta", right: "otra recta (se gira el pie de la perpendicular por O)" },
        { left: "Una circunferencia", relation: "gira hasta", right: "otra igual, con el centro girado" },
        { left: "Dos giros del mismo centro", relation: "dan", right: "otro giro de ese centro" },
        { left: "El centro O", relation: "es", right: "el único punto doble" },
      ] },
      { kind: "rule", title: "Para girar una recta", text: "Se traza la perpendicular a $r$ por $O$, se gira su pie $A$ hasta $A'$ y se traza $r'$ **perpendicular a $OA'$ por $A'$**. El ángulo recto en $A$ se conserva." },
    ]),
    ...construccionPasos("giro-segmento", "giro-recta"),
  ],
};
