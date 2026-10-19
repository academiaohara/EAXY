import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const figurasGeometricasTriangulosLesson: InteractiveLesson = {
  slug: "figuras-geometricas-triangulos",
  title: "1. Triángulos",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "clasificacion",
      type: "slide",
      help: [
        {
          label: "¿Se pueden combinar las dos clasificaciones?",
          message:
            "Sí: son dos preguntas distintas sobre el mismo triángulo. Uno puede ser, por ejemplo, **isósceles y rectángulo** a la vez: dos lados iguales y un ángulo de $90^\\circ$.",
        },
        {
          label: "¿Cuántos ángulos obtusos puede tener?",
          message: "Como los tres suman $180^\\circ$, un triángulo tiene como mucho **un** ángulo recto u obtuso. Los otros dos son siempre agudos.",
        },
      ],
      title: "Un triángulo, dos formas de clasificarlo",
      blocks: [
        {
          kind: "compare",
          left: { title: "Según sus ángulos", text: "Acutángulo, rectángulo u obtusángulo.", tone: "info" },
          right: { title: "Según sus lados", text: "Equilátero, isósceles o escaleno.", tone: "ok" },
        },
        {
          kind: "warning",
          title: "Dos ángulos agudos",
          text: "Con seguridad, dos de los ángulos de un triángulo son agudos. El tercero decide si es acutángulo, rectángulo u obtusángulo.",
        },
      ],
      visual: { kind: "anim", scene: "triangulos-clasificacion", beatMs: 3200 },
    },
    {
      id: "explora-clasificador",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message:
            "Mueve $C$ y fíjate en que **ninguna** de las dos etiquetas depende de la otra: puedes tener un isósceles rectángulo o un escaleno obtusángulo.",
        },
      ],
      title: "Explora: lados y ángulos a la vez",
      blocks: [
        {
          kind: "text",
          text: "Mueve el vértice $C$. ¿Qué posición da un triángulo **equilátero**? ¿Y uno **isósceles rectángulo**?",
        },
      ],
      visual: { kind: "tool", tool: "triangulo-clasificador", params: { a: 3, b: 4 } },
    },
    {
      id: "clasificar-lados",
      type: "classify",
      help: [
        {
          label: "¿Qué comparo?",
          message: "Solo las **longitudes** de los tres lados. Cuenta cuántas se repiten: tres, dos o ninguna.",
        },
        {
          label: "Cuidado con el orden",
          message: "No importa en qué orden se den los lados: $6, 9, 6$ tiene dos lados iguales igual que $6, 6, 9$.",
        },
      ],
      title: "Clasifica por los lados",
      question: "Un triángulo tiene los lados que se indican. ¿Cómo es según sus lados?",
      groups: [
        { id: "equilatero", label: "Equilátero", tone: "emerald" },
        { id: "isosceles", label: "Isósceles", tone: "cobalt" },
        { id: "escaleno", label: "Escaleno", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$4$ cm, $4$ cm y $4$ cm", group: "equilatero" },
        { id: "b", text: "$5$ cm, $5$ cm y $8$ cm", group: "isosceles" },
        { id: "c", text: "$3$ cm, $4$ cm y $5$ cm", group: "escaleno" },
        { id: "d", text: "$6$ cm, $9$ cm y $6$ cm", group: "isosceles" },
        { id: "e", text: "$7$ cm, $8$ cm y $9$ cm", group: "escaleno" },
        { id: "f", text: "$10$ cm, $10$ cm y $10$ cm", group: "equilatero" },
      ],
      hint: "Cuenta cuántos lados se repiten: tres, dos o ninguno.",
      explanation:
        "Tres lados iguales: equilátero. Dos iguales: isósceles. Ninguno igual: escaleno. El triángulo de lados $3$, $4$ y $5$ es además rectángulo.",
    },
    {
      id: "mediana",
      type: "slide",
      help: [
        {
          label: "¿Qué diferencia hay entre mediana y altura?",
          message:
            "La mediana llega al **punto medio** del lado opuesto (no tiene por qué ser perpendicular). La altura llega **perpendicular** al lado opuesto (no tiene por qué caer en el punto medio).",
        },
      ],
      title: "Medianas y baricentro",
      blocks: [
        {
          kind: "definition",
          text: "Una **mediana** es el segmento que va de un vértice al **punto medio** del lado opuesto.",
        },
        {
          kind: "rule",
          title: "Baricentro",
          text: "Las tres medianas se cortan en un punto, el **baricentro**, que está a doble distancia del vértice que del lado.",
          formula: "AG = 2 \\cdot GA'",
        },
      ],
      visual: { kind: "anim", scene: "triangulo-mediana", beatMs: 3000 },
    },
    {
      id: "altura",
      type: "slide",
      help: [
        {
          label: "¿Por qué hay que prolongar el lado?",
          message:
            "En un triángulo obtusángulo, la perpendicular desde un vértice agudo cae fuera del lado opuesto. Se prolonga el lado con una línea y se baja la perpendicular a esa prolongación.",
        },
      ],
      title: "Alturas y ortocentro",
      blocks: [
        {
          kind: "definition",
          text: "La **altura** es el segmento que va, **perpendicularmente**, desde un vértice al lado opuesto o a su prolongación.",
        },
        {
          kind: "rule",
          title: "Ortocentro",
          text: "Las tres alturas se cortan en un punto, el **ortocentro**.",
        },
        {
          kind: "warning",
          text: "En un triángulo obtusángulo el ortocentro queda **fuera** del triángulo.",
        },
      ],
      visual: { kind: "anim", scene: "triangulo-altura", beatMs: 3200 },
    },
    {
      id: "explora-centros",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message:
            "El baricentro no sale nunca del triángulo. El ortocentro sí: baja la altura de $C$ hasta que el ángulo en $C$ pase de $90^\\circ$ y mira dónde queda $H$.",
        },
      ],
      title: "Explora: baricentro y ortocentro",
      blocks: [
        {
          kind: "text",
          text: "Cambia el triángulo y alterna entre **medianas** y **alturas**. ¿Cuándo coincide el ortocentro con un vértice?",
        },
      ],
      visual: { kind: "tool", tool: "triangulo-centros", params: { a: 2, b: 4 } },
    },
    {
      id: "clasificacion-combinada",
      type: "predict",
      help: [
        {
          label: "Dos preguntas distintas",
          message: "Una pregunta es sobre los lados (¿cuántos se repiten?). La otra es sobre el ángulo mayor (¿agudo, recto u obtuso?).",
        },
        {
          label: "Mira el ángulo mayor",
          message: "Si el ángulo mayor mide menos de $90^\\circ$, los otros dos también: el triángulo es acutángulo.",
        },
      ],
      title: "Un cartabón",
      question:
        "Un triángulo tiene dos lados de 5 cm y el tercero de 7 cm. Su ángulo mayor mide 88°. ¿Cómo es el triángulo?",
      mode: "choice",
      choices: [
        { id: "a", label: "Isósceles y acutángulo" },
        {
          id: "b",
          label: "Isósceles y rectángulo",
          incorrectFeedback: "El ángulo mayor mide $88^\\circ$, y rectángulo exige exactamente $90^\\circ$. Con $88^\\circ$ los tres ángulos son agudos.",
        },
        {
          id: "c",
          label: "Escaleno y acutángulo",
          incorrectFeedback: "Tiene dos lados iguales ($5$ cm y $5$ cm), así que no es escaleno: es isósceles.",
        },
        {
          id: "d",
          label: "Equilátero y acutángulo",
          incorrectFeedback: "Para ser equilátero necesita tres lados iguales, y aquí hay uno de $7$ cm.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Dos lados iguales lo hacen **isósceles**. Su ángulo mayor es $88^\\circ < 90^\\circ$, así que los tres ángulos son agudos: **acutángulo**.",
    },
    {
      id: "baricentro",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué parte es la larga?",
          message: "El tramo que va del **vértice** al baricentro es el doble que el que va del baricentro al lado.",
        },
        {
          label: "Reparte la mediana en partes",
          message: "La mediana se divide en $2 + 1 = 3$ partes iguales. El tramo que piden ocupa dos de ellas.",
        },
      ],
      title: "Un tramo de la mediana",
      question:
        "La mediana que sale del vértice A mide 12 cm en total. ¿Cuánto mide el tramo AG, desde el vértice hasta el baricentro? (escribe solo el número, en cm)",
      correctAnswers: ["8", "8 cm"],
      hint: "AG es el doble de GA', y entre los dos suman toda la mediana.",
      explanation: "La mediana se parte en $3$ partes iguales de $12 : 3 = 4$ cm. El tramo $AG$ tiene $2$ de ellas: $2 \\cdot 4 = 8$ cm.",
    },
    {
      id: "ortocentro-fuera",
      type: "predict",
      help: [
        {
          label: "Recuerda el tipo de triángulo",
          message: "Un ángulo de $110^\\circ$ es mayor que $90^\\circ$: ¿qué nombre recibe un triángulo con un ángulo así?",
        },
        {
          label: "Caso opuesto",
          message: "En un triángulo acutángulo las tres alturas caen dentro y se cortan dentro. ¿Pasa lo mismo si un ángulo es obtuso?",
        },
      ],
      title: "¿Dónde está el ortocentro?",
      question:
        "Una parcela triangular tiene un ángulo de 110°. Se trazan las tres alturas y se busca el punto donde se cortan. ¿Dónde queda ese punto (el ortocentro)?",
      mode: "choice",
      choices: [
        { id: "a", label: "Fuera de la parcela" },
        {
          id: "b",
          label: "Dentro de la parcela",
          incorrectFeedback: "Eso solo pasa si los tres ángulos son agudos. Con un ángulo obtuso, las alturas hay que prolongarlas y se cortan fuera.",
        },
        {
          id: "c",
          label: "En el vértice del ángulo de $110^\\circ$",
          incorrectFeedback: "El ortocentro cae en un vértice cuando el triángulo es **rectángulo** (ángulo de $90^\\circ$), no obtuso.",
        },
        {
          id: "d",
          label: "En el punto medio del lado mayor",
          incorrectFeedback: "El punto medio de un lado es donde llegan las **medianas**, no las alturas.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Con un ángulo obtuso ($110^\\circ$), el triángulo es obtusángulo: sus alturas se cortan fuera del triángulo. Con $90^\\circ$ se cortarían en el vértice del ángulo recto, y con tres ángulos agudos, dentro.",
    },
  ],
};
