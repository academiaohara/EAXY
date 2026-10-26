import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const eleccionMaterialMatrizDecision2esoLesson: InteractiveLesson = {
  slug: "eleccion-material-matriz-decision-2eso",
  title: "5. Elegir el material adecuado: matriz de decisión",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("criterios", "No hay un material perfecto", [
      { kind: "steps", items: [
        "Cada material tiene **ventajas e inconvenientes**: resistencia, peso, coste, facilidad de trabajo, aspecto, sostenibilidad.",
        "El mejor depende del **uso** (una silla, un casco, una caja) y de las **herramientas** disponibles.",
        "Una **matriz de decisión** puntúa cada material en cada criterio y pondera la importancia de cada criterio.",
      ] },
    ], undefined, "stack"),
    slide("matriz", "Pondera tus prioridades", [
      { kind: "text", text: "Cambia la importancia de cada criterio. Observa cómo cambia el ganador." },
    ], tool("eso2-matriz-decision-explorador"), "visual-top"),
    slide("casos", "Casos prácticos", [
      { kind: "text", text: "Elige el mejor material para cada aplicación y mira por qué." },
    ], tool("seleccion-material-eso-explorador"), "visual-top"),
    slide("calculo", "Cómo se calcula la nota", [
      { kind: "example", title: "Puntuación ponderada", lines: [
        { math: "P = \\frac{\\sum (peso \\cdot nota)}{\\sum pesos}" },
        { math: "P_{pino} = \\frac{3+5+4+4+5}{5} = 4{,}2", note: "Con pesos iguales, la puntuación es la media de las cinco notas." },
      ] },
    ]),
    calc("calc-alu", "Nota del aluminio", "Con los cinco criterios igual de importantes, las notas del aluminio son 4, 3, 5, 3 y 3. ¿Qué puntuación media obtiene?", nums(3.6), "(4 + 3 + 5 + 3 + 3) / 5 = 18 / 5 = 3,6.", "Con pesos iguales es la media."),
    sort("clasifica-uso", "¿Qué importa más?", "Relaciona cada producto con el criterio que más pesa en su diseño.",
      [["res", "Resistencia", "cobalt"], ["lig", "Ligereza", "amber"], ["cos", "Bajo coste", "emerald"]],
      [["Cables de un puente colgante", "res"], ["Un gancho de grúa", "res"], ["El cuadro de una bici de carrera", "lig"], ["Una pieza de dron", "lig"], ["Una bandeja desechable", "cos"], ["Un envase de un solo uso", "cos"]],
      "El criterio principal cambia con la función del objeto.",
    ),
    pick("check-matriz", "Una matriz honesta", "¿Qué debe hacerse para que una matriz de decisión sea útil?",
      "Elegir los criterios y sus pesos antes de puntuar, y justificar las notas",
      [["Puntuar primero y ajustar los pesos hasta que gane el material favorito", "Así se manipula el resultado."], ["Usar un solo criterio", "Pierde la comparación global."], ["No hace falta justificar", "Las notas deben apoyarse en datos."]],
      "La transparencia en pesos y notas es lo que da valor a la comparación.",
    ),
  ],
};
