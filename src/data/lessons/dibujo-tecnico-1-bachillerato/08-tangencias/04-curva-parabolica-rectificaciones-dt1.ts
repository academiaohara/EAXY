import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const curvaParabolicaRectificacionesDt1Lesson: InteractiveLesson = {
  slug: "curva-parabolica-rectificaciones-dt1",
  title: "4. Curva parabólica y rectificaciones",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("rectificar", "Rectificar una curva", [], diagrama("d8-rectificar"), "visual-top"),
    ...construccionPasos("parabola", "rectificar-curva", "rectificar-circunferencia", "rectificar-semicircunferencia"),
  ],
};
