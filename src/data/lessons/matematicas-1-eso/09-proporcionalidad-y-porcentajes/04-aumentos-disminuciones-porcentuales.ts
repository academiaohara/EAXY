import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const aumentosDisminucionesPorcentualesLesson: InteractiveLesson = {
  slug: "aumentos-disminuciones-porcentuales",
  title: "4. Aumentos y disminuciones porcentuales",
  subtitle: TEMA_1ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "aumento",
      type: "slide",
      help: [
        {
          label: "¿Qué calculo primero?",
          message: "El aumento: el porcentaje de subida aplicado al precio **antiguo**. Después se suma a ese precio.",
        },
        {
          label: "Compruébalo",
          message: "Si el precio sube, el resultado debe ser mayor que el original.",
        },
      ],
      title: "Aumento porcentual: sumar el incremento",
      blocks: [
        {
          kind: "story",
          text: "El billete de avión a París costaba **460 €** y ha subido un **20 %**. ¿Cuánto cuesta ahora?",
        },
        {
          kind: "steps",
          items: [
            "Se calcula el aumento: $20\\%$ de $460 = 92$ €.",
            "Se **suma** al precio antiguo: $460 + 92 = 552$ €.",
          ],
        },
        {
          kind: "rule",
          formula: "\\text{precio nuevo} = \\text{precio antiguo} + \\text{aumento}",
        },
      ],
      visual: { kind: "anim", scene: "aumento-barra", params: { a: 460, b: 20, sign: "+" } },
    },
    {
      id: "disminucion",
      type: "slide",
      help: [
        {
          label: "¿Qué es lo que pago?",
          message: "El precio antiguo menos el descuento. El descuento es solo lo que te quitan.",
        },
        {
          label: "Compruébalo",
          message: "Si hay una rebaja, el resultado debe ser menor que el precio original.",
        },
      ],
      title: "Disminución porcentual: restar la rebaja",
      blocks: [
        {
          kind: "story",
          text: "Un televisor costaba **900 €** y está rebajado un **15 %**. ¿Cuánto cuesta ahora?",
        },
        {
          kind: "steps",
          items: [
            "Se calcula la rebaja: $15\\%$ de $900 = 135$ €.",
            "Se **resta** al precio antiguo: $900 - 135 = 765$ €.",
          ],
        },
        {
          kind: "warning",
          text: "$135$ € es lo que te **descuentan**, no lo que pagas.",
        },
      ],
      visual: { kind: "anim", scene: "aumento-barra", params: { a: 900, b: 15, sign: "-" } },
    },
    {
      id: "atajo",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale el 1,20?",
          message: "Precio antiguo ($100\\%$) más el aumento ($20\\%$) es el $120\\%$ del antiguo: $1{,}20$.",
        },
        {
          label: "¿Y el 0,85?",
          message: "Si te rebajan el $15\\%$ pagas el $85\\%$ del precio: $0{,}85$.",
        },
      ],
      title: "Un atajo: multiplicar de una vez",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Aumento del 20 %",
            text: "Pasas a pagar el $120\\%$.",
            math: ["460 \\cdot 1{,}20 = 552"],
            tone: "key",
          },
          right: {
            title: "Rebaja del 15 %",
            text: "Pasas a pagar el $85\\%$.",
            math: ["900 \\cdot 0{,}85 = 765"],
            tone: "ok",
          },
        },
        {
          kind: "rule",
          title: "Factor de cambio",
          formula: "\\text{precio nuevo} = \\text{precio antiguo} \\cdot \\left(1 \\pm \\dfrac{a}{100}\\right)",
        },
        {
          kind: "warning",
          title: "No se deshace",
          text: "Subir un $20\\%$ y luego bajar un $20\\%$ **no** devuelve el precio original: el segundo porcentaje se calcula sobre una cantidad mayor.",
        },
      ],
    },
    {
      id: "predict-rebaja",
      type: "predict",
      title: "La chaqueta en rebajas",
      question:
        "Una chaqueta de $80\\,€$ está rebajada un $25\\%$. ¿Cuánto hay que pagar por ella?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$60\\,€$" },
        {
          id: "b",
          label: "$20\\,€$",
          incorrectFeedback: "$20\\,€$ es lo que te descuentan ($25\\%$ de $80$), no lo que pagas. Falta restarlo al precio.",
        },
        {
          id: "c",
          label: "$105\\,€$",
          incorrectFeedback: "Has sumado el descuento. En una rebaja el precio **baja**, así que se resta.",
        },
        {
          id: "d",
          label: "$55\\,€$",
          incorrectFeedback: "Has restado $25$ euros directamente: $80 - 25$. El $25\\%$ de $80$ no son $25$ euros, son $20$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      help: [
        {
          label: "¿Qué hago primero?",
          message: "Calcula el $25\\%$ de $80$ (la cuarta parte). Después decide si se suma o se resta.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Una rebaja del $25\\%$ deja el precio por encima de la mitad ($40\\,€$) y por debajo de los $80\\,€$.",
        },
      ],
      explanation: "$25\\%$ de $80 = 20$. Precio final: $80 - 20 = 60\\,€$ (o $80 \\cdot 0{,}75 = 60$).",
    },
    {
      id: "prestamo",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué tengo que devolver?",
          message: "Lo que pidió prestado **más** los intereses. Calcula primero los intereses.",
        },
        {
          label: "Atajo",
          message: "Con un interés del $5\\%$ devuelve el $105\\%$ de la cantidad.",
        },
      ],
      title: "El préstamo",
      question:
        "Rosa pide un préstamo de $4\\,000\\,€$ y el banco le cobra un $5\\%$ de interés. ¿Cuántos euros tendrá que devolver en total? (solo el número)",
      correctAnswers: ["4200", "4 200", "4.200", "4200 €", "4200€"],
      explanation: "Interés: $5\\%$ de $4\\,000 = 200$. A devolver: $4\\,000 + 200 = 4\\,200\\,€$.",
    },
    {
      id: "poblacion",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Sube o baja?",
          message: "La población **disminuye**, así que al final habrá menos habitantes que antes.",
        },
        {
          label: "Un atajo",
          message: "Si baja un $8\\%$, queda el $92\\%$.",
        },
      ],
      title: "La aldea",
      question:
        "Una aldea tenía $250$ habitantes en el último censo y su población ha disminuido un $8\\%$. ¿Cuántos habitantes tiene ahora? (solo el número)",
      correctAnswers: ["230"],
      explanation: "$8\\%$ de $250 = 20$. Población actual: $250 - 20 = 230$ habitantes.",
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
      title: "Rebaja en una blusa",
      question:
        "Marta compra una blusa de $35\\,€$ con un $20\\%$ de rebaja. ¿Cuánto paga, en euros? (solo el número)",
      correctAnswers: ["28", "28 €", "28€", "28,00", "28.00"],
      hint: "Calcula primero cuánto le descuentan y réstalo del precio. O bien: paga el $80\\%$.",
      explanation:
        "Rebaja: $20\\%$ de $35 = 7\\,€$. Paga $35 - 7 = 28\\,€$ (equivale a $0{,}80 \\cdot 35 = 28$). Ojo: $7\\,€$ es el descuento, no lo que paga.",
    },
  ],
};
