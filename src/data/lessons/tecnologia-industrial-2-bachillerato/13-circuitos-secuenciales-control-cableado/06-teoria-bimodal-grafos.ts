import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_13_SUBTITLE } from "@/data/lessons/shared";

export const teoriaBimodalGrafosLesson: InteractiveLesson = {
  slug: "teoria-bimodal-grafos",
  title: "6. Teoría bimodal: grafos y ecuaciones",
  subtitle: TEMA_TI2_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Realimentar", message: "Realimentar es hacer que el propio elemento se mantenga conectado a través de un contacto suyo, aunque desaparezca la orden de marcha." }],
      title: "El método: grafo, ecuación y esquema",
      blocks: [
        { kind: "text", text: "En los circuitos secuenciales intervienen **órdenes de puesta en marcha y de parada**. Con ellas se conectan y desconectan relés y contactores que, a su vez, conectarán cargas de mayor consumo: motores, hornos, sistemas de alumbrado…" },
        { kind: "text", text: "La salida (aquí el relé) forma parte de las variables de entrada: eléctricamente se dice que el circuito **tiene función memoria**. Para diseñarlos con la teoría bimodal:" },
        { kind: "steps", items: [
          "Dibujar un **grafo** por cada elemento, con sus condiciones de funcionamiento.",
          "Obtener la **ecuación de salida**.",
          "Dibujar el **esquema eléctrico**.",
        ] },
        { kind: "steps", title: "Dos preguntas por elemento", items: [
          "¿Qué elementos dan la orden de **marcha**?",
          "¿Qué elementos dan la orden de **paro**?",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "grafo",
      type: "slide",
      help: [{ label: "Pulsadores", message: "Las órdenes de marcha se dan con pulsadores normalmente abiertos y las de paro con pulsadores normalmente cerrados." }],
      title: "Del grafo a la ecuación",
      blocks: [
        { kind: "rule", title: "Regla general", text: "Un elemento se conecta cuando se cumple a la vez que **no hay orden de paro** y que **hay orden de marcha o realimentación**:", formula: "\\text{elemento} = (\\text{condiciones de paro})\\cdot\\left[(\\text{condiciones de marcha}) + \\text{realimentación}\\right]" },
        { kind: "example", title: "Ejemplo 1: alumbrado con un relé", lines: [
          { math: "KM_1 = \\overline{SB_2}\\cdot(SB_1 + KM_1)", note: "marcha: $SB_1$ (NA); paro: $SB_2$ (NC); realimentado" },
        ] },
        { kind: "text", text: "En el grafo, una flecha que **entra** en el círculo es una condición de marcha; la que sale y vuelve es la de paro; un círculo doble indica que el elemento **está realimentado**. Eléctricamente: el paro va en **serie**, la marcha y la realimentación, en **paralelo**." },
      ],
      visual: { kind: "anim", scene: "grafo-bimodal", beatMs: 6200 },
    },
    {
      id: "check-ecuacion",
      type: "predict",
      help: [{ label: "Pista", message: "El pulsador de paro es NC: conduce cuando no se pulsa, así que aparece negado." }],
      title: "Escribe la ecuación",
      question: "Un relé $KA_1$ se conecta con un pulsador de marcha NA ($SB_1$), se mantiene conectado por sí mismo y se desconecta con un pulsador de paro NC ($SB_2$). ¿Cuál es su ecuación?",
      mode: "choice",
      choices: [
        { id: "ok", label: "$KA_1 = \\overline{SB_2}\\cdot(SB_1 + KA_1)$" },
        { id: "sinr", label: "$KA_1 = \\overline{SB_2}\\cdot SB_1$", incorrectFeedback: "Falta la realimentación: sin ella el relé caería al soltar $SB_1$." },
        { id: "suma", label: "$KA_1 = SB_2 + SB_1\\cdot KA_1$", incorrectFeedback: "El paro debe multiplicar a todo (en serie) y estar negado por ser NC." },
        { id: "inv", label: "$KA_1 = SB_2\\cdot(SB_1 + KA_1)$", incorrectFeedback: "$SB_2$ es NC: conduce cuando no se pulsa, luego debe aparecer negado." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Elemento = paro·(marcha + realimentación). El paro es NC, de ahí la negación; la realimentación es el propio contacto del relé.",
    },
    {
      id: "y-o",
      type: "slide",
      help: [{ label: "Morgan", message: "Las reglas del paro son las de la marcha invertidas porque el paro actúa por negación: ¬(a·b) = ā + b̄ y ¬(a+b) = ā·b̄." }],
      title: "Condiciones «y» y «o»",
      blocks: [
        { kind: "compare", left: { title: "Condición «y»", text: "A la **marcha**: producto lógico, contactos en **serie**. Al **paro**: suma lógica, contactos en **paralelo**.", math: ["\\overline{SB_3\\cdot SB_4} = \\overline{SB_3} + \\overline{SB_4}"], tone: "info" }, right: { title: "Condición «o»", text: "A la **marcha**: suma lógica, contactos en **paralelo**. Al **paro**: producto lógico, contactos en **serie**.", math: ["\\overline{SB_3 + SB_4} = \\overline{SB_3}\\cdot\\overline{SB_4}"], tone: "key" } },
        { kind: "example", title: "Ejemplo 2: marcha con SB₁ «y» SB₂; paro con SB₃ «y» SB₄", lines: [
          { math: "KA_2 = (\\overline{SB_3} + \\overline{SB_4})\\cdot\\left[(SB_1\\cdot SB_2) + KA_2\\right]" },
        ] },
        { kind: "example", title: "Ejemplo 3: marcha con SB₁ «o» SB₂; paro con SB₃ «o» SB₄", lines: [
          { math: "KA_3 = (\\overline{SB_3}\\cdot\\overline{SB_4})\\cdot\\left[(SB_1 + SB_2) + KA_3\\right]" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "explora-bimodal",
      type: "slide",
      help: [{ label: "Explorador", message: "En el ejemplo 2, el relé solo cae si pulsas SB₃ y SB₄ a la vez." }],
      title: "Pulsa y comprueba la ecuación",
      blocks: [{ kind: "text", text: "Cambia de ejemplo y manipula los pulsadores. Observa cuándo se **conecta**, cuándo **se mantiene** y cuándo **cae** el relé." }],
      visual: { kind: "tool", tool: "grafo-bimodal-explorador" },
    },
    {
      id: "clasifica-yo",
      type: "classify",
      help: [{ label: "Pista", message: "Marcha: «y» = serie, «o» = paralelo. Paro: al revés." }],
      title: "Serie o paralelo",
      question: "¿Cómo se conectan los contactos en cada caso?",
      groups: [
        { id: "serie", label: "En serie", tone: "cobalt" },
        { id: "paralelo", label: "En paralelo", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Marcha con condición «y»", group: "serie" },
        { id: "b", text: "Paro con condición «o»", group: "serie" },
        { id: "c", text: "El paro respecto al resto del circuito", group: "serie" },
        { id: "d", text: "Marcha con condición «o»", group: "paralelo" },
        { id: "e", text: "Paro con condición «y»", group: "paralelo" },
        { id: "f", text: "Marcha frente a la realimentación", group: "paralelo" },
      ],
      hint: "El paro se comporta al revés que la marcha.",
      explanation: "La marcha «y» es producto (serie) y «o» es suma (paralelo). Con el paro, por las leyes de Morgan, es al revés. Además el paro va en serie con todo lo demás y la realimentación, en paralelo con la marcha.",
    },
    {
      id: "check-o",
      type: "predict",
      help: [{ label: "Pista", message: "«o» a la marcha = paralelo; «o» al paro = serie de NC." }],
      title: "Ejemplo 3",
      question: "En el ejemplo 3, $KA_3 = (\\overline{SB_3}\\cdot\\overline{SB_4})\\cdot[(SB_1 + SB_2) + KA_3]$. ¿Qué pulsador o pulsadores desconectan el relé?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Cualquiera de los dos, SB₃ o SB₄" },
        { id: "ambos", label: "Solo si se pulsan SB₃ y SB₄ a la vez", incorrectFeedback: "Eso ocurre en el ejemplo 2 (condición «y» al paro). Aquí los NC están en serie: basta que uno se abra." },
        { id: "sb1", label: "SB₁ o SB₂", incorrectFeedback: "Esos son de marcha." },
        { id: "ninguno", label: "Ninguno: está realimentado", incorrectFeedback: "La realimentación solo ayuda a mantener el relé; el paro está en serie con ella y lo corta." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Los dos NC están en serie con todo el conjunto: al pulsar cualquiera se abre el circuito y el relé cae.",
    },
  ],
};
