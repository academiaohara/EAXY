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
      module: "tienda-ciclista",
      scene: "sumar-cesta",
      tienda: {
        items: EQUIPO_CICLISTA,
        mode: "sumar-cesta",
      },
    },
    {
      id: "restar-narrate",
      type: "narrate",
      title: "¿Cuánto queda del presupuesto?",
      definitionBox:
        "Restar es **quitar**, **suprimir**, hallar lo que **falta** o lo que **sobra**; es decir, calcular la **diferencia**.",
      module: "tienda-ciclista",
      scene: "restar-cartera",
      tienda: {
        items: EQUIPO_CICLISTA,
        wallet: 828,
        mode: "restar-cartera",
      },
    },
    {
      id: "parentesis-explore",
      type: "explore",
      title: "Coloca el paréntesis",
      question:
        "En $9 - 1 + 3$, coloca un paréntesis para que el resultado sea $5$.",
      module: "piramide-reduccion",
      scene: "explorar-parentesis",
      goal: {
        kind: "expression-result",
        tokens: ["9", "-", "1", "+", "3"],
        target: 5,
      },
      hint: "¿Qué operación conviene agrupar para restar antes de sumar?",
      explanation:
        "Prueba $9 - (1 + 3)$: primero $1 + 3 = 4$ y luego $9 - 4 = 5$.",
    },
    {
      id: "conmutativa-reveal",
      type: "reveal",
      title: "Dos propiedades de la suma",
      definitionBox:
        "En la suma podemos **cambiar el orden** de los sumandos o **agruparlos de otra forma** sin cambiar el total.",
      module: "bloques-numericos",
      scene: "propiedades-suma",
      blocks: [8, 6, 3],
    },
  ],
};
