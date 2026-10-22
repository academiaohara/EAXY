import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const simplificarEquivalentesOperador4esoLesson: InteractiveLesson = {
  slug: "simplificar-equivalentes-operador-4eso",
  title: "5. Fracciones equivalentes, simplificación y fracción de una cantidad",
  subtitle: TEMA_4ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "equivalentes",
      type: "slide",
      help: [
        {
          label: "Por qué no cambia",
          message: "Al multiplicar numerador y denominador por el mismo número, cada trozo se parte en más trozos pequeños, pero se cuenta el mismo área.",
        },
        {
          label: "Comprobar con productos cruzados",
          message: "$\\frac{a}{b} = \\frac{c}{d}$ si y solo si $a \\cdot d = b \\cdot c$.",
        },
      ],
      title: "Fracciones equivalentes",
      blocks: [
        {
          kind: "definition",
          text: "Dos fracciones son **equivalentes** si representan el mismo número. Se obtienen multiplicando o dividiendo numerador y denominador **por el mismo número**.",
        },
        {
          kind: "rule",
          title: "Productos cruzados",
          formula: "\\dfrac{a}{b} = \\dfrac{c}{d} \\iff a \\cdot d = b \\cdot c",
        },
        {
          kind: "example",
          lines: [{ math: "\\dfrac{2}{3} = \\dfrac{6}{9} = \\dfrac{10}{15}" }],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-equivalente", params: { a: 2, b: 3, c: 3 } },
    },
    {
      id: "explora-equivalentes",
      type: "slide",
      help: [
        {
          label: "Qué cambia",
          message: "Cambia la forma de escribirla, no el número: la zona coloreada ocupa exactamente lo mismo.",
        },
      ],
      title: "Explora: mismo número, otra escritura",
      blocks: [
        {
          kind: "text",
          text: "Cambia el multiplicador $k$ y mira cómo la barra se parte en más trozos sin que cambie la parte coloreada.",
        },
        {
          kind: "warning",
          text: "Sumar el mismo número arriba y abajo **no** da una fracción equivalente: $\\frac{1}{2} \\neq \\frac{3}{4}$ aunque $1 + 2 = 3$ y $2 + 2 = 4$.",
        },
      ],
      visual: { kind: "tool", tool: "fraccion-equivalentes", params: { n: 2, d: 5, k: 3 }, hint: "Sube el multiplicador y comprueba que la zona coloreada no cambia." },
    },
    {
      id: "simplificar",
      type: "slide",
      help: [
        {
          label: "Hasta cuándo",
          message: "Se simplifica hasta que numerador y denominador no tengan más divisores comunes que $1$ (hasta que sean primos entre sí).",
        },
        {
          label: "El signo",
          message: "Una fracción irreducible se escribe con el denominador positivo: $\\frac{15}{-6} = -\\frac{5}{2}$.",
        },
      ],
      title: "Simplificar hasta la irreducible",
      blocks: [
        {
          kind: "definition",
          text: "**Simplificar** es dividir numerador y denominador entre un divisor común. Una fracción es **irreducible** cuando ya no se puede simplificar.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{28}{24} = \\dfrac{7}{6}" },
            { math: "\\dfrac{15}{-6} = -\\dfrac{5}{2}", note: "se deja el signo en el numerador o delante" },
            { math: "\\dfrac{5\\,000}{7\\,500} = \\dfrac{2}{3}" },
          ],
        },
        {
          kind: "text",
          text: "Dos fracciones son equivalentes si, al simplificarlas, dan **la misma irreducible**.",
        },
      ],
      visual: { kind: "anim", scene: "simplificar-factores", params: { a: 4, b: 8, c: 3, d: 4 } },
    },
    {
      id: "check-irreducible",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Divide por el m.c.d.",
          message: "$5\\,000$ y $7\\,500$ son ambos múltiplos de $2\\,500$.",
        },
      ],
      title: "Fracción irreducible",
      question: "Simplifica $\\dfrac{5\\,000}{7\\,500}$ hasta la fracción irreducible.",
      correctAnswers: ["2/3"],
      explanation: "$\\text{m.c.d.}(5\\,000, 7\\,500) = 2\\,500$: $\\frac{2}{3}$.",
    },
    {
      id: "check-signo",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Divide entre 3 y deja el signo",
          message: "$\\frac{15}{-6} = \\frac{5}{-2}$ y se escribe con denominador positivo.",
        },
      ],
      title: "Con signo en el denominador",
      question: "Simplifica $\\dfrac{15}{-6}$ y deja el signo en el numerador.",
      correctAnswers: ["-5/2", "−5/2"],
      explanation: "$\\frac{15}{-6} = \\frac{5}{-2} = \\frac{-5}{2}$.",
    },
    {
      id: "check-equiv",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Irreducibles",
          message: "Simplifica cada opción y compárala con $-\\frac{10}{35} = -\\frac{2}{7}$.",
        },
      ],
      title: "¿Cuál es equivalente?",
      question: "¿Cuál de estas fracciones es equivalente a $\\dfrac{-10}{35}$?",
      choices: [
        { id: "a", label: "$\\dfrac{8}{-28}$" },
        { id: "b", label: "$\\dfrac{8}{28}$", incorrectFeedback: "Esa vale $+\\frac{2}{7}$, con signo contrario." },
        { id: "c", label: "$\\dfrac{-10}{30}$", incorrectFeedback: "Se simplifica a $-\\frac{1}{3}$, no a $-\\frac{2}{7}$." },
        { id: "d", label: "$\\dfrac{35}{-10}$", incorrectFeedback: "Es la inversa: vale más que $1$ en valor absoluto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{8}{-28} = -\\frac{2}{7}$ y $\\frac{-10}{35} = -\\frac{2}{7}$.",
    },
    {
      id: "operador",
      type: "slide",
      help: [
        {
          label: "Dos formas",
          message: "$(C : b) \\cdot a$ y $(C \\cdot a) : b$ dan lo mismo. La primera suele ser más cómoda porque se trabaja con números más pequeños.",
        },
        {
          label: "Cuando es una parte",
          message: "«Los $\\frac{3}{4}$ de $500$» y «$\\frac{3}{4}$ de $500$» son lo mismo: la fracción actúa como **operador**.",
        },
      ],
      title: "La fracción como operador",
      blocks: [
        {
          kind: "rule",
          title: "Fracción de una cantidad",
          formula: "\\dfrac{a}{b} \\text{ de } C = (C : b) \\cdot a = (C \\cdot a) : b",
        },
        {
          kind: "example",
          title: "Los 3/4 de 500 €",
          lines: [
            { math: "500 : 4 = 125" },
            { math: "125 \\cdot 3 = 375\\ €" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-operador", params: { a: 500, b: 4, c: 3 } },
    },
    {
      id: "check-operador",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Divide y multiplica",
          message: "$2\\,380 : 7 = 340$ y $340 \\cdot 3 = 1\\,020$.",
        },
      ],
      title: "Gasto en un equipo",
      question: "Montserrat tiene ahorrados $2\\,380$ €. Gasta $\\dfrac{3}{7}$ en un equipo informático. ¿Cuánto le queda? (solo el número)",
      correctAnswers: ["1360", "1 360", "1.360"],
      explanation: "Gasta $\\frac{3}{7}$ de $2\\,380 = 1\\,020$ €. Le quedan $2\\,380 - 1\\,020 = 1\\,360$ €.",
    },
    {
      id: "total-desde-parte",
      type: "slide",
      help: [
        {
          label: "Hacia atrás",
          message: "Si $\\frac{2}{5}$ del total son $160$, una de las cinco partes vale $160 : 2 = 80$ y el total vale $5 \\cdot 80 = 400$.",
        },
        {
          label: "Multiplica por la inversa",
          message: "Es lo mismo que multiplicar la parte por la inversa de la fracción: $160 \\cdot \\frac{5}{2} = 400$.",
        },
      ],
      title: "Al revés: del trozo al total",
      blocks: [
        {
          kind: "text",
          text: "Si se conoce lo que vale una fracción del total y se pide el total, se **deshace** el camino: primero se halla lo que vale **una** parte y después se multiplica por todas las partes.",
        },
        {
          kind: "rule",
          formula: "\\text{total} = \\text{parte} : \\dfrac{a}{b} = \\text{parte} \\cdot \\dfrac{b}{a}",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-total", params: { a: 2, b: 5, c: 160 } },
    },
    {
      id: "check-total",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Una parte",
          message: "El trigo ocupa $\\frac{4}{5}$, así que el maíz es $1 - \\frac{4}{5} = \\frac{1}{5}$ de la parcela. Esa quinta parte mide $100$ m².",
        },
      ],
      title: "Superficie de una parcela",
      question: "En una parcela se cultivan $\\dfrac{4}{5}$ de trigo y el resto, $100$ m², de maíz. ¿Cuál es la superficie de toda la parcela? (solo el número, en m²)",
      correctAnswers: ["500"],
      explanation: "El maíz es $1 - \\frac{4}{5} = \\frac{1}{5}$ de la parcela, y vale $100$ m². La parcela mide $5 \\cdot 100 = 500$ m².",
    },
    {
      id: "check-mental",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Paso a paso",
          message: "La quinta parte de $-4$ es $-\\frac{4}{5}$. La mitad de eso es $-\\frac{4}{10} = -\\frac{2}{5}$.",
        },
      ],
      title: "Cálculo mental con signo",
      question: "Calcula mentalmente la mitad de la quinta parte de $-4$. Da la fracción irreducible.",
      correctAnswers: ["-2/5", "−2/5"],
      explanation: "$-4 \\cdot \\frac{1}{5} \\cdot \\frac{1}{2} = -\\frac{4}{10} = -\\frac{2}{5}$.",
    },
  ],
};
