import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const perspectivaCaballeraDt1Lesson: InteractiveLesson = {
  slug: "perspectiva-caballera-dt1",
  title: "1. Fundamentos, notaciones y datos del sistema",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("fundamentos", "El sistema de perspectiva caballera", [], diagrama("d15-fundamentos"), "visual-top"),
    slide("punto", "Las cuatro proyecciones de un punto", [], diagrama("d15-punto"), "visual-top"),
    slide("notaciones", "Notaciones", [], diagrama("d15-notaciones"), "visual-top"),
    slide("datos", "Datos del sistema: los ángulos φ y σ", [], diagrama("d15-datos"), "visual-top"),
    ...construccionPasos("cab-ejes"),
  ],
};
