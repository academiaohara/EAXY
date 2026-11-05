import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const posicionesRectaDiedricoDt1Lesson: InteractiveLesson = {
  slug: "posiciones-recta-diedrico-dt1",
  title: "6. Posiciones particulares de la recta I",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("perpendiculares", "Rectas perpendiculares a los planos de proyección", [], diagrama("d12-perpendiculares"), "visual-top"),
    ...construccionPasos("recta-vertical"),
    slide("paralela-lt", "Recta paralela a la línea de tierra", [], diagrama("d12-paralela-lt"), "visual-top"),
    ...construccionPasos("recta-paralela-lt"),
    slide("horizontal", "Recta paralela al plano horizontal", [], diagrama("d12-horizontal"), "visual-top"),
    ...construccionPasos("recta-horizontal"),
  ],
};
