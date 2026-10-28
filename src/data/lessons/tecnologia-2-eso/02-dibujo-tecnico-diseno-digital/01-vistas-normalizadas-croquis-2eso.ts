import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const vistasNormalizadasCroquis2esoLesson: InteractiveLesson = {
  slug: "vistas-normalizadas-croquis-2eso",
  title: "1. Croquis y vistas normalizadas",
  subtitle: TECESO2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("croquis", "Del croquis al plano", [
      { kind: "steps", items: [
        "El **croquis** es un dibujo a mano alzada, rápido y sin instrumentos, para fijar una idea o tomar medidas de un objeto real.",
        "Un buen croquis respeta las **proporciones**, usa **líneas claras** y lleva las **cotas** esenciales.",
        "El **plano** es el dibujo definitivo: se hace con instrumentos o con CAD, a **escala** y con **normas**.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Las vistas de una pieza", [
      { kind: "text", text: "Una pieza se describe con tres vistas principales, colocadas según el sistema europeo." },
    ], anim("eso2-vistas-europeo"), "text-top"),
    slide("explora", "Construye una pieza y mira sus vistas", [
      { kind: "text", text: "Cambia la altura de cada columna y observa cómo se transforman las tres vistas." },
    ], tool("eso2-pieza-vistas-explorador"), "visual-top"),
    slide("lineas", "Tipos de líneas normalizadas", [
      { kind: "steps", items: [
        "**Línea gruesa continua**: contornos y aristas visibles.",
        "**Línea fina continua**: cotas, líneas de referencia y rayados.",
        "**Línea de trazos**: aristas ocultas (lo que no se ve desde esa vista).",
        "**Línea de trazo y punto**: ejes de simetría y centros de agujeros.",
      ] },
    ]),
    calc("calc-cubos", "Cuántos cubos", "Una pieza tiene una base de 3 × 2 × 1 cubos y una torre de 2 cubos más sobre una casilla. ¿Cuántos cubos tiene en total?", nums(8), "La base tiene 3 · 2 · 1 = 6 cubos y la torre añade 2: en total 8.", "Suma los cubos de cada parte."),
    sort("clasifica-vista", "¿Qué vista es?", "Relaciona cada descripción con la vista.",
      [["alz", "Alzado", "cobalt"], ["pla", "Planta", "emerald"], ["per", "Perfil", "violet"]],
      [["Se mira la pieza de frente", "alz"], ["Es la vista principal", "alz"], ["Se mira desde arriba", "pla"], ["Se dibuja debajo del alzado", "pla"], ["Se mira desde un lado", "per"], ["El izquierdo se dibuja a la derecha del alzado", "per"]],
      "Alzado (frente), planta (arriba) y perfil (lado) se disponen alineados en el sistema europeo.",
    ),
    pick("check-linea", "Una arista oculta", "¿Cómo se dibuja en una vista una arista que no se ve desde ese lado?",
      "Con línea de trazos",
      [["Con línea gruesa continua", "Esa es para aristas visibles."], ["No se dibuja", "Se dibuja para describir la pieza completa."], ["Con línea de trazo y punto", "Esa es para ejes y centros."]],
      "Las aristas ocultas se representan con línea de trazos finos.",
    ),
  ],
};
