import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const enlacesDosRectasDt1Lesson: InteractiveLesson = {
  slug: "enlaces-dos-rectas-dt1",
  title: "3. Enlace de líneas",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("enlace", "Enlace de líneas", [
      { kind: "definition", text: "La aplicación real de las tangencias en el dibujo industrial es el **enlace de líneas**: unir dos rectas con un arco de circunferencia, o una recta y una circunferencia por medio de otro arco. El **arco de enlace** es tangente a las dos líneas en sus extremos $T$ y $T_1$." },
      { kind: "text", text: "Se resuelve como los problemas de circunferencias tangentes: se halla el **centro $O$** del arco de enlace, y los **puntos de tangencia** son los pies de las perpendiculares desde $O$ a las rectas (o están sobre la recta que une los centros, si el enlace es con un arco)." },
    ], diagrama("d8-enlace"), "visual-top"),
    ...construccionPasos("enlace-rectas-90", "enlace-dos-rectas-radio", "enlace-dos-rectas-punto", "enlace-recta-arco", "enlace-arco-t-punto", "enlace-arco-recta-t", "enlace-dos-arcos"),
  ],
};
