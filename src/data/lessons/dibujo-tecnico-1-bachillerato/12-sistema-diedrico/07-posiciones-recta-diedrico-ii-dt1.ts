import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const posicionesRectaDiedricoIIDt1Lesson: InteractiveLesson = {
  slug: "posiciones-recta-diedrico-ii-dt1",
  title: "7. Posiciones particulares de la recta II",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("frontal", "Recta paralela al plano vertical (frontal)", [], diagrama("d12-frontal"), "visual-top"),
    ...construccionPasos("recta-frontal"),
    slide("oblicuas", "Rectas oblicuas que cortan a la L.T.", [], diagrama("d12-oblicuas"), "visual-top"),
    slide("perfil", "Rectas de perfil", [], diagrama("d12-perfil"), "visual-top"),
  ],
};
