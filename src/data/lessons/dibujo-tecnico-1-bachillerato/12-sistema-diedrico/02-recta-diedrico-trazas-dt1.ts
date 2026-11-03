import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const rectaDiedricoTrazasDt1Lesson: InteractiveLesson = {
  slug: "recta-diedrico-trazas-dt1",
  title: "2. Representación de la recta. Trazas",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("recta", "Proyecciones de una recta", [
      { kind: "text", text: "La proyección de una recta sobre un plano es otra **recta**, formada por las proyecciones de todos sus puntos. Es perpendicular al plano cuando la recta lo es (entonces su proyección es un **punto**)." },
      { kind: "steps", items: [
        "Una recta queda **definida** cuando se conocen sus proyecciones sobre los dos planos: $r'$ sobre el $H$ y $r''$ sobre el $V$.",
        "El **plano proyectante horizontal** de la recta es el que la proyecta sobre el $H$ (triángulo $V''$-$V'$-$H'$); el **proyectante vertical** la proyecta sobre el $V$. La recta es la **intersección** de ambos planos.",
        "Si la recta está contenida en un plano de perfil, hace falta una **tercera proyección**.",
      ] },
    ], diagrama("d12-recta"), "visual-top"),
    ...construccionPasos("recta-proyecciones"),
    slide("trazas", "Trazas de una recta", [
      { kind: "text", text: "Se llaman **trazas** los puntos donde la recta corta a los planos de proyección." },
      { kind: "steps", items: [
        "**Traza horizontal** $H(H'-H'')$: corte con el plano $H$. Tiene cota nula, así que $H'' $ está **siempre en la L.T.** y $H'$ coincide con el punto.",
        "**Traza vertical** $V(V'-V'')$: corte con el plano $V$. Tiene alejamiento nulo, así que $V'$ está **siempre en la L.T.**",
        "Las líneas de referencia $H'$-$H''$ y $V'$-$V''$ son perpendiculares a la L.T.",
      ] },
    ], diagrama("d12-trazas"), "visual-top"),
    ...construccionPasos("recta-trazas"),
    slide("vistas", "Partes vistas y ocultas", [
      { kind: "text", text: "Como los planos son opacos, solo se considera vista la parte de la recta comprendida en el **primer diedro**, que se dibuja con línea **continua**. El resto es oculta y se dibuja a **trazos**. Una recta puede pasar a lo sumo por **tres diedros**." },
    ], diagrama("d12-vistas"), "visual-top"),
    slide("cortan", "Rectas que se cortan y punto de una recta", [
      { kind: "steps", items: [
        "Dos rectas **se cortan** en el espacio si las proyecciones del mismo nombre se cortan en puntos que están en una misma perpendicular a la L.T.",
        "Si las proyecciones horizontales se cortan en $B'$ y las verticales en $A''$, pero esos puntos **no están en la misma perpendicular**, las rectas se **cruzan**: no hay ningún punto común.",
        "Un punto **pertenece** a una recta si sus proyecciones están sobre las proyecciones del mismo nombre de la recta.",
      ] },
    ], diagrama("d12-cortan"), "visual-top"),
    ...construccionPasos("rectas-se-cortan"),
    slide("de-punta", "Rectas perpendiculares a los planos de proyección", [
      { kind: "text", text: "Pueden ser perpendiculares al plano $H$ o al $V$ y se llaman también **rectas de punta**." },
      { kind: "steps", items: [
        "**Perpendicular al $H$** (recta vertical): su proyección horizontal es un **punto** y la vertical es una recta **perpendicular a la L.T.**",
        "**Perpendicular al $V$** (recta de punta): su proyección vertical es un punto y la horizontal es una recta perpendicular a la L.T.",
      ] },
    ], diagrama("d12-perpendiculares"), "visual-top"),
  ],
};
