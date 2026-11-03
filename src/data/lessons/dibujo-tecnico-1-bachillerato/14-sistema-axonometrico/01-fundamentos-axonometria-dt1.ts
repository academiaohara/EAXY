import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const fundamentosAxonometriaDt1Lesson: InteractiveLesson = {
  slug: "fundamentos-axonometria-dt1",
  title: "1. Fundamentos del sistema axonométrico",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("triedro", "El triedro trirrectángulo", [], diagrama("d14-triedro"), "visual-top"),
    slide("cuadro", "El plano del cuadro", [], diagrama("d14-cuadro"), "visual-top"),
    slide("reversible", "Reversibilidad", [], diagrama("d14-reversible"), "visual-top"),
    ...construccionPasos("axo-proyecciones-punto"),
    slide("triangulo", "El triángulo fundamental", [], diagrama("d14-triangulo"), "visual-top"),
    slide("notacion", "Notaciones", [], diagrama("d14-notacion"), "visual-top"),
  ],
};
