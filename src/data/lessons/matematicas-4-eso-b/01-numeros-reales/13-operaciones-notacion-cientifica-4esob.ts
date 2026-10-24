import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const operacionesNotacionCientifica4esobLesson: InteractiveLesson = {
  slug: "operaciones-notacion-cientifica-4esob",
  title: "13. Operar con notación científica",
  subtitle: TEMA_4ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto-cociente",
      type: "slide",
      help: [
        {
          label: "Separar mantisas y potencias",
          message: "Por la propiedad conmutativa, $(a \\cdot 10^m)(b \\cdot 10^n) = (a \\cdot b) \\cdot (10^m \\cdot 10^n)$.",
        },
        {
          label: "Normalizar",
          message: "Si la mantisa del resultado se sale de $[1, 10)$, se corre la coma y se compensa el exponente: $13{,}4 \\cdot 10^{4} = 1{,}34 \\cdot 10^{5}$.",
        },
      ],
      title: "Producto: mantisas por un lado, potencias por otro",
      blocks: [
        {
          kind: "rule",
          title: "Producto y cociente",
          formula: "(a \\cdot 10^m)(b \\cdot 10^n) = (a \\cdot b) \\cdot 10^{m+n} \\qquad \\dfrac{a \\cdot 10^m}{b \\cdot 10^n} = \\dfrac{a}{b} \\cdot 10^{m-n}",
        },
        {
          kind: "warning",
          text: "Tras operar, comprueba que la mantisa está entre $1$ y $10$. Si no, **ajusta el exponente**.",
        },
      ],
      visual: { kind: "anim", scene: "notacion-operacion", params: { nop: "mul", terms: ["4,5", "2,1"], a: 12, b: -8 } },
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Multiplica mantisas",
          message: "$2 \\cdot 1{,}5 = 3$ y $10^5 \\cdot 10^4 = 10^9$.",
        },
      ],
      title: "Un producto",
      question: "Calcula $(2 \\cdot 10^{5}) \\cdot (1{,}5 \\cdot 10^{4})$ y da el resultado en notación científica.",
      choices: [
        { id: "a", label: "$3 \\cdot 10^{9}$" },
        { id: "b", label: "$3 \\cdot 10^{20}$", incorrectFeedback: "Los exponentes se **suman** ($5 + 4 = 9$), no se multiplican." },
        { id: "c", label: "$3{,}5 \\cdot 10^{9}$", incorrectFeedback: "Las mantisas se **multiplican** ($2 \\cdot 1{,}5 = 3$), no se suman." },
        { id: "d", label: "$30 \\cdot 10^{8}$", incorrectFeedback: "Es igual, pero la mantisa $30$ no está entre $1$ y $10$: no es notación científica." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(2 \\cdot 1{,}5) \\cdot 10^{5+4} = 3 \\cdot 10^{9}$.",
    },
    {
      id: "cociente",
      type: "slide",
      help: [
        {
          label: "Restar exponentes",
          message: "Con $10^m : 10^n = 10^{m-n}$, un exponente negativo en el divisor **suma**: $10^{8} : 10^{-2} = 10^{10}$.",
        },
      ],
      title: "Cociente: se restan los exponentes",
      blocks: [
        {
          kind: "text",
          text: "En el cociente se **dividen las mantisas** y se **restan los exponentes**. Cuidado con los signos cuando el divisor tiene exponente negativo.",
        },
      ],
      visual: { kind: "anim", scene: "notacion-operacion", params: { nop: "div", terms: ["6", "1,6"], a: 8, b: -2 } },
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Mantisa",
          message: "$6 : 1{,}6 = 3{,}75$.",
        },
      ],
      title: "Mantisa del cociente",
      question: "En $(6 \\cdot 10^{8}) : (1{,}6 \\cdot 10^{-2})$, ¿cuál es la mantisa del resultado? (escribe el número con coma)",
      correctAnswers: ["3,75", "3.75"],
      explanation: "$6 : 1{,}6 = 3{,}75$ y $10^{8} : 10^{-2} = 10^{10}$: $3{,}75 \\cdot 10^{10}$.",
    },
    {
      id: "potencia",
      type: "slide",
      help: [
        {
          label: "Potencia de una potencia",
          message: "$(10^{3})^{2} = 10^{3 \\cdot 2} = 10^{6}$: los exponentes se multiplican.",
        },
      ],
      title: "Potencias",
      blocks: [
        {
          kind: "rule",
          formula: "(a \\cdot 10^{n})^{k} = a^{k} \\cdot 10^{n \\cdot k}",
        },
      ],
      visual: { kind: "anim", scene: "notacion-operacion", params: { nop: "pow", terms: ["3"], a: 3, c: 2 } },
    },
    {
      id: "suma",
      type: "slide",
      help: [
        {
          label: "Por qué igualar",
          message: "Solo se pueden sumar cantidades expresadas **en la misma unidad**. Aquí la «unidad» es la potencia de $10$: hay que expresarlas con el mismo exponente.",
        },
        {
          label: "Mejor el mayor",
          message: "Conviene pasar al **mayor exponente**: así la mantisa del otro se hace menor y es más fácil sumar sin errores.",
        },
      ],
      title: "Sumar y restar: igualar exponentes",
      blocks: [
        {
          kind: "text",
          text: "Sumar o restar exige el **mismo exponente**. Se pasa la de exponente menor al mayor (la coma se corre) y después se suman o restan las mantisas.",
        },
        {
          kind: "warning",
          text: "No se suman exponentes: $10^{-3} + 10^{-4} \\neq 10^{-7}$. Se iguala el exponente y se suman **solo las mantisas**.",
        },
      ],
      visual: { kind: "anim", scene: "notacion-operacion", params: { nop: "sum", terms: ["6", "5"], a: -3, b: -4 } },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Iguala a 10⁻³",
          message: "$5 \\cdot 10^{-4} = 0{,}5 \\cdot 10^{-3}$. Entonces $6 + 0{,}5 = 6{,}5$.",
        },
      ],
      title: "Una suma",
      question: "Calcula $6 \\cdot 10^{-3} + 5 \\cdot 10^{-4}$.",
      choices: [
        { id: "a", label: "$6{,}5 \\cdot 10^{-3}$" },
        { id: "b", label: "$1{,}1 \\cdot 10^{-6}$", incorrectFeedback: "No se suman las mantisas y los exponentes a la vez. Hay que igualar los exponentes primero." },
        { id: "c", label: "$1{,}1 \\cdot 10^{-3}$", incorrectFeedback: "Se han sumado las mantisas ($6 + 5$) sin igualar los exponentes: $5 \\cdot 10^{-4}$ es solo $0{,}5 \\cdot 10^{-3}$." },
        { id: "d", label: "$6{,}05 \\cdot 10^{-3}$", incorrectFeedback: "$5 \\cdot 10^{-4}$ equivale a $0{,}5 \\cdot 10^{-3}$, no a $0{,}05 \\cdot 10^{-3}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$5 \\cdot 10^{-4} = 0{,}5 \\cdot 10^{-3}$, luego $6 \\cdot 10^{-3} + 0{,}5 \\cdot 10^{-3} = 6{,}5 \\cdot 10^{-3}$.",
    },
    {
      id: "calculadora",
      type: "slide",
      help: [
        {
          label: "Tecla EXP",
          message: "En las calculadoras científicas la tecla **×10ˣ** (o **EXP**) escribe «por diez elevado a». Para $4{,}5 \\cdot 10^{12}$ se teclea $4{,}5$, ×10ˣ, $12$.",
        },
        {
          label: "Resultados enormes",
          message: "Si el resultado no cabe en pantalla, la calculadora lo da en notación científica: $5\\,000^3$ aparece como $1{,}25 \\cdot 10^{11}$.",
        },
      ],
      title: "Con la calculadora",
      blocks: [
        {
          kind: "steps",
          title: "$(4{,}5 \\cdot 10^{12}) \\cdot (2{,}1 \\cdot 10^{-8})$",
          items: [
            "Escribe $4{,}5$, pulsa la tecla ×10ˣ y teclea $12$.",
            "Pulsa ×, escribe $2{,}1$, la tecla ×10ˣ y el exponente $-8$ (con la tecla (−)).",
            "Pulsa $=$: la pantalla da $9{,}45 \\cdot 10^{4}$ (=94 500).",
          ],
        },
        {
          kind: "warning",
          text: "En una **división** de varios factores en el denominador, usa paréntesis o guarda el denominador en memoria para no dividir solo entre el primero.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-calc",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Usa la calculadora",
          message: "$(4{,}5 \\cdot 10^{12}) \\cdot (8{,}37 \\cdot 10^{-4}) = 37{,}665 \\cdot 10^{8} = 3{,}7665 \\cdot 10^{9}$.",
        },
      ],
      title: "Con tres cifras significativas",
      question: "Calcula $(4{,}5 \\cdot 10^{12}) \\cdot (8{,}37 \\cdot 10^{-4})$ y da la **mantisa** con tres cifras significativas. (escribe el número con coma)",
      correctAnswers: ["3,77", "3.77"],
      explanation: "$4{,}5 \\cdot 8{,}37 = 37{,}665$, y $10^{12} \\cdot 10^{-4} = 10^{8}$: $37{,}665 \\cdot 10^{8} = 3{,}7665 \\cdot 10^{9}$. A tres cifras significativas, $3{,}77 \\cdot 10^{9}$.",
    },
  ],
};
