import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const problemasSistemas3esoLesson: InteractiveLesson = {
  slug: "problemas-sistemas-3eso",
  title: "5. Problemas con sistemas de ecuaciones",
  subtitle: TEMA_3ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pasos",
      type: "slide",
      help: [
        {
          label: "Una ecuación por relación",
          message: "Cada dato del enunciado que relaciona las incógnitas da una ecuación. Con dos incógnitas necesitas dos relaciones.",
        },
        {
          label: "Interpretar",
          message: "La solución debe cumplir el enunciado: un número de preguntas no puede ser decimal ni negativo.",
        },
      ],
      title: "Cuatro pasos para plantear un problema",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Identifica** los elementos y nombra las **incógnitas**.",
            "**Expresa** con ecuaciones las relaciones del enunciado.",
            "**Resuelve** el sistema.",
            "**Interpreta** la solución y ajústala al enunciado.",
          ],
        },
        {
          kind: "example",
          title: "Test de 50 preguntas: +1 por acierto y −0,5 por fallo; nota 24,5",
          lines: [
            { math: "x = \\text{aciertos},\\ y = \\text{fallos}" },
            { math: "x + y = 50 \\qquad x - 0{,}5y = 24{,}5" },
            { math: "x = 50 - y \\Rightarrow 50 - 1{,}5y = 24{,}5 \\Rightarrow y = 17,\\ x = 33" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "sistema-test" },
    },
    {
      id: "porcentajes",
      type: "slide",
      help: [
        {
          label: "Precio con descuento",
          message: "Con un $18\\,\\%$ de descuento pagas el $82\\,\\%$ del precio original, es decir, $0{,}82x$.",
        },
        {
          label: "Dos relaciones",
          message: "La primera ecuación habla de precios originales (suman $70$); la segunda, de lo que se paga (suma $55{,}72$).",
        },
      ],
      title: "Un sistema con porcentajes",
      blocks: [
        {
          kind: "example",
          title: "Camiseta (−18 %) y pantalón (−22 %): 70 € de precio original, 55,72 € pagados",
          lines: [
            { math: "x = \\text{camiseta},\\ y = \\text{pantalón}" },
            { math: "x + y = 70 \\qquad 0{,}82x + 0{,}78y = 55{,}72" },
            { math: "0{,}82(70 - y) + 0{,}78y = 55{,}72 \\Rightarrow -0{,}04y = -1{,}68 \\Rightarrow y = 42" },
            { math: "x = 28\\ \\text{€ (camiseta)},\\ y = 42\\ \\text{€ (pantalón)}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-numeros",
      type: "fill_in_blank",
      help: [
        {
          label: "Dos ecuaciones",
          message: "$x + y = 31$ y $x - y = 5$. Despeja $x = 31 - y$.",
        },
      ],
      title: "Suma y diferencia",
      question: "La suma de dos números es $31$ y su diferencia es $5$. Escribe los dos números separados por coma, de mayor a menor.",
      correctAnswers: ["18,13", "18, 13", "18 y 13"],
      explanation: "$x + y = 31$, $x - y = 5$: sumando, $2x = 36$, $x = 18$ e $y = 13$.",
    },
    {
      id: "check-hamburguesas",
      type: "fill_in_blank",
      help: [
        {
          label: "Plantea",
          message: "$3x + 2y = 6{,}3$ y $2x + 4y = 6{,}6$, con $x$ el precio de una hamburguesa e $y$ el de un refresco.",
        },
      ],
      title: "Hamburguesas y refrescos",
      question: "Daniel pagó $6{,}3$ € por 3 hamburguesas y 2 refrescos, y otro día $6{,}6$ € por 2 hamburguesas y 4 refrescos. Escribe el precio de una hamburguesa y el de un refresco separados por punto y coma (por ejemplo 2;1,2).",
      correctAnswers: ["1,5;0,9", "1.5;0.9", "1,5 ; 0,9", "1,5 y 0,9"],
      explanation: "De $3x + 2y = 6{,}3$ y $2x + 4y = 6{,}6$: $x = 1{,}5$ € e $y = 0{,}9$ €. Comprobación: $4{,}5 + 1{,}8 = 6{,}3$ y $3 + 3{,}6 = 6{,}6$.",
    },
    {
      id: "check-bombones",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Bombones por caja",
          message: "Una caja de $1$ docena tiene $12$ bombones y una de $2$ docenas, $24$: $12x + 24y = 1\\,200$ y $x + y = 60$.",
        },
      ],
      title: "Cajas de bombones",
      question: "Se empaquetan $1\\,200$ bombones en cajas de una docena y de dos docenas, y se usan $60$ cajas en total. ¿Cuántas cajas son de dos docenas? (solo el número)",
      correctAnswers: ["40"],
      explanation: "$x + y = 60$ y $12x + 24y = 1\\,200$ (o $x + 2y = 100$): restando, $y = 40$ y $x = 20$.",
    },
  ],
};
