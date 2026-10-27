import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const electronicaDigitalBoole4esoLesson: InteractiveLesson = {
  slug: "electronica-digital-boole-4eso",
  title: "7. Electrónica digital y álgebra de Boole",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ceros y unos", [
      { kind: "steps", items: [
        "En digital solo hay dos niveles: **0** (bajo, ≈ 0 V) y **1** (alto, ≈ 5 V o 3,3 V).",
        "Las **puertas lógicas** son circuitos integrados que realizan **Y (AND)**, **O (OR)**, **NO (NOT)**, **NAND**, **NOR** y **XOR**.",
        "Un circuito se describe con una **función booleana** y una **tabla de verdad**.",
        "Con **n entradas** hay **2ⁿ** combinaciones.",
      ] },
    ], undefined, "stack"),
    slide("boole", "Expresiones y tablas de verdad", [
      { kind: "text", text: "Elige una expresión, activa A, B y C y mira la salida y su tabla de verdad." },
    ], tool("eso4-boole-explorador"), "visual-top"),
    slide("puertas", "Puertas lógicas", [
      { kind: "text", text: "Comprueba el comportamiento de cada puerta lógica." },
    ], tool("puerta-logica-explorador"), "visual-top"),
    slide("diseno", "Del problema a la función", [
      { kind: "steps", items: [
        "**1.** Define las **entradas** y la **salida** (por ejemplo, una alarma con tres sensores).",
        "**2.** Escribe la **tabla de verdad**: ¿cuándo debe valer 1?",
        "**3.** Escribe la **función** con las filas donde la salida es 1.",
        "**4.** **Simplifica** si se puede y dibuja el circuito con puertas.",
        "**5.** **Monta y comprueba** el circuito con todas las combinaciones.",
      ] },
    ]),
    calc("calc-filas", "Combinaciones", "Un circuito tiene 4 entradas. ¿Cuántas filas tiene su tabla de verdad?", nums(16), "Con 4 entradas hay 2⁴ = 16 combinaciones.", "Dos elevado al número de entradas."),
    calc("calc-xor", "Salida", "En una puerta XOR con A = 1 y B = 1, ¿cuánto vale la salida?", nums(0), "La XOR da 1 solo cuando las entradas son distintas.", "Es 1 solo si las entradas difieren."),
    sort("clasifica-puerta", "¿Qué puerta es?", "Relaciona cada descripción con la puerta.",
      [["and", "AND", "cobalt"], ["or", "OR", "amber"], ["not", "NOT", "rose"], ["xor", "XOR", "emerald"]],
      [["Salida 1 solo si todas las entradas son 1", "and"], ["Se activa solo si hay dos llaves a la vez", "and"], ["Salida 1 si alguna entrada es 1", "or"], ["Alarma si salta cualquier sensor", "or"], ["Invierte la entrada", "not"], ["Salida 1 si las entradas son distintas", "xor"]],
      "Cada puerta tiene una tabla de verdad característica.",
    ),
    pick("check-nand", "Puerta universal", "¿Por qué se dice que la NAND es una puerta universal?",
      "Porque con solo puertas NAND se puede construir cualquier otra puerta",
      [["Porque se usa en todos los países", "No es ese el sentido."], ["Porque es la más barata siempre", "No es la razón."], ["Porque no necesita alimentación", "La necesita."]],
      "Es la razón por la que los chips se fabrican con NAND o NOR.",
    ),
  ],
};
