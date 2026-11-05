import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const puntoPlanoAxonometriaIIDt1Lesson: InteractiveLesson = {
  slug: "punto-plano-axonometria-ii-dt1",
  title: "5. Punto, recta y plano en axonometría II",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("plano", "Representación del plano", [], diagrama("d14-plano"), "visual-top"),
    ...construccionPasos("axo-trazas-plano"),
    slide("planos-particulares", "Planos paralelos a ejes y a planos coordenados", [], diagrama("d14-planos-particulares"), "visual-top"),
    ...construccionPasos("axo-plano-paralelo-eje", "axo-plano-paralelo-coordenado"),
  ],
};
