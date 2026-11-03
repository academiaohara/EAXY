import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const circunferenciasTangentesDt1Lesson: InteractiveLesson = {
  slug: "circunferencias-tangentes-dt1",
  title: "2. Circunferencias tangentes",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("lugares", "Los centros están en un lugar geométrico", [], diagrama("d8-lugares"), "visual-top"),
    ...construccionPasos("circ-recta-punto-radio", "circ-recta-punto-pasa", "circ-recta-por-punto-radio", "circ-dos-rectas-radio", "circ-dos-rectas-punto", "circ-tres-rectas", "circ-otra-t-radio", "circ-otra-t-punto", "circ-otra-por-punto-radio", "circ-otra-recta-radio", "circ-otra-recta-t"),
  ],
};
