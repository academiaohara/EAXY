import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const planoDiedricoTrazasDt1Lesson: InteractiveLesson = {
  slug: "plano-diedrico-trazas-dt1",
  title: "4. Representación del plano. Trazas y tipos",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("trazas", "Trazas de un plano", [
      { kind: "text", text: "Se llaman **trazas de un plano** las rectas intersección de este con cada uno de los planos de proyección. Un plano tiene dos: la **horizontal** $\\alpha_1$ y la **vertical** $\\alpha_2$." },
      { kind: "steps", items: [
        "Las dos trazas **se cortan en un punto $N$ de la L.T.**",
        "La traza horizontal $\\alpha_1$ es una recta del plano horizontal y, por tanto, se proyecta verticalmente sobre la L.T. Igualmente, $\\alpha_2$ se proyecta horizontalmente sobre la L.T.",
        "Al abatir el plano vertical sobre el horizontal, el plano queda como una **pareja de rectas que parten de $N$**.",
      ] },
    ], undefined, "stack"),
    slide("definir", "Formas de definir un plano", [
      { kind: "steps", items: [
        "Por **tres puntos** no alineados.",
        "Por **dos rectas que se cortan**.",
        "Por **dos rectas paralelas**.",
        "Por **un punto y una recta** que no se pertenecen.",
      ] },
      { kind: "rule", title: "En el sistema diédrico", text: "El plano se define normalmente por sus **trazas**. Si está dado de otra forma, se hallan sus trazas, que son los **lugares geométricos de las trazas de todas las rectas** contenidas en él." },
    ], undefined, "stack"),
    ...construccionPasos("plano-dos-rectas"),
    slide("proyectantes", "Planos proyectantes", [
      { kind: "text", text: "Un plano **proyectante** es perpendicular a uno de los planos de proyección. Son los planos más importantes: en la práctica se utilizan para **todas las construcciones auxiliares**." },
      { kind: "steps", items: [
        "**Proyectante horizontal** (perpendicular al $H$): su traza vertical $\\alpha_2$ es **perpendicular a la L.T.** y $\\alpha_1$ es cualquiera. Todo lo que contiene se proyecta horizontalmente **sobre $\\alpha_1$**.",
        "**Proyectante vertical** (perpendicular al $V$): su traza horizontal $\\beta_1$ es **perpendicular a la L.T.** y $\\beta_2$ es cualquiera. Todo lo que contiene se proyecta verticalmente **sobre $\\beta_2$**.",
      ] },
    ], undefined, "stack"),
    slide("paralelos", "Planos paralelos a los de proyección y de perfil", [
      { kind: "steps", items: [
        "**Plano horizontal** $\\omega(\\omega_2)$: paralelo al $H$. No tiene traza horizontal y su traza vertical es **paralela a la L.T.** Los elementos que contiene se proyectan horizontalmente en **verdadera magnitud**.",
        "**Plano frontal** $\\alpha(\\alpha_1)$: paralelo al $V$. No tiene traza vertical y su traza horizontal es **paralela a la L.T.** Lo que contiene se ve en verdadera magnitud en el alzado.",
        "**Plano de perfil** $\\beta(\\beta_1\\text{-}\\beta_2)$: perpendicular a los dos planos de proyección y a la L.T. Sus dos trazas están **confundidas** en una sola recta perpendicular a la L.T.",
      ] },
    ], undefined, "stack"),
  ],
};
