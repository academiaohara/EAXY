import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoSuperficieLesson: InteractiveLesson = {
  slug: "sistema-metrico-superficie",
  title: "5. Medida de la superficie",
  subtitle: TEMA_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "contar",
      type: "slide",
      title: "Medir una superficie es contar cuadrados",
      blocks: [
        {
          kind: "definition",
          text: "Para medir una superficie se toma como unidad un **cuadrado** (**unidad cuadrada**, u.c.) y se averigua cuántos caben.",
        },
        {
          kind: "text",
          text: "Un rectángulo se cuenta por **filas**: $\\text{filas} \\cdot \\text{cuadrados por fila}$. Un triángulo rectángulo es **la mitad** del rectángulo que forma con otro igual.",
        },
      ],
      visual: { kind: "anim", scene: "cuadrados-area", params: { a: 5, b: 3 } },
    },
    {
      id: "metro-cuadrado",
      type: "slide",
      title: "El metro cuadrado: 1 m² = 100 dm²",
      blocks: [
        {
          kind: "definition",
          text: "La unidad principal es el **metro cuadrado** ($\\mathrm{m}^2$): la superficie de un cuadrado de **1 m de lado**.",
        },
        {
          kind: "rule",
          text: "Si el lado es 10 veces menor, caben 10 filas de 10: la superficie es **100 veces** menor. Por eso las unidades de superficie van **de 100 en 100**.",
          formula: "1\\ \\mathrm{m}^2 = 10 \\cdot 10\\ \\mathrm{dm}^2 = 100\\ \\mathrm{dm}^2",
        },
        {
          kind: "warning",
          text: "Error típico: pensar que $1\\ \\mathrm{m}^2$ son $10\\ \\mathrm{dm}^2$. Con la longitud se salta de 10 en 10; con la superficie, de **100** en 100.",
        },
      ],
      visual: { kind: "anim", scene: "m2-dm2" },
    },
    {
      id: "tabla",
      type: "slide",
      title: "La tabla de superficie y las unidades agrarias",
      blocks: [
        {
          kind: "rule",
          text: "La tabla es la misma, pero cada columna ocupa **dos cifras**: un salto mueve la coma **dos lugares**.",
        },
        {
          kind: "text",
          text: "Para medir **campos** (*agro* = campo) hay tres unidades agrarias que coinciden con tres de la tabla:",
        },
        {
          kind: "facts",
          items: [
            { tex: "1\\ \\mathrm{ha}", label: "hectárea = 1 hm² = 10 000 m²" },
            { tex: "1\\ \\mathrm{a}", label: "área = 1 dam² = 100 m²" },
            { tex: "1\\ \\mathrm{ca}", label: "centiárea = 1 m²" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "escalera-unidades", params: { units: "m2" } },
    },
    {
      id: "check-peninsula",
      type: "predict",
      title: "El mapa de la península",
      question:
        "Un atlas indica la superficie de la Península Ibérica. ¿Qué unidad es la más adecuada para expresar ese territorio?",
      mode: "choice",
      choices: [
        { id: "a", label: "El kilómetro cuadrado ($\\mathrm{km}^2$)" },
        {
          id: "b",
          label: "El metro cuadrado ($\\mathrm{m}^2$)",
          incorrectFeedback:
            "Funcionaría, pero saldría un número de **doce cifras**. Para territorios se usa una unidad mucho mayor.",
        },
        {
          id: "c",
          label: "El milímetro cuadrado ($\\mathrm{mm}^2$)",
          incorrectFeedback:
            "El milímetro cuadrado sirve para cosas como el ala de una abeja. Para una península sería un número enorme.",
        },
        {
          id: "d",
          label: "El decímetro cuadrado ($\\mathrm{dm}^2$)",
          incorrectFeedback:
            "Un decímetro cuadrado es el tamaño de una baldosa pequeña: aquí daría un número de catorce cifras.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "La Península Ibérica tiene unos $600\\,000\\ \\mathrm{km}^2$. La unidad cómoda es la que da números manejables.",
    },
    {
      id: "cambios",
      type: "slide",
      title: "Cambios de unidad: dos lugares por salto",
      blocks: [
        {
          kind: "rule",
          text: "Se coloca la cantidad con la coma bajo su unidad y la coma se mueve **dos lugares por cada salto**.",
        },
        {
          kind: "example",
          lines: [
            { math: "47\\,200\\ \\mathrm{m}^2 = 4{,}72\\ \\mathrm{hm}^2", note: "2 saltos a la izquierda: 4 lugares" },
            { math: "6{,}2\\ \\mathrm{dm}^2 = 620\\ \\mathrm{cm}^2", note: "1 salto a la derecha: 2 lugares" },
            { math: "252\\,800\\ \\mathrm{m}^2 = 25{,}28\\ \\mathrm{ha}", note: "las hectáreas son hm²" },
          ],
        },
        {
          kind: "warning",
          text: "Con la longitud, un salto es un lugar. Aquí es el doble: **no los mezcles**.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-unidades", params: { units: "m2", dec: "47200", from: "m2", to: "hm2" } },
    },
    {
      id: "check-finca",
      type: "predict",
      title: "La finca",
      question: "Una finca mide 3,5 hm². ¿Cuántos metros cuadrados son?",
      mode: "choice",
      choices: [
        { id: "a", label: "$35\\,000\\ \\mathrm{m}^2$" },
        {
          id: "b",
          label: "$350\\ \\mathrm{m}^2$",
          incorrectFeedback:
            "Has movido la coma dos lugares, como si fuera **un** salto. De $\\mathrm{hm}^2$ a $\\mathrm{m}^2$ hay dos saltos de dos lugares: cuatro.",
        },
        {
          id: "c",
          label: "$3\\,500\\ \\mathrm{m}^2$",
          incorrectFeedback:
            "Has movido la coma tres lugares: no corresponde a ningún salto completo. Cada salto son **dos** lugares, y hay dos saltos.",
        },
        {
          id: "d",
          label: "$3\\,500\\,000\\ \\mathrm{m}^2$",
          incorrectFeedback:
            "Has movido la coma seis lugares: eso es pasar de $\\mathrm{km}^2$ a $\\mathrm{m}^2$. De hectómetro cuadrado hay solo dos saltos.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$\\mathrm{hm}^2 \\to \\mathrm{dam}^2 \\to \\mathrm{m}^2$: dos saltos, cuatro lugares. $3{,}5\\ \\mathrm{hm}^2 = 35\\,000\\ \\mathrm{m}^2$, es decir, $3{,}5$ hectáreas.",
    },
    {
      id: "compleja",
      type: "slide",
      title: "Forma compleja con superficies: dos cifras por unidad",
      blocks: [
        {
          kind: "rule",
          text: "Mismo método, pero cada parte ocupa **dos cifras** en su columna: $8\\ \\mathrm{dam}^2$ se escribe $08$.",
        },
        {
          kind: "example",
          title: "Juntar (en la animación)",
          lines: [{ math: "5\\ \\mathrm{km}^2\\ 48\\ \\mathrm{hm}^2\\ 25\\ \\mathrm{dam}^2 = 5\\,482\\,500\\ \\mathrm{m}^2" }],
        },
        {
          kind: "example",
          title: "Separar",
          lines: [{ math: "587{,}24\\ \\mathrm{hm}^2 = 587\\ \\mathrm{hm}^2\\ 24\\ \\mathrm{dam}^2" }],
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-unidades",
        params: { units: "m2", parts: ["5 km²", "48 hm²", "25 dam²"], to: "m2" },
      },
    },
    {
      id: "check-parcela",
      type: "predict",
      title: "La parcela del registro",
      question:
        "El registro de la propiedad anota una parcela de 6 dam² 58 m² 46 dm². ¿Cuántos metros cuadrados son?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$658{,}46\\ \\mathrm{m}^2$" },
        {
          id: "b",
          label: "$658{,}046\\ \\mathrm{m}^2$",
          incorrectFeedback:
            "Has dado tres cifras a los dm². Cada unidad de superficie ocupa **dos** cifras: $46\\ \\mathrm{dm}^2 = 0{,}46\\ \\mathrm{m}^2$.",
        },
        {
          id: "c",
          label: "$65{,}846\\ \\mathrm{m}^2$",
          incorrectFeedback:
            "Los $6\\ \\mathrm{dam}^2$ valen $600\\ \\mathrm{m}^2$, no $60$: el $6$ ocupa su columna de **dos** cifras ($06$) y por eso hay tres cifras antes de la coma.",
        },
        {
          id: "d",
          label: "$6{,}5846\\ \\mathrm{m}^2$",
          incorrectFeedback:
            "Has puesto la coma junto a los $\\mathrm{dam}^2$. La coma va a la derecha de la columna de los **m²**.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$6\\ \\mathrm{dam}^2 = 600\\ \\mathrm{m}^2$, $58\\ \\mathrm{m}^2$ y $46\\ \\mathrm{dm}^2 = 0{,}46\\ \\mathrm{m}^2$. Suma: $658{,}46\\ \\mathrm{m}^2$.",
    },
  ],
};
