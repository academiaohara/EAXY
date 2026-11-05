import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const rectasPerfilTerceraProyeccionIIDt1Lesson: InteractiveLesson = {
  slug: "rectas-perfil-tercera-proyeccion-ii-dt1",
  title: "12. Rectas de perfil y tercera proyección II",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("p12", "Problema: punto de una recta de perfil", [], diagrama("d12-p12"), "visual-top"),
    ...construccionPasos("perfil-punto"),
    slide("p13", "Problema: trazas de una recta de perfil", [], diagrama("d12-p13"), "visual-top"),
    ...construccionPasos("perfil-trazas"),
    slide("p14", "Problema: ¿se cortan o se cruzan?", [], diagrama("d12-p14"), "visual-top"),
  ],
};
