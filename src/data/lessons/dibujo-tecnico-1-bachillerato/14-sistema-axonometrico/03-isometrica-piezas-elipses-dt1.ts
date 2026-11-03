import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const isometricaPiezasElipsesDt1Lesson: InteractiveLesson = {
  slug: "isometrica-piezas-elipses-dt1",
  title: "3. Circunferencia en perspectiva isométrica",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("circunferencia", "La circunferencia se proyecta como elipse", [], diagrama("d14-circunferencia"), "visual-top"),
    slide("puntos", "Puntos auxiliares de la elipse", [], diagrama("d14-puntos"), "visual-top"),
    ...construccionPasos("axo-elipse-puntos"),
    slide("ovalo", "El óvalo de cuatro centros", [], diagrama("d14-ovalo"), "visual-top"),
    ...construccionPasos("axo-ovalo-isometrico"),
    slide("rayados", "Rayados de secciones en perspectiva isométrica", [], diagrama("d14-rayados"), "visual-top"),
    ...construccionPasos("axo-rayado", "axo-pieza"),
  ],
};
