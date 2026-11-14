import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const puntoDiedricoCuadrantesIIDt1Lesson: InteractiveLesson = {
  slug: "punto-diedrico-cuadrantes-ii-dt1",
  title: "2. Fundamentos, notación y representación del punto II",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("punto-diedros", "El punto en los cuatro diedros", [], diagrama("d12-punto-diedros"), "visual-top"),
    ...construccionPasos("punto-primer-diedro", "punto-segundo-diedro", "punto-tercer-diedro", "punto-cuarto-diedro"),
  ],
};
