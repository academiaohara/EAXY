import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigIndependienteTriangulo4esobLesson: InteractiveLesson = {
  slug: "trig-independiente-triangulo-4esob",
  title: "2. Las razones no dependen del triángulo",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "semejantes",
      type: "slide",
      help: [
        { label: "Semejanza", message: "Dos triángulos rectángulos con el mismo ángulo agudo son semejantes (tienen los tres ángulos iguales): sus lados son proporcionales." },
        { label: "Razón de semejanza", message: "Si el segundo triángulo es el doble de grande, todos sus lados se multiplican por $2$ y al dividir dos lados el $2$ se cancela." },
      ],
      title: "Mismo ángulo, mismas razones",
      blocks: [
        { kind: "rule", text: "Las razones trigonométricas **dependen del ángulo, pero no del tamaño del triángulo** que se use para calcularlas." },
        { kind: "text", text: "Dos triángulos rectángulos con el mismo ángulo agudo son **semejantes**: sus lados son proporcionales y los cocientes entre ellos coinciden." },
      ],
      visual: { kind: "anim", scene: "trig-semejantes" },
    },
    {
      id: "check-por-que",
      type: "predict",
      mode: "choice",
      help: [{ label: "Proporcionales", message: "Si todos los lados se multiplican por el mismo número, al hacer un cociente ese número se simplifica." }],
      title: "¿Por qué coinciden?",
      question: "Dos triángulos rectángulos tienen un ángulo agudo de $34°$. ¿Por qué su $\\operatorname{sen} 34°$ es el mismo?",
      choices: [
        { id: "a", label: "Son semejantes: sus lados son proporcionales y el cociente no cambia" },
        { id: "b", label: "Porque tienen la misma hipotenusa", incorrectFeedback: "Pueden tener hipotenusas muy distintas y aun así dar el mismo seno." },
        { id: "c", label: "Porque son del mismo tamaño", incorrectFeedback: "El tamaño puede ser distinto: precisamente por eso el resultado es útil." },
        { id: "d", label: "Es casualidad", incorrectFeedback: "No es casualidad: es una consecuencia de la semejanza." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Misma forma ($34°$ y $90°$ en los dos) implica lados proporcionales; el cociente entre dos lados de un triángulo es igual en el otro.",
    },
    {
      id: "explora",
      type: "slide",
      help: [{ label: "Fija el ángulo", message: "Deja el ángulo quieto y mueve solo la hipotenusa. Si los números de sen, cos y tg no cambian, estás viendo la propiedad." }],
      title: "Explora: cambia el tamaño, no el ángulo",
      blocks: [{ kind: "text", text: "Cambia la hipotenusa con el ángulo fijo. Los **lados** cambian; las **razones** no." }],
      visual: { kind: "tool", tool: "trig-explorador", params: { a: 34, b: 5 }, hint: "Con 34° la tangente es siempre 0,675 sin importar el tamaño." },
    },
    {
      id: "check-escala",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Despeja", message: "$\\operatorname{sen}\\alpha = \\dfrac{\\text{opuesto}}{\\text{hipotenusa}}$, así que opuesto $= \\operatorname{sen}\\alpha \\cdot$ hipotenusa." }],
      title: "Aplicar la propiedad",
      question: "En un triángulo con hipotenusa $50$ mm el cateto opuesto a $34°$ mide $28$ mm, así que $\\operatorname{sen} 34° = 0{,}56$. Si otro triángulo con el mismo ángulo tiene hipotenusa $200$ mm, ¿cuánto mide su cateto opuesto (en mm)?",
      correctAnswers: ["112"],
      explanation: "Como $\\operatorname{sen} 34° = 0{,}56$ no cambia, el opuesto es $0{,}56 \\cdot 200 = 112$ mm (el triángulo es $4$ veces mayor: $28 \\cdot 4 = 112$).",
    },
    {
      id: "grafico",
      type: "slide",
      help: [{ label: "Aproximado", message: "Medir con regla y transportador introduce errores pequeños: por eso el resultado es aproximado. La calculadora da muchas más cifras." }],
      title: "Cálculo gráfico (aproximado)",
      blocks: [
        { kind: "steps", items: ["Dibuja el ángulo.", "Desde un punto de uno de los lados traza la **perpendicular** al otro lado: queda un triángulo rectángulo.", "**Mide** los tres lados.", "Haz los cocientes: seno, coseno y tangente."] },
        { kind: "warning", text: "Con medidas de regla las razones son **aproximadas**. Más adelante la calculadora te dará valores mucho más precisos." },
      ],
    },
    {
      id: "check-tabla",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Contiguo entre hipotenusa", message: "$\\cos\\alpha = \\dfrac{41}{50}$." }],
      title: "El coseno de la medición",
      question: "Con los lados medidos del triángulo de $34°$ (contiguo $41$ mm, hipotenusa $50$ mm), ¿cuánto vale $\\cos 34°$? (decimal con coma)",
      correctAnswers: ["0,82", "0.82", "41/50"],
      explanation: "$\\cos 34° = \\dfrac{41}{50} = 0{,}82$.",
    },
  ],
};
