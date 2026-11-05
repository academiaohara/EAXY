import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const ovoideDt1Lesson: InteractiveLesson = {
  slug: "ovoide-dt1",
  title: "2. El ovoide",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("ovoide", "El ovoide", [], diagrama("d9-ovoide"), "visual-top"),
    ...construccionPasos("ovoide-eje-mayor", "ovoide-eje-menor"),
  ],
};
