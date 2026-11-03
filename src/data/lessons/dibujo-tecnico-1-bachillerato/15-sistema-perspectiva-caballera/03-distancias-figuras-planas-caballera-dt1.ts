import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const distanciasFigurasPlanasCaballeraDt1Lesson: InteractiveLesson = {
  slug: "distancias-figuras-planas-caballera-dt1",
  title: "3. Distancia entre puntos y figuras planas",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("distancia-1", "Distancia entre dos puntos: primer caso", [], diagrama("d15-distancia-1"), "visual-top"),
    ...construccionPasos("cab-distancia-y"),
    slide("distancia-2", "Distancia entre dos puntos: segundo y tercer caso", [], diagrama("d15-distancia-2"), "visual-top"),
    ...construccionPasos("cab-distancia-xoy", "cab-abatimiento-xoy", "cab-distancia-oblicua"),
    slide("figuras", "Perspectiva de figuras planas en planos del sistema", [], diagrama("d15-figuras"), "visual-top"),
    ...construccionPasos("cab-triangulo-xoy", "cab-seis-lados-xoy", "cab-cinco-lados-xoy"),
    slide("curvas", "Perspectiva de una curva situada en un plano", [], diagrama("d15-curvas"), "visual-top"),
    ...construccionPasos("cab-curva-xoy"),
  ],
};
