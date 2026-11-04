import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const planosEspecialesDiedricoDt1Lesson: InteractiveLesson = {
  slug: "planos-especiales-diedrico-dt1",
  title: "13. Planos perpendiculares a los bisectores y paralelos a la L.T.",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("bisectores", "Planos perpendiculares a los bisectores", [], diagrama("d12-bisectores"), "visual-top"),
    ...construccionPasos("plano-perp-bisector"),
    slide("paralelos-lt", "Planos paralelos a la línea de tierra", [], diagrama("d12-paralelos-lt"), "visual-top"),
    ...construccionPasos("plano-paralelo-lt"),
  ],
};
