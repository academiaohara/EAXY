import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const puntoPlanoAxonometriaDt1Lesson: InteractiveLesson = {
  slug: "punto-plano-axonometria-dt1",
  title: "4. Punto, recta y plano en axonometría",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("punto", "Representación del punto", [
      { kind: "text", text: "Los tres planos del sistema dividen el espacio en **ocho triedros**. Para designar cada uno se consideran los dos sentidos, $+$ y $-$, de cada eje a partir del origen." },
      { kind: "steps", items: [
        "Punto $A$: en el triedro $+X$, $+Y$, $+Z$.",
        "Punto $B$: en el triedro $+X$, $-Y$, $+Z$.",
        "Punto $C$: en el triedro $-X$, $-Y$, $+Z$.",
        "Punto $D$: en el triedro $-X$, $+Y$, $+Z$.",
      ] },
    ], undefined, "stack"),
    slide("recta", "Proyecciones de una recta. Trazas", [
      { kind: "text", text: "Una recta del espacio queda definida conociendo **dos puntos** con dos de sus proyecciones. Se obtiene uniendo las proyecciones **homónimas** de los puntos: la proyección directa $r$ pasa por $P$ y $Q$ y la horizontal $r'$ por $P'$ y $Q'$. Para situar un punto en una recta, sus proyecciones deben estar sobre las proyecciones homónimas de la recta." },
      { kind: "text", text: "Una recta oblicua $t$ tiene tres **trazas**: con los planos $XOY$, $XOZ$ y $ZOY$. El punto $T_1$-$T_1'$ es la traza con $XOY$, por donde se cortan $t$ y $t'$. Prolongando $t'$ hasta el eje $X$ y refiriendo a $t$ se halla la traza con $XOZ$; análogamente con $Y$ para la traza con $ZOY$." },
    ], undefined, "stack"),
    slide("rectas-particulares", "Rectas paralelas a planos y a ejes", [
      { kind: "steps", items: [
        "**Paralela a $XOY$**: no tiene traza horizontal; sus proyecciones $t$ y $t'$ son paralelas y las otras se cortan en el eje $Z$.",
        "**Paralela a $XOZ$**: su proyección directa $r$ y la segunda $r''$ son paralelas; solo tiene dos trazas, $R_1$ y $R_3$.",
        "**Paralela a $YOZ$** (frontal): $r$ y $r'''$ son paralelas y $r'$ y $r''$ se cortan en un punto de un eje; solo tiene dos trazas.",
        "**Paralela al eje $X$**: es perpendicular a $YOZ$, su proyección sobre ese plano es un punto y solo tiene una traza, con $ZOY$.",
        "**Paralela al eje $Y$**: sus proyecciones $s$ y $s'$ son paralelas al eje; solo tiene la traza con $ZOX$.",
        "**Paralela al eje $Z$**: su proyección horizontal es un punto y solo tiene traza con $XOY$.",
      ] },
    ], undefined, "stack"),
    slide("plano", "Representación del plano", [
      { kind: "text", text: "El plano viene definido de la forma más sencilla por sus **trazas**. Un plano oblicuo corta a los planos del sistema según tres rectas que se cortan dos a dos en un punto de cada eje: si corta a $X$ en $A$, a $Y$ en $B$ y a $Z$ en $C$, la traza con $XOY$ es $\\alpha_1$, con $ZOX$ es $\\alpha_2$ y con $ZOY$ es $\\alpha_3$. El triángulo $ABC$ se llama **triángulo de trazas**." },
    ], undefined, "stack"),
    ...construccionPasos("axo-trazas-plano"),
    slide("planos-particulares", "Planos paralelos a ejes y a planos coordenados", [
      { kind: "steps", items: [
        "**Paralelo al eje $X$** (o $Y$, o $Z$): tiene dos trazas paralelas a ese eje y el punto donde corta al eje es impropio. El plano paralelo al eje $X$ es proyectante sobre $ZOY$; el paralelo a $Z$ es proyectante horizontal.",
        "**Paralelo a $XOY$**: es horizontal, de cota $OT$. Corta al eje $Z$ en $T$ y es proyectante sobre $ZOX$ y $ZOY$: sus proyecciones segunda y tercera quedan confundidas con las trazas $\\beta_2$ y $\\beta_3$.",
        "**Paralelo a $XOZ$**: tiene trazas propias $\\alpha_1$ y $\\alpha_3$ paralelas a $X$ y $Z$; la traza $\\alpha_2$ es impropia.",
        "**Paralelo a $YOZ$**: tiene por trazas con $XOY$ y $ZOX$ dos rectas paralelas a $Y$ y $Z$; la traza $\\alpha_3$ es impropia.",
      ] },
    ], undefined, "stack"),
    slide("intersecciones", "Trazas por tres puntos, posiciones relativas e intersecciones", [
      { kind: "steps", items: [
        "**Plano por tres puntos** $P$, $Q$, $T$: se unen dos a dos para obtener las rectas que definen, se hallan sus trazas y se unen las **homónimas**.",
        "**Rectas que se cortan**: las proyecciones directas se cortan en $P$ y las horizontales en $P'$, y ambos puntos están en una **paralela al eje $Z$**. Son **paralelas** si lo son sus proyecciones del mismo nombre; si no cumplen ninguna de las dos condiciones, se **cruzan**.",
        "**Intersección de dos planos**: al cortarlos por los planos del sistema se obtienen trazas que, al cortarse las del mismo nombre, dan **puntos de la intersección**. Se unen $S_1$, $S_2$ y $S_3$.",
        "**Intersección de recta y plano**: se hace pasar por la recta un plano cualquiera, el mejor es un **proyectante**, y se halla su intersección con el plano dado; esa recta encuentra a la dada en el punto buscado.",
      ] },
    ], undefined, "stack"),
  ],
};
