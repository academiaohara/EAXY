import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadDirectaProblemasLesson: InteractiveLesson = {
  slug: "proporcionalidad-directa-problemas",
  title: "2. Problemas de proporcionalidad directa",
  subtitle: TEMA_1ESO_9_SUBTITLE,
  steps: [
    {
      id: "metodos",
      type: "concept",
      help: [
        {
          label: "Dos caminos",
          message: "Reducción a la unidad: calcula cuánto vale $1$ y multiplica. Regla de tres: monta una proporción con tres datos y despeja el cuarto.",
        },
        {
          label: "¿Cuándo uso cada uno?",
          message: "Reducción a la unidad es más intuitiva con números pequeños. La regla de tres es más rápida si el valor unitario es incómodo.",
        },
      ],
      title: "Reducción a la unidad y regla de tres",
      content: [
        "Para magnitudes **directamente proporcionales** usamos:",
        "**Reducción a la unidad:** calcula el valor de la magnitud cuando la otra vale $1$.",
        "**Regla de tres directa:** con dos pares de valores formas **fracciones equivalentes**.",
        "$$\\frac{a}{b} = \\frac{m}{x} \\Rightarrow a \\cdot x = b \\cdot m \\Rightarrow x = \\frac{b \\cdot m}{a}$$",
      ],
    },
    {
      id: "chocolatinas-reduccion",
      type: "animated_solution",
      help: [
        {
          label: "¿Por qué divido entre $3$?",
          message: "Porque $3$ chocolatinas pesan $60$ g. Dividiendo repartes ese peso en una chocolatina.",
        },
        {
          label: "Comprueba con el $3$",
          message: "Tres chocolatinas de $20$ g pesan $60$ g, como dice el enunciado.",
        },
      ],
      title: "Reducción a la unidad — chocolatinas",
      content: [
        "Tres chocolatinas pesan $60$ gramos. ¿Cuánto pesan cuatro chocolatinas?",
      ],
      frames: [
        {
          caption: "Valor de una chocolatina:",
          math: "60 : 3 = 20\\,\\mathrm{g}",
        },
        {
          caption: "Cuatro chocolatinas:",
          math: "20 \\cdot 4 = 80\\,\\mathrm{g}",
        },
      ],
    },
    {
      id: "equivalentes",
      type: "concept",
      help: [
        {
          label: "¿Qué es la tabla?",
          message: "Una lista de pares de valores. En una proporcionalidad directa todos los cocientes entre las dos columnas son iguales.",
        },
        {
          label: "Tres datos, un cuarto",
          message: "Si conoces tres valores de una proporción, la propiedad de las fracciones equivalentes te da el cuarto.",
        },
      ],
      title: "Fracciones equivalentes en la tabla",
      content: [
        "En la tabla chocolatinas–peso: $\\frac{1}{2} = \\frac{20}{40}$, $\\frac{3}{4} = \\frac{60}{80}$…",
        "Esa propiedad justifica la regla de tres: conoces tres valores y calculas el cuarto.",
      ],
    },
    {
      id: "regla-tres-ocho",
      type: "animated_solution",
      help: [
        {
          label: "Cómo se monta",
          message: "Escribe las dos fracciones iguales, con las chocolatinas arriba y los gramos abajo (o al revés, pero igual en las dos).",
        },
        {
          label: "Cómo se despeja",
          message: "Multiplica en cruz y divide entre el número que acompaña a la $x$ en la diagonal.",
        },
        {
          label: "Comprueba con la reducción",
          message: "Si cada chocolatina pesa $20$ g, ocho pesan $160$ g: el mismo resultado.",
        },
      ],
      title: "Regla de tres — ocho chocolatinas",
      content: ["Tres chocolatinas pesan $60$ g. ¿Cuánto pesan ocho?"],
      frames: [
        {
          caption: "Plantilla:",
          math: "\\frac{3}{8} = \\frac{60}{x}",
        },
        {
          caption: "Despeje:",
          math: "x = \\frac{60 \\cdot 8}{3} = 160\\,\\mathrm{g}",
        },
      ],
    },
    {
      id: "manantial",
      type: "animated_solution",
      help: [
        {
          label: "¿Directa o inversa?",
          message: "Más litros, más tiempo: es directa.",
        },
        {
          label: "Unidades",
          message: "El manantial da litros por minuto, pero la unidad que se calcula es el tiempo por litro: pasa los minutos a segundos.",
        },
      ],
      title: "Problema resuelto — manantial",
      content: [
        "Un manantial arroja $6$ litros por minuto. ¿Cuánto tardará en llenar una garrafa de $20$ litros?",
      ],
      frames: [
        {
          caption: "Tiempo para $1$ litro:",
          math: "60\\,\\mathrm{s} : 6 = 10\\,\\mathrm{s}",
        },
        {
          caption: "Para $20$ litros:",
          math: "10 \\cdot 20 = 200\\,\\mathrm{s} = 3\\,\\mathrm{min}\\ 20\\,\\mathrm{s}",
        },
      ],
    },
    {
      id: "queso-regla",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Directa o inversa?",
          message: "Más queso cuesta más dinero: es directa. En la inversa, más cantidad costaría menos.",
        },
        {
          label: "Reducción a la unidad",
          message: "Calcula cuánto cuesta una cantidad pequeña, por ejemplo $100$ g, y multiplica.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "$320$ g es menos que $400$ g, así que cuesta menos de $4{,}60$ €, pero más de la mitad.",
        },
      ],
      title: "Regla de tres — queso (act. 6)",
      question:
        "Un trozo de $400$ g cuesta $4{,}60\\,€$. ¿Cuánto cuesta otro de $320$ g del mismo queso? (en euros, solo el número con coma decimal)",
      correctAnswers: ["3,68", "3.68", "3,68 €", "3.68 €", "3,68€", "3.68€"],
      hint: "Menos gramos, menos dinero: es directa. Plantea $\\frac{400}{320} = \\frac{4{,}60}{x}$.",
      explanation:
        "$\\frac{400}{320} = \\frac{4{,}60}{x}$ → $x = \\frac{320 \\cdot 4{,}60}{400} = 3{,}68\\,€$.",
    },
    {
      id: "check-fraccion",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué relaciona una proporción?",
          message: "Dos fracciones iguales: el producto cruzado es el mismo.",
          math: ["\\frac{a}{b} = \\frac{c}{d} \\;\\Rightarrow\\; a \\cdot d = b \\cdot c"],
        },
        {
          label: "¿Por cuánto se multiplica?",
          message: "Mira por cuánto se multiplica el numerador ($4$ a $14$) y aplica lo mismo al denominador.",
        },
        {
          label: "Compruébalo",
          message: "Simplifica $\\frac{4}{6}$ y la fracción que te salga con $x$: tienen que dar la misma.",
        },
      ],
      title: "Completa la proporción (act. 4a)",
      question: "Si $\\frac{4}{6} = \\frac{14}{x}$, halla $x$ (solo el número).",
      correctAnswers: ["21"],
      explanation: "$x = \\frac{6 \\cdot 14}{4} = 21$.",
    },
  ],
};
