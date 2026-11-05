import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const enlacesDosRectasIIDt1Lesson: InteractiveLesson = {
  slug: "enlaces-dos-rectas-ii-dt1",
  title: "7. Enlace de líneas II",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("enlace-recta-arco", "enlace-arco-t-punto", "enlace-arco-recta-t", "enlace-dos-arcos"),
  ],
};
