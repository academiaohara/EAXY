import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const pertenenciaPuntoRectaPlanoDt1Lesson: InteractiveLesson = {
  slug: "pertenencia-punto-recta-plano-dt1",
  title: "9. Pertenencia de punto y recta a un plano I",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("recta-plano", "Rectas particulares de un plano", [], diagrama("d12-recta-plano"), "visual-top"),
    ...construccionPasos("recta-en-plano"),
    slide("punto-plano", "Punto contenido en un plano", [], diagrama("d12-punto-plano"), "visual-top"),
    slide("horizontal", "Recta horizontal de un plano", [], diagrama("d12-horizontal-plano"), "visual-top"),
    ...construccionPasos("horizontal-del-plano"),
  ],
};
