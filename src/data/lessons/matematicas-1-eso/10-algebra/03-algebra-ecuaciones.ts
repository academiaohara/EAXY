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
      help: [
        {
          label: "Una imagen para distinguirlas",
          message: "Una ecuación es un enigma: «¿qué número hace cierta esta igualdad?». Una identidad es una verdad que no depende de nada, como «el doble de $x$ es $x + x$».",
        },
        {
          label: "Pruébalo con números",
          message: "En $x + 3 = 7$ solo $x = 4$ funciona. En $x + x = 2x$ puedes poner $1$, $10$ o $-5$: siempre sale.",
          math: ["x + 3 = 7 \\;\\to\\; x = 4 \\qquad x + x = 2x \\;\\to\\; \\text{cualquier } x"],
        },
        {
          label: "¿Por qué me importa?",
          message: "Resolver una ecuación es buscar ese valor especial. Una identidad no se «resuelve»: se comprueba o se usa para simplificar.",
        },
      ],
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
      help: [
        {
          label: "Piensa en una balanza",
          message: "El signo $=$ es el eje. Cada lado es un miembro y los términos son los pesos de cada platillo.",
        },
        {
          label: "¿Qué es una solución?",
          message: "Un valor de $x$ que equilibra la balanza. Para saber si lo es, sustituye y mira si los dos lados dan lo mismo.",
          branches: [
            {
              label: "Un ejemplo",
              message: "Con $x = 3$ en $4x - 5 = 2x + 1$: a la izquierda sale $7$ y a la derecha también.",
            },
          ],
        },
        {
          label: "¿Qué es el tanteo?",
          message: "Probar valores hasta que la balanza se equilibre. Sirve en ecuaciones sencillas; después verás un método que no necesita adivinar.",
        },
      ],
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
      help: [
        {
          label: "¿Qué diferencia hay?",
          message: "Una ecuación es como una pregunta («¿para qué valor se cumple?»). Una identidad ya es una afirmación cierta siempre.",
          branches: [
            {
              label: "¿Cómo lo compruebo?",
              message: "Sustituye la $x$ por un valor y mira si los dos lados dan lo mismo. Repite con otro valor: si con alguno falla, es una ecuación.",
              math: ["x = 0:\\ \\text{¿igual?} \\qquad x = 1:\\ \\text{¿igual?}"],
            },
          ],
        },
        {
          label: "Me da pereza probar números",
          message: "Simplifica un lado: si al reducir queda exactamente lo mismo que en el otro, es una identidad. Si queda algo como $x = \\text{número}$, es una ecuación.",
        },
      ],
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
