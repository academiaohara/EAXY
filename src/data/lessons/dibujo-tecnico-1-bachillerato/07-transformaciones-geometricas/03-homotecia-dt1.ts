import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide } from "@/data/lessons/tec1-helpers";

export const homoteciaDt1Lesson: InteractiveLesson = {
  slug: "homotecia-dt1",
  title: "3. Homotecia",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("homotecia", "La homotecia", [
      { kind: "definition", text: "Dos figuras son **homotéticas** si los puntos homólogos están **alineados con un punto fijo** $C$ (el **centro**) y las rectas homólogas son **paralelas**." },
      { kind: "facts", items: [
        { tex: "\\dfrac{\\overline{CA}}{\\overline{CA'}} = \\pm K", label: "Razón de la homotecia" },
        { tex: "K > 0 \\Rightarrow \\text{directa},\\quad K < 0 \\Rightarrow \\text{inversa}", label: "Signo de la razón" },
      ] },
    ], anim("dt1-homotecia"), "visual-top"),
    slide("homotecia-casos", "Casos y propiedades", [
      { kind: "relations", items: [
        { left: "K = 1", relation: "es una", right: "identidad" },
        { left: "K = −1", relation: "es una", right: "simetría central respecto de C" },
        { left: "Las rectas que pasan por C", relation: "son", right: "rectas dobles" },
        { left: "Ángulos homólogos", relation: "son", right: "iguales: las figuras son semejantes" },
      ] },
      { kind: "rule", title: "Semejanza", text: "Dos figuras **semejantes** son homotéticas cuando sus rectas homólogas son **paralelas**." },
    ]),
    slide("homotecia-centros", "Dos segmentos y dos circunferencias", [
      { kind: "text", text: "Dos **segmentos paralelos** $AB$ y $A'B'$ son homotéticos respecto de **dos centros**: $C_1$ en una homotecia directa y $C_2$ en una inversa." },
      { kind: "text", text: "Dos **circunferencias** son siempre homotéticas: $C_1$ (directa) y $C_2$ (inversa) son los puntos de corte de sus tangentes comunes **exteriores** o **interiores**." },
    ], anim("dt1-homotecia-centros"), "visual-top"),
    ...construccionPasos("homotecia-directa", "homotecia-inversa", "homotecia-centros-segmentos", "homotecia-centros-circunferencias"),
  ],
};
