import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8014-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Consolidación, problemas y autoevaluación de la unidad 14. */
export const tablasGraficasTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(13),
    title: "Representar puntos (prob. 1, p. 161)",
    statement:
      "Representa: a) $A(3, 2)$, $B(5, 1)$, $C(0, 2)$, $D(5, 5)$, $E(3, 0)$ b) $A(-3, 5)$, $B(0, -6)$, $C(-1, -3)$, $D(3, 4)$.",
    solutionText:
      "Cuenta cuadrículas desde el origen: primero $x$ (derecha/izquierda), luego $y$ (arriba/abajo). Comprueba el cuadrante según signos.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Viaje en coche — distancia y tiempo (prob. 6, p. 161)",
    statement:
      "Gráfica distancia (km)–tiempo (h) hasta 90 km: a) km en la 1.ª media hora b) tiempo parado c) distancias de paradas d) descripción del viaje.",
    solutionText:
      "Lee pendientes (velocidad) y tramos horizontales (paradas). Suma tiempos parados; distancias en los «saltos» horizontales.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Segundo viaje (prob. 7, p. 161)",
    statement:
      "Otra gráfica al mismo destino: vuelta en la 1.ª hora, parada, tiempo en marcha, qué pasó en la 1.ª media hora.",
    solutionText:
      "Compara con el ejercicio anterior: tramo descendente puede ser vuelta; horizontal = parada; tramo inicial lento o atasco según pendiente.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Estadística — variables (prob. 8, p. 162)",
    statement:
      "¿Cualitativa o cuantitativa? Deporte preferido, calzado, estudios deseados, nota de mates, libros leídos.",
    solutionText:
      "Cualitativa: deporte, estudios. Cuantitativa: calzado, nota, libros.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Carreras universitarias — barras y moda (prob. 9, p. 162)",
    statement:
      "Frecuencias: Ingeniería 6, Medicina 4, Ciencias 6, Derecho 3, Letras 8, Informática 6, Otras 7. Diagrama de barras y moda. ¿Por qué no hay media?",
    solutionText:
      "Moda: Letras (8). Es variable **cualitativa** → no se pueden promediar categorías.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Media, mediana y moda — conjuntos (prob. 10, p. 162)",
    statement:
      "Calcula en: a) $2, 4, 4, 41, 17, 13, 24$ b) $1, 3, 5, 4, 2, 8, 9, 6, 10, 6$ c) $1, 3, 8, 9, 4, 1, 1, 7, 10, 10$.",
    solutionText:
      "a) Media $\\approx 15{,}29$; ordena para mediana y moda.\nb) Media $5{,}4$; mediana $(5+6)/2=5{,}5$; moda $6$.\nc) Media $5{,}4$; mediana $4{,}5$; moda $1$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Histograma de pesos (prob. 11, p. 162)",
    statement:
      "Histograma de pesos (kg): un alumno >70 kg. a) Color de barra de 57 kg b) Alumnos entre 60–65 kg c) Más de 50 kg d) Total clase.",
    solutionText:
      "Localiza la clase de cada intervalo; suma frecuencias de barras que cumplan la condición; total = suma de todas las frecuencias.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Autoevaluación — puntos y fracciones (p. 162)",
    statement: "Representa $A(0{,}5; -2)$, $B(-3, 1)$, $C(1/2, 2)$, $D(-2, -2)$.",
    solutionText:
      "$A$: medio a la derecha, dos abajo. $C_x=0{,}5$. Cuadrantes II y III para $B$ y $D$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Autoevaluación — recorrido de Íker (p. 162)",
    statement:
      "Gráfica distancia–tiempo al colegio: describe posibles paradas, aceleraciones o retrocesos según tramos.",
    solutionText:
      "Horizontal: quieto; subida: alejándose del origen; bajada: acercándose; pendiente mayor = más rápido.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Autoevaluación — tíos y tías (p. 162)",
    statement:
      "Datos de tíos y tías de un grupo de montaña (21 valores listados). Tabla de frecuencias, $N$ y polígono de frecuencias.",
    solutionText:
      "Cuenta cada valor; $N=21$; en el polígono une puntos $(x, f(x))$ sobre el eje de valores.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Autoevaluación — examen conducir (p. 162)",
    statement:
      "20 personas: fallos $0,2,3,1,0,1,1,2,3,2,3,2,4,0,2,2,0,2,1,1$. Media, mediana y moda.",
    solutionText:
      "Suma $= 32$ → media $1{,}6$. Ordenados: mediana $(1+2)/2=1{,}5$. Moda $=2$ (8 veces).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
