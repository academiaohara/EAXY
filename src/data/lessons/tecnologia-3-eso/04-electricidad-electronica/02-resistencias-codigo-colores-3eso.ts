import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const resistenciasCodigoColores3esoLesson: InteractiveLesson = {
  slug: "resistencias-codigo-colores-3eso",
  title: "2. Resistencias fijas y código de colores",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "El componente más común", [
      { kind: "definition", text: "Una **resistencia** es un componente que limita la corriente o reparte tensiones. Es **pasiva** (no amplifica) y no tiene polaridad: se puede conectar en cualquier sentido." },
      { kind: "steps", items: [
        "Se mide en **ohmios (Ω)**; múltiplos: kΩ (1 000 Ω) y MΩ (1 000 000 Ω).",
        "La **potencia** que soporta se indica en vatios (1/4 W es lo habitual).",
        "Las más pequeñas llevan **bandas de colores** para indicar su valor.",
        "También existen resistencias **variables**: potenciómetros y trimmers.",
      ] },
    ], undefined, "stack"),
    slide("colores", "Lee el código de colores", [
      { kind: "text", text: "Elige los colores de las cuatro bandas y comprueba el valor y el margen de error." },
    ], tool("eso3-codigo-colores-explorador"), "visual-top"),
    slide("tabla", "Cómo se lee", [
      { kind: "steps", items: [
        "**Banda 1** y **banda 2**: las dos cifras (negro 0, marrón 1, rojo 2, naranja 3, amarillo 4, verde 5, azul 6, violeta 7, gris 8, blanco 9).",
        "**Banda 3**: el **multiplicador** (cuántos ceros hay que añadir).",
        "**Banda 4**: la **tolerancia** (oro ±5 %, plata ±10 %).",
        "Ejemplo: **amarillo-violeta-rojo-oro** = 47 · 100 = 4 700 Ω = 4,7 kΩ ±5 %.",
      ] },
    ]),
    calc("calc-valor", "Una resistencia", "Una resistencia tiene las bandas naranja, blanco, rojo y oro. ¿Cuántos kΩ vale? (cifras 3 y 9, multiplicador ×100)", nums(3.9), "39 · 100 = 3 900 Ω = 3,9 kΩ.", "Dos cifras y el multiplicador."),
    calc("calc-diez", "Marrón, negro, naranja", "¿Cuántos kΩ valen las bandas marrón, negro y naranja? (1, 0 y ×1 000)", nums(10), "10 · 1 000 = 10 000 Ω = 10 kΩ.", "Dos cifras y el multiplicador."),
    calc("calc-tol", "Margen de error", "Una resistencia de 1 000 Ω con tolerancia del 5 % puede valer como mínimo… (en Ω)", nums(950), "1 000 − 5 % de 1 000 = 950 Ω.", "Resta el 5 %."),
    sort("clasifica-resist", "Fija o variable", "Clasifica cada componente.",
      [["fij", "Resistencia fija", "cobalt"], ["var", "Resistencia variable", "amber"]],
      [["Resistencia de carbón de 1 kΩ", "fij"], ["Resistencia para limitar un LED", "fij"], ["Resistencia de 10 kΩ de bandas", "fij"], ["Potenciómetro del volumen", "var"], ["Trimmer de ajuste", "var"], ["LDR (depende de la luz)", "var"]],
      "Una resistencia fija mantiene su valor; las variables se ajustan a mano o con una magnitud (luz, temperatura).",
    ),
    pick("check-multiplicador", "El multiplicador", "En una resistencia, ¿qué indica la tercera banda?",
      "El factor por el que se multiplican las dos primeras cifras",
      [["El margen de error", "Eso lo indica la cuarta banda."], ["La potencia", "No se indica con bandas."], ["El fabricante", "No se indica."]],
      "El multiplicador indica cuántos ceros se añaden a las dos cifras.",
    ),
  ],
};
