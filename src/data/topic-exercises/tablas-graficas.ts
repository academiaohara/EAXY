import type { CurriculumTopicExercise } from "@/content/types";
import { tablasGraficasTopicExercisesExtra } from "@/data/topic-exercises/tablas-graficas-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8014-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejemplos resueltos y actividades clave del tema «Tablas y gráficas» (1.º ESO, unidad 14). */
const tablasGraficasTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Coordenadas — P(3, 5) y orden cambiado (act. 1, p. 154)",
    statement:
      "Representa $P(3, 5)$. Otro punto $Q$ tiene la misma abscisa y ordenada que $P$ pero **cambiadas de orden**. ¿Cuáles son las coordenadas de $Q$?",
    solutionText: "$Q(5, 3)$: se intercambian $x$ e $y$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Signos en los ejes (teoría, p. 154)",
    statement:
      "Clasifica: a) abscisa de puntos del eje Y b) ordenada de puntos del eje X c) signo de la abscisa a la izquierda del eje Y.",
    solutionText:
      "a) $x = 0$ b) $y = 0$ c) Abscisa **negativa** (tercer y segundo cuadrantes).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Polígono casa — vértices (act. 3, p. 154)",
    statement:
      "Une en orden $A(3, 1)$, $B(9, 1)$, $C(9, 5)$, $D(11, 5)$, $E(8, 7)$, $F(4, 7)$, $G(1, 5)$, $H(3, 5)$ y vuelve a $A$. ¿Qué figura obtienes?",
    solutionText:
      "Un polígono en forma de «casa» (base, tejado, chimenea). Para una puerta rectangular hay que añadir vértices en la base (por ejemplo entre $(4,1)$ y $(6,1)$ con altura $2$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Llamadas telefónicas — interpretación (ej. resuelto, p. 156)",
    statement:
      "Gráfica tiempo (min)–coste (€): a $0$ min se pagan $0{,}40\\,€$; cada minuto suma $0{,}20\\,€$. Describe la gráfica.",
    solutionText:
      "Cuota de establecimiento $0{,}40\\,€$. Cada minuto de conexión cuesta $0{,}20\\,€$ más: recta creciente que parte de $(0; 0{,}40)$ con pendiente $0{,}20\\,€/\\min$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Peso de Ramón (ej. resuelto, p. 156)",
    statement:
      "Resume con palabras una gráfica edad–peso donde Ramón gana peso, pierde un poco hacia los 7–8 años, se estabiliza y luego «estira» hasta $60\\,\\mathrm{kg}$ a los 14 años.",
    solutionText:
      "Subida general del peso con la edad; bajón breve en la infancia; meseta entre 10 y 11,5 años (~35 kg); fuerte aumento en la adolescencia hasta 60 kg.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Marta y María al colegio (act. 1, p. 156)",
    statement:
      "Dos gráficas tiempo–distancia al colegio: identifica variables, distancia casa–colegio y tiempo de cada recorrido.",
    solutionText:
      "$x$: tiempo (min); $y$: distancia (m). Lee el máximo de $y$ (distancia total) y el $x$ final (duración). Compara tramos horizontales (paradas) y pendientes (velocidad).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Tipos de variable (act. 2, p. 157)",
    statement:
      "Clasifica: deporte preferido, número de calzado, estatura, estudios que quieres seguir, nota de matemáticas.",
    solutionText:
      "Cualitativa: deporte, estudios. Cuantitativa: calzado, estatura, nota.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Frecuencias hermanos — clase 36 (p. 157)",
    statement:
      "Tabla: $f(0)=4$, $f(1)=16$, $f(2)=9$, $f(3)=6$, $f(4)=1$, $f(5)=0$. Halla $fr(0)$ y $fr(1)$.",
    solutionText: "$fr(0)=\\dfrac{4}{36}=\\dfrac{1}{9}$; $fr(1)=\\dfrac{16}{36}=\\dfrac{4}{9}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Media, mediana y moda — dado (act. 1, p. 158)",
    statement:
      "10 tiradas: $1, 5, 3, 1, 2, 6, 4, 1, 4, 3$. a) ¿Cualitativa o cuantitativa? b) Media, mediana y moda.",
    solutionText:
      "a) Cuantitativa.\nb) Suma $30$ → media $3$. Ordenados: $1,1,1,2,3,3,4,4,5,6$ → mediana $(3+3)/2=3$. Moda $=1$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Media, mediana y moda (ej. resuelto 1, p. 158)",
    statement: "Datos: $4, 6, 8, 8, 9, 10, 10, 10$. Halla media, mediana y moda.",
    solutionText:
      "Media $= 65/8 = 8{,}125$. Mediana $= (8+9)/2 = 8{,}5$. Moda $= 10$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Moda cualitativa — cumpleaños (ej. resuelto 2, p. 158)",
    statement: "Estaciones: I, V, P, O, V, O, P, P, I, V, P. ¿Media? ¿Moda?",
    solutionText: "No hay media ni mediana (cualitativa). Moda $=\\mathrm{P}$ (primavera, 4 veces).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Diagrama de sectores — deportes (act. 1, p. 160)",
    statement:
      "40 chicos: baloncesto 10, balonvolea 1, fútbol 20, tenis 5, ajedrez 4. Reparte $360°$ entre 40 ($9°$ c/u). Ángulo de cada deporte.",
    solutionText:
      "Fútbol $180°$, baloncesto $90°$, tenis $45°$, ajedrez $36°$, balonvolea $9°$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const tablasGraficasTopicExercises: CurriculumTopicExercise[] = [
  ...tablasGraficasTopicExercisesBase,
  ...tablasGraficasTopicExercisesExtra,
];
