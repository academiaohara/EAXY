import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8000-${n.toString().padStart(12, "0")}`;
}

/** Ejercicios de refuerzo del tema «Sistemas de ecuaciones» (4º ESO). */
export const sistemasEcuacionesTopicExercises: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Comprobar una solución en el plano",
    statement:
      "Comprueba si el par $(3, 2)$ es solución del sistema $\\begin{cases} x + y = 5 \\\\ 2x - y = 4 \\end{cases}$.",
    solutionVideoUrl: "https://www.youtube.com/embed/8ZtInClXe1Q",
  },
  {
    id: topicExerciseId(2),
    title: "Sistema compatible determinado",
    statement:
      "Resuelve por sustitución el sistema $\\begin{cases} y = 2x - 1 \\\\ x + y = 8 \\end{cases}$ e indica el par solución.",
    solutionVideoUrl: "https://www.youtube.com/embed/8ZtInClXe1Q",
  },
  {
    id: topicExerciseId(3),
    title: "Problema de edades",
    statement:
      "La suma de las edades de Ana y Bruno es 34 años. Ana tiene 4 años más que Bruno. Plantea el sistema y encuentra la edad de cada uno.",
    solutionVideoUrl: "https://www.youtube.com/embed/8ZtInClXe1Q",
  },
];
