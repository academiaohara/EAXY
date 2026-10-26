import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const especificacionesTecnicas3esoLesson: InteractiveLesson = {
  slug: "especificaciones-tecnicas-3eso",
  title: "1. Especificaciones técnicas: requisitos que se pueden medir",
  subtitle: TECESO3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la necesidad a la especificación", [
      { kind: "steps", items: [
        "Un requisito como «que sea ligero» es **ambiguo**: cada persona lo interpreta distinto.",
        "Una **especificación técnica** lo convierte en algo medible: **«masa ≤ 500 g»**.",
        "Incluye una **magnitud**, una **unidad** y un **límite** (mínimo, máximo o rango).",
        "Con especificaciones claras se puede **comprobar** si el prototipo es válido y comparar soluciones.",
      ] },
    ], undefined, "stack"),
    slide("tool", "Comprueba un prototipo", [
      { kind: "text", text: "Mueve las medidas de un prototipo y mira qué especificaciones cumple y con qué margen." },
    ], tool("eso3-especificaciones-explorador"), "visual-top"),
    slide("req", "Escribe tus requisitos", [
      { kind: "text", text: "Activa los requisitos de un proyecto y clasifícalos antes de fijar sus límites." },
    ], tool("eso2-requisitos-explorador"), "visual-top"),
    slide("tipos", "Tipos de requisitos", [
      { kind: "steps", items: [
        "**Funcionales**: lo que debe hacer (elevar 2 kg, abrir una puerta).",
        "**Técnicos y de seguridad**: dimensiones, masa, tensión, normativa.",
        "**Económicos y de plazo**: coste máximo, fecha de entrega.",
        "**Ambientales y de uso**: materiales reciclables, accesibilidad, ergonomía.",
        "Se distinguen **obligatorios** (sin ellos no vale) y **deseables** (mejoran el producto).",
      ] },
    ]),
    calc("calc-margen", "Margen", "Una especificación pide masa ≤ 500 g y el prototipo pesa 430 g. ¿Qué margen (%) respecto al límite queda? ((500 − 430) / 500 · 100)", nums(14), "70 / 500 = 0,14 = 14 %.", "Diferencia entre el límite y el valor, dividida por el límite."),
    calc("calc-rango", "Dentro del rango", "La altura debe estar entre 180 y 220 mm. Un prototipo mide 225 mm. ¿Cuántos mm se sale del rango?", nums(5), "225 − 220 = 5 mm por encima del máximo.", "Compara con el límite superior."),
    sort("clasifica-req", "¿Medible o ambiguo?", "Clasifica cada requisito.",
      [["med", "Especificación medible", "emerald"], ["amb", "Requisito ambiguo", "rose"]],
      [["Masa ≤ 500 g", "med"], ["Soportar al menos 40 N", "med"], ["Coste de materiales ≤ 12 €", "med"], ["Que sea ligero", "amb"], ["Que sea resistente", "amb"], ["Que quede bonito", "amb"]],
      "Si no se puede medir con una unidad, no se puede comprobar.",
    ),
    pick("check-spec", "Qué falta", "«El soporte debe aguantar bastante peso». ¿Qué le falta para ser una especificación técnica?",
      "Un valor y una unidad: por ejemplo «carga ≥ 40 N»",
      [["Más adjetivos", "No lo hace medible."], ["Un color", "No es una prestación."], ["Nada: ya es técnica", "«Bastante» no se puede medir."]],
      "Sin valor y unidad no se puede comprobar con el prototipo.",
    ),
  ],
};
