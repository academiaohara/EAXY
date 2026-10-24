import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const simplificarExtraerFactores4esobLesson: InteractiveLesson = {
  slug: "simplificar-extraer-factores-4esob",
  title: "7. Simplificar radicales y extraer factores",
  subtitle: TEMA_4ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "simplificar",
      type: "slide",
      help: [
        {
          label: "Misma fracción, menos radical",
          message: "Si el exponente del radicando y el índice tienen divisores comunes, se simplifica la fracción del exponente: $\\sqrt[6]{2^3} = 2^{3/6} = 2^{1/2} = \\sqrt{2}$.",
        },
        {
          label: "Cuándo no",
          message: "Si $\\frac{m}{n}$ es irreducible, el radical no se simplifica más de esta forma. Quizá se puedan **extraer** factores (siguiente diapositiva).",
        },
      ],
      title: "Simplificar: reducir el exponente fraccionario",
      blocks: [
        {
          kind: "steps",
          title: "Para simplificar un radical",
          items: [
            "Escribe el radicando como potencia: $\\sqrt[6]{8} = \\sqrt[6]{2^3}$.",
            "Pásalo a exponente fraccionario: $2^{3/6}$.",
            "Simplifica la fracción: $2^{1/2}$.",
            "Vuelve a radical: $\\sqrt{2}$.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "radical-potencia", params: { a: 6, b: 3 } },
    },
    {
      id: "check-simplificar",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Fracción del exponente",
          message: "$\\sqrt[4]{5^2} = 5^{2/4} = 5^{1/2} = \\sqrt{5}$.",
        },
      ],
      title: "¿A qué se reduce?",
      question: "¿Cuál es el radical simplificado de $\\sqrt[4]{5^{2}}$?",
      choices: [
        { id: "a", label: "$\\sqrt{5}$" },
        { id: "b", label: "$\\sqrt[2]{5^4}$", incorrectFeedback: "Se han intercambiado el índice y el exponente. Con $5^{2/4}$ el índice es el denominador." },
        { id: "c", label: "$\\sqrt[4]{5}$", incorrectFeedback: "No se puede quitar el exponente $2$ sin tocar el índice: $\\frac{2}{4} = \\frac{1}{2}$ cambia **los dos**." },
        { id: "d", label: "$5$", incorrectFeedback: "$5^{1/2}$ no es $5$: sería $5^{1}$ si la raíz fuese exacta." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt[4]{5^2} = 5^{2/4} = 5^{1/2} = \\sqrt{5}$.",
    },
    {
      id: "extraer",
      type: "slide",
      help: [
        {
          label: "Por qué sale un factor",
          message: "$\\sqrt{3^2 \\cdot 2} = \\sqrt{3^2} \\cdot \\sqrt{2} = 3\\sqrt{2}$: la raíz del cuadrado de un número es el propio número, así que «sale» fuera.",
        },
        {
          label: "Con otro índice",
          message: "Con índice $3$ salen los factores que están **al cubo** (de tres en tres). Con índice $4$, de cuatro en cuatro.",
        },
      ],
      title: "Extraer factores de la raíz",
      blocks: [
        {
          kind: "rule",
          text: "Si al descomponer el radicando salen potencias de **exponente igual o mayor que el índice**, esos factores pueden salir fuera de la raíz.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{18} = \\sqrt{3^2 \\cdot 2} = 3\\sqrt{2}" },
            { math: "\\sqrt{720} = \\sqrt{2^4 \\cdot 3^2 \\cdot 5} = 2^2 \\cdot 3 \\sqrt{5} = 12\\sqrt{5}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "radical-extraer", params: { a: 720, b: 2 } },
    },
    {
      id: "explora-extraer",
      type: "slide",
      help: [
        {
          label: "Cuadrados perfectos",
          message: "Un radicando que sea múltiplo de un cuadrado perfecto ($4, 9, 16, 25, \\dots$) siempre permite extraer algo.",
        },
      ],
      title: "Explora: ¿qué sale y qué se queda?",
      blocks: [
        {
          kind: "text",
          text: "Prueba distintos radicandos e índices. La herramienta descompone, agrupa y te dice **qué sale y qué queda dentro**.",
        },
      ],
      visual: { kind: "tool", tool: "radical-simplificador", params: { a: 720, b: 2 }, hint: "Encuentra un radicando entre 2 y 100 con índice 2 en el que no pueda salir ningún factor." },
    },
    {
      id: "indice-3",
      type: "slide",
      help: [
        {
          label: "Grupos de tres",
          message: "Con $\\sqrt[3]{81} = \\sqrt[3]{3^4}$: un grupo de tres $3$ sale como un $3$; queda un $3$ dentro.",
        },
      ],
      title: "Con índice 3: grupos de tres",
      blocks: [
        {
          kind: "text",
          text: "En una raíz cúbica los factores salen **de tres en tres**. Lo que no completa grupo se queda dentro.",
        },
        {
          kind: "example",
          lines: [{ math: "\\sqrt[3]{81} = \\sqrt[3]{3^4} = \\sqrt[3]{3^3 \\cdot 3} = 3\\sqrt[3]{3}" }],
        },
      ],
      visual: { kind: "anim", scene: "radical-extraer", params: { a: 81, b: 3 } },
    },
    {
      id: "check-50",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Descompón",
          message: "$50 = 2 \\cdot 5^2$, así que $\\sqrt{50} = \\sqrt{5^2 \\cdot 2} = 5\\sqrt{2}$.",
        },
      ],
      title: "Un factor que sale",
      question: "Al extraer factores, $\\sqrt{50} = k\\sqrt{2}$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$50 = 5^2 \\cdot 2$, luego $\\sqrt{50} = 5\\sqrt{2}$.",
    },
    {
      id: "check-175",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Descompón",
          message: "$175 = 5^2 \\cdot 7$. Sale el $5$ y queda el $7$.",
        },
      ],
      title: "Extraer factores",
      question: "Simplifica $\\sqrt{175}$.",
      choices: [
        { id: "a", label: "$5\\sqrt{7}$" },
        { id: "b", label: "$7\\sqrt{5}$", incorrectFeedback: "$175 = 5^2 \\cdot 7$: sale el $5$ (que está al cuadrado) y queda $7$. Has intercambiado ambos." },
        { id: "c", label: "$25\\sqrt{7}$", incorrectFeedback: "Del radical sale la raíz de $5^2$, es decir, $5$; no $25$." },
        { id: "d", label: "$\\sqrt{175}$ no se puede simplificar", incorrectFeedback: "Sí: $175 = 5^2 \\cdot 7$ tiene un cuadrado perfecto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt{175} = \\sqrt{5^2 \\cdot 7} = 5\\sqrt{7}$.",
    },
    {
      id: "check-cubica",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Índice 3",
          message: "$16 = 2^4 = 2^3 \\cdot 2$: sale un $2$ de la raíz cúbica y queda $\\sqrt[3]{2}$.",
        },
      ],
      title: "Con una raíz cúbica",
      question: "Simplifica $\\sqrt[3]{16}$.",
      choices: [
        { id: "a", label: "$2\\sqrt[3]{2}$" },
        { id: "b", label: "$4\\sqrt[3]{2}$", incorrectFeedback: "$16 = 2^3 \\cdot 2$: sale solo un $2$ (la raíz cúbica de $2^3$)." },
        { id: "c", label: "$2\\sqrt{2}$", incorrectFeedback: "El índice sigue siendo $3$ al extraer un factor." },
        { id: "d", label: "$\\sqrt[3]{16}$ no se puede simplificar", incorrectFeedback: "Sí: $16 = 2^3 \\cdot 2$ contiene un cubo perfecto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt[3]{16} = \\sqrt[3]{2^3 \\cdot 2} = 2\\sqrt[3]{2}$.",
    },
    {
      id: "check-720",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Pares de 2 y de 3",
          message: "$720 = 2^4 \\cdot 3^2 \\cdot 5$: salen $2^2 \\cdot 3 = 12$. Queda $5$.",
        },
      ],
      title: "Un radicando grande",
      question: "Al extraer factores, $\\sqrt{720} = k\\sqrt{5}$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$720 = 2^4 \\cdot 3^2 \\cdot 5$: de $2^4$ sale $2^2 = 4$, de $3^2$ sale $3$. $4 \\cdot 3 = 12$.",
    },
  ],
};
