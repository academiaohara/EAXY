import type { CurriculumTopicExercise } from "@/content/types";
import { sistemaMetricoDecimalTopicExercisesExtra } from "@/data/topic-exercises/sistema-metrico-decimal-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8006-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos del tema «El sistema métrico decimal» (1.º ESO, unidad 6). */
const sistemaMetricoDecimalTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Longitud — forma compleja (ej. resuelto, p. 70)",
    statement: "Pasa a forma compleja: a) $12{,}06\\,\\mathrm{hm}$ b) Expresa en metros: $3\\,\\mathrm{dam}\\ 8\\,\\mathrm{m}\\ 7\\,\\mathrm{cm}$.",
    solutionText:
      "a) En la tabla de longitudes: $12{,}06\\,\\mathrm{hm} = 1\\,\\mathrm{km}\\ 2\\,\\mathrm{hm}\\ 6\\,\\mathrm{m}$.\nb) $3\\,\\mathrm{dam} = 30\\,\\mathrm{m}$, $8\\,\\mathrm{m}$, $7\\,\\mathrm{cm} = 0{,}07\\,\\mathrm{m}$ → $30 + 8 + 0{,}07 = 38{,}07\\,\\mathrm{m}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Longitud — incompleja y compleja (ej. resuelto, p. 70)",
    statement:
      "Transforma: $2\\,\\mathrm{m}\\ 5\\,\\mathrm{dm}$ a forma incompleja en metros y en centímetros.",
    solutionText:
      "1.º $5\\,\\mathrm{dm} = 0{,}5\\,\\mathrm{m}$.\n2.º $2 + 0{,}5 = 2{,}5\\,\\mathrm{m}$.\n3.º $2{,}5\\,\\mathrm{m} = 250\\,\\mathrm{cm}$ (multiplicamos por $100$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Capacidad — litros (ej. resuelto, p. 72)",
    statement:
      "a) Pasa a litros: $3\\,\\mathrm{kl}\\ 2\\,\\mathrm{dal}\\ 6\\,\\mathrm{l}\\ 5\\,\\mathrm{dl}$.\nb) Pasa a forma compleja: $807{,}4\\,\\mathrm{l}$.",
    solutionText:
      "a) $3000 + 20 + 6 + 0{,}5 = 3026{,}5\\,\\mathrm{l}$.\nb) $807{,}4\\,\\mathrm{l} = 8\\,\\mathrm{hl}\\ 7\\,\\mathrm{l}\\ 4\\,\\mathrm{dl}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Capacidad — cambios con la tabla (ej. resuelto, p. 72)",
    statement:
      "Expresa en litros: a) $2{,}73\\,\\mathrm{kl}$ b) $560\\,\\mathrm{l}$ en hectolitros c) $0{,}0268\\,\\mathrm{l}$ en mililitros d) $60\\,\\mathrm{cl}$ en litros.",
    solutionText:
      "a) $2730\\,\\mathrm{l}$.\nb) $5{,}6\\,\\mathrm{hl}$.\nc) $26{,}8\\,\\mathrm{ml}$.\nd) $0{,}6\\,\\mathrm{l}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Peso — a gramos y toneladas (ej. resuelto, p. 73)",
    statement:
      "Transforma: a) $0{,}0583\\,\\mathrm{kg}$ a gramos b) $630\\,\\mathrm{cg}$ a gramos c) $13\\,500\\,\\mathrm{kg}$ a toneladas.",
    solutionText:
      "a) Tres saltos kg→g: $0{,}0583 \\cdot 1000 = 58{,}3\\,\\mathrm{g}$.\nb) Dos saltos cg→g: $630 : 100 = 6{,}3\\,\\mathrm{g}$.\nc) $13\\,500 : 1000 = 13{,}5\\,\\mathrm{t}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Peso — forma compleja (ej. resuelto, p. 73)",
    statement:
      "a) Pasa a gramos: $8\\,\\mathrm{hg}\\ 6\\,\\mathrm{g}\\ 7\\,\\mathrm{dg}\\ 5\\,\\mathrm{cg}$.\nb) Pasa a forma compleja: $1206\\,\\mathrm{g}$.",
    solutionText:
      "a) $800 + 6 + 0{,}7 + 0{,}05 = 806{,}75\\,\\mathrm{g}$.\nb) $1206\\,\\mathrm{g} = 1\\,\\mathrm{kg}\\ 2\\,\\mathrm{hg}\\ 6\\,\\mathrm{g}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Superficie — cambios de unidad (ej. resuelto, p. 74)",
    statement:
      "Pasa a la unidad indicada: a) $47\\,200\\,\\mathrm{m}^2$ → $\\mathrm{hm}^2$ b) $6{,}2\\,\\mathrm{dm}^2$ → $\\mathrm{cm}^2$ c) $1{,}25\\,\\mathrm{a}$ → $\\mathrm{m}^2$ d) $252\\,800\\,\\mathrm{m}^2$ → ha.",
    solutionText:
      "a) Dos saltos (÷$10\\,000$): $4{,}72\\,\\mathrm{hm}^2$.\nb) Un salto (×$100$): $620\\,\\mathrm{cm}^2$.\nc) $1\\,\\mathrm{a} = 100\\,\\mathrm{m}^2$ → $125\\,\\mathrm{m}^2$.\nd) $25{,}28\\,\\mathrm{ha}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Actividad longitud 2 — expresa en metros (p. 71)",
    statement:
      "Expresa en metros: a) $18\\,\\mathrm{km}$ b) $16\\,\\mathrm{dm}$ c) $0{,}4\\,\\mathrm{hm}$ d) $500\\,\\mathrm{cm}$ e) $5{,}6\\,\\mathrm{dam}$ f) $2340\\,\\mathrm{mm}$.",
    solutionText:
      "a) $18\\,000\\,\\mathrm{m}$ b) $1{,}6\\,\\mathrm{m}$ c) $40\\,\\mathrm{m}$ d) $5\\,\\mathrm{m}$ e) $56\\,\\mathrm{m}$ f) $2{,}34\\,\\mathrm{m}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Actividad longitud 6 — suma en metros (p. 71)",
    statement:
      "Expresa en metros: a) $6\\,\\mathrm{km}\\ 4\\,\\mathrm{hm}\\ 8\\,\\mathrm{dam}$ b) $5\\,\\mathrm{hm}\\ 3\\,\\mathrm{m}\\ 6\\,\\mathrm{dm}$ c) $5\\,\\mathrm{m}\\ 4\\,\\mathrm{dm}\\ 7\\,\\mathrm{cm}$.",
    solutionText:
      "a) $6000 + 400 + 80 = 6480\\,\\mathrm{m}$.\nb) $500 + 3 + 0{,}6 = 503{,}6\\,\\mathrm{m}$.\nc) $5 + 0{,}4 + 0{,}07 = 5{,}47\\,\\mathrm{m}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Problema del perro — peso del pelo (p. 73)",
    statement:
      "Un perro pesaba $4\\,\\mathrm{kg}\\ 50\\,\\mathrm{g}$. Tras cortarle el pelo pesa $3985\\,\\mathrm{g}$. ¿Cuánto pesa el pelo?",
    solutionText:
      "1.º Peso antes: $4050\\,\\mathrm{g}$.\n2.º Diferencia: $4050 - 3985 = 65\\,\\mathrm{g}$ de pelo.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Autoevaluación unidad 6 (p. 77)",
    statement:
      "Completa: a) $5{,}2\\,\\mathrm{km} = \\ldots\\,\\mathrm{m}$ b) $3\\,\\mathrm{hm}\\ 8\\,\\mathrm{dam}\\ 4\\,\\mathrm{m}\\ 5\\,\\mathrm{dm} = \\ldots\\,\\mathrm{m}$ c) $5\\,\\mathrm{kg}\\ 3\\,\\mathrm{hg}\\ 7\\,\\mathrm{dag}\\ 8\\,\\mathrm{g} = \\ldots\\,\\mathrm{g}$ d) $5\\,\\mathrm{hm}^2 = \\ldots\\,\\mathrm{m}^2$.",
    solutionText:
      "a) $5200\\,\\mathrm{m}$.\nb) $300 + 80 + 4 + 0{,}5 = 384{,}5\\,\\mathrm{m}$.\nc) $5378\\,\\mathrm{g}$.\nd) $500\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const sistemaMetricoDecimalTopicExercises: CurriculumTopicExercise[] = [
  ...sistemaMetricoDecimalTopicExercisesBase,
  ...sistemaMetricoDecimalTopicExercisesExtra,
];
