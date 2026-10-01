import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8009-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Consolidación, problemas y autoevaluación de la unidad 9. */
export const proporcionalidadPorcentajesTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(21),
    title: "Préstamo al 5% (act. 1, p. 106)",
    statement:
      "Rosa pide un préstamo de $4000\\,€$ al $5\\%$ anual. ¿Qué cantidad devolverá al cabo de un año?",
    solutionText: "Intereses: $200\\,€$. Devolución: $4200\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Población — disminución 8% (act. 2, p. 106)",
    statement:
      "Una aldea tenía $250$ habitantes y ha disminuido un $8\\%$. ¿Cuál es la población actual?",
    solutionText: "Pérdida: $20$ habitantes. Población actual: $230$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Proporciones — término desconocido (ej. 2, p. 107)",
    statement:
      "Calcula $x$: a) $\\frac{6}{10} = \\frac{30}{x}$ b) $\\frac{21}{24} = \\frac{28}{x}$ c) $\\frac{14}{21} = \\frac{x}{69}$.",
    solutionText: "a) $x = 50$ b) $x = 32$ c) $x = 46$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Problemas mentales de proporcionalidad (ej. 3, p. 107)",
    statement:
      "a) Dos cajas de galletas cuestan $4\\,€$. ¿Cuánto costarán tres?\nb) $200\\,\\mathrm{g}$ de mortadela cuestan $1{,}80\\,€$. ¿Cuánto cuestan $300\\,\\mathrm{g}$?\nc) Dos jardineros siegan un parque en $3$ h. ¿Cuánto tarda uno solo?",
    solutionText:
      "a) $6\\,€$ b) $2{,}70\\,€$ c) $6$ h (inversa).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Cajas de galletas — peso (ej. 4, p. 107)",
    statement: "Cuatro cajas de galletas pesan $2{,}4\\,\\mathrm{kg}$. ¿Cuánto pesan cinco cajas iguales?",
    solutionText: "Una caja: $0{,}6\\,\\mathrm{kg}$. Cinco: $3\\,\\mathrm{kg}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Fuente — caudal (ej. 5, p. 107)",
    statement:
      "Una fuente arroja $42$ litros en $6$ minutos. ¿Cuántos litros arrojará en $15$ minutos?",
    solutionText: "$42 : 6 = 7$ l/min. En $15$ min: $7 \\cdot 15 = 105$ litros.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Horas extraordinarias (ej. 6, p. 107)",
    statement:
      "Un empleado recibió $60\\,€$ por $5$ horas extraordinarias. ¿Cuánto recibirá por $3$ horas?",
    solutionText: "Directa: $12\\,€$/h. Por $3$ h: $36\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Besugo — precio por peso (ej. 8, p. 107)",
    statement:
      "Un besugo de $1\\,\\mathrm{kg}\\ 200\\,\\mathrm{g}$ cuesta $14{,}40\\,€$. ¿Cuánto costará otro de $800\\,\\mathrm{g}$?",
    solutionText:
      "Precio por gramo constante: $14{,}40 : 1200 = 0{,}012\\,€/\\mathrm{g}$. $800\\,\\mathrm{g}$: $9{,}60\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(29),
    title: "Grifo — caudal inverso (ej. 9, p. 107)",
    statement:
      "Un grifo a $12$ l/min tarda $45$ min en llenar un depósito. ¿Qué caudal (l/min) se necesita para llenarlo en $20$ min?",
    solutionText:
      "Volumen: $12 \\cdot 45 = 540$ l. Caudal: $540 : 20 = 27$ l/min.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(30),
    title: "Club de montañismo (ej. 11, p. 107)",
    statement:
      "Un club tiene $280$ socios. Por cada cinco hombres hay tres mujeres. ¿Cuántos hombres y cuántas mujeres?",
    solutionText:
      "Partes $5 + 3 = 8$. Hombres: $280 \\cdot 5/8 = 175$. Mujeres: $105$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(31),
    title: "Porcentajes — tabla decimal (ej. 12, p. 107)",
    statement:
      "Calcula: a) $20\\%$ de $350$ b) $13\\%$ de $200$ c) $85\\%$ de $420$.",
    solutionText:
      "a) $70$ (o $350 \\cdot 0{,}20$) b) $26$ c) $357$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(32),
    title: "Porcentaje de un número desconocido (ej. 16, p. 108)",
    statement:
      "Completa: a) $\\ \\%$ de $70 = 35$ b) $\\ \\%$ de $230 = 115$ c) $\\ \\%$ de $800 = 200$.",
    solutionText: "a) $50\\%$ b) $50\\%$ c) $25\\%$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(33),
    title: "Leche desnatada — 15% (ej. 18, p. 108)",
    statement:
      "En un supermercado llegan $580$ cajas de leche; el $15\\%$ son desnatadas. ¿Cuántas cajas desnatadas?",
    solutionText: "$15\\%$ de $580 = 87$ cajas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(34),
    title: "Depósito bancario — 4,5% (ej. 19, p. 108)",
    statement:
      "Si depositas $4000\\,€$ un año al $4{,}5\\%$ de interés, ¿qué beneficio obtienes?",
    solutionText: "$4{,}5\\%$ de $4000 = 180\\,€$ de intereses.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(35),
    title: "Autoevaluación — fuente 22 l en 4 min (p. 108)",
    statement:
      "Una fuente arroja $22$ litros en $4$ minutos. ¿Cuántos litros arrojará en $5$ minutos?",
    solutionText: "Reducción a la unidad: $5{,}5$ l/min. En $5$ min: $27{,}5$ litros.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(36),
    title: "Autoevaluación — queso 375 g / 4,50 € (p. 108)",
    statement:
      "Un trozo de queso de $375\\,\\mathrm{g}$ cuesta $4{,}50\\,€$. ¿Cuánto costará otro de $200\\,\\mathrm{g}$?",
    solutionText:
      "$\\frac{375}{200} = \\frac{4{,}50}{x}$ → $x = \\frac{200 \\cdot 4{,}50}{375} = 2{,}40\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(37),
    title: "Autoevaluación — porcentajes (p. 108)",
    statement:
      "Calcula: a) $10\\%$ de $48$ b) $30\\%$ de $350$ c) $65\\%$ de $520$.",
    solutionText: "a) $4{,}8$ b) $105$ c) $338$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(38),
    title: "Autoevaluación — comedor 60% (p. 108)",
    statement:
      "Un colegio tiene $585$ estudiantes; el $60\\%$ usa el comedor. ¿Cuántos alumnos?",
    solutionText: "$351$ estudiantes.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(39),
    title: "Autoevaluación — blusa rebajada 20% (p. 108)",
    statement:
      "Marta compra una blusa de $35\\,€$ con un $20\\%$ de rebaja. ¿Cuánto paga?",
    solutionText: "Rebaja $7\\,€$. Paga $28\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
