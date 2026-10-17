import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraEcuacionesLesson: InteractiveLesson = {
  slug: "algebra-ecuaciones",
  title: "3. Ecuaciones",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  steps: [
    {
      id: "ecuacion-identidad",
      type: "concept",
      title: "Ecuaciones e identidades",
      content: [
        "Una **ecuación** es una igualdad entre expresiones algebraicas que solo se cumple para **ciertos** valores. Ej.: $3x - 4 = 8$ solo con $x = 4$.",
        "Una **identidad** se cumple **siempre**, cualquiera que sea el valor de las letras. Ej.: $6x - 4x = 2x$.",
        "No toda igualdad algebraica es ecuación; hay que distinguir si depende del valor de la incógnita.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Compara",
          items: [
            { title: "Ecuación", math: "3x - 4 = 8", caption: "Solución: $x = 4$.", tone: "cobalt" },
            { title: "Identidad", math: "6x - 4x = 2x", caption: "Válida para todo $x$.", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "elementos",
      type: "concept",
      title: "Elementos de una ecuación",
      content: [
        "En $4x - 5 = 2x + 1$ hay **miembros** (izquierdo y derecho), **términos** (sumandos), **incógnitas** (letras) y **soluciones** (valores que hacen cierta la igualdad).",
        "Ejemplo: $4x - 5 = 2x + 1$ es de **primer grado** con una incógnita. Solución $x = 3$ porque $4 \\cdot 3 - 5 = 2 \\cdot 3 + 1 = 7$.",
        "Antes de métodos sistemáticos, puedes **probar valores** (tanteo) para ecuaciones sencillas.",
      ],
    },
    {
      id: "check",
      type: "classify",
      title: "Comprueba lo aprendido",
      question: "¿Ecuación o identidad? Coloca cada igualdad en su grupo.",
      groups: [
        { id: "ecuacion", label: "Ecuación", tone: "cobalt" },
        { id: "identidad", label: "Identidad", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$x + 3 = 7$", group: "ecuacion" },
        { id: "b", text: "$x + x = 2x$", group: "identidad" },
        { id: "c", text: "$3x = 12$", group: "ecuacion" },
        { id: "d", text: "$2(x + 1) = 2x + 2$", group: "identidad" },
        { id: "e", text: "$5x - 1 = 9$", group: "ecuacion" },
        { id: "f", text: "$7x - 3x = 4x$", group: "identidad" },
      ],
      hint: "Prueba con dos valores distintos de $x$, por ejemplo $0$ y $1$: ¿se cumple la igualdad con los dos?",
      explanation:
        "Las ecuaciones solo se cumplen para valores concretos: $x + 3 = 7$ y $3x = 12$ con $x = 4$; $5x - 1 = 9$ con $x = 2$. Las identidades, como $x + x = 2x$, se cumplen para cualquier $x$.",
    },
  ],
};
