import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const pertenenciaPuntoRectaPlanoDt1Lesson: InteractiveLesson = {
  slug: "pertenencia-punto-recta-plano-dt1",
  title: "5. Pertenencia de punto y recta a un plano",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("recta-plano", "Rectas particulares de un plano", [
      { kind: "rule", title: "Recta contenida en un plano", text: "Una recta está situada en un plano cuando **las trazas de la recta están situadas sobre las trazas del mismo nombre del plano**." },
      { kind: "text", text: "Si se conoce la proyección horizontal $r'$ de una recta de un plano $\\alpha$, para hallar $r''$ se traza por $V'$ la perpendicular a la L.T. hasta cortar en $V''$ a $\\alpha_2$; se lleva $H'$ a la L.T. en $H''$ y, unidos $H''$ y $V''$, se obtiene $r''$. El problema inverso se resuelve igual." },
    ], undefined, "stack"),
    ...construccionPasos("recta-en-plano"),
    slide("punto-plano", "Punto contenido en un plano", [
      { kind: "text", text: "Un punto está en un plano cuando **sus proyecciones están sobre las proyecciones del mismo nombre de una recta contenida en el plano**. Por eso un punto no puede situarse en un plano de forma arbitraria: antes hay que situar en él una recta, mejor una **horizontal** o una **frontal**, por su sencillez." },
    ], undefined, "stack"),
    slide("horizontal", "Recta horizontal de un plano", [
      { kind: "text", text: "La horizontal $h(h'\\text{-}h'')$ de un plano $\\alpha$ tiene su traza vertical $V''$ en $\\alpha_2$; $h''$ es **paralela a la L.T.** y $h'$ es **paralela a $\\alpha_1$**, ya que su traza horizontal es impropia. Su cota es $c$." },
    ], undefined, "stack"),
    ...construccionPasos("horizontal-del-plano"),
    slide("frontal", "Recta frontal de un plano", [
      { kind: "text", text: "De la misma forma, una **frontal** $f(f'\\text{-}f'')$ de un plano $\\omega$ tiene su única traza $H'$ en la traza horizontal $\\omega_1$; $f'$ es **paralela a la L.T.** y $f''$ es **paralela a $\\omega_2$**. Su alejamiento es $a$." },
    ], undefined, "stack"),
    slide("lineas-max", "Líneas de máxima pendiente y de máxima inclinación", [
      { kind: "steps", items: [
        "La **línea de máxima pendiente** (**l.m.p.**) es la recta del plano que forma el **mayor ángulo con el plano horizontal**. Su proyección horizontal es **perpendicular a la traza horizontal** $\\alpha_1$.",
        "La **línea de máxima inclinación** (**l.m.i.**) forma el mayor ángulo con el plano vertical. Su proyección vertical es **perpendicular a la traza vertical** $\\omega_2$.",
        "Un plano queda definido conociendo **una de sus l.m.p.** o **una de sus l.m.i.** Dada $r'$-$r''$ como l.m.p., se dibuja por $H'$ la perpendicular a $r'$ y su corte $N$ con la L.T., unido con $V''$, da la traza vertical.",
      ] },
    ], undefined, "stack"),
  ],
};
