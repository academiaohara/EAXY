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
    slide("posiciones", "Posiciones relativas y tangencia", [], diagrama("d8-posiciones"), "visual-top"),
    ...construccionPasos("tangente-punto", "tangentes-paralelas", "tangente-sin-centro", "tangentes-punto-exterior", "tangente-comun-exterior", "tangente-comun-interior"),
  ],
};
