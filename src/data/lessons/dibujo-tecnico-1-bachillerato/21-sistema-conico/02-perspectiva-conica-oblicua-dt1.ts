import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const perspectivaConicaOblicuaDt1Lesson: InteractiveLesson = {
  slug: "perspectiva-conica-oblicua-dt1",
  title: "2. Perspectiva cónica oblicua",
  subtitle: DT1_SUBTITLES[21],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ninguna cara paralela al cuadro", [
      { kind: "steps", items: [
        "En la perspectiva **oblicua** (o **de dos puntos de fuga**) el objeto está **girado** respecto al cuadro: **ninguna cara** le es paralela.",
        "Las aristas **verticales** siguen siendo **paralelas al cuadro**: se dibujan verticales y no tienen punto de fuga.",
        "Las dos direcciones **horizontales** del objeto fugan en dos puntos de la LH: **F₁** y **F₂**.",
        "Si la caja forma el ángulo $\\theta$ con el cuadro: $F_1 = d\\cot\\theta$ y $F_2 = -d\\tan\\theta$ medidos desde el punto principal.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Gira la caja", [
      { kind: "text", text: "Cambia el giro y la distancia del observador. Mira cómo se mueven los puntos de fuga y qué caras se ven." },
    ], tool("dt1-perspectiva-conica-explorador", { n: 1 }), "visual-top"),
    slide("consejos", "Para dibujarla bien", [
      { kind: "steps", items: [
        "Se sitúan los **puntos de fuga F₁ y F₂** lejos uno de otro: así se evitan **deformaciones**.",
        "La **arista más próxima** al cuadro (si toca el cuadro) se dibuja **en verdadera altura**.",
        "Se llevan las alturas sobre esa arista y se trazan **fugas** a F₁ y F₂.",
        "Con un ángulo de **30°/60°** o **45°/45°** respecto al cuadro se obtienen composiciones equilibradas.",
      ] },
    ]),
    calc("calc-f1", "Punto de fuga F₁", "Con d = 10 cm y θ = 30°, F₁ = d·cotθ. ¿Cuánto vale, en cm? (dos decimales)", nums(17.32, 17.3205), "10 · 1,732 = 17,32 cm.", "cot 30° = √3."),
    calc("calc-f2", "Punto de fuga F₂", "Para ese caso, F₂ = −d·tanθ. ¿A qué distancia del punto principal está, en cm? (valor absoluto, dos decimales)", nums(5.77, 5.7735), "10 · 0,5774 = 5,77 cm, al otro lado.", "tg 30° = 0,5774."),
    calc("calc-45", "A 45°", "Si la caja forma 45° con el cuadro y d = 10 cm, ¿a qué distancia del punto principal está cada punto de fuga, en cm?", nums(10), "d·cot45° = d·tan45° = 10 cm, simétricos.", "tan 45° = 1."),
    sort("clasifica-persp", "¿Frontal u oblicua?", "Clasifica cada característica.",
      [["fro", "Frontal", "cobalt"], ["obl", "Oblicua", "amber"]],
      [["Una cara paralela al cuadro", "fro"], ["Un solo punto de fuga", "fro"], ["Aristas de fondo fugan al punto principal", "fro"], ["Dos puntos de fuga en la línea del horizonte", "obl"], ["La caja está girada respecto al cuadro", "obl"], ["Ninguna cara es paralela al cuadro", "obl"]],
      "El número de puntos de fuga depende de cómo está orientado el objeto.",
    ),
    pick("check-vert", "Verticales", "En una perspectiva oblicua con el horizonte a la altura de los ojos, ¿cómo se dibujan las aristas verticales?",
      "Verticales y paralelas entre sí, porque son paralelas al cuadro",
      [["Convergentes en un tercer punto de fuga", "Eso ocurriría si el cuadro estuviese inclinado."], ["Horizontales", "Siguen siendo verticales."], ["Fugan al punto principal", "Solo las perpendiculares al cuadro."]],
      "Una recta paralela al cuadro no tiene punto de fuga.",
    ),
  ],
};
