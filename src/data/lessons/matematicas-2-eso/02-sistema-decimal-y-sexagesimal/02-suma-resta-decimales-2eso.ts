import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaDecimales2esoLesson: InteractiveLesson = {
  slug: "suma-resta-decimales-2eso",
  title: "2. Sumas y restas de números decimales",
  subtitle: TEMA_2ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma-columna",
      type: "slide",
      help: [
        {
          label: "Por qué la coma bajo la coma",
          message: "Si la coma queda alineada, cada cifra queda bajo otra del mismo orden: décimas con décimas, centésimas con centésimas.",
        },
        {
          label: "Los ceros",
          message: "$3{,}1 = 3{,}10$: añadir ceros a la derecha de la parte decimal no cambia el valor y deja las columnas completas.",
        },
      ],
      title: "Sumar en columna",
      blocks: [
        {
          kind: "story",
          text: "Juan tiene **4,35 €**, María **3,1 €**, Carla **6,22 €** y Sergio **5,3 €**. ¿Cuánto dinero tienen en total?",
        },
        {
          kind: "steps",
          items: [
            "Coloca los números en columna: **coma bajo coma**, unidades con unidades, décimas con décimas…",
            "Rellena con **ceros** los huecos de la derecha.",
            "Suma como si fueran naturales, de derecha a izquierda.",
            "Pon la coma del resultado **justo debajo** de las otras.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "decimal-columna", params: { op: "+", terms: ["4,35", "3,1", "6,22", "5,3"] } },
    },
    {
      id: "resta-columna",
      type: "slide",
      help: [
        {
          label: "Sin ceros no hay de dónde restar",
          message: "En $18{,}6 - 7{,}45$, al $18{,}6$ le falta la cifra de las centésimas. Se escribe $18{,}60$ para poder restar.",
        },
        {
          label: "Comprueba",
          message: "Suma el resultado y el sustraendo: debes recuperar el minuendo.",
        },
      ],
      title: "Restar en columna",
      blocks: [
        {
          kind: "text",
          text: "Se hace igual que la suma: **coma bajo coma** y ceros para completar. Aquí los ceros son **imprescindibles**.",
        },
        {
          kind: "example",
          lines: [
            { math: "18{,}6 - 7{,}45 = 18{,}60 - 7{,}45 = 11{,}15" },
            { math: "11{,}15 + 7{,}45 = 18{,}60", note: "comprobación" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "decimal-columna", params: { op: "-", terms: ["18,6", "7,45"] } },
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      help: [
        {
          label: "Alinea",
          message: "Escribe $2{,}5$ como $2{,}50$ y $0{,}75$ como están: así quedan alineadas las centésimas.",
        },
      ],
      title: "Suma de céntimos",
      question: "Calcula $2{,}5 + 0{,}75 + 10{,}2$ (escribe el resultado con coma)",
      correctAnswers: ["13,45", "13.45"],
      explanation: "$2{,}50 + 0{,}75 + 10{,}20 = 13{,}45$.",
    },
    {
      id: "check-resta",
      type: "predict",
      help: [
        {
          label: "Estima primero",
          message: "Redondea: $20 - 5 = 15$. El resultado debe quedar cerca de $15$.",
        },
        {
          label: "Ceros",
          message: "$20 = 20{,}00$ para poder restar los céntimos.",
        },
      ],
      title: "El cambio",
      question: "Pagas con un billete de $20$ € una compra de $14{,}35$ €. ¿Cuánto te devuelven?",
      mode: "choice",
      choices: [
        { id: "a", label: "$5{,}65$ €" },
        {
          id: "b",
          label: "$6{,}65$ €",
          incorrectFeedback: "Se ha perdido una unidad al restar: comprueba $14{,}35 + 6{,}65 = 21$.",
        },
        {
          id: "c",
          label: "$5{,}75$ €",
          incorrectFeedback: "Comprueba: $14{,}35 + 5{,}75 = 20{,}10$, no $20$.",
        },
        {
          id: "d",
          label: "$6{,}35$ €",
          incorrectFeedback: "Has restado las centésimas al revés ($5 - 0 = 5$, y no $0 - 5$ con llevada). Comprueba sumando.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$20{,}00 - 14{,}35 = 5{,}65$ €. Comprobación: $14{,}35 + 5{,}65 = 20{,}00$.",
    },
  ],
};
