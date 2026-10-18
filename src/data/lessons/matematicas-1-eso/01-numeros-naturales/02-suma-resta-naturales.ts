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
      help: [
        {
          label: "Una idea, muchos nombres",
          message: "Unir, juntar y añadir son lo mismo: partes que se convierten en un total.",
        },
        {
          label: "Un ejemplo",
          message: "Si tienes $3$ euros y te dan $4$, juntas $7$.",
        },
      ],
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
      help: [
        {
          label: "Dos lecturas",
          message: "Restar puede ser quitar (lo que queda) o completar (lo que falta). La cuenta es la misma.",
        },
        {
          label: "Un ejemplo",
          message: "Tienes $8$ € y la bici cuesta $20$ €: lo que falta es $20 - 8 = 12$.",
        },
      ],
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
      help: [
        {
          label: "Quitar o completar",
          message: "$828 - 693$: o quitas $693$ de $828$, o preguntas cuánto sumar a $693$ para llegar a $828$.",
        },
        {
          label: "El orden importa",
          message: "A diferencia de la suma, $828 - 693$ y $693 - 828$ son distintos (y la segunda no existe entre naturales).",
        },
        {
          label: "Comprueba con una suma",
          message: "Sumando el resultado al sustraendo debes recuperar el minuendo.",
        },
      ],
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
      help: [
        {
          label: "El paréntesis como paquete",
          message: "Lo que hay dentro se calcula primero y se trata como un único número.",
        },
        {
          label: "Dos paréntesis distintos",
          message: "$9 - (1 + 3)$ y $(9 - 1) + 3$ no dan lo mismo: el paréntesis cambia el orden.",
        },
      ],
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
      help: [
        {
          label: "Cambia el orden de los sumandos",
          message: "Dos bloques juntos pesan lo mismo da igual cuál pongas primero.",
        },
        {
          label: "¿Sirve para algo?",
          message: "Para agrupar primero lo que suma una cifra redonda.",
        },
      ],
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
      help: [
        {
          label: "Agrupa de otra forma",
          message: "Con tres bloques, puedes juntar primero los dos primeros o los dos últimos: el total es el mismo.",
        },
        {
          label: "¿Para qué?",
          message: "Para escoger la pareja que da un número redondo.",
        },
      ],
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
      help: [
        {
          label: "Tres estrategias",
          message: "Agrupar (buscar sumas redondas), compensar (quitar a uno y dar a otro) y descomponer (separar en decenas y unidades).",
        },
        {
          label: "Un ejemplo tuyo",
          message: "Prueba $59 + 38$: compensa dándole $1$ al $59$ para que sea $60$.",
        },
        {
          label: "Con la resta",
          message: "Para $71 - 38$, restar $40$ y devolver $2$ es más fácil que restar $38$ directamente.",
        },
      ],
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
