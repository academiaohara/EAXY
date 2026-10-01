import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraLetrasNumerosLesson: InteractiveLesson = {
  slug: "algebra-letras-numeros",
  title: "1. Letras en vez de números",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  steps: [
    {
      id: "historia",
      type: "concept",
      title: "Del montón egipcio al álgebra",
      content: [
        "Problemas como «el montón más un séptimo del montón es $24$» aparecen en papiros egipcios (hacia $1650$ a.C.). La incógnita era «el montón»; hoy escribimos $x + \\frac{x}{7} = 24$.",
        "La palabra **álgebra** viene del árabe: los matemáticos árabes (siglos viii–ix) llamaban a la incógnita «la cosa» y desarrollaron métodos sistemáticos de resolución.",
        "En muchas tareas hay cantidades **desconocidas**. Las representamos con **letras** y operamos con las mismas leyes que con números.",
      ],
    },
    {
      id: "generalizar",
      type: "concept",
      title: "Generalizar relaciones",
      content: [
        "Una máquina asocia a cada número su **doble más tres**: $2 \\mapsto 7$, $5 \\mapsto 13$…",
        "Para expresarlo en general, llamamos $n$ a un número cualquiera: $n \\longrightarrow 2n + 3$.",
        "**Propiedad conmutativa**: $a + b = b + a$. **Múltiplo de $a$**: $a \\cdot n$. **Distributiva**: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "De palabras a expresión",
          rows: [
            { text: "La edad de Juan", math: "x" },
            { text: "Dentro de 15 años", math: "x + 15" },
            { text: "El doble de la edad del año pasado", math: "2(x - 1)" },
            { text: "El doble de $x$", math: "2x" },
            { text: "La mitad de $x$, más seis", math: "\\frac{x}{2} + 6" },
          ],
        },
      ],
    },
    {
      id: "codificar",
      type: "concept",
      title: "Codificar un problema",
      content: [
        "Cuando las letras representan números, las tratamos como tales: sumamos, restamos y usamos propiedades.",
        "La parte de las matemáticas que estudia expresiones con letras se llama **álgebra**.",
        "**Problema resuelto**: la edad de Juan dentro de 15 años es el doble de la que tenía el año pasado. ¿Cuántos años tiene?",
        "$x + 15 = 2(x - 1) \\Rightarrow x + 15 = 2x - 2 \\Rightarrow 17 = x$. Juan tiene **17 años**.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Comprobación",
          rows: ["17 + 15", "2 \\cdot (17 - 1)"],
          operator: "=",
          result: "32",
          caption: "Ambos miembros valen $32$.",
        },
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "Si $x$ es la edad actual, ¿qué expresión representa «el anterior de $x$»?",
      options: [
        { id: "a", text: "$x + 1$" },
        { id: "b", text: "$x - 1$" },
        { id: "c", text: "$2x$" },
      ],
      correctOptionId: "b",
      explanation: "El número anterior a $x$ se obtiene restando una unidad: $x - 1$.",
    },
  ],
};
