import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8005-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Actividades, consolidación, problemas y autoevaluación de la unidad 5. */
export const numerosDecimalesTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(15),
    title: "Actividad 5 — Valor de letras en la recta (p. 59)",
    statement:
      "En la recta del libro, entre $6{,}2$ y $6{,}4$ hay marcas igualmente espaciadas ($Z$, $A$, $B$…); entre $1{,}56$ y $1{,}57$ están $T$ e $Y$. Indica valores coherentes con esa escala.",
    solutionText:
      "Entre $6{,}2$ y $6{,}4$ hay $0{,}2$ de amplitud: por ejemplo $Z = 6{,}2$, $A = 6{,}25$, $B = 6{,}35$ (ajusta según el número de marcas de tu dibujo).\nEntre $1{,}56$ y $1{,}57$: $T = 1{,}562$, $Y = 1{,}568$ si hay cuatro subdivisiones, etc.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Actividad 6 — Representación en la recta (p. 59)",
    statement: "Representa en la recta numérica: $A = 3$, $B = 3{,}4$, $C = 3{,}75$, $D = 4$.",
    solutionText:
      "Todos están entre $3$ y $4$: $A$ en el $3$ exacto, $B$ en $3{,}4$, $C$ más cerca de $4$ ($3{,}75$), $D$ en el $4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Actividad 8 — Decimales entre dos dados (p. 59)",
    statement:
      "Escribe un decimal en cada hueco: $2{,}6 < \\ldots < 2{,}8$; $7 < \\ldots < 8$; $0{,}3 < \\ldots < 0{,}5$; $0{,}4 < \\ldots < 0{,}5$; $1{,}25 < \\ldots < 1{,}27$; $3{,}42 < \\ldots < 3{,}43$.",
    solutionText:
      "Ejemplos válidos: $2{,}7$; $7{,}5$; $0{,}4$; $0{,}45$; $1{,}26$; $3{,}425$ (cualquier valor estrictamente entre los extremos).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Suma y resta — cálculo mental (act. 1, p. 60)",
    statement:
      "Calcula mentalmente: a) $0{,}8 + 0{,}4$ b) $1 - 0{,}3$ c) $1{,}2 + 1{,}8$ d) $2{,}4 - 0{,}6$ e) $3{,}25 + 1{,}75$ f) $2{,}5 - 0{,}75$ g) $4{,}08 + 0{,}12$ h) $3 - 0{,}15$.",
    solutionText:
      "a) $1{,}2$ b) $0{,}7$ c) $3$ d) $1{,}8$ e) $5$ f) $1{,}75$ g) $4{,}2$ h) $2{,}85$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Suma y resta — lápiz y papel (act. 2, p. 60)",
    statement:
      "Calcula: a) $6{,}12 + 0{,}87 + 1{,}342$ b) $124{,}75 + 86{,}287 + 5{,}3408$ c) $132 - 26{,}53$ d) $12{,}8 - 1{,}937$ e) $175{,}4 - 86{,}9207$.",
    solutionText:
      "a) $8{,}332$ b) $216{,}3778$ c) $105{,}47$ d) $10{,}863$ e) $88{,}4793$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Series decimales (act. 3, p. 60)",
    statement:
      "Completa tres términos más:\na) $3{,}25$, $4$, $4{,}75$, $5{,}5$, …\nb) $8{,}65$, $8{,}5$, $8{,}35$, $8{,}2$, …\nc) $1{,}5$, $1{,}62$, $1{,}74$, $1{,}86$, …",
    solutionText:
      "a) $6{,}25$, $7$, $7{,}75$ (suma $0{,}75$).\nb) $8{,}05$, $7{,}9$, $7{,}75$ (resta $0{,}15$).\nc) $1{,}98$, $2{,}1$, $2{,}22$ (suma $0{,}12$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Suma y resta con signos (act. 4, p. 60)",
    statement:
      "Calcula: a) $0{,}5 - 0{,}75$ b) $1{,}2 - 1{,}5$ c) $0{,}25 - 1$ d) $2 - 1{,}95$ e) $0{,}4 + 0{,}8 - 1{,}6$ f) $2{,}7 - 0{,}95 - 1{,}04$.",
    solutionText:
      "a) $-0{,}25$ b) $-0{,}3$ c) $-0{,}75$ d) $0{,}05$ e) $-0{,}4$ f) $0{,}71$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Estaturas de Roberto, Macarena y Miguel (act. 5, p. 60)",
    statement:
      "Roberto mide $1{,}66\\,\\mathrm{m}$; Macarena, $0{,}38\\,\\mathrm{m}$ más; Miguel, $0{,}23\\,\\mathrm{m}$ menos que Macarena. ¿Estatura de Miguel?",
    solutionText:
      "Macarena: $1{,}66 + 0{,}38 = 2{,}04\\,\\mathrm{m}$.\nMiguel: $2{,}04 - 0{,}23 = 1{,}81\\,\\mathrm{m}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Multiplicación — completar y calcular (act. 6-7, p. 61)",
    statement:
      "Calcula: a) $8 \\cdot 0{,}3$ b) $5 \\cdot 0{,}5$ c) $0{,}4 \\cdot 0{,}3$ d) $0{,}75 \\cdot 2$ e) $0{,}25 \\cdot 4$ f) $0{,}25 \\cdot 5$ g) $(-0{,}1) \\cdot (+6)$ h) $0{,}2 \\cdot (-0{,}4)$ i) $(-0{,}1) \\cdot (-0{,}2)$ j) $(-0{,}2) \\cdot (-0{,}2)$.",
    solutionText:
      "a) $2{,}4$ b) $2{,}5$ c) $0{,}12$ d) $1{,}5$ e) $1$ f) $1{,}25$ g) $-0{,}6$ h) $-0{,}08$ i) $0{,}02$ j) $0{,}04$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Multiplicación por potencias de 10 (act. 8, p. 61)",
    statement:
      "Multiplica: a) $3{,}26 \\cdot 100$ b) $35{,}29 \\cdot 10$ c) $4{,}7 \\cdot 1000$ d) $9{,}48 \\cdot 1000$ e) $-6{,}24 \\cdot 100$ f) $0{,}475 \\cdot (-10)$.",
    solutionText:
      "a) $326$ b) $352{,}9$ c) $4700$ d) $9480$ e) $-624$ f) $-4{,}75$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Multiplicación con lápiz y papel (act. 9, p. 61)",
    statement:
      "Multiplica: a) $3{,}25 \\cdot 16$ b) $2{,}6 \\cdot 5{,}8$ c) $27{,}5 \\cdot 10{,}4$ d) $3{,}70 \\cdot 1{,}20$ e) $4{,}03 \\cdot 2{,}7$ f) $5{,}14 \\cdot 0{,}08$.",
    solutionText:
      "a) $52$ b) $15{,}08$ c) $286$ d) $4{,}44$ e) $10{,}881$ f) $0{,}4112$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Expresiones con multiplicación (act. 10, p. 61)",
    statement:
      "Calcula: a) $8{,}3 + 0{,}5 \\cdot (3 - 4{,}2)$ b) $3{,}5 - 0{,}2 \\cdot (2{,}6 - 1{,}8)$ c) $(5{,}2 - 6{,}8) \\cdot (3{,}6 - 4{,}1)$ d) $(1{,}5 - 2{,}25) \\cdot (3{,}6 - 2{,}8)$.",
    solutionText:
      "a) $8{,}3 + 0{,}5 \\cdot (-1{,}2) = 8{,}3 - 0{,}6 = 7{,}7$.\nb) $3{,}5 - 0{,}2 \\cdot 0{,}8 = 3{,}5 - 0{,}16 = 3{,}34$.\nc) $(-1{,}6) \\cdot (-0{,}5) = 0{,}8$.\nd) $(-0{,}75) \\cdot 0{,}8 = -0{,}6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Precio del aceite (act. 11, p. 61)",
    statement: "Aceite a $3{,}15\\,€/\\mathrm{l}$. ¿Precio de $0{,}75\\,\\mathrm{l}$?",
    solutionText: "$3{,}15 \\cdot 0{,}75 = 2{,}3625 \\approx 2{,}36\\,€$ (a céntimos).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "División mental (act. 1, p. 63)",
    statement:
      "Divide mentalmente: a) $1 : 2$ b) $5 : 2$ c) $7 : 2$ d) $1 : 4$ e) $2 : 4$ f) $5 : 4$ g) $1{,}2 : 2$ h) $1{,}2 : 3$ i) $1{,}2 : 4$ j) $0{,}6 : 3$ k) $0{,}8 : 4$ l) $0{,}9 : 9$.",
    solutionText:
      "a) $0{,}5$ b) $2{,}5$ c) $3{,}5$ d) $0{,}25$ e) $0{,}5$ f) $1{,}25$ g) $0{,}6$ h) $0{,}4$ i) $0{,}3$ j) $0{,}2$ k) $0{,}2$ l) $0{,}1$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(29),
    title: "Cociente exacto (act. 3, p. 63)",
    statement:
      "Calcula el cociente exacto: a) $28 : 5$ b) $53 : 4$ c) $35 : 8$ d) $7{,}5 : 3$ e) $6{,}2 : 5$ f) $12{,}5 : 4$.",
    solutionText:
      "a) $5{,}6$ b) $13{,}25$ c) $4{,}375$ d) $2{,}5$ e) $1{,}24$ f) $3{,}125$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(30),
    title: "Cociente con dos decimales (act. 4, p. 63)",
    statement:
      "Como máximo dos cifras decimales: a) $47 : 3$ b) $9 : 7$ c) $169 : 11$ d) $7{,}7 : 6$ e) $14{,}3 : 9$ f) $96{,}7 : 2$.",
    solutionText:
      "a) $15{,}67$ b) $1{,}29$ c) $15{,}36$ d) $1{,}28$ e) $1{,}59$ f) $48{,}35$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(31),
    title: "Cociente con dos decimales (act. 5, p. 63)",
    statement:
      "Como máximo dos cifras decimales: a) $526 : 23$ b) $6321 : 145$ c) $82{,}93 : 36$ d) $1245{,}4 : 263$.",
    solutionText:
      "a) $22{,}87$ b) $43{,}59$ c) $2{,}30$ d) $4{,}74$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(32),
    title: "Dividir entre potencias de 10 (act. 6, p. 63)",
    statement:
      "Divide: a) $5 : 10$ b) $8 : 100$ c) $2 : 1000$ d) $3{,}6 : 10$ e) $5{,}7 : 100$ f) $2{,}8 : 1000$ g) $2{,}54 : 10$ h) $57{,}25 : 100$ i) $0{,}3 : 1000$ j) $1{,}2 : 10\\,000$.",
    solutionText:
      "a) $0{,}5$ b) $0{,}08$ c) $0{,}002$ d) $0{,}36$ e) $0{,}057$ f) $0{,}0028$ g) $0{,}254$ h) $0{,}5725$ i) $0{,}0003$ j) $0{,}00012$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(33),
    title: "Cociente con dos decimales — enteros (act. 7, p. 63)",
    statement:
      "Dos cifras decimales: a) $1 : 4$ b) $3 : 5$ c) $30 : 8$ d) $2 : 9$ e) $6 : 11$ f) $5 : 234$.",
    solutionText:
      "a) $0{,}25$ b) $0{,}60$ c) $3{,}75$ d) $0{,}22$ e) $0{,}55$ f) $0{,}02$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(34),
    title: "Cociente con dos decimales — dividendos decimales (act. 8, p. 63)",
    statement:
      "Dos cifras decimales: a) $0{,}9 : 5$ b) $0{,}5 : 4$ c) $0{,}3 : 9$ d) $1{,}2 : 7$ e) $0{,}08 : 2$ f) $0{,}02 : 5$.",
    solutionText:
      "a) $0{,}18$ b) $0{,}13$ c) $0{,}03$ d) $0{,}17$ e) $0{,}04$ f) $0{,}00$ (cociente $0{,}004$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(35),
    title: "Gasto diario en vacaciones (act. 9, p. 63)",
    statement:
      "Arancha gasta $51{,}60\\,€$ en diez días de vacaciones. ¿Gasto medio diario?",
    solutionText: "$51{,}60 : 10 = 5{,}16\\,€$ al día.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(36),
    title: "Peso de un bote de refresco (act. 10, p. 63)",
    statement: "Seis botes iguales pesan $2{,}07\\,\\mathrm{kg}$ en total. ¿Peso de un bote?",
    solutionText: "$2{,}07 : 6 = 0{,}345\\,\\mathrm{kg} = 345\\,\\mathrm{g}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(37),
    title: "Consolidación — lectura y escritura (ej. 1-3, p. 64)",
    statement:
      "1) Lee: a) $13{,}4$ b) $0{,}23$ c) $0{,}145$ d) $0{,}0017$ e) $0{,}0006$ f) $0{,}000148$.\n2) Escribe: a) Treinta y siete unidades y dos décimas. b) Ocho centésimas. c) Cinco unidades y cuarenta y dos milésimas. d) Ciento veinte cienmilésimas.\n3) Escribe: a) Media unidad. b) Media décima. c) Media centésima. d) Un cuarto de unidad.",
    solutionText:
      "1) a) Trece unidades y cuatro décimas. b) Veintitrés centésimas. c) Ciento cuarenta y cinco milésimas. d) Diecisiete diezmilésimas. e) Seis millonésimas. f) Ciento cuarenta y ocho cienmillonésimas.\n2) a) $37{,}2$ b) $0{,}08$ c) $5{,}042$ d) $0{,}00120$\n3) a) $0{,}5$ b) $0{,}05$ c) $0{,}005$ d) $0{,}25$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(38),
    title: "Consolidación — orden y redondeo (ej. 4-7, p. 64)",
    statement:
      "4) Ordena: a) $1{,}4$, $1{,}390$, $1{,}39$, $1{,}399$, $1{,}41$. b) $-0{,}6$, $0{,}9$, $-0{,}8$, $2{,}07$, $-1{,}03$.\n6) Aproxima $4{,}7998$ a décimas, centésimas y milésimas.\n7) Aproxima a unidades, décimas y centésimas: a) $2{,}499$ b) $1{,}992$ c) $0{,}999$.",
    solutionText:
      "4) a) $1{,}390 < 1{,}39 < 1{,}399 < 1{,}4 < 1{,}41$ (igualdades $1{,}390 = 1{,}39$).\nb) $-1{,}03 < -0{,}8 < -0{,}6 < 0{,}9 < 2{,}07$.\n6) Décimas $4{,}8$; centésimas $4{,}80$; milésimas $4{,}800$.\n7) a) $2$, $2{,}5$, $2{,}50$ b) $2$, $2{,}0$, $1{,}99$ c) $1$, $1{,}0$, $1{,}00$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(39),
    title: "Consolidación — sumas y restas (ej. 8-9, p. 64)",
    statement:
      "8) ¿Cuánto falta para llegar a…? a) de $4{,}7$ a $5$ b) de $1{,}95$ a $2$ c) de $7{,}999$ a $8$.\n9) Opera: a) $13{,}04 + 6{,}528$ b) $2{,}75 + 6{,}028 + 0{,}157$ c) $4{,}32 + 0{,}185 - 1{,}03$ d) $6 - 2{,}48 - 1{,}263$.",
    solutionText:
      "8) a) $0{,}3$ b) $0{,}05$ c) $0{,}001$.\n9) a) $19{,}568$ b) $8{,}935$ c) $3{,}475$ d) $2{,}257$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(40),
    title: "Consolidación — multiplicación (ej. 10-12, p. 64)",
    statement:
      "10) Multiplica: a) $0{,}6 \\cdot 0{,}4$ b) $0{,}03 \\cdot 0{,}005$ c) $1{,}3 \\cdot 0{,}08$ d) $15 \\cdot 0{,}007$ e) $2{,}65 \\cdot 1{,}24$ f) $0{,}25 \\cdot 0{,}16$.\n11) a) $0{,}12 \\cdot 10$ b) $0{,}12 : 10$ c) $0{,}002 \\cdot 100$ d) $0{,}002 : 100$ e) $0{,}125 \\cdot 1000$ f) $0{,}125 : 1000$.\n12) a) $6 \\cdot 0{,}5$ … f) $4{,}2 \\cdot 0{,}5$. ¿Qué observas?",
    solutionText:
      "10) a) $0{,}24$ b) $0{,}00015$ c) $0{,}104$ d) $0{,}105$ e) $3{,}286$ f) $0{,}04$.\n11) a) $1{,}2$ b) $0{,}012$ c) $0{,}2$ d) $0{,}00002$ e) $125$ f) $0{,}000125$.\n12) Multiplicar por $0{,}5$ equivale a dividir entre $2$ (la mitad del factor).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(41),
    title: "Mayorista de peras (ej. 13, p. 64-65)",
    statement:
      "Compra $12\\,800\\,\\mathrm{kg}$ a $0{,}45\\,€/\\mathrm{kg}$, aparta $300\\,\\mathrm{kg}$ defectuosos y vende el resto a $0{,}90\\,€/\\mathrm{kg}$ con gastos $1300\\,€$. a) ¿Qué expresión calcula la ganancia? b) Si lo defectuoso se vende a $0{,}20\\,€/\\mathrm{kg}$, ¿ganancia?",
    solutionText:
      "a) La correcta es I: $(12\\,800 - 300) \\cdot 0{,}90 - 12\\,800 \\cdot 0{,}45 - 1300$.\nb) Ingresos: $12\\,500 \\cdot 0{,}90 + 300 \\cdot 0{,}20 = 11\\,310\\,€$. Coste compra: $5760\\,€$. Ganancia: $11\\,310 - 5760 - 1300 = 4250\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(42),
    title: "Problemas 14-17 (p. 65)",
    statement:
      "14) Monedas: $87$ de $0{,}10\\,€$ y $52$ de $0{,}20\\,€$. 15) $20\\,\\mathrm{m}$ en $25$ lazos iguales. 16) Llenar $1000$ frascos de $33\\,\\mathrm{ml}$. 17) $10$ canicas cristal $88\\,\\mathrm{g}$; $9$ cerámica $80\\,\\mathrm{g}$. ¿Cuál pesa más una canica?",
    solutionText:
      "14) $87 \\cdot 0{,}10 + 52 \\cdot 0{,}20 = 19{,}10\\,€$.\n15) $20 : 25 = 0{,}8\\,\\mathrm{m}$ por lazo.\n16) $1000 \\cdot 33\\,\\mathrm{ml} = 33\\,000\\,\\mathrm{ml} = 33\\,\\mathrm{l}$.\n17) Cristal: $88 : 10 = 8{,}8\\,\\mathrm{g}$; cerámica: $80 : 9 \\approx 8{,}89\\,\\mathrm{g}$ → la de cerámica pesa más.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(43),
    title: "Problemas 18-21 (p. 65)",
    statement:
      "18) Goles a favor $3,2,2,0,1$; en contra $1,2,1,1,1$ (cinco partidos): medias. 19) Notas $5{,}5$, $7$, $2{,}40$. 20) Compra supermercado (leche, bacalao, galletas, jamón). 21) Tarifas móviles A ($0{,}30 + 0{,}20$/min) y B ($0{,}25$/min).",
    solutionText:
      "18) Media a favor: $8 : 5 = 1{,}6$; en contra: $6 : 5 = 1{,}2$.\n19) $(5{,}5 + 7 + 2{,}40) : 3 = 4{,}97$ (aprox.).\n20) $5 \\cdot 1{,}05 + 0{,}920 \\cdot 13{,}25 + 2{,}85 + 0{,}25 \\cdot 38{,}40 = 29{,}89\\,€$.\n21) a) $10$ min: A $2{,}30\\,€$, B $2{,}50\\,€$. b) Igualdad: $0{,}30 + 0{,}20m = 0{,}25m \\Rightarrow m = 6$ min. c) Menos de $6$ min suele interesar B; más de $6$ min también B (sin cuota fija).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(44),
    title: "Autoevaluación 1-4 (p. 65)",
    statement:
      "1) Escribe: a) Veintiocho milésimas. b) Dos unidades y siete centésimas. c) Ciento treinta y dos diezmilésimas. d) Nueve millonésimas.\n2) Ordena y representa: $2{,}07$, $-0{,}27$, $-2{,}71$, $-2{,}7$, $2{,}17$.\n3) Completa: a) $2 < \\ldots < 3$ b) $4{,}5 < \\ldots < 4{,}6$ c) $0{,}1 < \\ldots < 0{,}11$.\n4) Redondea $2{,}726$ y $5{,}6$ a décimas y centésimas.",
    solutionText:
      "1) a) $0{,}028$ b) $2{,}07$ c) $0{,}0132$ d) $0{,}000009$.\n2) $-2{,}71 < -2{,}7 < -0{,}27 < 2{,}07 < 2{,}17$.\n3) Ej.: $2{,}5$; $4{,}55$; $0{,}105$.\n4) $2{,}726 \\to 2{,}7$ y $2{,}73$; $5{,}6 \\to 5{,}6$ y $5{,}60$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(45),
    title: "Autoevaluación 5-7 (p. 65)",
    statement:
      "5) a) $2{,}8 - 3{,}75 + 1{,}245$ b) $2{,}8 \\cdot 3{,}75$ c) $3 \\cdot 2{,}6 - 1{,}75 \\cdot 4{,}2$.\n6) Dos decimales: a) $7 : 13$ b) $54{,}5 : 12$.\n7) Melón $2{,}800\\,\\mathrm{kg}$ a $1{,}75\\,€/\\mathrm{kg}$.",
    solutionText:
      "5) a) $-0{,}705$ b) $10{,}5$ c) $0{,}45$.\n6) a) $0{,}54$ b) $4{,}54$.\n7) $1{,}75 \\cdot 2{,}800 = 4{,}90\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
