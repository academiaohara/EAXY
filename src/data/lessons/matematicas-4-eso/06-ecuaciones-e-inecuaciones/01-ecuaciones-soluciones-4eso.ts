import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesSoluciones4esoLesson: InteractiveLesson = {
  slug: "ecuaciones-soluciones-4eso",
  title: "1. Ecuaciones, identidades y soluciones",
  subtitle: TEMA_4ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "identidad",
      type: "slide",
      help: [
        {
          label: "Cómo distinguirlas",
          message: "Si al simplificar los dos miembros llegas a la **misma expresión**, es una identidad. Si llegas a una condición sobre $x$, es una ecuación.",
        },
        {
          label: "Una ecuación puede no tener solución",
          message: "$x + 1 = x + 2$ no se cumple para ningún valor: es una ecuación **sin solución**. No es una identidad (esas se cumplen siempre).",
        },
      ],
      title: "Identidad o ecuación",
      blocks: [
        {
          kind: "compare",
          left: { title: "Identidad", text: "Cierta para **cualquier** valor de $x$: $3x(x + 5) = 3x^2 + 15x$.", tone: "ok" },
          right: { title: "Ecuación", text: "Cierta solo para **algunos** valores (las soluciones): $3x(x + 5) = 0$ se cumple con $x = 0$ y $x = -5$.", tone: "warn" },
        },
        {
          kind: "text",
          text: "**Resolver** una ecuación es hallar su(s) solución(es) o concluir que no tiene.",
        },
      ],
      visual: { kind: "anim", scene: "ecuacion-identidad" },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [
        {
          label: "Simplifica",
          message: "Desarrolla los dos lados: $3(x - 5) - 2x = x - 15$ da $x - 15 = x - 15$ (identidad); $3(x - 5) = 6$ da $x = 7$ (ecuación).",
        },
        {
          label: "Potencias",
          message: "$2^x \\cdot 2^3 = 2^{x+3}$: si el segundo miembro es $2^{x+3}$ es una identidad; si es $32 = 2^5$, queda $x + 3 = 5$.",
        },
      ],
      title: "¿Identidad o ecuación?",
      question: "Clasifica cada igualdad.",
      groups: [
        { id: "identidad", label: "Identidad", tone: "emerald" },
        { id: "ecuacion", label: "Ecuación", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$3(x - 5) - 2x = x - 15$", group: "identidad" },
        { id: "b", text: "$3(x - 5) = 6$", group: "ecuacion" },
        { id: "c", text: "$2^x \\cdot 2^3 = 2^{x+3}$", group: "identidad" },
        { id: "d", text: "$2^x \\cdot 2^3 = 32$", group: "ecuacion" },
        { id: "f", text: "$(x + 3)^2 = x^2 + 6x + 9$", group: "identidad" },
        { id: "g", text: "$(x + 3)^2 = 9$", group: "ecuacion" },
      ],
      hint: "Una identidad se cumple siempre; una ecuación solo para ciertos valores de $x$.",
    },
    {
      id: "comprobar",
      type: "slide",
      help: [
        {
          label: "Comprobar",
          message: "Una solución se comprueba sustituyendo: los **dos miembros** deben dar el mismo número.",
        },
      ],
      title: "Una solución es un valor que cumple la igualdad",
      blocks: [
        {
          kind: "definition",
          text: "Una **solución** de una ecuación es un valor de la incógnita para el que **los dos miembros valen lo mismo**.",
        },
        {
          kind: "text",
          text: "Se comprueba **sustituyendo** la $x$ en los dos miembros y operando. Si coinciden, es solución; si no, no lo es.",
        },
      ],
      visual: { kind: "anim", scene: "comprobar-solucion" },
    },
    {
      id: "tanteo",
      type: "slide",
      help: [
        {
          label: "Ecuaciones que no sabemos despejar",
          message: "No todas las ecuaciones tienen un método de resolución. Se puede **tantear**: probar valores y ver si nos quedamos cortos o pasados.",
        },
        {
          label: "Acotar",
          message: "Si con $5$ el valor es menor y con $6$ mayor que el objetivo, la solución está entre $5$ y $6$. Se prueba con décimas ($5{,}1$; $5{,}2$…) para afinar.",
        },
      ],
      title: "Resolver por tanteo",
      blocks: [
        {
          kind: "steps",
          title: "Método",
          items: [
            "Prueba valores enteros hasta que el miembro izquierdo **se pase** del objetivo.",
            "La solución está entre el último valor que se queda corto y el primero que se pasa.",
            "Prueba con **décimas** y repite para afinar.",
          ],
        },
      ],
      visual: { kind: "tool", tool: "tanteo-explorador", params: { a: 2, b: 50 }, hint: "Elige x⁴ = 1000 y afina con décimas: ¿entre qué dos valores consecutivos está la solución?" },
    },
    {
      id: "check-cubica",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Prueba",
          message: "$x = 3$: $27 + 5 = 32$. $x = 4$: $64 + 5 = 69$.",
        },
      ],
      title: "Una cúbica por tanteo",
      question: "Encuentra por tanteo una solución de $x^3 + 5 = 69$. (solo el número)",
      correctAnswers: ["4"],
      explanation: "$4^3 + 5 = 64 + 5 = 69$. La solución es $x = 4$.",
    },
    {
      id: "check-exponencial",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Potencias de 3",
          message: "$3^1 = 3$, $3^2 = 9$, $3^3 = 27$, $3^4 = 81$.",
        },
      ],
      title: "Una exponencial",
      question: "Resuelve por tanteo $3^x = 81$. (solo el número)",
      correctAnswers: ["4"],
      explanation: "$3^4 = 81$, luego $x = 4$.",
    },
    {
      id: "check-xx",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Prueba",
          message: "$3^3 = 27$ y $4^4 = 256$.",
        },
      ],
      title: "x elevado a x",
      question: "Resuelve por tanteo $x^x = 256$. (solo el número)",
      correctAnswers: ["4"],
      explanation: "$4^4 = 256$, luego $x = 4$.",
    },
    {
      id: "check-decimas",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Acota",
          message: "$8^4 = 4\\,096$ y $9^4 = 6\\,561$: está entre $8$ y $9$. Prueba $8{,}4$ y $8{,}5$.",
        },
      ],
      title: "Aproximar hasta las décimas",
      question: "La ecuación $x^4 = 5\\,000$ no tiene solución entera. Aproxima por tanteo la solución positiva **por defecto, con una cifra decimal**. (escribe el número con coma)",
      correctAnswers: ["8,4", "8.4"],
      explanation: "$8{,}4^4 \\approx 4\\,978{,}7$ (se queda corto) y $8{,}5^4 \\approx 5\\,220$ (se pasa): la solución está entre $8{,}4$ y $8{,}5$.",
    },
    {
      id: "check-4x",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Entre enteros",
          message: "$4^3 = 64$ y $4^4 = 256$: está entre $3$ y $4$. Prueba $3{,}8$ y $3{,}9$.",
        },
      ],
      title: "Una exponencial sin solución entera",
      question: "Aproxima por tanteo, por defecto y con una cifra decimal, la solución de $4^x = 200$. (escribe el número con coma)",
      correctAnswers: ["3,8", "3.8"],
      explanation: "$4^{3{,}8} \\approx 193{,}6$ (corto) y $4^{3{,}9} \\approx 222{,}9$ (pasado): $x$ está entre $3{,}8$ y $3{,}9$.",
    },
  ],
};
