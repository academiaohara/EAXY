import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const simetriaCentralDt1Lesson: InteractiveLesson = {
  slug: "simetria-central-dt1",
  title: "6. Simetría central",
  subtitle: DT1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("simetria-punto", "simetria-segmento", "simetria-figura"),
  ],
};
