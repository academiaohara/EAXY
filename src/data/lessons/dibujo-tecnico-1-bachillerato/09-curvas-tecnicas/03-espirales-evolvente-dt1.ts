import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const espiralesEvolventeDt1Lesson: InteractiveLesson = {
  slug: "espirales-evolvente-dt1",
  title: "3. La voluta",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("voluta", "La voluta", [], diagrama("d9-voluta"), "visual-top"),
    ...construccionPasos("voluta"),
  ],
};
