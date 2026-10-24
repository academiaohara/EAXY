import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigProblemas4esobLesson: InteractiveLesson = {
  slug: "trig-problemas-4esob",
  title: "9. Problemas de trigonometría",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "altura",
      type: "slide",
      help: [
        { label: "Triángulo rectángulo escondido", message: "En casi todos los problemas hay un triángulo rectángulo: la altura es un cateto y el suelo, el otro. Dibújalo y marca lo que sabes." },
        { label: "Ángulo de elevación", message: "Es el ángulo que forma la línea de visión con la horizontal cuando miras hacia arriba." },
      ],
      title: "Medir lo inaccesible",
      blocks: [
        { kind: "text", text: "Para medir la altura de un árbol, un edificio o un poste sin subir, basta una **distancia** al pie y el **ángulo** bajo el que se ve la cima." },
        { kind: "example", lines: [{ math: "\\operatorname{tg}50° = \\dfrac{h}{20} \\Rightarrow h = 20\\cdot\\operatorname{tg}50° \\approx 23{,}84\\text{ m}" }] },
      ],
      visual: { kind: "anim", scene: "trig-altura-arbol", params: { a: 50, b: 20 } },
    },
    {
      id: "check-sombra",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Tangente", message: "La sombra es el cateto contiguo ($18$ m) y la altura del árbol, el opuesto: $h = 18\\cdot\\operatorname{tg}40°$." }],
      title: "La sombra de un árbol",
      question: "Cuando los rayos del sol forman $40°$ con el suelo, la sombra de un árbol mide $18$ m. ¿Cuánto mide el árbol? (en m, redondea a las centésimas)",
      correctAnswers: ["15,10", "15.10", "15,1", "15.1"],
      explanation: "$h = 18\\cdot\\operatorname{tg}40° \\approx 18\\cdot0{,}8391 \\approx 15{,}10$ m.",
    },
    {
      id: "isosceles",
      type: "slide",
      help: [{ label: "Parte en dos", message: "La altura de un triángulo isósceles lo divide en dos triángulos rectángulos iguales: así aparece el ángulo recto." }],
      title: "Triángulos que no son rectángulos",
      blocks: [
        { kind: "text", text: "En un **isósceles**, la altura sobre el lado desigual lo parte en dos triángulos rectángulos iguales. Se resuelve uno de ellos." },
        { kind: "example", title: "Lado desigual $18$ m, altura $10$ m", lines: [{ math: "\\operatorname{tg}\\beta = \\dfrac{10}{9} \\Rightarrow \\beta \\approx 48{,}01°" }, { math: "\\text{ángulo desigual} = 180° - 2\\cdot48{,}01° \\approx 83{,}98°" }] },
      ],
      visual: { kind: "tool", tool: "trig-resolver-explorador", params: { n: 1, c: 10, d: 9 }, hint: "Con catetos 10 (altura) y 9 (mitad de la base) obtienes el ángulo de la base del isósceles." },
    },
    {
      id: "check-compas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Mitad del ángulo", message: "Los brazos (12 cm) y la abertura forman un triángulo isósceles. Dividido por la mitad: seno de $25°$ $= \\dfrac{r/2}{12}$." }],
      title: "El compás",
      question: "Los brazos de un compás miden $12$ cm y forman un ángulo de $50°$. ¿Cuánto mide el radio de la circunferencia que se puede trazar con esa abertura (la distancia entre las puntas)? (en cm, redondea a las centésimas)",
      correctAnswers: ["10,14", "10.14"],
      explanation: "La mitad de la abertura es $12\\cdot\\operatorname{sen}25°$, así que $r = 2\\cdot12\\cdot\\operatorname{sen}25° \\approx 10{,}14$ cm.",
    },
    {
      id: "check-apotema",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Triángulo central", message: "En un pentágono regular el ángulo central mide $72°$. Un triángulo central, partido por la apotema, tiene un ángulo de $36°$ y un cateto de $5$ cm." }],
      title: "La apotema de un pentágono",
      question: "¿Cuánto mide la apotema de un pentágono regular de lado $10$ cm? (en cm, redondea a las centésimas)",
      correctAnswers: ["6,88", "6.88"],
      explanation: "Medio lado $= 5$ y el ángulo en el centro, $36°$: $\\operatorname{tg}36° = \\dfrac{5}{a} \\Rightarrow a = \\dfrac{5}{\\operatorname{tg}36°} \\approx 6{,}88$ cm.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Qué tengo y qué quiero", message: "Anota los dos lados implicados y el ángulo: seno si intervienen opuesto e hipotenusa, coseno con contiguo e hipotenusa, tangente con los dos catetos." }],
      title: "¿Qué razón en cada problema?",
      question: "Clasifica según la razón que conviene usar.",
      groups: [
        { id: "sen", label: "Seno", tone: "cobalt" },
        { id: "cos", label: "Coseno", tone: "emerald" },
        { id: "tg", label: "Tangente", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Altura de una cometa conociendo el hilo (hipotenusa) y el ángulo", group: "sen" },
        { id: "b", text: "Altura de un árbol conociendo la distancia a su base y el ángulo", group: "tg" },
        { id: "c", text: "Distancia a la pared de una escalera, conociendo su longitud y el ángulo", group: "cos" },
        { id: "d", text: "Ángulo de una rampa conociendo cuánto sube y cuánto avanza", group: "tg" },
        { id: "e", text: "Cuánto sube una rampa de 12 m de largo con un ángulo de 10°", group: "sen" },
        { id: "f", text: "Proyección horizontal de un cable inclinado conociendo su longitud y ángulo", group: "cos" },
      ],
      hint: "Decide primero qué lados intervienen.",
    },
  ],
};
