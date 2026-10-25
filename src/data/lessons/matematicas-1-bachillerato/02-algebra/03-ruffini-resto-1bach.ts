import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const ruffiniResto1bachLesson: InteractiveLesson = {
  slug: "ruffini-resto-1bach",
  title: "3. Regla de Ruffini y teorema del resto",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ruffini",
      type: "slide",
      help: [{ label: "Por qué se cambia el signo", message: "Para dividir entre $x + 2$ se opera con $-2$, que es la raíz del divisor: así se resta (multiplicando por $-2$) lo que en la división larga se restaba." }],
      title: "Ruffini: dividir entre x − a",
      blocks: [
        { kind: "definition", text: "La **regla de Ruffini** es un atajo para dividir un polinomio entre $x - a$. Solo se usan los **coeficientes** y el número $a$ (la raíz del divisor)." },
        { kind: "steps", items: [
          "Se escriben los coeficientes de $P$ (con $0$ en los grados que falten) y $a$ a la izquierda.",
          "Se baja el primer coeficiente.",
          "Se multiplica por $a$, se coloca bajo el siguiente y se suma. Se repite hasta el final.",
          "Los números de abajo son el cociente (un grado menos) y, el último, el **resto**.",
        ] },
      ],
      visual: { kind: "anim", scene: "ruffini-tabla", params: { p: [3, -4, 1, 3], a: -2 } },
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Los números de abajo, salvo el último, son los coeficientes del cociente." }],
      title: "Leer la tabla",
      question: "Al dividir $3x^3 - 4x^2 + x + 3$ entre $x + 2$ con Ruffini sale $3,\\ -10,\\ 21,\\ -39$. ¿Cuáles son el cociente y el resto?",
      choices: [
        { id: "a", label: "Cociente $3x^2 - 10x + 21$ y resto $-39$" },
        { id: "b", label: "Cociente $3x^3 - 10x^2 + 21x$ y resto $-39$", incorrectFeedback: "El cociente tiene un grado menos que el dividendo: grado $2$." },
        { id: "c", label: "Cociente $3x^2 - 10x$ y resto $21$", incorrectFeedback: "El resto es siempre el **último** número de la fila de abajo." },
        { id: "d", label: "Cociente $-39$ y resto $3x^2 - 10x + 21$", incorrectFeedback: "Has intercambiado los papeles: el resto es un número." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Los tres primeros números son los coeficientes del cociente $3x^2 - 10x + 21$ y el último es el resto $-39$.",
    },
    {
      id: "resto",
      type: "slide",
      help: [{ label: "Demostración", message: "Si $P(x) = (x-a)c(x) + r$, al sustituir $x = a$ el primer sumando se anula y queda $P(a) = r$." }],
      title: "Teorema del resto",
      blocks: [
        { kind: "rule", title: "El resto de dividir P(x) entre x − a es P(a)", formula: "P(x) = (x - a)\\,c(x) + P(a)" },
        { kind: "example", lines: [
          { math: "P(x) = 3x^3 - 4x^2 + x + 3,\\quad a = -2" },
          { math: "P(-2) = -24 - 16 - 2 + 3 = -39 \\quad\\Rightarrow\\quad \\text{resto } -39" },
        ] },
        { kind: "text", text: "Así se puede conocer el resto **sin hacer la división**: basta evaluar." },
      ],
      visual: { kind: "tool", tool: "ruffini-explorador", initial: [3, -4, 1, 3, -2], hint: "Cambia a y comprueba que el resto siempre coincide con P(a)." },
    },
    {
      id: "check-resto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Evalúa en $x = 2$." }],
      title: "Resto sin dividir",
      question: "¿Cuál es el resto de dividir $x^3 - 2x^2 + x - 5$ entre $x - 2$? (solo el número)",
      correctAnswers: ["-3", "−3"],
      explanation: "$P(2) = 8 - 8 + 2 - 5 = -3$.",
    },
    {
      id: "factor",
      type: "slide",
      help: [{ label: "Dos lecturas", message: "$P(a) = 0$ significa a la vez: $a$ es raíz de $P$, el resto es $0$ y $x - a$ es un factor de $P$." }],
      title: "Teorema del factor",
      blocks: [
        { kind: "rule", title: "x − a divide a P(x) si y solo si P(a) = 0", formula: "P(a) = 0 \\iff P(x) = (x - a)\\,c(x)" },
        { kind: "example", title: "P(x) = x³ − 6x² + 11x − 6", lines: [
          { math: "P(1) = 0,\\quad P(2) = 0,\\quad P(3) = 0" },
          { math: "P(x) = (x - 1)(x - 2)(x - 3)" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-parametro",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Si $x - 2$ divide a $P$, entonces $P(2) = 0$. Sustituye y despeja $k$." }],
      title: "Un parámetro",
      question: "¿Qué valor de $k$ hace que $x^3 + kx - 10$ sea divisible entre $x - 2$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "Debe cumplirse $P(2) = 8 + 2k - 10 = 0$, es decir $2k = 2$ y $k = 1$.",
    },
  ],
};
