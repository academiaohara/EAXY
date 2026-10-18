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
      help: [
        {
          label: "Siempre desde el principio",
          message: "El porcentaje se calcula sobre la cantidad **inicial**, no sobre la final.",
        },
        {
          label: "Aumento o rebaja",
          message: "En un aumento sumas el porcentaje a la cantidad inicial. En una rebaja lo restas.",
        },
        {
          label: "Un atajo",
          message: "Subir un $20\\%$ es quedarse con el $120\\%$ del original. Bajar un $20\\%$ es quedarse con el $80\\%$.",
        },
      ],
      title: "Subidas y rebajas",
      content: [
        "En la vida real aparecen **aumentos** (subidas de precio, intereses…) y **disminuciones** (rebajas, pérdida de población…).",
        "Siempre partimos del **precio o cantidad antigua**, calculamos el **porcentaje** correspondiente y lo **sumamos** (aumento) o **restamos** (disminución).",
      ],
    },
    {
      id: "aumento-billete",
      type: "animated_solution",
      help: [
        {
          label: "¿Por qué sumo?",
          message: "El billete sube, así que el precio nuevo es el antiguo más el aumento.",
        },
        {
          label: "Con un solo cálculo",
          message: "Subir un $20\\%$ equivale a multiplicar por $1{,}20$: $460 \\cdot 1{,}20$.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué resto?",
          message: "Es una rebaja, así que el precio nuevo es el antiguo menos el descuento.",
        },
        {
          label: "Con un solo cálculo",
          message: "Bajar un $15\\%$ equivale a pagar el $85\\%$: multiplicar por $0{,}85$.",
        },
      ],
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
      help: [
        {
          label: "¿Qué son los intereses?",
          message: "El dinero extra que se paga por usar un dinero prestado. Se calcula como un porcentaje del capital.",
        },
        {
          label: "Capital más intereses",
          message: "Lo que devuelve es lo que le prestaron más los intereses de ese año.",
        },
      ],
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
      help: [
        {
          label: "Pérdida no es resultado",
          message: "El $8\\%$ de $250$ es lo que se pierde, no la población que queda.",
        },
        {
          label: "Con un solo cálculo",
          message: "Perder el $8\\%$ es quedarse con el $92\\%$: $250 \\cdot 0{,}92$.",
        },
      ],
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
      help: [
        {
          label: "¿Qué es un $20\\%$?",
          message: "Veinte de cada cien, es decir, una quinta parte del total.",
          branches: [
            {
              label: "¿Cómo calculo una quinta parte?",
              message: "Divide el precio entre $5$. Ese número es el descuento, no lo que paga.",
            },
          ],
        },
        {
          label: "¿Qué me piden: el descuento o el precio?",
          message: "Lo que paga es el precio inicial menos el descuento. Al terminar comprueba: ¿tu resultado es menor que $35$?",
        },
        {
          label: "Hay un atajo",
          message: "Si le rebajan el $20\\%$, paga el $80\\%$ del precio. Puedes calcular directamente ese porcentaje.",
        },
      ],
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
      help: [
        {
          label: "¿Qué significa el $60\\%$?",
          message: "Sesenta de cada cien, o sea, $60$ centésimas del total.",
          branches: [
            {
              label: "Descomponlo en partes fáciles",
              message: "El $50\\%$ es la mitad y el $10\\%$ es la décima parte. El $60\\%$ es la suma de las dos.",
              math: ["60\\% = 50\\% + 10\\%"],
            },
          ],
        },
        {
          label: "Quiero saber si es razonable",
          message: "El $60\\%$ es algo más de la mitad. La mitad de $585$ ronda $300$, así que el resultado debe quedar por encima de esa cifra.",
        },
      ],
      title: "Comedor escolar (autoevaluación)",
      question:
        "Un colegio tiene $585$ estudiantes; el $60\\%$ usa el comedor. ¿Cuántos alumnos? (solo el número)",
      correctAnswers: ["351"],
      explanation: "$60\\%$ de $585 = (585 : 100) \\cdot 60 = 351$.",
    },
  ],
};
