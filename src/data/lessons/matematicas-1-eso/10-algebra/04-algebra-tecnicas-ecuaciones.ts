import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraTecnicasEcuacionesLesson: InteractiveLesson = {
  slug: "algebra-tecnicas-ecuaciones",
  title: "4. Primeras técnicas de resolución",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma",
      type: "slide",
      help: [
        {
          label: "¿Por qué restamos a los dos lados?",
          message: "Una ecuación es una balanza en equilibrio. Si quitas algo de un plato, para que no se incline tienes que quitar lo mismo del otro.",
        },
        {
          label: "Con $x + 5 = 1$",
          message: "Restas $5$ a ambos lados: $x = 1 - 5 = -4$. La solución puede ser negativa.",
        },
      ],
      title: "$x + a = b$: lo que suma pasa restando",
      blocks: [
        {
          kind: "rule",
          title: "Técnica",
          text: "Para deshacer una suma, **resta** el mismo número a los dos miembros.",
          formula: "x + a = b \;\\to\; x = b - a",
        },
        {
          kind: "example",
          lines: [
            { math: "x + 4 = 7", note: "restamos $4$ a los dos lados" },
            { math: "x = 7 - 4 = 3" },
          ],
        },
        {
          kind: "text",
          text: "Se suele decir que el término «pasa al otro lado con el signo cambiado»: en realidad has hecho la **misma operación** en los dos miembros.",
        },
      ],
      visual: { kind: "anim", scene: "balanza-ecuacion", params: { a: 1, b: 4, c: 7, sign: "+" } },
    },
    {
      id: "resta",
      type: "slide",
      help: [
        {
          label: "¿Por qué sumamos?",
          message: "Sumar es la operación contraria de restar. Al sumar $2$ el $-2$ y el $+2$ se anulan y la $x$ queda sola.",
        },
        {
          label: "Con $5 - x = 2$",
          message: "Cuidado: aquí lo que resta es la $x$. Pasa $x$ sumando: $5 = 2 + x$ y luego $x = 5 - 2 = 3$.",
        },
      ],
      title: "$x - a = b$: lo que resta pasa sumando",
      blocks: [
        {
          kind: "rule",
          title: "Técnica",
          text: "Para deshacer una resta, **suma** el mismo número a los dos miembros.",
          formula: "x - a = b \;\\to\; x = b + a",
        },
        {
          kind: "example",
          lines: [
            { math: "x - 2 = 6", note: "sumamos $2$ a los dos lados" },
            { math: "x = 6 + 2 = 8" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "balanza-ecuacion", params: { sign: "-", b: 2, c: 6 } },
    },
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "¿Qué significa $3x$?",
          message: "$3x$ es $x + x + x$: tres cajas iguales. Si pesan $15$, cada una pesa $15 : 3$.",
        },
        {
          label: "¿Y si no sale exacto?",
          message: "Entonces la solución es una fracción: $7x = 2$ da $x = \\dfrac{2}{7}$.",
        },
      ],
      title: "$a \\cdot x = b$: lo que multiplica pasa dividiendo",
      blocks: [
        {
          kind: "rule",
          title: "Técnica",
          text: "Para deshacer un producto, **divide** los dos miembros entre el mismo número.",
          formula: "a \\cdot x = b \;\\to\; x = \\dfrac{b}{a}",
        },
        {
          kind: "example",
          lines: [
            { math: "3x = 15", note: "dividimos entre $3$" },
            { math: "x = \\dfrac{15}{3} = 5" },
          ],
        },
        {
          kind: "warning",
          title: "Casos especiales",
          text: "$0 \\cdot x = 6$ **no tiene solución** (nada multiplicado por $0$ da $6$). $0 \\cdot x = 0$ tiene **infinitas** (cualquier número sirve).",
        },
      ],
      visual: { kind: "anim", scene: "balanza-ecuacion", params: { a: 3, b: 0, c: 15 } },
    },
    {
      id: "descuento",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "Escribe primero la ecuación con la letra: «un precio, menos $8$ de descuento, da $52$».",
        },
        {
          label: "¿Qué pasa con el $8$?",
          message: "El descuento **resta** $8$ al precio. Para volver al precio de partida hay que hacer la operación contraria.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Con un descuento, el precio de partida tiene que ser **mayor** que lo que pagas.",
        },
      ],
      title: "Zapatillas con descuento",
      question:
        "Unas zapatillas tienen un descuento de 8 euros y las pagas por 52 euros. ¿Cuánto costaban antes del descuento?",
      mode: "choice",
      choices: [
        { id: "a", label: "$60$ €" },
        {
          id: "b",
          label: "$44$ €",
          incorrectFeedback:
            "Has restado $8$ otra vez. Pero $52$ ya es el precio **con** descuento: el precio original es mayor, no menor.",
        },
        {
          id: "c",
          label: "$416$ €",
          incorrectFeedback:
            "Has multiplicado $52 \\cdot 8$. El descuento se resta; no se multiplica. Un precio de $416$ € no tiene sentido para unas zapatillas con $8$ € de rebaja.",
        },
        {
          id: "d",
          label: "$6{,}5$ €",
          incorrectFeedback:
            "Has dividido $52 : 8$. Aquí no se reparte nada: $8$ € es lo que se quita al precio.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x - 8 = 52$. Sumamos $8$ a los dos lados: $x = 52 + 8 = 60$ €.",
    },
    {
      id: "cociente",
      type: "slide",
      help: [
        {
          label: "¿Qué significa $\\dfrac{x}{4}$?",
          message: "Que $x$ se ha repartido en $4$ partes iguales y cada parte vale $3$. Entonces el total son $4$ veces $3$.",
        },
        {
          label: "Con $\\dfrac{x}{2} = \\dfrac{7}{10}$",
          message: "Multiplicas por $2$ los dos lados: $x = \\dfrac{7}{10} \\cdot 2 = \\dfrac{7}{5}$.",
        },
      ],
      title: "$\\dfrac{x}{a} = b$: lo que divide pasa multiplicando",
      blocks: [
        {
          kind: "rule",
          title: "Técnica",
          text: "Para deshacer una división, **multiplica** los dos miembros por el mismo número.",
          formula: "\\dfrac{x}{a} = b \;\\to\; x = b \\cdot a",
        },
        {
          kind: "text",
          text: "Si $x$ repartida en $4$ partes da $3$ a cada una, entonces $x$ vale **cuatro veces** $3$.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x", ":", "4", "=", "3"], active: [0, 2], note: "La $x$ está dividida entre $4$." },
            { tokens: ["x", ":", "4", "·", "4", "=", "3", "·", "4"], active: [3, 4], note: "Multiplicamos por $4$ los dos miembros." },
            { tokens: ["x", "=", "12"], fresh: [0, 2] },
          ],
        },
      },
    },
    {
      id: "explora-balanza",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "La solución $x$ nunca cambia aunque la ecuación se vea distinta: son ecuaciones **equivalentes**.",
        },
      ],
      title: "Explora: ecuaciones equivalentes",
      blocks: [
        {
          kind: "text",
          text: "Suma, resta o divide en los dos platos y observa la ecuación. Intenta llegar a «$x$ = un número» con el menor número de pasos.",
        },
        {
          kind: "rule",
          title: "Para comprobar",
          text: "Cada paso que das mantiene la balanza equilibrada y **no cambia la solución**: por eso se llaman ecuaciones equivalentes.",
        },
      ],
      visual: { kind: "tool", tool: "balanza-explorador", params: { a: 2, b: 3, c: 11 } },
    },
    {
      id: "regalo",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "Cada uno paga una parte igual: el coste del regalo se ha **dividido** entre $4$.",
        },
        {
          label: "Escríbelo con una letra",
          message: "Si el regalo cuesta $x$, la parte de cada uno es $\\dfrac{x}{4}$ y eso vale $12$.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Si cada uno pone $12$ € y son $4$, el regalo tiene que costar **bastante más** de $12$ €.",
        },
      ],
      title: "Un regalo a cuatro",
      question:
        "Cuatro amigos pagan a partes iguales el regalo de cumpleaños de una amiga y a cada uno le toca poner 12 euros. ¿Cuánto cuesta el regalo?",
      mode: "choice",
      choices: [
        { id: "a", label: "$48$ €" },
        {
          id: "b",
          label: "$3$ €",
          incorrectFeedback:
            "Has dividido $12 : 4$. Pero $12$ € es **lo que pone cada uno**, ya dividido. Para volver al total hay que deshacer la división.",
        },
        {
          id: "c",
          label: "$16$ €",
          incorrectFeedback:
            "Has sumado $12 + 4$. Eso no tiene sentido: cuatro personas con $12$ € cada una ponen más de $16$ € en total.",
        },
        {
          id: "d",
          label: "$8$ €",
          incorrectFeedback:
            "Has restado $12 - 4$. Pero entre cuatro amigos que ponen $12$ € cada uno, el total no puede ser menor que lo que pone uno solo.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{x}{4} = 12$. Multiplicamos por $4$: $x = 12 \\cdot 4 = 48$ €.",
    },
    {
      id: "check",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Primero deja sola la parte con $x$: quita el $8$ de ese lado. Después ocúpate del número que multiplica a $x$.",
        },
        {
          label: "El signo menos delante de $3x$",
          message: "$8 - 3x = 2$: pasa el $8$ restando: $-3x = 2 - 8 = -6$. Ahora divide entre $-3$.",
        },
        {
          label: "¿Cómo compruebo?",
          message: "Sustituye tu valor en $8 - 3x$: tiene que dar $2$.",
        },
      ],
      title: "Combina las técnicas",
      question: "Resuelve $8 - 3x = 2$. ¿Cuánto vale $x$? (escribe solo el número)",
      correctAnswers: ["2", "x=2"],
      hint: "Quita primero el $8$ (pasándolo restando) y después divide entre el coeficiente de $x$.",
      explanation:
        "Pasamos el $8$: $-3x = 2 - 8 = -6$. Dividimos entre $-3$: $x = 2$. Comprobación: $8 - 3 \\cdot 2 = 2$.",
    },
  ],
};
