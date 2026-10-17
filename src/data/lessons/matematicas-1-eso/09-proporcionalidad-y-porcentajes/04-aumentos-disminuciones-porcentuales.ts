import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const aumentosDisminucionesPorcentualesLesson: InteractiveLesson = {
  slug: "aumentos-disminuciones-porcentuales",
  title: "4. Aumentos y disminuciones porcentuales",
  subtitle: TEMA_1ESO_9_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Subidas y rebajas",
      content: [
        "En la vida real aparecen **aumentos** (subidas de precio, intereses…) y **disminuciones** (rebajas, pérdida de población…).",
        "Siempre partimos del **precio o cantidad antigua**, calculamos el **porcentaje** correspondiente y lo **sumamos** (aumento) o **restamos** (disminución).",
      ],
    },
    {
      id: "aumento-billete",
      type: "animated_solution",
      title: "Aumento porcentual — billete a París",
      content: [
        "Un billete costaba $460\\,€$ y ha subido un $20\\%$. ¿Cuál es el precio actual?",
      ],
      frames: [
        {
          caption: "Aumento:",
          math: "20\\% \\text{ de } 460 = \\frac{20 \\cdot 460}{100} = 92\\,€",
        },
        {
          caption: "Precio nuevo:",
          math: "460 + 92 = 552\\,€",
        },
      ],
    },
    {
      id: "rebaja-tv",
      type: "animated_solution",
      title: "Disminución porcentual — televisor",
      content: [
        "Un televisor costaba $900\\,€$ y tiene una rebaja del $15\\%$. ¿Cuánto cuesta ahora?",
      ],
      frames: [
        {
          caption: "Rebaja:",
          math: "15\\% \\text{ de } 900 = \\frac{15 \\cdot 900}{100} = 135\\,€",
        },
        {
          caption: "Precio final:",
          math: "900 - 135 = 765\\,€",
        },
      ],
    },
    {
      id: "prestamo",
      type: "animated_solution",
      title: "Intereses — préstamo (act. 1)",
      content: [
        "Rosa pide un préstamo de $4000\\,€$ al $5\\%$ de interés anual. ¿Qué cantidad devolverá al cabo de un año (capital + intereses)?",
      ],
      frames: [
        {
          caption: "Intereses:",
          math: "5\\% \\text{ de } 4000 = 200\\,€",
        },
        {
          caption: "Devolución:",
          math: "4000 + 200 = 4200\\,€",
        },
      ],
    },
    {
      id: "poblacion",
      type: "animated_solution",
      title: "Población — disminución (act. 2)",
      content: [
        "Una aldea tenía $250$ habitantes y la población ha disminuido un $8\\%$. ¿Cuál es la población actual?",
      ],
      frames: [
        {
          caption: "Pérdida:",
          math: "8\\% \\text{ de } 250 = 20 \\text{ habitantes}",
        },
        {
          caption: "Población actual:",
          math: "250 - 20 = 230",
        },
      ],
    },
    {
      id: "blusa",
      type: "fill_in_blank",
      title: "Rebaja en una blusa (autoevaluación)",
      question:
        "Marta compra una blusa de $35\\,€$ con un $20\\%$ de rebaja. ¿Cuánto paga, en euros? (solo el número)",
      correctAnswers: ["28", "28 €", "28€", "28,00", "28.00"],
      hint: "Calcula primero cuánto le descuentan y réstalo del precio. O bien: paga el $80\\%$.",
      explanation:
        "Rebaja: $20\\%$ de $35 = 7\\,€$. Paga $35 - 7 = 28\\,€$ (equivale a $0{,}80 \\cdot 35 = 28$). Ojo: $7\\,€$ es el descuento, no lo que paga.",
    },
    {
      id: "comedor",
      type: "fill_in_blank",
      title: "Comedor escolar (autoevaluación)",
      question:
        "Un colegio tiene $585$ estudiantes; el $60\\%$ usa el comedor. ¿Cuántos alumnos? (solo el número)",
      correctAnswers: ["351"],
      explanation: "$60\\%$ de $585 = (585 : 100) \\cdot 60 = 351$.",
    },
  ],
};
