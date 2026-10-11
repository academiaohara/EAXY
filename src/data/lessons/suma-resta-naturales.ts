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
  title: "2. Suma y resta",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "paper" },
  steps: [
    {
      id: "sumar-narrate",
      type: "narrate",
      title: "Sumar",
      definitionBox: "Recuerda que **sumar** es **unir**, **juntar**, **añadir**.",
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
      title: "Restar",
      definitionBox:
        "Recuerda que **restar** es **quitar**, **suprimir**, hallar lo que **falta** o lo que **sobra**; es decir, calcular la **diferencia**.",
      module: "tienda-ciclista",
      scene: "calcular-faltante",
      tienda: {
        items: EQUIPO_CICLISTA,
        mode: "calcular-faltante",
        savedAmount: 693,
      },
    },
    {
      id: "parentesis-narrate",
      type: "narrate",
      title: "Uso del paréntesis",
      definitionBox:
        "En operaciones combinadas, los paréntesis **empaquetan resultados parciales**, **modificando el orden** en que han de hacerse las operaciones.",
      module: "piramide-reduccion",
      scene: "dual-parentesis",
      piramide: { variant: "dual-parentesis" },
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
      title: "Propiedad conmutativa",
      definitionBox:
        "La suma **no varía** al cambiar el orden de los sumandos: $a + b = b + a$.",
      module: "bloques-numericos",
      scene: "conmutativa",
      blocks: [8, 6],
    },
    {
      id: "asociativa-reveal",
      type: "reveal",
      title: "Propiedad asociativa",
      definitionBox:
        "El resultado de la suma es **independiente** de cómo se **agrupen** los sumandos: $(a + b) + c = a + (b + c)$.",
      module: "bloques-numericos",
      scene: "asociativa",
      blocks: [3, 2, 6],
    },
  ],
};
