import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_7_SUBTITLE } from "@/data/lessons/shared";

export const ideaLimiteFuncion1bachLesson: InteractiveLesson = {
  slug: "idea-limite-funcion-1bach",
  title: "1. Idea de límite de una función",
  subtitle: TEMA_1BACH_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [{ label: "Lugar al que se dirige", message: "El límite no es lo que vale la función **en** el punto, sino el valor **hacia el que se dirige** cuando $x$ se acerca a él." }],
      title: "Acercarse sin llegar",
      blocks: [
        { kind: "definition", text: "El **límite de $f$ cuando $x$ tiende a $a$** es el valor $L$ hacia el que se dirige $f(x)$ cuando $x$ se acerca a $a$, tanto como queramos, por los dos lados. Se escribe $\\displaystyle\\lim_{x\\to a} f(x) = L$." },
        { kind: "text", text: "Para hallar el límite **no importa lo que valga $f(a)$**: ni siquiera hace falta que $f$ esté definida en $a$." },
      ],
      visual: { kind: "anim", scene: "limite-aproximacion" },
    },
    {
      id: "tabla",
      type: "slide",
      help: [{ label: "Tabla de valores", message: "Se toman valores de $x$ cada vez más cerca de $a$ (por la izquierda o por la derecha) y se mira a qué se acercan los de $f(x)$." }],
      title: "Estimar un límite con una tabla",
      blocks: [
        { kind: "text", text: "Una tabla de valores permite **estimar** el límite: nos acercamos a $a$ por un lado y miramos hacia dónde van los valores de $f$." },
        { kind: "example", title: "x² − 3 cuando x → 2", lines: [
          { math: "f(2{,}1) = 1{,}41\\quad f(2{,}01) = 1{,}0401\\quad f(2{,}001) \\approx 1{,}004" },
          { math: "f(1{,}9) = 0{,}61\\quad f(1{,}99) = 0{,}9601\\quad f(1{,}999) \\approx 0{,}996" },
          { math: "\\lim_{x\\to 2}(x^2 - 3) = 1" },
        ] },
      ],
      visual: { kind: "tool", tool: "limite-tabla-explorador", initial: [0, 1, 2], hint: "Cambia de función y de lado, y sube los pasos: los valores de f(x) se acercan al mismo número aunque f(a) no exista." },
    },
    {
      id: "check-valor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Como $x^2 - 3$ es continua, los valores se acercan a $2^2 - 3$." }],
      title: "Estimar un límite",
      question: "Según la tabla, ¿cuánto vale $\\displaystyle\\lim_{x\\to 2}(x^2 - 3)$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "Los valores $1{,}41;\\ 1{,}0401;\\ 1{,}004\\dots$ (por la derecha) y $0{,}61;\\ 0{,}9601;\\ 0{,}996\\dots$ (por la izquierda) se acercan a $1$.",
    },
    {
      id: "check-no-definida",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En la animación, la función $\\frac{x^2-1}{x-1}$ no existía en $x = 1$ y aun así los valores se acercaban a $2$." }],
      title: "¿Hace falta que f(a) exista?",
      question: "Para que exista $\\displaystyle\\lim_{x\\to a} f(x)$, ¿es necesario que $f$ esté definida en $x = a$?",
      choices: [
        { id: "a", label: "No: el límite solo depende de los valores cerca de $a$" },
        { id: "b", label: "Sí: si $f(a)$ no existe, tampoco existe el límite", incorrectFeedback: "$\\frac{x^2-1}{x-1}$ no existe en $1$ y su límite en $1$ vale $2$." },
        { id: "c", label: "Sí, y además debe ser $f(a) = L$", incorrectFeedback: "Eso es la condición de **continuidad**, que veremos más adelante, no la de límite." },
        { id: "d", label: "Solo si $a$ es positivo", incorrectFeedback: "El signo de $a$ no influye." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El límite mira **alrededor** de $a$, no en $a$. Que coincida con $f(a)$ es otra cuestión (continuidad).",
    },
    {
      id: "check-estimar",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Usa la herramienta con la cuarta función y acércate a $0$: los valores se pegan a un decimal sencillo." }],
      title: "Un límite sin imagen",
      question: "Estima $\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sqrt{x + 1} - 1}{x}$. Esa función no existe en $x = 0$. (decimal)",
      correctAnswers: ["0,5", "0.5", "1/2"],
      explanation: "Para $x = 0{,}001$ sale $0{,}49988\\dots$ y para $x = -0{,}001$, $0{,}50012\\dots$: el límite es $0{,}5$.",
    },
    {
      id: "epsilon",
      type: "slide",
      help: [{ label: "Para qué sirve", message: "La definición formal permite **demostrar** que un límite vale $L$. En este curso lo importante es entender la idea: se puede acercar $f(x)$ a $L$ tanto como se quiera acercando $x$ a $a$." }],
      title: "La definición rigurosa (ε y δ)",
      blocks: [
        { kind: "rule", title: "Definición", formula: "\\lim_{x\\to a} f(x) = L \\iff \\forall \\varepsilon > 0\\ \\exists \\delta > 0:\\ 0 < |x - a| < \\delta \\Rightarrow |f(x) - L| < \\varepsilon" },
        { kind: "example", title: "lím (2x + 3) = 5 cuando x → 1", lines: [
          { math: "|(2x + 3) - 5| = |2x - 2| = 2\\,|x - 1| < \\varepsilon" },
          { math: "\\Longleftrightarrow\\ |x - 1| < \\dfrac{\\varepsilon}{2}\\ \\Rightarrow\\ \\text{basta tomar } \\delta = \\dfrac{\\varepsilon}{2}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-delta",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Para este límite basta $\\delta = \\varepsilon/2$." }],
      title: "Elegir δ",
      question: "Con $\\displaystyle\\lim_{x\\to 1}(2x + 3) = 5$ y $\\varepsilon = 0{,}1$, ¿qué valor de $\\delta = \\varepsilon/2$ sirve? (decimal)",
      correctAnswers: ["0,05", "0.05"],
      explanation: "$\\delta = \\frac{0{,}1}{2} = 0{,}05$: si $x$ dista de $1$ menos de $0{,}05$, entonces $f(x)$ dista de $5$ menos de $0{,}1$.",
    },
  ],
};
