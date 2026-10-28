import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const axonometriaOrtogonalCoeficientesDt1Lesson: InteractiveLesson = {
  slug: "axonometria-ortogonal-coeficientes-dt1",
  title: "2. Axonometría ortogonal: ejes y coeficientes de reducción",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo se ven los ejes", [
      { kind: "steps", items: [
        "El cuadro corta a los ejes y forma el **triángulo de trazas**. Los **ejes proyectados** forman tres ángulos **obtusos** que suman 360°.",
        "Cada eje tiene un **coeficiente de reducción** $k = \\dfrac{\\text{longitud dibujada}}{\\text{longitud real}}$.",
        "En axonometría ortogonal: $k_x^2 + k_y^2 + k_z^2 = 2$.",
        "El **tipo** depende de cuántos coeficientes (y ángulos) coinciden: **isométrica** (3), **dimétrica** (2), **trimétrica** (ninguno).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prueba coeficientes", [
      { kind: "text", text: "Elige un tipo o mueve los coeficientes kx y ky. Observa cómo se deforma el cubo y cambian los ángulos entre ejes." },
    ], tool("dt1-axonometria-ortogonal-explorador"), "visual-top"),
    slide("practica", "En la práctica", [
      { kind: "steps", items: [
        "**Isométrica**: ejes a 120°, $k = 0{,}816$. Se suele dibujar con $k = 1$ (**dibujo isométrico**), lo que agranda 1,22 veces.",
        "**Dimétrica**: dos ángulos iguales. Se emplea por ejemplo con $k_x = k_z = 1$ y $k_y = 0{,}5$ (ejes a 7° y 41°).",
        "**Trimétrica**: los tres ángulos distintos; da la imagen más natural pero es la más laboriosa.",
        "El triedro y los coeficientes se eligen para que **ninguna arista quede oculta** o confusa.",
      ] },
    ]),
    calc("calc-ang-iso", "Ángulo entre ejes", "Con kx = ky = kz = √(2/3), cos θ = −nx·ny/(kx·ky) = −(1/3)/(2/3) = −0,5. ¿Cuánto vale θ, en grados?", nums(120), "arccos(−0,5) = 120°.", "cos 120° = −0,5."),
    calc("calc-suma", "Los tres ángulos", "Los ángulos que forman entre sí los tres ejes proyectados, ¿cuánto suman, en grados?", nums(360), "Rodean el origen: 360°.", "Es una vuelta completa."),
    calc("calc-dim", "Dimétrica", "En una dimétrica con kx = ky = 0,9, el ángulo entre los ejes X e Y es 103,6° y los otros dos son iguales. ¿Cuánto vale cada uno de esos dos, en grados? (un decimal)", nums(128.2, 128.18), "(360 − 103,6)/2 = 128,2°.", "Reparte lo que falta para 360°."),
    sort("clasifica-tipo", "¿Qué tipo es?", "Clasifica por los coeficientes de reducción.",
      [["iso", "Isométrica", "cobalt"], ["dim", "Dimétrica", "amber"], ["tri", "Trimétrica", "emerald"]],
      [["kx = ky = kz", "iso"], ["Los ejes forman 120°", "iso"], ["kx = ky ≠ kz", "dim"], ["Dos ángulos entre ejes iguales", "dim"], ["kx, ky y kz distintos", "tri"], ["Tres ángulos distintos entre ejes", "tri"]],
      "Cuántos coeficientes coinciden determina el tipo.",
    ),
    pick("check-suma2", "Una condición", "¿Qué relación cumplen los tres coeficientes de reducción en axonometría ortogonal?",
      "kx² + ky² + kz² = 2",
      [["kx + ky + kz = 1", "No es una suma simple."], ["kx · ky · kz = 1", "No es el producto."], ["kx² + ky² + kz² = 1", "El total es 2."]],
      "Viene de que la normal al cuadro es unitaria: Σ(1 − kᵢ²) = 1.",
    ),
  ],
};
