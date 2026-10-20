import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const problemasSistemas2esoLesson: InteractiveLesson = {
  slug: "problemas-sistemas-2eso",
  title: "4. Problemas con sistemas de ecuaciones",
  subtitle: TEMA_2ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pasos",
      type: "slide",
      help: [
        {
          label: "Dos incógnitas, dos ecuaciones",
          message: "Cada dato del enunciado da una ecuación. Si hay dos incógnitas necesitas dos relaciones independientes.",
        },
        {
          label: "No olvides interpretar",
          message: "La solución debe tener sentido: una edad no puede ser negativa ni un número de personas decimal.",
        },
      ],
      title: "Cómo plantear un problema",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Identifica** las dos incógnitas y nómbralas $x$ e $y$.",
            "**Escribe** una ecuación por cada relación del enunciado.",
            "**Resuelve** el sistema (por sustitución).",
            "**Interpreta** la solución y **comprueba**.",
          ],
        },
        {
          kind: "example",
          title: "Pepa tiene 5 años más que Enrique y entre los dos suman 21",
          lines: [
            { math: "x = y + 5 \\qquad x + y = 21", note: "$x$: Pepa; $y$: Enrique" },
            { math: "(y + 5) + y = 21 \\to 2y = 16 \\to y = 8 \\to x = 13" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "clase",
      type: "slide",
      help: [
        {
          label: "Qué relaciones hay",
          message: "Una es el total ($29$ alumnos) y otra la diferencia (las chicas superan en $3$ a los chicos).",
        },
      ],
      title: "Una clase",
      blocks: [
        {
          kind: "text",
          text: "En una clase hay $29$ alumnos y alumnas, y el número de chicas supera en $3$ al de chicos. ¿Cuántos hay de cada?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\begin{cases} x + y = 29 \\\\ y = x + 3 \\end{cases}", note: "$x$: chicos; $y$: chicas" },
            { math: "x + (x + 3) = 29 \\to 2x = 26 \\to x = 13" },
            { math: "y = 13 + 3 = 16", note: "$13$ chicos y $16$ chicas" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "cafeteria",
      type: "slide",
      help: [
        {
          label: "Un precio por incógnita",
          message: "Llama $c$ al precio de un café y $b$ al de un bollo. Cada compra da una ecuación.",
        },
        {
          label: "Despeja lo más fácil",
          message: "En $2c + b = 3$ la $b$ no tiene coeficiente: $b = 3 - 2c$.",
        },
      ],
      title: "Precios en una cafetería",
      blocks: [
        {
          kind: "text",
          text: "Dos cafés y un bollo cuestan $3$ €. Un café y dos bollos cuestan $3{,}60$ €. ¿Cuánto cuesta cada cosa?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\begin{cases} 2c + b = 3 \\\\ c + 2b = 3{,}6 \\end{cases}" },
            { math: "b = 3 - 2c \\to c + 2(3 - 2c) = 3{,}6" },
            { math: "c + 6 - 4c = 3{,}6 \\to -3c = -2{,}4 \\to c = 0{,}8" },
            { math: "b = 3 - 2 \\cdot 0{,}8 = 1{,}4", note: "café $0{,}80$ €; bollo $1{,}40$ €" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-suma-diferencia",
      type: "predict",
      help: [
        {
          label: "Plantea",
          message: "$x + y = 977$ y $x - y = 31$. Despeja $x = y + 31$ y sustituye.",
        },
      ],
      title: "Suma y diferencia",
      question: "La suma de dos números es $977$ y su diferencia, $31$. ¿Cuál es el número mayor?",
      mode: "choice",
      choices: [
        { id: "a", label: "$504$" },
        { id: "b", label: "$473$", incorrectFeedback: "Es el número menor." },
        { id: "c", label: "$946$", incorrectFeedback: "Si fuera $946$, el otro número sería $31$ y la diferencia $915$, no $31$." },
        { id: "d", label: "$489$", incorrectFeedback: "Si fuera $489$, el otro número sería $488$ y la diferencia $1$, no $31$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(y + 31) + y = 977 \\Rightarrow 2y = 946 \\Rightarrow y = 473$ y $x = 504$. Comprobación: $504 + 473 = 977$ y $504 - 473 = 31$.",
    },
    {
      id: "check-edades",
      type: "fill_in_blank",
      help: [
        {
          label: "Plantea",
          message: "$x + y = 40$ y $x = 3y$ (el padre $x$ es el triple que el hijo $y$).",
        },
      ],
      title: "Padre e hijo",
      question: "Entre un padre y su hijo suman $40$ años y el padre tiene el triple de la edad del hijo. ¿Cuántos años tiene el hijo? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$3y + y = 40 \\Rightarrow 4y = 40 \\Rightarrow y = 10$. El padre tiene $30$ años.",
    },
    {
      id: "check-numeros",
      type: "predict",
      help: [
        {
          label: "Traduce",
          message: "«El triple del menor supera en una unidad al doble del mayor»: $3x = 2y + 1$.",
        },
        {
          label: "Sustituye",
          message: "De $x + y = 12$: $y = 12 - x$. Entonces $3x = 2(12 - x) + 1$.",
        },
      ],
      title: "Dos números",
      question: "La suma de dos números es $12$ y el triple del menor supera en una unidad al doble del mayor. ¿Cuáles son?",
      mode: "choice",
      choices: [
        { id: "a", label: "$5$ y $7$" },
        { id: "b", label: "$4$ y $8$", incorrectFeedback: "$3 \\cdot 4 = 12$ y $2 \\cdot 8 + 1 = 17$: no coinciden." },
        { id: "c", label: "$6$ y $6$", incorrectFeedback: "El triple del menor sería $18$ y el doble del mayor $12$." },
        { id: "d", label: "$3$ y $9$", incorrectFeedback: "$3 \\cdot 3 = 9$ y $2 \\cdot 9 + 1 = 19$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3x = 2(12 - x) + 1 \\Rightarrow 5x = 25 \\Rightarrow x = 5$ e $y = 7$. Comprobación: $3 \\cdot 5 = 15 = 2 \\cdot 7 + 1$.",
    },
  ],
};
