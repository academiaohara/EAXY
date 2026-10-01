import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const algebraEcuacionesLesson: InteractiveLesson = {
  slug: "algebra-ecuaciones",
  title: "3. Ecuaciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
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
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "¿Cuál de estas afirmaciones describe una ecuación?",
      options: [
        { id: "a", text: "Se cumple para cualquier valor de $x$." },
        { id: "b", text: "Solo se cumple para algunos valores de las letras." },
        { id: "c", text: "No contiene letras." },
      ],
      correctOptionId: "b",
      explanation: "Una ecuación tiene soluciones concretas; una identidad se cumple siempre.",
    },
  ],
};
