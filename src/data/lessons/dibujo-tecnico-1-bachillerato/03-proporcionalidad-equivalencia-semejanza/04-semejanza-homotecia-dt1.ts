import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const semejanzaHomoteciaDt1Lesson: InteractiveLesson = {
  slug: "semejanza-homotecia-dt1",
  title: "4. Semejanza y homotecia",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Misma forma, distinto tamaño", [
      { kind: "steps", items: [
        "Dos figuras son **semejantes** si tienen los **mismos ángulos** y sus **lados correspondientes** son proporcionales. La razón se llama **razón de semejanza** $k$.",
        "Si la razón de longitudes es $k$, las **áreas** están en razón $k^2$ y los **volúmenes** en razón $k^3$.",
        "La **homotecia** es una transformación que da figuras semejantes: dado un **centro O** y una **razón k**, cada punto $P$ pasa a $P'$ en la recta $OP$ con $\\overline{OP'} = k\\,\\overline{OP}$.",
        "Con $k>0$ es **directa** (P′ al mismo lado de O); con $k<0$ es **inversa**.",
        "Las **escalas** de los planos son una semejanza: 1:50 significa $k = 1/50$.",
      ] },
    ], undefined, "stack"),
    slide("homo", "Homotecia de un triángulo", [
      { kind: "text", text: "Mueve la razón de −3 a 3. Fíjate en cómo cambian las áreas y cuándo la figura gira." },
    ], tool("dt1-homotecia-explorador"), "visual-top"),
    slide("usos", "Para qué sirve", [
      { kind: "steps", items: [
        "**Ampliar y reducir** figuras conservando su forma (planos, maquetas).",
        "**Triángulos semejantes** para medir alturas inaccesibles con sombras o visuales.",
        "**Centros de homotecia** de dos circunferencias: sirven para trazar **tangentes comunes**.",
        "La **homotecia** es el caso particular de la **proyección central** que usa el sistema cónico (más adelante).",
      ] },
    ]),
    calc("calc-area", "Razón de áreas", "Dos figuras semejantes tienen razón de semejanza 3. ¿Cuántas veces es mayor el área de la grande?", nums(9), "k² = 3² = 9.", "Eleva al cuadrado."),
    calc("calc-vol", "Razón de volúmenes", "Con razón de semejanza 2, ¿cuántas veces mayor es el volumen?", nums(8), "k³ = 2³ = 8.", "Eleva al cubo."),
    calc("calc-imagen", "Imagen de un punto", "En la homotecia de centro O(0, 0) y razón −2, ¿cuál es la coordenada x de la imagen del punto (2, 1)?", nums(-4), "P′ = −2 · (2, 1) = (−4, −2).", "Multiplica por la razón."),
    calc("calc-pequena", "Área de la figura pequeña", "Dos figuras semejantes con razón 2/5 (pequeña/grande). La grande tiene 100 cm². ¿Qué área tiene la pequeña, en cm²?", nums(16), "100 · (2/5)² = 100 · 4/25 = 16 cm².", "Multiplica por k²."),
    sort("clasifica-homo", "¿Qué razón es?", "Clasifica cada homotecia según el signo y el módulo de k.",
      [["amp", "Ampliación directa", "cobalt"], ["red", "Reducción directa", "amber"], ["inv", "Inversa (gira 180°)", "emerald"]],
      [["k = 2", "amp"], ["k = 3", "amp"], ["k = 1/2", "red"], ["k = 0,25", "red"], ["k = −1", "inv"], ["k = −2", "inv"], ["k = −0,5", "inv"]],
      "El signo de k decide si es directa o inversa; el módulo, si amplía o reduce.",
    ),
    pick("check-semejante", "Semejantes", "Una maqueta está a escala 1:10. Si su superficie es 0,5 m², ¿qué superficie tiene el objeto real?",
      "50 m²",
      [["5 m²", "Ha usado la razón lineal en lugar del cuadrado."], ["500 m²", "Ha usado el cubo."], ["0,05 m²", "Ha reducido en lugar de ampliar."]],
      "Las superficies guardan la razón k²: 0,5 · 10² = 50 m².",
    ),
  ],
};
