import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const espiralesEvolventeDt1Lesson: InteractiveLesson = {
  slug: "espirales-evolvente-dt1",
  title: "2. Voluta, espiral y hélice",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("espirales", "Voluta, espiral de Arquímedes y hélice", [], diagrama("d9-espirales"), "visual-top"),
    ...construccionPasos("voluta", "espiral-arquimedes", "helice"),
  ],
};
