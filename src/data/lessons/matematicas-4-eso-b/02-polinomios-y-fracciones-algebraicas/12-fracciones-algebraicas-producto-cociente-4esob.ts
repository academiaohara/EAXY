import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_2_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesAlgebraicasProductoCociente4esobLesson: InteractiveLesson = {
  slug: "fracciones-algebraicas-producto-cociente-4esob",
  title: "12. Producto y cociente de fracciones algebraicas",
  subtitle: TEMA_4ESOB_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto",
      type: "slide",
      help: [
        { label: "Sin común denominador", message: "Multiplicar es más fácil que sumar: no hace falta denominador común. Se multiplica arriba con arriba y abajo con abajo." },
        { label: "Simplifica antes", message: "Factoriza y tacha factores comunes **antes** de multiplicar: los números son más pequeños." },
      ],
      title: "Producto",
      blocks: [
        { kind: "rule", text: "El producto de dos fracciones algebraicas es el producto de los numeradores partido por el producto de los denominadores." },
        { kind: "example", lines: [{ math: "\\dfrac{2x}{x - 3} \\cdot \\dfrac{5x + 1}{x^2} = \\dfrac{2x(5x + 1)}{(x - 3)x^2} = \\dfrac{2(5x + 1)}{x(x - 3)}" }] },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["2x / (x − 3)", "·", "(5x + 1) / x²"], active: [0, 2], note: "numerador por numerador y denominador por denominador." },
            { tokens: ["2x(5x + 1) / (x − 3)x²"], active: [0, 0], note: "se tacha una $x$ del numerador con una del denominador." },
            { tokens: ["2(5x + 1) / x(x − 3)"], fresh: [0, 0], note: "expresión simplificada." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Numerador", message: "$(2x - 7)\\cdot 3 = 6x - 21$. El denominador es $x(x + 1) = x^2 + x$." }],
      title: "Multiplica",
      question: "Efectúa $\\dfrac{2x - 7}{x} \\cdot \\dfrac{3}{x + 1}$. En el numerador $ax + b$ del resultado, ¿cuánto vale $a$? (escribe el número con su signo)",
      correctAnswers: ["6", "+6"],
      explanation: "$\\dfrac{3(2x - 7)}{x(x + 1)} = \\dfrac{6x - 21}{x^2 + x}$. El coeficiente de $x$ en el numerador es $6$.",
    },
    {
      id: "cociente",
      type: "slide",
      help: [{ label: "Inversa", message: "La inversa de $\\dfrac{5}{x + 2}$ es $\\dfrac{x + 2}{5}$: se intercambian numerador y denominador." }],
      title: "Cociente",
      blocks: [
        { kind: "rule", text: "Dividir es **multiplicar por la inversa** de la segunda fracción (producto cruzado de términos)." },
        { kind: "example", lines: [{ math: "\\dfrac{3}{x} : \\dfrac{5}{x + 2} = \\dfrac{3}{x} \\cdot \\dfrac{x + 2}{5} = \\dfrac{3(x + 2)}{5x} = \\dfrac{3x + 6}{5x}" }] },
      ],
      visual: { kind: "tool", tool: "fraccion-alg-explorador", params: { a: 1, b: 2 }, hint: "Antes de multiplicar por la inversa, factoriza: simplificarás menos al final." },
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "choice",
      help: [{ label: "Factoriza", message: "$\\dfrac{x^2 - 1}{x} \\cdot \\dfrac{x^2}{x - 1} = \\dfrac{(x + 1)(x - 1)\\,x^2}{x\\,(x - 1)}$." }],
      title: "Un cociente que se simplifica",
      question: "Efectúa $\\dfrac{x^2 - 1}{x} : \\dfrac{x - 1}{x^2}$ y simplifica.",
      choices: [
        { id: "a", label: "$x(x + 1)$" },
        { id: "b", label: "$\\dfrac{x + 1}{x}$", incorrectFeedback: "No has dado la vuelta a la segunda fracción: al multiplicar por $\\dfrac{x^2}{x - 1}$ las $x$ suben." },
        { id: "c", label: "$x^2 - 1$", incorrectFeedback: "Todavía puedes tachar $(x - 1)$ y una $x$." },
        { id: "d", label: "$\\dfrac{x - 1}{x^2(x + 1)}$", incorrectFeedback: "Esa es la inversa del resultado correcto: has invertido la fracción equivocada." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{(x + 1)(x - 1)}{x} \\cdot \\dfrac{x^2}{x - 1} = \\dfrac{(x + 1)\\,x^2}{x} = x(x + 1)$.",
    },
    {
      id: "check-valor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Sustituye", message: "El resultado simplificado es $x(x + 1)$; para $x = 3$ vale $3 \\cdot 4$." }],
      title: "Comprueba con un valor",
      question: "Para $x = 3$, ¿cuánto vale $\\dfrac{x^2 - 1}{x} : \\dfrac{x - 1}{x^2}$? Sustituye directamente en las fracciones originales. (solo el número)",
      correctAnswers: ["12"],
      explanation: "$\\dfrac{8}{3} : \\dfrac{2}{9} = \\dfrac{8}{3} \\cdot \\dfrac{9}{2} = 12$, igual que $x(x + 1) = 3 \\cdot 4 = 12$.",
    },
    {
      id: "check-combinada",
      type: "predict",
      mode: "choice",
      help: [{ label: "En orden", message: "Primero la fracción con el producto, luego la división: ve de izquierda a derecha o agrupa con paréntesis." }],
      title: "Reconoce la operación",
      question: "¿Qué operación hay que hacer con $\\dfrac{a}{b} : \\dfrac{c}{d}$?",
      choices: [
        { id: "a", label: "$\\dfrac{a}{b} \\cdot \\dfrac{d}{c}$" },
        { id: "b", label: "$\\dfrac{a}{b} \\cdot \\dfrac{c}{d}$", incorrectFeedback: "Eso es un producto. Para dividir hay que invertir la segunda fracción." },
        { id: "c", label: "$\\dfrac{b}{a} \\cdot \\dfrac{c}{d}$", incorrectFeedback: "Se invierte la fracción divisor (la segunda), no la primera." },
        { id: "d", label: "$\\dfrac{a + c}{b + d}$", incorrectFeedback: "Las fracciones no se suman numerador con numerador ni denominador con denominador." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Dividir entre una fracción es multiplicar por su inversa: $\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a \\cdot d}{b \\cdot c}$.",
    },
  ],
};
