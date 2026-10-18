import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraTecnicasEcuacionesLesson: InteractiveLesson = {
  slug: "algebra-tecnicas-ecuaciones",
  title: "4. Primeras técnicas de resolución",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  steps: [
    {
      id: "suma",
      type: "concept",
      title: "Ecuación $x + a = b$",
      content: [
        "Ejemplo: $x + 4 = 7$. Restamos $4$ en ambos miembros: $x = 7 - 4 = 3$.",
        "Regla práctica: **lo que está sumando en un miembro pasa restando al otro**.",
        "Fórmula: $x + a = b \\Rightarrow x = b - a$.",
      ],
    },
    {
      id: "resta",
      type: "concept",
      title: "Ecuación $x - a = b$",
      content: [
        "Ejemplo: $x - 2 = 6$. Sumamos $2$: $x = 6 + 2 = 8$.",
        "Regla: **lo que resta en un miembro pasa sumando al otro**.",
        "Caso $5 - x = 2$: sumamos $x$ y restamos $2$ → $5 - 2 = x$, luego $x = 3$.",
      ],
    },
    {
      id: "producto",
      type: "concept",
      title: "Ecuación $a \\cdot x = b$",
      content: [
        "Ejemplo: $3x = 15$. Dividimos entre $3$: $x = \\frac{15}{3} = 5$.",
        "Regla: **lo que multiplica a un miembro pasa dividiendo al otro**.",
        "Casos especiales: $0 \\cdot x = 6$ **no tiene solución**; $0 \\cdot x = 0$ tiene **infinitas** soluciones.",
      ],
    },
    {
      id: "cociente",
      type: "concept",
      title: "Ecuación $\\frac{x}{a} = b$",
      content: [
        "Ejemplo: $\\frac{x}{4} = 3$. Multiplicamos por $4$: $x = 3 \\cdot 4 = 12$.",
        "Regla: **lo que divide a un miembro pasa multiplicando al otro**.",
        "Combinando técnicas: $3x - 2 = 0 \\Rightarrow 3x = 2 \\Rightarrow x = \\frac{2}{3}$; $4x + 5 = 13 \\Rightarrow 4x = 8 \\Rightarrow x = 2$.",
      ],
    },
    {
      id: "check",
      type: "number_line_pick",
      help: [
        {
          label: "¿Qué le hace el $5$ a la $x$?",
          message: "$\\frac{x}{5}$ es $x$ repartido en $5$ partes. Para recuperar $x$ hay que deshacer esa operación: ¿cuál es la inversa de dividir?",
        },
        {
          label: "Pruébalo con una más fácil",
          message: "Si $\\frac{x}{2} = 3$, ¿qué número partido en $2$ da $3$? Usa exactamente la misma idea con el $5$.",
          math: ["\\frac{x}{2} = 3 \\;\\Rightarrow\\; x = \\;?"],
        },
        {
          label: "¿Cómo lo marco en la recta?",
          message: "Calcula primero el valor y luego busca su marca en la regla. Si no estás seguro de la posición, comprueba sustituyendo en la ecuación.",
        },
      ],
      title: "Comprueba lo aprendido",
      question: "Resuelve $\\frac{x}{5} = 2$ y marca la solución en la recta.",
      min: 0,
      max: 12,
      target: 10,
      hint: "El $5$ está dividiendo a $x$: pasa al otro miembro multiplicando.",
      explanation: "Multiplicamos ambos miembros por $5$: $x = 2 \\cdot 5 = 10$. Comprobación: $\\frac{10}{5} = 2$.",
    },
  ],
};
