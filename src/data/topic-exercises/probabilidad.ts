import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8015-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos del tema «Probabilidad» (1.º ESO, unidad 15). */
export const probabilidadTopicExercises: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Clasificar experimentos (obj. 1)",
    statement:
      "Indica si son deterministas o aleatorios: a) lanzar un dado; b) dividir $10$ entre $2$; c) lanzar una moneda; d) sacar una carta de una baraja española; e) elevar un número al cuadrado.",
    solutionText:
      "**Aleatorios:** lanzar un dado (ej. $3$), moneda, carta de baraja, tiempo de mañana, sacar ficha roja de caja con rojas y azules.\n**Deterministas:** $10:2=5$, elevar al cuadrado, caída libre con datos conocidos, fecha de nacimiento, sacar solo rojas de caja con $20$ rojas y $5$ azules cuando pides «una roja» (siempre roja).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Espacio muestral — moneda y dado (obj. 2)",
    statement:
      "Completa: al lanzar una moneda $E = \\{\\ldots\\}$; al lanzar un dado $E = \\{\\ldots\\}$.",
    solutionText:
      "Moneda: $E = \\{\\text{cara},\\ \\text{cruz}\\}$.\nDado: $E = \\{1, 2, 3, 4, 5, 6\\}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Tres bolas sin reemplazo (obj. 2)",
    statement:
      "Sacamos tres bolas, sin devolverlas, de una urna con bolas $1$, $2$ y $3$. ¿Cuántos resultados ordenados hay?",
    solutionText:
      "Primera extracción: $3$ opciones; segunda: $2$; tercera: $1$.\n$3 \\cdot 2 \\cdot 1 = 6$ ternas ordenadas, por ejemplo $(1,2,3)$, $(1,3,2)$, …",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Suma de dos dados (obj. 2)",
    statement:
      "Lanzamos dos dados y sumamos puntos. Escribe el espacio muestral de la suma y cuántos valores distintos hay.",
    solutionText:
      "$E = \\{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12\\}$.\nHay **$11$** resultados distintos.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Sucesos en cartas 1–8 (obj. 3)",
    statement:
      "Ocho cartas del $1$ al $8$. Una extracción. Escribe los sucesos elementales de: a) par; b) múltiplo de $3$; c) mayor que $4$.",
    solutionText:
      "a) $\\{2, 4, 6, 8\\}$\nb) $\\{3, 6\\}$\nc) $\\{5, 6, 7, 8\\}$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Seguro e imposible (obj. 3)",
    statement:
      "Clasifica: a) De baraja de $40$, sacar picas. b) Bolsa $2$ rojas y $3$ verdes, sacar azul. c) Fichas $1$–$4$, número menor que $5$. d) Dado, número mayor que $6$.",
    solutionText:
      "a) **Suceso posible** (no seguro ni imposible): hay $10$ picas.\nb) **Imposible** (no hay azules).\nc) **Seguro** (todas las fichas son $<5$).\nd) **Imposible** (máximo es $6$; «mayor que $6$» no ocurre).\nSumar dos dados y obtener $0$: **imposible**. Obtener $3$: posible. Multiplicar caras y obtener $40$: posible ($5 \\cdot 8$ no en dos dados; máximo producto $36$ — **imposible**).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Frecuencias de un dado — Roberto (obj. 4)",
    statement:
      "Roberto lanza un dado $50$ veces con $f_1=7$, $f_2=6$, $f_3=14$, $f_4=9$, $f_5=10$, $f_6=4$. Calcula $h_3$ y comprueba que $\\sum h_i = 1$.",
    solutionText:
      "$h_3 = 14/50 = 0{,}28$.\n$h_i$: $0{,}14$, $0{,}12$, $0{,}28$, $0{,}18$, $0{,}20$, $0{,}08$ → suma $1$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Bombo 0–9 — suceso múltiplo de 3 (obj. 4)",
    statement:
      "En $100$ extracciones con reemplazo, $f_3=12$, $f_6=12$, $f_9=11$. Si $A=$ múltiplo de $3$, calcula $h_A$.",
    solutionText:
      "$f_A = 12 + 12 + 11 = 35$.\n$h_A = 35/100 = 0{,}35$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Moneda 25 veces (obj. 5)",
    statement:
      "Tiras una moneda $25$ veces y anotas cara/cruz. ¿Qué valor esperas aproximado para cada frecuencia relativa?",
    solutionText:
      "Cada $h_i$ debería acercarse a **$0{,}5$** si la moneda es equilibrada.\nCon pocas repeticiones hay variación; con muchas, se acercan a la probabilidad $1/2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Regla de Laplace — dado (obj. 5)",
    statement:
      "Dado equilibrado. Calcula: a) $P(\\text{par})$; b) $P(\\text{par o } <5)$; c) $P(\\text{par y } 4)$.",
    solutionText:
      "a) Favorables $\\{2,4,6\\}$: $P = 3/6 = 1/2$.\nb) $\\{1,2,3,4\\}$: $P = 4/6 = 2/3$.\nc) Solo $\\{4\\}$: $P = 1/6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Dado de quiniela (obj. 5, act. 2)",
    statement:
      "Dado con tres caras «$1$», dos «$X$» y una «$2$». a) Espacio muestral. b) $P(1)$, $P(X)$, $P(2)$.",
    solutionText:
      "Seis caras en total: $E = \\{1,1,1,X,X,2\\}$ (o contando equiprobables: $6$ resultados).\n$P(1) = 3/6 = 1/2$, $P(X) = 2/6 = 1/3$, $P(2) = 1/6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Urna 4 colores — dos bolas (obj. 5, act. 3)",
    statement:
      "Urna: $1$ roja, $1$ azul, $1$ verde, $1$ blanca. Sacamos **dos bolas a la vez**. a) $|E|$. b) $P(\\text{una blanca y una roja})$. c) $P(\\text{dos rojas})$. d) $P(\\text{ninguna blanca})$.",
    solutionText:
      "Parejas: $E = \\{RB, RV, RBl, AV, ABl, VBl\\}$ → $|E| = 6$.\nb) Solo $\\{RBl\\}$ → $P = 1/6$.\nc) Imposible dos rojas → $P = 0$.\nd) Favorables $\\{RB, RV, AV\\}$ → $P = 3/6 = 1/2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Baraja española 40 cartas (obj. 5, act. 4)",
    statement:
      "Una carta al azar. Calcula: a) $P(\\text{rey})$; b) $P(\\text{oros})$; c) $P(4 \\text{ o } 6)$; d) $P(\\text{rey de oros})$.",
    solutionText:
      "a) $4$ reyes → $4/40 = 1/10$.\nb) $10$ oros → $10/40 = 1/4$.\nc) Ocho cartas ($4$ y $6$ en cuatro palos) → $8/40 = 1/5$.\nd) Una carta → $1/40$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Comida — hombres, mujeres y menú (obj. 5, act. 5)",
    statement:
      "$28$ hombres y $32$ mujeres. Carne: $16$ hombres y $20$ mujeres; el resto pescado. Eliges una persona al azar. ¿$P(\\text{hombre})$, $P(\\text{pescado})$, $P(\\text{hombre y pescado})$?",
    solutionText:
      "Total $60$ personas. Pescado: $(28-16)+(32-20)=12+12=24$.\n$P(H) = 28/60 = 7/15$.\n$P(P) = 24/60 = 2/5$.\nHombres con pescado: $12$ → $P(H \\cap P) = 12/60 = 1/5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Suma de dos dados — Laplace (obj. 5, act. 6)",
    statement:
      "Dos dados y sumamos. a) Lista $E$. b) $P(\\text{suma } 3)$. c) $P(\\text{suma } 7)$. d) $P(\\text{suma } > 10)$. e) $P(\\text{suma } 4 \\text{ o } 5)$.",
    solutionText:
      "Hay $36$ parejas equiprobables $(1,1)$ … $(6,6)$.\nb) Suma $3$: $(1,2),(2,1)$ → $P = 2/36 = 1/18$.\nc) Suma $7$: $6$ parejas → $P = 6/36 = 1/6$.\nd) Sumas $11$ o $12$: $2+1=3$ casos → $P = 3/36 = 1/12$.\ne) Suma $4$: $3$ casos; suma $5$: $4$ casos → $7/36$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
