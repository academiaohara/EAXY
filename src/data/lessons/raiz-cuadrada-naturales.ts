import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2_SUBTITLE } from "@/data/lessons/shared";

export const raizCuadradaNaturalesLesson: InteractiveLesson = {
  slug: "raiz-cuadrada-naturales",
  title: "2. Raíz cuadrada",
  subtitle: TEMA_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "raiz-inversa",
      type: "interactive_tool",
      tool: "potencias-raices",
      scene: "raiz-inversa",
      title: "Inversa del cuadrado",
      definitionBox:
        "Calcular la **raíz cuadrada** es deshacer un cuadrado: si $a^2 = b$, entonces $\\sqrt{b} = a$. En $\\sqrt{b}$, el $b$ es el **radicando**.",
      layout: "stack",
    },
    {
      id: "cuadrados-perfectos",
      type: "interactive_tool",
      tool: "potencias-raices",
      scene: "cuadrados-perfectos",
      title: "Cuadrados perfectos",
      definitionBox:
        "Los números cuya raíz es exacta se llaman **cuadrados perfectos** ($25$, $36$, $400$…).",
      layout: "stack",
    },
    {
      id: "raiz-entera",
      type: "interactive_tool",
      tool: "potencias-raices",
      scene: "raiz-entera",
      title: "Raíz entera",
      definitionBox:
        "Para la mayoría de los números la raíz no es natural. La **raíz entera** es el entero más cercano **por debajo**.",
      layout: "stack",
    },
    {
      id: "calculadora-raiz",
      type: "interactive_tool",
      tool: "potencias-raices",
      scene: "calculadora-raiz",
      title: "Raíz en la calculadora",
      definitionBox:
        "En la calculadora: tecla $\\sqrt{\\square}$, el radicando y $=$.",
      layout: "stack",
    },
    {
      id: "check-raiz",
      type: "predict",
      title: "Raíz exacta o entera",
      definitionBox:
        "Compara cuadrados perfectos cercanos: $6^2 = 36$ y $7^2 = 49$ enmarcan a $\\sqrt{40}$.",
      question:
        "¿Cuál es la raíz entera de $50$? (el mejor entero por debajo de $\\sqrt{50}$)",
      mode: "choice",
      choices: [
        { id: "6", label: "$6$", incorrectFeedback: "$6^2 = 36$, demasiado pequeño para acercarse por debajo." },
        { id: "7", label: "$7$" },
        { id: "8", label: "$8$", incorrectFeedback: "$8^2 = 64$ ya es mayor que $50$." },
      ],
      correctChoiceId: "7",
      hint: "$7^2 = 49 < 50 < 64 = 8^2$.",
      explanation:
        "Como $49 < 50 < 64$, se cumple $7 < \\sqrt{50} < 8$ y la raíz entera es $7$.",
    },
  ],
};
