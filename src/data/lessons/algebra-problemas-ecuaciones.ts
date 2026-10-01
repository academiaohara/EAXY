import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const algebraProblemasEcuacionesLesson: InteractiveLesson = {
  slug: "algebra-problemas-ecuaciones",
  title: "6. Problemas con ecuaciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  steps: [
    {
      id: "pasos",
      type: "concept",
      title: "Cuatro pasos habituales",
      content: [
        "**a)** Nombra lo desconocido ($x$ = el número, ancho de la parcela…).",
        "**b)** Escribe una **igualdad** entre cantidades del enunciado.",
        "**c)** **Resuelve** la ecuación.",
        "**d)** Interpreta la solución en el contexto y **comprueba** con el enunciado.",
      ],
    },
    {
      id: "ejemplo-numero",
      type: "animated_solution",
      title: "Problema — Suma y triple",
      content: [
        "Si a un número le sumas $7$, obtienes el triple que si le restas $5$. ¿De qué número se trata?",
      ],
      frames: [
        {
          caption: "Traducción:",
          math: "x + 7 = 3(x - 5)",
        },
        {
          caption: "Resolvemos:",
          math: "x + 7 = 3x - 15 \\Rightarrow 22 = 2x \\Rightarrow x = 11",
        },
        {
          caption: "Comprobación:",
          math: "11 + 7 = 18,\\quad 3 \\cdot (11 - 5) = 18",
        },
      ],
    },
    {
      id: "ejemplo-parcela",
      type: "concept",
      title: "Problema — Parcela rectangular",
      content: [
        "Ancho $= x$ m; largo $= x + 15$ m; perímetro $= 150$ m.",
        "Ecuación: $x + (x + 15) + x + (x + 15) = 150 \\Rightarrow 4x + 30 = 150 \\Rightarrow x = 30$.",
        "Solución: **30 m** de ancho y **45 m** de largo. Comprobación: $30 + 45 + 30 + 45 = 150$.",
      ],
    },
    {
      id: "plantillas",
      type: "concept",
      title: "Patrones frecuentes",
      content: [
        "Un número y su **siguiente**: $x + (x + 1) = 53$.",
        "**Cuernos y patas** de vacas: $x$ vacas → $2x$ cuernos y $4x$ patas; $2x + 4x = 222$.",
        "Precios: yogur natural $x$ €, de frutas $x + 0{,}05$ €; $6(x + 0{,}05) + 4x = 4{,}80$.",
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question:
        "Un número y su anterior suman $53$. ¿Qué ecuación modela el problema si $x$ es el número?",
      options: [
        { id: "a", text: "$x + (x + 1) = 53$" },
        { id: "b", text: "$x + (x - 1) = 53$" },
        { id: "c", text: "$2x = 53$" },
      ],
      correctOptionId: "b",
      explanation: "El anterior de $x$ es $x - 1$; la suma es $x + (x - 1) = 53$.",
    },
  ],
};
