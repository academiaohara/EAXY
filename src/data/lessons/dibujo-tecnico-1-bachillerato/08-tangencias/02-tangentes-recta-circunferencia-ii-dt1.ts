import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const tangentesRectaCircunferenciaIIDt1Lesson: InteractiveLesson = {
  slug: "tangentes-recta-circunferencia-ii-dt1",
  title: "2. Posiciones relativas y rectas tangentes II",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("tangente-sin-centro", "tangentes-punto-exterior", "tangente-comun-exterior", "tangente-comun-interior"),
  ],
};
