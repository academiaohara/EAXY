import type { CurriculumTopicExercise } from "@/content/types";
import { proporcionalidadPorcentajesTopicExercisesExtra } from "@/data/topic-exercises/proporcionalidad-porcentajes-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8009-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejemplos resueltos y actividades clave del tema «Proporcionalidad y porcentajes» (1.º ESO, unidad 9). */
const proporcionalidadPorcentajesTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Cromos — tabla de precios (act. 1, p. 98)",
    statement:
      "Lola compra cinco cromos por $0{,}40\\,€$. Completa: ¿cuánto cuestan $10$ cromos? ¿Y $15$?",
    solutionText:
      "Proporcionalidad directa: $5$ cromos → $0{,}40\\,€$. Un cromo: $0{,}40 : 5 = 0{,}08\\,€$.\n$10$ cromos: $0{,}80\\,€$. $15$ cromos: $1{,}20\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Paquetes de galletas — peso (act. 2, p. 98)",
    statement:
      "Dos paquetes de galletas pesan $0{,}5\\,\\mathrm{kg}$. ¿Cuánto pesan $4$ paquetes?",
    solutionText:
      "Un paquete: $0{,}5 : 2 = 0{,}25\\,\\mathrm{kg}$.\nCuatro paquetes: $0{,}25 \\cdot 4 = 1\\,\\mathrm{kg}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Magnitudes directa o inversa (act. 3-4, p. 98-99)",
    statement:
      "Clasifica (D directa, I inversa, X no proporcional): a) peso sandía y precio; b) edad y altura; c) tiempo caminando a velocidad constante y distancia; d) operarios y tiempo de trabajo; e) velocidad coche y tiempo entre dos ciudades.",
    solutionText:
      "a) D b) X c) D d) I e) I.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Operarios en el polideportivo (act. 5, p. 99)",
    statement:
      "Cinco operarios limpian un polideportivo en $6$ horas. ¿Cuánto tardarían $3$ operarios? ¿Y $10$?",
    solutionText:
      "Inversa: $5 \\cdot 6 = 30$. Con $3$: $30 : 3 = 10$ h. Con $10$: $30 : 10 = 3$ h.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Caballos y heno (p. 98-99)",
    statement:
      "Con $4$ caballos una carga dura $15$ días. ¿Cuántos días dura con $2$ caballos? ¿Con $6$?",
    solutionText:
      "Producto constante $4 \\cdot 15 = 60$. Con $2$: $30$ días. Con $6$: $10$ días.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Chocolatinas — reducción a la unidad (p. 100)",
    statement: "Tres chocolatinas pesan $60\\,\\mathrm{g}$. ¿Cuánto pesan cuatro chocolatinas?",
    solutionText:
      "Una: $60 : 3 = 20\\,\\mathrm{g}$. Cuatro: $20 \\cdot 4 = 80\\,\\mathrm{g}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Chocolatinas — regla de tres (p. 101)",
    statement: "Tres chocolatinas pesan $60\\,\\mathrm{g}$. ¿Cuánto pesan ocho chocolatinas?",
    solutionText:
      "$\\frac{3}{8} = \\frac{60}{x}$ → $x = \\frac{60 \\cdot 8}{3} = 160\\,\\mathrm{g}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Manantial y garrafa (problema resuelto, p. 100-101)",
    statement:
      "Un manantial arroja $6$ litros por minuto. ¿Cuánto tarda en llenar una garrafa de $20$ litros?",
    solutionText:
      "Para $1$ l: $60\\,\\mathrm{s} : 6 = 10\\,\\mathrm{s}$. Para $20$ l: $200\\,\\mathrm{s} = 3\\,\\mathrm{min}\\ 20\\,\\mathrm{s}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Manzanas — reducción a la unidad (act. 1, p. 101)",
    statement: "Tres kilos de manzanas cuestan $3{,}75\\,€$. ¿Cuánto cuestan cuatro kilos?",
    solutionText:
      "Un kilo: $3{,}75 : 3 = 1{,}25\\,€$. Cuatro kilos: $1{,}25 \\cdot 4 = 5\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Salmón ahumado — regla de tres (act. 5, p. 101)",
    statement:
      "Si $100\\,\\mathrm{g}$ de salmón ahumado cuestan $2{,}40\\,€$, ¿cuánto costarán $260\\,\\mathrm{g}$?",
    solutionText:
      "$\\frac{100}{260} = \\frac{2{,}40}{x}$ → $x = \\frac{260 \\cdot 2{,}40}{100} = 6{,}24\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Queso — regla de tres (act. 6, p. 101)",
    statement:
      "Un trozo de queso de $400\\,\\mathrm{g}$ cuesta $4{,}60\\,€$. ¿Cuánto cuesta otro de $320\\,\\mathrm{g}$?",
    solutionText:
      "$\\frac{400}{320} = \\frac{4{,}60}{x}$ → $x = \\frac{320 \\cdot 4{,}60}{400} = 3{,}68\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Motorista en autopista (act. 7, p. 101)",
    statement:
      "Un motorista recorre $4{,}8\\,\\mathrm{km}$ en $3$ minutos a velocidad constante. ¿Qué distancia recorrerá en $10$ minutos?",
    solutionText:
      "Proporcionalidad directa: $\\frac{3}{10} = \\frac{4{,}8}{d}$ → $d = \\frac{4{,}8 \\cdot 10}{3} = 16\\,\\mathrm{km}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Aparcamiento — 20% de coches rojos (p. 102)",
    statement:
      "En un aparcamiento hay $300$ coches. El $20\\%$ son rojos. ¿Cuántos coches rojos hay?",
    solutionText: "$300 : 100 = 3$; $3 \\cdot 20 = 60$ coches rojos.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "65% de 540 (ejemplo, p. 102)",
    statement: "Calcula el $65\\%$ de $540$.",
    solutionText:
      "$(540 : 100) \\cdot 65 = 5{,}4 \\cdot 65 = 351$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Tienda de balones — 45% (ej. resuelto, p. 103)",
    statement:
      "Una tienda vende el $45\\%$ de los $800$ balones de su almacén. ¿Cuántos ha vendido?",
    solutionText: "$(800 : 100) \\cdot 45 = 8 \\cdot 45 = 360$ balones.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "15% de 80 como fracción (p. 104)",
    statement: "Calcula el $15\\%$ de $80$ usando la fracción $\\frac{15}{100}$.",
    solutionText:
      "$15\\%$ de $80 = \\frac{15}{100}$ de $80 = (80 : 100) \\cdot 15 = 12$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Porcentajes 65% y 8% (ej. resuelto, p. 104)",
    statement: "Calcula: a) $65\\%$ de $590$ b) $8\\%$ de $475$.",
    solutionText:
      "a) $(590 : 100) \\cdot 65 = 383{,}5$ b) $(475 : 100) \\cdot 8 = 38$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Porcentajes especiales — cálculo mental (act. 11, p. 105)",
    statement:
      "Calcula mentalmente: a) $50\\%$ de $84$ b) $25\\%$ de $48$ c) $20\\%$ de $55$ d) $10\\%$ de $240$.",
    solutionText: "a) $42$ b) $12$ c) $11$ d) $24$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Billete a París — aumento 20% (p. 106)",
    statement:
      "Un billete a París costaba $460\\,€$ y ha subido un $20\\%$. ¿Cuál es el precio actual?",
    solutionText:
      "Aumento: $20\\%$ de $460 = 92\\,€$. Precio nuevo: $460 + 92 = 552\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Televisor — rebaja 15% (p. 106)",
    statement:
      "Un televisor costaba $900\\,€$ y tiene una rebaja del $15\\%$. ¿Cuánto cuesta ahora?",
    solutionText:
      "Rebaja: $135\\,€$. Precio final: $900 - 135 = 765\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const proporcionalidadPorcentajesTopicExercises: CurriculumTopicExercise[] = [
  ...proporcionalidadPorcentajesTopicExercisesBase,
  ...proporcionalidadPorcentajesTopicExercisesExtra,
];
