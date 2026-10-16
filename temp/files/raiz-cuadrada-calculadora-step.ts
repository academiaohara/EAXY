/**
 * Paso de catálogo — Tema 2, lección raíz cuadrada, escena calculadora.
 * Canon: src/data/lessons/raiz-cuadrada-naturales.ts
 */
import type { NarrateStep } from "@/lib/lesson/types";

export const raizCalculadoraStepExample: Pick<
  NarrateStep,
  "id" | "type" | "title" | "definitionBox" | "module" | "scene" | "raices"
> = {
  id: "raiz-calculadora-narrate",
  type: "narrate",
  title: "Raíz en la calculadora",
  definitionBox: "En la calculadora: tecla $\\sqrt{\\square}$, el radicando y $=$.",
  module: "raices-cuadradas",
  scene: "raiz-calculadora",
  raices: { scene: "raiz-calculadora", radicand: 144 },
};

/** Potencias (referencia): src/data/lessons/potencias-base-exponente.ts — id `calculadora-potencia`, scene `calculadora`. */
