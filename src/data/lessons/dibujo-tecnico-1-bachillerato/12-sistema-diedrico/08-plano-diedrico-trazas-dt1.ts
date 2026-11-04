import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const planoDiedricoTrazasDt1Lesson: InteractiveLesson = {
  slug: "plano-diedrico-trazas-dt1",
  title: "8. Representación del plano. Trazas y tipos",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("trazas", "Trazas de un plano", [], diagrama("d12-plano-trazas"), "visual-top"),
    slide("definir", "Formas de definir un plano", [], diagrama("d12-definir"), "visual-top"),
    ...construccionPasos("plano-dos-rectas"),
    slide("proyectantes", "Planos proyectantes", [], diagrama("d12-proyectantes"), "visual-top"),
    ...construccionPasos("plano-proyectante-horizontal", "plano-proyectante-vertical"),
    slide("paralelos", "Planos paralelos a los de proyección y de perfil", [], diagrama("d12-planos-paralelos"), "visual-top"),
  ],
};
