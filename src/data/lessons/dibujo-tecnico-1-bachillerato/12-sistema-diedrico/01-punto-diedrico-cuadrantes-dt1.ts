import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const puntoDiedricoCuadrantesDt1Lesson: InteractiveLesson = {
  slug: "punto-diedrico-cuadrantes-dt1",
  title: "1. Representación del punto. Alejamiento y cota",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un punto, dos proyecciones", [
      { kind: "steps", items: [
        "La **proyección horizontal** (a) es el pie de la perpendicular al **PH**. La **proyección vertical** (a′) es el pie de la perpendicular al **PV**.",
        "El **alejamiento** es la distancia al **PV** (positivo delante); la **cota**, la distancia al **PH** (positiva encima).",
        "En la **épura**, a′ está a una distancia igual a la cota de la LT, y a a una distancia igual al alejamiento.",
        "Las dos proyecciones están en la **misma línea de referencia** (perpendicular a la LT).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Coloca el punto", [
      { kind: "text", text: "Cambia el alejamiento y la cota. Identifica el cuadrante y observa en qué lado de la LT queda cada proyección." },
    ], tool("dt1-diedrico-punto-explorador"), "visual-top"),
    slide("cuadrantes", "Cuadrantes y posiciones especiales", [
      { kind: "steps", items: [
        "**1.º**: alejamiento **+**, cota **+**. a′ sobre la LT, a bajo la LT.",
        "**2.º**: alejamiento **−**, cota **+**. a′ y a quedan **sobre** la LT.",
        "**3.º**: alejamiento **−**, cota **−**. a′ bajo la LT y a sobre ella: **invertidas**.",
        "**4.º**: alejamiento **+**, cota **−**. a′ y a quedan **bajo** la LT.",
        "**Cota 0**: el punto está en el PH, y a′ en la LT. **Alejamiento 0**: está en el PV, y a en la LT. Ambas a la vez: en la **LT**.",
      ] },
    ]),
    calc("calc-sep", "Distancia entre proyecciones", "Un punto del 1.er cuadrante tiene alejamiento 3 cm y cota 4 cm. ¿A qué distancia están a y a′ en la épura, en cm?", nums(7), "a′ está 4 cm sobre la LT y a, 3 cm bajo ella: 4 + 3 = 7 cm.", "Suma las dos distancias."),
    calc("calc-q2", "Cuadrante", "Un punto tiene alejamiento −2 y cota 3. ¿En qué cuadrante está? (número)", nums(2), "Alejamiento negativo (detrás del PV) y cota positiva: 2.º cuadrante.", "Mira los signos."),
    calc("calc-q4", "Otro cuadrante", "Un punto tiene cota −3 y alejamiento 5. ¿En qué cuadrante está? (número)", nums(4), "Delante del PV (+) y bajo el PH (−): 4.º cuadrante.", "Mira los signos."),
    sort("clasifica-puntos", "¿En qué cuadrante?", "Clasifica cada punto (alejamiento, cota).",
      [["c1", "1.er cuadrante", "cobalt"], ["c2", "2.º cuadrante", "amber"], ["c3", "3.er cuadrante", "emerald"], ["c4", "4.º cuadrante", "rose"]],
      [["(+3, +2)", "c1"], ["(+1, +5)", "c1"], ["(−2, +4)", "c2"], ["(−1, +1)", "c2"], ["(−3, −2)", "c3"], ["(−4, −1)", "c3"], ["(+2, −3)", "c4"], ["(+5, −1)", "c4"]],
      "El primer signo es el del alejamiento y el segundo, el de la cota.",
    ),
    pick("check-lt", "En la línea de tierra", "Un punto tiene alejamiento 0 y cota 0. ¿Dónde están sus proyecciones?",
      "Las dos coinciden sobre la línea de tierra",
      [["a′ en la LT y a bajo la LT", "Su alejamiento es 0."], ["Las dos en el 1.º cuadrante", "No están en ningún cuadrante."], ["No tiene proyecciones", "Siempre tiene."]],
      "Con alejamiento y cota nulos, el punto está en la LT y se proyecta sobre sí mismo.",
    ),
  ],
};
