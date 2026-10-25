import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_4_SUBTITLE } from "@/data/lessons/shared";

export const parteEnteraCcss1Lesson: InteractiveLesson = {
  slug: "parte-entera-ccss1",
  title: "8. Función parte entera",
  subtitle: TEMA_CCSS1_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Idea", message: "La parte entera de x es el entero más próximo por debajo (o igual). En los negativos, «baja»: [−0,3] = −1." }],
      title: "Parte entera de un número",
      blocks: [
        { kind: "definition", text: "La **parte entera** de $x$, $[x]$, es el mayor número entero que no supera a $x$: $[x] = \\max\\{k \\in \\mathbb{Z} : k \\leq x\\}$." },
        {
          kind: "example",
          title: "Valores",
          lines: [
            { math: "[2] = 2", note: "un entero es su propia parte entera" },
            { math: "[2{,}3] = 2 \\qquad [0{,}3] = 0", note: "se «tira» la parte decimal" },
            { math: "[-0{,}3] = -1", note: "con negativos, el entero anterior (−1 ≤ −0,3)" },
          ],
        },
        { kind: "warning", text: "$[-2{,}7] = -3$, **no** $-2$. La parte entera no es «quitar los decimales» cuando el número es negativo." },
      ],
      visual: { kind: "tool", tool: "parte-entera-explorador", initial: [-3], hint: "Mueve x: la parte entera salta en cada entero. El punto relleno está en el tramo; el hueco, no." },
    },
    {
      id: "check-negativo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El mayor entero que no supera a $-2{,}7$ es $-3$." }],
      title: "Parte entera de un negativo",
      question: "Calcula $[-2{,}7]$. (solo el número, con su signo)",
      correctAnswers: ["-3", "−3"],
      explanation: "$-3 \\leq -2{,}7 < -2$, luego $[-2{,}7] = -3$.",
    },
    {
      id: "grafica",
      type: "slide",
      help: [{ label: "Idea", message: "La gráfica es una escalera: en cada intervalo [k, k+1) vale k. Hay saltos de una unidad en los enteros." }],
      title: "Una función escalonada",
      blocks: [
        { kind: "text", text: "En cada intervalo $[k, k + 1)$ la función vale $k$. La gráfica es una **escalera**: tramos horizontales, con el extremo izquierdo cerrado (●) y el derecho abierto (○), y un **salto de una unidad** en cada entero." },
        { kind: "text", text: "Es una función definida a trozos con infinitos trozos. No es continua en ningún entero." },
      ],
      visual: { kind: "tool", tool: "trozos-explorador", params: { a: 0, b: 2 }, hint: "Las funciones a trozos pueden «saltar» donde cambia la fórmula, como ocurre en cada entero con la parte entera." },
    },
    {
      id: "tarifas",
      type: "slide",
      help: [{ label: "Idea", message: "En un aparcamiento se paga por hora o fracción: se redondea al entero superior, el «techo». Es la parte entera de x más 1, salvo si x es entero." }],
      title: "Tarifas por tramos: el redondeo hacia arriba",
      blocks: [
        { kind: "text", text: "Muchas tarifas cobran «por hora o fracción»: $2$ h $15$ min se paga como $3$ h. Eso es el **redondeo por exceso** (el techo, $\\lceil x \\rceil$): el menor entero que no es menor que $x$." },
        { kind: "rule", title: "Relación con la parte entera", text: "Si $x$ no es entero, $\\lceil x \\rceil = [x] + 1$; si es entero, $\\lceil x \\rceil = [x] = x$." },
      ],
    },
    {
      id: "check-parking",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$3$ h $10$ min $= 3{,}17$ h: se cobra por $4$ horas." }],
      title: "Aparcamiento",
      question: "Un aparcamiento cobra $1{,}50$ € por hora o fracción. ¿Cuántos euros se pagan por $3$ h $10$ min? (solo el número)",
      correctAnswers: ["6", "6,00", "6.00"],
      explanation: "$\\lceil 3{,}17 \\rceil = 4$ horas cobradas: $4 \\cdot 1{,}50 = 6$ €.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "«Cumplidos» o «completos» se redondea hacia abajo; «necesarios» o «empezados», hacia arriba." }],
      title: "¿Redondeo hacia abajo o hacia arriba?",
      question: "Clasifica cada situación según el redondeo que modela.",
      groups: [
        { id: "abajo", label: "Parte entera (hacia abajo)", tone: "cobalt" },
        { id: "arriba", label: "Techo (hacia arriba)", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Edad en años cumplidos", group: "abajo" },
        { id: "b", text: "Autobuses necesarios para $130$ personas (50 plazas cada uno)", group: "arriba" },
        { id: "c", text: "Euros completos que da una máquina de cambio", group: "abajo" },
        { id: "d", text: "Horas de parking «o fracción»", group: "arriba" },
      ],
      hint: "¿Se cuenta lo que ya está completo o lo que hace falta aunque sea a medias?",
    },
  ],
};
