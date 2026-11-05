import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const puntoPlanoAxonometriaDt1Lesson: InteractiveLesson = {
  slug: "punto-plano-axonometria-dt1",
  title: "4. Punto, recta y plano en axonometría I",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("punto", "Representación del punto", [], diagrama("d14-punto"), "visual-top"),
    slide("recta", "Proyecciones de una recta. Trazas", [], diagrama("d14-recta"), "visual-top"),
    ...construccionPasos("axo-trazas-recta", "axo-recta-paralela-plano"),
    slide("rectas-particulares", "Rectas paralelas a planos y a ejes", [], diagrama("d14-rectas-particulares"), "visual-top"),
    ...construccionPasos("axo-rectas-paralelas-ejes"),
  ],
};
