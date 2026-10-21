import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_3_SUBTITLE } from "@/data/lessons/shared";

export const polimerizacionLesson: InteractiveLesson = {
  slug: "polimerizacion",
  title: "4. Polímeros y polimerización",
  subtitle: TEMA_TI2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "que-es-polimero",
      type: "slide",
      help: [
        {
          label: "¿Qué es un mero?",
          message: "La unidad que se repite en la cadena polimérica. El monómero es la molécula sencilla de la que sale.",
        },
      ],
      title: "Polímeros: moléculas gigantes",
      blocks: [
        {
          kind: "definition",
          text: "Un **polímero** es una molécula gigante de origen orgánico formada por la repetición de pequeñas unidades llamadas **meros**, que proceden de **monómeros**.",
        },
        {
          kind: "steps",
          items: [
            "**Monómero** es la molécula sencilla que se enlaza en largas cadenas.",
            "**Mero** es la unidad que se repite en la cadena.",
            "**Polimerización** es la reacción que forma el polímero a partir de monómeros.",
          ],
        },
        {
          kind: "text",
          text: "Cuanto mayor es la cadena, más sube el punto de fusión y más resistente y rígido es el material. Son ligeros, resistentes a la corrosión y buenos aislantes eléctricos, pero poco resistentes mecánicamente y no valen para altas temperaturas.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "adicion",
      type: "slide",
      help: [
        {
          label: "¿Por qué el doble enlace es clave?",
          message: "Un doble enlace C=C es «no saturado»: puede abrirse y pasar a enlace simple, dejando un enlace libre con el que el carbono se une a otra molécula.",
        },
      ],
      title: "Polimerización por adición",
      blocks: [
        {
          kind: "text",
          text: "Las moléculas simples se unen por **enlaces covalentes** y forman cadenas de miles de monómeros. Ejemplo: el polietileno a partir del etileno ($C_2H_4$).",
        },
        {
          kind: "steps",
          items: [
            "**Iniciación**: un iniciador (agua oxigenada) aporta grupos $OH$ que abren el doble enlace.",
            "**Crecimiento**: cada monómero se suma a la cadena. Lento al principio, luego se acelera.",
            "**Terminación**: dos cadenas se unen o un grupo $OH$ cierra el extremo.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "polimerizacion-adicion", beatMs: 4200 },
    },
    {
      id: "check-iniciador",
      type: "predict",
      help: [{ label: "Cadena", message: "Regular la cantidad de iniciador regula cuántas cadenas empiezan, y por tanto su longitud." }],
      title: "Longitud de la cadena",
      question: "En la polimerización por adición, ¿cómo se puede regular la longitud de la cadena?",
      mode: "choice",
      choices: [
        { id: "inic", label: "Controlando la cantidad de iniciador" },
        { id: "temp", label: "Solo subiendo la temperatura de fusión del monómero", incorrectFeedback: "El control principal es la cantidad de iniciador." },
        { id: "no", label: "No se puede regular: siempre sale la misma longitud", incorrectFeedback: "Sí se regula: más iniciador, más cadenas y más cortas." },
      ],
      correctChoiceId: "inic",
      shuffleChoices: true,
      explanation: "Con más iniciador empiezan más cadenas a la vez, que compiten por los monómeros y quedan más cortas; con menos, quedan más largas.",
    },
    {
      id: "condensacion",
      type: "slide",
      help: [
        {
          label: "¿Qué se desprende?",
          message: "Un subproducto colateral, como agua o alcohol metílico. Por eso la masa del polímero es menor que la suma de las masas de los monómeros.",
        },
      ],
      title: "Polimerización por condensación",
      blocks: [
        {
          kind: "text",
          text: "Por la acción del calor, la presión o un catalizador se forman polímeros lineales mediante una reacción en la que se desprende un **subproducto**. Ejemplo: el **PET**, a partir de dimetil-ftalato y etilenglicol.",
        },
        {
          kind: "text",
          text: "La longitud de la cadena depende de la facilidad con que los monómeros se difunden hacia los extremos. Termina cuando ningún monómero llega al extremo de la cadena.",
        },
      ],
      visual: { kind: "anim", scene: "polimerizacion-condensacion", beatMs: 4200 },
    },
    {
      id: "clasifica-mecanismo",
      type: "classify",
      help: [{ label: "Pista", message: "Si hay un subproducto colateral, es condensación. Si solo se abre un doble enlace, es adición." }],
      title: "Adición o condensación",
      question: "Clasifica cada afirmación según el mecanismo de polimerización al que se refiere.",
      groups: [
        { id: "adicion", label: "Adición", tone: "cobalt" },
        { id: "condensacion", label: "Condensación", tone: "amber" },
      ],
      items: [
        { id: "a", text: "El monómero tiene un doble enlace C=C que se abre", group: "adicion" },
        { id: "b", text: "Se desprende alcohol metílico como subproducto", group: "condensacion" },
        { id: "c", text: "Se forma el polietileno a partir del etileno", group: "adicion" },
        { id: "d", text: "Se obtiene PET a partir de dimetil-ftalato y etilenglicol", group: "condensacion" },
        { id: "e", text: "Se necesita un iniciador como el agua oxigenada", group: "adicion" },
        { id: "f", text: "Los dos monómeros se unen y se libera una molécula pequeña", group: "condensacion" },
      ],
      hint: "Pregúntate si en la reacción sale algo más aparte del polímero.",
      explanation: "En la adición no hay subproducto. En la condensación se libera una molécula pequeña (agua, alcohol…).",
    },
    {
      id: "grado",
      type: "slide",
      help: [
        {
          label: "¿Y si hay varios monómeros distintos?",
          message: "Entonces se usa la masa molecular promedio $M = \\sum f_i M_i$, donde $f_i$ es la fracción molecular de cada monómero.",
        },
      ],
      title: "Grado de polimerización",
      blocks: [
        {
          kind: "formula",
          tex: "\\text{grado de polimerización} = \\dfrac{M_{\\text{polímero}}}{M_{\\text{monómero}}}",
        },
        {
          kind: "rule",
          title: "Si hay condensación",
          formula: "M = \\sum \\left(f_i\\,M_i - M_{\\text{subproducto}}\\right)",
          text: "Se resta la masa del subproducto que se desprende.",
        },
      ],
      visual: { kind: "tool", tool: "grado-polimerizacion", params: { a: 0, b: 5350 } },
    },
    {
      id: "check-peso-molecular",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Monómero", message: "El monómero del polietileno es el etileno, con masa molecular $28$." }],
      title: "Peso molecular del polietileno",
      question: "Calcula la masa molecular media de un polietileno si su grado de polimerización es $5\\,350$ (la masa del monómero etileno es $28$). Solo el número.",
      correctAnswers: ["149800", "149.800", "149 800"],
      explanation: "$M = 5\\,350\\cdot 28 = 149\\,800$.",
    },
  ],
};
