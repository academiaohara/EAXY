import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const curvasBezierTransformacionesDt1Lesson: InteractiveLesson = {
  slug: "curvas-bezier-transformaciones-dt1",
  title: "2. Curvas y transformaciones en 2D",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "Curvas libres", [
      { kind: "steps", items: [
        "Los arcos y círculos no bastan para formas **libres** (perfiles de carrocerías, letras, logotipos). Se usan las **splines** y las **curvas de Bézier**.",
        "Una Bézier cúbica se define por **cuatro puntos**: dos **nodos** (extremos) y dos **manejadores** que controlan la dirección y la tensión.",
        "La curva **pasa por los nodos** y **no por los manejadores**, que la atraen; siempre queda dentro del polígono que forman los cuatro puntos.",
        "Se pueden **encadenar** varias curvas con **continuidad** (misma tangente en el empalme) para trazados largos suaves.",
      ] },
    ], undefined, "stack"),
    slide("bezier", "Juega con los manejadores", [
      { kind: "text", text: "Mueve los puntos de control P₁ y P₂ y observa cómo se deforma la curva y cambia su longitud." },
    ], tool("dt1-bezier-explorador"), "visual-top"),
    slide("transf", "Transformaciones", [
      { kind: "text", text: "Aplica simetría, escala, giro y traslación a un triángulo y comprueba qué cambia y qué no." },
    ], tool("dt1-transformaciones-explorador"), "visual-top"),
    slide("matrices", "Qué hay detrás", [
      { kind: "steps", items: [
        "**Traslación**: se suma un vector (dx, dy). **Escala**: se multiplican las coordenadas por k. **Giro** de α: $x' = x\\cos\\alpha - y\\sin\\alpha$, $y' = x\\sin\\alpha + y\\cos\\alpha$.",
        "**Simetría** respecto del eje X: $(x, y) \\to (x, -y)$; respecto del eje Y: $(x, y) \\to (-x, y)$.",
        "Las órdenes **matriz rectangular** y **matriz polar** copian un elemento varias veces con una traslación o un giro repetidos.",
        "Al combinar transformaciones importa el **orden**: girar y luego trasladar no es lo mismo que trasladar y luego girar.",
      ] },
    ]),
    calc("calc-bx", "Punto medio de la curva", "Bézier con P₀ = (0,0), P₁ = (2,3), P₂ = (6,−2) y P₃ = (8,0). Con B(0,5) = (P₀ + 3P₁ + 3P₂ + P₃)/8, ¿cuánto vale la coordenada x?", nums(4), "(0 + 6 + 18 + 8)/8 = 4.", "Suma ponderada."),
    calc("calc-by", "Coordenada y", "Y ¿cuánto vale la coordenada y de B(0,5), en cm? (dos decimales)", nums(0.38, 0.375), "(0 + 9 − 6 + 0)/8 = 0,375.", "Pondera las y: 0, 3, −2, 0."),
    calc("calc-giro", "Giro de 90°", "Se gira el punto (1, 0) 90° alrededor del origen. ¿Cuál es la coordenada y del resultado?", nums(1), "(cos 90°, sen 90°) = (0, 1).", "x′ = 0, y′ = 1."),
    calc("calc-area", "Escala y área", "Se escala una figura con k = 2. ¿Por cuánto se multiplica su área?", nums(4), "El área se multiplica por k² = 4.", "El área crece con el cuadrado de k."),
    calc("calc-sim", "Simetría", "El punto (2, 3) se refleja respecto del eje X. ¿Cuál es la coordenada y del resultado?", nums(-3), "(2, 3) → (2, −3).", "Cambia el signo de y."),
    sort("clasifica-transf", "¿Qué conserva?", "Clasifica cada transformación según conserve o cambie las medidas.",
      [["con", "Conserva longitudes y áreas", "cobalt"], ["cam", "Cambia longitudes y áreas", "amber"]],
      [["Traslación", "con"], ["Giro", "con"], ["Simetría", "con"], ["Escala con k = 2", "cam"], ["Escala con k = 0,5", "cam"]],
      "Solo la escala modifica el tamaño.",
    ),
    pick("check-bez", "Dónde pasa la curva", "En una curva de Bézier cúbica, ¿por cuáles de los cuatro puntos de control pasa la curva?",
      "Solo por los dos nodos de los extremos",
      [["Por los cuatro", "Los manejadores solo la atraen."], ["Por los dos manejadores", "Esos no están en la curva."], ["Por ninguno", "Empieza y termina en los nodos."]],
      "Los manejadores controlan la forma, no pertenecen a la curva.",
    ),
  ],
};
