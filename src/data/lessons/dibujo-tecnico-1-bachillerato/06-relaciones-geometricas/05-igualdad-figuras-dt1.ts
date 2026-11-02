import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";

export const igualdadFigurasDt1Lesson: InteractiveLesson = {
  slug: "igualdad-figuras-dt1",
  title: "5. Igualdad de figuras",
  subtitle: DT1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("igual-triangulacion", "igual-coordenadas", "igual-rodeo", "igual-traslacion"),
  ],
};
