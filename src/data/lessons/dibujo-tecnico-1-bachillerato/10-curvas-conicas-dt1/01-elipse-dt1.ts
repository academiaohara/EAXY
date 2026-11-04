import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const elipseDt1Lesson: InteractiveLesson = {
  slug: "elipse-dt1",
  title: "1. La elipse",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("conicas", "Las curvas cónicas", [], diagrama("d10-conicas"), "visual-top"),
    slide("elipse", "La elipse: definición y elementos", [], diagrama("d10-elipse"), "visual-top"),
    ...construccionPasos("elipse-puntos", "elipse-haces", "elipse-envolventes", "elipse-circunferencias"),
  ],
};
