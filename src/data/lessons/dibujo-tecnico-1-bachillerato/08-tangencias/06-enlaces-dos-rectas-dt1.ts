import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const enlacesDosRectasDt1Lesson: InteractiveLesson = {
  slug: "enlaces-dos-rectas-dt1",
  title: "6. Enlace de líneas I",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("enlace", "Enlace de líneas", [], diagrama("d8-enlace"), "visual-top"),
    ...construccionPasos("enlace-rectas-90", "enlace-dos-rectas-radio", "enlace-dos-rectas-punto"),
  ],
};
