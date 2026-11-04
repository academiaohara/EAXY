import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const circunferenciasTangentesIIDt1Lesson: InteractiveLesson = {
  slug: "circunferencias-tangentes-ii-dt1",
  title: "4. Circunferencias tangentes II",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("circ-dos-rectas-punto", "circ-tres-rectas", "circ-otra-t-radio", "circ-otra-t-punto"),
  ],
};
