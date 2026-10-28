import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ruedasEjesManivelasLesson: InteractiveLesson = {
  slug: "ruedas-ejes-manivelas",
  title: "4. Ruedas, ejes y manivelas",
  subtitle: TECESO1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "La rueda y el eje", [
      { kind: "definition", text: "El **mecanismo de rueda y eje** consiste en una rueda unida a un eje que gira con ella. Es una **palanca circular** cuyo punto de apoyo es el centro del eje." },
      { kind: "steps", items: [
        "Si se hace **fuerza en la rueda** (radio grande) para mover una carga en el **eje** (radio pequeño), se multiplica la fuerza: torno, cabrestante, destornillador.",
        "Si se mueve el **eje** y se obtiene movimiento en el borde de la **rueda**, se multiplica la velocidad: rueda de un coche.",
        "La **manivela** es una barra unida a un eje: es la rueda reducida a un brazo.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una rueda grande y un eje pequeño", [
      { kind: "text", text: "Cambia los radios y comprueba cómo la fuerza necesaria en el borde baja cuando la rueda es mayor." },
    ], tool("rueda-eje-explorador", { a: 30, b: 5 }), "visual-top"),
    slide("regla", "Misma ley que la palanca", [
      { kind: "rule", title: "Equilibrio en la rueda y el eje", formula: "F \\cdot R = P \\cdot r" },
      { kind: "example", title: "Un torno de pozo", lines: [{ math: "R = 30\\ \\text{cm},\\quad r = 10\\ \\text{cm},\\quad P = 60\\ \\text{kg}" }, { math: "F = \\dfrac{P \\cdot r}{R} = \\dfrac{60 \\cdot 10}{30} = 20\\ \\text{kg}" }] },
      { kind: "text", text: "La ventaja es la relación $R/r$. En este caso es $30/10 = 3$: la fuerza se reduce a la tercera parte, pero hay que dar más vueltas con la manivela." },
    ]),
    calc("calc-torno", "Calcula la fuerza en un torno", "Un torno tiene una manivela de 40 cm y un cilindro de 8 cm de radio. Quieres subir un cubo de 50 kg. ¿Qué fuerza en kg debes hacer en la manivela?",
      nums(10), "F = P · r ÷ R = 50 · 8 ÷ 40 = 10 kg.", "Usa F · R = P · r."),
    calc("calc-ventaja", "Ventaja mecánica", "La ventaja mecánica de una rueda y eje es R ÷ r. ¿Cuánto vale con un radio de rueda de 30 cm y un eje de 6 cm?",
      nums(5), "R ÷ r = 30 ÷ 6 = 5. La fuerza se divide entre 5.", "Divide el radio de la rueda entre el del eje."),
    sort("clasifica-rueda", "Multiplica fuerza o velocidad", "Decide qué multiplica cada mecanismo.",
      [["fue", "Multiplica la fuerza", "emerald"], ["vel", "Multiplica la velocidad", "amber"]],
      [["Destornillador de mango ancho", "fue"], ["Manivela de un torno", "fue"], ["Grifo de rueda grande", "fue"], ["Volante de un coche", "fue"], ["Rueda de bicicleta movida por el eje", "vel"], ["Noria que gira rápidamente", "vel"]],
      "Si se hace fuerza en el radio grande, se multiplica la fuerza (a costa de dar más vueltas); si se mueve el eje y se aprovecha el borde, se multiplica la velocidad.",
    ),
    pick("check-manivela", "Una manivela más larga", "¿Qué ocurre si se alarga la manivela de un torno?",
      "Hace falta menos fuerza, pero hay que recorrer una circunferencia mayor",
      [["Hace falta más fuerza para subir la misma carga", "Una manivela más larga aumenta la ventaja mecánica."], ["No cambia nada", "El radio de la rueda es el brazo de la fuerza."], ["La carga sube más rápido", "En realidad sube más despacio por cada vuelta."]],
      "Es el mismo principio que la palanca: un brazo mayor reduce la fuerza pero aumenta el recorrido.",
    ),
  ],
};
