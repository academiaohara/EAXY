import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_2_SUBTITLE } from "@/data/lessons/shared";

export const reglaFasesGibbsLesson: InteractiveLesson = {
  slug: "regla-fases-gibbs",
  title: "3. Regla de las fases de Gibbs",
  subtitle: TEMA_TI2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "conceptos",
      type: "slide",
      help: [
        {
          label: "¿Una fase es un compuesto químico?",
          message: "No necesariamente. Una fase es una parte homogénea del sistema que se distingue físicamente del resto: puede ser una solución, una aleación o un compuesto.",
        },
      ],
      title: "Componentes, fases y grados de libertad",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Componente** es cada sustancia o elemento que forma el sistema.",
            "**Fase** es cada parte homogénea que se distingue físicamente del resto.",
            "**Grado de libertad** es cada variable que se puede modificar libremente.",
          ],
        },
        {
          kind: "text",
          text: "Ejemplos: el acero tiene dos componentes (Fe y Fe₃C). El agua puede tener tres fases (hielo, líquido, vapor). Agua salada con hielo tiene dos: la solución salina y el hielo.",
        },
        {
          kind: "text",
          text: "Las variables de estado son la presión, la temperatura y la concentración.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "regla",
      type: "slide",
      help: [
        {
          label: "¿Qué significa N = 0?",
          message: "Que no queda ninguna variable libre: presión y temperatura están fijadas. Es un punto invariante, como el punto triple del agua.",
        },
      ],
      title: "La regla de las fases",
      blocks: [
        {
          kind: "rule",
          title: "Regla de Gibbs",
          formula: "F + N = C + 2",
          text: "$F$ fases que coexisten, $N$ grados de libertad y $C$ componentes.",
        },
        {
          kind: "text",
          text: "Pruébala con el agua ($C = 1$): en el punto triple, sobre una línea de equilibrio y dentro de una región.",
        },
      ],
      visual: { kind: "tool", tool: "gibbs-explorador", params: { a: 1, b: 3 } },
    },
    {
      id: "check-triple",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Aplica la fórmula", message: "En el punto triple coexisten sólido, líquido y vapor: $F = 3$. El agua pura es un solo componente: $C = 1$." }],
      title: "Punto triple del agua",
      question: "¿Cuántos grados de libertad $N$ tiene el agua pura en el punto triple? (solo el número)",
      correctAnswers: ["0"],
      explanation: "$3 + N = 1 + 2 \\Rightarrow N = 0$. Es un punto invariante: ni la presión ni la temperatura se pueden modificar.",
    },
    {
      id: "check-curva",
      type: "predict",
      help: [{ label: "Cuenta las fases", message: "Sobre la línea de solidificación hay dos fases: sólido y líquido." }],
      title: "Sobre la curva de solidificación",
      question: "En un punto cualquiera de la curva sólido–líquido del agua coexisten dos fases. ¿Cuántos grados de libertad hay?",
      mode: "choice",
      choices: [
        { id: "1", label: "Uno: puedes cambiar la temperatura y la presión se ajusta a la curva" },
        { id: "0", label: "Cero: es un punto invariante", incorrectFeedback: "El punto invariante es solo el punto triple; en la curva sigue habiendo una variable libre." },
        { id: "2", label: "Dos: presión y temperatura son independientes", incorrectFeedback: "Eso ocurre dentro de una región de una sola fase, no sobre una línea." },
      ],
      correctChoiceId: "1",
      shuffleChoices: true,
      explanation: "$2 + N = 1 + 2 \\Rightarrow N = 1$: a cada temperatura le corresponde una única presión de equilibrio.",
    },
    {
      id: "check-binaria",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Componentes", message: "Una aleación binaria tiene $C = 2$ componentes." }],
      title: "Aleación binaria",
      question: "En una aleación **binaria** coexisten tres fases en equilibrio. ¿Cuántos grados de libertad quedan? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$3 + N = 2 + 2 \\Rightarrow N = 1$.",
    },
    {
      id: "check-una-fase",
      type: "predict",
      help: [{ label: "Una fase", message: "Dentro de una región monofásica, $F = 1$." }],
      title: "Una sola fase",
      question: "Un punto B dentro de la región del líquido (una sola fase) del agua. ¿Cuántas variables se pueden modificar sin cambiar de fase?",
      mode: "choice",
      choices: [
        { id: "2", label: "Dos: presión y temperatura" },
        { id: "1", label: "Una", incorrectFeedback: "Eso sería sobre una línea de equilibrio." },
        { id: "0", label: "Ninguna", incorrectFeedback: "Eso sería en el punto triple." },
      ],
      correctChoiceId: "2",
      shuffleChoices: true,
      explanation: "$1 + N = 1 + 2 \\Rightarrow N = 2$.",
    },
  ],
};
