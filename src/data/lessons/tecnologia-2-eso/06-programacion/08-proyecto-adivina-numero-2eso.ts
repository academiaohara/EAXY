import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const proyectoAdivinaNumero2esoLesson: InteractiveLesson = {
  slug: "proyecto-adivina-numero-2eso",
  title: "8. Mini proyecto: el juego de adivinar el número",
  subtitle: TECESO2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("plan", "Planificar el juego", [
      { kind: "definition", text: "Vamos a diseñar un juego completo: el ordenador **piensa un número** entre 1 y 100 y el jugador intenta adivinarlo recibiendo pistas de «mayor» o «menor»." },
      { kind: "steps", items: [
        "**Variables**: secreto, intento, contador de intentos.",
        "**Entrada**: el número que escribe el jugador.",
        "**Bucle**: se repite **mientras** el intento sea distinto del secreto.",
        "**Condicional**: si es menor, «mayor»; si es mayor, «menor».",
        "**Salida**: «¡Acertaste en N intentos!».",
      ] },
    ], undefined, "stack"),
    slide("codigo", "El algoritmo en pseudocódigo", [
      { kind: "example", title: "Adivina el número", lines: [
        { math: "secreto \\leftarrow aleatorio(1, 100)" },
        { math: "intentos \\leftarrow 0" },
        { math: "repetir\\ hasta\\ intento = secreto", note: "Dentro: leer intento, intentos ← intentos + 1 y mostrar la pista con un si … si no." },
        { math: "mostrar\\ intentos" },
      ] },
    ]),
    slide("juega", "Juégalo y mejora tu estrategia", [
      { kind: "text", text: "Adivina el número y compara con la estrategia de las mitades." },
    ], tool("eso2-adivina-explorador"), "visual-top"),
    slide("mejoras", "Ideas para ampliarlo", [
      { kind: "steps", items: [
        "Limitar el número de **intentos** y avisar al perder.",
        "Elegir el **nivel** (1 a 10, 1 a 100, 1 a 1 000).",
        "Mostrar una **puntuación** según los intentos.",
        "Empaquetar cada parte en una **función** (pedir_intento, dar_pista).",
        "Programarlo en **Scratch** o App Inventor y **probar** con otra persona.",
      ] },
    ]),
    calc("calc-mitades", "Cuántos intentos bastan", "Con la estrategia de las mitades, ¿cuántos intentos como máximo hacen falta para adivinar un número entre 1 y 100? (Pista: 2⁶ = 64 y 2⁷ = 128)", nums(7), "Cada intento divide el intervalo a la mitad: 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1, 7 intentos.", "Busca la menor potencia de 2 mayor o igual que 100."),
    sort("clasifica-juego", "¿Qué estructura es?", "Relaciona cada parte del juego con la estructura que la resuelve.",
      [["var", "Variable", "cobalt"], ["con", "Condicional", "amber"], ["bu", "Bucle", "emerald"]],
      [["Guardar el número secreto", "var"], ["Contar los intentos", "var"], ["Decidir si la pista es «mayor» o «menor»", "con"], ["Comprobar si se ha acertado", "con"], ["Seguir pidiendo números hasta acertar", "bu"], ["Repetir el juego si el jugador quiere", "bu"]],
      "Variables para guardar datos, condicionales para decidir y bucles para repetir.",
    ),
    pick("check-estrategia", "Mejor estrategia", "El número secreto está entre 1 y 100. ¿Cuál es el mejor primer intento?",
      "El 50, porque descarta la mitad de las opciones",
      [["El 1", "Solo descartas una posibilidad."], ["El 100", "Solo descartas una posibilidad."], ["Cualquiera, da igual", "La elección condiciona el número de intentos."]],
      "Probar siempre el número central divide las opciones a la mitad.",
    ),
  ],
};
