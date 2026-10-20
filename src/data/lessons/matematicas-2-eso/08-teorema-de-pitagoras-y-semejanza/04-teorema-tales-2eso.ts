import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const teoremaTales2esoLesson: InteractiveLesson = {
  slug: "teorema-tales-2eso",
  title: "4. Teorema de Tales",
  subtitle: TEMA_2ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "triangulos-rectangulos",
      type: "slide",
      help: [
        {
          label: "Un ángulo agudo igual",
          message: "Los dos triángulos tienen un ángulo recto. Si además comparten un ángulo agudo, el tercero también coincide (suman $180^\\circ$) y son semejantes.",
        },
        {
          label: "Posición de Tales",
          message: "Se pueden colocar uno dentro del otro compartiendo el ángulo, con los lados opuestos paralelos.",
        },
      ],
      title: "Semejanza de triángulos rectángulos",
      blocks: [
        {
          kind: "rule",
          title: "Criterio",
          text: "Dos triángulos rectángulos que tienen **un ángulo agudo igual** son **semejantes**.",
        },
        {
          kind: "text",
          text: "Entonces sus lados correspondientes son proporcionales, y se puede calcular un lado desconocido con una **proporción**. Es el **Teorema de Tales**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "sombras",
      type: "slide",
      help: [
        {
          label: "Por qué el mismo ángulo",
          message: "Los rayos del sol llegan paralelos: inciden sobre el árbol y la estaca con el mismo ángulo.",
        },
        {
          label: "La proporción",
          message: "Altura entre sombra es lo mismo en los dos triángulos: $\\frac{AB}{3{,}5} = \\frac{1{,}6}{0{,}7}$.",
        },
      ],
      title: "Altura de un árbol con su sombra",
      blocks: [
        {
          kind: "steps",
          items: [
            "Se clava una **estaca** vertical y se miden su altura y las **sombras** de la estaca y del árbol a la vez.",
            "Los dos triángulos son **semejantes**: ángulo recto y mismo ángulo del sol.",
            "Se plantea la **proporción** y se despeja la altura.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{AB}{3{,}5} = \\dfrac{1{,}6}{0{,}7} \\ \\Rightarrow\\  AB = \\dfrac{1{,}6 \\cdot 3{,}5}{0{,}7} = 8\\,\\text{m}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "tales-sombras", params: { a: 1.6, b: 0.7, c: 3.5 } },
    },
    {
      id: "regla",
      type: "slide",
      help: [
        {
          label: "Sin sombra",
          message: "Con una regla vertical alineada con la visual a la casa se forman dos triángulos rectángulos con el mismo ángulo en el ojo.",
        },
        {
          label: "No olvides la mesa",
          message: "La proporción da la altura de la casa **por encima de la mesa**. Hay que sumar la altura de la mesa.",
        },
      ],
      title: "Altura de una casa sin su sombra",
      blocks: [
        {
          kind: "text",
          text: "Desde el borde de una mesa se lanza una visual al punto más alto de la casa y se coloca una regla vertical alineada con esa visual.",
        },
        {
          kind: "facts",
          items: [
            { tex: "a = 50\\,\\text{cm}", label: "del ojo a la regla" },
            { tex: "b = 35\\,\\text{cm}", label: "altura de la regla" },
            { tex: "d = 4{,}5\\,\\text{m}", label: "del ojo a la casa" },
            { tex: "z = 80\\,\\text{cm}", label: "altura de la mesa" },
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{c}{d} = \\dfrac{b}{a} \\ \\Rightarrow\\  c = \\dfrac{35 \\cdot 450}{50} = 315\\,\\text{cm}" },
            { math: "\\text{altura de la casa} = 315 + 80 = 395\\,\\text{cm} = 3{,}95\\,\\text{m}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-edificio",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Altura entre sombra",
          message: "En la persona: $\\frac{1{,}8}{2{,}4} = 0{,}75$. El edificio guarda esa misma razón.",
        },
      ],
      title: "Un edificio",
      question: "A la misma hora, una persona de $1{,}8$ m proyecta una sombra de $2{,}4$ m y un edificio, una sombra de $40$ m. ¿Qué altura tiene el edificio?",
      mode: "choice",
      choices: [
        { id: "30", label: "$30$ m" },
        { id: "53", label: "$53{,}3$ m", incorrectFeedback: "Has dividido entre $0{,}75$: la altura es $0{,}75$ veces la sombra, no al revés." },
        { id: "43", label: "$43{,}4$ m", incorrectFeedback: "Has sumado las longitudes en vez de plantear la proporción." },
        { id: "72", label: "$72$ m", incorrectFeedback: "Has multiplicado $1{,}8 \\cdot 40$ sin dividir entre la sombra de la persona." },
      ],
      correctChoiceId: "30",
      shuffleChoices: true,
      explanation: "$\\frac{h}{40} = \\frac{1{,}8}{2{,}4} \\Rightarrow h = \\frac{1{,}8 \\cdot 40}{2{,}4} = 30$ m.",
    },
    {
      id: "check-arbol",
      type: "fill_in_blank",
      help: [
        {
          label: "Proporción",
          message: "$\\frac{h}{6} = \\frac{2}{1{,}5}$. Despeja $h$.",
        },
      ],
      title: "Un árbol",
      question: "Un poste de $2$ m da una sombra de $1{,}5$ m. Un árbol da, a la vez, una sombra de $6$ m. ¿Cuánto mide el árbol en metros? (solo el número)",
      correctAnswers: ["8"],
      explanation: "$h = \\frac{2 \\cdot 6}{1{,}5} = 8$ m.",
    },
    {
      id: "check-regla",
      type: "fill_in_blank",
      help: [
        {
          label: "Usa $c / d = b / a$",
          message: "Con $b = 20$ cm, $a = 40$ cm, $d = 600$ cm: $c = \\frac{20 \\cdot 600}{40}$.",
        },
      ],
      title: "Con una regla",
      question: "Una regla vertical de $20$ cm está a $40$ cm del ojo y alinea la visual con lo alto de un poste situado a $6$ m. ¿Cuántos cm mide el poste por encima del ojo? (solo el número)",
      correctAnswers: ["300"],
      explanation: "$c = \\frac{b \\cdot d}{a} = \\frac{20 \\cdot 600}{40} = 300$ cm $= 3$ m.",
    },
  ],
};
