import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaNaturalesLesson: InteractiveLesson = {
  slug: "suma-resta-naturales",
  title: "3. Suma y resta",
  subtitle: TEMA_1_SUBTITLE,
  steps: [
    {
      id: "ideas",
      type: "concept",
      title: "Suma y resta",
      content: [
        "**Sumar** es unir, juntar o añadir cantidades. Por ejemplo, $583 + 162 + 45 + 38 = 828$ € en equipamiento ciclista.",
        "**Restar** es quitar, hallar lo que falta o la diferencia. Si tenemos $693$ € y el equipo cuesta $828$ €, faltan $828 - 693 = 135$ €.",
        "En expresiones con varias operaciones, los **paréntesis** agrupan un resultado parcial y cambian el orden de cálculo.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "El equipo de ciclista",
          rows: ["583", "162", "45", "38"],
          operator: "+",
          result: "828",
          caption: "Total en euros.",
        },
      ],
    },
    {
      id: "parentesis",
      type: "concept",
      title: "El papel de los paréntesis",
      content: [
        "Mismos números y mismos signos pueden dar resultados distintos según los paréntesis:",
        "$9 - 1 + 3 = 11$, pero $9 - (1 + 3) = 5$.",
        "Primero se calcula lo que va dentro del paréntesis; después el resto de sumas y restas de izquierda a derecha.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Compara",
          items: [
            { title: "Sin paréntesis", math: "9 - 1 + 3 = 11", tone: "cobalt" },
            { title: "Con paréntesis", math: "9 - (1 + 3) = 5", tone: "rose" },
          ],
        },
      ],
    },
    {
      id: "propiedades",
      type: "concept",
      title: "Propiedades de la suma",
      content: [
        "**Propiedad conmutativa**: cambiar el orden de los sumandos no altera el resultado. $a + b = b + a$.",
        "**Propiedad asociativa**: da igual cómo agrupes los sumandos. $(a + b) + c = a + (b + c)$.",
        "Estas propiedades ayudan a calcular mentalmente reagrupando números cómodos.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Asociativa en acción",
          rows: ["(3 + 2) + 6", "3 + (2 + 6)"],
          operator: "=",
          result: "11",
          caption: "Ambos caminos llegan al mismo total.",
        },
      ],
    },
    {
      id: "compra-animada",
      type: "animated_solution",
      title: "Problema — Camisa y pantalones",
      content: [
        "Jorge compra una camisa de $54$ € y unos pantalones de $79$ €. Le rebajan $6$ € en la camisa y $15$ € en los pantalones. ¿Cuánto gasta?",
      ],
      frames: [
        {
          caption: "Precios con descuento:",
          math: "54 - 6 = 48 \\text{ € (camisa)},\\quad 79 - 15 = 64 \\text{ € (pantalones)}",
        },
        {
          caption: "Total gastado:",
          math: "48 + 64 = 112 \\text{ €}",
        },
      ],
    },
    {
      id: "check-parentesis",
      type: "fill_in_blank",
      title: "Comprueba lo aprendido",
      question: "¿Cuál es el valor de $13 - (9 + 3)$? (solo el número)",
      correctAnswers: ["1"],
      hint: "Resuelve primero lo que hay dentro del paréntesis y después resta.",
      explanation: "Primero $9 + 3 = 12$; después $13 - 12 = 1$.",
    },
  ],
};
