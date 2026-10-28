import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const conceptoFuerzaVectoresFq2Lesson: InteractiveLesson = {
  slug: "concepto-fuerza-vectores-fq2",
  title: "1. Las fuerzas y su representación",
  subtitle: FQ2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "¿Qué es una fuerza?", [
      { kind: "steps", items: [
        "Una **fuerza** es una **interacción** entre cuerpos que puede **cambiar su estado de movimiento** o **deformarlos**.",
        "Efectos: **poner en movimiento**, **frenar**, **cambiar la dirección** o **deformar** (estirar, aplastar, doblar).",
        "Se mide en **newton (N)**, con un instrumento llamado **dinamómetro**. 1 N es aproximadamente el peso de una manzana pequeña (100 g).",
        "Las fuerzas son **de contacto** (empujar, tirar) o **a distancia** (gravedad, magnetismo, electricidad).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una fuerza es una flecha", [
      { kind: "text", text: "Cambia el módulo y el ángulo de una fuerza. Mira cómo se descompone en un efecto horizontal y otro vertical." },
    ], tool("fq2-fuerza-vector-explorador"), "visual-top"),
    slide("vector", "Magnitud vectorial", [
      { kind: "steps", items: [
        "Una fuerza no se define solo por su valor: es una **magnitud vectorial**.",
        "Un **vector** tiene **módulo** (valor, en N), **dirección** (recta sobre la que actúa), **sentido** (hacia dónde) y **punto de aplicación** (dónde se ejerce).",
        "Se dibuja como una **flecha**: la longitud es proporcional al módulo y la punta marca el sentido.",
        "Una fuerza oblicua se puede **descomponer** en una componente horizontal y otra vertical.",
      ] },
    ]),
    calc("calc-N", "A newton", "Una manzana pesa aproximadamente 1 N. ¿Cuántos newton pesan 5 manzanas iguales?", nums(5), "5 · 1 = 5 N.", "Suma de pesos."),
    calc("calc-esc", "Escala", "Se dibuja una fuerza con la escala 1 cm = 10 N. ¿Cuántos cm mide la flecha de una fuerza de 45 N?", nums(4.5), "45 / 10 = 4,5 cm.", "Divide entre 10."),
    calc("calc-comp", "Componente", "Una fuerza de 50 N apunta en horizontal. ¿Cuánto vale su componente vertical, en N?", nums(0), "Es horizontal: no tiene componente vertical (0 N).", "El ángulo con la horizontal es 0°."),
    sort("clasifica", "Contacto o a distancia", "Clasifica cada fuerza.",
      [["con", "De contacto", "cobalt"], ["dis", "A distancia", "amber"]],
      [["Empujar una puerta", "con"], ["Tirar de una cuerda", "con"], ["La fuerza de rozamiento", "con"], ["El peso de un objeto", "dis"], ["La fuerza de un imán", "dis"], ["La atracción entre cargas eléctricas", "dis"]],
      "Las de contacto necesitan tocar; las otras actúan sin contacto.",
    ),
    pick("check", "Elementos del vector", "¿Cuál de estos NO es un elemento de una fuerza representada por un vector?",
      "El color",
      [["El módulo", "Es el valor de la fuerza."], ["El sentido", "Es hacia dónde actúa."], ["El punto de aplicación", "Es dónde se ejerce."]],
      "Un vector tiene módulo, dirección, sentido y punto de aplicación.",
    ),
  ],
};
