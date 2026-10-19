import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasTrianguloLesson: InteractiveLesson = {
  slug: "areas-triangulo",
  title: "2. Área de un triángulo",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        {
          label: "Pega dos triángulos",
          message: "Gira uno de los triángulos y pégalo al otro: sale un paralelogramo con la misma base y altura.",
        },
        {
          label: "¿Qué altura uso?",
          message: "La perpendicular a la base que elijas. Un triángulo tiene tres bases posibles, cada una con su altura, y todas dan la misma área.",
        },
      ],
      title: "Mitad de un paralelogramo",
      blocks: [
        {
          kind: "definition",
          text: "Si a un triángulo le juntamos otro igual se obtiene un **paralelogramo**: el área del triángulo es la **mitad** de la del paralelogramo.",
        },
        {
          kind: "rule",
          formula: "A = \\dfrac{b \\cdot a}{2}",
        },
        {
          kind: "text",
          text: "La **altura** $a$ es siempre perpendicular a la base $b$ que elijas.",
        },
      ],
      visual: { kind: "anim", scene: "area-triangulo", beatMs: 3200 },
    },
    {
      id: "explora-triangulo",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Al mover el vértice, los lados cambian, pero la base y la altura no: por eso el área se mantiene.",
        },
      ],
      title: "Explora: mueve el vértice",
      blocks: [
        {
          kind: "text",
          text: "Desliza el vértice superior. ¿Qué cambia: el área o la forma del triángulo? Después cambia la altura.",
        },
      ],
      visual: { kind: "tool", tool: "triangulo-area", params: { a: 6, b: 4, c: 2 } },
    },
    {
      id: "rectangulo",
      type: "slide",
      help: [
        {
          label: "Los catetos ya son perpendiculares",
          message: "En un triángulo rectángulo un cateto es la altura del otro: no hay que buscarla.",
        },
        {
          label: "Con la hipotenusa",
          message: "Si usas la hipotenusa como base, la altura ya no es un cateto y hay que calcularla.",
        },
      ],
      title: "Triángulo rectángulo",
      blocks: [
        {
          kind: "text",
          text: "Los **catetos** $c$ y $c'$ son perpendiculares: uno hace de base y el otro de altura.",
        },
        {
          kind: "rule",
          formula: "A = \\dfrac{c \\cdot c'}{2}",
        },
        {
          kind: "text",
          text: "Con la **hipotenusa** $h$ como base, la altura $a$ sobre ella sale de igualar las dos formas de calcular el mismo área.",
        },
      ],
      visual: { kind: "anim", scene: "area-triangulo-rectangulo", beatMs: 3500 },
    },
    {
      id: "check-catetos",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cuál es la base y cuál la altura?",
          message: "En un triángulo rectángulo los dos catetos son perpendiculares entre sí: uno hace de base y el otro de altura. Da igual cuál elijas.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Redondea los catetos a $20$ y $20$. El rectángulo sería $400$ y el triángulo, la mitad. Tu resultado debería rondar esa cifra.",
        },
      ],
      title: "Área con catetos",
      question:
        "Triángulo rectángulo con catetos $18\\,\\mathrm{cm}$ y $24\\,\\mathrm{cm}$. ¿Cuál es su área en $\\mathrm{cm}^2$? (escribe solo el número)",
      correctAnswers: ["216", "216 cm2", "216 cm²"],
      hint: "Un cateto hace de base y el otro de altura. El triángulo es la mitad del rectángulo que forman.",
      explanation:
        "$A = \\dfrac{18 \\cdot 24}{2} = \\dfrac{432}{2} = 216\\,\\mathrm{cm}^2$. Si no divides entre $2$ obtienes el área del rectángulo, no la del triángulo.",
    },
    {
      id: "altura-hipotenusa",
      type: "fill_in_blank",
      help: [
        {
          label: "Misma área, dos formas",
          message: "Ya sabes el área con los catetos. Con la hipotenusa $30$ como base, el área también es $\\dfrac{30 \\cdot a}{2}$.",
        },
        {
          label: "Despeja",
          message: "Multiplica el área por $2$ y divide entre la hipotenusa.",
        },
      ],
      title: "Altura sobre la hipotenusa",
      question:
        "El triángulo rectángulo del ejercicio anterior (catetos 18 cm y 24 cm) tiene hipotenusa de 30 cm. ¿Cuánto mide la altura sobre la hipotenusa, en cm? (escribe solo el número)",
      correctAnswers: ["14,4", "14.4"],
      hint: "$216 = \\dfrac{30 \\cdot a}{2}$.",
      explanation: "$216 = \\dfrac{30 \\cdot a}{2} \\Rightarrow a = \\dfrac{432}{30} = 14{,}4\\,\\mathrm{cm}$.",
    },
    {
      id: "equilatero",
      type: "slide",
      help: [
        {
          label: "¿Basta con el lado?",
          message: "No: necesitas la altura, que en un triángulo equilátero no coincide con el lado. Es más pequeña.",
        },
      ],
      title: "Un triángulo equilátero",
      blocks: [
        {
          kind: "text",
          text: "En cualquier triángulo basta con una base y su altura correspondiente.",
        },
        {
          kind: "example",
          title: "Lado $10$ cm y altura $8{,}66$ cm",
          lines: [
            { math: "A = \\dfrac{10 \\cdot 8{,}66}{2}", note: "base por altura, entre dos" },
            { math: "A = 43{,}3\\ \\mathrm{cm}^2" },
          ],
        },
        {
          kind: "warning",
          text: "La altura ($8{,}66$) es menor que el lado ($10$): no multipliques los dos lados.",
        },
      ],
    },
    {
      id: "check-parcela",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué lado uso?",
          message: "Base y altura tienen que ser perpendiculares. El enunciado dice que la altura es «sobre ese lado», así que ya son la pareja correcta.",
        },
        {
          label: "¿Por qué se divide entre $2$?",
          message: "Todo triángulo es la mitad de un paralelogramo con su misma base y altura.",
        },
      ],
      title: "Parcela triangular",
      question:
        "Una parcela tiene un lado de $20\\,\\mathrm{m}$ y altura $13\\,\\mathrm{m}$ sobre ese lado. ¿Cuál es su área en $\\mathrm{m}^2$?",
      correctAnswers: ["130", "130,0", "130.0"],
      explanation: "$A = \\dfrac{20 \\cdot 13}{2} = 130\\,\\mathrm{m}^2$.",
    },
    {
      id: "mismo-area",
      type: "predict",
      help: [
        {
          label: "¿Qué determina el área?",
          message: "Solo la base y la altura. Pregúntate si el vértice de arriba ha cambiado alguna de las dos.",
        },
        {
          label: "Recuerda la herramienta",
          message: "Al deslizar el vértice por la paralela a la base, la altura es la misma en todas las posiciones.",
        },
      ],
      title: "Dos solares",
      question:
        "Dos solares triangulares tienen la misma base, de 30 m, sobre una carretera. El vértice opuesto de ambos está a 20 m de la carretera, pero en puntos distintos. ¿Qué se puede decir de sus áreas?",
      mode: "choice",
      choices: [
        { id: "a", label: "Son iguales: $300\\ \\mathrm{m}^2$ cada uno" },
        {
          id: "b",
          label: "El más inclinado tiene más área",
          incorrectFeedback: "La inclinación no cuenta: lo que importa es la altura, y esa es $20$ m en los dos. Las dos áreas coinciden.",
        },
        {
          id: "c",
          label: "No se puede saber sin conocer los lados inclinados",
          incorrectFeedback: "No hacen falta los lados inclinados: el área depende solo de la base y de la altura, que ya conoces.",
        },
        {
          id: "d",
          label: "Son iguales: $600\\ \\mathrm{m}^2$ cada uno",
          incorrectFeedback: "$600$ es el área del paralelogramo ($30 \\cdot 20$). El triángulo es la mitad: $300\\ \\mathrm{m}^2$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$A = \\dfrac{30 \\cdot 20}{2} = 300\\ \\mathrm{m}^2$ en los dos: misma base y misma altura.",
    },
  ],
};
