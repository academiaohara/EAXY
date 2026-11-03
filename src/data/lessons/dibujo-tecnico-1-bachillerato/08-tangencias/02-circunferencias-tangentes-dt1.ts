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
    slide("lugares", "Los centros están en un lugar geométrico", [
      { kind: "definition", text: "En un problema de tangencias hay que hallar el **centro** (y a veces el radio) de la circunferencia solución. El centro es siempre el punto donde se cortan **dos lugares geométricos**: uno por cada condición del enunciado." },
      { kind: "facts", items: [
        { tex: "\\text{Tangente a una recta } r \\text{ con radio } R", label: "Paralela a r a distancia R" },
        { tex: "\\text{Tangente a una recta } r \\text{ en } T", label: "Perpendicular a r por T" },
        { tex: "\\text{Tangente a dos rectas}", label: "Bisectriz de su ángulo" },
        { tex: "\\text{Tangente a otra circunferencia con radio } R", label: "Circunferencia de radio R + r o R − r" },
        { tex: "\\text{Pasa por dos puntos}", label: "Mediatriz de los puntos" },
      ] },
    ], diagrama("d8-lugares"), "visual-top"),
    ...construccionPasos("circ-recta-punto-radio", "circ-recta-punto-pasa", "circ-recta-por-punto-radio", "circ-dos-rectas-radio", "circ-dos-rectas-punto", "circ-tres-rectas", "circ-otra-t-radio", "circ-otra-t-punto", "circ-otra-por-punto-radio", "circ-otra-recta-radio", "circ-otra-recta-t"),
  ],
};
