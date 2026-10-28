import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const maderaTablerosDespiece2esoLesson: InteractiveLesson = {
  slug: "madera-tableros-despiece-2eso",
  title: "3. Madera, tableros y despiece",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "De la madera a los tableros", [
      { kind: "steps", items: [
        "**Madera maciza**: del tronco (pino, roble, haya). Se trabaja bien, pero se **hincha y se curva** con la humedad.",
        "**Contrachapado**: láminas encoladas con las **fibras cruzadas**; estable y resistente.",
        "**Aglomerado**: virutas prensadas con cola; barato, pero se deshace con el agua.",
        "**MDF**: fibras finas prensadas; superficie lisa, ideal para pintar y fresar.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Por qué el contrachapado es estable", [
      { kind: "text", text: "Al cruzar las fibras, cada capa frena la deformación de la siguiente." },
    ], anim("contrachapado-capas"), "text-top"),
    slide("deriv", "Elige el tablero", [
      { kind: "text", text: "Compara los tableros según su uso, su resistencia y su resistencia a la humedad." },
    ], tool("madera-derivados-explorador"), "visual-top"),
    slide("despiece", "Despiece: aprovechar el tablero", [
      { kind: "text", text: "El **despiece** es el plan de corte: cómo se reparten las piezas sobre el tablero para desperdiciar lo mínimo. Cambia el tamaño de la pieza y prueba a girarla." },
    ], tool("eso2-despiece-tablero-explorador"), "visual-top"),
    calc("calc-piezas", "Cuántas piezas salen", "De un tablero de 2 440 × 1 220 mm, se cortan piezas de 400 × 300 mm (con 3 mm de corte). ¿Cuántas piezas salen sin girarlas?", nums(24), "A lo largo: 6 piezas (6 · 403 ≤ 2 443); a lo ancho: 4 piezas (4 · 303 ≤ 1 223). 6 · 4 = 24.", "Calcula cuántas caben en cada dirección y multiplica."),
    sort("clasifica-madera", "Natural o derivado", "Clasifica cada material.",
      [["nat", "Madera natural", "emerald"], ["der", "Tablero derivado", "amber"]],
      [["Pino", "nat"], ["Roble", "nat"], ["Haya", "nat"], ["Contrachapado", "der"], ["MDF", "der"], ["Aglomerado", "der"]],
      "Los derivados se fabrican con láminas, virutas o fibras unidas con cola.",
    ),
    pick("check-humedad", "Un mueble de baño", "¿Qué tablero te parece menos adecuado para un mueble de baño sin proteger?",
      "Aglomerado normal, porque se hincha y deshace con la humedad",
      [["Contrachapado marino", "Está fabricado para resistir la humedad."], ["Tablero hidrófugo", "Está tratado contra la humedad."], ["Plástico", "No se ve afectado por el agua."]],
      "La humedad es el gran enemigo de los tableros de virutas y fibras sin tratar.",
    ),
  ],
};
