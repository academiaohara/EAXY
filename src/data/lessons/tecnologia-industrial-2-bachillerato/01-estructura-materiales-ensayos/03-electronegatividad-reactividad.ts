import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const electronegatividadReactividadLesson: InteractiveLesson = {
  slug: "electronegatividad-reactividad",
  title: "3. Estructura electrónica y electronegatividad",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "gases-nobles",
      type: "slide",
      help: [
        {
          label: "¿Por qué son tan estables?",
          message: "Su capa más externa está completa ($s^2p^6$; el helio, $s^2$). Eso los hace casi inertes: apenas reaccionan con otros átomos.",
        },
      ],
      title: "Los gases nobles marcan la meta",
      blocks: [
        {
          kind: "text",
          text: "Las propiedades químicas de un elemento dependen sobre todo de la reactividad de sus **electrones más externos**. Los más estables, y menos reactivos, son los **gases nobles**.",
        },
        {
          kind: "compare",
          left: {
            title: "Electropositivos",
            text: "Metálicos. **Ceden** electrones y forman **cationes** (iones positivos). Número de oxidación positivo. Grupos 1A y 2A.",
            tone: "key",
          },
          right: {
            title: "Electronegativos",
            text: "No metálicos. **Aceptan** electrones y forman **aniones** (iones negativos). Número de oxidación negativo. Grupos 6A y 7A.",
            tone: "info",
          },
        },
        {
          kind: "warning",
          title: "Doble comportamiento",
          text: "Entre los grupos 4A y 7A, el carbono, silicio, germanio, fósforo, arsénico y antimonio pueden comportarse de las dos maneras según la reacción.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "electronegatividad",
      type: "slide",
      help: [
        {
          label: "¿Qué significa 2,0?",
          message: "Es el centro de la escala. Por debajo, los elementos se consideran metálicos; por encima, no metálicos.",
        },
      ],
      title: "Electronegatividad",
      blocks: [
        {
          kind: "definition",
          text: "**Electronegatividad**: la capacidad de un átomo para **atraer electrones hacia sí**. Se mide en una escala de $0$ a $4{,}1$.",
        },
        {
          kind: "text",
          text: "Los menos electronegativos son los metales alcalinos ($0{,}7$ – $1{,}0$). Los más: **F** ($4{,}1$), **O** ($3{,}5$) y **N** ($3{,}1$).",
        },
        {
          kind: "text",
          text: "La diferencia entre dos elementos ayuda a predecir cómo se enlazan. Prueba con distintas parejas.",
        },
      ],
      visual: { kind: "tool", tool: "electronegatividad-explorador" },
    },
    {
      id: "metales-no-metales",
      type: "slide",
      help: [
        {
          label: "¿Y el hidrógeno?",
          message: "Con $2{,}1$ queda justo por encima de $2{,}0$: se comporta como no metal en la mayoría de compuestos, aunque está en el grupo 1A.",
        },
      ],
      title: "Metales frente a no metales",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Metales",
            text: "Tienen **tres o menos** electrones en los niveles externos. Pierden electrones y forman cationes. Baja electronegatividad.",
            tone: "key",
          },
          right: {
            title: "No metales",
            text: "Tienen **cuatro o más** electrones en los niveles externos. Ganan electrones y forman aniones. Alta electronegatividad.",
            tone: "info",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-elementos",
      type: "classify",
      help: [{ label: "Pista", message: "Los metales alcalinos y alcalinotérreos ceden; el flúor, el oxígeno y el cloro aceptan." }],
      title: "Ceder o aceptar",
      question: "¿Cómo se comporta cada elemento en una reacción típica?",
      groups: [
        { id: "cede", label: "Cede electrones (electropositivo)", tone: "cobalt" },
        { id: "gana", label: "Gana electrones (electronegativo)", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Sodio, Na (0,9)", group: "cede" },
        { id: "b", text: "Flúor, F (4,1)", group: "gana" },
        { id: "c", text: "Potasio, K (0,8)", group: "cede" },
        { id: "d", text: "Oxígeno, O (3,5)", group: "gana" },
        { id: "e", text: "Bario, Ba (0,9)", group: "cede" },
        { id: "f", text: "Cloro, Cl (3,0)", group: "gana" },
      ],
      hint: "Menos de 2,0: electropositivo. Más de 2,0: electronegativo.",
      explanation: "Los elementos de baja electronegatividad forman cationes; los de alta, aniones.",
    },
    {
      id: "check-diferencia",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Resta", message: "Electronegatividades: K $0{,}8$ y F $4{,}1$." }],
      title: "Diferencia de electronegatividad",
      question: "¿Cuánto vale la diferencia de electronegatividad entre el potasio ($0{,}8$) y el flúor ($4{,}1$)?",
      correctAnswers: ["3,3", "3.3"],
      explanation: "$\\Delta EN = 4{,}1 - 0{,}8 = 3{,}3$: es enorme. El potasio cede un electrón al flúor y se forma un compuesto iónico (KF).",
    },
    {
      id: "check-extremos",
      type: "predict",
      help: [{ label: "Pista", message: "El flúor tiene la mayor electronegatividad ($4{,}1$); el cesio, la menor ($0{,}7$)." }],
      title: "Los extremos del Sistema Periódico",
      question: "¿Qué elementos son, respectivamente, el más electronegativo y el más electropositivo de la tabla?",
      mode: "choice",
      choices: [
        { id: "fcs", label: "Flúor y cesio" },
        { id: "ofr", label: "Oxígeno y litio", incorrectFeedback: "El oxígeno es muy electronegativo ($3{,}5$) pero no tanto como el flúor; el litio ($1{,}0$) no es el menos electronegativo." },
        { id: "clna", label: "Cloro y sodio", incorrectFeedback: "El cloro ($3{,}0$) y el sodio ($0{,}9$) quedan lejos de los extremos." },
      ],
      correctChoiceId: "fcs",
      shuffleChoices: true,
      explanation: "F ($4{,}1$) es el más electronegativo y Cs ($0{,}7$), el más electropositivo.",
    },
    {
      id: "check-ionico",
      type: "predict",
      help: [{ label: "Pista", message: "Busca metal + no metal: uno cede y otro acepta." }],
      title: "¿Qué grupo de compuestos es iónico?",
      question: "¿Qué grupo de elementos o compuestos presenta enlace iónico?",
      mode: "choice",
      choices: [
        { id: "sales", label: "NaCl, MgS, BaO" },
        { id: "diat", label: "N₂, C–C, F₂", incorrectFeedback: "Son enlaces entre átomos iguales: comparten electrones." },
        { id: "metales", label: "K, Mn, Fe", incorrectFeedback: "Son metales: forman enlace metálico." },
      ],
      correctChoiceId: "sales",
      shuffleChoices: true,
      explanation: "Cada compuesto une un metal electropositivo (Na, Mg, Ba) con un no metal electronegativo (Cl, S, O): hay transferencia de electrones.",
    },
  ],
};
