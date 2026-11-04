import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide, diagrama } from "@/data/lessons/tec1-helpers";

export const homoteciaDt1Lesson: InteractiveLesson = {
  slug: "homotecia-dt1",
  title: "3. Homotecia",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("homotecia", "La homotecia", [], anim("dt1-homotecia"), "visual-top"),
    slide("homotecia-casos", "Casos y propiedades", [], diagrama("d7-homo-casos"), "visual-top"),
    slide("homotecia-centros", "Dos segmentos y dos circunferencias", [], anim("dt1-homotecia-centros"), "visual-top"),
    ...construccionPasos("homotecia-directa", "homotecia-inversa", "homotecia-centros-segmentos", "homotecia-centros-circunferencias"),
  ],
};
