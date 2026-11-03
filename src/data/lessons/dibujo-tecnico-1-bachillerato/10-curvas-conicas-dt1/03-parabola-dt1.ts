import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const parabolaDt1Lesson: InteractiveLesson = {
  slug: "parabola-dt1",
  title: "3. La parábola",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("parabola", "La parábola: definición y elementos", [], diagrama("d10-parabola"), "visual-top"),
    ...construccionPasos("parabola-puntos", "parabola-vertice-punto", "parabola-envolventes"),
  ],
};
