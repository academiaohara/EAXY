import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const conicas3esoLesson: InteractiveLesson = {
  slug: "conicas-3eso",
  title: "4. Las cónicas como lugares geométricos",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "secciones",
      type: "slide",
      help: [
        {
          label: "Cortar un cono",
          message: "Si cortas un cono con un plano en distintas posiciones obtienes cuatro curvas diferentes: son las cónicas.",
        },
        {
          label: "Historia",
          message: "Apolonio (siglo III a. C.) escribió un tratado sobre ellas; siglos después se supo que los planetas orbitan en elipses.",
        },
      ],
      title: "Cuatro curvas al cortar un cono",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\text{Circunferencia}", label: "plano perpendicular al eje" },
            { tex: "\\text{Elipse}", label: "plano inclinado respecto al eje" },
            { tex: "\\text{Parábola}", label: "plano paralelo a una generatriz" },
            { tex: "\\text{Hipérbola}", label: "plano que corta a dos conos opuestos" },
          ],
        },
        {
          kind: "text",
          text: "Las cuatro curvas se llaman **cónicas** y todas pueden definirse como **lugares geométricos**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "elipse",
      type: "slide",
      help: [
        {
          label: "El truco del jardinero",
          message: "Para dibujar una elipse se clavan dos estacas, se ata una cuerda larga a ambas y se marca la línea con una punta manteniendo la cuerda tensa.",
        },
        {
          label: "Constante",
          message: "La longitud de la cuerda es la constante: $PF + PF' = d$.",
        },
      ],
      title: "Elipse",
      blocks: [
        {
          kind: "rule",
          text: "Dados dos puntos fijos, los **focos** $F$ y $F'$, y una distancia $d$, la **elipse** es el lugar geométrico de los puntos $P$ cuya **suma** de distancias a los focos es $d$.",
          formula: "PF + PF' = d",
        },
      ],
      visual: { kind: "anim", scene: "conica-lugar", params: { conica: "elipse" } },
    },
    {
      id: "parabola",
      type: "slide",
      help: [
        {
          label: "Foco y directriz",
          message: "Un punto y una recta: la parábola es el lugar de los puntos que están igual de lejos de ambos.",
        },
        {
          label: "Usos",
          message: "Las antenas parabólicas concentran las señales en el foco gracias a esta propiedad.",
        },
      ],
      title: "Parábola",
      blocks: [
        {
          kind: "rule",
          text: "Dados un punto $F$, el **foco**, y una recta $d$, la **directriz**, la **parábola** es el lugar geométrico de los puntos que **equidistan** de $F$ y de $d$.",
          formula: "PF = \\text{dist}(P, d)",
        },
      ],
      visual: { kind: "anim", scene: "conica-lugar", params: { conica: "parabola" } },
    },
    {
      id: "hiperbola",
      type: "slide",
      help: [
        {
          label: "Dos ramas",
          message: "La hipérbola tiene dos ramas separadas, una alrededor de cada foco.",
        },
        {
          label: "Valor absoluto",
          message: "El valor absoluto recoge los dos casos: en la rama izquierda $PF > PF'$ y en la derecha $PF' > PF$.",
        },
      ],
      title: "Hipérbola",
      blocks: [
        {
          kind: "rule",
          text: "Dados dos focos $F$ y $F'$ y una distancia $d$, la **hipérbola** es el lugar geométrico de los puntos cuya **diferencia** de distancias a los focos, en valor absoluto, es $d$.",
          formula: "|PF - PF'| = d",
        },
      ],
      visual: { kind: "anim", scene: "conica-lugar", params: { conica: "hiperbola" } },
    },
    {
      id: "check-elipse",
      type: "predict",
      help: [
        {
          label: "Suma",
          message: "Para la elipse cuenta la suma de las dos distancias a los focos.",
        },
      ],
      title: "Elipse",
      question: "Un punto $P$ de una elipse cumple $PF = 7$ y $PF' = 11$. ¿Cuánto vale la constante $d$?",
      mode: "choice",
      choices: [
        { id: "18", label: "$18$" },
        { id: "4", label: "$4$", incorrectFeedback: "Esa es la diferencia, propia de la hipérbola. En la elipse se suma." },
        { id: "77", label: "$77$", incorrectFeedback: "Las distancias se suman, no se multiplican." },
      ],
      correctChoiceId: "18",
      shuffleChoices: true,
      explanation: "$d = PF + PF' = 7 + 11 = 18$.",
    },
    {
      id: "check-hiperbola",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Diferencia",
          message: "$|PF - PF'|$ con $PF = 17$ y $PF' = 11$.",
        },
      ],
      title: "Hipérbola",
      question: "Un punto $Q$ de una hipérbola cumple $QF = 17$ y $QF' = 11$. ¿Cuánto vale la constante $d$? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$d = |17 - 11| = 6$.",
    },
    {
      id: "check-parabola",
      type: "predict",
      help: [
        {
          label: "Equidistancia",
          message: "La parábola mezcla un punto y una recta: la propiedad compara la distancia a cada uno.",
        },
      ],
      title: "Parábola",
      question: "Un punto de una parábola dista $11$ cm de su directriz. ¿Cuánto dista de su foco?",
      mode: "choice",
      choices: [
        { id: "11", label: "$11$ cm" },
        { id: "22", label: "$22$ cm", incorrectFeedback: "La parábola exige igualdad de distancias, no el doble." },
        { id: "0", label: "$0$ cm", incorrectFeedback: "El foco es un punto fijo que no está en la parábola." },
      ],
      correctChoiceId: "11",
      shuffleChoices: true,
      explanation: "En la parábola $PF = \\text{dist}(P, d)$: también $11$ cm.",
    },
  ],
};
