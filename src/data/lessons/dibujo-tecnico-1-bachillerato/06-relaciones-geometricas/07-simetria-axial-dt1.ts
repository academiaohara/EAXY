import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const simetriaAxialDt1Lesson: InteractiveLesson = {
  slug: "simetria-axial-dt1",
  title: "7. Simetría axial",
  subtitle: DT1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("simetria-axial-punto", "simetria-axial-segmento", "simetria-axial-figura"),
  ],
};
