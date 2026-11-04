import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const distanciasFigurasPlanasCaballeraIIDt1Lesson: InteractiveLesson = {
  slug: "distancias-figuras-planas-caballera-ii-dt1",
  title: "4. Distancia entre puntos y figuras planas II",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("figuras", "Perspectiva de figuras planas en planos del sistema", [], diagrama("d15-figuras"), "visual-top"),
    ...construccionPasos("cab-triangulo-xoy", "cab-seis-lados-xoy", "cab-cinco-lados-xoy"),
    slide("curvas", "Perspectiva de una curva situada en un plano", [], diagrama("d15-curvas"), "visual-top"),
    ...construccionPasos("cab-curva-xoy"),
  ],
};
