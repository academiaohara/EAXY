import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const coeficienteReduccionPuntoCaballeraDt1Lesson: InteractiveLesson = {
  slug: "coeficiente-reduccion-punto-caballera-dt1",
  title: "2. Coeficiente de reducción y representación del punto",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("coeficiente", "Coeficiente de reducción", [], diagrama("d15-coeficiente"), "visual-top"),
    ...construccionPasos("cab-reduccion"),
    slide("punto-caballera", "Representación del punto", [], diagrama("d15-punto-cab"), "visual-top"),
    ...construccionPasos("cab-punto"),
    slide("paso-diedrico", "Paso del sistema diédrico a la perspectiva caballera", [], diagrama("d15-paso-diedrico"), "visual-top"),
  ],
};
