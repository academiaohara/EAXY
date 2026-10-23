import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const diagramaTraccionLesson: InteractiveLesson = {
  slug: "diagrama-traccion",
  title: "11. El diagrama de tracción",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "de-f-a-sigma",
      type: "slide",
      help: [
        {
          label: "¿Por qué cambiar de escala?",
          message: "La gráfica $F$–$\\Delta l$ depende del tamaño de la probeta. Dividiendo por $A_0$ y por $l_0$ se obtiene una curva del **material**, válida para cualquier probeta.",
        },
      ],
      title: "De la gráfica F–Δl al diagrama σ–ε",
      blocks: [
        {
          kind: "text",
          text: "La máquina de tracción dibuja la **fuerza** $F$ frente al **alargamiento** $\\Delta l$. Esa gráfica sirve, pero solo para esa probeta. Para describir el **material** se cambia de escala:",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\varepsilon = \\dfrac{\\Delta l}{l_0}", label: "eje de abscisas" },
            { tex: "\\sigma = \\dfrac{F}{A_0}", label: "eje de ordenadas" },
          ],
        },
        {
          kind: "text",
          text: "Cada material tiene su curva característica. En todas hay una primera zona donde la deformación es **proporcional** a la tensión y otra donde, con pequeñas variaciones de tensión, se producen **grandes deformaciones**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "zonas",
      type: "slide",
      help: [
        {
          label: "¿Por qué P y E son difíciles de localizar?",
          message: "La transición de la recta a la curva es gradual: no hay un punto nítido. En cambio, F (fluencia) y R (máximo) se ven con claridad en la máquina.",
        },
      ],
      title: "Las zonas del diagrama",
      blocks: [
        {
          kind: "steps",
          items: [
            "**OP, zona de proporcionalidad**: es una recta, $\\sigma = \\text{cte}\\cdot\\varepsilon$. Es donde deben trabajar los materiales.",
            "**PE, zona no proporcional**: sigue siendo elástica, pero ya no lineal.",
            "**Punto E, límite elástico**: la máxima tensión sin deformación permanente.",
            "**Fluencia (F)**, solo en algunos aceros: se alarga mucho sin que suba la tensión.",
            "**Punto R, tensión de rotura**: el máximo del diagrama. Después hay estricción.",
            "**Punto S**: rotura física.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "diagrama-traccion", beatMs: 5600 },
    },
    {
      id: "explora-materiales",
      type: "slide",
      help: [
        {
          label: "¿Qué hace el botón «Soltar»?",
          message: "Descarga la probeta siguiendo una recta paralela a la de proporcionalidad. Si estás en zona elástica, la recta termina en el origen; si no, queda un alargamiento permanente.",
        },
      ],
      title: "Compara materiales y descarga la probeta",
      blocks: [
        {
          kind: "text",
          text: "Elige un material, estira la probeta y pulsa **Soltar**. Si has pasado el límite elástico, no vuelve al origen: eso es la **deformación plástica**.",
        },
      ],
      visual: { kind: "tool", tool: "diagrama-traccion-explorador", params: { a: 0 } },
      arrange: "visual-top",
    },
    {
      id: "clasifica-zonas",
      type: "classify",
      help: [{ label: "Pista", message: "Elástica: recupera la longitud al soltar. Plástica: ya queda alargada." }],
      title: "¿Elástica o plástica?",
      question: "Sitúa cada descripción en su zona del diagrama.",
      groups: [
        { id: "elastica", label: "Zona elástica (OE)", tone: "emerald" },
        { id: "plastica", label: "Zona plástica (ES)", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Al cesar la tensión, el material recupera su longitud inicial", group: "elastica" },
        { id: "b", text: "Zona de proporcionalidad OP", group: "elastica" },
        { id: "c", text: "Zona PE: elástica pero no lineal", group: "elastica" },
        { id: "d", text: "La longitud final es algo mayor que l₀ aunque se quite la carga", group: "plastica" },
        { id: "e", text: "La fluencia del acero", group: "plastica" },
        { id: "f", text: "Los alrededores del punto R", group: "plastica" },
      ],
      hint: "El límite elástico E es la frontera entre las dos zonas.",
      explanation: "OE es elástica (con OP proporcional y PE no lineal). A partir de E hay deformaciones permanentes.",
    },
    {
      id: "check-hooke-zona",
      type: "predict",
      help: [{ label: "Pista", message: "Solo en la parte recta del diagrama." }],
      title: "¿Dónde vale la ley de Hooke?",
      question: "En el diagrama de un acero, ¿en qué zona se cumple la ley de Hooke?",
      mode: "choice",
      choices: [
        { id: "op", label: "En la zona de proporcionalidad, OP" },
        { id: "fr", label: "En el tramo FR, hasta el máximo", incorrectFeedback: "Ahí ya hay deformación plástica y la relación no es lineal." },
        { id: "rs", label: "Después de la rotura, en RS", incorrectFeedback: "En RS el material se sigue alargando aunque la tensión baje: no hay proporcionalidad." },
      ],
      correctChoiceId: "op",
      shuffleChoices: true,
      explanation: "La ley de Hooke ($\\sigma = E\\,\\varepsilon$) solo se cumple en la recta OP.",
    },
    {
      id: "check-r",
      type: "predict",
      help: [{ label: "Pista", message: "Es el máximo del diagrama." }],
      title: "El punto R",
      question: "El punto R del diagrama de tracción marca:",
      mode: "choice",
      choices: [
        { id: "rotura", label: "La tensión de rotura: la máxima que se alcanza en el ensayo" },
        { id: "elastico", label: "El límite elástico", incorrectFeedback: "El límite elástico es el punto E, mucho antes del máximo." },
        { id: "fluencia", label: "El inicio de la fluencia", incorrectFeedback: "La fluencia empieza en el punto F, antes de llegar a R." },
      ],
      correctChoiceId: "rotura",
      shuffleChoices: true,
      explanation: "$\\sigma_R$ es el máximo de tensión del diagrama. A partir de ahí el material se considera roto, aunque la fractura visible ocurra en S.",
    },
    {
      id: "check-fluencia",
      type: "predict",
      help: [{ label: "Pista", message: "Mira el tramo horizontal con onditas de la figura del acero." }],
      title: "Fluencia",
      question: "La fluencia de un acero consiste en:",
      mode: "choice",
      choices: [
        { id: "alarga", label: "Un alargamiento muy rápido sin que varíe la tensión aplicada" },
        { id: "sube", label: "Un aumento rápido de la tensión sin alargamiento", incorrectFeedback: "Es al revés: se alarga sin que aumente la tensión." },
        { id: "recupera", label: "La recuperación de la longitud inicial al soltar", incorrectFeedback: "Eso es comportamiento elástico." },
      ],
      correctChoiceId: "alarga",
      shuffleChoices: true,
      explanation: "El material «fluye» sin causa aparente: el alargamiento crece a tensión casi constante, en el límite de fluencia.",
    },
    {
      id: "check-ductil",
      type: "predict",
      help: [{ label: "Pista", message: "Compara hasta dónde llega cada curva en el eje horizontal." }],
      title: "¿Cuál se deforma más antes de romper?",
      question: "De estos tres materiales, ¿cuál soporta más deformación plástica antes de romper?",
      mode: "choice",
      choices: [
        { id: "acero", label: "El acero con fluencia" },
        { id: "fundido", label: "El hierro fundido", incorrectFeedback: "Es frágil: rompe con poca deformación." },
        { id: "templado", label: "El acero templado", incorrectFeedback: "Es muy resistente pero casi no se deforma plásticamente." },
      ],
      correctChoiceId: "acero",
      shuffleChoices: true,
      explanation: "El acero dulce es dúctil: su curva se extiende mucho. El fundido y el templado son frágiles.",
    },
  ],
};
