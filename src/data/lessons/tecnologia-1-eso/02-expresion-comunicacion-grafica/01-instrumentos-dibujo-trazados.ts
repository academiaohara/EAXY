import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const instrumentosDibujoTrazadosLesson: InteractiveLesson = {
  slug: "instrumentos-dibujo-trazados",
  title: "1. Instrumentos de dibujo y trazados básicos",
  subtitle: TECESO1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("lenguaje", "El dibujo técnico es un lenguaje universal", [
      { kind: "definition", text: "El **dibujo técnico** es el lenguaje con el que se comunican las ideas y las medidas de los objetos. Sus reglas están **normalizadas** para que cualquier persona lo interprete igual." },
      { kind: "text", text: "Un plano de una pieza hecho en Madrid puede fabricarse en Tokio sin hablar el mismo idioma: solo hay que saber leerlo." },
    ], undefined, "stack"),
    slide("instrumentos", "Los instrumentos del dibujo técnico", [
      { kind: "steps", items: [
        "**Regla graduada**: traza rectas y mide longitudes en milímetros.",
        "**Escuadra y cartabón**: dos triángulos rectángulos. La escuadra tiene ángulos de 45°-45°-90°; el cartabón, de 30°-60°-90°. Sirven para trazar paralelas y perpendiculares.",
        "**Compás**: dibuja circunferencias y arcos, y transporta medidas.",
        "**Transportador de ángulos**: mide y traza ángulos en grados.",
        "**Lápiz** (HB o 2H para trazos finos, B o 2B para trazos gruesos) y **goma**.",
      ] },
      { kind: "warning", title: "Ojo", text: "Un dibujo limpio empieza por un lápiz bien afilado y una hoja sin arrugas. Un trazo grueso e inseguro puede cambiar una medida varios milímetros." },
    ]),
    sort("clasifica-instrumento", "¿Qué instrumento uso?", "Elige el instrumento adecuado para cada trabajo.",
      [["reg", "Regla", "cobalt"], ["esc", "Escuadra o cartabón", "emerald"], ["com", "Compás", "amber"], ["tra", "Transportador", "violet"]],
      [["Medir 85 mm", "reg"], ["Trazar una recta de 12 cm", "reg"], ["Trazar una perpendicular", "esc"], ["Trazar paralelas", "esc"], ["Dibujar un círculo de 3 cm de radio", "com"], ["Marcar el punto medio con arcos", "com"], ["Dibujar un ángulo de 70°", "tra"], ["Medir un ángulo", "tra"]],
      "La regla mide; escuadra y cartabón trazan paralelas y perpendiculares; el compás hace arcos y circunferencias; el transportador mide ángulos.",
    ),
    slide("paralela", "Paralelas con escuadra y cartabón", [
      { kind: "definition", text: "Dos rectas son **paralelas** si nunca se cortan: mantienen siempre la misma distancia. Son **perpendiculares** si se cortan formando un ángulo de 90°." },
      { kind: "text", text: "Mira cómo se traza una paralela por un punto deslizando un cartabón a lo largo de una escuadra." },
    ], anim("trazo-paralela-escuadra"), "split"),
    slide("explora", "Paralela, perpendicular y mediatriz", [
      { kind: "text", text: "Cambia la inclinación de la recta y comprueba que los trazados se adaptan siempre igual. La **mediatriz** es la perpendicular que pasa por el punto medio de un segmento." },
    ], tool("trazados-basicos-explorador", { n: 0 }), "visual-top"),
    pick("check-perpendicular", "Ángulo entre rectas", "Con la escuadra apoyas un cateto en una recta y trazas por el otro cateto. ¿Qué has dibujado?",
      "Una recta perpendicular a la primera, a 90°",
      [["Una recta paralela a la primera", "Para la paralela se desliza la escuadra a lo largo de otra pieza, sin girarla."], ["Una recta a 45° de la primera", "Los catetos de la escuadra forman 90° entre sí; 45° es el ángulo de sus otras esquinas."], ["Una mediatriz del segmento", "Solo sería mediatriz si pasara por el punto medio de un segmento."]],
      "Los dos catetos de la escuadra forman un ángulo recto, así que la línea trazada es perpendicular a la primera.",
    ),
    pick("check-mediatriz", "La mediatriz", "¿Qué propiedad tiene cada punto de la mediatriz de un segmento AB?",
      "Está a la misma distancia de A que de B",
      [["Está más cerca de A que de B", "Eso ocurre a un lado de la mediatriz, no sobre ella."], ["Está sobre el segmento AB", "La mediatriz corta al segmento solo en el punto medio."], ["Es paralelo al segmento AB", "La mediatriz es perpendicular, no paralela."]],
      "La mediatriz es el conjunto de puntos que equidistan de los dos extremos del segmento.",
    ),
  ],
};
