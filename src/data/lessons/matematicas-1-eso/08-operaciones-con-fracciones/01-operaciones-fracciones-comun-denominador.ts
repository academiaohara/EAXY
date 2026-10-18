import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesComunDenominadorLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-comun-denominador",
  title: "1. Reducción a común denominador",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "¿Por qué un mismo denominador?",
      content: [
        "Comparar, ordenar o sumar fracciones es más sencillo cuando comparten **denominador**.",
        "Ordenar $\\frac{1}{7}$, $\\frac{2}{7}$ y $\\frac{5}{7}$ es inmediato; con $\\frac{2}{3}$, $\\frac{4}{9}$ y $\\frac{5}{6}$ conviene **reducir a común denominador** primero.",
        "Reducir es sustituir cada fracción por otra **equivalente** con el mismo denominador.",
      ],
    },
    {
      id: "metodo",
      type: "concept",
      title: "Método (MCM de los denominadores)",
      content: [
        "Calcula el **mínimo común múltiplo** $m$ de los denominadores.",
        "En cada fracción, multiplica numerador y denominador por $\\dfrac{m}{\\text{denominador}}$ (el cociente entero entre $m$ y ese denominador).",
        "Así todas quedan con denominador $m$ y el valor no cambia.",
      ],
    },
    {
      id: "ejemplo-12",
      type: "animated_solution",
      title: "Ejercicio resuelto — denominador común $12$",
      content: ["Reduce $\\dfrac{1}{4}$ y $\\dfrac{1}{6}$ tomando $12$ como denominador común."],
      frames: [
        { caption: "$12 : 4 = 3$", math: "\\frac{1}{4} = \\frac{1 \\cdot 3}{4 \\cdot 3} = \\frac{3}{12}" },
        { caption: "$12 : 6 = 2$", math: "\\frac{1}{6} = \\frac{1 \\cdot 2}{6 \\cdot 2} = \\frac{2}{12}" },
      ],
    },
    {
      id: "ejemplo-24",
      type: "animated_solution",
      title: "Ejemplo — $\\frac{5}{8}$, $\\frac{3}{4}$ y $\\frac{7}{12}$",
      content: ["m.c.m.$(8, 4, 12) = 24$."],
      frames: [
        { caption: "$24 : 8 = 3$", math: "\\frac{5}{8} = \\frac{15}{24}" },
        { caption: "$24 : 4 = 6$", math: "\\frac{3}{4} = \\frac{18}{24}" },
        { caption: "$24 : 12 = 2$", math: "\\frac{7}{12} = \\frac{14}{24}" },
      ],
    },
    {
      id: "check-mcm",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué estamos haciendo?",
          message: "Cambiar la forma de escribir $\\frac{1}{2}$ sin cambiar su valor: sextos en lugar de medios.",
        },
        {
          label: "¿Por cuánto multiplico?",
          message: "El denominador pasa de $2$ a $6$. Multiplica el numerador por el mismo número para no cambiar el valor.",
          math: ["\\frac{1}{2} = \\frac{1 \\cdot ?}{2 \\cdot ?}"],
        },
        {
          label: "Visualízalo",
          message: "Cada mitad de la barra se corta en tantos trozos como sextos caben en un medio.",
        },
      ],
      title: "Comprueba el método",
      question:
        "Reducimos $\\frac{1}{2}$ y $\\frac{1}{3}$ a denominador común $6$: la barra ya está partida en sextos. Colorea $\\frac{1}{2}$ de la barra.",
      shape: "bar",
      numerator: 1,
      denominator: 2,
      parts: 6,
      hint: "Media barra es lo mismo que cierto número de sextos. ¿Cuántas veces cabe $2$ en $6$?",
      explanation:
        "Has coloreado $3$ sextos: $6 : 2 = 3$, así que se amplía multiplicando numerador y denominador **por $3$**: $\\frac{1}{2} = \\frac{1 \\cdot 3}{2 \\cdot 3} = \\frac{3}{6}$.",
    },
  ],
};
