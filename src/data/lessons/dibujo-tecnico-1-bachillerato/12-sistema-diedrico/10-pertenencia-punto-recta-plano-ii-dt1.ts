import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const pertenenciaPuntoRectaPlanoIIDt1Lesson: InteractiveLesson = {
  slug: "pertenencia-punto-recta-plano-ii-dt1",
  title: "10. Pertenencia de punto y recta a un plano II",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("frontal", "Recta frontal de un plano", [], diagrama("d12-frontal-plano"), "visual-top"),
    ...construccionPasos("frontal-del-plano"),
    slide("lineas-max", "Líneas de máxima pendiente y de máxima inclinación", [], diagrama("d12-lineas-max"), "visual-top"),
    ...construccionPasos("plano-lmp", "plano-lmi"),
  ],
};
