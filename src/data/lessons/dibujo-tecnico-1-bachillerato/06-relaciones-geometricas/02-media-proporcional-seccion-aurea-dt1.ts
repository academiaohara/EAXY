import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const mediaProporcionalSeccionAureaDt1Lesson: InteractiveLesson = {
  slug: "media-proporcional-seccion-aurea-dt1",
  title: "2. Media proporcional. Sección áurea",
  subtitle: DT1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    ...construccionPasos("medio-proporcional", "medio-proporcional-suma"),

    slide("aurea", "La sección áurea", [], bench("aurea-compas", [
      { title: "Perpendicular de longitud AB/2", text: "Un segmento se divide en **media y extrema razón** si el total es a la parte mayor como la mayor es a la menor. En $B$ levanta una perpendicular $BC$ de longitud **$AB/2$**.", fact: "BC = AB / 2" },
      { title: "Une A con C", text: "Con la regla, traza la hipotenusa $AC$." },
      { title: "Arco desde C", text: "Con centro en $C$ y radio $CB$, traza un arco que corta a $AC$ en $D$." },
      { title: "Arco desde A", text: "Con centro en $A$ y radio $AD$, traza un arco que corta a $AB$ en $E$." },
      { title: "El número áureo", text: "$E$ divide $AB$ en media y extrema razón: $\\dfrac{AB}{AE} = \\dfrac{AE}{EB} = \\varphi = \\dfrac{1+\\sqrt{5}}{2} \\approx 1{,}618$. Aparece en la arquitectura clásica, el diseño y la naturaleza.", fact: "φ ≈ 1,618" },
    ]), "stack"),

    benchTask("aurea-construye", "Construye la sección áurea", "aurea-practica", [
      { title: "Toma la medida CB", text: "Toca $C$ para clavar la punta y $B$ para colocar la mina.", fact: "Abertura = CB" },
      { title: "Clava la punta en C", text: "Toca el vértice $C$." },
      { title: "Corta la hipotenusa", text: "Arrastra la mina para trazar un arco que **corte a $AC$**: ese corte es $D$." },
      { title: "Toma la medida AD", text: "Toca $A$ y luego $D$ para tomar la distancia $AD$.", fact: "Abertura = AD" },
      { title: "Clava la punta en A", text: "Toca el vértice $A$." },
      { title: "Corta el segmento", text: "Arrastra la mina para trazar un arco que **corte a $AB$**." },
      { title: "Marca E", text: "Toca el punto donde el arco corta a $AB$: es $E$." },
    ], {
      question: "Divide el segmento AB en media y extrema razón (sección áurea) con regla y compás.",
      hint: "Arco de centro C y radio CB hasta AC; arco de centro A y radio AD hasta AB.",
      explanation: "La construcción da AE = AB/φ ≈ 0,618 · AB: el punto E divide AB en media y extrema razón.",
    }),
  ],
};
