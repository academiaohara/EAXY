import type { InteractiveLesson, TiendaCiclistaItem } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

const EQUIPO_CICLISTA: TiendaCiclistaItem[] = [
  { id: "bici", label: "Bici", price: 583 },
  { id: "casco", label: "Casco", price: 162 },
  { id: "maillot", label: "Maillot", price: 45 },
  { id: "culotte", label: "Culotte", price: 38 },
];

export const sumaRestaNaturalesLesson: InteractiveLesson = {
  slug: "suma-resta-naturales",
  title: "3. Suma y resta",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "paper" },
  steps: [
    {
      id: "sumar-narrate",
      type: "narrate",
      title: "Sumar",
      definitionBox: "Sumar es **unir**, **juntar**, **añadir**.",
      module: "tienda-fichas",
      scene: "sumar-estanteria",
      tiendaFichas: {
        items: EQUIPO_CICLISTA,
        mode: "sumar-estanteria",
      },
      embeddedPrediction: {
        kind: "numeric",
        prompt:
          "Hay 18 fichas de 1. Si cambio 10 de ellas por una de 10, ¿cuántas fichas de 10 salen?",
        correctAnswers: ["1"],
        hint: "Con 18 solo se forma un grupo de 10.",
        explanation: "Una, y sobran 8.",
      },
    },
    {
      id: "restar-narrate",
      type: "narrate",
      title: "Restar",
      definitionBox:
        "Restar es **quitar**, **suprimir**, hallar lo que **falta** o lo que **sobra**; es decir, calcular la **diferencia**.",
      module: "tienda-fichas",
      scene: "restar-cobro",
      tiendaFichas: {
        items: EQUIPO_CICLISTA,
        wallet: 1000,
        mode: "restar-cobro",
      },
    },
    {
      id: "explora-compra",
      type: "explore",
      title: "Explora la compra",
      question:
        "Compra lo que quieras sin pasarte: **¿qué compra te deja menos dinero en la cartera?**",
      module: "tienda-fichas",
      scene: "explorar-compra",
      goal: { kind: "maximize-under-budget", budget: 700 },
      tiendaFichas: {
        items: EQUIPO_CICLISTA,
        wallet: 700,
        mode: "explorar-toggle",
      },
      hint: "Prueba combinaciones que gasten casi todo el presupuesto sin pasarte.",
      explanation: "Bici, maillot y culotte suman 666 € y dejan 34 €.",
    },
    {
      id: "parentesis-narrate",
      type: "narrate",
      title: "Paréntesis",
      definitionBox:
        "Los **paréntesis** empaquetan resultados parciales, modificando el **orden** en que han de hacerse las operaciones.",
      module: "manzanas-parentesis",
      scene: "dual-narrate",
    },
    {
      id: "parentesis-explore",
      type: "explore",
      title: "Mételo en la bolsa",
      question: "Consigue que la expresión valga **$5$**.",
      module: "manzanas-parentesis",
      scene: "explorar-bolsa",
      goal: {
        kind: "expression-result",
        tokens: ["9", "-", "1", "+", "3"],
        target: 5,
      },
      explanation: "Primero $1 + 3 = 4$ y luego $9 - 4 = 5$.",
    },
    {
      id: "resta-limite",
      type: "explore",
      title: "El límite de la resta",
      question: "Con números naturales, el orden importa.",
      module: "manzanas-parentesis",
      scene: "limite-resta",
      goal: { kind: "module-ready" },
      embeddedPrediction: {
        kind: "choice",
        prompt: "¿Con naturales, $9 - 1$ y $1 - 9$ son la misma cuenta?",
        choices: [
          { id: "yes", label: "Sí, ambas se pueden hacer y dan lo mismo" },
          { id: "no", label: "No, solo una de ellas se puede hacer entre naturales" },
        ],
        correctChoiceId: "no",
        explanation:
          "La resta no es conmutativa: $9 - 1 = 8$, pero con naturales no se puede quitar 9 de 1.",
      },
    },
    {
      id: "conmutativa-reveal",
      type: "reveal",
      title: "Propiedad conmutativa",
      definitionBox:
        "Propiedad **conmutativa**: la suma no varía al cambiar el orden de los sumandos. $a + b = b + a$.",
      module: "fichas-propiedades",
      scene: "conmutativa",
      blocks: [8, 6],
      embeddedPrediction: {
        kind: "numeric",
        prompt: "Si intercambio los dos grupos de lugar, ¿cuántas fichas habrá en total?",
        correctAnswers: ["14"],
        hint: "Cambiar de sitio no quita ninguna ficha.",
        explanation: "Siguen siendo $8 + 6 = 14$.",
      },
    },
    {
      id: "asociativa-reveal",
      type: "reveal",
      title: "Propiedad asociativa",
      definitionBox:
        "Propiedad **asociativa**: el resultado es **independiente** de cómo se agrupen los sumandos. $(a + b) + c = a + (b + c)$.",
      module: "fichas-propiedades",
      scene: "asociativa",
      blocks: [8, 6, 3],
    },
    {
      id: "propiedades-classify",
      type: "classify",
      title: "Conmutativa o asociativa",
      question: "Coloca cada igualdad en su grupo.",
      groups: [
        { id: "conmutativa", label: "Conmutativa", tone: "cobalt" },
        { id: "asociativa", label: "Asociativa", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$7 + 4 = 4 + 7$", group: "conmutativa" },
        { id: "b", text: "$(2 + 5) + 1 = 2 + (5 + 1)$", group: "asociativa" },
        { id: "c", text: "$12 + 3 = 3 + 12$", group: "conmutativa" },
        { id: "d", text: "$4 + (9 + 6) = (4 + 9) + 6$", group: "asociativa" },
      ],
      explanation: "Conmutativa: se intercambian sumandos. Asociativa: se cambia la agrupación.",
    },
    {
      id: "conmutativa-check",
      type: "fill_in_blank",
      title: "Cierra la lección",
      question: "Si $15 + 27 = 42$, ¿cuánto es $27 + 15$? (solo el número)",
      correctAnswers: ["42"],
      explanation: "Por la propiedad conmutativa, el orden no cambia el resultado.",
      whyFichas: { a: 15, b: 27, sum: 42 },
    },
  ],
};
