import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_8_SUBTITLE } from "@/data/lessons/shared";

export const arbolTablaCcss1Lesson: InteractiveLesson = {
  slug: "arbol-tabla-ccss1",
  title: "9. Del árbol a la tabla y de la tabla al árbol",
  subtitle: TEMA_CCSS1_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "arbol-a-tabla",
      type: "slide",
      help: [{ label: "Multiplicar y sumar", message: "De árbol a tabla se multiplica por las ramas; de tabla a árbol se divide cada casilla entre el total de su fila o columna." }],
      title: "Del árbol a la tabla",
      blocks: [
        { kind: "example", title: "P(A) = 0,3; P(B|A) = 1/3; P(B|Aᶜ) = 6/7", lines: [
          { math: "P(A\\cap B) = 0{,}3\\cdot\\dfrac{1}{3} = 0{,}1\\qquad P(A\\cap \\bar B) = 0{,}3\\cdot\\dfrac{2}{3} = 0{,}2" },
          { math: "P(A^c\\cap B) = 0{,}7\\cdot\\dfrac{6}{7} = 0{,}6\\qquad P(A^c\\cap \\bar B) = 0{,}7\\cdot\\dfrac{1}{7} = 0{,}1" },
          { math: "P(B) = 0{,}1 + 0{,}6 = 0{,}7" },
        ] },
        { kind: "text", text: "Con la tabla se puede construir el **otro árbol**, el que empieza en $B$: $P(A/B) = \\dfrac{0{,}1}{0{,}7} = \\dfrac{1}{7}$." },
      ],
      visual: { kind: "tool", tool: "arbol-tabla-explorador", initial: [30, 50, 80], hint: "Cambia las tres probabilidades del árbol: se rellena la tabla y se obtiene el árbol que empieza en B." },
    },
    {
      id: "check-AB",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$P(A\\cap B) = P(A)\\cdot P(B/A)$." }],
      title: "Una casilla desde el árbol",
      question: "Si $P(A) = 0{,}3$ y $P(B/A) = \\dfrac{1}{3}$, ¿cuánto vale $P(A \\cap B)$? (decimal)",
      correctAnswers: ["0,1", "0.1"],
      explanation: "$0{,}3\\cdot\\dfrac{1}{3} = 0{,}1$.",
    },
    {
      id: "check-AdadoB",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$P(A/B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}1}{0{,}7}$." }],
      title: "Árbol invertido",
      question: "Con la tabla de $0{,}1$; $0{,}2$; $0{,}6$; $0{,}1$ (donde $P(B) = 0{,}7$), ¿cuánto vale $P(A/B)$? (fracción)",
      correctAnswers: ["1/7", "0,143", "0.143", "0,1429", "0.1429"],
      explanation: "$P(A/B) = \\dfrac{0{,}1}{0{,}7} = \\dfrac{1}{7}$.",
    },
    {
      id: "tabla-a-arbol",
      type: "slide",
      help: [{ label: "Dividir", message: "$P(B/A) = \\dfrac{P(A\\cap B)}{P(A)}$: se divide la casilla entre el total de su columna." }],
      title: "De la tabla al árbol",
      blocks: [
        { kind: "example", title: "Tabla de 2/9, 5/9, 1/9, 1/9 (columnas A y no A; filas B y no B)", lines: [
          { math: "P(A) = \\dfrac{3}{9} = \\dfrac{1}{3}\\qquad P(A^c) = \\dfrac{6}{9} = \\dfrac{2}{3}" },
          { math: "P(B/A) = \\dfrac{2/9}{3/9} = \\dfrac{2}{3}\\qquad P(B/A^c) = \\dfrac{5/9}{6/9} = \\dfrac{5}{6}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-BdadoA",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Total de la columna $A$: $\\frac{2}{9} + \\frac{1}{9} = \\frac{3}{9}$." }],
      title: "Probabilidad en el árbol",
      question: "Con esa tabla, ¿cuánto vale $P(B/A)$? (fracción)",
      correctAnswers: ["2/3"],
      explanation: "$P(B/A) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{2/9}{3/9} = \\dfrac{2}{3}$.",
    },
    {
      id: "check-tabla35",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "En la tabla $0{,}4$; $0{,}2$; $0{,}15$; $0{,}25$ (columna $A$: $0{,}4$ y $0{,}15$; fila $B$: $0{,}4$ y $0{,}2$)." }],
      title: "Otra tabla",
      question: "Tabla: $P(A \\cap B) = 0{,}4$, $P(A^c \\cap B) = 0{,}2$, $P(A \\cap \\bar B) = 0{,}15$, $P(A^c \\cap \\bar B) = 0{,}25$. ¿Cuánto vale $P(A/B)$? (fracción)",
      correctAnswers: ["2/3", "0,667", "0.667", "0,6667", "0.6667"],
      explanation: "$P(B) = 0{,}4 + 0{,}2 = 0{,}6$ y $P(A/B) = \\dfrac{0{,}4}{0{,}6} = \\dfrac{2}{3}$.",
    },
  ],
};
