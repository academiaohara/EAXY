import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const rectasPerfilTerceraProyeccionDt1Lesson: InteractiveLesson = {
  slug: "rectas-perfil-tercera-proyeccion-dt1",
  title: "6. Rectas de perfil y tercera proyección",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("perfil", "Rectas de perfil", [
      { kind: "text", text: "Una recta de **perfil** está situada en un plano de perfil: sus dos proyecciones quedan **confundidas sobre una misma perpendicular a la L.T.** Por eso, para definirla hay que dar **dos puntos** o **sus trazas**." },
      { kind: "steps", items: [
        "**Perpendiculares a los bisectores** (seis posiciones): sus trazas $H'$ y $V''$ equidistan de la L.T. (Figs. 20 y 21).",
        "**No perpendiculares a los bisectores** (cuatro posiciones): sus proyecciones son parecidas a las anteriores, con la diferencia de que las trazas **no son simétricas ni coinciden** (Fig. 22).",
      ] },
    ], undefined, "stack"),
    slide("tercera", "Tercera proyección de una recta de perfil", [
      { kind: "text", text: "Se proyecta la recta sobre un **plano de perfil** $\\alpha$ ($\\alpha_1$-$\\alpha_2$), perpendicular a los otros dos y, por tanto, a la L.T. Las trazas $H'$ y $V''$ se llevan a los puntos $H$ y $V$ de ese plano, que se **abate** sobre el vertical y este sobre el horizontal: se obtiene la **tercera proyección** $s_1$ de la recta." },
      { kind: "rule", title: "Cómo se pasa a la tercera proyección", text: "La **cota** se lleva con una paralela a la L.T. y el **alejamiento** con una paralela a la L.T. hasta la traza $\\beta_1$ y un arco de centro $O$ hasta la L.T., seguido de una perpendicular." },
    ], undefined, "stack"),
    slide("p12", "Problema: punto de una recta de perfil", [
      { kind: "text", text: "**Dada la proyección de un punto contenido en una recta de perfil, hallar la otra proyección.** Se conoce $A'$ sobre $r'$-$r''$: se pasa la recta $r$ a tercera proyección según $r_1$, con ayuda de las trazas $H'$ y $V''$; el punto $A'$ nos da $A_1$ en $r_1$ y este se refiere a $A''$ en $r''$." },
    ], undefined, "stack"),
    ...construccionPasos("perfil-punto"),
    slide("p13", "Problema: trazas de una recta de perfil", [
      { kind: "text", text: "**Dada una recta de perfil por dos de sus puntos, hallar sus trazas.** Con un plano de perfil $\\beta_1$-$\\beta_2$ se halla la tercera proyección de $A$ y $B$; $A_1$ y $B_1$ definen $r_1$, que corta a los planos $H$ y $V$ en las trazas pedidas, y estas se refieren a la recta en $H'$-$H''$ y $V'$-$V''$." },
    ], undefined, "stack"),
    ...construccionPasos("perfil-trazas"),
    slide("p14", "Problema: ¿se cortan o se cruzan?", [
      { kind: "text", text: "**Averiguar si se cortan o no dos rectas dadas, una de perfil y otra cualquiera.** Las rectas $r$ y $s$ aparentemente se cortan, pero al referir el punto $I'$-$I''$ a la tercera proyección se ve que **no pertenece a $r$** (de perfil): las rectas se **cruzan**. El punto $I'$-$I''$ solo pertenece a $s$." },
    ], undefined, "stack"),
  ],
};
