import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const engranajesTrenesEngranajesLesson: InteractiveLesson = {
  slug: "engranajes-trenes-engranajes",
  title: "3. Engranajes y trenes de engranajes",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Ruedas dentadas en contacto", [
      { kind: "definition", text: "Un **engranaje** es un par de ruedas dentadas que engranan. Transmiten el movimiento **sin deslizamiento**, con relación exacta, y soportan grandes potencias." },
      { kind: "steps", items: [
        "**Engranajes rectos**: dientes paralelos al eje; sencillos y baratos, ruidosos a alta velocidad.",
        "**Helicoidales**: dientes inclinados; más silenciosos y fuertes, con empuje axial.",
        "**Cónicos**: ejes que se cortan (normalmente a 90°).",
        "**Condición de engrane**: ambas ruedas deben tener el mismo **módulo** (tamaño de diente).",
      ] },
      { kind: "warning", title: "Sentido de giro", text: "Dos ruedas engranadas giran siempre en sentidos contrarios. Para mantener el sentido hay que añadir una rueda intermedia." },
    ], anim("engranajes-giro"), "split"),
    slide("relacion", "Relación de transmisión", [
      { kind: "rule", title: "Con z = número de dientes", formula: "i = \\dfrac{n_2}{n_1} = \\dfrac{z_1}{z_2}\\qquad n_1 z_1 = n_2 z_2" },
      { kind: "text", text: "La rueda con **más dientes gira más despacio**. El producto $n\\cdot z$ se conserva porque pasan los mismos dientes por el punto de contacto." },
      { kind: "example", title: "z₁ = 15, z₂ = 45, n₁ = 900 rpm", lines: [
        { math: "i = 15/45 = 1/3" },
        { math: "n_2 = 900\\cdot 15/45 = 300\\ \\text{rpm}" },
      ] },
    ]),
    slide("trenes", "Trenes de engranajes", [
      { kind: "compare",
        left: { title: "Tren simple", text: "Cada eje lleva una sola rueda. La relación total depende solo de la primera y la última; las intermedias solo cambian el sentido.", tone: "info" },
        right: { title: "Tren compuesto", text: "Algunos ejes llevan dos ruedas solidarias. Permite grandes reducciones en poco espacio.", tone: "key" } },
      { kind: "rule", title: "Tren compuesto", formula: "i = \\dfrac{n_{\\text{sal}}}{n_{\\text{ent}}} = \\dfrac{z_1}{z_2}\\cdot\\dfrac{z_3}{z_4}\\ =\\ \\dfrac{\\text{producto de motrices}}{\\text{producto de conducidas}}" },
    ]),
    slide("simulador", "Monta trenes y mira la velocidad", [
      { kind: "text", text: "Cambia el número de dientes de cada rueda y el tipo de tren. Comprueba el sentido de la salida y qué par de ruedas aporta más reducción." },
    ], tool("engranajes-explorador", { a: 15, b: 45, c: 900 }), "visual-top"),
    calc("calc-tren", "Velocidad de un tren compuesto", "Un tren compuesto tiene $z_1 = 20$, $z_2 = 60$, $z_3 = 15$ y $z_4 = 45$. La entrada gira a $1\\,800$ rpm. ¿A cuántas rpm gira la salida?",
      nums(200), "$i = (20/60)\\cdot(15/45) = 1/9$. $n_{sal} = 1800/9 = 200$ rpm. Mismo sentido que la entrada (dos pares).", "Multiplica las dos relaciones."),
    calc("calc-z2", "Calcular los dientes", "Un piñón de $20$ dientes gira a $1\\,500$ rpm y debe mover una rueda a $500$ rpm. ¿Cuántos dientes tiene la rueda?",
      nums(60), "$n_1 z_1 = n_2 z_2 \\Rightarrow z_2 = 1500\\cdot 20/500 = 60$ dientes.", "n₁·z₁ = n₂·z₂."),
    sort("clasifica-eng", "Reductor o multiplicador", "Clasifica cada pareja motriz → conducida.",
      [["red", "Reductor (i < 1)", "cobalt"], ["mul", "Multiplicador (i > 1)", "amber"]],
      [["z₁ = 12 → z₂ = 36", "red"], ["z₁ = 20 → z₂ = 80", "red"], ["z₁ = 40 → z₂ = 10", "mul"], ["z₁ = 30 → z₂ = 15", "mul"], ["z₁ = 18 → z₂ = 54", "red"], ["z₁ = 60 → z₂ = 20", "mul"]],
      "Si la motriz tiene menos dientes que la conducida, la salida gira más lenta (reductor); si tiene más, más rápida (multiplicador).",
    ),
    pick("check-rueda", "Rueda intermedia", "En un tren simple de tres ruedas (z₁ = 20, z₂ = 40, z₃ = 60) en línea, ¿qué hace la rueda intermedia?",
      "Solo invierte el sentido: la relación total es z₁/z₃",
      [["Cambia la relación total a z₁/z₂ · z₂/z₃ multiplicando por 2", "La rueda intermedia aparece arriba y abajo y se cancela."], ["Duplica la velocidad", "No altera la velocidad total."], ["Frena el sistema", "No es un freno: solo cambia el sentido."]],
      "En un tren simple, $i = (z_1/z_2)(z_2/z_3) = z_1/z_3$: la intermedia se cancela y solo cambia el sentido.",
    ),
  ],
};
