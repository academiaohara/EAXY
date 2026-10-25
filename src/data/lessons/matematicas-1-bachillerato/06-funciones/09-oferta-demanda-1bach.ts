import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const ofertaDemanda1bachLesson: InteractiveLesson = {
  slug: "oferta-demanda-1bach",
  title: "9. Funciones de oferta y demanda",
  subtitle: TEMA_1BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "curvas",
      type: "slide",
      help: [{ label: "Ley de la oferta y la demanda", message: "Si el precio sube, los consumidores compran menos y los productores quieren vender más. En el punto de equilibrio los dos deseos coinciden." }],
      title: "Oferta creciente, demanda decreciente",
      blocks: [
        { kind: "definition", text: "La **función de demanda** da la cantidad $q$ que los consumidores quieren comprar a cada precio $p$: **decrece** al subir el precio. La **función de oferta** da la que los productores quieren vender: **crece** con el precio." },
        { kind: "rule", title: "Punto de equilibrio", text: "Es el precio y la cantidad en los que **oferta = demanda**: se halla resolviendo el sistema de las dos ecuaciones." },
      ],
      visual: { kind: "tool", tool: "oferta-demanda-explorador", initial: [2, 2, 20, 3, 12], hint: "Mueve el precio: por debajo del equilibrio hay escasez; por encima, excedente. Cambia las pendientes y mira cómo se desplaza el punto de corte." },
    },
    {
      id: "equilibrio",
      type: "slide",
      help: [{ label: "En la gráfica", message: "El equilibrio es la intersección de las dos rectas. Una subida de la demanda (más ordenada) desplaza el equilibrio a precios y cantidades mayores." }],
      title: "Calcular el equilibrio",
      blocks: [
        { kind: "example", title: "Oferta p = 2q + 2, demanda p = 20 − 3q", lines: [
          { math: "2q + 2 = 20 - 3q \\Rightarrow 5q = 18 \\Rightarrow q = 3{,}6" },
          { math: "p = 2\\cdot 3{,}6 + 2 = 9{,}2\\ \\Rightarrow\\ \\text{equilibrio } (q, p) = (3{,}6;\\ 9{,}2)" },
        ] },
        { kind: "text", text: "Con un precio **mayor** que $9{,}2$ se ofrece más de lo que se demanda (**excedente**); con uno **menor**, se demanda más de lo que se ofrece (**escasez**)." },
      ],
      arrange: "stack",
    },
    {
      id: "check-equilibrio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Iguala $q + 1 = 11 - q$ y despeja $q$; después calcula $p = q + 1$." }],
      title: "Precio de equilibrio",
      question: "La oferta es $p = q + 1$ y la demanda es $p = 11 - q$. ¿Cuál es el **precio** de equilibrio? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$q + 1 = 11 - q \\Rightarrow q = 5$ y $p = 5 + 1 = 6$.",
    },
    {
      id: "check-excedente",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "A mayor precio, los consumidores compran menos y los productores ofrecen más." }],
      title: "Por encima del equilibrio",
      question: "Si el precio de mercado está **por encima** del de equilibrio, ocurre que…",
      choices: [
        { id: "a", label: "se ofrece más de lo que se demanda: hay excedente" },
        { id: "b", label: "se demanda más de lo que se ofrece: hay escasez", incorrectFeedback: "La escasez se produce con precios **por debajo** del equilibrio." },
        { id: "c", label: "oferta y demanda coinciden", incorrectFeedback: "Solo coinciden en el precio de equilibrio." },
        { id: "d", label: "no se vende nada", incorrectFeedback: "Se vende la cantidad demandada, que es menor que la ofrecida." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con precio alto la demanda cae y la oferta sube: sobra producto.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Piensa en la pendiente: la oferta crece con el precio y la demanda decrece." }],
      title: "¿Oferta o demanda?",
      question: "Clasifica cada afirmación según describa la oferta o la demanda.",
      groups: [
        { id: "of", label: "Oferta", tone: "cobalt" },
        { id: "de", label: "Demanda", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Al subir el precio, los clientes compran menos", group: "de" },
        { id: "b", text: "Al subir el precio, los fabricantes quieren producir más", group: "of" },
        { id: "c", text: "Su gráfica tiene pendiente negativa", group: "de" },
        { id: "d", text: "Su gráfica tiene pendiente positiva", group: "of" },
        { id: "e", text: "Representa lo que los consumidores están dispuestos a comprar", group: "de" },
        { id: "f", text: "Representa lo que los productores están dispuestos a vender", group: "of" },
      ],
      hint: "Demanda: decreciente. Oferta: creciente.",
    },
  ],
};
