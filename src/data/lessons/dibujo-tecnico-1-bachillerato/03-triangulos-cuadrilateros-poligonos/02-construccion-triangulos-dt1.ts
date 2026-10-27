import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const construccionTriangulosDt1Lesson: InteractiveLesson = {
  slug: "construccion-triangulos-dt1",
  title: "2. Clasificación y construcción de triángulos",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Triángulos", [
      { kind: "steps", items: [
        "Por sus **lados**: **equilátero** (3 iguales), **isósceles** (2 iguales) y **escaleno** (ninguno igual).",
        "Por sus **ángulos**: **acutángulo** (3 agudos), **rectángulo** (uno recto) y **obtusángulo** (uno obtuso).",
        "Los ángulos interiores suman **180°**. El lado mayor se opone al ángulo mayor.",
        "**Desigualdad triangular**: cada lado es menor que la suma de los otros dos (y mayor que su diferencia).",
      ] },
    ], undefined, "stack"),
    slide("lados", "¿Existe con estos lados?", [
      { kind: "text", text: "Mueve los tres lados. Observa cuándo el triángulo no se cierra y cómo cambian sus ángulos." },
    ], tool("dt1-triangulo-datos-explorador"), "visual-top"),
    slide("datos", "Construcción según los datos", [
      { kind: "steps", items: [
        "**Tres lados** (LLL): se traza uno de ellos y se cortan arcos con los radios de los otros dos.",
        "**Dos lados y el ángulo comprendido** (LAL): se traza el ángulo y se llevan los lados sobre sus brazos.",
        "**Un lado y dos ángulos** (ALA): se traza el lado y desde sus extremos los dos ángulos (si falta uno, se calcula con 180°).",
        "**Dos lados y el ángulo opuesto al mayor** (LLA): tiene **una** solución; si es opuesto al menor puede haber **dos, una o ninguna**.",
        "Con **tres ángulos** no se determina el triángulo: hay infinitos **semejantes**.",
      ] },
    ]),
    calc("calc-ex", "Un lado imposible", "Dos lados de un triángulo miden 5 cm y 7 cm. ¿Cuál es la mayor longitud entera posible para el tercer lado, en cm?", nums(11), "Debe ser menor que 12; el mayor entero es 11 cm.", "Menor que la suma."),
    calc("calc-ang", "Ángulo mayor", "Un triángulo de lados 3, 4 y 6 cm. ¿Cuántos grados mide, redondeado a una cifra decimal, el ángulo opuesto al lado de 6? (coseno = (9 + 16 − 36)/24)", nums(117.3), "cos θ = −11/24 = −0,4583 → θ ≈ 117,3° (obtusángulo).", "Teorema del coseno."),
    calc("calc-180", "El tercer ángulo", "Un triángulo tiene ángulos de 48° y 67°. ¿Cuánto mide el tercero, en grados?", nums(65), "180 − 48 − 67 = 65°.", "Suma 180°."),
    sort("clasifica-datos", "¿Cómo se construye?", "Clasifica cada conjunto de datos según el caso.",
      [["lll", "Tres lados (LLL)", "cobalt"], ["lal", "Dos lados y el ángulo comprendido (LAL)", "amber"], ["ala", "Lado y dos ángulos (ALA)", "emerald"]],
      [["a = 5, b = 6, c = 7", "lll"], ["Los tres lados de una cercha", "lll"], ["a = 4, b = 5, ángulo C = 60°", "lal"], ["Dos varillas y el ángulo que forman", "lal"], ["c = 6, A = 40°, B = 70°", "ala"], ["Un lado y los ángulos de sus extremos", "ala"]],
      "El caso decide el orden de trazado.",
    ),
    pick("check-3ang", "Tres ángulos", "¿Qué ocurre si se conocen solo los tres ángulos de un triángulo?",
      "Hay infinitos triángulos semejantes: falta conocer al menos un lado",
      [["Hay un único triángulo", "Falta una longitud."], ["No existe ninguno", "Existen, y son semejantes."], ["Hay exactamente dos", "Hay infinitos."]],
      "Los ángulos fijan la forma, no el tamaño.",
    ),
  ],
};
