import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const rectasPerfilTerceraProyeccionDt1Lesson: InteractiveLesson = {
  slug: "rectas-perfil-tercera-proyeccion-dt1",
  title: "11. Rectas de perfil y tercera proyección I",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("perfil", "Rectas de perfil", [], diagrama("d12-perfil"), "visual-top"),
    ...construccionPasos("perfil-por-trazas"),
    slide("tercera", "Tercera proyección de una recta de perfil", [], diagrama("d12-tercera"), "visual-top"),
    ...construccionPasos("tercera-proyeccion"),
  ],
};
