import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const ovaloOvoideDt1Lesson: InteractiveLesson = {
  slug: "ovalo-ovoide-dt1",
  title: "1. Óvalo y ovoide",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("ovalo", "Óvalo y ovoide", [], diagrama("d9-ovalo"), "visual-top"),
    ...construccionPasos("ovalo-eje-mayor", "ovalo-eje-menor", "ovalo-cuatro-centros", "ovoide-eje-mayor", "ovoide-eje-menor"),
  ],
};
