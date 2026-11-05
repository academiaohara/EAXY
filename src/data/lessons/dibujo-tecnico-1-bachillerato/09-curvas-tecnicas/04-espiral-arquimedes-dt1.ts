import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const espiralArquimedesDt1Lesson: InteractiveLesson = {
  slug: "espiral-arquimedes-dt1",
  title: "4. La espiral de Arquímedes",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("espiral", "La espiral de Arquímedes", [], diagrama("d9-espiral"), "visual-top"),
    ...construccionPasos("espiral-arquimedes"),
  ],
};
