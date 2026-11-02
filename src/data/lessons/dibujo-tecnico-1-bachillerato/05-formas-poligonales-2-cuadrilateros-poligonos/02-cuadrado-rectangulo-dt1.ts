import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const cuadradoRectanguloDt1Lesson: InteractiveLesson = {
  slug: "cuadrado-rectangulo-dt1",
  title: "2. Construcción del cuadrado y del rectángulo",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("cuadrado-lado", "cuadrado-diagonal", "rectangulo-lados", "rectangulo-diagonal")],
};
