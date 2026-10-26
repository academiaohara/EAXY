import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estabilidadEstructuras2esoLesson: InteractiveLesson = {
  slug: "estabilidad-estructuras-2eso",
  title: "3. Estabilidad y cimentación",
  subtitle: TECESO2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuándo vuelca una estructura", [
      { kind: "definition", text: "Una estructura es **estable** si no vuelca ni se hunde. Depende de la posición del **centro de gravedad**, del tamaño de la **base de apoyo** y de que el terreno aguante la presión." },
      { kind: "steps", items: [
        "Vuelca cuando la **vertical del centro de gravedad** sale de la base de apoyo.",
        "Una base **ancha** y un centro de gravedad **bajo** dan más estabilidad.",
        "El peso se transmite al terreno a través de la **cimentación** (zapatas, pilotes, losas).",
      ] },
    ], undefined, "stack"),
    slide("caminos", "El camino de las cargas", [
      { kind: "text", text: "Las cargas bajan desde el tejado hasta el suelo pasando por vigas, pilares y cimientos." },
    ], anim("camino-cargas"), "text-top"),
    slide("explora", "Inclina una estructura", [
      { kind: "text", text: "Cambia el ancho de la base y la altura del centro de gravedad y observa a qué ángulo vuelca." },
    ], tool("estabilidad-explorador", { a: 60, b: 120 }), "visual-top"),
    slide("presion", "La presión sobre el terreno", [
      { kind: "rule", title: "Presión", text: "El terreno solo soporta una presión máxima. Una **zapata ancha** reparte el peso en más superficie.", formula: "p = F / A" },
      { kind: "text", text: "Se mide en **pascales** (1 Pa = 1 N/m²). Por eso un pie de elefante se hunde menos que un tacón fino con el mismo peso." },
    ]),
    calc("calc-presion", "Presión de una zapata", "Una zapata de 0,5 m² soporta 20 000 N. ¿Qué presión ejerce sobre el suelo, en Pa?", nums(40000), "p = F / A = 20 000 / 0,5 = 40 000 Pa.", "p = F / A, con A en m²."),
    sort("clasifica-estable", "Más o menos estable", "Clasifica cada cambio.",
      [["mas", "Más estable", "emerald"], ["menos", "Menos estable", "rose"]],
      [["Ensanchar la base", "mas"], ["Bajar el centro de gravedad", "mas"], ["Ampliar la zapata", "mas"], ["Cargar peso en lo alto", "menos"], ["Estrechar la base", "menos"], ["Apoyar sobre terreno blando sin zapata", "menos"]],
      "Base ancha y centro de gravedad bajo dan estabilidad; peso en lo alto y base estrecha la reducen.",
    ),
    pick("check-torre", "Torre alta", "¿Por qué las torres altas tienen una base ancha?",
      "Para que el centro de gravedad quede dentro de la base aunque se incline un poco",
      [["Solo por estética", "Hay una razón física clara."], ["Para que pesen menos", "Una base ancha suele pesar más."], ["Para que vuelquen antes", "Justo lo contrario."]],
      "Cuanto más ancha es la base, mayor es el ángulo de inclinación antes del vuelco.",
    ),
  ],
};
