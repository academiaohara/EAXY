import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const axonometriaOrtogonalCoeficientesDt1Lesson: InteractiveLesson = {
  slug: "axonometria-ortogonal-coeficientes-dt1",
  title: "2. Sistema isométrico y escala isométrica",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("isometrico", "Sistema axonométrico isométrico", [], diagrama("d14-isometrico"), "visual-top"),
    slide("escala", "Escala isométrica", [], diagrama("d14-escala"), "visual-top"),
    ...construccionPasos("axo-escala-isometrica"),
    slide("construccion-escala", "Cómo se obtiene la escala sobre los ejes", [], diagrama("d14-escala"), "visual-top"),
    slide("sin-reducir", "Perspectivas sin reducir", [], diagrama("d14-sin-reducir"), "visual-top"),
  ],
};
