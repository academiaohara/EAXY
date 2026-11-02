import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const divisionNDt1Lesson: InteractiveLesson = {
  slug: "division-n-dt1",
  title: "9. División de la circunferencia en n partes",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("division-n")],
};
