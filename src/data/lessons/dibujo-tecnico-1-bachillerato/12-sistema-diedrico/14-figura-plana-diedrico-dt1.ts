import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const figuraPlanaDiedricoDt1Lesson: InteractiveLesson = {
  slug: "figura-plana-diedrico-dt1",
  title: "14. Proyecciones de una figura plana",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("problema", "El problema general", [], diagrama("d12-figura-plana"), "visual-top"),
    ...construccionPasos("figura-plana"),
  ],
};
