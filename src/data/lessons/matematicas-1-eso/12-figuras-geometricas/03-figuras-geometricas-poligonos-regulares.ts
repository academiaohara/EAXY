import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const figurasGeometricasPoligonosRegularesLesson: InteractiveLesson = {
  slug: "figuras-geometricas-poligonos-regulares",
  title: "3. Polígonos regulares",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "regular",
      type: "slide",
      help: [
        {
          label: "¿Basta con tener los lados iguales?",
          message:
            "No. Un rombo tiene los cuatro lados iguales pero no es regular si sus ángulos no son todos iguales. Hacen falta **las dos** condiciones.",
        },
        {
          label: "¿Qué es la circunferencia circunscrita?",
          message: "Es la que pasa por **todos los vértices** del polígono. En un polígono regular siempre existe.",
        },
      ],
      title: "Polígonos regulares: centro y radio",
      blocks: [
        {
          kind: "definition",
          text: "Un polígono es **regular** si tiene todos sus **lados iguales** y todos sus **ángulos iguales**.",
        },
        {
          kind: "text",
          text: "Todos los polígonos regulares tienen una **circunferencia circunscrita**. Su **centro** $O$ y su **radio** $r$ son el centro y el radio del polígono.",
        },
      ],
      visual: { kind: "anim", scene: "poligono-regular-circunscrito", beatMs: 3200 },
    },
    {
      id: "apotema",
      type: "slide",
      help: [
        {
          label: "¿La apotema es siempre menor que el radio?",
          message: "Sí: en el triángulo rectángulo del dibujo, el radio es la hipotenusa, y la hipotenusa es siempre el lado mayor.",
        },
        {
          label: "¿Y si no recuerdo Pitágoras?",
          message: "En un triángulo rectángulo, el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos. Aquí: $r^2 = a^2 + (l/2)^2$.",
        },
      ],
      title: "La apotema",
      blocks: [
        {
          kind: "definition",
          text: "La **apotema** $a$ es el segmento perpendicular desde el centro $O$ a un lado $l$. Siempre lo corta en su **punto medio**.",
        },
        {
          kind: "rule",
          title: "Relación con el radio y el lado",
          text: "El radio, la apotema y la mitad del lado forman un triángulo rectángulo.",
          formula: "r^2 = a^2 + \\left(\\dfrac{l}{2}\\right)^2",
        },
      ],
      visual: { kind: "anim", scene: "poligono-apotema", beatMs: 3200 },
    },
    {
      id: "explora-regular",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Con $n = 6$ el lado coincide con el radio. Con más lados, el lado se acorta y la apotema se acerca al radio.",
        },
      ],
      title: "Explora: radio, apotema y lado",
      blocks: [
        {
          kind: "text",
          text: "Cambia el número de lados y el radio. ¿En qué polígono el lado mide **exactamente** lo mismo que el radio?",
        },
      ],
      visual: { kind: "tool", tool: "poligono-regular-explorador", params: { n: 6, a: 6 } },
    },
    {
      id: "es-regular",
      type: "predict",
      help: [
        {
          label: "Las dos condiciones",
          message: "Un polígono regular necesita lados iguales **y** ángulos iguales. Comprueba si la figura cumple las dos.",
        },
        {
          label: "Piensa en un rombo aplastado",
          message: "Dibuja un rombo con ángulos de $60^\\circ$ y $120^\\circ$: sus cuatro lados son iguales, pero ¿lo son sus ángulos?",
        },
      ],
      title: "¿Es regular?",
      question:
        "Una baldosa tiene forma de rombo con los cuatro lados de 20 cm, pero sus ángulos miden 60° y 120°. ¿Es un polígono regular?",
      mode: "choice",
      choices: [
        { id: "a", label: "No: tiene los lados iguales, pero los ángulos no" },
        {
          id: "b",
          label: "Sí: tiene los cuatro lados iguales",
          incorrectFeedback: "Los lados iguales no bastan. Además, todos los ángulos deben ser iguales, y aquí hay ángulos de $60^\\circ$ y de $120^\\circ$.",
        },
        {
          id: "c",
          label: "Sí: todos los cuadriláteros con lados iguales son regulares",
          incorrectFeedback: "Solo el cuadrado es un cuadrilátero regular. El rombo no lo es si sus ángulos no son rectos.",
        },
        {
          id: "d",
          label: "No: los polígonos regulares tienen que tener más de cuatro lados",
          incorrectFeedback: "El triángulo equilátero y el cuadrado también son regulares: no hay un mínimo de lados distinto de tres.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Para ser regular se necesitan lados iguales **y** ángulos iguales. El rombo con ángulos de $60^\\circ$ y $120^\\circ$ solo cumple la primera.",
    },
    {
      id: "hexagono-lado",
      type: "fill_in_blank",
      help: [
        {
          label: "Triángulos del centro",
          message: "Desde el centro de un hexágono regular salen $6$ triángulos iguales, cada uno con un ángulo de $360^\\circ : 6 = 60^\\circ$ en $O$.",
        },
        {
          label: "¿Qué triángulo es?",
          message: "Dos lados son radios (iguales), así que es isósceles. Con $60^\\circ$ arriba, los otros dos ángulos miden $60^\\circ$ cada uno: es equilátero.",
        },
      ],
      title: "El lado de un hexágono",
      question:
        "Una mesa hexagonal regular tiene 80 cm de radio (del centro a cada esquina). ¿Cuánto mide cada lado? (escribe solo el número, en cm)",
      correctAnswers: ["80", "80 cm"],
      hint: "En un hexágono regular, el triángulo formado por el centro y un lado es equilátero.",
      explanation:
        "Cada uno de los $6$ triángulos centrales es equilátero (ángulo central de $60^\\circ$ y dos lados iguales al radio). Por tanto, el lado mide lo mismo que el radio: $80$ cm.",
    },
    {
      id: "apotema-calculo",
      type: "fill_in_blank",
      help: [
        {
          label: "Mitad del lado",
          message: "El triángulo rectángulo tiene un cateto que es $l/2$, no $l$. Calcula primero $16 : 2$.",
        },
        {
          label: "Pitágoras",
          message: "$a^2 = r^2 - (l/2)^2$. Calcula los cuadrados, resta y después busca el número que elevado al cuadrado da ese resultado.",
        },
      ],
      title: "Calcula la apotema",
      question:
        "Un polígono regular tiene un lado de 16 cm y un radio de 10 cm. ¿Cuánto mide su apotema? (escribe solo el número, en cm)",
      correctAnswers: ["6", "6 cm"],
      hint: "$a^2 = r^2 - (l/2)^2$.",
      explanation:
        "La mitad del lado es $16 : 2 = 8$ cm. Entonces $a^2 = 10^2 - 8^2 = 100 - 64 = 36$, y $a = \\sqrt{36} = 6$ cm.",
    },
  ],
};
