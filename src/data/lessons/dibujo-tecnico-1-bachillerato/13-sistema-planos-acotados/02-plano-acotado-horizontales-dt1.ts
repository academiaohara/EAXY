import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const planoAcotadoHorizontalesDt1Lesson: InteractiveLesson = {
  slug: "plano-acotado-horizontales-dt1",
  title: "2. Representación del plano",
  subtitle: DT1_SUBTITLES[13],
  stage: { theme: "board" },
  steps: [
    slide("lmp", "El plano por su línea de máxima pendiente", [], diagrama("d13-lmp"), "visual-top"),
    ...construccionPasos("acotados-plano-lmp"),
    slide("angulo", "Ángulo del plano con el plano del cuadro", [], diagrama("d13-angulo"), "visual-top"),
    slide("casos", "Planos particulares", [], diagrama("d13-casos"), "visual-top"),
  ],
};
