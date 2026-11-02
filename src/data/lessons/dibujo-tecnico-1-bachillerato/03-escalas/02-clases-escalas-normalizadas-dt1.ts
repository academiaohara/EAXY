import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const clasesEscalasNormalizadasDt1Lesson: InteractiveLesson = {
  slug: "clases-escalas-normalizadas-dt1",
  title: "2. Clases de escalas y escalas normalizadas",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("clases", "Clases de escalas", [], bench("escala-clases", [
      { title: "Escala de reducción", text: "Cuando el dibujo es **menor** que el cuerpo real ($E < 1$) la escala es **de reducción**: 1:2, 1:5, 1:10, 1:20, 1:50, 1:100…", fact: "El primer número es menor que el segundo" },
      { title: "Escala natural", text: "En la **escala natural** el dibujo se hace con las medidas reales, sin reducción ni ampliación. Se indica así: $E = 1:1$.", fact: "E = 1:1" },
      { title: "Escala de ampliación", text: "Cuando el dibujo es **mayor** que el cuerpo real ($E > 1$) la escala es **de ampliación**: 2:1, 5:1, 10:1.", fact: "El primer número es mayor que el segundo" },
    ]), "stack"),

    slide("normalizadas", "Escalas normalizadas (Tabla 1)", [], bench("escalas-normalizadas", [
      { title: "Fabricación e instalaciones", text: "Las escalas que deben utilizarse están **normalizadas**. Para **fabricación e instalaciones**: 1:2, 1:5, 1:10, 1:20, 1:50, 1:100 y 1:200.", fact: "De 1:2 a 1:200" },
      { title: "Construcciones civiles", text: "Para **construcciones civiles**: 1:5, 1:10, 1:20, 1:50, 1:100, 1:200, 1:500 y 1:1 000.", fact: "De 1:5 a 1:1 000" },
      { title: "Topografía", text: "En **topografía** se usan las más reducidas: de 1:100 hasta **1:50 000** (1:100, 1:200, 1:500, 1:1 000, 1:2 000, 1:5 000, 1:10 000, 1:25 000 y 1:50 000).", fact: "Hasta 1:50 000" },
      { title: "Ampliación", text: "Las escalas normalizadas **de ampliación** son tres: **2:1, 5:1 y 10:1**.", fact: "2:1, 5:1, 10:1" },
      { title: "Permitidas, no recomendadas", text: "Se permite, aunque no se recomienda, el uso de 1:2,5, 1:25, 1:250 y 1:2 500 y, en urbanismo, 1:1 000 y 1:10 000.", fact: "Mejor, las normalizadas" },
    ]), "stack"),

    slide("detalles", "Detalles que hay que tener en cuenta", [], bench("escala-detalles", [
      { title: "En la rotulación", text: "Todas las escalas empleadas se indican en la **rotulación**, destacando la **principal** con caracteres de mayor tamaño. Las secundarias se indican también en las partes correspondientes del dibujo.", fact: "Principal: tamaño mayor" },
      { title: "Todo a escala", text: "En general, **todo se dibuja a escala**. Las cotas que no estén a escala se deben **subrayar**.", fact: "Cota no a escala: subrayada" },
      { title: "Cotas reales", text: "Sobre un plano dibujado a escala, las cifras de cota son **siempre las reales**, es decir, las medidas reales de la pieza.", fact: "Cota = medida real" },
    ]), "stack"),
  ],
};
