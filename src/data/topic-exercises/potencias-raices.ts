import type { CurriculumTopicExercise } from "@/content/types";
import { potenciasRaicesTopicExercisesExtra } from "@/data/topic-exercises/potencias-raices-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8002-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos del tema «Potencias y raíces» (1.º ESO, unidad 2). */
const potenciasRaicesTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Glóbulos rojos en forma abreviada",
    statement:
      "Un ser humano tiene unos $25\\,000\\,000\\,000$ glóbulos rojos en sangre. Exprésalo en forma abreviada con potencias de $10$.",
    solutionText:
      "$25\\,000\\,000\\,000 = 25 \\cdot 10^9$ glóbulos rojos.\n(Se escribe $25$ seguido de $9$ ceros.)",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Moléculas en un litro de agua",
    statement:
      "En un litro de agua hay unas $330\\,000\\,000\\,000\\,000\\,000\\,000\\,000$ moléculas. Escríbelo en forma abreviada.",
    solutionText:
      "Hay $23$ ceros tras el $33$:\n$330\\,000\\,000\\,000\\,000\\,000\\,000\\,000 = 33 \\cdot 10^{23}$ moléculas\n(también puede escribirse $3{,}3 \\cdot 10^{24}$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Baldosas en habitación cuadrada (ej. 9)",
    statement:
      "Para cubrir el suelo cuadrado de una habitación se colocan $22$ filas de $22$ baldosas. ¿Cuántas baldosas se usan?",
    solutionText:
      "Es un cuadrado de lado $22$:\n$22 \\cdot 22 = 22^2 = 484$ baldosas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Cubitos de Marta (ej. 10)",
    statement:
      "Marta forma un cubo de $10$ cm de arista con cubitos de $1$ cm de arista. ¿Cuántos cubitos usa?",
    solutionText:
      "Volumen en cubitos unitarios: $10^3 = 1000$ cubitos.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Alambrada de finca cuadrada (ej. 11)",
    statement:
      "Una finca cuadrada tiene $900$ m² de superficie. ¿Cuántos metros lineales de alambrada hacen falta para cercarla?",
    solutionText:
      "Lado del cuadrado: $\\sqrt{900} = 30$ m.\nPerímetro: $4 \\cdot 30 = 120$ m de alambrada.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Cubo de $5\\times5\\times5$ pintado (ej. 12)",
    statement:
      "Un cubo de $5\\times5\\times5$ cubitos unitarios se pinta de rojo por fuera. a) ¿Cuántos cubitos quedan parcialmente pintados? b) Si lo recubrimos con una capa verde completa, ¿cuántos cubitos verdes hacen falta?",
    solutionText:
      "a) Los cubitos pintados son los de la capa exterior: $5^3 - 3^3 = 125 - 27 = 98$ (todos ellos quedan al menos parcialmente pintados).\nb) Cubo exterior de lado $7$: hacen falta $7^3 - 5^3 = 343 - 125 = 218$ cubitos verdes.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Moqueta en nave cuadrada (autoeval. 6)",
    statement:
      "¿Cuántos cuadros de moqueta de $1$ m de lado hacen falta para cubrir una nave cuadrada de $30$ m de lado?",
    solutionText:
      "Superficie: $30 \\cdot 30 = 30^2 = 900$ m².\nSe necesitan **$900$** cuadros de $1$ m².",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Cuadrícula de Héctor (autoeval. 7)",
    statement:
      "Héctor dibuja una cuadrícula igual de ancha que de alta con $225$ cuadros. ¿Cuántas filas y columnas debe poner?",
    solutionText:
      "$225 = 15^2$, así que la cuadrícula es de **$15$ filas** y **$15$ columnas**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Ejercicios resueltos — raíces con tabla",
    statement:
      "Usando $37^2=1369$, $38^2=1444$ y $39^2=1521$, calcula $\\sqrt{1440}$, $\\sqrt{1444}$ y $\\sqrt{1580}$ (exacta o entera).",
    solutionText:
      "$\\sqrt{1440}$: entre $37$ y $38$ → **raíz entera $37$** ($37^2=1369<1440<1444$).\n$\\sqrt{1444}=38$ → **raíz exacta**.\n$\\sqrt{1580}$: entre $39$ y $40$ → **raíz entera $39$** ($39^2=1521<1580<1600$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const potenciasRaicesTopicExercises: CurriculumTopicExercise[] = [
  ...potenciasRaicesTopicExercisesBase,
  ...potenciasRaicesTopicExercisesExtra,
];
