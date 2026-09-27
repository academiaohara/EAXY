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
    solutionText:
      "Sustituimos $x = 3$ e $y = 2$ en cada ecuación: $3 + 2 = 5$ ✓ y $2 \\cdot 3 - 2 = 4$ ✓. Ambas se cumplen, así que $(3, 2)$ **sí** es solución del sistema.",
    solutionVideoUrl: "https://www.youtube.com/embed/8ZtInClXe1Q",
  },
  {
    id: topicExerciseId(2),
    title: "Sistema compatible determinado",
    statement:
      "Resuelve por sustitución el sistema $\\begin{cases} y = 2x - 1 \\\\ x + y = 8 \\end{cases}$ e indica el par solución.",
    solutionText:
      "De la primera ecuación, $y = 2x - 1$. Sustituimos en la segunda: $x + (2x - 1) = 8$, luego $3x = 9$ y $x = 3$. Entonces $y = 2 \\cdot 3 - 1 = 5$. La solución es $(3, 5)$.",
    solutionVideoUrl: "https://www.youtube.com/embed/8ZtInClXe1Q",
  },
  {
    id: topicExerciseId(3),
    title: "Problema de edades",
    statement:
      "La suma de las edades de Ana y Bruno es 34 años. Ana tiene 4 años más que Bruno. Plantea el sistema y encuentra la edad de cada uno.",
    solutionText:
      "Sea $a$ la edad de Ana y $b$ la de Bruno. El sistema es $\\begin{cases} a + b = 34 \\\\ a = b + 4 \\end{cases}$. Sustituyendo: $(b + 4) + b = 34$, $2b = 30$, $b = 15$ y $a = 19$. Ana tiene 19 años y Bruno 15.",
    solutionVideoUrl: "https://www.youtube.com/embed/8ZtInClXe1Q",
  },
];
