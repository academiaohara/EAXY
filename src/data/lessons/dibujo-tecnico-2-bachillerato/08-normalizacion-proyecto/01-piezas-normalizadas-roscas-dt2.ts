import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const piezasNormalizadasRoscasDt2Lesson: InteractiveLesson = {
  slug: "piezas-normalizadas-roscas-dt2",
  title: "1. Piezas industriales normalizadas: roscas y tornillos",
  subtitle: DT2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Elementos que no se diseñan cada vez", [
      { kind: "steps", items: [
        "Las **piezas normalizadas** (tornillos, tuercas, arandelas, pasadores, rodamientos, chavetas…) tienen **dimensiones y designación fijadas por norma**.",
        "Ventajas: son **intercambiables**, se **compran** en lugar de fabricarse, abaratan el producto y facilitan el mantenimiento.",
        "En un plano no se dibujan con todo detalle: se usa una **representación simplificada** y se **designan** (por ejemplo, «Tornillo M10×40»).",
        "La **rosca métrica** se designa con **M**, el **diámetro nominal** y, si lo lleva, el **paso**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una rosca métrica", [
      { kind: "text", text: "Elige el diámetro de la rosca y la longitud roscada. Mira el paso, el diámetro del núcleo y la broca." },
    ], tool("dt2-rosca-metrica-explorador"), "visual-top"),
    slide("repre", "Cómo se dibuja una rosca", [
      { kind: "steps", items: [
        "En la **vista lateral**: **línea gruesa** en el diámetro exterior y **fina** en el diámetro del núcleo; la línea de fin de rosca es gruesa.",
        "En la **vista frontal**: un **círculo grueso** (diámetro exterior) y un **arco fino de tres cuartos** (núcleo).",
        "En una rosca **interior** (agujero) es al revés: el diámetro del **núcleo** (el menor) va en línea gruesa y el exterior en fina.",
        "El **paso** es la distancia entre dos crestas consecutivas; con él se elige la broca del agujero previo.",
      ] },
    ]),
    calc("calc-broca", "Broca para M10", "Para roscar un agujero M10 de paso grueso (1,5 mm), la broca previa es aproximadamente d − P. ¿Cuántos mm mide?", nums(8.5), "10 − 1,5 = 8,5 mm.", "Resta el paso del diámetro."),
    calc("calc-nucleo", "Núcleo de M8", "Una rosca M8 tiene paso 1,25 mm. ¿Cuál es el diámetro del núcleo d − 1,2269·P, en mm? (dos decimales)", nums(6.47, 6.466), "8 − 1,2269 · 1,25 ≈ 6,47 mm.", "Multiplica el paso por 1,2269."),
    sort("clasifica", "Representación de roscas", "Clasifica cada trazo de una rosca exterior (tornillo) según su tipo de línea.",
      [["gru", "Línea gruesa", "cobalt"], ["fin", "Línea fina", "amber"]],
      [["Diámetro exterior en vista lateral", "gru"], ["Círculo exterior en vista frontal", "gru"], ["Límite de la parte roscada", "gru"], ["Diámetro del núcleo en vista lateral", "fin"], ["Arco de tres cuartos en vista frontal", "fin"], ["Fondo de los filetes", "fin"]],
      "En una rosca exterior, grueso para el diámetro mayor y fino para el núcleo.",
    ),
    pick("check", "Designación", "¿Qué significa «M12» en la designación de un tornillo?",
      "Rosca métrica de 12 mm de diámetro nominal",
      [["Material de 12 kg", "M no es material."], ["Medida de 12 cm de longitud", "El diámetro es 12 mm."], ["Mecanizado de clase 12", "No es esa su función."]],
      "M indica rosca métrica ISO y 12 el diámetro nominal en mm.",
    ),
  ],
};
