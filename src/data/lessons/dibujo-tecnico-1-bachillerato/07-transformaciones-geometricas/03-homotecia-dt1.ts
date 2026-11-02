import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const homoteciaDt1Lesson: InteractiveLesson = {
  slug: "homotecia-dt1",
  title: "3. Homotecia",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("homotecia", "Homotecia", [
      { kind: "definition", text: "Dos figuras son **homotéticas** cuando se corresponden punto a punto y recta a recta de modo que las parejas de puntos homólogos están **alineadas con un punto fijo** $C$ (el **centro de homotecia**) y las parejas de rectas homólogas son **paralelas**." },
      { kind: "facts", items: [
        { tex: "\\dfrac{\\overline{CA}}{\\overline{CA'}} = \\pm K", label: "Razón de la homotecia" },
        { tex: "K > 0 \\Rightarrow \\text{directa},\\quad K < 0 \\Rightarrow \\text{inversa}", label: "Signo de la razón" },
      ] },
      { kind: "text", text: "La homotecia queda definida por su **centro** $C$ y su **razón** $K$. Si $K = 1$ es una **identidad**; si $K = -1$ es una **simetría central**, porque $A$ y $A'$ son simétricos respecto de $C$." },
      { kind: "text", text: "Las rectas que pasan por el centro son **dobles**. En figuras homotéticas los ángulos homólogos son iguales (por el paralelismo de las rectas homólogas), así que son figuras **semejantes**; dos figuras semejantes son homotéticas cuando sus rectas homólogas son paralelas." },
      { kind: "text", text: "Dos segmentos paralelos $AB$ y $A'B'$ son homotéticos respecto de **dos centros**, $C_1$ en una homotecia directa y $C_2$ en una inversa. Dos **circunferencias** son siempre homotéticas: los centros $C_1$ (directa) y $C_2$ (inversa) son los puntos de intersección de sus tangentes comunes exteriores o interiores." },
    ]),
    ...construccionPasos("homotecia-directa", "homotecia-inversa", "homotecia-centros-segmentos", "homotecia-centros-circunferencias"),
  ],
};
