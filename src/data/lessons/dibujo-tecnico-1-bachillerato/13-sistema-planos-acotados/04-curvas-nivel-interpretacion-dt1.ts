import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const curvasNivelInterpretacionDt1Lesson: InteractiveLesson = {
  slug: "curvas-nivel-interpretacion-dt1",
  title: "4. Superficies topográficas, perfiles y dibujo topográfico",
  subtitle: DT1_SUBTITLES[13],
  stage: { theme: "board" },
  steps: [
    slide("topografica", "Superficies topográficas", [], diagrama("d13-curvas-nivel-teoria"), "visual-top"),
    slide("perfiles", "Perfiles", [], diagrama("d13-perfiles"), "visual-top"),
    ...construccionPasos("acotados-perfil"),
    slide("desmonte", "Desmonte y terraplén de un camino", [], diagrama("d13-desmonte"), "visual-top"),
    ...construccionPasos("acotados-perfil-camino"),
    ...construccionPasos("acotados-explanacion"),
    slide("explanacion", "Explanación de una superficie topográfica", [], diagrama("d13-explanacion"), "visual-top"),
    slide("dibujo-topografico", "Dibujo topográfico", [], diagrama("d13-simbolos"), "visual-top"),
  ],
};
