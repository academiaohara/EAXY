import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesSucesosCcss1Lesson: InteractiveLesson = {
  slug: "operaciones-sucesos-ccss1",
  title: "2. Operaciones con sucesos",
  subtitle: TEMA_CCSS1_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "operaciones",
      type: "slide",
      help: [{ label: "Como conjuntos", message: "Las operaciones con sucesos cumplen las mismas propiedades que las de conjuntos: se pueden entender con diagramas de Venn." }],
      title: "Unión, intersección, diferencia y contrario",
      blocks: [
        { kind: "facts", items: [
          { tex: "A \\cup B", label: "se verifica A o B (o ambos)" },
          { tex: "A \\cap B", label: "se verifican A y B a la vez" },
          { tex: "A - B", label: "se verifica A y no B" },
          { tex: "A^c = E - A", label: "suceso contrario: no se verifica A" },
        ] },
        { kind: "text", text: "Dos sucesos son **incompatibles** si $A \\cap B = \\varnothing$ (no pueden ocurrir a la vez) y **compatibles** en caso contrario." },
      ],
      visual: { kind: "tool", tool: "sucesos-venn-explorador", initial: [0, 2, 0], hint: "Con A = par y B = múltiplo de 3: A ∪ B = {2, 3, 4, 6}, A ∩ B = {6} y A − B = {2, 4}." },
    },
    {
      id: "demorgan",
      type: "slide",
      help: [{ label: "En palabras", message: "«No (A o B)» es lo mismo que «ni A ni B»; y «no (A y B)» es «no A o no B»." }],
      title: "Leyes de De Morgan",
      blocks: [
        { kind: "facts", items: [
          { tex: "(A \\cup B)^c = A^c \\cap B^c", label: "no (A o B) = ni A ni B" },
          { tex: "(A \\cap B)^c = A^c \\cup B^c", label: "no (A y B) = no A o no B" },
        ] },
      ],
      visual: { kind: "tool", tool: "sucesos-venn-explorador", initial: [0, 2, 4], hint: "Compara las operaciones (A ∪ B)ᶜ y Aᶜ ∩ Bᶜ: dan el mismo conjunto." },
    },
    {
      id: "check-interseccion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Busca los números del dado que son pares y a la vez múltiplos de $3$." }],
      title: "Intersección",
      question: "Al lanzar un dado, $A$ = «par» y $B$ = «múltiplo de 3». ¿Cuál es $A \\cap B$?",
      choices: [
        { id: "a", label: "$\\{6\\}$" },
        { id: "b", label: "$\\{2, 3, 4, 6\\}$", incorrectFeedback: "Esa es la unión $A \\cup B$." },
        { id: "c", label: "$\\{2, 4\\}$", incorrectFeedback: "Esa es la diferencia $A - B$." },
        { id: "d", label: "$\\varnothing$", incorrectFeedback: "El $6$ es par y múltiplo de $3$: $A$ y $B$ son compatibles." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El único resultado que cumple a la vez ambas condiciones es el $6$.",
    },
    {
      id: "check-demorgan",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$A \\cup B = \\{2, 3, 4, 6\\}$; su contrario son los demás resultados." }],
      title: "Contrario de una unión",
      question: "Con los mismos $A$ y $B$, ¿cuál es $(A \\cup B)^c$?",
      choices: [
        { id: "a", label: "$\\{1, 5\\}$" },
        { id: "b", label: "$\\{1, 3, 5\\}$", incorrectFeedback: "Esos son los impares, es decir, $A^c$." },
        { id: "c", label: "$\\{2, 3, 4, 6\\}$", incorrectFeedback: "Esa es la propia unión, no su contrario." },
        { id: "d", label: "$\\{1, 2, 4, 5\\}$", incorrectFeedback: "Esa es $B^c$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(A \\cup B)^c = A^c \\cap B^c = \\{1, 3, 5\\}\\cap\\{1, 2, 4, 5\\} = \\{1, 5\\}$: los resultados que no son ni pares ni múltiplos de $3$.",
    },
    {
      id: "check-incompatibles",
      type: "classify",
      help: [{ label: "Pista", message: "Dos sucesos son incompatibles si no tienen ningún resultado en común." }],
      title: "¿Compatibles o incompatibles?",
      question: "Con un dado, clasifica cada pareja de sucesos.",
      groups: [
        { id: "co", label: "Compatibles", tone: "emerald" },
        { id: "in", label: "Incompatibles", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Par y múltiplo de 3", group: "co" },
        { id: "b", text: "Menor que 2 y múltiplo de 3", group: "in" },
        { id: "c", text: "Par e impar", group: "in" },
        { id: "d", text: "Primo y mayor que 4", group: "co" },
        { id: "e", text: "Menor que 3 y mayor que 4", group: "in" },
        { id: "f", text: "Impar y múltiplo de 3", group: "co" },
      ],
      hint: "Primo y mayor que 4 comparten el 5; impar y múltiplo de 3 comparten el 3.",
    },
    {
      id: "check-te-cafe",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Toman alguna bebida $35 - 2 = 33$ personas. Si sumas $15 + 27 = 42$, te pasas en $42 - 33$." }],
      title: "Té y café",
      question: "En un grupo de $35$ personas, $15$ toman té, $27$ toman café y $2$ no toman nada. ¿Cuántas toman té **y** café? (solo el número)",
      correctAnswers: ["9"],
      explanation: "Toman alguna bebida $35 - 2 = 33$ personas. Como $15 + 27 = 42 > 33$, hay $42 - 33 = 9$ contadas dos veces: $|T \\cap C| = 15 + 27 - 33 = 9$.",
    },
  ],
};
