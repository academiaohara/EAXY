import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const isometricaPiezasElipsesDt1Lesson: InteractiveLesson = {
  slug: "isometrica-piezas-elipses-dt1",
  title: "3. Circunferencia en perspectiva isométrica",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("circunferencia", "La circunferencia se proyecta como elipse", [
      { kind: "text", text: "Una circunferencia situada en una cara de una pieza se proyecta según una **elipse**. Es el único problema que presenta la perspectiva, por lo que se simplifica al máximo para obtenerla con rapidez." },
      { kind: "steps", items: [
        "Se suponen dos diámetros perpendiculares $AB$ y $CD$ y un **cuadrado circunscrito** cuyos puntos de tangencia son los extremos de los diámetros.",
        "**Plano $XOY$**: por el centro se trazan los diámetros conjugados, $AB$ paralelo a $X$ y $CD$ paralelo a $Y$, con $OA = OB = OC = OD = r$ (radio reducido). Las tangentes en esos puntos forman el **rombo** $NMPQ$, perspectiva del cuadrado.",
        "El **eje mayor** de la elipse es perpendicular a la dirección del eje $Z$, e igual a $2R$; el **eje menor** es paralelo a ella.",
        "En los planos $XOZ$ y $YOZ$ la construcción es igual: el eje mayor es perpendicular a la dirección del eje $Y$ (o $X$) y mide $2R$.",
      ] },
    ], undefined, "stack"),
    slide("puntos", "Puntos auxiliares de la elipse", [
      { kind: "text", text: "Si la elipse es muy grande, pueden obtenerse algunos puntos de ella: se completa el cuadrado circunscrito y el rombo y se toman los puntos medios $1$ y $2$ de los segmentos respectivos; las rectas $A$-$2$ y $B$-$1$, al cortarse, proporcionan dos puntos $P$ y $Q$ de la elipse." },
    ], undefined, "stack"),
    slide("ovalo", "El óvalo de cuatro centros", [
      { kind: "text", text: "Se puede sustituir la elipse por un **óvalo**: curva aproximada, algo achatada en los extremos del eje mayor. Los centros de curvatura son los puntos $C_1$, $C_2$, $C_3$ y $C_4$. El procedimiento es más laborioso y requiere mayor precisión para que los arcos sean tangentes." },
    ], undefined, "stack"),
    ...construccionPasos("axo-ovalo-isometrico"),
    slide("rayados", "Rayados de secciones en perspectiva isométrica", [
      { kind: "text", text: "Las superficies producidas por un corte se rayan en cada plano del sistema con líneas **paralelas a las direcciones** $d_1$, $d_2$ y $d_3$. Se toma un segmento $s$ cualquiera sobre cada eje y se unen los puntos $A$, $B$ y $C$." },
      { kind: "warning", title: "Antes de dibujar una pieza", text: "Hay que estudiar con detenimiento las **vistas diédricas** o el dibujo de taller que la definen. Mentalmente se descompone en **sólidos geométricos** (paralelepípedos, cilindros, prismas, conos…) que guardan una posición relativa que debe conservarse en la perspectiva. Después se empieza por algún extremo de la pieza o por un eje de simetría total." },
    ], undefined, "stack"),
  ],
};
