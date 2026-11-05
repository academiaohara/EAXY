import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const fundamentosProyeccionesDiedricoDt1Lesson: InteractiveLesson = {
  slug: "fundamentos-proyecciones-diedrico-dt1",
  title: "1. Geometría descriptiva y sistemas de representación I",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("descriptiva", "La geometría descriptiva", [], diagrama("d11-descriptiva"), "visual-top"),
    slide("proyecciones", "Sistemas de proyección", [], diagrama("d11-proyecciones"), "visual-top"),
    ...construccionPasos("proyeccion-ortogonal", "proyeccion-oblicua", "proyeccion-conica"),
  ],
};
