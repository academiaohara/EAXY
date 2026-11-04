import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide, diagrama } from "@/data/lessons/tec1-helpers";

export const giroDt1Lesson: InteractiveLesson = {
  slug: "giro-dt1",
  title: "2. Giro o rotación",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("giro", "El giro", [], diagrama("d7-giro"), "visual-top"),
    slide("giro-propiedades", "Qué ocurre con las figuras", [], diagrama("d7-giro-prop"), "visual-top"),
    ...construccionPasos("giro-segmento", "giro-recta"),
  ],
};
