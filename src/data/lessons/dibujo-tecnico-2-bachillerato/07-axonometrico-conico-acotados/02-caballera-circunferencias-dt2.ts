import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const caballeraCircunferenciasDt2Lesson: InteractiveLesson = {
  slug: "caballera-circunferencias-dt2",
  title: "2. Perspectiva caballera: circunferencias y cuerpos curvos",
  subtitle: DT2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una cara en verdadera forma", [
      { kind: "steps", items: [
        "En la **caballera**, el plano **frontal** XZ es paralelo al cuadro: todo lo que contiene se dibuja **sin deformar**.",
        "Las aristas perpendiculares al cuadro (eje Y) se dibujan como **fugantes** con un ángulo **α** y se **reducen** con un coeficiente **k** (habitualmente 45° y 0,5).",
        "Esto la hace muy cómoda para piezas con **círculos o formas complejas** en una cara: se orientan como cara frontal.",
        "Las figuras de los planos XY y YZ se **deforman**: las circunferencias se ven como **elipses**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Tres caras, tres resultados", [
      { kind: "text", text: "Cambia α y k. La circunferencia frontal no cambia; las otras dos se deforman y su área se reduce." },
    ], tool("dt2-caballera-circulos-explorador"), "visual-top"),
    slide("curvos", "Cilindros y conos", [
      { kind: "steps", items: [
        "Un **cilindro** con la base en el plano **frontal** se dibuja con **dos circunferencias iguales** unidas por las generatrices (fugantes).",
        "Si la base está en un plano **no frontal**, cada base es una **elipse**; se halla con puntos por **coordenadas**.",
        "Para dibujar una elipse a mano se usa un **rectángulo circunscrito**: los puntos de tangencia están en los puntos medios de sus lados, y el resto por **homología** o por cuadrícula.",
        "Un **cono** o una **esfera** se resuelven de modo análogo, con su contorno **tangente** a las bases o a las elipses.",
      ] },
    ]),
    calc("calc-area", "Razón de áreas", "Con α = 30° y k = 0,5 en la cara superior (plano XY), la razón de áreas k · sen α vale:", nums(0.25), "0,5 · sen 30° = 0,5 · 0,5 = 0,25.", "sen 30° = 0,5."),
    calc("calc-lat", "Cara lateral", "Con α = 60° y k = 0,5 en la cara lateral (plano YZ), la razón de áreas k · cos α vale:", nums(0.25), "0,5 · cos 60° = 0,5 · 0,5 = 0,25.", "cos 60° = 0,5."),
    sort("clasifica", "¿Cómo se ve?", "Clasifica cada figura de un cubo en caballera según se vea sin deformar o deformada.",
      [["sin", "Sin deformar", "cobalt"], ["def", "Deformada", "amber"]],
      [["Circunferencia en la cara frontal", "sin"], ["Cuadrado en la cara frontal", "sin"], ["Ángulos de la cara frontal", "sin"], ["Circunferencia en la cara superior", "def"], ["Cuadrado en la cara lateral", "def"], ["Ángulos de la cara superior", "def"]],
      "Solo el plano paralelo al cuadro se conserva.",
    ),
    pick("check", "Caras con círculos", "En una pieza con un agujero circular grande, ¿en qué cara conviene colocarlo en caballera?",
      "En la cara frontal",
      [["En la cara superior", "Se vería como elipse."], ["En la cara lateral", "También se deforma."], ["Es indiferente", "No lo es."]],
      "La cara frontal se dibuja en verdadera forma: la circunferencia sale como tal.",
    ),
  ],
};
