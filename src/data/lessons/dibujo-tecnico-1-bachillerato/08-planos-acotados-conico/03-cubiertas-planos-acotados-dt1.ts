import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cubiertasPlanosAcotadosDt1Lesson: InteractiveLesson = {
  slug: "cubiertas-planos-acotados-dt1",
  title: "3. Aplicación: cubiertas de edificios",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tejados como planos acotados", [
      { kind: "steps", items: [
        "Cada **faldón** de una cubierta es un **plano** y se dibuja con el **sistema de planos acotados**: horizontales paralelas al **alero** (cota 0).",
        "Los faldones se **cortan** en rectas: la **cumbrera** (arista superior horizontal), las **limatesas** (aristas salientes) y las **limahoyas** (aristas entrantes).",
        "Si todos los faldones tienen la **misma pendiente**, las limatesas y limahoyas son las **bisectrices** de la planta.",
        "Cada intersección de dos planos se halla uniendo los puntos donde se cortan **horizontales de igual cota**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una cubierta a cuatro aguas", [
      { kind: "text", text: "Cambia las dimensiones de la planta y la pendiente. Observa la altura y la longitud de la cumbrera." },
    ], tool("dt1-cubierta-explorador"), "visual-top"),
    slide("calculos", "Qué se puede calcular", [
      { kind: "steps", items: [
        "**Altura de la cumbrera**: $h = p \\cdot \\dfrac{b}{2}$, con $b$ el lado corto.",
        "**Longitud de la cumbrera**: $a - b$.",
        "**Superficie real** del tejado: la de la planta multiplicada por $\\sqrt{1 + p^2}$ (cada faldón se ve acortado por $\\cos\\alpha$).",
        "Con estos datos se calcula el **material** (tejas, tableros) y la **evacuación del agua**.",
      ] },
    ]),
    calc("calc-h", "Altura de la cumbrera", "Una planta de 10 × 6 m con una cubierta a cuatro aguas con pendiente del 50 %. ¿Qué altura tiene la cumbrera, en m?", nums(1.5), "h = 0,5 · 6/2 = 1,5 m.", "Pendiente por la mitad del lado corto."),
    calc("calc-cum", "Longitud de la cumbrera", "En esa misma cubierta, ¿cuánto mide la cumbrera, en m?", nums(4), "10 − 6 = 4 m.", "Largo menos ancho."),
    calc("calc-area", "Superficie del tejado", "¿Qué superficie real tiene el tejado, en m²? (60·√1,25, un decimal)", nums(67.1, 67.08), "60 · 1,118 ≈ 67,1 m².", "Planta por √(1 + p²)."),
    sort("clasifica-arist", "¿Qué arista es?", "Clasifica cada arista de una cubierta.",
      [["cum", "Cumbrera", "cobalt"], ["lim", "Limatesa", "amber"], ["alero", "Alero", "emerald"]],
      [["Arista horizontal más alta", "cum"], ["Une dos faldones por arriba, en horizontal", "cum"], ["Arista saliente en una esquina", "lim"], ["Bisectriz del ángulo de la planta", "lim"], ["Línea de cota 0 del tejado", "alero"], ["Borde inferior de los faldones", "alero"]],
      "Cada tipo de arista tiene su posición en la cubierta.",
    ),
    pick("check-bisec", "Faldones iguales", "Si todos los faldones de una cubierta tienen la misma pendiente, ¿qué son las limatesas en planta?",
      "Las bisectrices de los ángulos de la planta",
      [["Las mediatrices de los lados", "No son perpendiculares a los lados."], ["Las diagonales de la planta", "Solo en un cuadrado coinciden."], ["Paralelas al lado largo", "Esa es la cumbrera."]],
      "Cada punto de la limatesa equidista de los dos aleros que se cruzan.",
    ),
  ],
};
