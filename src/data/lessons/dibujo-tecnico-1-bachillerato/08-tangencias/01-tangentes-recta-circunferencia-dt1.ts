import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const tangentesRectaCircunferenciaDt1Lesson: InteractiveLesson = {
  slug: "tangentes-recta-circunferencia-dt1",
  title: "1. Posiciones relativas y rectas tangentes",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("pos-recta", "Posiciones relativas de recta y circunferencia", [], diagrama("d8-pos-recta"), "visual-top"),
    slide("pos-circ", "Posiciones relativas de dos circunferencias", [], diagrama("d8-pos-circ"), "visual-top"),
    slide("consideraciones", "Consideraciones sobre las tangencias", [], diagrama("d8-consideraciones"), "visual-top"),
    ...construccionPasos("tangente-punto", "tangentes-paralelas", "tangente-sin-centro", "tangentes-punto-exterior", "tangente-comun-exterior", "tangente-comun-interior"),
  ],
};
