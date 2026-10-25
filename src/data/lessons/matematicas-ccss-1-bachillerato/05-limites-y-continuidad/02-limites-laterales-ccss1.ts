import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_5_SUBTITLE } from "@/data/lessons/shared";

export const limitesLateralesCcss1Lesson: InteractiveLesson = {
  slug: "limites-laterales-ccss1",
  title: "2. Límites laterales y existencia del límite",
  subtitle: TEMA_CCSS1_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "laterales",
      type: "slide",
      help: [{ label: "Notación", message: "$a^-$ significa «acercándose a $a$ desde valores menores que $a$» y $a^+$, «desde valores mayores»." }],
      title: "Por la izquierda y por la derecha",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\lim_{x\\to a^-} f(x)", label: "por la izquierda (x < a)" },
          { tex: "\\lim_{x\\to a^+} f(x)", label: "por la derecha (x > a)" },
        ] },
        { kind: "rule", title: "Existencia del límite", formula: "\\lim_{x\\to a} f(x) = L \\iff \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L" },
        { kind: "text", text: "Si los dos laterales **existen y coinciden**, ese valor común es el límite. Si son distintos, **el límite no existe**." },
      ],
      visual: { kind: "tool", tool: "limite-lateral-explorador", initial: [0, 1], hint: "En la función 1 los dos lados llegan al mismo punto: el límite existe. Prueba la función 2: los laterales son distintos." },
    },
    {
      id: "lado-izq",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Por la izquierda de $1$ se usa la rama $x < 1$: $x + 2$." }],
      title: "Límite por la izquierda",
      question: "Sea $f(x) = x + 2$ si $x < 1$ y $f(x) = 3x - 1$ si $x \\geq 1$. ¿Cuánto vale $\\displaystyle\\lim_{x\\to 1^-} f(x)$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "Por la izquierda $x < 1$, así que $f(x) = x + 2$ y el límite es $1 + 2 = 3$.",
    },
    {
      id: "lado-der",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Por la derecha de $1$ se usa la rama $x \\geq 1$: $3x - 1$." }],
      title: "Límite por la derecha",
      question: "Con la misma función, ¿cuánto vale $\\displaystyle\\lim_{x\\to 1^+} f(x)$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Por la derecha $x > 1$, así que $f(x) = 3x - 1$ y el límite es $3\\cdot 1 - 1 = 2$.",
    },
    {
      id: "existe",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Compara los dos laterales: $3$ y $2$." }],
      title: "¿Existe el límite?",
      question: "Con esa función, ¿qué ocurre con $\\displaystyle\\lim_{x\\to 1} f(x)$?",
      choices: [
        { id: "a", label: "No existe, porque los límites laterales son distintos ($3 \\neq 2$)" },
        { id: "b", label: "Vale $3$", incorrectFeedback: "Es solo el límite por la izquierda." },
        { id: "c", label: "Vale $2$", incorrectFeedback: "Es solo el límite por la derecha (y coincide con $f(1)$), pero no basta." },
        { id: "d", label: "Vale $2{,}5$, la media de los dos", incorrectFeedback: "Los límites no se promedian: si los laterales difieren, no hay límite." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Para que haya límite, los dos laterales deben coincidir. Aquí hay un **salto** de $3$ a $2$ en $x = 1$.",
    },
    {
      id: "salto",
      type: "slide",
      help: [{ label: "Valor de la función", message: "El círculo lleno marca $f(a)$. Que $f(a)$ coincida o no con el límite es lo que decide la continuidad." }],
      title: "El límite no mira f(a)",
      blocks: [
        { kind: "text", text: "En la función 4 ocurre algo curioso: $f(2) = 1$, pero los dos laterales valen $4$. El **límite es $4$** aunque la función valga $1$ en ese punto." },
      ],
      visual: { kind: "tool", tool: "limite-lateral-explorador", initial: [3, 2], hint: "Círculo vacío: adonde 'quiere llegar' la gráfica (4). Círculo lleno: el valor real f(2) = 1." },
    },
    {
      id: "check-igual",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Por los dos lados $x \\neq 2$ y la función vale $x^2$." }],
      title: "Límite con valor aparte",
      question: "Sea $f(x) = x^2$ si $x \\neq 2$ y $f(2) = 1$. ¿Cuánto vale $\\displaystyle\\lim_{x\\to 2} f(x)$? (solo el número)",
      correctAnswers: ["4"],
      explanation: "Cerca de $2$ (sin llegar a $2$) $f(x) = x^2 \\to 4$. El valor $f(2) = 1$ no influye en el límite.",
    },
  ],
};
