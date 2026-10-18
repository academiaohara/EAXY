import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const rectasYAngulosPoligonosLesson: InteractiveLesson = {
  slug: "rectas-y-angulos-poligonos",
  title: "6. Ángulos en los polígonos",
  subtitle: TEMA_1ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "triangulo",
      type: "slide",
      help: [
        {
          label: "¿Por qué la paralela?",
          message: "Porque una recta que corta a dos paralelas forma ángulos iguales (alternos internos). Así los ángulos $a$ y $b$ se copian junto a $c$ sin cambiar de valor.",
        },
        {
          label: "¿Vale para cualquier triángulo?",
          message: "Sí: no se ha usado ninguna medida concreta, solo que los lados son rectas. Es verdad para triángulos de cualquier forma y tamaño.",
        },
      ],
      title: "Los ángulos de un triángulo suman 180°",
      blocks: [
        {
          kind: "rule",
          title: "Propiedad",
          text: "La suma de los tres ángulos de cualquier triángulo vale $180^\\circ$.",
          formula: "a + b + c = 180^\\circ",
        },
        {
          kind: "text",
          text: "Por un vértice se traza la paralela al lado opuesto: los ángulos alternos internos copian $a$ y $b$ junto a $c$, y los tres juntos forman un ángulo llano.",
        },
      ],
      visual: { kind: "anim", scene: "triangulo-180" },
    },
    {
      id: "explora-triangulo",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Cuando subes un ángulo, otro tiene que bajar para que la suma siga siendo $180^\\circ$. Los tres siempre llenan la barra de abajo.",
        },
      ],
      title: "Explora: los tres ángulos de un triángulo",
      blocks: [
        {
          kind: "text",
          text: "Cambia $a$ y $b$ y mira cuánto vale $c$. ¿Puede un triángulo tener **dos ángulos rectos**? ¿Y dos obtusos?",
        },
      ],
      visual: { kind: "tool", tool: "triangulo-explorador", params: { a: 50, b: 60 } },
    },
    {
      id: "rectangulo",
      type: "predict",
      help: [
        {
          label: "¿Qué tiene de especial un triángulo rectángulo?",
          message: "Tiene un ángulo de $90^\\circ$. Los otros dos tienen que sumar lo que falta hasta $180^\\circ$.",
        },
        {
          label: "Con grados y minutos",
          message: "Resta $90^\\circ - 42^\\circ\\,20'$: convierte un grado en $60'$, así que $90^\\circ = 89^\\circ\\,60'$.",
        },
      ],
      title: "Un triángulo rectángulo",
      question:
        "Una rampa tiene forma de triángulo rectángulo. Uno de sus ángulos agudos mide 42° 20'. ¿Cuánto mide el otro ángulo agudo?",
      mode: "choice",
      choices: [
        { id: "a", label: "$47^\\circ\\,40'$" },
        {
          id: "b",
          label: "$137^\\circ\\,40'$",
          incorrectFeedback:
            "Has restado a $180^\\circ$, pero el ángulo recto ya ocupa $90^\\circ$ de los $180^\\circ$. Los otros dos solo suman $90^\\circ$.",
        },
        {
          id: "c",
          label: "$48^\\circ\\,20'$",
          incorrectFeedback:
            "Has restado los grados ($90 - 42 = 48$) y has dejado los minutos como estaban. Hay que restar también los $20'$.",
        },
        {
          id: "d",
          label: "$47^\\circ\\,80'$",
          incorrectFeedback:
            "Una forma correcta no puede tener $80'$: pasan de $60$. Convierte $1^\\circ$ en $60'$ antes de restar.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Los dos agudos suman $90^\\circ$: $90^\\circ - 42^\\circ\\,20' = 89^\\circ\\,60' - 42^\\circ\\,20' = 47^\\circ\\,40'$.",
    },
    {
      id: "poligonos",
      type: "slide",
      help: [
        {
          label: "¿Por qué $n - 2$?",
          message: "Desde un vértice no se puede trazar diagonal a sí mismo ni a sus dos vecinos: quedan $n - 3$ diagonales, que parten el polígono en $n - 2$ triángulos.",
        },
        {
          label: "¿Qué es un polígono regular?",
          message: "El que tiene todos los lados y todos los ángulos iguales. Por eso cada ángulo es la suma total entre $n$.",
        },
      ],
      title: "Ángulos de un polígono cualquiera",
      blocks: [
        {
          kind: "rule",
          title: "Suma de los ángulos",
          text: "Un polígono de $n$ lados se descompone en $n - 2$ triángulos.",
          formula: "(n - 2) \\cdot 180^\\circ",
        },
        {
          kind: "rule",
          title: "Polígono regular",
          text: "Cada ángulo mide la suma total dividida entre $n$.",
          formula: "\\dfrac{(n - 2) \\cdot 180^\\circ}{n}",
        },
      ],
      visual: { kind: "anim", scene: "poligono-triangulos", beatMs: 3000 },
    },
    {
      id: "explora-poligono",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Cada lado que añades suma un triángulo más, es decir, $180^\\circ$ más. El ángulo de cada vértice del regular se acerca a $180^\\circ$ pero nunca lo alcanza.",
        },
      ],
      title: "Explora: polígonos de n lados",
      blocks: [
        {
          kind: "text",
          text: "Cambia el número de lados. ¿Cuántos lados necesitas para que cada ángulo de un polígono regular pase de $140^\\circ$?",
        },
      ],
      visual: { kind: "tool", tool: "poligono-explorador", params: { n: 5 } },
    },
    {
      id: "octogono",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cuántos triángulos salen?",
          message: "Un octógono tiene $8$ lados: se parte en $8 - 2$ triángulos.",
        },
        {
          label: "¿Y cuántos grados da cada uno?",
          message: "Cada triángulo suma $180^\\circ$. Multiplica el número de triángulos por $180$.",
        },
      ],
      title: "Suma de los ángulos de un octógono",
      question:
        "Un octógono tiene 8 lados. ¿Cuántos grados suman sus ángulos interiores? (escribe solo el número)",
      correctAnswers: ["1080", "1 080", "1080º", "1080°"],
      hint: "Se parte en $n - 2$ triángulos de $180^\\circ$ cada uno.",
      explanation: "$(8 - 2) \\cdot 180^\\circ = 6 \\cdot 180^\\circ = 1080^\\circ$.",
    },
    {
      id: "cometa",
      type: "predict",
      help: [
        {
          label: "¿Qué sé de un cuadrilátero?",
          message: "Sus cuatro ángulos suman $360^\\circ$. Resta los que ya conoces.",
        },
        {
          label: "¿Qué hago con los dos iguales?",
          message: "Lo que queda lo repartes a partes iguales entre los dos ángulos que son iguales.",
        },
      ],
      title: "Una cometa",
      question:
        "Una cometa tiene forma de cuadrilátero. Dos de sus ángulos miden 100° y 40°, y los otros dos son iguales entre sí. ¿Cuánto mide cada uno de esos dos ángulos iguales?",
      mode: "choice",
      choices: [
        { id: "a", label: "$110^\\circ$" },
        {
          id: "b",
          label: "$220^\\circ$",
          incorrectFeedback:
            "$220^\\circ$ es lo que suman los dos ángulos iguales. Falta repartirlo entre los dos: $220^\\circ : 2$.",
        },
        {
          id: "c",
          label: "$70^\\circ$",
          incorrectFeedback:
            "Has partido de $180^\\circ$, que es la suma de un triángulo. Un cuadrilátero suma $360^\\circ$.",
        },
        {
          id: "d",
          label: "$130^\\circ$",
          incorrectFeedback:
            "Comprueba la suma: $130^\\circ + 130^\\circ + 100^\\circ + 40^\\circ = 400^\\circ$, y un cuadrilátero suma exactamente $360^\\circ$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Los cuatro ángulos suman $360^\\circ$: $360^\\circ - 100^\\circ - 40^\\circ = 220^\\circ$, y $220^\\circ : 2 = 110^\\circ$ cada uno.",
    },
    {
      id: "decagono",
      type: "fill_in_blank",
      help: [
        {
          label: "Primero, la suma",
          message: "Un decágono tiene $10$ lados: la suma de sus ángulos es $(10 - 2) \\cdot 180^\\circ$.",
        },
        {
          label: "Después, el reparto",
          message: "Como es regular, todos sus ángulos son iguales: divide la suma entre $10$.",
        },
      ],
      title: "Ángulo de un decágono regular",
      question:
        "Un decágono regular tiene 10 lados iguales y 10 ángulos iguales. ¿Cuántos grados mide cada ángulo? (escribe solo el número)",
      correctAnswers: ["144", "144º", "144°"],
      hint: "Suma total: $(n - 2) \\cdot 180^\\circ$; después, entre $n$.",
      explanation: "$(10 - 2) \\cdot 180^\\circ = 1440^\\circ$, y $1440^\\circ : 10 = 144^\\circ$.",
    },
  ],
};
