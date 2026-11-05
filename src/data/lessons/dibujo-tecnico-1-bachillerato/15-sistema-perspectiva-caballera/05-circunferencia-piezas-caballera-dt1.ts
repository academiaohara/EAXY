import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const circunferenciaPiezasCaballeraDt1Lesson: InteractiveLesson = {
  slug: "circunferencia-piezas-caballera-dt1",
  title: "5. Perspectiva de la circunferencia y de piezas I",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("circunferencia", "Perspectiva caballera de la circunferencia", [], diagrama("d15-circunferencia"), "visual-top"),
    ...construccionPasos("cab-circunferencia-zox", "cab-circunferencia-xoy", "cab-circunferencia-zoy", "cab-elipse-haces"),
  ],
};
