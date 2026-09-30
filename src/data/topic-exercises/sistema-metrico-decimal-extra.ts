import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8006-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Actividades, consolidación y problemas de la unidad 6. */
export const sistemaMetricoDecimalTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(12),
    title: "Actividad 2 — equivalencias longitud (p. 69)",
    statement:
      "a) ¿Cuántos metros hay en un hectómetro? b) ¿Cuántos litros en un decalitro? c) ¿Cuántos gramos en un kilogramo? d) ¿Cuántos decilitros en un litro? e) ¿Cuántos centímetros en un metro? f) ¿Cuántos miligramos en un gramo?",
    solutionText:
      "a) $100\\,\\mathrm{m}$ b) $10\\,\\mathrm{l}$ c) $1000\\,\\mathrm{g}$ d) $10\\,\\mathrm{dl}$ e) $100\\,\\mathrm{cm}$ f) $1000\\,\\mathrm{mg}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Actividad longitud 4 — completar (p. 71)",
    statement:
      "Copia y completa: a) $2462\\,\\mathrm{m} = \\ldots\\,\\mathrm{km}$ b) $1{,}6\\,\\mathrm{km} = \\ldots\\,\\mathrm{dam}$ c) $256\\,\\mathrm{cm} = \\ldots\\,\\mathrm{m}$ d) $5{,}4\\,\\mathrm{m} = \\ldots\\,\\mathrm{cm}$.",
    solutionText:
      "a) $2{,}462\\,\\mathrm{km}$ b) $160\\,\\mathrm{dam}$ c) $2{,}56\\,\\mathrm{m}$ d) $540\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Capacidad — expresa en litros (act. 3, p. 72)",
    statement:
      "Expresa en litros: a) $2{,}75\\,\\mathrm{kl}$ b) $42{,}6\\,\\mathrm{dl}$ c) $74{,}86\\,\\mathrm{hl}$ d) $350\\,\\mathrm{cl}$ e) $1{,}46\\,\\mathrm{dal}$ f) $3800\\,\\mathrm{ml}$.",
    solutionText:
      "a) $2750\\,\\mathrm{l}$ b) $4{,}26\\,\\mathrm{l}$ c) $7486\\,\\mathrm{l}$ d) $3{,}5\\,\\mathrm{l}$ e) $14{,}6\\,\\mathrm{l}$ f) $3{,}8\\,\\mathrm{l}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Capacidad — forma compleja en litros (act. 4, p. 72)",
    statement:
      "Expresa en litros: a) $1\\,\\mathrm{kl}\\ 6\\,\\mathrm{hl}\\ 7\\,\\mathrm{dal}$ b) $6\\,\\mathrm{hl}\\ 5\\,\\mathrm{l}\\ 6\\,\\mathrm{dl}$ c) $2\\,\\mathrm{dl}\\ 7\\,\\mathrm{cl}\\ 8\\,\\mathrm{ml}$.",
    solutionText:
      "a) $1670\\,\\mathrm{l}$ b) $605{,}6\\,\\mathrm{l}$ c) $0{,}278\\,\\mathrm{l}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Peso — expresa en gramos (act. 2, p. 73)",
    statement:
      "Expresa en gramos: a) $4{,}08\\,\\mathrm{kg}$ b) $0{,}7\\,\\mathrm{hg}$ c) $25\\,\\mathrm{dag}$ d) $58\\,\\mathrm{dg}$ e) $5300\\,\\mathrm{mg}$.",
    solutionText:
      "a) $4080\\,\\mathrm{g}$ b) $70\\,\\mathrm{g}$ c) $250\\,\\mathrm{g}$ d) $5{,}8\\,\\mathrm{g}$ e) $5{,}3\\,\\mathrm{g}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Consolidación — longitud (ej. 3-4, p. 76)",
    statement:
      "a) $2{,}7\\,\\mathrm{hm} = \\ldots\\,\\mathrm{km} = \\ldots\\,\\mathrm{dam} = \\ldots\\,\\mathrm{dm}$.\nb) Expresa en metros: $3\\,\\mathrm{km}\\ 8\\,\\mathrm{hm}\\ 5\\,\\mathrm{dam}$.\nc) Expresa en centímetros: $5\\,\\mathrm{dam}\\ 6\\,\\mathrm{m}\\ 3\\,\\mathrm{dm}\\ 4\\,\\mathrm{cm}$.",
    solutionText:
      "a) $0{,}27\\,\\mathrm{km}$; $27\\,\\mathrm{dam}$; $2700\\,\\mathrm{dm}$.\nb) $3800 + 500 = 3850\\,\\mathrm{m}$.\nc) $563\\,\\mathrm{dm} + 4\\,\\mathrm{cm} = 5634\\,\\mathrm{cm}$ (o sumando: $600 + 60 + 30 + 4 = 5634\\,\\mathrm{cm}$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Consolidación — peso (ej. 8-11, p. 76)",
    statement:
      "Pasa a gramos: a) $1{,}37\\,\\mathrm{kg}$ b) $0{,}57\\,\\mathrm{hg}$.\nExpresa en gramos: c) $4\\,\\mathrm{kg}\\ 5\\,\\mathrm{hg}\\ 2\\,\\mathrm{dag}\\ 3\\,\\mathrm{g}$.\nPasa a toneladas: d) $15\\,000\\,\\mathrm{kg}$.",
    solutionText:
      "a) $1370\\,\\mathrm{g}$ b) $57\\,\\mathrm{g}$.\nc) $4523\\,\\mathrm{g}$.\nd) $15\\,\\mathrm{t}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Consolidación — superficie (ej. 4-6, p. 75)",
    statement:
      "Expresa en $\\mathrm{m}^2$: a) $0{,}006\\,\\mathrm{km}^2$ b) $5{,}2\\,\\mathrm{hm}^2$ c) $38\\,\\mathrm{dam}^2$ d) $12\\,800\\,\\mathrm{cm}^2$.",
    solutionText:
      "a) $6000\\,\\mathrm{m}^2$ b) $52\\,000\\,\\mathrm{m}^2$ c) $3800\\,\\mathrm{m}^2$ d) $1{,}28\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Superficie — forma compleja (act. 7-8, p. 75)",
    statement:
      "Expresa en $\\mathrm{m}^2$: a) $5\\,\\mathrm{km}^2\\ 48\\,\\mathrm{hm}^2\\ 25\\,\\mathrm{dam}^2$.\nPasa a forma compleja: b) $587{,}24\\,\\mathrm{hm}^2$ (km², hm², dam²… según proceda).",
    solutionText:
      "a) $5\\,000\\,000 + 480\\,000 + 2500 = 5\\,482\\,500\\,\\mathrm{m}^2$.\nb) En la tabla en hm²: $587{,}24\\,\\mathrm{hm}^2 = 5\\,\\mathrm{km}^2\\ 87\\,\\mathrm{hm}^2\\ 24\\,\\mathrm{dam}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Superficie — hectáreas (ej. 25, p. 77)",
    statement:
      "Expresa en hectáreas: a) $572\\,800\\,\\mathrm{a}$ b) $50\\,700\\,\\mathrm{m}^2$ c) $25{,}87\\,\\mathrm{hm}^2$ d) $6{,}42\\,\\mathrm{km}^2$.",
    solutionText:
      "a) $5728\\,\\mathrm{ha}$ ($1\\,\\mathrm{a} = 0{,}01\\,\\mathrm{ha}$).\nb) $5{,}07\\,\\mathrm{ha}$.\nc) $2587\\,\\mathrm{ha}$.\nd) $642\\,\\mathrm{ha}$ ($1\\,\\mathrm{km}^2 = 100\\,\\mathrm{ha}$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Autoevaluación — capacidad y superficie (p. 77)",
    statement:
      "a) $5\\,\\mathrm{l}\\ 6\\,\\mathrm{dl}\\ 7\\,\\mathrm{cl} = \\ldots\\,\\mathrm{l}$.\nb) $13\\,\\mathrm{dam}^2 = \\ldots\\,\\mathrm{m}^2$.\nc) $4800\\,\\mathrm{cm}^2 = \\ldots\\,\\mathrm{m}^2$.",
    solutionText:
      "a) $5 + 0{,}6 + 0{,}07 = 5{,}67\\,\\mathrm{l}$.\nb) $1300\\,\\mathrm{m}^2$.\nc) $0{,}48\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
