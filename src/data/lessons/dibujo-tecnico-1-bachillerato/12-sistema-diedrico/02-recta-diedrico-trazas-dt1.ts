import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const rectaDiedricoTrazasDt1Lesson: InteractiveLesson = {
  slug: "recta-diedrico-trazas-dt1",
  title: "2. Representación de la recta. Trazas",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("recta", "Proyecciones de una recta", [], diagrama("d12-recta"), "visual-top"),
    ...construccionPasos("recta-proyecciones"),
    slide("trazas", "Trazas de una recta", [], diagrama("d12-trazas"), "visual-top"),
    ...construccionPasos("recta-trazas"),
    slide("vistas", "Partes vistas y ocultas", [], diagrama("d12-vistas"), "visual-top"),
    slide("cortan", "Rectas que se cortan y punto de una recta", [], diagrama("d12-cortan"), "visual-top"),
    ...construccionPasos("rectas-se-cortan"),
    slide("de-punta", "Rectas perpendiculares a los planos de proyección", [], diagrama("d12-perpendiculares"), "visual-top"),
  ],
};
