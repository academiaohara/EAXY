import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const hiperbolaDt1Lesson: InteractiveLesson = {
  slug: "hiperbola-dt1",
  title: "2. La hipérbola",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("hiperbola", "La hipérbola: definición y elementos", [
      { kind: "definition", text: "La **hipérbola** es una curva plana, abierta y de **dos ramas**: el lugar geométrico de los puntos cuya **diferencia de distancias** a dos puntos fijos, los focos $F$ y $F'$, es constante e igual a $2a$, la longitud del eje real $AB$." },
      { kind: "facts", items: [
        { tex: "r - r' = 2a", label: "Radios vectores" },
        { tex: "c^2 = a^2 + b^2", label: "Semiejes y semidistancia focal" },
        { tex: "AB = 2a,\\; CD = 2b,\\; FF' = 2c", label: "Eje real, eje imaginario y distancia focal" },
      ] },
      { kind: "text", text: "El eje $CD$ se llama **imaginario** porque no tiene puntos comunes con la curva. Las **asíntotas** son las tangentes a la curva en el infinito: son simétricas respecto de los ejes y pasan por el centro $O$ y por el extremo de la altura $b$ levantada en el vértice. La circunferencia principal es el lugar de los pies de las perpendiculares desde los focos a las tangentes." },
    ]),
    ...construccionPasos("hiperbola-puntos", "hiperbola-envolventes"),
  ],
};
