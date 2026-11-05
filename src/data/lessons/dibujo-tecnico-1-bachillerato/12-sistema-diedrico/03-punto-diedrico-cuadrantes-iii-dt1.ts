import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const puntoDiedricoCuadrantesIIIDt1Lesson: InteractiveLesson = {
  slug: "punto-diedrico-cuadrantes-iii-dt1",
  title: "3. Fundamentos, notación y representación del punto III",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("puntos-especiales", "Puntos en los planos de proyección y en los bisectores", [], diagrama("d12-especiales"), "visual-top"),
    ...construccionPasos("punto-primer-octante", "punto-segundo-octante", "punto-tercer-octante", "punto-cuarto-octante"),
  ],
};
