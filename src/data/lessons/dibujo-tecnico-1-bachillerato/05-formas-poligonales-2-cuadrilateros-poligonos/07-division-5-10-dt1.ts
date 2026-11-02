import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const division510Dt1Lesson: InteractiveLesson = {
  slug: "division-5-10-dt1",
  title: "7. División de la circunferencia en 5 y 10 partes",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("division-5", "division-10")],
};
