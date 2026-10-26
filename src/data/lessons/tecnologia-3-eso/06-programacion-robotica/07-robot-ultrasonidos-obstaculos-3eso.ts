import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const robotUltrasonidosObstaculos3esoLesson: InteractiveLesson = {
  slug: "robot-ultrasonidos-obstaculos-3eso",
  title: "7. Medir distancias y esquivar obstáculos",
  subtitle: TECESO3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un sensor que «ve» con sonido", [
      { kind: "definition", text: "Un **sensor de ultrasonidos** (como el HC-SR04) emite un pulso de sonido que no oímos y mide el **tiempo del eco**. Con la velocidad del sonido se calcula la **distancia** al obstáculo." },
      { kind: "steps", items: [
        "El pin **Trig** dispara el pulso; el pin **Echo** devuelve un pulso cuya duración es el tiempo de ida y vuelta.",
        "**distancia = tiempo · 0,0343 cm/µs ÷ 2** (se divide entre 2 porque el sonido va y vuelve).",
        "Es útil entre unos **2 cm y 4 m**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Del eco a la distancia", [
      { kind: "text", text: "Cambia la distancia y el umbral de frenado: observa el tiempo de eco y la decisión del robot." },
    ], tool("eso3-ultrasonido-explorador"), "visual-top"),
    slide("esquivar", "Esquivar obstáculos", [
      { kind: "steps", items: [
        "Si la distancia es **menor que el umbral**: **frenar** (o retroceder) y **girar**.",
        "Si no, **avanzar**.",
        "Se puede montar el sensor sobre un **servo** para mirar a los lados y elegir hacia dónde girar.",
        "Un buen umbral depende de la **velocidad** del robot: cuanto más rápido, más distancia de frenado.",
      ] },
    ]),
    calc("calc-dist", "Del eco a la distancia", "El eco tarda 1 166 µs. ¿A cuántos cm está el obstáculo? (t · 0,0343 / 2, redondea a un entero)", nums(20), "1 166 · 0,0343 / 2 ≈ 20 cm.", "Multiplica por 0,0343 y divide entre 2."),
    calc("calc-dist2", "Otro eco", "Un eco de 2 915 µs, ¿a cuántos cm indica el obstáculo? (redondea a un entero)", nums(50), "2 915 · 0,0343 / 2 ≈ 50 cm.", "Multiplica por 0,0343 y divide entre 2."),
    sort("clasifica-dec", "Frenar o avanzar", "El umbral de frenado es de 20 cm. ¿Qué hace el robot?",
      [["fre", "Frena", "rose"], ["ava", "Sigue", "emerald"]],
      [["Obstáculo a 10 cm", "fre"], ["Obstáculo a 19 cm", "fre"], ["Pared a 5 cm", "fre"], ["Camino libre a 80 cm", "ava"], ["Obstáculo a 20 cm o más lejos", "ava"], ["Obstáculo a 150 cm", "ava"]],
      "Frena cuando la distancia medida es menor que el umbral.",
    ),
    pick("check-ida", "¿Por qué dividir entre 2?", "En la fórmula de la distancia, ¿por qué se divide el tiempo entre 2?",
      "Porque el sonido recorre la distancia dos veces: ida y vuelta",
      [["Porque hay dos sensores", "Hay un solo emisor y receptor."], ["Porque el sonido va a doble velocidad", "La velocidad es la misma."], ["Por convenio, sin motivo", "Tiene un motivo físico."]],
      "El eco mide el viaje de ida y vuelta; la distancia al obstáculo es la mitad.",
    ),
  ],
};
