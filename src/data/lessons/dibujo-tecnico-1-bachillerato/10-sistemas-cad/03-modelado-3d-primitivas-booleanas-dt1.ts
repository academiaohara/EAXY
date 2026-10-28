import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const modelado3dPrimitivasBooleanasDt1Lesson: InteractiveLesson = {
  slug: "modelado-3d-primitivas-booleanas-dt1",
  title: "3. Modelado 3D: primitivas y operaciones booleanas",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "De un boceto a un sólido", [
      { kind: "steps", items: [
        "El **modelado 3D** crea un **modelo** de la pieza que contiene toda su geometría. De él se obtienen **vistas**, **cortes**, **perspectivas**, **planos** y **volumen**.",
        "**Modelado de caja**: se parte de una **primitiva** sencilla (una caja) y se **transforma** hasta lograr la forma.",
        "Las **primitivas** son sólidos básicos con parámetros: **caja** (largo, ancho, alto), **cilindro** (radio, altura), **esfera**, **cono**, **prisma**.",
        "Otro camino: un **boceto 2D** (perfil cerrado) al que se aplica una **extrusión** (empujarlo), una **revolución** (girarlo) o un **barrido**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Unir, restar, intersecar", [
      { kind: "text", text: "Una caja y un cilindro. Cambia sus medidas y la operación y comprueba cómo varía el volumen." },
    ], tool("dt1-booleanas-explorador"), "visual-top"),
    slide("booleanas", "Operaciones booleanas", [
      { kind: "steps", items: [
        "**Unión** ($A \\cup B$): el sólido que ocupa lo de A **o** lo de B. $V(A \\cup B) = V(A) + V(B) - V(A \\cap B)$.",
        "**Diferencia** ($A - B$): lo de A que **no está** en B. Es la forma de hacer **agujeros, vaciados y ranuras**: $V(A - B) = V(A) - V(A \\cap B)$.",
        "**Intersección** ($A \\cap B$): solo lo que está en **ambos**.",
        "La pieza es un **árbol de operaciones** (modelado CSG): si cambias una primitiva, todo se recalcula.",
      ] },
    ]),
    calc("calc-dif", "Agujero pasante", "Una caja de 6 × 4 × 3 cm tiene un taladro cilíndrico pasante de 1 cm de radio. ¿Qué volumen queda, en cm³? (72 − π·1²·3, dos decimales)", nums(62.58, 62.575), "72 − 9,42 = 62,58 cm³.", "Resta el volumen del cilindro dentro de la caja."),
    calc("calc-int", "Intersección", "En ese caso, la intersección entre la caja y el cilindro es el cilindro de 3 cm de altura. ¿Cuánto vale su volumen, en cm³? (dos decimales)", nums(9.42, 9.4248), "π · 1² · 3 ≈ 9,42 cm³.", "Volumen del cilindro de 3 cm."),
    calc("calc-uni", "Unión", "Si el cilindro tiene 6 cm de altura y sobresale, la unión vale V(caja) + V(cilindro) − V(común) = 72 + 18,85 − 9,42. ¿Cuántos cm³? (dos decimales)", nums(81.42, 81.4248), "72 + 18,85 − 9,42 ≈ 81,42 cm³.", "Suma y resta la parte común."),
    sort("clasifica-bool", "¿Qué operación?", "Asocia cada resultado con la operación booleana.",
      [["uni", "Unión", "cobalt"], ["dif", "Diferencia", "amber"], ["int", "Intersección", "emerald"]],
      [["Pegar un saliente a una base", "uni"], ["Ensamblar dos bloques en una sola pieza", "uni"], ["Hacer un taladro", "dif"], ["Vaciar una caja", "dif"], ["Fresar una ranura", "dif"], ["Quedarse solo con la zona común de dos sólidos", "int"]],
      "La diferencia quita material; la unión lo añade; la intersección conserva lo común.",
    ),
    pick("check-extr", "Extrusión", "Un cuadrado de 2 cm de lado se extruye 5 cm. ¿Qué sólido se obtiene?",
      "Un prisma cuadrangular de 2 × 2 × 5 cm",
      [["Una pirámide", "Eso requeriría una extrusión con reducción."], ["Un cilindro", "El perfil es un cuadrado, no un círculo."], ["Un cubo", "La altura (5 cm) no es igual al lado (2 cm)."]],
      "Extruir es empujar un perfil en una dirección: el volumen es área × altura.",
    ),
  ],
};
