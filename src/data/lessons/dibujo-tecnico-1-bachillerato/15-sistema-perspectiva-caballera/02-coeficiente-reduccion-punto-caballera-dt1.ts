import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const coeficienteReduccionPuntoCaballeraDt1Lesson: InteractiveLesson = {
  slug: "coeficiente-reduccion-punto-caballera-dt1",
  title: "2. Coeficiente de reducción y representación del punto",
  subtitle: DT1_SUBTITLES[15],
  stage: { theme: "board" },
  steps: [
    slide("coeficiente", "Coeficiente de reducción", [
      { kind: "text", text: "Las rectas **paralelas al plano del cuadro** ($ZOX$) se proyectan **en verdadera magnitud**, sin deformación. Lo mismo ocurre si son paralelas al eje $X$ o al eje $Z$. En cambio, las rectas paralelas al eje $Y$ se proyectan **reducidas** o ampliadas." },
      { kind: "rule", title: "Coeficiente de reducción", text: "Es el valor de la cotangente del ángulo $\\sigma$ que forma la dirección de proyección con el plano del cuadro: $\\mu = \\cot\\sigma$. Es la razón entre el segmento ya proyectado y el segmento real." },
      { kind: "steps", items: [
        "Si $\\sigma = 45°$, $\\mu = 1$: no hay reducción y el eje $Y$ se proyectaría sin deformación.",
        "Si $\\sigma < 45°$, $\\mu > 1$: sería una **ampliación**, con una perspectiva muy deformada. No conviene.",
        "Si $\\sigma > 45°$, $\\mu < 1$: el segmento se reduce. El valor más razonable es $\\sigma = 60°$, con $\\mu = \\sqrt{3}/3$.",
        "Como valores más aconsejables se emplean **0,5, 0,6 y 0,7**. Cuanto mayor es $\\mu$, mayor es la deformación.",
      ] },
      { kind: "rule", title: "Norma UNE 1031", text: "El valor normalizado es $\\varphi = 45°$ y el coeficiente de reducción $\\mu = 0{,}5$." },
    ], diagrama("d15-coeficiente"), "visual-top"),
    ...construccionPasos("cab-reduccion"),
    slide("punto-caballera", "Representación del punto", [
      { kind: "text", text: "Un punto $P(x, y, z)$ se representa en un sistema definido por $X$, $Y$, $Z$ y el ángulo $\\sigma$. Sobre el eje $X$ se toma $\\overline{ON} = x$ en verdadera magnitud y sobre $OZ$ la coordenada $\\overline{OM} = z$. La coordenada $y$ **se reduce** sobre $Y_0$ (el eje $Y$ abatido): $\\overline{O L_0} = y$ y, por $L_0$, la paralela a $1_0$-$1$ da el punto $L$ en el eje $Y$. Por paralelas a los ejes se obtienen $P'$, $P''$ y $P'''$, y completando el paralelepípedo, $P$." },
    ], diagrama("d15-punto-cab"), "visual-top"),
    ...construccionPasos("cab-punto"),
    slide("paso-diedrico", "Paso del sistema diédrico a la perspectiva caballera", [
      { kind: "text", text: "Dado un punto $P'$-$P''$ en el sistema diédrico, referido a un plano de perfil $ZY$, sus coordenadas son $x = \\overline{ON}$, $y = \\overline{NP'}$ y $z = \\overline{NP''}$. Para representarlo en caballera se toman la coordenada $x$ y la $z$ en **verdadera magnitud** y la $-y$ **reducida** sobre $Y_0$, abatiendo el eje $Y$; con las coordenadas $ON$, $OB$ y $OM$ se completa el paralelepípedo y se obtienen $P$, $P'$, $P''$ y $P'''$." },
    ], diagrama("d15-paso-diedrico"), "visual-top"),
  ],
};
