import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const romboRomboideDt1Lesson: InteractiveLesson = {
  slug: "rombo-romboide-dt1",
  title: "3. Construcción del rombo y del romboide",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("rombo-diagonales", "rombo-angulo", "romboide-lados")],
};
