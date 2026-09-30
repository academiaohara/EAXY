import type { CurriculumTopicExercise } from "@/content/types";
import { numerosDecimalesTopicExercisesExtra } from "@/data/topic-exercises/numeros-decimales-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8005-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos del tema «Los números decimales» (1.º ESO, unidad 5). */
const numerosDecimalesTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Redondeo a las décimas (ej. resuelto, p. 58)",
    statement: "Redondea a las décimas: a) $13{,}8271$ b) $24{,}1532$.",
    solutionText:
      "a) Primera cifra suprimida $2 < 5$ → $13{,}8$.\nb) Primera cifra suprimida $5 \\geq 5$ → subimos décimas: $24{,}2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Redondeo a las centésimas (ej. resuelto, p. 59)",
    statement: "Redondea a las centésimas: a) $13{,}8271$ b) $24{,}1532$.",
    solutionText:
      "a) Primera suprimida $7 \\geq 5$ → $13{,}83$.\nb) Primera suprimida $3 < 5$ → $24{,}15$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Reparto del cronómetro (ej. resuelto, p. 58)",
    statement:
      "Siete atletas regalan un cronómetro de $30\\,€$. ¿Cuánto aporta cada uno? Aproxima a unidades, décimas y centésimas.",
    solutionText:
      "$30 : 7 = 4{,}285714\\ldots$\nA unidades: $4\\,€$.\nA décimas: $4{,}3\\,€$.\nA centésimas: $4{,}29\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Saldo de la hucha de Iván (ej. resuelto, p. 60)",
    statement:
      "Iván tiene $134{,}56\\,€$, ingresa $5{,}06\\,€$ y $13{,}70\\,€$, y retira $5{,}75\\,€$ y $12{,}80\\,€$. ¿Saldo final?",
    solutionText:
      "Ingresos netos: $134{,}56 + 5{,}06 + 13{,}70 = 153{,}32\\,€$.\nRetiros: $12{,}80 + 5{,}75 = 18{,}55\\,€$.\nSaldo: $153{,}32 - 18{,}55 = 134{,}77\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Compra de tela (Marta, ej. resuelto, p. 61)",
    statement:
      "Marta compra $3{,}5\\,\\mathrm{m}$ de tela a $12{,}85\\,€/\\mathrm{m}$. ¿Cuánto paga redondeando a céntimos?",
    solutionText:
      "$12{,}85 \\cdot 3{,}5 = 44{,}975\\,€$.\nRedondeo a centésimas: $44{,}98\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Reparto entre hermanos (ej. resuelto, p. 62)",
    statement: "Cuatro hermanos reparten $35\\,€$ por igual. ¿Cuánto recibe cada uno?",
    solutionText:
      "$35 : 4 = 8{,}75\\,€$ cada uno (cociente exacto a centésimas).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Tres vestidos iguales (ej. resuelto, p. 62)",
    statement:
      "Con $7{,}3\\,\\mathrm{m}$ de tela se confeccionan tres vestidos iguales. ¿Metros por vestido (dos decimales)?",
    solutionText:
      "$7{,}3 : 3 = 2{,}433\\ldots \\approx 2{,}43\\,\\mathrm{m}$ por vestido.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Actividad 1 — Lectura de decimales (p. 59)",
    statement:
      "Escribe cómo se leen: a) $0{,}7$ b) $0{,}05$ c) $0{,}002$ d) $1{,}2$ e) $12{,}56$ f) $5{,}184$ g) $1{,}06$ h) $5{,}004$ i) $2{,}018$.",
    solutionText:
      "a) Siete décimas.\nb) Cinco centésimas.\nc) Dos milésimas.\nd) Una unidad y dos décimas.\ne) Doce unidades y cincuenta y seis centésimas.\nf) Cinco unidades y ciento ochenta y cuatro milésimas.\ng) Una unidad y seis centésimas.\nh) Cinco unidades y cuatro milésimas.\ni) Dos unidades y dieciocho milésimas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Actividad 2 — Escritura con cifras (p. 59)",
    statement:
      "Escribe con cifras: a) Ocho décimas. b) Dos centésimas. c) Tres milésimas. d) Trece milésimas. e) Tres unidades y cuatro décimas. f) Doce unidades y veinticinco centésimas. g) Seis unidades y ocho centésimas. h) Una unidad y trescientas once milésimas. i) Cinco unidades y catorce milésimas.",
    solutionText:
      "a) $0{,}8$ b) $0{,}02$ c) $0{,}003$ d) $0{,}013$ e) $3{,}4$ f) $12{,}25$ g) $6{,}08$ h) $1{,}311$ i) $5{,}014$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Actividad 3 — Lectura de decimales pequeños (p. 59)",
    statement:
      "Escribe cómo se leen: a) $0{,}0007$ b) $0{,}0042$ c) $0{,}0583$ d) $0{,}00008$ e) $0{,}00046$ f) $0{,}00853$ g) $0{,}000001$ h) $0{,}000055$ i) $0{,}000856$.",
    solutionText:
      "a) Siete diezmilésimas.\nb) Cuarenta y dos cienmilésimas.\nc) Quinientas ochenta y tres diezmilésimas.\nd) Ocho cienmilésimas.\ne) Cuarenta y seis cienmilésimas.\nf) Ochocientas cincuenta y tres diezmilésimas.\ng) Una millonésima.\nh) Cincuenta y cinco millonésimas.\ni) Ochocientas cincuenta y seis millonésimas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Actividad 4 — Órdenes altos (p. 59)",
    statement:
      "Escribe con cifras: a) Quince diezmilésimas. b) Ciento ochenta y tres cienmilésimas. c) Cincuenta y ocho millonésimas.",
    solutionText: "a) $0{,}0015$ b) $0{,}00183$ c) $0{,}000058$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Actividad 7 — Ordenar decimales (p. 59)",
    statement:
      "Ordena de menor a mayor:\na) $5{,}83$, $5{,}51$, $5{,}09$, $5{,}511$, $5{,}47$.\nb) $0{,}1$, $0{,}09$, $0{,}099$, $0{,}12$, $0{,}029$.\nc) $0{,}5$, $-0{,}8$, $-0{,}2$, $1{,}03$, $-1{,}1$.",
    solutionText:
      "a) $5{,}09 < 5{,}47 < 5{,}51 < 5{,}511 < 5{,}83$.\nb) $0{,}029 < 0{,}09 < 0{,}099 < 0{,}1 < 0{,}12$.\nc) $-1{,}1 < -0{,}8 < -0{,}2 < 0{,}5 < 1{,}03$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Actividad 9 — Aproximar a unidades (p. 59)",
    statement:
      "Aproxima a las unidades: a) $5{,}18$ b) $3{,}65$ c) $9{,}95$ d) $0{,}75$ e) $1{,}099$ f) $3{,}901$.",
    solutionText:
      "a) $5$ b) $4$ c) $10$ d) $1$ e) $1$ f) $4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Actividad 10 — Aproximar a centésimas (p. 59)",
    statement:
      "Aproxima a las centésimas: a) $0{,}574$ b) $1{,}278$ c) $5{,}099$ d) $3{,}0051$ e) $8{,}0417$ f) $2{,}999$.",
    solutionText:
      "a) $0{,}57$ b) $1{,}28$ c) $5{,}10$ d) $3{,}01$ e) $8{,}04$ f) $3{,}00$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const numerosDecimalesTopicExercises: CurriculumTopicExercise[] = [
  ...numerosDecimalesTopicExercisesBase,
  ...numerosDecimalesTopicExercisesExtra,
];
