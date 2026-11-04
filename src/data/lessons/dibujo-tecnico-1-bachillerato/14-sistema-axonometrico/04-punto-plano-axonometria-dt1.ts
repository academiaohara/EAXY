import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const puntoPlanoAxonometriaDt1Lesson: InteractiveLesson = {
  slug: "punto-plano-axonometria-dt1",
  title: "4. Punto, recta y plano en axonometría",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("punto", "Representación del punto", [], diagrama("d14-punto"), "visual-top"),
    slide("recta", "Proyecciones de una recta. Trazas", [], diagrama("d14-recta"), "visual-top"),
    ...construccionPasos("axo-trazas-recta", "axo-recta-paralela-plano"),
    slide("rectas-particulares", "Rectas paralelas a planos y a ejes", [], diagrama("d14-rectas-particulares"), "visual-top"),
    ...construccionPasos("axo-rectas-paralelas-ejes"),
    slide("plano", "Representación del plano", [], diagrama("d14-plano"), "visual-top"),
    ...construccionPasos("axo-trazas-plano"),
    slide("planos-particulares", "Planos paralelos a ejes y a planos coordenados", [], diagrama("d14-planos-particulares"), "visual-top"),
    ...construccionPasos("axo-plano-paralelo-eje", "axo-plano-paralelo-coordenado"),
    slide("intersecciones", "Trazas por tres puntos, posiciones relativas e intersecciones", [], diagrama("d14-intersecciones"), "visual-top"),
    ...construccionPasos("axo-interseccion-planos", "axo-recta-plano"),
  ],
};
