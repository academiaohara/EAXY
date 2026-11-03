import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const distanciasFigurasPlanasCaballeraDt1Lesson: InteractiveLesson = {
  slug: "distancias-figuras-planas-caballera-dt1",
  title: "3. Distancia entre puntos y figuras planas",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("distancia-1", "Distancia entre dos puntos: primer caso", [
      { kind: "steps", items: [
        "Un segmento $AB$ **paralelo al eje $Z$** está ya en verdadera magnitud; igual el $CD$, paralelo al eje $X$.",
        "Un segmento $EF$ **paralelo al eje $Y$** está reducido: basta llevarlo según $\\overline{ON}$ en el eje $Y$ y obtener $\\overline{O\\text{-}N_0}$, que es la verdadera magnitud $H$.",
      ] },
    ], undefined, "stack"),
    ...construccionPasos("cab-distancia-y"),
    slide("distancia-2", "Distancia entre dos puntos: segundo y tercer caso", [
      { kind: "steps", items: [
        "**Segundo caso.** La distancia real entre dos puntos $N$ y $B$ con el segmento $NB$ en el plano $XOY$ es el segmento $N_0B_0$: se **abaten** los puntos sobre el plano $ZOX$ trazando las paralelas indicadas, a los lados del triángulo $A$-$O$-$(A)_0$.",
        "**Segmento de un plano del cuadro**: la verdadera magnitud del segmento $\\overline{AB}$ del plano $ZOX$ es él mismo.",
        "**Recta oblicua a los planos del sistema** $PQ$: la verdadera magnitud $D$ es la **hipotenusa** del triángulo $PNQ$; un cateto $\\overline{PN} = h$ es la diferencia de cotas y el otro cateto $\\overline{NQ}$ es la verdadera magnitud de $d'$, que se halla como en el caso anterior.",
      ] },
    ], undefined, "stack"),
    slide("figuras", "Perspectiva de figuras planas en planos del sistema", [
      { kind: "text", text: "Una figura plana situada en un plano del sistema se dibuja **punto a punto**. En el plano $XOY$ las medidas paralelas a $X$ se toman en verdadera magnitud y las paralelas a $Y$, **reducidas**; en $ZOX$ la figura se ve en **verdadera forma**; en $ZOY$ se toman la $Z$ sin reducir y la $Y$ reducida." },
      { kind: "steps", items: [
        "Rectángulo y triángulo en $XOY$ (Fig. 13): se circunscribe el triángulo al rectángulo $NMCB$ y se llevan las medidas.",
        "Rectángulo y trapecio en $ZOY$ (Fig. 14) y triángulo en $ZOY$ por cotas (Fig. 15).",
        "Hexágono regular en cada plano del sistema (Figs. 16 y 17) y pentágono regular en $XOY$ a partir de su verdadera magnitud en $ZOX$ (Fig. 18).",
      ] },
    ], undefined, "stack"),
    ...construccionPasos("cab-triangulo-xoy"),
    slide("curvas", "Perspectiva de una curva situada en un plano", [
      { kind: "text", text: "Dada una curva situada, por ejemplo, en el plano horizontal del sistema diédrico, para representarla en el plano $XOY$ de caballera basta pasar **punto a punto**: las rectas paralelas al eje $Y$ se reducen según el coeficiente del sistema, y las paralelas a $X$ se conservan." },
    ], undefined, "stack"),
  ],
};
