import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const circunferenciasTangentesIIIDt1Lesson: InteractiveLesson = {
  slug: "circunferencias-tangentes-iii-dt1",
  title: "5. Circunferencias tangentes III",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("circ-otra-por-punto-radio", "circ-otra-recta-radio", "circ-otra-recta-t"),
  ],
};
