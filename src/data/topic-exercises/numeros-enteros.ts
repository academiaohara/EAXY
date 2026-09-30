import type { CurriculumTopicExercise } from "@/content/types";
import { numerosEnterosTopicExercisesExtra } from "@/data/topic-exercises/numeros-enteros-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8004-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos del tema «Los números enteros» (1.º ESO, unidad 4). */
const numerosEnterosTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Suma y resta sin paréntesis (ej. resuelto, p. 45)",
    statement: "Calcula: $3 - 8 + 6 - 4$ (operando paso a paso).",
    solutionText:
      "Paso a paso: $3 - 8 + 6 - 4 = -5 + 6 - 4 = 1 - 4 = -3$.\nAgrupando signos: $3 + 6 - 8 - 4 = 9 - 12 = -3$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Restas encadenadas (ej. resuelto, p. 46)",
    statement: "Calcula: $12 - 4 - 6$.",
    solutionText: "$12 - 4 - 6 = 8 - 6 = 2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Agrupar por signo (ej. resuelto, p. 46)",
    statement: "Calcula: $6 - 15 + 4$ sumando primero los del mismo signo.",
    solutionText:
      "$6 - 15 + 4 = 6 + 4 - 15 = 10 - 15 = -5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Reagrupar positivos y negativos (ej. p. 46)",
    statement: "Calcula: $-4 + 6 - 8 + 7$.",
    solutionText:
      "$-4 + 6 - 8 + 7 = 6 + 7 - 4 - 8 = 13 - 12 = 1$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Paréntesis básicos (ej. resuelto, p. 47)",
    statement:
      "Calcula: $(+3)+(+5)$, $(+5)-(+8)$, $(-8)+(-4)$ y $(-7)-(-3)$.",
    solutionText:
      "$(+3)+(+5)=8$.\n$(+5)-(+8)=-3$.\n$(-8)+(-4)=-12$.\n$(-7)-(-3)=-4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Corchetes anidados (ej. resuelto, p. 48)",
    statement: "Calcula: $12 - [8 - (7 - 10) + (2 - 6)]$.",
    solutionText:
      "Dentro de corchetes: $8 - (7-10) + (2-6) = 8 - (-3) + (-4) = 8 + 3 - 4 = 7$.\n$12 - 7 = 5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Paréntesis con signo menos (ej. p. 48)",
    statement: "Calcula: $-[( -8) + (-10) + (-3)]$.",
    solutionText:
      "$-[-8 - 10 - 3] = -[-21] = +21$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Operación combinada (ej. p. 51)",
    statement: "Calcula: $15 - 3 \\cdot [6 - (-12) : (+4)]$.",
    solutionText:
      "Dentro del corchete: $(-12):(+4)=-3$, luego $6-(-3)=9$.\n$15 - 3 \\cdot 9 = 15 - 27 = -12$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Paréntesis en consolidación (ej. p. 52)",
    statement: "Calcula: $11 - (5 - 8 - 6 + 3)$.",
    solutionText:
      "Interior: $5 - 8 - 6 + 3 = -6$.\n$11 - (-6) = 11 + 6 = 17$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Expresión con corchetes (ej. p. 52)",
    statement:
      "Calcula: $[(+2)+(-12)] - [(3-7) - (7-2)]$.",
    solutionText:
      "$[2-12] - [(-4) - 5] = [-10] - [-9] = -10 + 9 = -1$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Orden de mult/div (ej. p. 52)",
    statement:
      "Calcula y compara: $(+48) : [( -6) \\cdot (+4)]$ y $[(+48) : (-6)] \\cdot (+4)$.",
    solutionText:
      "$(+48):[(-6)\\cdot(+4)] = 48:(-24) = -2$.\n$[(+48):(-6)]\\cdot(+4) = (-8)\\cdot(+4) = -32$.\nLa división de enteros **no es asociativa**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Productos y restas (ej. p. 53)",
    statement:
      "Calcula: $(-3)\\cdot(-4) - (+2)\\cdot(-9) - (-7)\\cdot(-5)$.",
    solutionText:
      "$(+12) - (-18) - (+35) = 12 + 18 - 35 = 30 - 35 = -5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const numerosEnterosTopicExercises: CurriculumTopicExercise[] = [
  ...numerosEnterosTopicExercisesBase,
  ...numerosEnterosTopicExercisesExtra,
];
