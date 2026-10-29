import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planoInclinadoFq4Lesson: InteractiveLesson = {
  slug: "plano-inclinado-fq4",
  title: "3. Plano inclinado",
  subtitle: FQ4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("descomp", "Descomponer el peso", [
      { kind: "steps", items: [
        "En un plano inclinado conviene tomar ejes **paralelo y perpendicular** al plano.",
        "El peso se descompone en **Pₓ = m·g·sen α** (paralelo, tira del cuerpo hacia abajo) y **P_y = m·g·cos α** (perpendicular, contra el plano).",
        "En perpendicular no hay aceleración: **N = P_y = m·g·cos α**. La normal es **menor** que el peso.",
        "El rozamiento vale **Fr = μ·N = μ·m·g·cos α** y se opone al deslizamiento, hacia arriba del plano.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cambia el ángulo", [
      { kind: "text", text: "Aumenta el ángulo hasta que el bloque empiece a deslizar. ¿Qué relación hay con el coeficiente μ?" },
    ], tool("fq4-plano-inclinado-explorador"), "visual-top"),
    slide("mov", "Movimiento por el plano", [
      { kind: "steps", items: [
        "**Sin rozamiento**: a = g·sen α. Con α = 0 no acelera; con α = 90°, a = g.",
        "**Con rozamiento**: si Pₓ > μ·N, el cuerpo **desliza** con **a = g·(sen α − μ·cos α)**.",
        "El cuerpo está **en reposo** mientras **tan α ≤ μₑ**; este es el **ángulo límite**.",
        "Fíjate en que la **masa no aparece** en la aceleración: dos cuerpos distintos caen igual por el mismo plano.",
      ] },
    ], undefined, "stack"),
    slide("subir", "Subir por el plano", [
      { kind: "text", text: "Si el cuerpo **sube**, el rozamiento apunta **hacia abajo**, igual que Pₓ: la aceleración de frenado es **a = g·(sen α + μ·cos α)**. Por eso un cuerpo lanzado hacia arriba se detiene antes de lo que lo haría sin rozamiento. Los **planos inclinados** (rampas) permiten subir cargas con **menos fuerza**, aunque con más recorrido." },
    ]),
    calc("calc-px", "Componente paralela", "Un bloque de 10 kg está en un plano inclinado 30°. ¿Cuánto vale Pₓ, en N? (g = 10 m/s², sen 30° = 0,5)", nums(50), "Pₓ = m·g·sen α = 10·10·0,5 = 50 N.", "Pₓ = m·g·sen α."),
    calc("calc-a", "Aceleración sin rozamiento", "Un bloque desliza sin rozamiento por un plano de 30°. ¿Cuánto vale su aceleración, en m/s²? (g = 10 m/s²)", nums(5), "a = g·sen α = 10·0,5 = 5 m/s².", "a = g·sen α."),
    calc("calc-n", "Normal", "Un bloque de 20 kg en un plano de 60° tiene N = m·g·cos 60°. ¿Cuánto vale N, en N? (g = 10 m/s², cos 60° = 0,5)", nums(100), "N = 20·10·0,5 = 100 N.", "N = m·g·cos α."),
    sort("clasifica", "¿Desliza o no?", "Un bloque con μ = 0,5 (tan 26,6° ≈ 0,5). Indica el resultado según el ángulo.",
      [["des", "Desliza", "rose"], ["rep", "Se queda quieto", "cobalt"]],
      [["α = 10°", "rep"], ["α = 20°", "rep"], ["α = 25°", "rep"], ["α = 35°", "des"], ["α = 45°", "des"], ["α = 60°", "des"]],
      "Desliza si tan α > μ, es decir, si α supera unos 26,6°.",
    ),
    pick("check", "Masa y aceleración", "Dos bloques de distinta masa deslizan por el mismo plano con el mismo rozamiento. ¿Cuál acelera más?",
      "Los dos aceleran igual",
      [["El más pesado", "La masa se cancela en la ecuación."], ["El más ligero", "La masa se cancela."], ["Depende de su forma", "Con el mismo μ, no."]],
      "a = g·(sen α − μ·cos α) no depende de m.",
    ),
  ],
};
