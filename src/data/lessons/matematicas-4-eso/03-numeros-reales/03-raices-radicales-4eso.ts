import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const raicesRadicales4esoLesson: InteractiveLesson = {
  slug: "raices-radicales-4eso",
  title: "3. Raíces y radicales",
  subtitle: TEMA_4ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "Nombres",
          message: "En $\\sqrt[n]{a}$: $n$ es el **índice**, $a$ el **radicando** y todo el conjunto se llama **radical**. Si no hay índice, es $2$ (raíz cuadrada).",
        },
        {
          label: "Comprobación",
          message: "Para saber si $\\sqrt[n]{a} = b$ basta comprobar que $b^n = a$. Por ejemplo, $\\sqrt[4]{81} = 3$ porque $3^4 = 81$.",
        },
      ],
      title: "La raíz n-ésima",
      blocks: [
        {
          kind: "definition",
          text: "La **raíz $n$-ésima** de $a$, $\\sqrt[n]{a}$, es el número $b$ tal que $b^n = a$.",
        },
        {
          kind: "rule",
          formula: "\\sqrt[n]{a} = b \\iff b^{n} = a",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt[5]{32} = 2 \\ \\text{pues}\\ 2^5 = 32" },
            { math: "\\sqrt[3]{-8} = -2 \\ \\text{pues}\\ (-2)^3 = -8" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "raiz-indice-explorador", params: { a: 5, b: 32 }, hint: "Busca radicandos para los que salga una raíz exacta con índice 3." },
    },
    {
      id: "peculiaridades",
      type: "slide",
      help: [
        {
          label: "Por qué no hay √(−4)",
          message: "Un número real elevado a un exponente **par** nunca es negativo: $(+2)^2 = 4$ y $(-2)^2 = 4$. Ninguno da $-4$.",
        },
        {
          label: "Las dos raíces",
          message: "Un positivo tiene dos raíces cuadradas, $\\sqrt{a}$ y $-\\sqrt{a}$. El símbolo $\\sqrt{4}$ designa solo la **positiva**: $\\sqrt{4} = 2$.",
        },
      ],
      title: "Cuándo existe y cuál es",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "a \\ge 0 \\Rightarrow \\sqrt[n]{a}\\ \\text{existe}" },
            { tex: "a < 0 \\Rightarrow \\text{solo índice impar}" },
          ],
        },
        {
          kind: "warning",
          text: "$\\sqrt{4} = 2$, **no** $\\pm 2$. El símbolo es la raíz positiva; el número $4$ tiene dos raíces cuadradas, $\\sqrt{4}$ y $-\\sqrt{4}$.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt[3]{-27} = -3 \\quad (\\text{índice impar: existe})" },
            { math: "\\sqrt{-9} \\ \\text{no existe en } \\mathbb{R} \\quad (\\text{índice par})" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "raiz-indice-explorador", params: { a: 2, b: -4 }, hint: "Con índice 2 y radicando negativo, ¿qué ocurre? Cambia el índice a 3." },
    },
    {
      id: "check-existe",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Índice y signo",
          message: "Una raíz de índice **par** de un número negativo no existe en los reales. Con índice impar, siempre existe.",
        },
      ],
      title: "¿Cuál no existe?",
      question: "¿Cuál de estas raíces **no existe** en los números reales?",
      choices: [
        { id: "a", label: "$\\sqrt[4]{-16}$" },
        { id: "b", label: "$\\sqrt[3]{-27}$", incorrectFeedback: "Índice impar: existe. $(-3)^3 = -27$." },
        { id: "c", label: "$\\sqrt[5]{-1}$", incorrectFeedback: "Índice impar: existe. $(-1)^5 = -1$." },
        { id: "d", label: "$\\sqrt[3]{0}$", incorrectFeedback: "$0^3 = 0$: existe y vale $0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Ningún real elevado a $4$ da $-16$: una potencia de exponente par nunca es negativa.",
    },
    {
      id: "check-k-1",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Comprueba",
          message: "Busca $b$ tal que $b^5 = -243$. Como $3^5 = 243$, con signo negativo es $(-3)^5 = -243$.",
        },
      ],
      title: "Una raíz quinta",
      question: "Calcula $\\sqrt[5]{-243}$. (escribe el número con su signo)",
      correctAnswers: ["-3", "−3"],
      explanation: "$(-3)^5 = -243$: el índice es impar, así que la raíz de un negativo es negativa.",
    },
    {
      id: "check-k-2",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Diez a la sexta",
          message: "$10^6 = 1\\,000\\,000$.",
        },
      ],
      title: "Una raíz sexta",
      question: "Calcula $\\sqrt[6]{1\\,000\\,000}$. (solo el número)",
      correctAnswers: ["10"],
      explanation: "$10^6 = 1\\,000\\,000$, luego la raíz sexta es $10$.",
    },
    {
      id: "check-decimal",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Decimales",
          message: "$0{,}2^4 = 0{,}0016$: cuatro factores de $0{,}2$.",
        },
      ],
      title: "Una raíz de un decimal",
      question: "Calcula $\\sqrt[4]{0{,}0016}$. (escribe el número con coma)",
      correctAnswers: ["0,2", "0.2"],
      explanation: "$0{,}2^4 = 0{,}0016$, luego $\\sqrt[4]{0{,}0016} = 0{,}2$.",
    },
    {
      id: "check-negativa",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Positiva",
          message: "$\\sqrt{25}$ es solo la raíz positiva. Los números que elevados al cuadrado dan $25$ son $5$ y $-5$.",
        },
      ],
      title: "Una raíz cuadrada",
      question: "¿Cuánto vale $\\sqrt{25}$?",
      choices: [
        { id: "a", label: "$5$" },
        { id: "b", label: "$-5$", incorrectFeedback: "El símbolo $\\sqrt{\\ }$ es la raíz **positiva**. $-5$ es la otra raíz cuadrada de $25$, que se escribe $-\\sqrt{25}$." },
        { id: "c", label: "$\\pm 5$", incorrectFeedback: "El número $25$ tiene dos raíces cuadradas, pero el símbolo $\\sqrt{25}$ designa solo una: la positiva, $5$." },
        { id: "d", label: "$12{,}5$", incorrectFeedback: "Eso sería la mitad. La raíz cuadrada es el número que elevado al cuadrado da $25$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt{25} = 5$, pues $5^2 = 25$. La otra raíz cuadrada de $25$ es $-5 = -\\sqrt{25}$.",
    },
  ],
};
