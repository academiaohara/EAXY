import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2_SUBTITLE } from "@/data/lessons/shared";

/**
 * Tema 2 · Lección 2 — Raíz cuadrada.
 * Todo el LaTeX lleva DOBLE barra (`\\sqrt`); con una sola, JS la elimina y KaTeX pinta «sqrt25».
 */
export const raizCuadradaNaturalesLesson: InteractiveLesson = {
  slug: "raiz-cuadrada-naturales",
  title: "2. Raíz cuadrada",
  subtitle: TEMA_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "inversa-cuadrado-narrate",
      type: "narrate",
      title: "Inversa del cuadrado",
      definitionBox:
        "Calcular la **raíz cuadrada** es deshacer un cuadrado: si $a^2 = b$, entonces $\\sqrt{b} = a$. En $\\sqrt{b}$, el $b$ es el **radicando**.",
      module: "raices-cuadradas",
      scene: "inversa-cuadrado",
      raices: { scene: "inversa-cuadrado", root: 5 },
    },
    {
      id: "cuadrados-perfectos-narrate",
      type: "narrate",
      title: "Cuadrados perfectos",
      definitionBox:
        "Los números cuya raíz es exacta se llaman **cuadrados perfectos** ($25$, $36$, $400$…).",
      module: "raices-cuadradas",
      scene: "cuadrados-perfectos",
      raices: { scene: "cuadrados-perfectos" },
    },
    {
      id: "raiz-entera-narrate",
      type: "narrate",
      title: "Raíz entera",
      definitionBox:
        "Para la mayoría de los números la raíz no es natural. La **raíz entera** es el entero más cercano **por debajo**.",
      module: "raices-cuadradas",
      scene: "raiz-entera",
      raices: { scene: "raiz-entera", radicand: 40 },
    },
    {
      id: "raiz-calculadora-narrate",
      type: "narrate",
      title: "Raíz en la calculadora",
      definitionBox: "En la calculadora: tecla $\\sqrt{\\square}$, el radicando y $=$.",
      module: "raices-cuadradas",
      scene: "raiz-calculadora",
      raices: { scene: "raiz-calculadora", radicand: 144 },
    },
    {
      id: "raiz-exacta-entera-predict",
      type: "predict",
      title: "Raíz exacta o entera",
      definitionBox:
        "Compara cuadrados perfectos cercanos: $6^2 = 36$ y $7^2 = 49$ enmarcan a $\\sqrt{40}$.",
      question: "¿Cuál es la raíz entera de $50$?",
      mode: "choice",
      choiceLayout: "grid",
      choices: [
        {
          id: "6",
          label: "$6$",
          incorrectFeedback:
            "$6^2 = 36$ se queda corto: hay un entero mayor que aún no se pasa de $50$.",
        },
        { id: "7", label: "$7$" },
        {
          id: "8",
          label: "$8$",
          incorrectFeedback: "$8^2 = 64$ ya se pasa de $50$. La raíz entera va por debajo.",
        },
      ],
      correctChoiceId: "7",
      hintHiddenUntilRequested: true,
      hint: "Busca los dos cuadrados perfectos que rodean al $50$.",
      explanation: "Como $49 < 50 < 64$, se cumple $7 < \\sqrt{50} < 8$ y la raíz entera es $7$.",
    },
  ],
};
