import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const pentagonoHexagonoLadoDt1Lesson: InteractiveLesson = {
  slug: "pentagono-hexagono-lado-dt1",
  title: "10. Pentágono y hexágono regulares dado el lado",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("pentagono-lado", "hexagono-lado")],
};
