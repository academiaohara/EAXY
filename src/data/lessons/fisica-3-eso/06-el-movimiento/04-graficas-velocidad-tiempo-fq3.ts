import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const graficasVelocidadTiempoFq3Lesson: InteractiveLesson = {
  slug: "graficas-velocidad-tiempo-fq3",
  title: "4. Gráficas velocidad-tiempo",
  subtitle: FQ3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Leer una gráfica v-t", [
      { kind: "steps", items: [
        "En una gráfica **velocidad–tiempo**, el eje horizontal es el **tiempo** y el vertical, la **velocidad**.",
        "La **pendiente** (inclinación) es la **aceleración**: tramo ascendente → acelera; horizontal → velocidad constante; descendente → frena.",
        "El **área bajo la gráfica** es la **distancia recorrida**.",
        "Las áreas se calculan descomponiendo en **rectángulos** (base · altura) y **triángulos** (base · altura / 2).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Arrancar, mantener y frenar", [
      { kind: "text", text: "Modifica cada tramo del viaje y observa cómo cambia el área, es decir, la distancia total." },
    ], tool("fq3-grafica-vt-explorador"), "visual-top"),
    slide("ejem", "Un ejemplo", [
      { kind: "steps", items: [
        "Un tren acelera de 0 a 10 m/s en 5 s, mantiene 10 s esa velocidad y frena en 5 s hasta parar.",
        "Triángulo de aceleración: 5 · 10 / 2 = **25 m**. Rectángulo: 10 · 10 = **100 m**. Triángulo de frenada: 5 · 10 / 2 = **25 m**.",
        "Distancia total: 25 + 100 + 25 = **150 m**.",
      ] },
    ]),
    calc("calc-pend", "Aceleración", "En una gráfica v–t, la velocidad pasa de 0 a 12 m/s en 4 s. ¿Cuánto vale la aceleración, en m/s²?", nums(3), "12 / 4 = 3 m/s².", "Es la pendiente."),
    calc("calc-area", "Tramo constante", "Un móvil va a 8 m/s durante 15 s. ¿Qué área hay bajo la gráfica (distancia), en m?", nums(120), "8 · 15 = 120 m.", "Es un rectángulo."),
    calc("calc-tri", "Tramo acelerado", "Un móvil acelera de 0 a 20 m/s en 10 s. ¿Qué distancia recorre en ese tramo, en m?", nums(100), "10 · 20 / 2 = 100 m.", "Es un triángulo."),
    calc("calc-total", "Viaje completo", "Acelera 5 s hasta 10 m/s (25 m), mantiene la velocidad 10 s (100 m) y frena 5 s hasta parar (25 m). ¿Cuántos metros recorre en total?", nums(150), "25 + 100 + 25 = 150 m.", "Suma las tres áreas."),
    sort("clasifica", "Tramo de la gráfica", "Asocia cada descripción con el tramo de una gráfica v–t.",
      [["as", "Pendiente positiva", "emerald"], ["ho", "Horizontal", "cobalt"], ["de", "Pendiente negativa", "rose"]],
      [["El móvil acelera", "as"], ["La velocidad aumenta cada segundo", "as"], ["Velocidad constante", "ho"], ["a = 0", "ho"], ["El móvil frena", "de"], ["La velocidad disminuye hasta 0", "de"]],
      "La pendiente es la aceleración.",
    ),
    pick("check", "Área", "¿Qué representa el área bajo una gráfica velocidad–tiempo?",
      "La distancia recorrida",
      [["La aceleración", "Esa es la pendiente."], ["El tiempo total", "Es el eje horizontal."], ["La velocidad máxima", "Es la altura máxima."]],
      "Velocidad · tiempo = distancia.",
    ),
  ],
};
