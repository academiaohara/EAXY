import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8002-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Actividades, consolidación y autoevaluación — unidad 2 Potencias y raíces. */
export const potenciasRaicesTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(10),
    title: "Expresa con una potencia (act. 1)",
    statement:
      "Expresa con potencia: a) $6\\cdot6$ b) $6\\cdot6\\cdot6$ c) $7\\cdot7$ d) $5\\cdot5$ e) $10\\cdot10\\cdot10$ f) $4\\cdot4\\cdot4\\cdot4$ g) $3\\cdot3\\cdot3\\cdot3\\cdot3\\cdot3$ h) $10\\cdot10\\cdot10\\cdot10\\cdot10$.",
    solutionText:
      "a) $6^2$ b) $6^3$ c) $7^2$ d) $5^2$ e) $10^3$ f) $4^4$ g) $3^6$ h) $10^5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Potencia como producto (act. 2)",
    statement:
      "Escribe como producto de factores iguales: a) $3^4$ b) $2^7$ c) $9^3$ d) $15^2$ e) $10^6$ f) $20^4$.",
    solutionText:
      "a) $3\\cdot3\\cdot3\\cdot3$ b) siete factores $2$ c) $9\\cdot9\\cdot9$ d) $15\\cdot15$ e) seis factores $10$ f) cuatro factores $20$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Completa potencias (act. 3)",
    statement: "Copia y completa: a)–f) de la actividad 3 (p. 21).",
    solutionText:
      "a) $m\\cdot m\\cdot m = m^3$\nb) $x\\cdot x\\cdot x\\cdot x\\cdot x = x^5$\nc) $a\\cdot a\\cdot a\\cdot a = a^4$\nd) $y\\cdot y = y^2$\ne) $b\\cdot b\\cdot b = b^3$\nf) $n\\cdot n\\cdot n\\cdot n\\cdot n = n^5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Tabla base y exponente (act. 4)",
    statement: "Completa la tabla: $2^6$; base $5$ exponente $3$; $a^4$; base $m$ exponente $5$.",
    solutionText:
      "$2^6$: base $2$, exponente $6$.\nBase $5$, exponente $3$: potencia $5^3=125$.\n$a^4$: base $a$, exponente $4$.\nBase $m$, exponente $5$: potencia $m^5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Potencias mentales (act. 5)",
    statement: "Calcula mentalmente: a) $2^3$ b) $5^2$ c) $4^3$ d) $20^3$ e) $10^4$ f) $11^2$.",
    solutionText: "a) $8$ b) $25$ c) $64$ d) $8000$ e) $10\\,000$ f) $121$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Potencias con lápiz y papel (act. 6)",
    statement: "Calcula: a) $2^8$ b) $3^5$ c) $9^4$ d) $15^2$ e) $12^3$ f) $30^4$ g) $20^5$ h) $85^2$ i) $100^3$ j) $324^2$ k) $15^3$ l) $9^5$.",
    solutionText:
      "a) $256$ b) $243$ c) $6561$ d) $225$ e) $1728$ f) $810\\,000$ g) $3\\,200\\,000$ h) $7225$ i) $1\\,000\\,000$ j) $104\\,976$ k) $3375$ l) $59\\,049$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Potencias con calculadora (act. 7)",
    statement:
      "Calcula con calculadora: a) $11^5$ b) $37^4$ c) $62^3$ d) $136^3$ e) $101^4$ f) $140^4$ g) $37^5$ h) $14^7$ i) $26^6$ j) $33^3$.",
    solutionText:
      "a) $161\\,051$ b) $1\\,874\\,161$ c) $238\\,328$ d) $2\\,515\\,456$ e) $104\\,060\\,401$ f) $384\\,160\\,000$ g) $69\\,343\\,957$ h) $105\\,413\\,504$ i) $308\\,915\\,776$ j) $35\\,937$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Potencias de 10 con cifras (act. 1, p. 22)",
    statement:
      "Escribe con todas sus cifras: a) $10^1$ b) $10^6$ c) $10^8$ d) $10^9$ e) $10^{10}$ f) $10^{11}$ g) $10^{13}$ h) $10^{14}$ i) $10^{15}$ j) $10^{17}$ k) $10^{18}$ l) $10^{20}$.",
    solutionText:
      "a) $10$ b) $1\\,000\\,000$ c) $100\\,000\\,000$ d) $1\\,000\\,000\\,000$ e) $10\\,000\\,000\\,000$ f) $100\\,000\\,000\\,000$ g) $10\\,000\\,000\\,000\\,000$ h) $100\\,000\\,000\\,000\\,000$ i) $1\\,000\\,000\\,000\\,000\\,000$ j) $100\\,000\\,000\\,000\\,000\\,000$ k) $1\\,000\\,000\\,000\\,000\\,000\\,000$ l) $100\\,000\\,000\\,000\\,000\\,000\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Cantidades como potencias de 10 (act. 2, p. 22)",
    statement:
      "Escribe como potencia de $10$: decena, centena, millar, millón, mil millones y billón.",
    solutionText:
      "Decena: $10^1$. Centena: $10^2$. Millar: $10^3$. Millón: $10^6$. Mil millones: $10^9$. Billón ($10^{12}$ en España): $10^{12}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Transformar en $a\\cdot10^n$ (act. 3, p. 23)",
    statement:
      "Transforma: a) $9000$ b) $72\\,000$ c) $460\\,000$ d) $24\\,000\\,000$ (como $24\\cdot10^6$).",
    solutionText:
      "a) $9\\cdot10^3$ b) $72\\cdot10^3$ c) $46\\cdot10^4$ d) $24\\cdot10^6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Escribir con todas sus cifras (act. 4, p. 23)",
    statement:
      "Expresa con cifras: a) $4\\cdot10^5$ b) $7\\cdot10^7$ c) $15\\cdot10^9$ d) $18\\cdot10^{12}$ e) $86\\cdot10^{14}$ f) $91\\cdot10^{18}$.",
    solutionText:
      "a) $400\\,000$ b) $70\\,000\\,000$ c) $15\\,000\\,000\\,000$ d) $18\\,000\\,000\\,000\\,000$ e) $8\\,600\\,000\\,000\\,000\\,000$ f) $91\\,000\\,000\\,000\\,000\\,000\\,000\\,000\\,000\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Completa raíces exactas (act. 1, p. 25)",
    statement:
      "Completa: a) $\\sqrt{49}=7$ → … b) $\\sqrt{64}=\\ldots$ c) $\\sqrt{81}=\\ldots$",
    solutionText:
      "a) La raíz de $49$ es $7$.\nb) $\\sqrt{64}=8$ (la raíz de $64$ es $8$).\nc) $\\sqrt{81}=9$ (la raíz de $81$ es $9$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Raíces exactas mentales (act. 2)",
    statement:
      "Calcula mentalmente: a) $\\sqrt{4}$ b) $\\sqrt{9}$ c) $\\sqrt{36}$ d) $\\sqrt{400}$ e) $\\sqrt{900}$ f) $\\sqrt{3600}$ g) $\\sqrt{4900}$ h) $\\sqrt{6400}$ i) $\\sqrt{8100}$ j) $\\sqrt{10\\,000}$.",
    solutionText:
      "a) $2$ b) $3$ c) $6$ d) $20$ e) $30$ f) $60$ g) $70$ h) $80$ i) $90$ j) $100$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Raíz entera (act. 3)",
    statement:
      "Halla la raíz entera de: a) $\\sqrt{5}$ b) $\\sqrt{10}$ c) $\\sqrt{24}$ d) $\\sqrt{32}$ e) $\\sqrt{39}$ f) $\\sqrt{50}$ g) $\\sqrt{68}$ h) $\\sqrt{92}$ i) $\\sqrt{105}$ j) $\\sqrt{110}$.",
    solutionText:
      "a) $2$ b) $3$ c) $4$ d) $5$ e) $6$ f) $7$ g) $8$ h) $9$ i) $10$ j) $10$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Cuadrados perfectos 200–900 (act. 4)",
    statement: "Lista los cuadrados perfectos entre $200$ y $900$.",
    solutionText:
      "$15^2=225$, $16^2=256$, $17^2=289$, $18^2=324$, $19^2=361$, $20^2=400$, $21^2=441$, $22^2=484$, $23^2=529$, $24^2=576$, $25^2=625$, $26^2=676$, $27^2=729$, $28^2=784$, $29^2=841$, $30^2=900$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Raíces de cuadrados perfectos (act. 5)",
    statement:
      "Calcula: a) $\\sqrt{289}$ b) $\\sqrt{361}$ c) $\\sqrt{484}$ d) $\\sqrt{576}$ e) $\\sqrt{676}$ f) $\\sqrt{841}$.",
    solutionText: "a) $17$ b) $19$ c) $22$ d) $24$ e) $26$ f) $29$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Raíz exacta o entera con tabla (act. 6)",
    statement:
      "Con $50^2=2500$, $51^2=2601$, …, $55^2=3025$, indica raíz exacta o entera de: a) $\\sqrt{2550}$ b) $\\sqrt{2601}$ c) $\\sqrt{2725}$ d) $\\sqrt{2815}$ e) $\\sqrt{2916}$ f) $\\sqrt{2929}$.",
    solutionText:
      "a) Entera $50$ b) Exacta $51$ c) Entera $52$ d) Entera $53$ e) Exacta $54$ f) Entera $54$ ($54^2=2916<2929<3025$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Consolidación — potencias mentales (ej. 1)",
    statement: "Calcula mentalmente: a) $2^4$ b) $6^3$ c) $3^5$ d) $20^4$ e) $30^0$.",
    solutionText: "a) $16$ b) $216$ c) $243$ d) $160\\,000$ e) $1$ (cualquier potencia de exponente $0$ vale $1$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Consolidación — potencias en papel (ej. 2)",
    statement: "Calcula: a) $5^5$ b) $9^5$ c) $11^0$ d) $15^3$ e) $16^4$.",
    solutionText: "a) $3125$ b) $59\\,049$ c) $1$ d) $3375$ e) $65\\,536$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(29),
    title: "Consolidación — calculadora (ej. 3)",
    statement: "Con calculadora: a) $41^2$ b) $5^{10}$ c) $45^3$ d) $67^4$ e) $99^3$.",
    solutionText:
      "a) $1681$ b) $9\\,765\\,625$ c) $91\\,125$ d) $20\\,151\\,121$ e) $970\\,299$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(30),
    title: "Consolidación — potencias de 10 (ej. 4)",
    statement: "Escribe con cifras: a) $10^2$ b) $10^6$ c) $10^{10}$ d) $10^{12}$ e) $10^{16}$.",
    solutionText:
      "a) $100$ b) $1\\,000\\,000$ c) $10\\,000\\,000\\,000$ d) $1\\,000\\,000\\,000\\,000$ e) $10\\,000\\,000\\,000\\,000\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(31),
    title: "Consolidación — forma abreviada (ej. 5)",
    statement: "Expresa con cifras: a) $13\\cdot10^7$ b) $34\\cdot10^9$ c) $62\\cdot10^{11}$.",
    solutionText:
      "a) $130\\,000\\,000$ b) $34\\,000\\,000\\,000$ c) $6\\,200\\,000\\,000\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(32),
    title: "Consolidación — transformaciones (ej. 6)",
    statement:
      "Transforma como $180\\,000=18\\cdot10^4$: a) $5000$ b) $1\\,700\\,000$ c) $4\\,000\\,000\\,000$.",
    solutionText: "a) $5\\cdot10^3$ b) $17\\cdot10^5$ c) $4\\cdot10^9$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(33),
    title: "Consolidación — completa raíces (ej. 7)",
    statement:
      "Completa: a) $\\underline{\\quad}^2=36$ → $\\sqrt{36}=\\ldots$ b) $\\underline{\\quad}^2=256$ → $\\sqrt{256}=\\ldots$",
    solutionText: "a) $6^2=36$ → $\\sqrt{36}=6$.\nb) $16^2=256$ → $\\sqrt{256}=16$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(34),
    title: "Consolidación — raíz por tanteo (ej. 8)",
    statement: "Calcula raíz exacta o entera: a) $\\sqrt{90}$ b) $\\sqrt{121}$ c) $\\sqrt{1785}$.",
    solutionText:
      "a) Entera **$9$** ($81<90<100$).\nb) Exacta **$11$** ($11^2=121$).\nc) Entera **$42$** ($42^2=1764<1785<43^2=1849$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(35),
    title: "Autoevaluación 1 — potencias",
    statement: "Calcula: a) $7^2$ b) $10^4$.",
    solutionText: "a) $49$ b) $10\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(36),
    title: "Autoevaluación 2 — base y exponente",
    statement: "Completa: a) $2^{\\square}=8$ b) $\\square^2=36$.",
    solutionText: "a) $2^3=8$ (exponente $3$).\nb) $6^2=36$ (base $6$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(37),
    title: "Autoevaluación 3 — potencias de 10",
    statement: "Calcula: a) $10^3$ b) $10^7$.",
    solutionText: "a) $1000$ b) $10\\,000\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(38),
    title: "Autoevaluación 4 — notación abreviada",
    statement: "Escribe en forma abreviada: $45\\,000\\,000$.",
    solutionText: "$45\\,000\\,000 = 45 \\cdot 10^6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(39),
    title: "Autoevaluación 5 — raíces cuadradas",
    statement:
      "Completa: a) $\\sqrt{36}=\\ldots$ b) $\\sqrt{400}=\\ldots$ c) $\\sqrt{10\\,000}=\\ldots$ d) $\\sqrt{\\ldots}=3$ e) $\\sqrt{\\ldots}=8$ f) $\\sqrt{\\ldots}=30$.",
    solutionText:
      "a) $6$ b) $20$ c) $100$ d) $9$ e) $64$ f) $900$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
