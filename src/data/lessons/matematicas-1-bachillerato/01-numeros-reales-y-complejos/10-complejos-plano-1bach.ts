import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const complejosPlano1bachLesson: InteractiveLesson = {
  slug: "complejos-plano-1bach",
  title: "10. El plano complejo",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "argand",
      type: "slide",
      help: [
        { label: "Historia", message: "La interpretación geométrica la expusieron Wallis (1685) y Wessel (1799); Argand (1806) y Gauss (1831) la redescubrieron. Por eso se llama diagrama de Argand." },
      ],
      title: "Cada complejo es un punto del plano",
      blocks: [
        { kind: "definition", text: "El complejo $z = x + yi$ se corresponde con el punto $(x, y)$ del plano, o con el **vector** que va del origen a ese punto. El **eje horizontal** es el **eje real** y el **vertical**, el **eje imaginario**. Es el **diagrama de Argand**." },
        { kind: "text", text: "Así, la recta real es el eje horizontal, y los múltiplos de $i$ (los imaginarios puros) están sobre el vertical." },
      ],
      visual: { kind: "tool", tool: "complejo-explorador", initial: [3, 2], hint: "Mueve la parte real y la imaginaria y mira cómo se mueve el punto. Pasa por el eje real (y = 0) y por el imaginario (x = 0)." },
    },
    {
      id: "conjugado",
      type: "slide",
      help: [{ label: "Opuesto", message: "El opuesto $-z = -x - yi$ es el simétrico respecto del **origen**, que no es lo mismo que el conjugado." }],
      title: "El conjugado, en el plano",
      blocks: [
        { kind: "compare",
          left: { title: "Conjugado de z = 2 + i", text: "Simétrico respecto del **eje real**.", math: ["\\bar{z} = 2 - i"], tone: "ok" },
          right: { title: "Opuesto de z = 2 + i", text: "Simétrico respecto del **origen**.", math: ["-z = -2 - i"], tone: "warn" } },
        { kind: "text", text: "El conjugado conserva la distancia al origen y cambia el sentido del giro (el ángulo cambia de signo). Lo usarás al dividir y al estudiar el módulo." },
      ],
      arrange: "stack",
    },
    {
      id: "check-conjugado",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El conjugado solo cambia el signo de la parte imaginaria." }],
      title: "Conjugado de −3 + 4i",
      question: "¿Qué punto del plano representa el conjugado de $z = -3 + 4i$?",
      choices: [
        { id: "a", label: "$(-3,\\ -4)$" },
        { id: "b", label: "$(3,\\ -4)$", incorrectFeedback: "Ese es el opuesto $-z = 3 - 4i$ (simétrico respecto del origen)." },
        { id: "c", label: "$(3,\\ 4)$", incorrectFeedback: "Ese es el simétrico de $z$ respecto del **eje imaginario**, no su conjugado." },
        { id: "d", label: "$(4,\\ -3)$", incorrectFeedback: "Has intercambiado las coordenadas: la parte real va primero." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\bar{z} = -3 - 4i$, que es el punto $(-3, -4)$: el simétrico de $(-3, 4)$ respecto del eje real.",
    },
    {
      id: "suma",
      type: "slide",
      help: [{ label: "Producto distinto", message: "El producto de complejos no es ni el producto escalar ni el vectorial: tiene su propia geometría (giro y escala), que verás con la forma polar." }],
      title: "La suma es la suma de vectores",
      blocks: [
        { kind: "rule", title: "Regla del paralelogramo", text: "Sumar complejos equivale a sumar los vectores: se suman las coordenadas.", formula: "(x + yi) + (u + vi) = (x + u) + (y + v)\\,i" },
      ],
      visual: { kind: "anim", scene: "complejo-suma-vectores", params: { a: 2, b: 3, c: 3, d: -1 } },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Suma por separado las partes imaginarias: $3 + (-1)$." }],
      title: "Parte imaginaria de la suma",
      question: "Si $z_1 = 2 + 3i$ y $z_2 = 3 - i$, ¿cuál es la parte imaginaria de $z_1 + z_2$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$z_1 + z_2 = (2 + 3) + (3 - 1)\\,i = 5 + 2i$. Parte imaginaria: $2$.",
    },
    {
      id: "giro",
      type: "slide",
      help: [{ label: "Por qué gira", message: "$i(x + yi) = -y + xi$: el punto $(x, y)$ pasa a $(-y, x)$, que es el mismo punto girado $90^\\circ$ en sentido contrario a las agujas del reloj." }],
      title: "Multiplicar por i es girar 90°",
      blocks: [
        { kind: "rule", title: "Giro de 90°", formula: "i\\,(x + yi) = -y + xi" },
        { kind: "text", text: "Por ejemplo, $(2 + i)\\cdot i = -1 + 2i$. Repetir el giro cuatro veces devuelve el punto al inicio: de ahí que las potencias de $i$ se repitan cada $4$." },
      ],
      visual: { kind: "anim", scene: "complejo-giro-i", params: { a: 2, b: 1 } },
    },
    {
      id: "check-giro",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Multiplicar por $-i$ es el giro contrario al de multiplicar por $i$." }],
      title: "Multiplicar por −i",
      question: "Si $z$ se multiplica por $-i$, el vector de $z$ …",
      choices: [
        { id: "a", label: "gira $90^\\circ$ en el sentido de las agujas del reloj" },
        { id: "b", label: "gira $90^\\circ$ en sentido contrario a las agujas", incorrectFeedback: "Ese es el giro de multiplicar por $i$. Multiplicar por $-i$ lo deshace." },
        { id: "c", label: "gira $180^\\circ$", incorrectFeedback: "Una vuelta de $180^\\circ$ corresponde a multiplicar por $-1 = i^2$." },
        { id: "d", label: "se queda igual pero cambia de longitud", incorrectFeedback: "$|-i| = 1$: la longitud no cambia, solo el ángulo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$-i = i^3$ equivale a tres giros de $90^\\circ$ en sentido antihorario, es decir, un giro de $90^\\circ$ en sentido horario. Por ejemplo, $(2 + i)(-i) = 1 - 2i$.",
    },
  ],
};
