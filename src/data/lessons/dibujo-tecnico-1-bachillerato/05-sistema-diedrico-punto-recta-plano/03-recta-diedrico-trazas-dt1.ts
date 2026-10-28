import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const rectaDiedricoTrazasDt1Lesson: InteractiveLesson = {
  slug: "recta-diedrico-trazas-dt1",
  title: "3. Representación de la recta. Trazas",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una recta, dos proyecciones", [
      { kind: "steps", items: [
        "Una recta queda definida por **dos puntos**. Sus proyecciones son la recta **a′b′** (vertical) y la recta **ab** (horizontal).",
        "Las **trazas** son los puntos donde la recta **atraviesa los planos de proyección**.",
        "**Traza horizontal H**: corte con el **PH** (**cota 0**). Su proyección vertical h′ está en la **LT**.",
        "**Traza vertical V**: corte con el **PV** (**alejamiento 0**). Su proyección horizontal v está en la **LT**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Dibuja una recta y halla sus trazas", [
      { kind: "text", text: "Mueve las posiciones de A y B. Observa las trazas y por qué cuadrantes pasa la recta." },
    ], tool("dt1-recta-diedrico-explorador"), "visual-top"),
    slide("hallar", "Cómo se obtienen", [
      { kind: "steps", items: [
        "**Traza horizontal**: se prolonga **a′b′** hasta cortar la **LT** en h′; se baja la línea de referencia y se corta con **ab** para obtener **h**.",
        "**Traza vertical**: se prolonga **ab** hasta la **LT** en v; se sube la referencia y se corta con **a′b′** para obtener **v′**.",
        "Entre las trazas la recta está en el **1.er cuadrante** si H está en el PH anterior y V en el PV superior.",
        "Si H y V están en el mismo semiplano, la recta **atraviesa** otros cuadrantes: al cruzar un plano de proyección cambia de cuadrante.",
      ] },
    ]),
    calc("calc-h", "Traza horizontal", "La recta pasa por A(x = −3, alejamiento 1, cota 4) y B(x = 3, alejamiento 4, cota 1). Su traza horizontal tiene cota 0: la cota baja 3 cm cuando x avanza 6 cm, así que desde A hay que avanzar 8 cm para bajar los 4 cm. ¿Cuál es la coordenada x de H?", nums(5), "x = −3 + 8 = 5 cm; el alejamiento de H es 1 + 4 = 5 cm.", "Avanzas 8 cm: x pasa de −3 a 5."),
    calc("calc-v", "Traza vertical", "En esa misma recta, la traza vertical tiene alejamiento 0: el alejamiento sube 3 cm cuando x avanza 6 cm, así que desde A hay que retroceder 2 cm. ¿Qué cota tiene V, en cm?", nums(5), "Retrocediendo 2 cm en x (un tercio de AB hacia atrás) la cota sube 1 cm: 4 + 1 = 5 cm. V = (−5; 0; 5).", "Retroceder 2 cm en x es −1/3 de la longitud AB: la cota sube 1."),
    sort("clasifica-trazas", "¿Dónde está la traza?", "Asocia cada propiedad con la traza correspondiente.",
      [["hor", "Traza horizontal H", "cobalt"], ["ver", "Traza vertical V", "amber"]],
      [["Está en el PH", "hor"], ["Tiene cota 0", "hor"], ["Su proyección vertical está en la LT", "hor"], ["Está en el PV", "ver"], ["Tiene alejamiento 0", "ver"], ["Su proyección horizontal está en la LT", "ver"]],
      "Cada traza tiene una de sus proyecciones sobre la línea de tierra.",
    ),
    pick("check-paralela", "Sin traza", "¿Qué tipo de recta no tiene traza horizontal?",
      "La recta horizontal (paralela al PH), que no corta al PH",
      [["La recta oblicua", "Corta a los dos planos."], ["La recta vertical", "Corta al PH en un punto."], ["Ninguna: todas las rectas tienen las dos trazas", "Las paralelas a un plano no lo cortan."]],
      "Una recta paralela a un plano de proyección no lo corta, así que no tiene esa traza.",
    ),
  ],
};
