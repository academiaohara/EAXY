import type { LessonStep } from "@/lib/lesson/types";

/**
 * Pasos «escena» de la lección de potencias. Sustituyen a los 4 pasos narrate
 * actuales (base y exponente, cuadrado y cubo, calcular, calculadora).
 * Ajusta los `id` a los que ya uses para no perder el progreso guardado.
 *
 * Colores de la lección: base = ámbar (<mark>), exponente = turquesa (<mark class="suma">).
 */
export const potenciasEscenas: LessonStep[] = [
  {
    id: "base-exponente-narrate",
    type: "narrate",
    title: "Base y exponente",
    definitionBox:
      'Una <mark>potencia</mark> es una forma abreviada de multiplicar el mismo número varias veces. El factor repetido es la <mark>base</mark> y cuántas veces se repite, el <mark class="suma">exponente</mark>.',
    module: "potencias",
    scene: "base-exponente",
    potencias: { scene: "base-exponente", base: 6, exponent: 4 },
  },
  {
    id: "cuadrado-cubo-narrate",
    type: "narrate",
    title: "Cuadrado y cubo",
    definitionBox:
      "El **cuadrado** es exponente $2$ (área de un cuadrado). El **cubo** es exponente $3$ (volumen de un cubo).",
    module: "potencias",
    scene: "cuadrado-cubo",
    potencias: { scene: "cuadrado-cubo", base: 6 },
  },
  {
    id: "calcular-potencia-narrate",
    type: "narrate",
    title: "Calcular una potencia",
    definitionBox:
      "Salvo casos sencillos, las potencias dan números grandes; conviene ir agrupando multiplicaciones paso a paso.",
    module: "potencias",
    scene: "calcular-potencia",
    potencias: { scene: "calcular-potencia", base: 8, exponent: 5 },
  },
  {
    id: "calculadora-narrate",
    type: "narrate",
    title: "Potencias en la calculadora",
    definitionBox:
      'En la calculadora científica usa la tecla de <mark>potencia</mark> ($x^y$): base, exponente y $=$.',
    module: "potencias",
    scene: "calculadora",
    potencias: { scene: "calculadora", base: 8, exponent: 5 },
  },
];
