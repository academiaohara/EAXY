import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const numeroIComplejos1bachLesson: InteractiveLesson = {
  slug: "numero-i-complejos-1bach",
  title: "8. El número i y los complejos",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "necesidad",
      type: "slide",
      help: [
        { label: "¿Imaginario es inexistente?", message: "No. El nombre viene de que los algebristas dudaban de estos números. Hoy son imprescindibles en electricidad (donde se escribe $j$, porque $i$ es la intensidad), aerodinámica o señales." },
      ],
      title: "Una ecuación sin solución real",
      blocks: [
        { kind: "text", text: "En $\\mathbb{R}$ la ecuación $x^2 + 1 = 0$ no tiene solución: el cuadrado de un real nunca es negativo. La salida es **inventar** un número nuevo." },
        { kind: "definition", text: "La **unidad imaginaria** $i$ cumple $i^2 = -1$, es decir, $i = \\sqrt{-1}$. Con ella $x^2 + 1 = 0$ tiene solución: $x = i$ y $x = -i$." },
        { kind: "text", text: "Euler le dio el nombre $i$ en 1777. Leibniz lo llamaba «una especie de anfibio entre el ser y la nada»." },
      ],
      arrange: "stack",
    },
    {
      id: "binomica",
      type: "slide",
      help: [
        { label: "Los reales están dentro", message: "Si $y = 0$, $z = x + 0i = x$ es un número real. Por tanto $\\mathbb{R} \\subset \\mathbb{C}$." },
      ],
      title: "Forma binómica",
      blocks: [
        { kind: "rule", title: "Un número complejo", formula: "z = x + yi,\\qquad x, y \\in \\mathbb{R}" },
        { kind: "facts", items: [
          { tex: "\\text{Re}(z) = x", label: "parte real" },
          { tex: "\\text{Im}(z) = y", label: "parte imaginaria" },
          { tex: "z = x + 0i", label: "real (y = 0)" },
          { tex: "z = 0 + yi", label: "imaginario puro (x = 0)" },
        ] },
        { kind: "text", text: "Dos complejos son **iguales** solo si coinciden sus partes reales **y** sus partes imaginarias." },
      ],
      arrange: "stack",
    },
    {
      id: "check-partes",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En $x + yi$ la parte imaginaria es el coeficiente $y$ (sin la $i$)." }],
      title: "Partes de un complejo",
      question: "En el número $z = 3 - 5i$, ¿cuánto valen $\\text{Re}(z)$ e $\\text{Im}(z)$?",
      choices: [
        { id: "a", label: "$\\text{Re}(z) = 3$ e $\\text{Im}(z) = -5$" },
        { id: "b", label: "$\\text{Re}(z) = 3$ e $\\text{Im}(z) = -5i$", incorrectFeedback: "La parte imaginaria es el número real que multiplica a $i$, es decir, $-5$, sin la $i$." },
        { id: "c", label: "$\\text{Re}(z) = -5$ e $\\text{Im}(z) = 3$", incorrectFeedback: "Has cambiado el orden: primero va la parte real." },
        { id: "d", label: "$\\text{Re}(z) = 5$ e $\\text{Im}(z) = 3$", incorrectFeedback: "El signo forma parte de la parte imaginaria: es $-5$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$z = 3 + (-5)\\,i$: parte real $3$, parte imaginaria $-5$.",
    },
    {
      id: "potencias",
      type: "slide",
      help: [
        { label: "Exponente negativo", message: "$i^{-3} = \\frac{1}{i^3} = \\frac{1}{-i} = \\frac{i}{-i\\cdot i} = \\frac{i}{1} = i$. Basta restar múltiplos de 4 al exponente." },
      ],
      title: "Las potencias de i se repiten",
      blocks: [
        { kind: "facts", items: [
          { tex: "i^1 = i" }, { tex: "i^2 = -1" }, { tex: "i^3 = -i" }, { tex: "i^4 = 1" },
        ] },
        { kind: "rule", title: "Ciclo de 4", text: "Como $i^4 = 1$, solo importa el **resto de dividir el exponente entre 4**: $i^n = i^{r}$.", formula: "i^{27} = i^{4\\cdot 6 + 3} = i^3 = -i" },
        { kind: "example", lines: [
          { math: "i^{-3} = i^{-3+4} = i^{1} = i" },
          { math: "i^{68} = (i^4)^{17} = 1" },
        ] },
      ],
      visual: { kind: "anim", scene: "complejo-giro-i", params: { a: 3, b: 1 } },
    },
    {
      id: "check-potencia",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Divide 102 entre 4 y quédate con el resto." }],
      title: "i elevado a 102",
      question: "¿Cuánto vale $i^{102}$?",
      choices: [
        { id: "a", label: "$-1$" },
        { id: "b", label: "$1$", incorrectFeedback: "$102 = 4\\cdot 25 + 2$: el resto es $2$, no $0$. Sería $1$ con exponente múltiplo de $4$." },
        { id: "c", label: "$i$", incorrectFeedback: "Eso sería resto $1$. Aquí el resto es $2$." },
        { id: "d", label: "$-i$", incorrectFeedback: "Eso sería resto $3$. Aquí el resto es $2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$102 = 4\\cdot 25 + 2$, así que $i^{102} = i^2 = -1$.",
    },
    {
      id: "gauss",
      type: "slide",
      help: [
        { label: "Teorema fundamental del álgebra", message: "Gauss lo demostró en 1799: todo polinomio de grado $n$ con coeficientes complejos tiene exactamente $n$ raíces complejas (contando multiplicidades)." },
      ],
      title: "Ahora toda ecuación tiene solución",
      blocks: [
        { kind: "text", text: "Con $i$ basta: **toda ecuación polinómica de grado $n$ tiene $n$ raíces en $\\mathbb{C}$** (Gauss, 1799). Las ecuaciones de segundo grado con discriminante negativo ya no dan error." },
        { kind: "example", lines: [
          { math: "x^2 + 4 = 0 \\Rightarrow x = \\pm\\sqrt{-4} = \\pm 2i" },
          { math: "x^2 + 2x + 5 = 0 \\Rightarrow x = \\dfrac{-2 \\pm \\sqrt{-16}}{2} = -1 \\pm 2i" },
        ] },
        { kind: "warning", text: "Las raíces complejas de un polinomio con coeficientes **reales** aparecen siempre por parejas **conjugadas** ($-1 + 2i$ y $-1 - 2i$)." },
      ],
      arrange: "stack",
    },
    {
      id: "check-raices",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$x^2 = -9 \\Rightarrow x = \\pm\\sqrt{-9} = \\pm 3\\sqrt{-1}$." }],
      title: "Raíces de x² + 9 = 0",
      question: "Las soluciones de $x^2 + 9 = 0$ son…",
      choices: [
        { id: "a", label: "$x = 3i$ y $x = -3i$" },
        { id: "b", label: "$x = 3$ y $x = -3$", incorrectFeedback: "$3^2 = 9$, no $-9$: eso resolvería $x^2 - 9 = 0$." },
        { id: "c", label: "$x = 9i$ y $x = -9i$", incorrectFeedback: "$(9i)^2 = -81$. Hay que sacar la raíz cuadrada de $9$: $3$." },
        { id: "d", label: "No tiene solución", incorrectFeedback: "En $\\mathbb{R}$ no, pero en $\\mathbb{C}$ sí tiene dos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(3i)^2 = 9i^2 = -9$ y $(-3i)^2 = -9$; por tanto $x = \\pm 3i$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Real: parte imaginaria nula. Imaginario puro: parte real nula. Si ambas son distintas de cero, es complejo no real." }],
      title: "¿Qué tipo de complejo?",
      question: "Clasifica cada número.",
      groups: [
        { id: "real", label: "Real", tone: "cobalt" },
        { id: "puro", label: "Imaginario puro", tone: "amber" },
        { id: "mixto", label: "Complejo con ambas partes", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$5$", group: "real" },
        { id: "b", text: "$3i$", group: "puro" },
        { id: "c", text: "$2 - i$", group: "mixto" },
        { id: "d", text: "$-7i$", group: "puro" },
        { id: "e", text: "$-\\sqrt{2}$", group: "real" },
        { id: "f", text: "$1 + 4i$", group: "mixto" },
      ],
      hint: "Un real es un complejo con parte imaginaria $0$.",
    },
  ],
};
