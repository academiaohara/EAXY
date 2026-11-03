import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const ovaloOvoideDt1Lesson: InteractiveLesson = {
  slug: "ovalo-ovoide-dt1",
  title: "1. Óvalo y ovoide",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("ovalo", "Óvalo y ovoide", [
      { kind: "definition", text: "El **óvalo** es una curva cerrada formada por arcos de circunferencia y **simétrica respecto a dos ejes perpendiculares**. Su aplicación práctica más importante en dibujo industrial es el trazado de perspectivas, porque puede sustituir a una elipse de forma aproximada." },
      { kind: "definition", text: "El **ovoide** es una curva cerrada formada por arcos de circunferencia y **simétrica respecto a un solo eje**. Se utiliza en arquitectura y, esporádicamente, aparece en dibujo industrial." },
      { kind: "text", text: "En ambas curvas los arcos se enlazan **con tangencia**: los puntos de enlace están siempre sobre la recta que une los centros de los dos arcos. Por eso la clave del trazado es hallar bien los **centros** y los **puntos de tangencia**." },
    ]),
    ...construccionPasos("ovalo-eje-mayor", "ovalo-eje-menor", "ovalo-cuatro-centros", "ovoide-eje-mayor", "ovoide-eje-menor"),
  ],
};
