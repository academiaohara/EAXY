import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const heptagonoOctogonoEneagonoLadoDt1Lesson: InteractiveLesson = {
  slug: "heptagono-octogono-eneagono-lado-dt1",
  title: "11. Heptágono, octógono y eneágono regulares dado el lado",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [...construccionPasos("heptagono-lado", "octogono-lado", "eneagono-lado")],
};
