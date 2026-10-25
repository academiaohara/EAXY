import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const derivabilidad1bachLesson: InteractiveLesson = {
  slug: "derivabilidad-1bach",
  title: "4. Derivadas laterales y derivabilidad",
  subtitle: TEMA_1BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "laterales",
      type: "slide",
      help: [{ label: "Como los límites", message: "La derivada es un límite, así que existe cuando **existen y coinciden** los dos límites laterales del cociente incremental." }],
      title: "Derivada por la derecha y por la izquierda",
      blocks: [
        { kind: "facts", items: [
          { tex: "f'(a^+) = \\lim_{x\\to a^+}\\dfrac{f(x) - f(a)}{x - a}", label: "derivada por la derecha (x > a)" },
          { tex: "f'(a^-) = \\lim_{x\\to a^-}\\dfrac{f(x) - f(a)}{x - a}", label: "derivada por la izquierda (x < a)" },
        ] },
        { kind: "rule", title: "f es derivable en a si…", text: "existen $f'(a^-)$ y $f'(a^+)$, son **finitas** e **iguales**. Su valor común es $f'(a)$." },
      ],
      visual: { kind: "tool", tool: "derivabilidad-explorador", initial: [0, 3], hint: "En |x| las secantes de la izquierda (verde) tienen pendiente −1 y las de la derecha (rojo), +1: no tienden a la misma recta." },
    },
    {
      id: "casos",
      type: "slide",
      help: [{ label: "Tres fallos", message: "Una función continua puede dejar de ser derivable en una **esquina** o en un punto de **tangente vertical**. Si ni siquiera es continua, tampoco es derivable." }],
      title: "Cuándo falla la derivabilidad",
      blocks: [
        { kind: "text", text: "Recorre los seis casos: hay un **empalme suave** (derivable), una **esquina**, un **salto**, una **tangente vertical** y dos funciones derivables en el origen." },
      ],
      visual: { kind: "tool", tool: "derivabilidad-explorador", initial: [2, 3], hint: "Esquina en 1: la rama izquierda llega con pendiente 2 y la derecha sale con pendiente 3." },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Mira el punto indicado: ¿tienen las secantes de ambos lados la misma pendiente límite finita?" }],
      title: "¿Derivable o no?",
      question: "Clasifica cada función en el punto indicado.",
      groups: [
        { id: "si", label: "Derivable", tone: "emerald" },
        { id: "no", label: "No derivable", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$|x|$ en $x = 0$", group: "no" },
        { id: "b", text: "$x^2$ en $x = 0$", group: "si" },
        { id: "c", text: "$\\sqrt[3]{x}$ en $x = 0$ (tangente vertical)", group: "no" },
        { id: "d", text: "$x\\,|x|$ en $x = 0$", group: "si" },
        { id: "e", text: "$3x - 4$ en cualquier punto", group: "si" },
        { id: "f", text: "Función con un salto en $x = 1$", group: "no" },
      ],
      hint: "|x| tiene una esquina; ∛x tiene tangente vertical (pendiente infinita); un salto rompe la continuidad.",
    },
    {
      id: "check-continua",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Una función con un salto no puede tener tangente en ese punto." }],
      title: "Derivable y continua",
      question: "¿Qué relación hay entre derivabilidad y continuidad en un punto?",
      choices: [
        { id: "a", label: "Si es derivable, es continua; pero puede ser continua sin ser derivable" },
        { id: "b", label: "Si es continua, es derivable", incorrectFeedback: "$|x|$ es continua en $0$ y no es derivable allí." },
        { id: "c", label: "Son equivalentes", incorrectFeedback: "Solo se cumple una implicación: derivable ⇒ continua." },
        { id: "d", label: "No tienen relación", incorrectFeedback: "Derivable ⇒ continua siempre." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Derivable ⇒ continua. El recíproco es falso: $|x|$ en $0$ es continua pero tiene una esquina.",
    },
    {
      id: "check-der-der",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Por la derecha de $1$ la función es $3x - 2$, una recta de pendiente $3$." }],
      title: "Una derivada lateral",
      question: "Sea $f(x) = x^2$ si $x < 1$ y $f(x) = 3x - 2$ si $x \\geq 1$. ¿Cuánto vale $f'(1^+)$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "A la derecha, $\\dfrac{3x - 2 - 1}{x - 1} = 3$. Por la izquierda sale $f'(1^-) = 2$: son distintas, así que $f$ **no** es derivable en $1$ (aunque sí continua).",
    },
    {
      id: "check-abs",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Para $x > 0$, $|x| = x$ y $\\frac{|x| - 0}{x - 0} = 1$." }],
      title: "|x| por la derecha",
      question: "¿Cuánto vale la derivada por la derecha de $f(x) = |x|$ en $x = 0$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "Por la derecha $|x| = x$ y el cociente vale $1$. Por la izquierda vale $-1$.",
    },
  ],
};
