import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const circunferenciaPiezasCaballeraDt1Lesson: InteractiveLesson = {
  slug: "circunferencia-piezas-caballera-dt1",
  title: "4. Perspectiva de la circunferencia y de piezas",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("circunferencia", "Perspectiva caballera de la circunferencia", [
      { kind: "text", text: "La única dificultad de la caballera es el trazado de la proyección de la circunferencia, que en los planos $YOZ$ y $XOY$ es una **elipse**. En la figura se dibuja la circunferencia de radio $R$ en cada plano, con coeficiente de reducción 0,6." },
      { kind: "steps", items: [
        "**Plano $XOZ$**: la proyección es la **misma circunferencia** de radio $R$. Se indica el cuadrado circunscrito.",
        "**Plano $XOY$**: la proyección es una elipse. Por $O$ se traza $CD$ paralelo al eje $X$ con $OC = OD = R$ y $AB$ paralelo al eje $Y$ con $OA = OB = r$ (radio reducido según el coeficiente). Por paralelas se dibuja el **romboide** $NMPQ$, de lados paralelos a los diámetros conjugados.",
        "**Plano $YOZ$**: por $O$ se trazan los diámetros conjugados, $AB$ paralelo a $Z$ sin reducir con $OA = OB = R$, y $CD$ paralelo a $Y$ reducido, con $OC = OD = r = 0{,}6R$.",
        "La elipse, inscrita en el romboide, se traza **a lápiz y a mano alzada**, ayudándose de las tangentes en los extremos de los diámetros, y se pasa a tinta con la plantilla de curvas.",
      ] },
    ], undefined, "stack"),
    ...construccionPasos("cab-circunferencia-zox", "cab-circunferencia-xoy", "cab-circunferencia-zoy"),
    slide("ovalo", "Óvalo en lugar de elipse", [
      { kind: "text", text: "Con un coeficiente $\\mu = 1$ (caso no recomendado) en el eje $Y$ no habría reducción y las elipses se pueden sustituir por **óvalos** de forma aproximada, que resultan algo achatados o recortados respecto a la elipse. Se toman $\\overline{OA} = \\overline{OB} = \\overline{OC} = \\overline{OD} = R$; se construye el romboide $NMPQ$ y por los puntos de tangencia se trazan las normales, que se cortan en los centros de curvatura $C_1$, $C_2$, $C_3$ y $C_4$ de los arcos del óvalo. Este procedimiento solo sirve cuando no hay reducción en $Y$ y requiere más tiempo y precisión." },
      { kind: "text", text: "En los planos $YOZ$ o paralelos a él se sigue el mismo procedimiento. Se recomienda el método de los **diámetros conjugados**, ayudándose de las tangentes a la elipse en los extremos de esos diámetros. También se pueden obtener puntos de la elipse por haces proyectivos (Fig. 24)." },
    ], undefined, "stack"),
    ...construccionPasos("cab-ovalo-xoy"),
    slide("pieza", "Perspectiva de una pieza", [
      { kind: "text", text: "Para dibujar la perspectiva caballera de una pieza se estudian sus vistas diédricas y se elige un sistema, normalmente $\\varphi = 45°$ y $\\mu = 0{,}5$. La **cara con más detalles circulares o complejos** se coloca paralela al cuadro, donde se ve en verdadera forma, y se añaden las aristas de profundidad reducidas." },
    ], undefined, "stack"),
    ...construccionPasos("cab-pieza"),
  ],
};
