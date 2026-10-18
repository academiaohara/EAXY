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
        "Para la mayoría de los números la raíz no es natural. La **raíz entera** es el mayor natural cuyo cuadrado **no se pasa** del radicando.",
      module: "raices-cuadradas",
      scene: "raiz-entera",
      raices: { scene: "raiz-entera", radicand: 40 },
    },
    {
      id: "raiz-entera-resto",
      type: "slide",
      title: "Raíz entera y resto",
      blocks: [
        {
          kind: "text",
          text: "Lo que **sobra** al quitar el cuadrado de la raíz entera es el **resto**. Si el resto es $0$, la raíz es exacta.",
        },
        {
          kind: "rule",
          title: "Relación",
          formula: "\\text{radicando} = (\\text{raíz entera})^2 + \\text{resto}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{50}:\\ 50 = 7^2 + 1", note: "raíz entera $7$, resto $1$" },
            { math: "\\sqrt{40}:\\ 40 = 6^2 + 4", note: "raíz entera $6$, resto $4$" },
            { math: "\\sqrt{64}:\\ 64 = 8^2 + 0", note: "resto $0$: raíz exacta" },
          ],
        },
        {
          kind: "warning",
          title: "Comprueba",
          text: "El resto nunca llega a $2 \\cdot (\\text{raíz entera}) + 1$. Si te sale igual o mayor, la raíz entera es un número más.",
        },
      ],
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
      help: [
        {
          label: "¿Qué es la raíz entera?",
          message: "El mayor número entero cuyo cuadrado no pasa del radicando.",
        },
        {
          label: "Tantea con cuadrados",
          message: "Escribe los cuadrados de los números del $5$ al $9$ y coloca el $50$ entre dos de ellos.",
        },
        {
          label: "¿Por qué no redondeo?",
          message: "La raíz entera no se redondea al más cercano: es el mayor cuadrado que no se pasa. Aunque el $50$ esté pegado a otro cuadrado perfecto.",
        },
      ],
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
    {
      id: "check-lado",
      type: "predict",
      help: [
        {
          label: "¿Qué relación hay entre lado y superficie?",
          message: "El área de un cuadrado es lado por lado. Te dan el área y buscas el lado: la operación inversa.",
        },
        {
          label: "Tantea",
          message: "Busca un número que multiplicado por sí mismo dé $81$. Recorre la tabla de cuadrados.",
        },
        {
          label: "¿Y si divido entre $2$?",
          message: "Dividir entre $2$ deshace «el doble», no «multiplicar por sí mismo». Comprueba si tu lado, multiplicado por sí mismo, da el área.",
        },
      ],
      title: "Del área al lado",
      question:
        "Un terreno cuadrado tiene $81$ m² de superficie. ¿Cuánto mide cada lado?",
      mode: "choice",
      choices: [
        { id: "9", label: "$9$ m" },
        {
          id: "40",
          label: "$40{,}5$ m",
          incorrectFeedback:
            "Has dividido entre $2$. El área de un cuadrado es lado por lado, así que el lado es la raíz: $\\sqrt{81}$.",
        },
        {
          id: "27",
          label: "$27$ m",
          incorrectFeedback: "$27 \\cdot 27 = 729$, mucho más que $81$.",
        },
      ],
      correctChoiceId: "9",
      explanation: "Lado $\\cdot$ lado $= 81$, o sea, lado $= \\sqrt{81} = 9$ m, porque $9^2 = 81$.",
    },
  ],
};
