import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const unionProbabilidad1bachLesson: InteractiveLesson = {
  slug: "union-probabilidad-1bach",
  title: "5. Probabilidad de la unión de sucesos",
  subtitle: TEMA_1BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [{ label: "Por qué se resta", message: "Sumar $P(A) + P(B)$ cuenta dos veces los casos que están en $A$ y en $B$: hay que quitar $P(A \\cap B)$ una vez." }],
      title: "Cuando los sucesos se solapan",
      blocks: [
        { kind: "rule", title: "Unión de dos sucesos", formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)" },
        { kind: "text", text: "Si $A$ y $B$ son **incompatibles**, $P(A \\cap B) = 0$ y queda $P(A \\cup B) = P(A) + P(B)$. Siempre se cumple $P(A \\cup A^c) = 1$." },
      ],
      visual: { kind: "tool", tool: "prob-union-explorador", initial: [40, 25, 10], hint: "Mueve P(A ∩ B): cuanto más se solapan, menor es P(A ∪ B). Con P(A ∩ B) = 0 los sucesos son incompatibles." },
    },
    {
      id: "baraja",
      type: "slide",
      help: [{ label: "Contar bien", message: "Hay $16$ figuras (as, sota, caballo y rey de cada palo); los $4$ reyes ya están dentro de las figuras." }],
      title: "Ejemplos con la baraja de 40 cartas",
      blocks: [
        { kind: "example", title: "Rey o figura", lines: [
          { math: "P(\\text{rey}\\cup\\text{figura}) = \\dfrac{4}{40} + \\dfrac{16}{40} - \\dfrac{4}{40} = \\dfrac{16}{40} = 0{,}4" },
        ] },
        { kind: "example", title: "As u oro", lines: [
          { math: "P(\\text{as}\\cup\\text{oro}) = \\dfrac{4}{40} + \\dfrac{10}{40} - \\dfrac{1}{40} = \\dfrac{13}{40}" },
        ] },
        { kind: "example", title: "Copa u oro (incompatibles)", lines: [
          { math: "P(\\text{copa}\\cup\\text{oro}) = \\dfrac{10}{40} + \\dfrac{10}{40} = \\dfrac{20}{40} = \\dfrac{1}{2}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-basto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$10$ bastos, $16$ figuras y $4$ figuras que son bastos: $\\frac{10 + 16 - 4}{40}$." }],
      title: "Basto o figura",
      question: "¿Cuántas cartas de la baraja son «basto **o** figura»? (solo el número)",
      correctAnswers: ["22"],
      explanation: "$10 + 16 - 4 = 22$ cartas (se restan los $4$ bastos que son figuras), es decir, $P = \\dfrac{22}{40} = \\dfrac{11}{20}$.",
    },
    {
      id: "check-24",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\frac{2}{3} + \\frac{3}{4} - \\frac{5}{8}$ con denominador común $24$." }],
      title: "Con fracciones",
      question: "Si $P(A) = \\dfrac{2}{3}$, $P(B) = \\dfrac{3}{4}$ y $P(A \\cap B) = \\dfrac{5}{8}$, ¿cuánto vale $P(A \\cup B)$? (fracción)",
      correctAnswers: ["19/24"],
      explanation: "$\\dfrac{16}{24} + \\dfrac{18}{24} - \\dfrac{15}{24} = \\dfrac{19}{24}$.",
    },
    {
      id: "check-ninguno",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "«Ni A ni B» es el contrario de $A \\cup B$." }],
      title: "Ni A ni B",
      question: "Con los mismos datos, ¿cuánto vale la probabilidad de que **no** ocurra ni $A$ ni $B$? (fracción)",
      correctAnswers: ["5/24"],
      explanation: "$P(A^c \\cap B^c) = P\\big((A \\cup B)^c\\big) = 1 - \\dfrac{19}{24} = \\dfrac{5}{24}$ (ley de De Morgan).",
    },
    {
      id: "check-15",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Despeja $P(A \\cap B) = P(A) + P(B) - P(A \\cup B)$." }],
      title: "Despejar la intersección",
      question: "Si $P(A) = \\dfrac{1}{3}$, $P(B) = \\dfrac{1}{5}$ y $P(A \\cup B) = \\dfrac{7}{15}$, ¿cuánto vale $P(A \\cap B)$? (fracción)",
      correctAnswers: ["1/15"],
      explanation: "$P(A \\cap B) = \\dfrac{5}{15} + \\dfrac{3}{15} - \\dfrac{7}{15} = \\dfrac{1}{15}$.",
    },
  ],
};
