import type { CurriculumTopicExercise } from "@/content/types";
import { algebraTopicExercisesExtra } from "@/data/topic-exercises/algebra-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8011-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejemplos resueltos del tema «Álgebra» (1.º ESO, unidad 8 — Tema 10). */
const algebraTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Edad de Juan (problema resuelto, p. 111)",
    statement:
      "La edad de Juan dentro de 15 años será igual al doble de la que tenía el año pasado. ¿Cuál es su edad actual?",
    solutionText:
      "Sea $x$ la edad actual.\n$x + 15 = 2(x - 1) \\Rightarrow x + 15 = 2x - 2 \\Rightarrow 17 = x$.\nJuan tiene **17 años**. Comprobación: $17 + 15 = 32$ y $2 \\cdot 16 = 32$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Ecuación con tablas $4 + 2x = x + 10$ (p. 111)",
    statement: "Resuelve la ecuación $4 + 2x = x + 10$.",
    solutionText:
      "$4 + 2x = x + 10 \\Rightarrow 2x - x = 10 - 4 \\Rightarrow x = 6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Suma de monomios semejantes (p. 112)",
    statement: "Reduce: $4x + 2x$, $5x - 3x$ y $7x - (2x + x)$.",
    solutionText:
      "$4x + 2x = 6x$.\n$5x - 3x = 2x$.\n$7x - (2x + x) = 7x - 3x = 4x$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Producto de monomios (p. 113)",
    statement: "Multiplica: $(2x) \\cdot (4y)$ y $(-2a) \\cdot 5a$.",
    solutionText:
      "$(2x) \\cdot (4y) = 8xy$.\n$(-2a) \\cdot 5a = -10a^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Ecuación frente a identidad (p. 114)",
    statement:
      "¿Es $3x - 4 = 8$ una ecuación o una identidad? ¿Y $6x - 4x = 2x$?",
    solutionText:
      "$3x - 4 = 8$ es **ecuación** (solo $x = 4$).\n$6x - 4x = 2x$ es **identidad** (válida para todo $x$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Resolver $x + 4 = 7$ (p. 115)",
    statement: "Resuelve $x + 4 = 7$ restando en ambos miembros.",
    solutionText:
      "$x + 4 - 4 = 7 - 4 \\Rightarrow x = 3$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Resolver $x - 2 = 6$ (p. 115)",
    statement: "Resuelve $x - 2 = 6$.",
    solutionText: "$x - 2 + 2 = 6 + 2 \\Rightarrow x = 8$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Resolver $3x = 15$ y $\\frac{x}{4} = 3$ (p. 116)",
    statement: "Resuelve $3x = 15$ y $\\frac{x}{4} = 3$.",
    solutionText:
      "$3x = 15 \\Rightarrow x = 5$.\n$\\frac{x}{4} = 3 \\Rightarrow x = 12$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Ecuación completa $7x - 2x + 4 = 8 + 3x + 2$ (p. 117)",
    statement: "Resuelve paso a paso: $7x - 2x + 4 = 8 + 3x + 2$.",
    solutionText:
      "Reducimos: $5x + 4 = 10 + 3x$.\nTransponemos: $2x + 4 = 10 \\Rightarrow 2x = 6 \\Rightarrow x = 3$.\nComprobación: $7 \\cdot 3 - 2 \\cdot 3 + 4 = 19$ y $8 + 3 \\cdot 3 + 2 = 19$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Ejercicio resuelto $5 - 4x = 7 + 8x - 6$ (p. 118)",
    statement: "Resuelve: $5 - 4x = 7 + 8x - 6$.",
    solutionText:
      "$5 - 4x = 1 + 8x \\Rightarrow 5 - 1 = 12x \\Rightarrow x = \\frac{1}{3}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const algebraTopicExercises: CurriculumTopicExercise[] = [
  ...algebraTopicExercisesBase,
  ...algebraTopicExercisesExtra,
];
