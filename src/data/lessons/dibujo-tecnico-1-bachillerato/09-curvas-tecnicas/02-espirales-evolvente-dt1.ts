import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const espiralesEvolventeDt1Lesson: InteractiveLesson = {
  slug: "espirales-evolvente-dt1",
  title: "2. Voluta, espiral y hélice",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("espirales", "Voluta, espiral de Arquímedes y hélice", [
      { kind: "definition", text: "La **voluta** es una curva formada por arcos de circunferencia tangentes entre sí, siendo los centros sucesivos de estos arcos los vértices de un polígono determinado: un triángulo, un cuadrado…" },
      { kind: "definition", text: "La **espiral de Arquímedes** es la curva que describe un punto que se aleja del centro con velocidad uniforme mientras gira. El **paso** es lo que aumenta el radio en una vuelta completa." },
      { kind: "text", text: "La **hélice cilíndrica** es una curva alabeada (no plana) situada sobre un cilindro de revolución: su proyección horizontal es la circunferencia de la base y la vertical se obtiene con la **ley de generación**: base y paso se dividen en el mismo número de partes. El **paso** $p$ es la altura que asciende el punto en un giro completo." },
    ]),
    ...construccionPasos("voluta", "espiral-arquimedes", "helice"),
  ],
};
