import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const puntoPlanoAxonometriaIIIDt1Lesson: InteractiveLesson = {
  slug: "punto-plano-axonometria-iii-dt1",
  title: "6. Punto, recta y plano en axonometría III",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("tres-puntos", "Trazas de un plano dado por tres puntos", [], diagrama("d14-tres-puntos"), "visual-top"),
    slide("intersecciones", "Intersección de dos planos", [], diagrama("d14-intersecciones"), "visual-top"),
    ...construccionPasos("axo-interseccion-planos"),
    slide("recta-plano", "Intersección de una recta con un plano", [], diagrama("d14-recta-plano"), "visual-top"),
    ...construccionPasos("axo-recta-plano"),
  ],
};
