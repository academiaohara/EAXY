import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const division79Dt1Lesson: InteractiveLesson = {
  slug: "division-7-9-dt1",
  title: "8. División de la circunferencia en 7 y 9 partes",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("division-7", "division-9")],
};
