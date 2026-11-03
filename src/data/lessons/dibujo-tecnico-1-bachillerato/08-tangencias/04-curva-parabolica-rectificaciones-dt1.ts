import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const curvaParabolicaRectificacionesDt1Lesson: InteractiveLesson = {
  slug: "curva-parabolica-rectificaciones-dt1",
  title: "4. Curva parabólica y rectificaciones",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("rectificar", "Rectificar una curva", [
      { kind: "definition", text: "**Rectificar** una curva es hallar un **segmento** de la misma longitud que ella. En la práctica hay que rectificar una curva cualquiera o un arco de circunferencia." },
      { kind: "formula", tex: "L = 2\\pi r = \\pi d \\approx \\dfrac{22}{7}\\,d = 3d + \\dfrac{d}{7}" },
      { kind: "text", text: "Antes, la **curva parabólica** une dos curvas o dos rectas por medio de un arco de parábola tangente en los puntos $A$ y $B$: se dividen los segmentos de las tangentes en el mismo número de partes iguales y las rectas que unen las divisiones envuelven la parábola." },
    ], diagrama("d8-rectificar"), "visual-top"),
    ...construccionPasos("parabola", "rectificar-curva", "rectificar-circunferencia", "rectificar-semicircunferencia"),
  ],
};
