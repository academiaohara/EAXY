import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const hiperbolaDt1Lesson: InteractiveLesson = {
  slug: "hiperbola-dt1",
  title: "2. La hipérbola",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("hiperbola", "La hipérbola: definición y elementos", [], diagrama("d10-hiperbola"), "visual-top"),
    ...construccionPasos("hiperbola-puntos", "hiperbola-envolventes"),
  ],
};
