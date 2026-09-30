import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8007-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Consolidación, problemas y autoevaluación de la unidad 7 (fracciones). */
export const fraccionesTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(13),
    title: "Actividad 7 — operaciones grandes (p. 81)",
    statement:
      "Opera: a) $\\frac{1}{4}$ de $384$ b) $\\frac{3}{5}$ de $715$ c) $\\frac{5}{7}$ de $483$.",
    solutionText: "a) $96$ b) $429$ c) $345$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Campamento y bolas (act. 10-11, p. 81)",
    statement:
      "a) $280$ campistas; $\\frac{3}{7}$ españoles. ¿Cuántos españoles?\nb) $40$ bolas; $\\frac{3}{10}$ rojas. ¿Cuántas rojas?",
    solutionText: "a) $(280 : 7) \\cdot 3 = 120$ b) $(40 : 10) \\cdot 3 = 12$ bolas rojas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Precios en el pescadero (act. 12, p. 81)",
    statement:
      "Boquerón $5{,}4\\,€/\\mathrm{kg}$, merluza $13\\,€/\\mathrm{kg}$. ¿Cuánto cuesta $\\frac{1}{4}\\,\\mathrm{kg}$ de boquerones? ¿Y $\\frac{3}{4}\\,\\mathrm{kg}$ de merluza?",
    solutionText:
      "Boquerones: $\\frac{1}{4}$ de $5{,}4 = 1{,}35\\,€$. Merluza: $\\frac{3}{4}$ de $13 = 9{,}75\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Consolidación — fracción de un número (ej. 4-5, p. 86)",
    statement:
      "Calcula: a) $\\frac{2}{3}$ de $192$ b) $\\frac{4}{5}$ de $375$ c) $\\frac{3}{7}$ de $749$ d) $\\frac{3}{4}$ de $332$.",
    solutionText: "a) $128$ b) $300$ c) $321$ d) $249$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Consolidación — decimales (ej. 6-7, p. 86)",
    statement:
      "a) Pasa a decimal: $\\frac{1}{10}$, $\\frac{9}{10}$, $\\frac{17}{10}$, $\\frac{7}{2}$, $\\frac{5}{4}$, $\\frac{5}{8}$.\nb) Asocia: la cuarta parte de euro ($0{,}25\\,€$), tres cuartos ($0{,}75\\,€$), un céntimo ($0{,}01\\,€$).",
    solutionText:
      "a) $0{,}1$; $0{,}9$; $1{,}7$; $3{,}5$; $1{,}25$; $0{,}625$.\nb) $\\frac{1}{4}$↔$0{,}25$; $\\frac{3}{4}$↔$0{,}75$; $\\frac{1}{100}$↔$0{,}01$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Consolidación — equivalentes y simplificar (ej. 8-10, p. 86)",
    statement:
      "a) Empareja equivalentes entre $\\frac{1}{4}$, $\\frac{12}{15}$, $\\frac{4}{5}$, $\\frac{3}{12}$, $\\frac{3}{4}$, $\\frac{12}{28}$, $\\frac{3}{7}$, $\\frac{15}{20}$.\nb) Simplifica: $\\frac{2}{4}$, $\\frac{10}{14}$, $\\frac{5}{15}$, $\\frac{18}{22}$, $\\frac{30}{45}$, $\\frac{56}{80}$, $\\frac{165}{330}$.",
    solutionText:
      "a) $\\frac{1}{4}=\\frac{3}{12}$; $\\frac{4}{5}=\\frac{12}{15}=\\frac{15}{20}$; $\\frac{3}{4}$ solo; $\\frac{3}{7}=\\frac{12}{28}$.\nb) $\\frac{1}{2}$, $\\frac{5}{7}$, $\\frac{1}{3}$, $\\frac{9}{11}$, $\\frac{2}{3}$, $\\frac{7}{10}$, $\\frac{1}{2}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Notas de clase (ej. 11, p. 86)",
    statement:
      "En un control, $18$ suspenden y $7$ aprueban de $25$ alumnos. ¿Qué fracción aprueba? ¿Qué fracción suspende?",
    solutionText:
      "Aprueba: $\\frac{7}{25}$. Suspende: $\\frac{18}{25}$ (o $1 - \\frac{7}{25}$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Minutos en una hora (ej. 12, p. 86)",
    statement:
      "Expresa como fracción de hora: a) $15$ min b) $30$ min c) $10$ min d) $6$ min.",
    solutionText:
      "a) $\\frac{15}{60}=\\frac{1}{4}$ b) $\\frac{1}{2}$ c) $\\frac{10}{60}=\\frac{1}{6}$ d) $\\frac{6}{60}=\\frac{1}{10}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Problema — pilón de riego (ej. 15, p. 87)",
    statement:
      "Un pilón de $45000$ litros ha consumido siete octavas partes. ¿Cuántos litros quedan?",
    solutionText:
      "Consumidos: $\\frac{7}{8}$ de $45000 = 39375$ l. Quedan: $45000 - 39375 = 5625$ l (o $\\frac{1}{8}$ de $45000$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Problema — queso (ej. 16, p. 87)",
    statement:
      "Julia compró $2\\,\\mathrm{kg}\\ 800\\,\\mathrm{g}$ de queso y consumió dos quintos. ¿Cuánto pesa lo que queda?",
    solutionText:
      "$2800\\,\\mathrm{g}$; consumido $\\frac{2}{5}$ → $1120\\,\\mathrm{g}$; quedan $1680\\,\\mathrm{g}$ ($1\\,\\mathrm{kg}\\ 680\\,\\mathrm{g}$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Problema — empanada (ej. 18, p. 87)",
    statement:
      "Compraste $\\frac{2}{5}$ de una empanada que pesó $300\\,\\mathrm{g}$. ¿Cuánto pesaba la empanada entera?",
    solutionText:
      "$\\frac{2}{5}$ del total $= 300$ → total $= 300 : 2 \\cdot 5 = 750\\,\\mathrm{g}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Problema — finca de alfalfa (ej. 19, p. 87)",
    statement:
      "Se sembró $\\frac{4}{5}$ de una finca y quedan $600\\,\\mathrm{m}^2$ sin sembrar. ¿Superficie total?",
    solutionText:
      "Sin sembrar es $\\frac{1}{5}$ → total $= 600 \\cdot 5 = 3000\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Problema — hucha de Rosario (ej. 20, p. 87)",
    statement:
      "Rosario sacó $\\frac{3}{5}$ del dinero de su hucha y le quedan $14\\,€$. ¿Cuánto tenía?",
    solutionText: "Queda $\\frac{2}{5}$ → total $= 14 : 2 \\cdot 5 = 35\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Autoevaluación unidad 7 (p. 87)",
    statement:
      "1) Fracción de hora en $12$ min. 2) $\\frac{3}{10}$, $\\frac{2}{5}$, $\\frac{1}{8}$ en decimal. 3) Oposición: aprueban $15$, suspenden $35$. Fracción de aprobados. 4) Tres cuartos de $240$ y $\\frac{2}{5}$ de $80$. 5) Empareja $\\frac{12}{18}$, $\\frac{1}{5}$, $\\frac{5}{25}$, $\\frac{4}{14}$, $\\frac{8}{12}$, $\\frac{6}{21}$. 6) Simplifica $\\frac{9}{21}$, $\\frac{20}{30}$, $\\frac{36}{48}$. 7) $300$ libros; $\\frac{5}{6}$ novelas.",
    solutionText:
      "1) $\\frac{12}{60}=\\frac{1}{5}$. 2) $0{,}3$; $0{,}4$; $0{,}125$. 3) $\\frac{15}{50}=\\frac{3}{10}$. 4) $180$ y $32$. 5) $\\frac{12}{18}=\\frac{8}{12}=\\frac{2}{3}$; $\\frac{1}{5}=\\frac{5}{25}$; $\\frac{4}{14}=\\frac{6}{21}=\\frac{2}{7}$. 6) $\\frac{3}{7}$, $\\frac{2}{3}$, $\\frac{3}{4}$. 7) $(300:6)\\cdot5=250$ novelas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
