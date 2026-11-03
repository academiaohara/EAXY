import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const figuraPlanaDiedricoDt1Lesson: InteractiveLesson = {
  slug: "figura-plana-diedrico-dt1",
  title: "8. Proyecciones de una figura plana",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("problema", "El problema general", [
      { kind: "text", text: "Se trata de resolver el siguiente problema: **dado un plano y una figura contenida en dicho plano, de la que se conoce una de las proyecciones, hallar la otra proyección.**" },
      { kind: "steps", items: [
        "Se traza por cada vértice una **recta horizontal** o **frontal** del plano y se refieren los puntos a ellas.",
        "Por ejemplo, por $1''$ se traza la horizontal $h''$, que corta a $\\alpha_2$ en $V''$; $V''$ se refiere a la L.T. en $V'$ y por $V'$ se traza $h'$ paralela a $\\alpha_1$; el punto $1''$ se refiere a $h'$ en $1'$.",
        "Se repite la operación con todos los vértices y se unen: queda la proyección horizontal $1'$-$2'$-$3'$.",
      ] },
      { kind: "text", text: "También puede resolverse con la **afinidad** que existe entre las proyecciones vertical y horizontal; ese procedimiento se estudia el curso próximo." },
    ], diagrama("d12-figura-plana"), "visual-top"),
    ...construccionPasos("figura-plana"),
  ],
};
