import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_1_SUBTITLE } from "@/data/lessons/shared";

export const notacionCientificaCcss1Lesson: InteractiveLesson = {
  slug: "notacion-cientifica-ccss1",
  title: "13. Notación científica",
  subtitle: TEMA_CCSS1_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        { label: "Orden de magnitud", message: "El exponente $n$ dice cuántas veces hay que mover la coma. Con $n$ positivo el número es grande; con $n$ negativo, pequeño." },
      ],
      title: "Números muy grandes o muy pequeños",
      blocks: [
        { kind: "rule", title: "Forma de un número en notación científica", formula: "N = a{,}bcd\\ldots \\cdot 10^n,\\qquad 1 \\leq |a{,}bcd\\ldots| < 10" },
        { kind: "steps", items: [
          "Una **sola cifra distinta de cero** en la parte entera.",
          "El resto de las cifras significativas, como parte decimal.",
          "Una **potencia de 10** que da el orden de magnitud.",
        ] },
        { kind: "example", lines: [
          { math: "3{,}45\\cdot 10^{14} = 345\\,000\\,000\\,000\\,000\\quad\\text{(grande)}" },
          { math: "6{,}789\\cdot 10^{-18}\\ \\text{(pequeño)}" },
        ] },
      ],
      visual: { kind: "anim", scene: "notacion-cientifica", params: { dec: "63400000000" } },
    },
    {
      id: "explora",
      type: "slide",
      help: [{ label: "Qué mirar", message: "Cuenta cuántos lugares recorre la coma: ese número es el exponente." }],
      title: "El exponente mueve la coma",
      blocks: [{ kind: "text", text: "Cambia la mantisa y el exponente. Con exponente negativo aparecen ceros tras la coma; con positivo, ceros al final." }],
      visual: { kind: "tool", tool: "notacion-explorador", params: { a: 150, b: 3 }, hint: "Fija el exponente en 6 y en −6. ¿Qué prefijo marca la herramienta?" },
    },
    {
      id: "check-escribir",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Mueve la coma hasta dejar una sola cifra distinta de cero a su izquierda y cuenta los lugares." }],
      title: "Escribir en notación científica",
      question: "¿Cómo se escribe $0{,}00000452$ en notación científica?",
      choices: [
        { id: "a", label: "$4{,}52\\cdot 10^{-6}$" },
        { id: "b", label: "$4{,}52\\cdot 10^{6}$", incorrectFeedback: "El número es menor que $1$, así que el exponente es negativo." },
        { id: "c", label: "$45{,}2\\cdot 10^{-7}$", incorrectFeedback: "La parte entera debe tener una sola cifra: $45{,}2$ no vale." },
        { id: "d", label: "$4{,}52\\cdot 10^{-5}$", incorrectFeedback: "La coma salta $6$ lugares hasta quedar tras el $4$, no $5$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La coma recorre $6$ lugares hacia la derecha ($0{,}000004\\,52 \\to 4{,}52$): exponente $-6$.",
    },
    {
      id: "producto-cociente",
      type: "slide",
      help: [
        { label: "Ajuste final", message: "Si la mantisa del resultado se sale de $[1, 10)$, se corrige moviendo la coma y sumando o restando al exponente." },
      ],
      title: "Producto y cociente",
      blocks: [
        { kind: "rule", title: "Se operan por separado las mantisas y las potencias de 10", text: "Producto: mantisas **multiplicadas** y exponentes **sumados**. Cociente: mantisas **divididas** y exponentes **restados**. Después, si hace falta, se recoloca la coma." },
        { kind: "example", lines: [
          { math: "(3{,}7\\cdot 10^{6})(4{,}2\\cdot 10^{8}) = 15{,}54\\cdot 10^{14} = 1{,}554\\cdot 10^{15}" },
          { math: "\\dfrac{4{,}8\\cdot 10^{-5}}{6{,}9\\cdot 10^{-8}} = 0{,}6957\\cdot 10^{3} = 6{,}957\\cdot 10^{2}" },
        ] },
      ],
      visual: { kind: "anim", scene: "notacion-operacion", params: { nop: "mul", terms: ["3,7", "4,2"], a: 6, b: 8 } },
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$8{,}91 \\cdot 3{,}67 = 32{,}6997$. Hay que dejar una sola cifra entera." }],
      title: "El exponente del producto",
      question: "Calcula $(8{,}91\\cdot 10^{-3})\\cdot(3{,}67\\cdot 10^{11})$ y escríbelo en notación científica. ¿Qué exponente de $10$ resulta? (solo el número)",
      correctAnswers: ["9"],
      explanation: "$8{,}91\\cdot 3{,}67 = 32{,}6997$ y $10^{-3}\\cdot 10^{11} = 10^{8}$. Queda $32{,}6997\\cdot 10^{8} = 3{,}26997\\cdot 10^{9}$.",
    },
    {
      id: "suma",
      type: "slide",
      help: [
        { label: "Por qué igualar", message: "Solo se pueden sumar cantidades expresadas en la misma unidad, igual que no sumas km con m sin convertir. Aquí la «unidad» es la potencia de 10." },
      ],
      title: "Suma y resta",
      blocks: [
        { kind: "steps", title: "Hay que igualar los exponentes", items: [
          "Se escriben los dos sumandos con la **misma potencia** de 10 (la mayor).",
          "Se saca factor común la potencia y se suman las mantisas.",
          "Se recoloca la coma si hace falta.",
        ] },
        { kind: "example", lines: [
          { math: "3{,}7\\cdot 10^{9} + 4{,}2\\cdot 10^{12} = 0{,}0037\\cdot 10^{12} + 4{,}2\\cdot 10^{12}" },
          { math: "= 4{,}2037\\cdot 10^{12}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Pasa $3\\cdot 10^3$ a $0{,}3\\cdot 10^4$ y suma las mantisas." }],
      title: "Sumar con distinto exponente",
      question: "Calcula $5{,}2\\cdot 10^{4} + 3\\cdot 10^{3}$.",
      choices: [
        { id: "a", label: "$5{,}5\\cdot 10^{4}$" },
        { id: "b", label: "$8{,}2\\cdot 10^{7}$", incorrectFeedback: "Has sumado las mantisas y los exponentes. Los exponentes se suman al **multiplicar**, no al sumar." },
        { id: "c", label: "$8{,}2\\cdot 10^{4}$", incorrectFeedback: "Has sumado $5{,}2 + 3$ sin igualar exponentes: $3\\cdot 10^{3}$ es $0{,}3\\cdot 10^{4}$." },
        { id: "d", label: "$5{,}23\\cdot 10^{4}$", incorrectFeedback: "$3\\cdot 10^{3}$ es $0{,}3\\cdot 10^{4}$, no $0{,}03\\cdot 10^{4}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$52\\,000 + 3\\,000 = 55\\,000 = 5{,}5\\cdot 10^{4}$.",
    },
  ],
};
