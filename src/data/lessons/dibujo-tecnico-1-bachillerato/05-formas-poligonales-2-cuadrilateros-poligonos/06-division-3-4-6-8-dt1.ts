import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const division3468Dt1Lesson: InteractiveLesson = {
  slug: "division-3-4-6-8-dt1",
  title: "6. División de la circunferencia en 3, 6, 4 y 8 partes",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("division-6-3", "division-4-8")],
};
