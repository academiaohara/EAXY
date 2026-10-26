import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const puertasLogicas3esoLesson: InteractiveLesson = {
  slug: "puertas-logicas-3eso",
  title: "4. Puertas lógicas",
  subtitle: TECESO3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Decisiones con 0 y 1", [
      { kind: "definition", text: "Una **puerta lógica** es un circuito que recibe una o más entradas digitales (0 o 1) y da una salida según una regla. Con ellas se construyen las decisiones de cualquier sistema digital." },
      { kind: "steps", items: [
        "**AND**: salida 1 si **todas** las entradas son 1.",
        "**OR**: salida 1 si **alguna** entrada es 1.",
        "**NOT**: **invierte** la entrada.",
        "**NAND**, **NOR**: AND y OR seguidas de un NOT.",
        "**XOR**: salida 1 si las entradas son **distintas**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prueba cada puerta", [
      { kind: "text", text: "Elige una puerta, cambia las entradas y observa la tabla de verdad." },
    ], tool("eso3-puertas-explorador"), "visual-top"),
    slide("tabla", "La tabla de verdad", [
      { kind: "text", text: "La **tabla de verdad** recoge la salida para todas las combinaciones de entradas. Con **n** entradas hay **2ⁿ** combinaciones: 4 con dos entradas, 8 con tres." },
    ]),
    calc("calc-and", "Salida de un AND", "Una puerta AND recibe A = 1 y B = 0. ¿Cuál es la salida (0 o 1)?", nums(0), "AND da 1 solo si las dos entradas son 1: la salida es 0.", "Las dos deben ser 1."),
    calc("calc-nor", "Salida de un NOR", "Una puerta NOR recibe A = 0 y B = 0. ¿Cuál es la salida (0 o 1)?", nums(1), "OR(0,0) = 0 y NOT 0 = 1: la salida es 1.", "OR y después NOT."),
    calc("calc-comb", "Combinaciones", "Una tabla de verdad con 3 entradas, ¿cuántas filas tiene? (2³)", nums(8), "2³ = 8 combinaciones.", "2 elevado al número de entradas."),
    sort("clasifica-puerta", "¿Qué puerta es?", "Relaciona cada descripción con su puerta.",
      [["and", "AND", "cobalt"], ["or", "OR", "amber"], ["xor", "XOR", "violet"]],
      [["Necesita que las dos entradas sean 1", "and"], ["Es 1 solo con A = 1 y B = 1", "and"], ["Es 1 si al menos una entrada es 1", "or"], ["Solo es 0 con A = 0 y B = 0", "or"], ["Es 1 si las entradas son distintas", "xor"], ["Con A = 1 y B = 1 da 0", "xor"]],
      "AND exige todas, OR basta una, XOR exige que sean distintas.",
    ),
    pick("check-not", "Invertir", "¿Qué hace una puerta NOT con una entrada de 1?",
      "Da una salida de 0",
      [["Da 1", "Invierte."], ["Da 2", "Solo hay 0 y 1."], ["No hace nada", "NOT invierte la señal."]],
      "NOT convierte el 1 en 0 y el 0 en 1.",
    ),
  ],
};
