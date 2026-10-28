import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const relacionTransmisionTrenesLesson: InteractiveLesson = {
  slug: "relacion-transmision-trenes",
  title: "6. Transmisión del movimiento y relación de transmisión",
  subtitle: TECESO1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("sistemas", "Cuatro formas de transmitir un giro", [
      { kind: "steps", items: [
        "**Ruedas de fricción**: dos ruedas en contacto que se arrastran por rozamiento. Pueden patinar.",
        "**Poleas con correa**: dos poleas unidas por una correa. Silenciosas y baratas. Giran en el **mismo sentido** (correa abierta) o en el contrario (cruzada).",
        "**Engranajes**: ruedas dentadas en contacto directo. No patinan y transmiten mucha fuerza. Giran en sentido contrario.",
        "**Cadena y piñones**: ruedas dentadas unidas por una cadena, a distancia. Giran en el mismo sentido (bicicleta).",
      ] },
    ], undefined, "stack"),
    slide("correa", "Correa abierta y cruzada", [
      { kind: "text", text: "Con correa, el sentido de giro depende de cómo se coloque. La polea más grande gira más despacio." },
    ], anim("correa-abierta-cruzada"), "split"),
    slide("def", "La relación de transmisión", [
      { kind: "definition", text: "La **relación de transmisión** $i$ compara la velocidad de la rueda de salida con la de entrada: $i = \\dfrac{n_2}{n_1}$. En engranajes y poleas también es $i = \\dfrac{z_1}{z_2} = \\dfrac{d_1}{d_2}$." },
      { kind: "compare",
        left: { title: "Si i < 1: reductor", text: "La salida gira **más despacio** que la entrada y con **más fuerza**. Taladro de percusión, lavadora, reductor de un motor.", tone: "info" },
        right: { title: "Si i > 1: multiplicador", text: "La salida gira **más deprisa** que la entrada y con **menos fuerza**. Batidora, secador, rueda de la bicicleta frente al pedal.", tone: "key" } },
    ]),
    slide("explora", "Poleas con correa", [
      { kind: "text", text: "Cambia al modo «Poleas con correa» y prueba tamaños distintos. Comprueba que la relación es la misma que con los dientes." },
    ], tool("engranajes-eso-explorador", { n: 1, a: 16, b: 32 }), "visual-top"),
    slide("tren", "Trenes de engranajes", [
      { kind: "text", text: "Cuando se necesita una reducción muy grande, se colocan **varios pares seguidos**: un tren de engranajes. Las relaciones de cada etapa se **multiplican**." },
    ], tool("tren-engranajes-explorador", { a: 900 }), "visual-top"),
    calc("calc-i", "Relación de transmisión", "Una rueda de 15 dientes mueve otra de 45 dientes. ¿Cuánto vale la relación de transmisión i = z₁ ÷ z₂? (Redondea a dos decimales.)",
      nums("0.33", "0.3333"), "i = 15 ÷ 45 = 0,33. Como i < 1, es un reductor: la salida gira a un tercio de la velocidad.", "Divide los dientes de la conductora entre los de la conducida."),
    calc("calc-tren", "Tren de dos etapas", "Un tren tiene dos etapas, cada una con relación 1/4. Si el motor gira a 1 600 rpm, ¿cuántas rpm tiene la salida?",
      nums(100), "i total = 1/4 · 1/4 = 1/16. n salida = 1 600 ÷ 16 = 100 rpm.", "Multiplica las relaciones de las dos etapas."),
    sort("clasifica-red", "¿Reductor o multiplicador?", "Clasifica cada sistema según su relación de transmisión.",
      [["red", "Reductor (i < 1)", "cobalt"], ["mul", "Multiplicador (i > 1)", "amber"]],
      [["Motor de lavadora que mueve el tambor", "red"], ["Reductor de una grúa", "red"], ["Batidora: motor a las aspas", "mul"], ["Piñón pequeño que mueve la rueda trasera de una bici", "mul"], ["Polea grande movida por una pequeña", "red"]],
      "Reductor: salida más lenta y con más fuerza; multiplicador: salida más rápida y con menos fuerza.",
    ),
    pick("check-correa", "La correa de un motor", "Un motor mueve con una correa una polea el doble de grande. ¿Cómo gira la polea grande?",
      "A la mitad de velocidad y en el mismo sentido (correa abierta)",
      [["Al doble de velocidad y en el mismo sentido", "La polea grande siempre gira más despacio."], ["A la mitad de velocidad y en sentido contrario", "En sentido contrario solo si la correa es cruzada."], ["A la misma velocidad", "Con distintos diámetros las velocidades son diferentes."]],
      "n₂ = n₁ · d₁ ÷ d₂ = n₁ ÷ 2. El sentido es el mismo con correa abierta.",
    ),
  ],
};
