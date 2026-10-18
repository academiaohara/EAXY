import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraExpresionesMonomiosLesson: InteractiveLesson = {
  slug: "algebra-expresiones-monomios",
  title: "2. Expresiones algebraicas",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "expresiones",
      type: "slide",
      help: [
        {
          label: "¿Por qué quedan «indicadas»?",
          message: "Porque no conoces el valor de la letra y no puedes calcular. $x + 1$ se queda así hasta que $x$ tenga un valor.",
        },
        {
          label: "Traducir paso a paso",
          message: "En «el doble de su siguiente», cada palabra añade una operación a la anterior.",
          math: ["\\text{número} \\to x \\quad \\text{siguiente} \\to x + 1 \\quad \\text{doble} \\to 2(x + 1)"],
        },
      ],
      title: "Expresiones algebraicas: las operaciones quedan indicadas",
      blocks: [
        {
          kind: "definition",
          text: "Una **expresión algebraica** nace al traducir una situación con datos desconocidos a letras y operaciones.",
        },
        {
          kind: "example",
          title: "Cada palabra suma una operación",
          lines: [
            { math: "x", note: "un número" },
            { math: "x + 1", note: "su siguiente" },
            { math: "2 \\cdot (x + 1)", note: "el doble de su siguiente" },
            { math: "\\dfrac{x}{2 \\cdot (x + 1)}", note: "el cociente entre el número y ese doble" },
          ],
        },
        {
          kind: "text",
          text: "Como no sabemos cuánto vale $x$, las operaciones no se pueden hacer: quedan **indicadas**.",
        },
      ],
    },
    {
      id: "monomio",
      type: "slide",
      help: [
        {
          label: "Las dos piezas",
          message: "El coeficiente dice cuántas veces; la parte literal, de qué. En $-4x$: $-4$ veces $x$.",
        },
        {
          label: "¿Qué no es un monomio?",
          message: "Una suma como $x + 1$ son dos términos distintos, no un solo producto.",
        },
      ],
      title: "Monomio: un número por letras",
      blocks: [
        {
          kind: "definition",
          text: "Un **monomio** es un producto de un número conocido (**coeficiente**) por una o varias letras (**parte literal**).",
        },
        {
          kind: "compare",
          left: { title: "$-4x$", text: "coeficiente $-4$, parte literal $x$", tone: "info" },
          right: { title: "$\\dfrac{2}{3}a^2b$", text: "coeficiente $\\dfrac{2}{3}$, parte literal $a^2b$", tone: "key" },
        },
        {
          kind: "text",
          text: "Es la expresión algebraica más sencilla: solo hay **productos** de letras y números.",
        },
      ],
    },
    {
      id: "escritura",
      type: "slide",
      help: [
        {
          label: "¿Por qué no se escribe el $\\cdot$?",
          message: "Para ahorrar: un número pegado a una letra, o dos letras juntas, ya significan producto.",
        },
        {
          label: "¿Y si no veo coeficiente?",
          message: "Entonces vale $1$: $x$ es $1x$. Y si no hay exponente, es $1$: $x$ es $x^1$.",
        },
      ],
      title: "Cómo se escribe un monomio",
      blocks: [
        {
          kind: "steps",
          title: "Tres convenios",
          items: [
            "El coeficiente $1$ **no se escribe**: $1x = x$.",
            "El exponente $1$ **no se indica**: $x^1 = x$.",
            "El signo de producto **no se pone** entre números y letras ni entre letras.",
          ],
        },
        { kind: "formula", tex: "5 \\cdot x \\cdot y^3 \;\\Longrightarrow\; 5xy^3" },
        {
          kind: "warning",
          text: "En $5xy^3$ el exponente $3$ afecta solo a la $y$. Los números pegados a letras están **multiplicados**, no escritos uno al lado del otro.",
        },
      ],
    },
    {
      id: "check-monomios",
      type: "classify",
      help: [
        {
          label: "¿Cuándo es monomio?",
          message: "Si solo hay productos (números y letras multiplicados). En cuanto aparece un $+$ o un $-$ entre términos, ya no lo es.",
        },
        {
          label: "¿Y $\\dfrac{2}{3}a^2$?",
          message: "El $\\dfrac{2}{3}$ es un número conocido: es el coeficiente. Es un monomio.",
        },
      ],
      title: "¿Monomio o no?",
      question: "Separa las expresiones que son monomios de las que no.",
      groups: [
        { id: "mono", label: "Monomio", tone: "emerald" },
        { id: "no", label: "No es monomio", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$3x$", group: "mono" },
        { id: "b", text: "$-x^2y$", group: "mono" },
        { id: "c", text: "$\\dfrac{2}{3}a^2$", group: "mono" },
        { id: "d", text: "$x + 1$", group: "no" },
        { id: "e", text: "$5 - 2x$", group: "no" },
        { id: "f", text: "$a + b$", group: "no" },
      ],
      hint: "Un monomio es un solo producto: busca si hay sumas o restas.",
      explanation:
        "$3x$, $-x^2y$ y $\\frac{2}{3}a^2$ son un solo producto. $x + 1$, $5 - 2x$ y $a + b$ tienen **dos términos** unidos por un signo: no son monomios.",
    },
    {
      id: "semejantes",
      type: "slide",
      help: [
        {
          label: "¿Qué es «semejante»?",
          message: "Misma letra con el mismo exponente. $x^2$ y $x$ **no** son semejantes.",
        },
        {
          label: "Calcular el grado",
          message: "Suma los exponentes de **todas** las letras: en $3x^2y$ son $2 + 1 = 3$.",
        },
      ],
      title: "Monomios semejantes y grado",
      blocks: [
        {
          kind: "definition",
          text: "Dos monomios son **semejantes** si tienen la **misma parte literal**: $2x$ y $5x$ lo son; $2x$ y $2x^2$, no.",
        },
        {
          kind: "rule",
          title: "Grado de un monomio",
          text: "Es la **suma de los exponentes** de su parte literal.",
          formula: "3x^2y \;\\to\; 2 + 1 = 3",
        },
        {
          kind: "warning",
          text: "Un número solo (como $7$) tiene grado $0$: no lleva ninguna letra.",
        },
      ],
    },
    {
      id: "suma-semejantes",
      type: "slide",
      help: [
        {
          label: "Piensa en frutas",
          message: "$4x + 2x$ es como $4$ fresas más $2$ fresas: $6$ fresas. $3a + 2b$ son fresas y manzanas: no se mezclan.",
        },
        {
          label: "¿Qué cambia al sumar?",
          message: "Solo el coeficiente. La parte literal se queda igual: $3a + 2a = 5a$, no $5a^2$.",
        },
      ],
      title: "Sumar y restar: solo los semejantes",
      blocks: [
        {
          kind: "rule",
          title: "Regla",
          text: "Se suman o restan los **coeficientes** y la parte literal se queda igual. Si no son semejantes, la operación queda **indicada**.",
        },
        {
          kind: "example",
          lines: [
            { math: "4x + 2x = 6x" },
            { math: "a^2 + a^2 = 2a^2" },
            { math: "3a + 2b", note: "queda indicada" },
            { math: "x^2 + x", note: "queda indicada" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "semejantes-agrupar", params: { a: 3, b: 2, c: 2 } },
    },
    {
      id: "huerto",
      type: "predict",
      help: [
        {
          label: "¿Qué puedo juntar?",
          message: "Solo lo que es del mismo tipo: cajas de tomates con cajas de tomates. Las de pimientos son otra cosa.",
        },
        {
          label: "Hazlo con cantidades pequeñas",
          message: "Si cada caja de tomates pesara $1$ kg y la de pimientos $1$ kg, el peso total sería el número de cajas. Ahora piensa qué letra acompaña a cada cantidad.",
        },
        {
          label: "¿Qué hago con los coeficientes?",
          message: "Se suman los de las cajas de tomates entre sí; el de los pimientos queda como está.",
        },
      ],
      title: "El peso de la compra",
      question:
        "En un huerto, x es el peso de una caja de tomates e y el de una caja de pimientos. Compras 3 cajas de tomates y 2 de pimientos, y después otras 4 cajas de tomates. ¿Qué expresión reducida da el peso total?",
      mode: "choice",
      choices: [
        { id: "a", label: "$7x + 2y$" },
        {
          id: "b",
          label: "$9xy$",
          incorrectFeedback:
            "Has sumado todos los coeficientes y pegado las letras. Pero $x$ e $y$ no son semejantes (tomates y pimientos): no se pueden fundir en un solo monomio.",
        },
        {
          id: "c",
          label: "$9x$",
          incorrectFeedback:
            "Has tratado los pimientos como si fueran tomates. Cada caja de pimientos pesa $y$, no $x$: esas $2$ cajas no se suman a las de $x$.",
        },
        {
          id: "d",
          label: "$7x^2 + 2y$",
          incorrectFeedback:
            "Al sumar monomios semejantes solo cambia el coeficiente: $3x + 4x = 7x$. El exponente no se suma; se suman únicamente los exponentes al **multiplicar**.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3x + 4x = 7x$ (tomates) y $2y$ (pimientos) queda indicado: $7x + 2y$.",
    },
    {
      id: "multiplicar",
      type: "slide",
      help: [
        {
          label: "Multiplica por separado",
          message: "Coeficientes con coeficientes y letras con letras.",
          math: ["(2x)(4y) = (2 \\cdot 4)(x \\cdot y) = 8xy"],
        },
        {
          label: "¿Por qué se suman los exponentes?",
          message: "$x^3 \\cdot x^2$ es $x$ multiplicada cinco veces: tres más dos.",
          math: ["x^3 \\cdot x^2 = (x \\cdot x \\cdot x)(x \\cdot x) = x^5"],
        },
      ],
      title: "Multiplicar monomios",
      blocks: [
        {
          kind: "rule",
          title: "Regla",
          text: "El producto de dos monomios es **otro monomio**: se multiplican los coeficientes y se suman los exponentes de cada letra.",
        },
        {
          kind: "example",
          lines: [
            { math: "(2x) \\cdot (4y) = 8xy" },
            { math: "(-2a) \\cdot 5a = -10a^2", note: "$a \\cdot a = a^2$" },
            { math: "x^3 \\cdot x^2 = x^{3+2} = x^5" },
          ],
        },
        {
          kind: "warning",
          text: "Los exponentes se suman al **multiplicar** potencias de la misma base, no al sumar monomios.",
        },
      ],
    },
    {
      id: "dividir",
      type: "slide",
      help: [
        {
          label: "¿Qué pasa con las letras?",
          message: "Se dividen como potencias: $x^3 : x = x^2$. Los exponentes se **restan**.",
        },
        {
          label: "Si desaparece la letra",
          message: "$(2x) : (2x) = 1$: lo dividido entre sí mismo da $1$.",
        },
      ],
      title: "Dividir monomios",
      blocks: [
        {
          kind: "rule",
          title: "Regla",
          text: "Se dividen por una parte los **coeficientes** y por otra las **partes literales**.",
          formula: "(6x^3) : (2x) = (6 : 2) \\cdot x^{3-1} = 3x^2",
        },
        {
          kind: "example",
          lines: [
            { math: "(-8) : (2a) = -\\dfrac{4}{a}", note: "no es monomio" },
            { math: "(15a^2) : (3a) = 5a" },
            { math: "(2x) : (2x) = 1" },
          ],
        },
      ],
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Primero el signo, después los números y, por último, las letras.",
        },
        {
          label: "Las letras iguales",
          message: "$a \\cdot a$ es dos veces $a$ multiplicada: se escribe $a^2$.",
        },
      ],
      title: "Multiplica los monomios",
      question: "Calcula $(-2a) \\cdot 5a$. Escribe el monomio resultante (por ejemplo, $3x^2$).",
      correctAnswers: ["-10a^2", "-10a²", "-10*a^2", "-10 a^2", "-10a**2"],
      hint: "Signo $-$, coeficientes $2 \\cdot 5 = 10$ y letras $a \\cdot a$.",
      explanation: "$(-2) \\cdot 5 = -10$ y $a \\cdot a = a^2$: resulta $-10a^2$.",
    },
    {
      id: "distributiva",
      type: "slide",
      help: [
        {
          label: "No te dejes ninguno",
          message: "El de fuera multiplica a **cada** término del paréntesis.",
          math: ["5(2a + 3b) = 5 \\cdot 2a + 5 \\cdot 3b"],
        },
        {
          label: "Signos",
          message: "Si el de fuera es negativo, cambia el signo de todos los términos de dentro.",
        },
      ],
      title: "Monomio por una suma",
      blocks: [
        {
          kind: "definition",
          text: "Si uno de los factores es una suma, se aplica la **propiedad distributiva**: se multiplica por cada sumando.",
        },
        {
          kind: "example",
          lines: [
            { math: "5 \\cdot (2a + 3b) = 10a + 15b" },
            { math: "2x \\cdot (x^2 + 2y^2) = 2x^3 + 4xy^2" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["5", "·", "(", "2a", "+", "3b", ")"], active: [0, 6], note: "El $5$ multiplica a **cada** sumando del paréntesis." },
            { tokens: ["5", "·", "2a", "+", "5", "·", "3b"], active: [0, 2], note: "Calculamos cada producto por separado." },
            { tokens: ["10a", "+", "15b"], fresh: [0, 2] },
          ],
        },
      },
    },
    {
      id: "polinomios",
      type: "slide",
      help: [
        {
          label: "¿Cómo veo el grado?",
          message: "Calcula el grado de cada término (suma de sus exponentes) y quédate con el mayor.",
        },
        {
          label: "¿Y el término independiente?",
          message: "Es el que no lleva letra: un número suelto. Tiene grado $0$.",
        },
      ],
      title: "Polinomios: sumas de monomios no semejantes",
      blocks: [
        {
          kind: "definition",
          text: "Un **polinomio** es una suma o resta de monomios **no semejantes**; cada sumando es un **término**.",
        },
        {
          kind: "example",
          title: "$P = 3x^2 - 5x + 7$",
          lines: [
            { math: "3x^2,\; -5x,\; 7", note: "tres términos (trinomio)" },
            { math: "7", note: "término independiente: no lleva letra" },
            { math: "\\text{grado } 2", note: "lo marca el término de mayor grado" },
          ],
        },
        {
          kind: "text",
          text: "Con uno, dos o tres términos se llaman **monomio**, **binomio** y **trinomio**.",
        },
      ],
    },
    {
      id: "check",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Primero lo de dentro del paréntesis y después la resta, como siempre con la jerarquía de operaciones.",
          branches: [
            {
              label: "¿Qué son monomios semejantes?",
              message: "Los que tienen la misma parte literal. Se suman o restan sus coeficientes y la letra se queda igual.",
              math: ["3x + 4x = 7x \\qquad 3x + 4y\\ \\text{no se reduce}"],
            },
          ],
        },
        {
          label: "Me lío con el menos delante del paréntesis",
          message: "Trata el paréntesis como un solo número. Con cifras: $10 - (2 + 1)$ es $10 - 3$, no $10 - 2 + 1$.",
        },
        {
          label: "¿Cómo compruebo mi resultado?",
          message: "Da a $x$ un valor, por ejemplo $x = 1$. Calcula la expresión original y tu resultado: tienen que coincidir.",
        },
      ],
      title: "Comprueba lo aprendido",
      question: "Reduce $5x - (2x + x)$. Escribe el monomio resultante (por ejemplo, $7x$).",
      correctAnswers: ["2x", "2·x", "2*x", "2 x"],
      hint: "Reduce primero lo que hay dentro del paréntesis; después resta monomios semejantes.",
      explanation: "Dentro del paréntesis $2x + x = 3x$; luego $5x - 3x = 2x$.",
    },
  ],
};
