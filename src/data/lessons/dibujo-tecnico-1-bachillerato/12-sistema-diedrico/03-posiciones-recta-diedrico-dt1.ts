import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const posicionesRectaDiedricoDt1Lesson: InteractiveLesson = {
  slug: "posiciones-recta-diedrico-dt1",
  title: "3. Posiciones particulares de la recta",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("perpendiculares", "Rectas perpendiculares a los planos de proyección", [], diagrama("d12-perpendiculares"), "visual-top"),
    ...construccionPasos("recta-vertical"),
    slide("paralela-lt", "Recta paralela a la línea de tierra", [], diagrama("d12-paralela-lt"), "visual-top"),
    ...construccionPasos("recta-paralela-lt"),
    slide("horizontal", "Recta paralela al plano horizontal", [], diagrama("d12-horizontal"), "visual-top"),
    ...construccionPasos("recta-horizontal"),
    slide("frontal", "Recta paralela al plano vertical (frontal)", [], diagrama("d12-frontal"), "visual-top"),
    ...construccionPasos("recta-frontal"),
    slide("oblicuas", "Rectas oblicuas que cortan a la L.T.", [], diagrama("d12-oblicuas"), "visual-top"),
    slide("perfil", "Rectas de perfil", [], diagrama("d12-perfil"), "visual-top"),
  ],
};
