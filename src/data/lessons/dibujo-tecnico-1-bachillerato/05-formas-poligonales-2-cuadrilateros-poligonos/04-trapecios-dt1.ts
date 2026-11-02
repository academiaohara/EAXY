import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const trapeciosDt1Lesson: InteractiveLesson = {
  slug: "trapecios-dt1",
  title: "4. Construcción de trapecios",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("trapecio-isosceles", "trapecio-rectangulo")],
};
