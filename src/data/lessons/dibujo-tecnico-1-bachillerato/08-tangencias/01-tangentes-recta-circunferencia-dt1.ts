import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const tangentesRectaCircunferenciaDt1Lesson: InteractiveLesson = {
  slug: "tangentes-recta-circunferencia-dt1",
  title: "1. Posiciones relativas y rectas tangentes",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("posiciones", "Posiciones relativas y tangencia", [
      { kind: "definition", text: "Una recta y una circunferencia, o dos circunferencias, son **tangentes** cuando tienen **un solo punto común**: el **punto de tangencia** $T$." },
      { kind: "compare",
        left: { title: "Recta y circunferencia", text: "Según la distancia $d$ del centro $O$ a la recta $r$:", math: ["d > R \\;\\Rightarrow\\; \\text{exteriores}", "d = R \\;\\Rightarrow\\; \\text{tangentes}", "d < R \\;\\Rightarrow\\; \\text{secantes}"] },
        right: { title: "Dos circunferencias", text: "Según la distancia $d$ entre centros:", math: ["d > R + R_1 \\;\\Rightarrow\\; \\text{exteriores}", "d = R + R_1 \\;\\Rightarrow\\; \\text{tangentes exteriores}", "d < R + R_1 \\;\\Rightarrow\\; \\text{secantes}", "d = R - R_1 \\;\\Rightarrow\\; \\text{tangentes interiores}", "d < R - R_1 \\;\\Rightarrow\\; \\text{interiores}", "d = 0 \\;\\Rightarrow\\; \\text{concéntricas}"] } },
      { kind: "rule", title: "Dos propiedades en las que se funda todo el tema", text: "**1.** Si dos circunferencias son tangentes, el punto de tangencia $T$ está en la **línea de centros**. **2.** Si una recta es tangente a una circunferencia, $T$ es el pie de la **perpendicular** trazada por el centro $O$ a la recta tangente." },
      { kind: "text", text: "Hay que recordar también que el **radio perpendicular a una cuerda** la divide en dos partes iguales, y que la **mediatriz de una cuerda pasa por el centro**. Para resolver un problema basta fijarse en los datos y en lo que se desea obtener, razonando el porqué de cada paso." },
    ]),
    ...construccionPasos("tangente-punto", "tangentes-paralelas", "tangente-sin-centro", "tangentes-punto-exterior", "tangente-comun-exterior", "tangente-comun-interior"),
  ],
};
