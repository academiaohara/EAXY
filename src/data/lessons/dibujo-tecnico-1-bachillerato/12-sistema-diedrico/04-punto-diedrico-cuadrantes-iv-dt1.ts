import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const puntoDiedricoCuadrantesIVDt1Lesson: InteractiveLesson = {
  slug: "punto-diedrico-cuadrantes-iv-dt1",
  title: "4. Fundamentos, notación y representación del punto IV",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("punto-plano-horizontal", "punto-plano-vertical", "punto-primer-bisector", "punto-segundo-bisector"),
  ],
};
