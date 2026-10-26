import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seleccionIdeasMatriz2esoLesson: InteractiveLesson = {
  slug: "seleccion-ideas-matriz-2eso",
  title: "3. Seleccionar la mejor solución",
  subtitle: TECESO2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("criterios", "Elegir con criterios, no con simpatías", [
      { kind: "steps", items: [
        "**1.** Lista los **criterios** (cumple los requisitos, coste, facilidad de construcción, seguridad, aspecto).",
        "**2.** Decide la **importancia** de cada uno (de 0 a 5).",
        "**3.** **Puntúa** cada idea en cada criterio (de 1 a 5).",
        "**4.** Calcula la **media ponderada** y compara.",
      ] },
    ], undefined, "stack"),
    slide("matriz", "Tres ideas para un soporte de móvil", [
      { kind: "text", text: "Pondera los criterios según lo que pide tu proyecto y mira qué idea gana. Después prueba con otras prioridades." },
    ], tool("eso2-seleccion-ideas-explorador"), "visual-top"),
    slide("ejemplo", "Un ejemplo de cálculo", [
      { kind: "example", title: "Idea B con pesos (4, 3, 3, 4, 2)", lines: [
        { math: "\\sum (peso\\cdot nota) = 4\\cdot4 + 3\\cdot3 + 3\\cdot3 + 4\\cdot4 + 2\\cdot4 = 58" },
        { math: "\\sum pesos = 4+3+3+4+2 = 16" },
        { math: "P = 58 / 16 \\approx 3{,}6" },
      ] },
    ]),
    calc("calc-pond", "Una media ponderada", "Una idea saca 5 en un criterio de peso 3 y 2 en otro de peso 1. ¿Cuál es su media ponderada? (suma de peso · nota entre suma de pesos)", nums(4.25), "(3 · 5 + 1 · 2) / (3 + 1) = 17 / 4 = 4,25.", "Multiplica cada nota por su peso, suma y divide entre la suma de pesos."),
    sort("clasifica-criterio", "¿A qué criterio afecta?", "Relaciona cada dato con el criterio que lo valora.",
      [["cos", "Coste", "emerald"], ["fac", "Facilidad de construcción", "cobalt"], ["seg", "Seguridad", "rose"]],
      [["Cuesta 3 € de material", "cos"], ["Necesita una máquina cara", "cos"], ["Se hace con herramientas del aula", "fac"], ["Lleva pocas piezas y uniones simples", "fac"], ["Tiene aristas redondeadas", "seg"], ["Usa materiales no tóxicos", "seg"]],
      "Cada dato mejora o empeora un criterio concreto.",
    ),
    pick("check-empate", "Dos ideas empatan", "Dos ideas obtienen casi la misma puntuación. ¿Qué es lo más razonable?",
      "Combinar lo mejor de cada una o revisar si falta algún criterio importante",
      [["Elegir al azar y no pensar más", "Hay opciones mejores."], ["Cambiar los pesos hasta que gane la favorita", "Manipula el resultado."], ["Abandonar el proyecto", "No es necesario."]],
      "Un empate suele indicar que ambas son buenas: se pueden mezclar o desempatar con un criterio justificado.",
    ),
  ],
};
