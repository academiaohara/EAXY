import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_7_SUBTITLE } from "@/data/lessons/shared";

export const problemasConSistemasLesson: InteractiveLesson = {
  slug: "problemas-con-sistemas",
  title: "5. Problemas con sistemas de ecuaciones",
  subtitle: TEMA_7_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Del enunciado al sistema",
      content: [
        "Muchos problemas se resuelven traduciendo el enunciado al lenguaje algebraico.",
        "Lo habitual es definir **dos incógnitas**, plantear **dos ecuaciones** con los datos del problema y resolver el sistema.",
      ],
    },
    {
      id: "bocadillos",
      type: "animated_solution",
      title: "Problema resuelto — Bocadillos y refrescos",
      content: [
        "Elvira pagó 14 € por 4 bocadillos y 5 refrescos. Lorena pagó 8,40 € por 3 bocadillos y 2 refrescos. Vamos paso a paso.",
      ],
      frames: [
        {
          caption: "Definimos las incógnitas:",
          math: "x = \\text{precio de un bocadillo},\\quad y = \\text{precio de un refresco}",
        },
        {
          caption: "Traducimos los datos de Elvira y Lorena:",
          math: "\\begin{cases} 4x + 5y = 14 \\\\ 3x + 2y = 8{,}40 \\end{cases}",
        },
        {
          caption: "Resolvemos (por reducción, por ejemplo):",
          math: "x = 2,\\quad y = 1{,}20",
        },
        {
          caption: "Respuesta al problema:",
          math: "\\text{Un bocadillo cuesta } 2\\text{ € y un refresco } 1{,}20\\text{ €}",
        },
      ],
    },
    {
      id: "inversion",
      type: "concept",
      title: "Otro tipo de problemas: porcentajes",
      content: [
        "En problemas de inversión repartimos un capital entre dos opciones con distinto interés.",
        "Una ecuación relaciona las cantidades ($x + y = \\text{total}$) y otra, los intereses ($0{,}04x + 0{,}05y = \\text{ganancia}$).",
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Practica",
      question:
        "La suma de dos números es 14. Si al mayor le sumamos 1 obtenemos el doble del menor. ¿Qué sistema planteamos?",
      options: [
        { id: "a", text: "$x + y = 14$ y $x + 1 = 2y$" },
        { id: "b", text: "$x + y = 14$ y $x = y + 1$" },
        { id: "c", text: "$xy = 14$ y $x = 2y$" },
      ],
      correctOptionId: "a",
      explanation:
        "Sea $x$ el mayor e $y$ el menor. La suma da $x + y = 14$ y la condición del enunciado es $x + 1 = 2y$.",
    },
  ],
};
