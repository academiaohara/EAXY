import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const operacionesRadicales4esoLesson: InteractiveLesson = {
  slug: "operaciones-radicales-4eso",
  title: "6. Operar con radicales",
  subtitle: TEMA_4ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Mismo índice",
          message: "Esta regla vale cuando los radicales tienen **el mismo índice**: $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{a \\cdot b}$.",
        },
        {
          label: "Después, simplifica",
          message: "Tras multiplicar, descompón el radicando y extrae factores: $\\sqrt{15} \\cdot \\sqrt{20} = \\sqrt{300} = 10\\sqrt{3}$.",
        },
      ],
      title: "Producto de radicales del mismo índice",
      blocks: [
        {
          kind: "rule",
          formula: "\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{a \\cdot b}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4" },
            { math: "\\sqrt{15} \\cdot \\sqrt{20} = \\sqrt{300} = \\sqrt{10^2 \\cdot 3} = 10\\sqrt{3}" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["√15", "·", "√20"], active: [0, 2], note: "mismo índice: se multiplican los radicandos." },
            { tokens: ["√(15·20)"], active: [0, 0], note: "$15 \\cdot 20 = 300$." },
            { tokens: ["√300"], active: [0, 0], note: "$300 = 10^2 \\cdot 3$: sale un $10$." },
            { tokens: ["10√3"], fresh: [0, 0], note: "resultado simplificado." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Multiplica y saca",
          message: "$\\sqrt{5} \\cdot \\sqrt{20} = \\sqrt{100} = 10$.",
        },
      ],
      title: "Un producto exacto",
      question: "Calcula $\\sqrt{5} \\cdot \\sqrt{20}$. (solo el número)",
      correctAnswers: ["10"],
      explanation: "$\\sqrt{5 \\cdot 20} = \\sqrt{100} = 10$.",
    },
    {
      id: "potencia-raiz",
      type: "slide",
      help: [
        {
          label: "Potencia de un radical",
          message: "$(\\sqrt[n]{a})^k = \\sqrt[n]{a^k}$: el exponente entra en el radicando.",
        },
        {
          label: "Raíz de una raíz",
          message: "$\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[m \\cdot n]{a}$: los índices se multiplican. Con exponentes: $(a^{1/n})^{1/m} = a^{1/(n \\cdot m)}$.",
        },
      ],
      title: "Potencia de un radical y raíz de una raíz",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "(\\sqrt[n]{a})^{k} = \\sqrt[n]{a^{k}}" },
            { tex: "\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[m \\cdot n]{a}" },
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "(\\sqrt[3]{2^3})^4 = \\sqrt[3]{2^{12}} = 2^{12/3} = 2^4 = 16" },
            { math: "\\sqrt{\\sqrt{5}} = \\sqrt[4]{5}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "radical-potencia", params: { a: 3, b: 12 } },
    },
    {
      id: "check-raiz-raiz",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Multiplica índices",
          message: "$\\sqrt[3]{\\sqrt{7}}$: los índices $3$ y $2$ se multiplican: $\\sqrt[6]{7}$.",
        },
      ],
      title: "Raíz de una raíz",
      question: "Escribe con una sola raíz: $\\sqrt[3]{\\sqrt{7}}$.",
      choices: [
        { id: "a", label: "$\\sqrt[6]{7}$" },
        { id: "b", label: "$\\sqrt[5]{7}$", incorrectFeedback: "Los índices se **multiplican**, no se suman." },
        { id: "c", label: "$\\sqrt[3]{7}$", incorrectFeedback: "Falta tener en cuenta el índice $2$ de la raíz interior." },
        { id: "d", label: "$\\sqrt{7^3}$", incorrectFeedback: "Eso es una potencia dentro de una raíz, no una raíz de otra raíz." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt[3]{\\sqrt{7}} = (7^{1/2})^{1/3} = 7^{1/6} = \\sqrt[6]{7}$.",
    },
    {
      id: "suma",
      type: "slide",
      help: [
        {
          label: "Como términos semejantes",
          message: "Es igual que $7x + 11x - x = 17x$. Aquí la «x» es $\\sqrt{5}$.",
        },
        {
          label: "Extrae factores primero",
          message: "Antes de decir que no se pueden sumar, **simplifica cada radical** y mira si aparecen radicales idénticos.",
        },
      ],
      title: "Sumar y restar: solo radicales idénticos",
      blocks: [
        {
          kind: "text",
          text: "Solo se pueden sumar y restar **radicales idénticos** (mismo índice y mismo radicando), como términos semejantes. Si no lo son, se deja indicado.",
        },
        {
          kind: "warning",
          text: "$\\sqrt{2} + \\sqrt{3} \\neq \\sqrt{5}$. La raíz de una suma **no** es la suma de las raíces.",
        },
      ],
      visual: { kind: "anim", scene: "radicales-semejantes" },
    },
    {
      id: "check-suma-1",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Extrae factores",
          message: "$\\sqrt{32} = 4\\sqrt{2}$, $\\sqrt{18} = 3\\sqrt{2}$, $\\sqrt{50} = 5\\sqrt{2}$. Suma los coeficientes: $4 + 3 - 5$.",
        },
      ],
      title: "Semejanza oculta",
      question: "$\\sqrt{32} + \\sqrt{18} - \\sqrt{50} = k\\sqrt{2}$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$4\\sqrt{2} + 3\\sqrt{2} - 5\\sqrt{2} = 2\\sqrt{2}$.",
    },
    {
      id: "check-suma-2",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Todo a √7",
          message: "$\\sqrt{63} = 3\\sqrt{7}$, $5\\sqrt{28} = 10\\sqrt{7}$, $\\sqrt{112} = 4\\sqrt{7}$. Coeficientes: $3 - 10 + 4$.",
        },
      ],
      title: "Con tres radicales",
      question: "$\\sqrt{63} - 5\\sqrt{28} + \\sqrt{112} = k\\sqrt{7}$. ¿Cuánto vale $k$? (escribe el número con su signo)",
      correctAnswers: ["-3", "−3"],
      explanation: "$3\\sqrt{7} - 10\\sqrt{7} + 4\\sqrt{7} = -3\\sqrt{7}$.",
    },
    {
      id: "check-no-suma",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Aproxima",
          message: "$\\sqrt{3} + \\sqrt{2} \\approx 1{,}732 + 1{,}414 = 3{,}146$, mientras que $\\sqrt{5} \\approx 2{,}236$.",
        },
      ],
      title: "¿Se puede?",
      question: "¿Qué se puede afirmar de $\\sqrt{3} + \\sqrt{2}$?",
      choices: [
        { id: "a", label: "No se puede simplificar a un solo radical; se deja indicado" },
        { id: "b", label: "Es igual a $\\sqrt{5}$", incorrectFeedback: "Aproximando, $1{,}732 + 1{,}414 = 3{,}146$ y $\\sqrt{5} \\approx 2{,}236$: no coinciden." },
        { id: "c", label: "Es igual a $\\sqrt{6}$", incorrectFeedback: "$\\sqrt{6} \\approx 2{,}449$, y la suma da casi $3{,}146$. Además, $\\sqrt{6}$ sería el producto, no la suma." },
        { id: "d", label: "Vale $5$", incorrectFeedback: "Se han sumado los radicandos ($3 + 2$) y se ha quitado la raíz. Eso no es válido." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt{3}$ y $\\sqrt{2}$ no son radicales idénticos y no admiten simplificación. Se deja $\\sqrt{3} + \\sqrt{2}$ (≈ 3,146).",
    },
  ],
};
