import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const perspectivaCaballeraDt1Lesson: InteractiveLesson = {
  slug: "perspectiva-caballera-dt1",
  title: "1. Fundamentos, notaciones y datos del sistema",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("fundamentos", "El sistema de perspectiva caballera", [
      { kind: "text", text: "También llamado **perspectiva rápida**, emplea la **proyección cilíndrica oblicua** sobre un plano llamado del cuadro, del papel, del dibujo o de proyección. Se parte de un triedro trirrectángulo $O(X)(Y)(Z)$ cuyo plano $ZOX$ coincide con el plano del cuadro: los ejes $(X)$ y $(Z)$ coinciden con sus proyecciones $X$ y $Z$." },
      { kind: "steps", items: [
        "Si se proyectara ortogonalmente, las proyecciones previas quedarían confundidas con los ejes $X$ y $Z$. Para evitarlo se elige una **dirección de proyección oblicua** $d$ al cuadro.",
        "El eje $(Y)$, perpendicular al cuadro, se proyecta según una recta $Y$ que pasa por el origen. La dirección $d$ forma un ángulo $\\sigma$ con el cuadro y el ángulo $\\varphi$ que forma el plano proyectante con el plano $ZOX$ es el que forma el eje $Y$ con el $X$.",
        "Los ejes $Z$ y $X$ son **perpendiculares** y el eje $Y$ forma el ángulo $\\varphi$ con $X$.",
      ] },
    ], undefined, "stack"),
    slide("punto", "Las cuatro proyecciones de un punto", [
      { kind: "text", text: "Un punto $(B)$ del espacio se proyecta ortogonalmente sobre los planos del triedro en $(A)$, $(C)$ y $(E)$: son las **proyecciones previas**. Con una dirección oblicua se proyecta el conjunto sobre el cuadro." },
      { kind: "steps", items: [
        "$B$ es la **proyección directa oblicua** del punto: es la **perspectiva caballera** del punto.",
        "$A$ es la proyección de $(A)$: coincide con él por estar en el cuadro (proyección vertical primera). $C$ es la proyección oblicua de $(C)$ sobre $ZOY$ (proyección tercera) y $E$ la de $(E)$ sobre $XOY$ (proyección segunda).",
        "El paralelepípedo del espacio se proyecta con **trazo grueso** en la perspectiva directa y con **trazo fino** las proyecciones previas.",
      ] },
      { kind: "rule", title: "Resumen", text: "El sistema emplea la proyección cilíndrica oblicua y un punto tiene **cuatro proyecciones**: una directa oblicua sobre el cuadro y tres oblicuas sobre los planos del triedro." },
    ], undefined, "stack"),
    slide("notaciones", "Notaciones", [
      { kind: "steps", items: [
        "Un **punto** se designa con una letra mayúscula o un número: $P\\text{-}P'\\text{-}P''\\text{-}P'''$ designa un punto cuya proyección directa oblicua es $P$; $P'$ es la proyección sobre el plano $XOY$; $P''$, la proyección sobre $ZOX$ y $P'''$, sobre $ZOY$. También $1\\text{-}1'\\text{-}1''\\text{-}1'''$.",
        "Una **recta** con letras minúsculas, en el mismo orden: $r\\text{-}r'\\text{-}r''\\text{-}r'''$.",
        "Un **plano** con una letra griega: $\\varphi(\\varphi_1\\text{-}\\varphi_2\\text{-}\\varphi_3)$, siendo $\\varphi_1$, $\\varphi_2$ y $\\varphi_3$ las trazas con $XOY$, $ZOX$ y $ZOY$.",
      ] },
    ], undefined, "stack"),
    slide("datos", "Datos del sistema: los ángulos φ y σ", [
      { kind: "text", text: "Para que el sistema quede definido hay que conocer dos datos:" },
      { kind: "steps", items: [
        "El ángulo $\\varphi$ que forma en el espacio el plano $XOY$ con el plano proyectante del eje $Y$ que contiene la dirección de proyección. De la forma más sencilla, **$\\varphi$ es el ángulo que ya en proyección forman los ejes $X$ e $Y$**.",
        "El ángulo $\\sigma$ que forma la dirección de proyección $d$ con el plano del cuadro.",
      ] },
      { kind: "text", text: "El ángulo $\\varphi$ se elige entre diez valores, según la perspectiva que se quiera: con unas caras más vistas y mayor o menor deformación. Dentro de cada uno se pueden elegir varios valores de $\\sigma$." },
    ], undefined, "stack"),
    ...construccionPasos("cab-ejes"),
  ],
};
