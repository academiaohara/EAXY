import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const circunferenciaPiezasCaballeraIIDt1Lesson: InteractiveLesson = {
  slug: "circunferencia-piezas-caballera-ii-dt1",
  title: "6. Perspectiva de la circunferencia y de piezas II",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("ovalo", "Óvalo en lugar de elipse", [], diagrama("d15-ovalo"), "visual-top"),
    ...construccionPasos("cab-ovalo-xoy"),
    slide("pieza", "Perspectiva de una pieza", [], diagrama("d15-pieza"), "visual-top"),
    ...construccionPasos("cab-pieza"),
  ],
};
