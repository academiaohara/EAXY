import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const planosEspecialesDiedricoDt1Lesson: InteractiveLesson = {
  slug: "planos-especiales-diedrico-dt1",
  title: "7. Planos perpendiculares a los bisectores y paralelos a la L.T.",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("bisectores", "Planos perpendiculares a los bisectores", [
      { kind: "steps", items: [
        "El plano $\\alpha_1$-$\\alpha_2$ **perpendicular al primer bisector** tiene sus trazas **simétricas respecto de la L.T.**, es decir, forman el mismo ángulo con ella.",
        "El plano $\\omega_1$-$\\omega_2$ **perpendicular al segundo bisector** tiene sus trazas **en línea recta** (confundidas en una sola recta).",
        "En ambos casos se puede dibujar una horizontal $h'$-$h''$ y un punto $1'$-$1''$ sobre el plano.",
      ] },
    ], undefined, "stack"),
    ...construccionPasos("plano-perp-bisector"),
    slide("paralelos-lt", "Planos paralelos a la línea de tierra", [
      { kind: "text", text: "Un plano **paralelo a la L.T.** tiene sus **dos trazas paralelas a la L.T.** En el espacio se ve de perfil como una recta; en diédrico sus trazas pueden estar vistas u ocultas según el diedro por el que pasen, lo que se deduce fácilmente de la perspectiva." },
    ], undefined, "stack"),
  ],
};
