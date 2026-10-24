import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const progresionesAritmeticas1bachLesson: InteractiveLesson = {
  slug: "progresiones-aritmeticas-1bach",
  title: "2. Progresiones aritméticas",
  subtitle: TEMA_1BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Por qué n − 1", message: "Para llegar de $a_1$ a $a_n$ se dan $n - 1$ pasos de tamaño $d$: el primer término ya está, no se suma." }],
      title: "Sumar siempre lo mismo",
      blocks: [
        { kind: "definition", text: "Una **progresión aritmética** es una sucesión en la que la **diferencia** entre dos términos consecutivos es constante: $a_{n+1} = a_n + d$." },
        { kind: "rule", title: "Término general", formula: "a_n = a_1 + (n - 1)\\,d" },
        { kind: "example", lines: [
          { math: "a_1 = 3,\\ d = 2:\\quad a_{25} = 3 + 24\\cdot 2 = 51" },
        ] },
      ],
      visual: { kind: "anim", scene: "progresion-pasos", params: { a: 3, b: 2, c: 5, d: 25, prog: "aritmetica" } },
    },
    {
      id: "check-termino",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$a_5 = a_1 + 4d$." }],
      title: "Un término",
      question: "En una progresión aritmética con $a_1 = 7$ y $d = 3$, ¿cuánto vale $a_5$? (solo el número)",
      correctAnswers: ["19"],
      explanation: "$a_5 = 7 + (5 - 1)\\cdot 3 = 7 + 12 = 19$.",
    },
    {
      id: "suma",
      type: "slide",
      help: [{ label: "La anécdota", message: "Cuentan que al pequeño Gauss le pidieron sumar los números de $1$ a $100$: agrupó $1 + 100$, $2 + 99$, … y obtuvo $50$ parejas de $101$, es decir, $5050$." }],
      title: "La suma de los n primeros términos",
      blocks: [
        { kind: "rule", title: "Suma de n términos", formula: "S_n = \\dfrac{n\\,(a_1 + a_n)}{2}" },
        { kind: "text", text: "Al escribir la suma al derecho y al revés, **cada columna suma lo mismo** ($a_1 + a_n$) y hay $n$ columnas; la suma buscada es la mitad." },
        { kind: "example", lines: [
          { math: "a_1 = 7,\\ a_5 = 19:\\quad S_5 = \\dfrac{5\\,(7 + 19)}{2} = 65" },
        ] },
      ],
      visual: { kind: "anim", scene: "suma-gauss", params: { a: 10 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [{ label: "Qué mirar", message: "Con $d > 0$ los términos crecen, con $d < 0$ decrecen, con $d = 0$ son todos iguales. La suma crece con $n$ (o decrece si los términos son negativos)." }],
      title: "Prueba con tus valores",
      blocks: [{ kind: "text", text: "Elige $a_1$, $d$ y $n$. Comprueba que $S_n$ coincide con la fórmula y que el término $n$-ésimo con el general." }],
      visual: { kind: "tool", tool: "progresion-explorador", initial: [0, 7, 3, 5], hint: "Con a₁ = 7, d = 3 y n = 5 salen a₅ = 19 y S₅ = 65. Cambia d a negativo." },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Primero $a_{10} = 4 + 9\\cdot 2 = 22$. Después $S_{10} = \\frac{10\\,(4 + 22)}{2}$." }],
      title: "Una suma",
      question: "Calcula la suma de los $10$ primeros términos de la progresión aritmética con $a_1 = 4$ y $d = 2$. (solo el número)",
      correctAnswers: ["130"],
      explanation: "$a_{10} = 4 + 18 = 22$ y $S_{10} = \\frac{10\\cdot(4 + 22)}{2} = 130$.",
    },
    {
      id: "check-cuantos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Despeja $n$ en $a_n = a_1 + (n-1)d$: $50 = 2 + (n-1)\\cdot 3$." }],
      title: "¿Cuántos términos hay?",
      question: "La progresión $2, 5, 8, 11, \\ldots$ llega hasta $50$. ¿Cuántos términos tiene? (solo el número)",
      correctAnswers: ["17"],
      explanation: "$50 = 2 + (n - 1)\\cdot 3 \\Rightarrow n - 1 = 16 \\Rightarrow n = 17$.",
    },
    {
      id: "check-reconocer",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Calcula las diferencias entre términos consecutivos: deben ser todas iguales." }],
      title: "¿Es aritmética?",
      question: "¿Cuál de estas sucesiones es una progresión aritmética?",
      choices: [
        { id: "a", label: "$20, 17, 14, 11, \\ldots$" },
        { id: "b", label: "$1, 2, 4, 8, \\ldots$", incorrectFeedback: "Las diferencias son $1, 2, 4$: no son constantes (es una geométrica)." },
        { id: "c", label: "$1, 4, 9, 16, \\ldots$", incorrectFeedback: "Las diferencias son $3, 5, 7$: no son constantes." },
        { id: "d", label: "$2, 3, 5, 8, \\ldots$", incorrectFeedback: "Las diferencias son $1, 2, 3$: no son constantes." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$20, 17, 14, 11$: la diferencia es siempre $-3$, así que es aritmética con $d = -3$.",
    },
  ],
};
