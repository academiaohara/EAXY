import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const graficasPosicionTiempoFq2Lesson: InteractiveLesson = {
  slug: "graficas-posicion-tiempo-fq2",
  title: "4. Gráficas posición-tiempo",
  subtitle: FQ2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dibujar un movimiento", [
      { kind: "steps", items: [
        "En una **gráfica posición–tiempo** el **tiempo** va en el eje **horizontal** y la **posición** en el **vertical**.",
        "En un **MRU**, los puntos están en una **recta**.",
        "La recta cruza el eje vertical en la **posición inicial x₀**.",
        "Una gráfica ordena los datos y permite ver el movimiento **de un vistazo**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "La pendiente es la velocidad", [
      { kind: "text", text: "Cambia la posición inicial y la velocidad. Elige dos instantes y comprueba que Δx/Δt es la velocidad." },
    ], tool("fq2-grafica-posicion-tiempo-explorador"), "visual-top"),
    slide("lee", "Cómo leer la gráfica", [
      { kind: "steps", items: [
        "**Recta creciente**: el móvil **se aleja** del origen (velocidad positiva).",
        "**Recta decreciente**: se **acerca** al origen (velocidad negativa).",
        "**Recta horizontal**: el móvil está **parado** (velocidad cero).",
        "Cuanto **más inclinada** es la recta, **mayor** es la velocidad (mayor **pendiente**).",
      ] },
    ]),
    calc("calc-pend", "Calcular la pendiente", "En una gráfica x–t, el móvil está en 10 m a los 2 s y en 50 m a los 6 s. ¿Cuál es su velocidad, en m/s?", nums(10), "(50 − 10) / (6 − 2) = 10 m/s.", "Divide el cambio de posición entre el cambio de tiempo."),
    calc("calc-x0", "Posición inicial", "Con esa misma velocidad, ¿cuál es la posición inicial (t = 0), en m?", nums(-10), "x₀ = 10 − 10 · 2 = −10 m.", "Resta lo recorrido en 2 s."),
    calc("calc-par", "Móvil parado", "Un móvil está en 40 m a los 2 s y en 40 m a los 8 s. ¿Cuál es su velocidad, en m/s?", nums(0), "No cambia de posición: v = 0.", "Δx = 0."),
    sort("clasifica", "Interpreta la gráfica", "Clasifica cada descripción según la forma de la gráfica x–t.",
      [["cre", "Recta creciente", "cobalt"], ["dec", "Recta decreciente", "amber"], ["hor", "Recta horizontal", "emerald"]],
      [["El móvil se aleja del origen", "cre"], ["Velocidad positiva", "cre"], ["El móvil se acerca al origen", "dec"], ["Velocidad negativa", "dec"], ["El móvil está parado", "hor"], ["Velocidad nula", "hor"]],
      "La pendiente indica el signo de la velocidad.",
    ),
    pick("check", "Pendiente", "En una gráfica posición-tiempo, ¿qué representa la pendiente de la recta?",
      "La velocidad",
      [["La posición inicial", "Eso es donde corta al eje vertical."], ["El tiempo total", "No es la pendiente."], ["La distancia recorrida", "Es el cambio de posición, no la pendiente."]],
      "La pendiente es Δx / Δt, es decir, la velocidad.",
    ),
  ],
};
