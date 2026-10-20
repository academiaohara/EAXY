import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const divisionFracciones2esoLesson: InteractiveLesson = {
  slug: "division-fracciones-2eso",
  title: "4. División de fracciones",
  subtitle: TEMA_2ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cuanto-cabe",
      type: "slide",
      help: [
        {
          label: "Dividir es repartir o medir",
          message: "$\\frac{3}{4} : \\frac{1}{8}$ pregunta cuántos trozos de $\\frac{1}{8}$ caben en $\\frac{3}{4}$.",
        },
        {
          label: "Con trozos iguales",
          message: "$\\frac{3}{4} = \\frac{6}{8}$: en seis octavos caben seis trozos de un octavo.",
        },
      ],
      title: "Dividir es ver cuántas veces cabe",
      blocks: [
        {
          kind: "text",
          text: "Una cinta de $\\frac{3}{4}$ de metro se corta en trozos de $\\frac{1}{8}$ de metro. ¿Cuántos trozos salen?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{3}{4} : \\dfrac{1}{8} = \\dfrac{6}{8} : \\dfrac{1}{8} = 6" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-cabe", params: { a: 3, b: 4, c: 1, d: 8 } },
    },
    {
      id: "regla",
      type: "slide",
      help: [
        {
          label: "Una regla, dos productos",
          message: "Los números «de los extremos» ($a$ y $d$) van arriba; los «del centro» ($b$ y $c$) van abajo.",
        },
        {
          label: "Equivale a multiplicar por la inversa",
          message: "Dividir entre $\\frac{c}{d}$ es multiplicar por $\\frac{d}{c}$: el mismo resultado, escrito de otra forma.",
        },
      ],
      title: "La regla: producto en cruz",
      blocks: [
        {
          kind: "rule",
          text: "Se multiplica el **numerador de la primera** por el **denominador de la segunda** (arriba) y el **denominador de la primera** por el **numerador de la segunda** (abajo).",
          formula: "\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a \\cdot d}{b \\cdot c}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{4}{8} : \\dfrac{3}{4} = \\dfrac{4 \\cdot 4}{8 \\cdot 3} = \\dfrac{16}{24} = \\dfrac{2}{3}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "simplificar-factores", params: { a: 4, b: 8, c: 3, d: 4, inv: true } },
    },
    {
      id: "perfume",
      type: "slide",
      help: [
        {
          label: "Qué operación es",
          message: "Se pregunta cuántos frascos de $\\frac{3}{20}$ L caben en $\\frac{9}{2}$ L: una división.",
        },
        {
          label: "Estima",
          message: "$\\frac{3}{20}$ L es poco más de $0{,}1$ L; en $4{,}5$ L caben unos treinta frascos.",
        },
      ],
      title: "Un problema: frascos de perfume",
      blocks: [
        {
          kind: "text",
          text: "Un frasco tiene capacidad de $\\frac{3}{20}$ L. ¿Cuántos frascos se llenan con un bidón de $4{,}5$ L, es decir, $\\frac{9}{2}$ L?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{9}{2} : \\dfrac{3}{20} = \\dfrac{9 \\cdot 20}{2 \\cdot 3} = \\dfrac{180}{6} = 30" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-division",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Producto en cruz",
          message: "$\\frac{5}{6} : \\frac{10}{9} = \\frac{5 \\cdot 9}{6 \\cdot 10}$. Simplifica después.",
        },
      ],
      title: "División",
      question: "Calcula $\\dfrac{5}{6} : \\dfrac{10}{9}$ (fracción irreducible).",
      correctAnswers: ["3/4"],
      explanation: "$\\frac{5 \\cdot 9}{6 \\cdot 10} = \\frac{45}{60} = \\frac{3}{4}$.",
    },
    {
      id: "check-garrafas",
      type: "predict",
      help: [
        {
          label: "Cuántas caben",
          message: "Se pregunta cuántas garrafas de $\\frac{3}{4}$ L se llenan con $6$ L: $6 : \\frac{3}{4}$.",
        },
        {
          label: "Un natural es una fracción",
          message: "$6 = \\frac{6}{1}$.",
        },
      ],
      title: "Garrafas",
      question: "¿Cuántas garrafas de $\\dfrac{3}{4}$ de litro se llenan con $6$ litros?",
      mode: "choice",
      choices: [
        { id: "8", label: "$8$" },
        { id: "4.5", label: "$4{,}5$", incorrectFeedback: "Has multiplicado $6 \\cdot \\frac{3}{4}$; se pide cuántas veces cabe, es decir, dividir." },
        { id: "2", label: "$2$", incorrectFeedback: "Comprueba: $2 \\cdot \\frac{3}{4} = 1{,}5$ L, muy lejos de $6$." },
        { id: "24", label: "$24$", incorrectFeedback: "Has hecho $6 \\cdot 4$ y has olvidado dividir entre el numerador $3$." },
      ],
      correctChoiceId: "8",
      shuffleChoices: true,
      explanation: "$6 : \\frac{3}{4} = \\frac{6}{1} : \\frac{3}{4} = \\frac{6 \\cdot 4}{1 \\cdot 3} = \\frac{24}{3} = 8$.",
    },
  ],
};
