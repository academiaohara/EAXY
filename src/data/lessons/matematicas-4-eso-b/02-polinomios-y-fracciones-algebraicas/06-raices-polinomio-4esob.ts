import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_2_SUBTITLE } from "@/data/lessons/shared";

export const raicesPolinomio4esobLesson: InteractiveLesson = {
  slug: "raices-polinomio-4esob",
  title: "6. Raíces de un polinomio",
  subtitle: TEMA_4ESOB_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "raiz",
      type: "slide",
      help: [
        { label: "Valor numérico", message: "$P(a)$ es lo que sale al sustituir $x$ por $a$ y operar. Una raíz es un valor $a$ donde $P(a) = 0$." },
        { label: "Ecuación", message: "Las raíces de $P(x)$ son las soluciones de la ecuación $P(x) = 0$." },
      ],
      title: "Raíz de un polinomio",
      blocks: [
        { kind: "definition", text: "Un número $a$ es una **raíz** de $P(x)$ si $P(a) = 0$. Las raíces son las soluciones de la ecuación $P(x) = 0$." },
        { kind: "example", title: "$P(x) = x^3 - 4x$", lines: [{ math: "P(2) = 8 - 8 = 0", note: "2 es raíz" }, { math: "P(1) = 1 - 4 = -3", note: "1 no es raíz" }] },
      ],
      visual: { kind: "anim", scene: "ruffini-tabla", params: { p: [1, 0, -4, 0], a: 2 } },
    },
    {
      id: "resto",
      type: "slide",
      help: [{ label: "Teorema del resto", message: "Al dividir $P(x)$ entre $x - a$, el resto es $P(a)$. Por eso Ruffini sirve para comprobar raíces: resto $0$ ⇔ raíz." }],
      title: "El resto es P(a)",
      blocks: [
        { kind: "rule", title: "Dividir por x − a", text: "El **resto** de dividir $P(x)$ entre $x - a$ es $P(a)$. Si es $0$, entonces $a$ es raíz y $P(x) = (x - a) \\cdot \\text{cociente}$." },
        { kind: "text", text: "Prueba con la tabla: con $P = x^3 - 2x^2 - 5x + 6$ y $a = 1$, el resto es $0$." },
      ],
      visual: { kind: "tool", tool: "ruffini-explorador", initial: [1, -2, -5, 6, 1], hint: "Comprueba con a = 1, a = 3 y a = −2: los tres dan resto 0." },
    },
    {
      id: "check-raiz",
      type: "predict",
      mode: "choice",
      help: [{ label: "Sustituye", message: "$P(-1) = (-1)^3 + (-1)^2 - 25(-1) - 25 = -1 + 1 + 25 - 25 = 0$." }],
      title: "¿Cuál es raíz?",
      question: "¿Cuál de estos números es raíz de $x^3 + x^2 - 25x - 25$?",
      choices: [
        { id: "a", label: "$-1$" },
        { id: "b", label: "$1$", incorrectFeedback: "$1 + 1 - 25 - 25 = -48 \\neq 0$." },
        { id: "c", label: "$2$", incorrectFeedback: "$8 + 4 - 50 - 25 = -63 \\neq 0$." },
        { id: "d", label: "$0$", incorrectFeedback: "$P(0) = -25 \\neq 0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$P(-1) = -1 + 1 + 25 - 25 = 0$. De hecho $P(x) = (x + 1)(x + 5)(x - 5)$.",
    },
    {
      id: "donde-buscar",
      type: "slide",
      help: [{ label: "Por qué los divisores", message: "Si $a$ es raíz entera, $P(x) = (x - a)\\,Q(x)$ y el término independiente de $P$ es $-a$ por el de $Q$: $a$ divide al término independiente." }],
      title: "Dónde buscar las raíces enteras",
      blocks: [
        { kind: "rule", text: "Las raíces **enteras** de un polinomio hay que buscarlas entre los **divisores del término independiente** (positivos y negativos)." },
        { kind: "example", title: "$R(x) = x^3 - x + 6$", lines: [{ math: "\\text{divisores de } 6:\\ \\pm 1,\\ \\pm 2,\\ \\pm 3,\\ \\pm 6" }, { math: "R(-2) = -8 + 2 + 6 = 0", note: "−2 es raíz" }] },
      ],
      visual: { kind: "anim", scene: "ruffini-tabla", params: { p: [1, 0, -1, 6], a: -2 } },
    },
    {
      id: "check-candidatos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Divisores con signo", message: "$6$ tiene cuatro divisores positivos ($1, 2, 3, 6$) y cuatro negativos." }],
      title: "Candidatos a raíz",
      question: "Para buscar raíces enteras de $x^3 - 7x + 6$, ¿cuántos valores hay que probar como máximo? (positivos y negativos; solo el número)",
      correctAnswers: ["8"],
      explanation: "Los divisores de $6$ son $\\pm 1, \\pm 2, \\pm 3, \\pm 6$: ocho candidatos.",
    },
    {
      id: "check-divisible",
      type: "predict",
      mode: "numeric",
      help: [{ label: "P(−1)", message: "$P(-1) = (-1)^3 + 4(-1)^2 - 11(-1) - 30 = -1 + 4 + 11 - 30$." }],
      title: "Resto sin dividir",
      question: "Sea $P(x) = x^3 + 4x^2 - 11x - 30$. Sin hacer la división, ¿cuánto vale el **resto** de dividir $P(x)$ entre $x + 1$? (escribe el número con su signo)",
      correctAnswers: ["-16", "−16"],
      explanation: "El resto es $P(-1) = -1 + 4 + 11 - 30 = -16$. Como no es $0$, $P(x)$ no es divisible entre $x + 1$.",
    },
  ],
};
