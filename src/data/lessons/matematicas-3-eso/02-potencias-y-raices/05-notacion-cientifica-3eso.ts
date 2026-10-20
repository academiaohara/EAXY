import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const notacionCientifica3esoLesson: InteractiveLesson = {
  slug: "notacion-cientifica-3eso",
  title: "5. Notación científica",
  subtitle: TEMA_3ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "forma",
      type: "slide",
      help: [
        {
          label: "Para qué sirve",
          message: "Con $3{,}56 \\cdot 10^{13}$ se ve a simple vista el orden de magnitud sin contar trece cifras.",
        },
        {
          label: "Signo del exponente",
          message: "Exponente positivo: número grande. Exponente negativo: número pequeño, entre $0$ y $1$.",
        },
      ],
      title: "Cómo se escribe un número en notación científica",
      blocks: [
        {
          kind: "definition",
          text: "Un número está en **notación científica** cuando se escribe como $N = a{,}bcd\\dots \\cdot 10^n$, con **una sola cifra entera distinta de cero** y $n$ entero.",
        },
        {
          kind: "facts",
          items: [
            { tex: "3{,}56 \\cdot 10^{13}", label: "= 35 600 000 000 000" },
            { tex: "9{,}207 \\cdot 10^{-16}", label: "= 0,0000000000000009207" },
          ],
        },
        {
          kind: "compare",
          left: { title: "Exponente positivo", text: "Número **grande**.", math: ["10^{6} = 1\\,000\\,000"], tone: "ok" },
          right: { title: "Exponente negativo", text: "Número **pequeño**.", math: ["10^{-3} = 0{,}001"], tone: "info" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "pasar",
      type: "slide",
      help: [
        {
          label: "Cuenta los saltos",
          message: "El exponente es el número de lugares que se mueve la coma: positivo si va a la izquierda y negativo si va a la derecha.",
        },
        {
          label: "Al revés",
          message: "Para escribir $2{,}3 \\cdot 10^5$ con todas sus cifras, mueve la coma $5$ lugares a la derecha rellenando con ceros: $230\\,000$.",
        },
      ],
      title: "Pasar a notación científica",
      blocks: [
        {
          kind: "steps",
          items: [
            "Coloca la **coma** detrás de la primera cifra distinta de cero.",
            "Cuenta cuántos lugares se ha movido: ese es el **exponente**.",
            "Es **positivo** si el número era grande y **negativo** si era menor que 1.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "35\\,600\\,000 = 3{,}56 \\cdot 10^{7}" },
            { math: "0{,}0000092 = 9{,}2 \\cdot 10^{-6}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "notacion-cientifica", params: { dec: "35600000" } },
    },
    {
      id: "operar",
      type: "slide",
      help: [
        {
          label: "Por qué se suman",
          message: "$10^a \\cdot 10^b = 10^{a+b}$: es la propiedad del producto de potencias de la misma base.",
        },
        {
          label: "Y si no queda en forma científica",
          message: "Si la parte decimal sale $10$ o más, desplaza la coma y ajusta el exponente: $12 \\cdot 10^{4} = 1{,}2 \\cdot 10^{5}$.",
        },
      ],
      title: "Operar con notación científica",
      blocks: [
        {
          kind: "compare",
          left: { title: "Producto y cociente", text: "Se operan las partes decimales y las potencias de 10 por separado.", math: ["(a \\cdot 10^m)(b \\cdot 10^n) = ab \\cdot 10^{m+n}"], tone: "ok" },
          right: { title: "Suma y resta", text: "Hay que igualar antes los exponentes.", math: ["a \\cdot 10^n + b \\cdot 10^n = (a + b) \\cdot 10^n"], tone: "info" },
        },
        {
          kind: "example",
          lines: [
            { math: "(2 \\cdot 10^{5}) \\cdot (3 \\cdot 10^{12}) = 6 \\cdot 10^{17}" },
            { math: "\\dfrac{8 \\cdot 10^{12}}{2 \\cdot 10^{17}} = 4 \\cdot 10^{-5}" },
            { math: "3{,}2 \\cdot 10^{8} + 7 \\cdot 10^{7} = 32 \\cdot 10^{7} + 7 \\cdot 10^{7} = 3{,}9 \\cdot 10^{8}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-grande",
      type: "predict",
      help: [
        {
          label: "Cuenta lugares",
          message: "Para $27\\,800\\,000$ la coma está tras el último $0$; hay que llevarla detrás del $2$: siete lugares a la izquierda.",
        },
      ],
      title: "Un número grande",
      question: "¿Cómo se escribe $27\\,800\\,000$ en notación científica?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2{,}78 \\cdot 10^{7}$" },
        { id: "b", label: "$27{,}8 \\cdot 10^{6}$", incorrectFeedback: "Debe haber una sola cifra entera: $27{,}8$ tiene dos." },
        { id: "c", label: "$2{,}78 \\cdot 10^{6}$", incorrectFeedback: "La coma se mueve siete lugares, no seis." },
        { id: "d", label: "$2{,}78 \\cdot 10^{-7}$", incorrectFeedback: "El número es grande: el exponente es positivo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La coma pasa de detrás del último cero a detrás del $2$: siete lugares a la izquierda, $2{,}78 \\cdot 10^{7}$.",
    },
    {
      id: "check-pequeno",
      type: "fill_in_blank",
      help: [
        {
          label: "A la derecha",
          message: "En $0{,}00057$ la coma debe quedar detrás del $5$: cuatro lugares a la derecha.",
        },
      ],
      title: "Un número pequeño",
      question: "$0{,}00057 = 5{,}7 \\cdot 10^{n}$. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["-4"],
      explanation: "La coma se desplaza cuatro lugares a la derecha: el exponente es $-4$.",
    },
    {
      id: "check-todas-cifras",
      type: "fill_in_blank",
      help: [
        {
          label: "Mueve la coma",
          message: "Exponente $-4$: mueve la coma cuatro lugares a la izquierda, rellenando con ceros.",
        },
      ],
      title: "Con todas sus cifras",
      question: "Escribe $6{,}8 \\cdot 10^{-4}$ con todas sus cifras.",
      correctAnswers: ["0,00068", "0.00068"],
      explanation: "$6{,}8 \\cdot 10^{-4} = 0{,}00068$.",
    },
    {
      id: "check-producto",
      type: "predict",
      help: [
        {
          label: "Separa las partes",
          message: "$(2{,}5 \\cdot 8) \\cdot 10^{7+3}$. Ojo: $2{,}5 \\cdot 8 = 20$ y no está en forma científica.",
        },
      ],
      title: "Producto en notación científica",
      question: "Calcula $(2{,}5 \\cdot 10^{7}) \\cdot (8 \\cdot 10^{3})$ y expresa el resultado en notación científica.",
      mode: "choice",
      choices: [
        { id: "a", label: "$2 \\cdot 10^{11}$" },
        { id: "b", label: "$20 \\cdot 10^{10}$", incorrectFeedback: "Vale lo mismo, pero no está en notación científica: la parte entera debe tener una sola cifra." },
        { id: "c", label: "$2 \\cdot 10^{10}$", incorrectFeedback: "Al pasar $20$ a $2$ hay que sumar $1$ al exponente." },
        { id: "d", label: "$10{,}5 \\cdot 10^{10}$", incorrectFeedback: "Se han sumado los números en vez de multiplicarlos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2{,}5 \\cdot 8 = 20$ y $10^7 \\cdot 10^3 = 10^{10}$: $20 \\cdot 10^{10} = 2 \\cdot 10^{11}$.",
    },
  ],
};
