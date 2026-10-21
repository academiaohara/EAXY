import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const crecimientoExtremos3esoLesson: InteractiveLesson = {
  slug: "crecimiento-extremos-3eso",
  title: "2. Crecimiento, decrecimiento, máximos y mínimos",
  subtitle: TEMA_3ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "crecimiento",
      type: "slide",
      help: [
        {
          label: "De izquierda a derecha",
          message: "Recorre la gráfica en el sentido en que aumenta $x$ y mira si $y$ sube, baja o se queda igual.",
        },
        {
          label: "Un ejemplo",
          message: "Al sumergirte, a más profundidad hay más presión: la función profundidad → presión es creciente.",
        },
      ],
      title: "Creciente, decreciente y constante",
      blocks: [
        {
          kind: "relations",
          items: [
            { left: "x aumenta", relation: "y aumenta →", right: "creciente", tone: "ok" },
            { left: "x aumenta", relation: "y disminuye →", right: "decreciente", tone: "warn" },
            { left: "x aumenta", relation: "y no cambia →", right: "constante", tone: "info" },
          ],
        },
        {
          kind: "text",
          text: "Una función puede ser creciente en un tramo y decreciente en otro: hay que **describir los tramos**.",
        },
      ],
      visual: { kind: "anim", scene: "funcion-tramos-extremos" },
    },
    {
      id: "extremos",
      type: "slide",
      help: [
        {
          label: "Alrededor del punto",
          message: "Un máximo es más alto que los puntos que tiene a su alrededor; un mínimo, más bajo.",
        },
        {
          label: "Cambio de sentido",
          message: "A la izquierda del máximo la función crece y a su derecha decrece; en un mínimo ocurre al revés.",
        },
      ],
      title: "Máximos y mínimos",
      blocks: [
        {
          kind: "compare",
          left: { title: "Máximo", text: "Su ordenada es **mayor** que la de los puntos que lo rodean. Antes crece, después decrece.", tone: "ok" },
          right: { title: "Mínimo", text: "Su ordenada es **menor** que la de los puntos que lo rodean. Antes decrece, después crece.", tone: "info" },
        },
        {
          kind: "example",
          title: "Precio del cordero a lo largo de un año",
          lines: [
            { math: "\\text{máximo: } 25\\ \\text{€/kg a mediados de diciembre}" },
            { math: "\\text{mínimo: } 16\\ \\text{€/kg a finales de enero}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-tramo",
      type: "predict",
      help: [
        {
          label: "Presión y altura",
          message: "Al subir en altura la presión atmosférica baja.",
        },
      ],
      title: "Tipo de función",
      question: "La presión atmosférica disminuye al aumentar la altura sobre el nivel del mar. ¿Cómo es la función altura → presión?",
      mode: "choice",
      choices: [
        { id: "dec", label: "Decreciente" },
        { id: "cre", label: "Creciente", incorrectFeedback: "A más altura, menos presión: la $y$ disminuye al aumentar la $x$." },
        { id: "con", label: "Constante", incorrectFeedback: "La presión cambia con la altura." },
      ],
      correctChoiceId: "dec",
      shuffleChoices: true,
      explanation: "Al aumentar la altura ($x$), disminuye la presión ($y$): es decreciente.",
    },
    {
      id: "check-maximo",
      type: "predict",
      help: [
        {
          label: "Compara con los vecinos",
          message: "Un máximo debe ser mayor que los valores inmediatamente anteriores y posteriores.",
        },
      ],
      title: "Máximo",
      question: "Una función crece hasta $x = 3$, donde vale $8$, y después decrece. ¿Qué tiene en $x = 3$?",
      mode: "choice",
      choices: [
        { id: "max", label: "Un máximo, de valor $8$" },
        { id: "min", label: "Un mínimo", incorrectFeedback: "En un mínimo primero decrece y luego crece: aquí es al revés." },
        { id: "nada", label: "Ni máximo ni mínimo", incorrectFeedback: "Cambia de creciente a decreciente: es un máximo." },
      ],
      correctChoiceId: "max",
      shuffleChoices: true,
      explanation: "Pasa de creciente a decreciente: el punto $(3, 8)$ es un máximo.",
    },
    {
      id: "check-describir",
      type: "predict",
      help: [
        {
          label: "Sentido de los cambios",
          message: "Va creciendo, llega a un máximo, decrece hasta un mínimo y vuelve a crecer.",
        },
      ],
      title: "Describir una gráfica",
      question: "Una función es creciente de $0$ a $2$, decreciente de $2$ a $5$ y creciente de $5$ a $8$. ¿Cuántos extremos relativos (máximos y mínimos) tiene?",
      mode: "choice",
      choices: [
        { id: "dos", label: "Dos: un máximo en $x = 2$ y un mínimo en $x = 5$" },
        { id: "uno", label: "Uno", incorrectFeedback: "Cambia dos veces de sentido: en $x = 2$ y en $x = 5$." },
        { id: "tres", label: "Tres", incorrectFeedback: "Los extremos están donde cambia el sentido: solo en $x = 2$ y en $x = 5$." },
      ],
      correctChoiceId: "dos",
      shuffleChoices: true,
      explanation: "En $x = 2$ pasa de crecer a decrecer (máximo) y en $x = 5$ de decrecer a crecer (mínimo).",
    },
  ],
};
