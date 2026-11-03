import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const cubiertasPlanosAcotadosDt1Lesson: InteractiveLesson = {
  slug: "cubiertas-planos-acotados-dt1",
  title: "3. Intersección de planos. Cubiertas",
  subtitle: DT1_SUBTITLES[13],
  stage: { theme: "board" },
  steps: [
    slide("interseccion", "Intersección de dos planos", [
      { kind: "text", text: "Sean dos planos definidos por su l.m.p. graduada. La **recta intersección** está formada por los puntos de intersección de las **parejas de horizontales de la misma cota**, ya que al cortar por un plano horizontal se obtienen las horizontales citadas en cada plano." },
    ], undefined, "stack"),
    ...construccionPasos("acotados-interseccion"),
    slide("paralelas", "Cuando las l.m.p. son paralelas", [
      { kind: "text", text: "Cuando las **trazas** de los dos planos con el plano del cuadro son **paralelas**, no puede seguirse ese procedimiento. Se **abaten las dos l.m.p.** como si se quisieran hallar los ángulos $\\alpha$ y $\\beta$ que los planos forman con el cuadro; el punto de intersección $V_0$ define la recta intersección, que es **horizontal** en este caso. Su cota se halla midiendo en centímetros la distancia de $V_0$ a la recta $AB$." },
    ], undefined, "stack"),
    ...construccionPasos("acotados-interseccion-paralelas"),
    slide("arista-gotera", "Arista y gotera", [
      { kind: "text", text: "Según la posición de los planos respecto al plano del cuadro forman una **arista** o una **gotera**. Las vertientes de los lados opuestos de un tejado rectangular forman arista; en la gotera, las cotas de las l.m.p. de los planos **aumentan al alejarse** de la intersección, y en la arista ocurre lo contrario." },
    ], undefined, "stack"),
    slide("cubiertas", "Aplicación: cubiertas de edificios", [
      { kind: "text", text: "El caso práctico de la intersección de planos es la determinación de las **vertientes de un tejado** a partir de la planta del edificio, que se supone situada en la parte superior de éste, es decir, como techo del último piso." },
      { kind: "steps", items: [
        "Se determinan las **intersecciones de cada plano inclinado** que parte de un lado del polígono de la planta, conocida la **pendiente** de esos planos.",
        "Ejemplo: fachadas principales $p = 1/2$, $i = 2$; fachadas posteriores $p = 3/2$, $i = 2/3$.",
      ] },
      { kind: "text", text: "Este sistema, **determinado y reversible**, permite resolver cualquier problema del espacio: representar cuerpos, seccionarlos y hacer todo tipo de operaciones con ellos." },
    ], undefined, "stack"),
    ...construccionPasos("acotados-cubierta"),
  ],
};
