import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide, diagrama } from "@/data/lessons/tec1-helpers";

export const traslacionDt1Lesson: InteractiveLesson = {
  slug: "traslacion-dt1",
  title: "1. Traslación",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("transformaciones", "Transformaciones del plano", [], anim("dt1-transformaciones-tipos"), "visual-top"),
    slide("traslacion", "La traslación", [], anim("dt1-traslacion"), "visual-top"),
    slide("traslacion-propiedades", "Qué ocurre con las figuras", [], diagrama("d7-trasl-prop"), "visual-top"),
    ...construccionPasos("traslacion-figura"),
  ],
};
