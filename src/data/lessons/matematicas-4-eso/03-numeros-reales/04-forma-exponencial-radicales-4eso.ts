import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const formaExponencialRadicales4esoLesson: InteractiveLesson = {
  slug: "forma-exponencial-radicales-4eso",
  title: "4. Radicales como potencias",
  subtitle: TEMA_4ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "exponente-fraccionario",
      type: "slide",
      help: [
        {
          label: "La idea",
          message: "$\\sqrt{a} = a^{1/2}$ porque $(a^{1/2})^2 = a^{1/2 \\cdot 2} = a^1 = a$: elevado al cuadrado devuelve $a$, igual que la raíz cuadrada.",
        },
        {
          label: "Dónde va cada cosa",
          message: "En $a^{m/n}$: el **numerador** es el exponente del radicando y el **denominador** es el **índice** de la raíz.",
        },
      ],
      title: "Un exponente fraccionario es una raíz",
      blocks: [
        {
          kind: "rule",
          formula: "\\sqrt[n]{a^{m}} = a^{\\,m/n}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{5} = 5^{1/2}" },
            { math: "\\sqrt[5]{2^3} = 2^{3/5}" },
            { math: "\\sqrt[3]{64} = \\sqrt[3]{2^6} = 2^{6/3} = 2^2 = 4" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "radical-potencia", params: { a: 3, b: 2 } },
    },
    {
      id: "explora-exponencial",
      type: "slide",
      help: [
        {
          label: "Cuando desaparece el radical",
          message: "Si $m$ es múltiplo de $n$, $\\frac{m}{n}$ es un entero y la raíz se calcula exactamente: $\\sqrt[3]{a^6} = a^2$.",
        },
      ],
      title: "Explora: exponente e índice",
      blocks: [
        {
          kind: "text",
          text: "Cambia el exponente del radicando y el índice. Mira cómo se simplifica la fracción $\\frac{m}{n}$ y cuándo **desaparece el radical**.",
        },
      ],
      visual: { kind: "tool", tool: "radical-exponencial-explorador", params: { a: 6, b: 4 }, hint: "Busca tres parejas (exponente, índice) en las que el radical desaparezca." },
    },
    {
      id: "check-pasar",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Numerador y denominador",
          message: "El denominador de la fracción es el índice; el numerador, el exponente del radicando.",
        },
      ],
      title: "De potencia a radical",
      question: "¿Cómo se escribe $x^{7/9}$ en forma de radical?",
      choices: [
        { id: "a", label: "$\\sqrt[9]{x^{7}}$" },
        { id: "b", label: "$\\sqrt[7]{x^{9}}$", incorrectFeedback: "Se han intercambiado: el **denominador** $9$ es el índice y el numerador $7$ el exponente." },
        { id: "c", label: "$\\sqrt[16]{x}$", incorrectFeedback: "No se suman: el numerador y el denominador tienen funciones distintas." },
        { id: "d", label: "$\\sqrt{x^{7/9}}$", incorrectFeedback: "Eso es otra potencia; la fracción $\\frac{7}{9}$ se convierte en índice y exponente." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x^{7/9} = \\sqrt[9]{x^{7}}$: índice $9$, exponente $7$.",
    },
    {
      id: "check-potencias",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Primero la raíz",
          message: "$125^{2/3} = (\\sqrt[3]{125})^2 = 5^2$. Es más fácil sacar primero la raíz y luego elevar.",
        },
      ],
      title: "Con exponente fraccionario",
      question: "Calcula $125^{2/3}$. (solo el número)",
      correctAnswers: ["25"],
      explanation: "$125^{2/3} = (\\sqrt[3]{125})^2 = 5^2 = 25$.",
    },
    {
      id: "check-potencias-2",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Raíz y luego potencia",
          message: "$36^{3/2} = (\\sqrt{36})^3 = 6^3$.",
        },
      ],
      title: "Otra con exponente fraccionario",
      question: "Calcula $36^{3/2}$. (solo el número)",
      correctAnswers: ["216"],
      explanation: "$36^{3/2} = (\\sqrt{36})^3 = 6^3 = 216$.",
    },
    {
      id: "check-81",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Raíz cuarta",
          message: "$81^{3/4} = (\\sqrt[4]{81})^3 = 3^3$.",
        },
      ],
      title: "Una raíz cuarta",
      question: "Calcula $81^{3/4}$. (solo el número)",
      correctAnswers: ["27"],
      explanation: "$81^{3/4} = (\\sqrt[4]{81})^3 = 3^3 = 27$.",
    },
    {
      id: "calculadora",
      type: "slide",
      help: [
        {
          label: "La tecla de potencia",
          message: "La tecla de potencia ($x^y$ o $\\wedge$) permite elevar a un exponente decimal o fraccionario. Con ella se calcula cualquier raíz: $\\sqrt[5]{32} = 32^{1/5}$.",
        },
        {
          label: "Paréntesis",
          message: "Al teclear $32^{1/5}$ escribe el exponente **entre paréntesis**: $32 ^ (1 \\div 5)$. Si no, la calculadora hace $32^1 \\div 5$.",
        },
      ],
      title: "Raíces con la calculadora",
      blocks: [
        {
          kind: "steps",
          title: "Dos formas",
          items: [
            "Raíz cuadrada: tecla √ y el radicando ($\\sqrt{247}$).",
            "Raíz de cualquier índice: tecla de raíz $\\sqrt[x]{\\ }$ (según el modelo, primero el índice o primero el radicando).",
            "Con la tecla de potencia: $\\sqrt[5]{32^3} = 32^{3/5}$ se teclea $32 \\wedge (3 \\div 5)$.",
          ],
        },
        {
          kind: "warning",
          text: "El exponente fraccionario **va entre paréntesis**: $32^{3/5}$ se teclea $32 \\wedge (3 \\div 5)$, no $32 \\wedge 3 \\div 5$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-calc",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Potencia con exponente fraccionario",
          message: "$0{,}8^{3/5} = 0{,}8 \\wedge (3 \\div 5) \\approx 0{,}8747$. Redondea a tres decimales.",
        },
      ],
      title: "Con la calculadora",
      question: "Calcula $0{,}8^{3/5}$ y redondea a tres decimales. (escribe el número con coma)",
      correctAnswers: ["0,875", "0.875"],
      explanation: "$0{,}8^{3/5} \\approx 0{,}8747 \\approx 0{,}875$.",
    },
  ],
};
