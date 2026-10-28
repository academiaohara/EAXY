import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sistemaReferenciaDesplazamientoFq2Lesson: InteractiveLesson = {
  slug: "sistema-referencia-desplazamiento-fq2",
  title: "1. Sistema de referencia, trayectoria y desplazamiento",
  subtitle: FQ2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "¿Se mueve o está quieto?", [
      { kind: "steps", items: [
        "Un cuerpo **se mueve** cuando **cambia su posición** respecto de otro que se toma como **referencia**.",
        "El movimiento es **relativo**: un pasajero está quieto respecto del tren, pero se mueve respecto del andén.",
        "El **sistema de referencia** es el punto (**origen**) y el **sentido positivo** respecto de los que se miden las posiciones.",
        "La **posición** es dónde está el cuerpo respecto del origen; la **trayectoria**, la línea que describe (recta, curva…).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Ir y volver", [
      { kind: "text", text: "Cambia lo que avanzas, lo que vuelves y el origen del sistema de referencia. Compara la distancia recorrida con el desplazamiento." },
    ], tool("fq2-referencia-desplazamiento-explorador"), "visual-top"),
    slide("dist", "Distancia y desplazamiento", [
      { kind: "steps", items: [
        "La **distancia recorrida** (o **espacio**) es la longitud de **todo el camino**: es siempre positiva.",
        "El **desplazamiento** es la **diferencia** entre la posición final y la inicial: **Δx = x_final − x_inicial**. Puede ser positivo, negativo o cero.",
        "Si el movimiento es en **línea recta y sin volver atrás**, el desplazamiento coincide con la distancia.",
        "Si el cuerpo **vuelve** al punto de partida, el desplazamiento es **cero** aunque haya recorrido mucho.",
      ] },
    ]),
    calc("calc-dist", "Distancia total", "Un ciclista va 300 m hacia el este y vuelve 100 m hacia el oeste. ¿Qué distancia ha recorrido, en m?", nums(400), "300 + 100 = 400 m.", "Suma todo el camino."),
    calc("calc-desp", "Desplazamiento", "Con ese mismo recorrido (positivo hacia el este), ¿cuál es el desplazamiento, en m?", nums(200), "300 − 100 = +200 m (hacia el este).", "Posición final menos inicial."),
    calc("calc-cero", "Vuelta al inicio", "Un corredor da una vuelta completa a una pista de 400 m y llega al punto de salida. ¿Cuál es su desplazamiento, en m?", nums(0), "Termina donde empezó: desplazamiento 0.", "Posición final igual a la inicial."),
    sort("clasifica", "Distancia o desplazamiento", "Clasifica cada afirmación.",
      [["dis", "Distancia recorrida", "cobalt"], ["des", "Desplazamiento", "amber"]],
      [["Es siempre positiva", "dis"], ["Suma todo el camino", "dis"], ["Es lo que marca el cuentakilómetros", "dis"], ["Posición final menos inicial", "des"], ["Puede ser cero", "des"], ["Puede ser negativo", "des"]],
      "La distancia mide el camino; el desplazamiento compara el inicio y el final.",
    ),
    pick("check", "Relatividad", "Vas sentado en un tren en marcha. ¿Estás en reposo?",
      "Sí respecto del tren, y en movimiento respecto del andén",
      [["Sí, siempre", "Depende del sistema de referencia."], ["No, nunca", "Respecto del tren estás quieto."], ["Solo si el tren frena", "No es la razón."]],
      "El movimiento es relativo: hay que decir respecto de qué se describe.",
    ),
  ],
};
