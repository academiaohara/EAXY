import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const heliceCilindricaDt1Lesson: InteractiveLesson = {
  slug: "helice-cilindrica-dt1",
  title: "5. La hélice cilíndrica",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("helice", "La hélice cilíndrica", [], diagrama("d9-helice"), "visual-top"),
    ...construccionPasos("helice"),
  ],
};
