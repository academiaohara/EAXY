import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraExpresionesMonomiosLesson: InteractiveLesson = {
  slug: "algebra-expresiones-monomios",
  title: "2. Expresiones algebraicas",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  steps: [
    {
      id: "expresiones",
      type: "concept",
      title: "Expresiones algebraicas",
      content: [
        "Surgen al traducir situaciones con datos desconocidos: $3x - 5$, $x^2 + 1$, $(a + 1) \\cdot b$, $\\frac{a + b}{a}$…",
        "Las operaciones quedan **indicadas** porque no conocemos el valor de las letras.",
        "Ejemplos de traducción: un número $\\rightarrow x$; su siguiente $\\rightarrow x + 1$; el doble de su siguiente $\\rightarrow 2(x + 1)$.",
      ],
    },
    {
      id: "monomios",
      type: "concept",
      title: "Monomios",
      content: [
        "Un **monomio** es producto de un **coeficiente** (número conocido) por una **parte literal** (letras). Ej.: $-4x$, $\\frac{2}{3}a^2b$.",
        "No se escriben los signos de producto: $5 \\cdot x \\cdot y^3 \\rightarrow 5xy^3$.",
        "Un número seguido de letras significa que están multiplicados.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Partes de un monomio",
          items: [
            { title: "Coeficiente", math: "-4", caption: "Número numérico.", tone: "cobalt" },
            { title: "Parte literal", math: "x", caption: "Letras con exponentes.", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "suma-monomios",
      type: "concept",
      title: "Suma y resta de monomios",
      content: [
        "Solo se pueden sumar o restar monomios **semejantes** (misma parte literal): $4x + 2x = 6x$, $a^2 + a^2 = 2a^2$.",
        "Si no son semejantes, la operación queda indicada: $3a + 2b$, $x^2 + x$.",
        "Con paréntesis: $7x - (2x + x) = 7x - 3x = 4x$; $5a - (a - 4a) = 5a - (-3a) = 8a$.",
      ],
    },
    {
      id: "multiplicacion",
      type: "concept",
      title: "Multiplicar monomios",
      content: [
        "El producto de dos monomios es otro monomio: $(2x) \\cdot (4y) = 8xy$; $(-2a) \\cdot 5a = -10a^2$.",
        "**Potencias de la misma base**: $x^3 \\cdot x^2 = x^{3+2} = x^5$.",
        "**Distributiva**: $5 \\cdot (2a + 3b) = 10a + 15b$; $2x \\cdot (x^2 + 2y^2) = 2x^3 + 4xy^2$.",
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
