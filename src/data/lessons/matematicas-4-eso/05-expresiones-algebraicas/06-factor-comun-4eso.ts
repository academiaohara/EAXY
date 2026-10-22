import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const factorComun4esoLesson: InteractiveLesson = {
  slug: "factor-comun-4eso",
  title: "6. Sacar factor común",
  subtitle: TEMA_4ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [
        {
          label: "Lo contrario de repartir",
          message: "Multiplicar un monomio por un polinomio **reparte** el monomio entre todos los términos. Sacar factor común es **deshacer** ese reparto.",
        },
        {
          label: "Comprobación",
          message: "Siempre se puede comprobar: multiplica el factor sacado por el paréntesis; debe salir el polinomio original.",
        },
      ],
      title: "Deshacer la propiedad distributiva",
      blocks: [
        {
          kind: "text",
          text: "Si **todos los términos** de un polinomio son múltiplos de un mismo monomio, ese monomio se puede **sacar fuera** de un paréntesis como **factor común**.",
        },
        {
          kind: "example",
          lines: [
            { math: "6x^4 - 9x^3 + 12x^2 - 3x = 3x\\,(2x^3 - 3x^2 + 4x - 1)" },
          ],
        },
        {
          kind: "text",
          text: "El monomio $3x$ es múltiplo común de todos los términos.",
        },
      ],
      visual: { kind: "anim", scene: "factor-comun-area", params: { a: 3, b: 2, c: 3 } },
    },
    {
      id: "metodo",
      type: "slide",
      help: [
        {
          label: "Coeficiente",
          message: "El número del factor común es el **máximo común divisor** de los coeficientes. Por ejemplo, de $6, 9, 12, 3$ es $3$.",
        },
        {
          label: "Letra",
          message: "De cada letra se saca la **menor potencia** que aparece en todos los términos. Si hay un término sin esa letra, no se puede sacar.",
        },
      ],
      title: "Cómo se encuentra el factor común",
      blocks: [
        {
          kind: "steps",
          title: "Método",
          items: [
            "Calcula el **m.c.d.** de los coeficientes.",
            "De cada letra, toma la **menor potencia** que aparezca en todos los términos.",
            "Divide cada término entre ese monomio y escribe el resultado entre paréntesis.",
            "Comprueba multiplicando.",
          ],
        },
      ],
      visual: { kind: "tool", tool: "factor-comun-explorador", initial: [3, 1, 2, -3, 4], hint: "Construye un polinomio con un factor oculto y comprueba que la herramienta lo encuentra." },
    },
    {
      id: "check-cd",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "m.c.d.",
          message: "$\\text{m.c.d.}(20, 15) = 5$. La $x$: la menor potencia es $x^1$ (en $15x$).",
        },
      ],
      title: "El número del factor común",
      question: "En $20x^3 + 15x$, ¿cuál es el **coeficiente** del factor común? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$\\text{m.c.d.}(20, 15) = 5$. Además sale una $x$: $20x^3 + 15x = 5x(4x^2 + 3)$.",
    },
    {
      id: "check-x",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "La menor potencia",
          message: "En $2x^4 - 2x^3 + 2x^2$ la menor potencia de $x$ es $x^2$ y el m.c.d. de $2, 2, 2$ es $2$.",
        },
      ],
      title: "Factor común con potencias",
      question: "Saca factor común en $2x^4 - 2x^3 + 2x^2$.",
      choices: [
        { id: "a", label: "$2x^2(x^2 - x + 1)$" },
        { id: "b", label: "$2x(x^3 - x^2 + x)$", incorrectFeedback: "Es correcto pero **no es el factor común máximo**: dentro del paréntesis todavía queda una $x$ en todos los términos." },
        { id: "c", label: "$2x^4(1 - x + x^2)$", incorrectFeedback: "El factor común debe ser la **menor** potencia ($x^2$), no la mayor: $x^4$ no divide a $2x^3$." },
        { id: "d", label: "$x^2(2x^2 - 2x + 2)$", incorrectFeedback: "Falta sacar también el $2$, que es común a todos los coeficientes." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "m.c.d. de los coeficientes: $2$. Menor potencia de $x$: $x^2$. Queda $2x^2(x^2 - x + 1)$.",
    },
    {
      id: "check-grande",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "m.c.d. de tres",
          message: "$410, 620$ y $130$ son múltiplos de $10$. Menor potencia de $x$: $x^1$.",
        },
      ],
      title: "Coeficientes grandes",
      question: "En $410x^5 - 620x^3 + 130x$, ¿cuál es el coeficiente del factor común? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$\\text{m.c.d.}(410, 620, 130) = 10$ y sale una $x$: $10x(41x^4 - 62x^2 + 13)$.",
    },
    {
      id: "sin-factor",
      type: "slide",
      help: [
        {
          label: "Un término sin la letra",
          message: "Si algún término no tiene la letra, **no se puede** sacar esa letra. Y si el m.c.d. de los coeficientes es $1$, tampoco sale número.",
        },
      ],
      title: "Cuándo no hay factor común",
      blocks: [
        {
          kind: "text",
          text: "A veces no hay factor común no trivial. Por ejemplo, en $x^2 + 3x + 5$: el término $5$ no tiene $x$ y $\\text{m.c.d.}(1, 3, 5) = 1$.",
        },
        {
          kind: "warning",
          text: "Si sacas un factor y dentro del paréntesis un término **desaparece o queda un $0$**, revisa: cada término da, al dividir, un término del paréntesis.",
        },
      ],
      visual: { kind: "tool", tool: "factor-comun-explorador", initial: [1, 0, 2, -3, 4], hint: "Con factor oculto 1 y potencia 0, ¿qué factor común encuentra?" },
    },
    {
      id: "check-comprobar",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Multiplica",
          message: "Para comprobar, multiplica de nuevo: $3x(2x^2 - 3x + 4) = 6x^3 - 9x^2 + 12x$.",
        },
      ],
      title: "Comprobar el resultado",
      question: "Un alumno escribe $6x^3 - 9x^2 + 12x = 3x(2x^2 - 3x + 4)$. ¿Es correcto?",
      choices: [
        { id: "si", label: "Sí" },
        { id: "no1", label: "No: debería ser $3x(2x^2 - 3x + 1)$", incorrectFeedback: "Al dividir $12x$ entre $3x$ sale $4$, no $1$. El resultado dado es correcto." },
        { id: "no2", label: "No: debería ser $3(2x^3 - 3x^2 + 4x)$", incorrectFeedback: "Esa expresión también es correcta, pero **no está completamente factorizada**: queda una $x$ común." },
      ],
      correctChoiceId: "si",
      shuffleChoices: true,
      explanation: "$3x \\cdot 2x^2 = 6x^3$; $3x \\cdot (-3x) = -9x^2$; $3x \\cdot 4 = 12x$. Coincide.",
    },
    {
      id: "check-d",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Menor potencia",
          message: "$2x^6 + 4x^3 - 2x$: m.c.d. $2$; menor potencia de $x$: $x$.",
        },
      ],
      title: "Un polinomio de grado 6",
      question: "Saca factor común en $2x^6 + 4x^3 - 2x$.",
      choices: [
        { id: "a", label: "$2x(x^5 + 2x^2 - 1)$" },
        { id: "b", label: "$2x(x^5 + 2x^2 + 1)$", incorrectFeedback: "El último término es $-2x$, así que dentro queda $-1$." },
        { id: "c", label: "$2x^3(x^3 + 2 - x^{-2})$", incorrectFeedback: "Nunca aparecen exponentes negativos: se saca la **menor** potencia, $x^1$." },
        { id: "d", label: "$2(x^6 + 2x^3 - x)$", incorrectFeedback: "Se puede, pero queda sin sacar la $x$ que es común a todos los términos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2x^6 : 2x = x^5$, $4x^3 : 2x = 2x^2$, $-2x : 2x = -1$: $2x(x^5 + 2x^2 - 1)$.",
    },
  ],
};
