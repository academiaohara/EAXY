import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const interesBancario4esoLesson: InteractiveLesson = {
  slug: "interes-bancario-4eso",
  title: "8. Interés bancario",
  subtitle: TEMA_4ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "interes",
      type: "slide",
      help: [
        {
          label: "Qué significa 4 % anual",
          message: "Un rédito del $4\\,\\%$ anual significa que $100$ € colocados un año producen $4$ €.",
        },
        {
          label: "Compuesta",
          message: "Es proporcionalidad directa con el capital **y** con el tiempo: duplicas uno y el interés se duplica; duplicas los dos y se multiplica por cuatro.",
        },
      ],
      title: "El interés: beneficio del dinero prestado",
      blocks: [
        {
          kind: "definition",
          text: "El **interés** es el beneficio que produce el dinero prestado. Es **directamente proporcional** al capital prestado y al tiempo. El tanto por ciento anual es el **rédito** $r$.",
        },
        {
          kind: "rule",
          title: "Interés simple",
          formula: "I = \\dfrac{C \\cdot r \\cdot t}{100}",
        },
        {
          kind: "text",
          text: "$C$ es el capital, $r$ el rédito en \\% anual y $t$ el tiempo **en años**.",
        },
      ],
      visual: { kind: "anim", scene: "interes-proporcional", params: { a: 750, b: 4, c: 3 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Meses",
          message: "Si el tiempo está en meses, se pasa a años dividiendo entre $12$: $5$ meses $= \\frac{5}{12}$ de año.",
        },
      ],
      title: "Explora: capital, rédito y tiempo",
      blocks: [
        {
          kind: "text",
          text: "Cambia el capital, el rédito y los meses. Comprueba que si **duplicas el capital** el interés se duplica y si **duplicas el tiempo** también.",
        },
        {
          kind: "warning",
          text: "Pasa siempre el tiempo a **años** antes de aplicar la fórmula. Con meses, $t = \\frac{\\text{meses}}{12}$.",
        },
      ],
      visual: { kind: "tool", tool: "interes-explorador", params: { a: 750, b: 4, c: 36 }, hint: "Duplica el tiempo y luego el capital: ¿cómo cambia el interés en cada caso?" },
    },
    {
      id: "check-750",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Fórmula",
          message: "$\\frac{750 \\cdot 4 \\cdot 3}{100} = 90$.",
        },
      ],
      title: "Interés a tres años",
      question: "Un banco ofrece un $4\\,\\%$ anual. ¿Qué interés producen $750$ € durante $3$ años? (solo el número, en euros)",
      correctAnswers: ["90"],
      explanation: "$I = \\frac{750 \\cdot 4 \\cdot 3}{100} = 90$ €.",
    },
    {
      id: "check-8000",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Fórmula",
          message: "$\\frac{8\\,000 \\cdot 5 \\cdot 3}{100}$.",
        },
      ],
      title: "Capital grande",
      question: "Calcula el interés que producen $8\\,000$ € al $5\\,\\%$ anual durante $3$ años. (solo el número, en euros)",
      correctAnswers: ["1200"],
      explanation: "$I = \\frac{8\\,000 \\cdot 5 \\cdot 3}{100} = 1\\,200$ €.",
    },
    {
      id: "check-prestamo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Préstamo",
          message: "En un préstamo, el interés es lo que **pagas** de más: $\\frac{3\\,000 \\cdot 8 \\cdot 2}{100}$.",
        },
      ],
      title: "Un préstamo",
      question: "¿Qué interés hay que pagar por un préstamo de $3\\,000$ € al $8\\,\\%$ anual que se devuelve a los $2$ años? (solo el número, en euros)",
      correctAnswers: ["480"],
      explanation: "$I = \\frac{3\\,000 \\cdot 8 \\cdot 2}{100} = 480$ €.",
    },
    {
      id: "meses",
      type: "slide",
      help: [
        {
          label: "Un mes",
          message: "Un mes es $\\frac{1}{12}$ de año: el interés de un mes es el anual dividido entre $12$.",
        },
      ],
      title: "Cuando el tiempo son meses",
      blocks: [
        {
          kind: "example",
          title: "40 000 € al 3,25 % anual",
          lines: [
            { math: "1\\ \\text{año:}\\ \\dfrac{40\\,000 \\cdot 3{,}25 \\cdot 1}{100} = 1\\,300\\ €" },
            { math: "1\\ \\text{mes:}\\ 1\\,300 : 12 \\approx 108{,}33\\ €" },
            { math: "5\\ \\text{meses:}\\ \\dfrac{40\\,000 \\cdot 3{,}25 \\cdot \\frac{5}{12}}{100} \\approx 541{,}67\\ €" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "interes-explorador", params: { a: 40000, b: 3, c: 5 }, hint: "Deja el capital en 40 000, sube el rédito al 3 % y observa el interés de 5 meses." },
    },
    {
      id: "check-meses",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Interés anual primero",
          message: "$1\\,300$ € al año. En $5$ meses: $1\\,300 \\cdot \\frac{5}{12}$.",
        },
      ],
      title: "Cinco meses",
      question: "¿Qué interés producen $40\\,000$ € al $3{,}25\\,\\%$ anual en $5$ meses? Redondea a céntimos (escribe el número con coma).",
      correctAnswers: ["541,67", "541.67"],
      explanation: "$1\\,300 \\cdot \\frac{5}{12} = 541{,}666\\ldots \\approx 541{,}67$ €.",
    },
    {
      id: "check-anual",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Cobra cada año",
          message: "Si los beneficios se cobran cada año, el capital **no crece**: cada año produce lo mismo, $\\frac{24\\,000 \\cdot 6}{100}$.",
        },
      ],
      title: "Beneficio cada año",
      question: "Jorge deja $24\\,000$ € cinco años en un banco al $6\\,\\%$ anual y cobra los beneficios cada año. ¿Cuánto cobra en total en los cinco años? (solo el número, en euros)",
      correctAnswers: ["7200"],
      explanation: "Cada año: $\\frac{24\\,000 \\cdot 6}{100} = 1\\,440$ €. En cinco años: $5 \\cdot 1\\,440 = 7\\,200$ €.",
    },
    {
      id: "check-16500",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Fórmula",
          message: "$\\frac{16\\,500 \\cdot 6 \\cdot 5}{100}$.",
        },
      ],
      title: "Retirando los intereses",
      question: "Se coloca un capital de $16\\,500$ € al $6\\,\\%$ y se retiran los intereses cada año. ¿Qué beneficio se obtiene en $5$ años? (solo el número, en euros)",
      correctAnswers: ["4950"],
      explanation: "$I = \\frac{16\\,500 \\cdot 6 \\cdot 5}{100} = 4\\,950$ €.",
    },
  ],
};
