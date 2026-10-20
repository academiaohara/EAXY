import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

/**
 * Todo el LaTeX lleva DOBLE barra (`\\sqrt`); con una sola, JS la elimina y KaTeX pinta «sqrt25».
 */
export const raicesCuadradas2esoLesson: InteractiveLesson = {
  slug: "raices-cuadradas-2eso",
  title: "9. Las raíces",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "inversa-cuadrado-narrate",
      type: "narrate",
      help: [
        {
          label: "Deshacer un cuadrado",
          message: "Si $5^2 = 25$, la raíz cuadrada de $25$ vuelve al número original: $5$.",
        },
        {
          label: "Un nombre para cada pieza",
          message: "En $\\sqrt{25}$, el $25$ es el radicando y el resultado es la raíz.",
        },
      ],
      title: "Inversa del cuadrado",
      definitionBox:
        "Calcular la **raíz cuadrada** es la operación inversa de elevar al cuadrado: si $a^2 = b$, entonces $\\sqrt{b} = a$. El $b$ es el **radicando**.",
      module: "raices-cuadradas",
      scene: "inversa-cuadrado",
      raices: { scene: "inversa-cuadrado", root: 5 },
    },
    {
      id: "cuadrados-perfectos-narrate",
      type: "narrate",
      help: [
        {
          label: "¿Por qué «perfectos»?",
          message: "Porque su raíz cuadrada es un número entero exacto, sin decimales.",
        },
        {
          label: "Una lista útil",
          message: "$1, 4, 9, 16, 25, 36, 49, 64, 81, 100$ son los cuadrados de $1$ a $10$.",
        },
      ],
      title: "Cuadrados perfectos",
      definitionBox:
        "Los números cuya raíz cuadrada es exacta se llaman **cuadrados perfectos**: $25$, $36$, $400$…",
      module: "raices-cuadradas",
      scene: "cuadrados-perfectos",
      raices: { scene: "cuadrados-perfectos" },
    },
    {
      id: "dos-raices",
      type: "slide",
      help: [
        {
          label: "¿Por qué dos?",
          message: "Porque $(+4)^2 = 16$ y también $(-4)^2 = 16$: elevar al cuadrado «borra» el signo.",
        },
        {
          label: "¿Y los negativos?",
          message: "Ningún número elevado al cuadrado da un resultado negativo: el cuadrado siempre es positivo o cero.",
        },
      ],
      title: "Raíces de números enteros",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Radicando positivo",
            text: "Tiene **dos** raíces cuadradas, opuestas.",
            math: ["\\sqrt{16} = \\pm 4", "(+4)^2 = 16,\\ (-4)^2 = 16"],
            tone: "ok",
          },
          right: {
            title: "Radicando negativo",
            text: "**No tiene** raíz cuadrada.",
            math: ["\\sqrt{-16}\\ \\text{no existe}", "x^2 = -16\\ \\text{es imposible}"],
            tone: "info",
          },
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{64} = \\pm 8" },
            { math: "\\sqrt{144} = \\pm 12" },
            { math: "\\sqrt{-36}", note: "no existe" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-raices-enteras",
      type: "classify",
      help: [
        {
          label: "Mira el radicando",
          message: "Si el radicando es negativo, no hay ninguna raíz cuadrada. Si es positivo, hay dos.",
        },
        {
          label: "Positivo y cuadrado perfecto",
          message: "Para $\\sqrt{121}$ busca un número que elevado al cuadrado dé $121$: el $11$.",
        },
      ],
      title: "¿Existen las raíces?",
      question: "Reparte los radicandos según el número de raíces cuadradas que tienen.",
      groups: [
        { id: "dos", label: "Dos raíces", tone: "cobalt" },
        { id: "ninguna", label: "No tiene raíz", tone: "amber" },
      ],
      items: [
        { id: "25", text: "$25$", group: "dos" },
        { id: "121", text: "$121$", group: "dos" },
        { id: "400", text: "$400$", group: "dos" },
        { id: "m1", text: "$-1$", group: "ninguna" },
        { id: "m100", text: "$-100$", group: "ninguna" },
        { id: "m169", text: "$-169$", group: "ninguna" },
      ],
      explanation: "Un radicando positivo tiene dos raíces (por ejemplo, $\\pm 5$ para $25$). Uno negativo no tiene ninguna, porque ningún cuadrado es negativo.",
    },
    {
      id: "raiz-entera-narrate",
      type: "narrate",
      help: [
        {
          label: "Si no es perfecto",
          message: "Encuentra los dos cuadrados perfectos entre los que está el número; la raíz entera es la raíz del menor.",
        },
        {
          label: "Un ejemplo",
          message: "$40$ está entre $36$ y $49$, así que $6 < \\sqrt{40} < 7$ y la raíz entera es $6$.",
        },
      ],
      title: "Raíz entera",
      definitionBox:
        "Para la mayoría de los números la raíz no es entera. Al número natural que más se aproxima **por debajo** lo llamamos **raíz entera**: la de $40$ es $6$.",
      module: "raices-cuadradas",
      scene: "raiz-entera",
      raices: { scene: "raiz-entera", radicand: 40 },
    },
    {
      id: "raiz-calculadora-narrate",
      type: "narrate",
      help: [
        {
          label: "¿Cómo la uso?",
          message: "Pulsa la tecla de raíz, escribe el radicando y pulsa igual.",
        },
        {
          label: "Compruébalo",
          message: "Eleva el resultado al cuadrado: debe volver a dar el radicando.",
        },
      ],
      title: "Raíz en la calculadora",
      definitionBox: "En la calculadora: tecla $\\sqrt{\\square}$, el radicando y $=$.",
      module: "raices-cuadradas",
      scene: "raiz-calculadora",
      raices: { scene: "raiz-calculadora", radicand: 144 },
    },
    {
      id: "check-entera-50",
      type: "predict",
      help: [
        {
          label: "Enmarca el número",
          message: "Escribe los cuadrados de los números del $5$ al $9$ y coloca el $50$ entre dos de ellos.",
        },
        {
          label: "No se redondea",
          message: "La raíz entera es la que queda por debajo, no la más cercana.",
        },
      ],
      title: "Raíz entera de 50",
      question: "¿Cuál es la raíz entera de $50$?",
      mode: "choice",
      choiceLayout: "grid",
      choices: [
        {
          id: "6",
          label: "$6$",
          incorrectFeedback: "$6^2 = 36$ se queda corto: $7^2 = 49$ aún no se pasa de $50$.",
        },
        { id: "7", label: "$7$" },
        {
          id: "8",
          label: "$8$",
          incorrectFeedback: "$8^2 = 64$ ya se pasa de $50$.",
        },
      ],
      correctChoiceId: "7",
      explanation: "$49 < 50 < 64$, así que $7 < \\sqrt{50} < 8$: la raíz entera es $7$.",
    },
    {
      id: "check-lado",
      type: "fill_in_blank",
      help: [
        {
          label: "Área y lado",
          message: "El área de un cuadrado es lado por lado: el lado es la raíz del área.",
        },
        {
          label: "Un lado, un valor",
          message: "Una longitud no puede ser negativa, así que de las dos raíces te sirve la positiva.",
        },
      ],
      title: "Del área al lado",
      question: "Un solar cuadrado tiene $169$ m² de superficie. ¿Cuántos metros mide cada lado? (solo el número)",
      correctAnswers: ["13"],
      explanation: "$\\sqrt{169} = 13$, porque $13^2 = 169$. Se toma la raíz positiva: una longitud no puede ser negativa.",
    },
  ],
};
