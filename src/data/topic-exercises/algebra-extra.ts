import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8008-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Actividades, consolidación y autoevaluación — unidad 8 Álgebra (Tema 10, 1.º ESO). */
export const algebraTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(11),
    title: "Calcula $a$ y $b$ en sumas y restas (act. 1, p. 111)",
    statement:
      "Calcula el valor de $a$ en la suma y de $b$ en la resta: a) $2 + a = 7$ b) $3 + a - b = 4$, con $a = 2$ y $b = 9$.",
    solutionText:
      "a) $a = 7 - 2 = 5$.\nb) $3 + 2 - 9 = -4$; el valor de $b$ en la resta es $9$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Tabla con $a = 5$ (act. 2–3, p. 111)",
    statement:
      "Con $a = 5$, completa: $10 \\cdot a + 7 = \\ldots$; $2 \\cdot a - 3 = \\ldots$; $2 \\cdot a + 3 = \\ldots$.",
    solutionText:
      "$10 \\cdot 5 + 7 = 57$.\n$2 \\cdot 5 - 3 = 7$.\n$2 \\cdot 5 + 3 = 13$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Enunciados en lenguaje algebraico (act. 4, p. 111)",
    statement:
      "Escribe una expresión: a) el doble de $x$ b) el anterior de $x$ c) el siguiente de $x$ d) el doble del siguiente de $x$ e) la mitad de $x$ f) la mitad de $x$, más seis.",
    solutionText:
      "a) $2x$ b) $x - 1$ c) $x + 1$ d) $2(x + 1)$ e) $\\frac{x}{2}$ f) $\\frac{x}{2} + 6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Reduce expresiones (act. 1, p. 113)",
    statement:
      "Reduce: a) $x + x$ b) $a + a + a + a$ c) $m + m - m$ d) $k + k + k - k - k$ e) $a + a + b + b$ f) $x + x + y + y + y$.",
    solutionText:
      "a) $2x$ b) $4a$ c) $m$ d) $k$ e) $2a + 2b$ f) $2x + 3y$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Opera con monomios (act. 2, p. 113)",
    statement:
      "Opera: a) $2x + 5x$ b) $7a - 3a$ c) $4a + 3a$ d) $9x - 5x$ e) $2x + 3x + 4x$ f) $6a + 2a - 5a$.",
    solutionText:
      "a) $7x$ b) $4a$ c) $7a$ d) $4x$ e) $9x$ f) $3a$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Reduce con paréntesis (act. 5, p. 113)",
    statement:
      "Reduce: a) $3x - (4x - 3x)$ b) $5x - (2x + 1)$ c) $8x - (3x + 2x)$ d) $2x - (4 - x)$.",
    solutionText:
      "a) $3x - x = 2x$ b) $3x - 1$ c) $3x$ d) $3x - 4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Multiplica número por monomio (act. 6, p. 113)",
    statement:
      "Multiplica: a) $3 \\cdot 2x$ b) $5 \\cdot 3a$ c) $(-3) \\cdot 5x$ d) $\\frac{1}{2} \\cdot 6x$.",
    solutionText: "a) $6x$ b) $15a$ c) $-15x$ d) $3x$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Producto de monomios (act. 7, p. 113)",
    statement:
      "Multiplica: a) $x \\cdot 2x$ b) $5a \\cdot a$ c) $3x^2 \\cdot 2x^3$ d) $(-5a^2) \\cdot 3a^3$.",
    solutionText:
      "a) $2x^2$ b) $5a^2$ c) $6x^5$ d) $-15a^5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Solución por tanteo (act. 1, p. 114)",
    statement:
      "Busca por tanteo una solución de: a) $5x - 8 = 7$ b) $2x + 3 = 5x - 3$ c) $2(x - 1) = 8$ d) $10 - (x - 3) = 6$.",
    solutionText:
      "a) $x = 3$ b) $x = 2$ c) $x = 5$ d) $x = 7$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Ecuaciones $x + a$ y $x - a$ (act. 1–2, p. 115)",
    statement:
      "Resuelve: a) $x + 3 = 4$ b) $x - 1 = 8$ c) $2 - x = 4$ d) $0 = x + 6$ e) $1 = 9 - x$.",
    solutionText:
      "a) $x = 1$ b) $x = 9$ c) $x = -2$ d) $x = -6$ e) $x = 8$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Ecuaciones $ax = b$ y $x/a = b$ (act. 3–4, p. 116)",
    statement:
      "Resuelve: a) $4x = 20$ b) $\\frac{x}{2} = 1$ c) $8 = 4x$ d) $3x - 2 = 0$ e) $4x + 5 = 13$ f) $\\frac{x}{2} + 4 = 7$.",
    solutionText:
      "a) $x = 5$ b) $x = 2$ c) $x = 2$ d) $x = \\frac{2}{3}$ e) $x = 2$ f) $x = 6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Práctica de resolución (act. p. 118, bloque 1)",
    statement:
      "Resuelve: a) $x + 1 = 6$ b) $x + 8 = 3$ c) $7 = x + 3$ d) $5 = 11 + x$ e) $x + 1 = -2$ f) $5 + x = 7$.",
    solutionText:
      "a) $5$ b) $-5$ c) $4$ d) $-6$ e) $-3$ f) $2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Práctica de resolución (act. p. 118, bloque 2–3)",
    statement:
      "Resuelve: a) $x - 2 = 4$ b) $4 - x = 1$ c) $5x - 4x = 9$ d) $7x - 2x = 15$ e) $2x - 5x = -3$ f) $8x - 5x = x + 8$.",
    solutionText:
      "a) $6$ b) $3$ c) $9$ d) $3$ e) $1$ f) $4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Número y siguiente (act. 1, p. 119)",
    statement: "Un número y su siguiente suman $53$. ¿Qué números son?",
    solutionText:
      "$x + (x + 1) = 53 \\Rightarrow 2x = 52 \\Rightarrow x = 26$. Son $26$ y $27$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Vacas: cuernos y patas (act. 2, p. 119)",
    statement:
      "¿Cuántas vacas hay si entre cuernos y patas hay $222$? (Cada vaca: $2$ cuernos, $4$ patas.)",
    solutionText:
      "$2x + 4x = 222 \\Rightarrow 6x = 222 \\Rightarrow x = 37$ vacas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Lenguaje algebraico — enunciados (consol. 1–2, p. 120)",
    statement:
      "Relaciona: a) distancia en $x$ h a $60$ km/h b) coste de $x$ kg a $0{,}80$ €/kg c) área de triángulo base $0{,}80$ m, altura $x$ m d) edad de Pedro si $x$ es la del abuelo al nacer.",
    solutionText:
      "a) $60x$ b) $0{,}8x$ c) $\\frac{0{,}8 \\cdot x}{2}$ d) $x - 60$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Opera y quita paréntesis (consol. 4–8, p. 120)",
    statement:
      "a) $3x + 2x + x$ b) $3x - (x + 1)$ c) $(6x) : 3$ d) $5 \\cdot (1 + x)$ e) $x + 2(x + 3)$.",
    solutionText:
      "a) $6x$ b) $2x - 1$ c) $2x$ d) $5 + 5x$ e) $3x + 6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Ecuaciones de consolidación (consol. 9, p. 120)",
    statement:
      "Resuelve: a) $2x + 5 - 3x = x + 19$ b) $7x - 2x = 2x + 1$ c) $11 + 2x = 6x - 3 + 3x$.",
    solutionText:
      "a) $-7$ b) $x = 1$ c) $x = 2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(29),
    title: "Número con anterior y posterior (prob. 10, p. 120)",
    statement:
      "¿Cuál es el número que sumado con su anterior y su siguiente da $117$?",
    solutionText:
      "$(x - 1) + x + (x + 1) = 117 \\Rightarrow 3x = 117 \\Rightarrow x = 39$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(30),
    title: "Tres consecutivos (prob. 11, p. 121)",
    statement: "La suma de tres números consecutivos es $84$. ¿Cuáles son?",
    solutionText:
      "$x + (x + 1) + (x + 2) = 84 \\Rightarrow 3x = 81 \\Rightarrow x = 27$. Son $27$, $28$ y $29$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(31),
    title: "Cántaro de agua (prob. 12, p. 121)",
    statement:
      "Si al cántaro le añades $13$ L tiene el triple que si le sacas $2$ L. ¿Cuántos litros hay?",
    solutionText:
      "$x + 13 = 3(x - 2) \\Rightarrow x + 13 = 3x - 6 \\Rightarrow 19 = 2x \\Rightarrow x = 9{,}5$ L.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(32),
    title: "Chicos y chicas (prob. 13, p. 121)",
    statement:
      "Entre alumnos y alumnas hay $624$; las chicas superan en $36$ a los chicos. ¿Cuántos chicos y cuántas chicas?",
    solutionText:
      "$x + (x + 36) = 624 \\Rightarrow 2x = 588 \\Rightarrow x = 294$ chicos; $330$ chicas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(33),
    title: "Yogures natural y frutas (prob. 14, p. 121)",
    statement:
      "Un yogur de frutas cuesta $0{,}05$ € más que uno natural. Seis de frutas y cuatro naturales cuestan $4{,}80$ €. ¿Precio de cada uno?",
    solutionText:
      "$6(x + 0{,}05) + 4x = 4{,}80 \\Rightarrow 10x = 4{,}50 \\Rightarrow x = 0{,}45$ € natural; frutas $0{,}50$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(34),
    title: "Autoevaluación — reduce (p. 121)",
    statement:
      "Reduce: a) $2x + x$ b) $3a + 5a$ c) $x + 5 + 2x$ d) $2a + 3 + 4a - 1$.",
    solutionText:
      "a) $3x$ b) $8a$ c) $3x + 5$ d) $6a + 2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(35),
    title: "Autoevaluación — ecuaciones y problemas (p. 121)",
    statement:
      "Resuelve: a) $x + 2 = 8$ b) $3x = 12$ c) $3x - 5 = 4$ d) Vacas: cuernos + patas = $120$. e) $3$ kg naranjas + $2$ kg peras = $6{,}40$ €; peras $0{,}20$ €/kg más que naranjas.",
    solutionText:
      "a) $6$ b) $4$ c) $3$ d) $2x + 4x = 120 \\Rightarrow x = 20$ vacas e) $3x + 2(x + 0{,}20) = 6{,}40 \\Rightarrow x = 1{,}20$ € naranjas; peras $1{,}40$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
