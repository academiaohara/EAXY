import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const planosAcotadosRectaDt1Lesson: InteractiveLesson = {
  slug: "planos-acotados-recta-dt1",
  title: "1. Sistema de planos acotados: punto y recta",
  subtitle: DT1_SUBTITLES[13],
  stage: { theme: "board" },
  steps: [
    slide("uso", "Para qué sirve el sistema", [], diagrama("d13-uso"), "visual-top"),
    slide("punto", "Representación del punto", [], diagrama("d13-punto"), "visual-top"),
    slide("cota", "Cota, desnivel y altitud", [], diagrama("d13-cota"), "visual-top"),
    slide("recta", "Representación de la recta", [], diagrama("d13-recta"), "visual-top"),
    slide("traza-modulo", "Traza, intervalo y graduación", [], diagrama("d13-traza-modulo"), "visual-top"),
    ...construccionPasos("acotados-graduar-intervalo", "acotados-graduar"),
  ],
};
