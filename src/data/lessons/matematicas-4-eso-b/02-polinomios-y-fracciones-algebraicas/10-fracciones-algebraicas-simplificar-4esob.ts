import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_2_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesAlgebraicasSimplificar4esobLesson: InteractiveLesson = {
  slug: "fracciones-algebraicas-simplificar-4esob",
  title: "10. Fracciones algebraicas: simplificar",
  subtitle: TEMA_4ESOB_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        { label: "Como las numéricas", message: "Una fracción algebraica se simplifica igual que $\\frac{12}{18}$: se divide numerador y denominador entre sus factores comunes." },
        { label: "Factores, no sumandos", message: "Solo se pueden tachar **factores** (cosas que multiplican a todo el numerador y a todo el denominador), nunca sumandos sueltos." },
      ],
      title: "Cociente de polinomios",
      blocks: [
        { kind: "definition", text: "Una **fracción algebraica** es el cociente indicado de dos polinomios, como $\\dfrac{x + 1}{3x^2 - 5}$." },
        { kind: "rule", title: "Simplificar", text: "Divide numerador y denominador entre sus **factores comunes**. Se obtiene una fracción equivalente." },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["3x²(x + 1) / 6x(x + 1)²"], active: [0, 0], note: "se descompone cada parte en factores." },
            { tokens: ["3 · x · x · (x + 1) / 3 · 2 · x · (x + 1) · (x + 1)"], active: [0, 0], note: "se tachan los factores comunes: $3$, $x$ y $(x + 1)$." },
            { tokens: ["x / 2(x + 1)"], fresh: [0, 0], note: "fracción simplificada: $\\dfrac{x}{2(x+1)}$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-simple",
      type: "predict",
      mode: "choice",
      help: [{ label: "Saca factor común", message: "$15x^2 = 5x^2 \\cdot 3$ y $5x^2(x - 3)$ ya tiene el factor $5x^2$." }],
      title: "Simplifica",
      question: "Simplifica $\\dfrac{15x^2}{5x^2(x - 3)}$.",
      choices: [
        { id: "a", label: "$\\dfrac{3}{x - 3}$" },
        { id: "b", label: "$\\dfrac{3}{x}$", incorrectFeedback: "El factor $(x - 3)$ del denominador no se puede tachar con nada del numerador." },
        { id: "c", label: "$\\dfrac{15}{x - 3}$", incorrectFeedback: "Has tachado $x^2$ pero falta dividir también $15$ entre $5$." },
        { id: "d", label: "$3$", incorrectFeedback: "El factor $(x - 3)$ queda en el denominador." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{15x^2}{5x^2(x - 3)} = \\dfrac{3 \\cdot 5x^2}{5x^2 (x - 3)} = \\dfrac{3}{x - 3}$.",
    },
    {
      id: "factoriza-primero",
      type: "slide",
      help: [
        { label: "Valores prohibidos", message: "La fracción original no existe donde el denominador vale $0$. Tras simplificar, ese valor sigue estando prohibido aunque la nueva fracción sí lo admita." },
      ],
      title: "Primero factoriza",
      blocks: [
        { kind: "text", text: "Cuando numerador y denominador son sumas, **factorízalos** (factor común, identidades, Ruffini) para ver qué factores se repiten." },
        { kind: "example", lines: [{ math: "\\dfrac{x^2 - 4}{x^2 + 2x} = \\dfrac{(x + 2)(x - 2)}{x(x + 2)} = \\dfrac{x - 2}{x}" }] },
        { kind: "warning", text: "$\\dfrac{x + 2}{x}$ **no** es $2$: no se puede tachar la $x$ porque está sumando en el numerador." },
      ],
      visual: { kind: "tool", tool: "fraccion-alg-explorador", params: { a: 0, b: 3 }, hint: "Prueba x = 0 y x = −2: ¿qué pasa en la fracción original?" },
    },
    {
      id: "check-identidad",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Identidades", message: "$x^2 - 1 = (x + 1)(x - 1)$ y $x^2 + 2x + 1 = (x + 1)^2$. Tacha un $(x + 1)$." }],
      title: "Simplifica y evalúa",
      question: "Simplifica $\\dfrac{x^2 - 1}{x^2 + 2x + 1}$ y calcula su valor para $x = 3$. (escribe el número, por ejemplo con coma)",
      correctAnswers: ["0,5", "0.5", "1/2", ",5"],
      explanation: "$\\dfrac{(x + 1)(x - 1)}{(x + 1)^2} = \\dfrac{x - 1}{x + 1}$, y para $x = 3$ vale $\\dfrac{2}{4} = 0{,}5$.",
    },
    {
      id: "check-factor-comun",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Dos factorizaciones", message: "$3x^2 + 6x = 3x(x + 2)$ y $x^2 - 4 = (x + 2)(x - 2)$." }],
      title: "Con factor común y diferencia de cuadrados",
      question: "Simplifica $\\dfrac{3x^2 + 6x}{x^2 - 4}$ y calcula su valor para $x = 4$. (solo el número)",
      correctAnswers: ["6"],
      explanation: "$\\dfrac{3x(x + 2)}{(x + 2)(x - 2)} = \\dfrac{3x}{x - 2}$, que para $x = 4$ da $\\dfrac{12}{2} = 6$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "¿Hay factor común?", message: "Mira si puedes escribir numerador y denominador como productos que compartan un factor." }],
      title: "¿Se puede simplificar?",
      question: "Decide si cada fracción se puede simplificar.",
      groups: [
        { id: "si", label: "Sí, hay factor común", tone: "emerald" },
        { id: "no", label: "No se puede", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$\\dfrac{x + 1}{x^2 + x}$", group: "si" },
        { id: "b", text: "$\\dfrac{x + 4}{x}$", group: "no" },
        { id: "c", text: "$\\dfrac{2x + 2}{4}$", group: "si" },
        { id: "d", text: "$\\dfrac{x^2 + 1}{x}$", group: "no" },
        { id: "e", text: "$\\dfrac{x^2 - 9}{x + 3}$", group: "si" },
        { id: "f", text: "$\\dfrac{x + 5}{x + 7}$", group: "no" },
      ],
      hint: "Factoriza: si no aparece el mismo factor arriba y abajo, no se puede.",
    },
  ],
};
