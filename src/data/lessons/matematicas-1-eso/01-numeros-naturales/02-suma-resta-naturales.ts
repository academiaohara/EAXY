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
      id: "restar-faltante-narrate",
      type: "narrate",
      title: "Restar — lo que falta",
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
      id: "resta-diferencia",
      type: "slide",
      title: "Restar es medir la diferencia",
      blocks: [
        {
          kind: "definition",
          text: "**Restar** es quitar, hallar lo que **falta** o lo que **sobra**: calcular la **diferencia** entre dos cantidades.",
        },
        {
          kind: "compare",
          left: {
            title: "Quitar",
            text: "De $828$ quito $693$.",
            math: ["828 - 693 = 135"],
            tone: "info",
          },
          right: {
            title: "Completar",
            text: "¿Cuánto sumo a $693$ para llegar a $828$?",
            math: ["693 + 135 = 828"],
            tone: "ok",
          },
        },
        {
          kind: "text",
          text: "Si el ahorro supera el precio, la misma resta dice cuánto **sobra**. Cambia la lectura, no la cuenta.",
        },
        {
          kind: "warning",
          title: "La resta no admite cambiar el orden",
          text: "$828 - 693 \\neq 693 - 828$. En los naturales, además, solo puedes restar un número menor o igual a otro mayor.",
        },
      ],
      visual: { kind: "anim", scene: "resta-diferencia", params: { a: 693, b: 828 } },
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
      help: [
        {
          label: "¿Qué cambia un paréntesis?",
          message: "Lo que hay dentro se calcula primero. Pregúntate qué cálculo haría que el $9$ baje hasta $5$.",
        },
        {
          label: "Prueba las dos agrupaciones",
          message: "Solo hay dos sitios razonables: $(9 - 1) + 3$ y $9 - (1 + 3)$. Calcula las dos y compara con el $5$.",
        },
      ],
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
      hint: "¿Qué operación conviene agrupar para sumar antes de restar?",
      hintHiddenUntilRequested: true,
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
      blocks: [8, 6, 3],
    },
    {
      id: "calculo-mental-suma",
      type: "slide",
      title: "Las propiedades, como atajos de cálculo",
      blocks: [
        {
          kind: "text",
          text: "Conmutar y asociar no son solo reglas: sirven para **calcular sin papel**. Busca siempre sumas que den **decenas o centenas redondas**.",
        },
        {
          kind: "example",
          title: "Agrupa",
          lines: [
            { math: "38 + 45 + 62 = (38 + 62) + 45 = 100 + 45 = 145", note: "conmutativa + asociativa" },
          ],
        },
        {
          kind: "example",
          title: "Compensa",
          lines: [
            { math: "98 + 29 = 100 + 27 = 127", note: "le quito $2$ a uno y se los doy al otro" },
          ],
        },
        {
          kind: "example",
          title: "Descompón",
          lines: [
            { math: "164 + 54 = 164 + 50 + 4 = 214 + 4 = 218" },
            { math: "71 - 38 = 71 - 40 + 2 = 33", note: "paso de largo y vuelvo" },
          ],
        },
      ],
    },
    {
      id: "mental-predict",
      type: "predict",
      help: [
        {
          label: "Busca números amigos",
          message: "Mira qué dos números suman una decena o una centena redonda. ¿Con quién se completa el $47$?",
        },
        {
          label: "Puedes reordenar",
          message: "En una suma puedes cambiar el orden y agrupar como quieras sin que cambie el resultado.",
        },
        {
          label: "¿Qué opciones no ayudan?",
          message: "Las otras agrupaciones te obligan a sumar primero números que no son redondos.",
        },
      ],
      title: "Elige el atajo",
      question:
        "Quieres calcular $47 + 58 + 53$ de cabeza. ¿Qué agrupación te ahorra más trabajo?",
      mode: "choice",
      choices: [
        {
          id: "a",
          label: "$(47 + 58) + 53$",
          incorrectFeedback: "Funciona, pero $47 + 58 = 105$ no es una cuenta redonda.",
        },
        {
          id: "b",
          label: "$47 + (58 + 53)$",
          incorrectFeedback: "Funciona, pero $58 + 53 = 111$ tampoco es redonda.",
        },
        { id: "c", label: "$(47 + 53) + 58$" },
      ],
      correctChoiceId: "c",
      explanation:
        "Por la conmutativa y la asociativa, $47 + 53 = 100$ y solo queda $100 + 58 = 158$.",
    },
  ],
};
