import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const fundamentosAxonometriaDt1Lesson: InteractiveLesson = {
  slug: "fundamentos-axonometria-dt1",
  title: "1. Fundamentos del sistema axonométrico",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("triedro", "El triedro trirrectángulo", [
      { kind: "text", text: "Se considera en el espacio un **triedro trirrectángulo** cuyos planos son $(X)(O)(Y)$, $(Z)(O)(X)$ y $(Z)(O)(Y)$, con vértice en el **origen** $(O)$. Sus aristas $(X)$, $(Y)$ y $(Z)$ son los **ejes del sistema** y los planos de sus caras, los **planos coordenados**." },
      { kind: "text", text: "Un punto $(P)$ del espacio se proyecta ortogonalmente sobre cada cara del triedro en $(P')$, $(P'')$ y $(P''')$." },
    ], diagrama("d14-triedro"), "visual-top"),
    slide("cuadro", "El plano del cuadro", [
      { kind: "text", text: "Un cuarto plano, que no contiene a ningún eje ni es una cara del triedro, es el **plano del papel** o **plano del cuadro** $\\pi$. Al proyectar ortogonalmente sobre él el triedro y los puntos, el origen se proyecta en $O$, los ejes según tres rectas $X$, $Y$, $Z$ concurrentes en $O$ y los puntos en $P$, $P'$, $P''$ y $P'''$." },
      { kind: "steps", items: [
        "$P$ es la **proyección directa ortogonal**: es la perspectiva axonométrica verdadera. $P'$, $P''$ y $P'''$ son **proyecciones de proyecciones** y se llaman proyecciones primera, segunda y tercera.",
        "Los segmentos $(P)$-$(P')$, $(P)$-$(P'')$ y $(P)$-$(P''')$ son paralelos a los ejes $Z$, $Y$ y $X$ y se proyectan paralelamente a ellos.",
        "Los ejes forman en proyección ángulos $\\varepsilon = \\widehat{XOY}$, $\\omega = \\widehat{XOZ}$ y $\\rho = \\widehat{ZOY}$, con $\\varepsilon + \\omega + \\rho = 360°$.",
      ] },
    ], diagrama("d14-cuadro"), "visual-top"),
    slide("reversible", "Reversibilidad", [
      { kind: "text", text: "Un punto tiene **cuatro proyecciones**: una directa ortogonal y tres laterales sobre los planos del sistema. Dadas dos proyecciones cualesquiera, se pueden hallar las otras dos: un punto queda definido por **dos proyecciones**." },
      { kind: "text", text: "El punto $P$ está a las distancias $x$, $y$, $z$ de los planos $ZOY$, $ZOX$ y $XOY$: son sus **coordenadas cartesianas**." },
    ], diagrama("d14-reversible"), "visual-top"),
    ...construccionPasos("axo-proyecciones-punto"),
    slide("triangulo", "El triángulo fundamental", [
      { kind: "text", text: "Un plano paralelo al cuadro corta a los ejes en $(A)$, $(B)$, $(C)$ y a las caras del triedro según el triángulo $ABC$, de lados $\\pi_1$, $\\pi_2$, $\\pi_3$ (las **trazas** del cuadro). Es el **triángulo fundamental**: su conocimiento basta para definir un sistema axonométrico." },
      { kind: "steps", items: [
        "Los ejes $X$, $Y$, $Z$ son **perpendiculares a los lados** $BC$, $CA$, $AB$.",
        "Los pies de las alturas $H$, $I$, $J$ definen el **triángulo órtico** de $ABC$, y los ejes son las **bisectrices** de sus ángulos.",
        "Se deducen los ángulos de los ejes con el cuadro: $\\alpha$ para $X$, $\\beta$ para $Y$, $\\gamma$ para $Z$.",
      ] },
    ], diagrama("d14-triangulo"), "visual-top"),
    slide("notacion", "Notaciones", [
      { kind: "steps", items: [
        "Los **ejes** se designan por $X$, $Y$ y $Z$.",
        "Un **punto** se designa por una letra o un número: $A(A'\\text{-}A''\\text{-}A''')$ o $3(3'\\text{-}3''\\text{-}3''')$, siendo $A$ la proyección directa, $A'$ la proyección sobre $XOY$, $A''$ sobre $XOZ$ y $A'''$ sobre $YOZ$.",
        "Una **recta** por una letra minúscula: $r(r'\\text{-}r''\\text{-}r''')$.",
        "Un **plano** por una letra griega: $\\alpha(\\alpha_1\\text{-}\\alpha_2\\text{-}\\alpha_3)$, con sus trazas en los planos del sistema.",
      ] },
    ], diagrama("d14-notacion"), "visual-top"),
  ],
};
