import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const magnitudesEscalaresVectorialesFq4Lesson: InteractiveLesson = {
  slug: "magnitudes-escalares-vectoriales-fq4",
  title: "1. Magnitudes escalares y vectoriales",
  subtitle: FQ4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dos tipos de magnitudes", [
      { kind: "steps", items: [
        "Una **magnitud escalar** queda definida por un **número y una unidad**: masa, tiempo, temperatura, energía, volumen.",
        "Una **magnitud vectorial** necesita además **dirección y sentido**: posición, desplazamiento, velocidad, aceleración, fuerza.",
        "Un **vector** se representa con una **flecha**: su **longitud** es el **módulo**, su **recta** es la dirección y la **punta** indica el sentido.",
        "Los vectores se descomponen en **componentes** en los ejes: **vₓ = v · cos α**, **v_y = v · sen α**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Sumar y restar vectores", [
      { kind: "text", text: "Cambia módulos y ángulos de A y B. Observa las componentes, la resultante y el producto escalar." },
    ], tool("fq4-vectores-explorador"), "visual-top"),
    slide("ops", "Operaciones", [
      { kind: "steps", items: [
        "**Suma**: se suman las componentes: (Aₓ + Bₓ, A_y + B_y). Gráficamente, se pone la **cola de B en la cabeza de A**.",
        "**Resta** A − B: se suma A con el **opuesto** de B (mismo módulo y dirección, sentido contrario).",
        "**Módulo**: |R| = √(Rₓ² + R_y²). **Dirección**: tan α = R_y / Rₓ.",
        "**Producto escalar**: A·B = Aₓ·Bₓ + A_y·B_y = A·B·cos θ. Es un **número**; vale **0** si los vectores son perpendiculares.",
      ] },
    ]),
    calc("calc-vx", "Componente x", "Una velocidad de 10 m/s forma 60° con el eje X. ¿Cuánto vale su componente x, en m/s? (cos 60° = 0,5)", nums(5), "vₓ = 10 · 0,5 = 5 m/s.", "vₓ = v·cos α."),
    calc("calc-mod", "Módulo", "Un vector tiene componentes (3, 4). ¿Cuánto vale su módulo?", nums(5), "√(3² + 4²) = 5.", "Teorema de Pitágoras."),
    calc("calc-suma", "Suma", "Dos fuerzas perpendiculares de 6 N y 8 N actúan sobre un cuerpo. ¿Cuánto vale la fuerza resultante, en N?", nums(10), "√(6² + 8²) = 10 N.", "Módulo de la suma de perpendiculares."),
    calc("calc-esc", "Producto escalar", "Calcula A·B con A = (2, 3) y B = (4, −1).", nums(5), "2·4 + 3·(−1) = 8 − 3 = 5.", "Multiplica componente a componente y suma."),
    sort("clasifica", "Escalar o vectorial", "Clasifica cada magnitud.",
      [["es", "Escalar", "cobalt"], ["ve", "Vectorial", "amber"]],
      [["Masa", "es"], ["Temperatura", "es"], ["Energía", "es"], ["Velocidad", "ve"], ["Fuerza", "ve"], ["Aceleración", "ve"]],
      "Si hace falta indicar dirección y sentido, es vectorial.",
    ),
    pick("check", "Perpendiculares", "Si el producto escalar de dos vectores no nulos es cero, ¿qué se puede afirmar?",
      "Que son perpendiculares",
      [["Que son paralelos", "Entonces el producto sería máximo."], ["Que tienen el mismo módulo", "No tiene relación."], ["Que son iguales", "No es el caso."]],
      "A·B = A·B·cos θ = 0 → cos θ = 0 → θ = 90°.",
    ),
  ],
};
