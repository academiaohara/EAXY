import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const rendimientoPerdidasMecanicasLesson: InteractiveLesson = {
  slug: "rendimiento-perdidas-mecanicas",
  title: "9. Rendimiento y pérdidas mecánicas",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Potencia útil y rendimiento", [
      { kind: "definition", text: "El **rendimiento** compara la potencia (o energía) **útil** que entrega una máquina con la que **recibe**. Nunca llega al 100 %: parte se pierde, sobre todo como calor por rozamiento." },
      { kind: "rule", formula: "\\eta = \\dfrac{P_{\\text{útil}}}{P_{\\text{entrada}}}\\cdot 100\\,\\%\\qquad P_{\\text{pérdidas}} = P_{\\text{entrada}} - P_{\\text{útil}}" },
      { kind: "steps", title: "De dónde salen las pérdidas", items: [
        "**Rozamiento** entre superficies en contacto (dientes, cojinetes, correas).",
        "**Deslizamiento** en correas y ruedas de fricción.",
        "**Resistencia del aire o del lubricante** al mover piezas.",
        "**Deformaciones** y vibraciones que se disipan.",
      ] },
    ], undefined, "stack"),
    slide("etapas", "Rendimientos en cadena", [
      { kind: "text", text: "Si la potencia atraviesa varias etapas, los rendimientos **se multiplican**. Cada etapa añadida pierde algo." },
      { kind: "rule", formula: "\\eta_{\\text{total}} = \\eta_1\\cdot\\eta_2\\cdot\\eta_3\\cdots" },
      { kind: "example", title: "Polea (95 %) + engranajes (97 %) + cadena (95 %)", lines: [
        { math: "\\eta = 0{,}95\\cdot 0{,}97\\cdot 0{,}95 = 0{,}875", note: "87,5 %: casi un 13 % de la potencia se pierde" },
      ] },
    ]),
    slide("reductor", "Reducir velocidad, multiplicar par, perder potencia", [
      { kind: "text", text: "Aumenta la reducción y baja el rendimiento. El par de salida es $M_1\\cdot i\\cdot\\eta$ y la potencia de salida, $P\\cdot\\eta$. Observa la barra de pérdidas." },
    ], tool("reductor-rendimiento-explorador", { a: 1000, b: 1500, c: 10 }), "visual-top"),
    calc("calc-eta", "Rendimiento de una máquina", "Un reductor recibe $2\\,000$ W y entrega $1\\,700$ W. ¿Cuál es su rendimiento, en %?",
      nums(85), "$\\eta = 1700/2000 = 0{,}85 = 85\\,\\%$. Pérdidas: $300$ W.", "Potencia útil dividida entre potencia de entrada."),
    calc("calc-cadena", "Dos etapas", "Una transmisión tiene dos etapas, de rendimiento $90\\,\\%$ y $80\\,\\%$. Si el motor entrega $1\\,000$ W, ¿qué potencia llega a la salida, en W?",
      nums(720), "$\\eta_{total} = 0{,}9\\cdot 0{,}8 = 0{,}72$; $P = 1000\\cdot 0{,}72 = 720$ W.", "Multiplica los dos rendimientos."),
    calc("calc-par-salida", "Par con pérdidas", "Un motor de $5$ N·m mueve un reductor $1:8$ con rendimiento $90\\,\\%$. ¿Cuál es el par de salida, en N·m?",
      nums(36), "$M_2 = M_1\\,i\\,\\eta = 5\\cdot 8\\cdot 0{,}9 = 36$ N·m (sin pérdidas serían 40 N·m).", "M₂ = M₁ · relación · η."),
    sort("clasifica-perdida", "Cómo mejorar el rendimiento", "Decide qué medidas reducen las pérdidas y cuáles las aumentan.",
      [["mej", "Mejora el rendimiento", "emerald"], ["emp", "Lo empeora", "amber"]],
      [["Lubricar los engranajes", "mej"], ["Alinear correctamente los ejes", "mej"], ["Usar rodamientos en lugar de casquillos", "mej"], ["Dejar la cadena oxidada y seca", "emp"], ["Tensar la correa en exceso", "emp"], ["Añadir etapas innecesarias", "emp"]],
      "Menos rozamiento y menos etapas dan mejor rendimiento; falta de lubricación, desalineación y tensión excesiva aumentan las pérdidas.",
    ),
    pick("check-calor", "¿A dónde va la potencia perdida?", "Un reductor de η = 85 % recibe 2 kW. ¿Dónde acaban los 300 W que no llegan a la salida?",
      "Se convierten principalmente en calor, por rozamiento",
      [["Desaparecen, porque la energía no se conserva", "La energía siempre se conserva: se transforma."], ["Se almacenan como energía mecánica extra en el eje", "No se acumulan: salen del sistema."], ["Se transforman en par adicional", "El par de salida ya está calculado con el rendimiento."]],
      "La energía perdida se disipa en forma de calor (y un poco de ruido y vibración). Por eso los reductores se calientan.",
    ),
  ],
};
