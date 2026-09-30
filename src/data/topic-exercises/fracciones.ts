import type { CurriculumTopicExercise } from "@/content/types";
import { fraccionesTopicExercisesExtra } from "@/data/topic-exercises/fracciones-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8007-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejemplos resueltos y actividades clave del tema «Las fracciones» (1.º ESO, unidad 7). */
const fraccionesTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Biblioteca — fracción prestada (ej. resuelto, p. 85)",
    statement:
      "De los $1575$ volúmenes de la biblioteca, $630$ están prestados. ¿Qué fracción de libros está prestada?",
    solutionText:
      "$\\frac{630}{1575}$. Simplificando: $\\frac{630}{1575} = \\frac{210}{525} = \\frac{70}{175} = \\frac{14}{35} = \\frac{2}{5}$.\nEstán prestados $\\frac{2}{5}$ de los libros.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Biblioteca — libros prestados (ej. directo, p. 85)",
    statement:
      "Hay $1575$ volúmenes; están prestados dos quintas partes. ¿Cuántos libros hay prestados?",
    solutionText:
      "$\\frac{2}{5}$ de $1575 = (1575 : 5) \\cdot 2 = 315 \\cdot 2 = 630$ libros.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Hipoteca — calcular la fracción (act. 1, p. 85)",
    statement:
      "De los $1800\\,€$ mensuales, $540\\,€$ van a la hipoteca. ¿Qué fracción del sueldo se dedica a la hipoteca?",
    solutionText:
      "$\\frac{540}{1800} = \\frac{54}{180} = \\frac{27}{90} = \\frac{3}{10}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Hipoteca — tres décimas (act. 2, p. 85)",
    statement:
      "Un empleado gana $1800\\,€$ al mes y dedica tres décimas partes a la hipoteca. ¿Cuánto paga al mes?",
    solutionText: "$\\frac{3}{10}$ de $1800 = (1800 : 10) \\cdot 3 = 540\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Actividad 4 — comparar con la unidad (p. 80)",
    statement:
      "Indica si es menor, igual o mayor que la unidad: a) $\\frac{2}{7}$ b) $\\frac{3}{2}$ c) $\\frac{6}{6}$ d) $\\frac{8}{5}$ e) $\\frac{3}{3}$ f) $\\frac{5}{6}$.",
    solutionText:
      "a) Menor b) Mayor c) Igual ($1$) d) Mayor e) Igual f) Menor.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Actividad 5 — cálculo mental (p. 81)",
    statement:
      "Calcula mentalmente: a) $\\frac{1}{4}$ y $\\frac{3}{4}$ de $8$ b) $\\frac{1}{3}$ y $\\frac{2}{3}$ de $12$ c) $\\frac{1}{5}$ y $\\frac{3}{5}$ de $20$.",
    solutionText:
      "a) $2$ y $6$ b) $4$ y $8$ c) $4$ y $12$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Actividad 6 — fracción de un número (p. 81)",
    statement:
      "Calcula: a) $\\frac{2}{5}$ de $15$ b) $\\frac{3}{4}$ de $12$ c) $\\frac{3}{7}$ de $21$ d) $\\frac{2}{3}$ de $30$ e) $\\frac{4}{5}$ de $30$ f) $\\frac{3}{8}$ de $24$.",
    solutionText: "a) $6$ b) $9$ c) $9$ d) $20$ e) $24$ f) $9$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Bombones y clase (act. 8-9, p. 81)",
    statement:
      "a) De $24$ bombones se consume $\\frac{1}{6}$. ¿Cuántos se comen y cuántos quedan?\nb) En una clase de $27$, las chicas son $\\frac{4}{9}$. ¿Cuántas chicas y cuántos chicos?",
    solutionText:
      "a) Comidos: $24 : 6 = 4$; quedan $20$.\nb) Chicas: $(27 : 9) \\cdot 4 = 12$; chicos: $15$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Actividad 14 — fracción a decimal (p. 82)",
    statement:
      "Copia y completa: a) $\\frac{1}{8} = 1 : 8 = \\ldots$ b) $\\frac{7}{9} = 7 : 9 = \\ldots$ c) $\\frac{3}{10} = \\ldots$ d) $\\frac{5}{12} = \\ldots$",
    solutionText:
      "a) $0{,}125$ b) $0{,}777\\ldots$ c) $0{,}3$ d) $0{,}416\\ldots$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Actividad 16 — pasar a decimal (p. 82)",
    statement:
      "Pasa a forma decimal: a) $\\frac{3}{8}$ b) $\\frac{5}{4}$ c) $\\frac{7}{10}$ d) $\\frac{5}{2}$ e) $\\frac{2}{3}$ f) $\\frac{1}{6}$.",
    solutionText:
      "a) $0{,}375$ b) $1{,}25$ c) $0{,}7$ d) $2{,}5$ e) $0{,}666\\ldots$ f) $0{,}166\\ldots$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Actividad 2 — equivalencia por valor (p. 84)",
    statement:
      "¿Son equivalentes? a) $\\frac{3}{5}$ y $\\frac{6}{10}$ b) $\\frac{1}{4}$ y $\\frac{3}{8}$ c) $\\frac{4}{6}$ y $\\frac{6}{9}$ d) $\\frac{2}{3}$ y $\\frac{4}{9}$.",
    solutionText:
      "a) Sí ($0{,}6$) b) No ($0{,}25$ vs $0{,}375$) c) Sí ($\\frac{2}{3}$) d) No.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Actividad 7 — simplificar (p. 84)",
    statement:
      "Simplifica: a) $\\frac{6}{8}$ b) $\\frac{3}{6}$ c) $\\frac{5}{10}$ d) $\\frac{9}{12}$ e) $\\frac{10}{18}$ f) $\\frac{21}{28}$.",
    solutionText:
      "a) $\\frac{3}{4}$ b) $\\frac{1}{2}$ c) $\\frac{1}{2}$ d) $\\frac{3}{4}$ e) $\\frac{5}{9}$ f) $\\frac{3}{4}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const fraccionesTopicExercises: CurriculumTopicExercise[] = [
  ...fraccionesTopicExercisesBase,
  ...fraccionesTopicExercisesExtra,
];
