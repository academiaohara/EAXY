import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasInterpretacionGraficasLesson: InteractiveLesson = {
  slug: "tablas-graficas-interpretacion-graficas",
  title: "3. Interpretación de gráficas",
  subtitle: TEMA_14_SUBTITLE,
  steps: [
    {
      id: "variables-funcion",
      type: "concept",
      title: "Variable independiente y dependiente",
      content: [
        "Las **gráficas** describen relaciones entre **dos variables**.",
        "En el eje horizontal va la **variable $x$** o **independiente** (tú la «fijas»: tiempo, edad…).",
        "En el eje vertical va la **variable $y$** o **dependiente** (cambia en función de $x$): coste, distancia, peso…",
        "Decimos que **$y$ es función de $x$**.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Lenguaje del gráfico",
          rows: [
            { text: "Eje horizontal", math: "x\\ \\text{(independiente)}" },
            { text: "Eje vertical", math: "y\\ \\text{(dependiente)}" },
            { text: "Lectura habitual", math: "\\text{de izquierda a derecha}" },
          ],
        },
      ],
    },
    {
      id: "como-leer",
      type: "concept",
      title: "Cómo interpretar",
      content: [
        "Mira la gráfica **de izquierda a derecha**: observa cómo cambia **$y$** cuando **aumenta $x$**.",
        "Sube → la magnitud dependiente **aumenta**; baja → **disminuye**; tramo horizontal → **se mantiene** (parada, meseta…).",
        "Antes de describir, identifica **unidades** en cada eje (minutos, euros, km, kg…).",
      ],
    },
    {
      id: "llamadas",
      type: "animated_solution",
      title: "Ejemplo: coste de llamadas",
      content: [
        "En una gráfica tiempo–coste, la **cuota de establecimiento** aparece en $y$ aunque el tiempo sea $0$.",
      ],
      frames: [
        {
          math: "\\text{Eje } x:\\ \\text{tiempo (min)}",
          caption: "Cada 2 cuadritos = 1 minuto (según la escala del dibujo).",
        },
        {
          math: "\\text{Eje } y:\\ \\text{coste (€)}",
          caption: "Si 5 cuadritos = 1 €, 1 cuadrito = 0,20 €.",
        },
        {
          math: "y(0) = 0{,}40\\,€",
          caption: "Cuota fija al descolgar (dos cuadritos en el eje Y).",
        },
        {
          math: "+\\,0{,}20\\,€\\ \\text{por minuto}",
          caption: "Cada minuto de conexión suma un cuadrito más en vertical.",
        },
      ],
    },
    {
      id: "peso-ramon",
      type: "concept",
      title: "Ejemplo: peso y edad",
      content: [
        "Una gráfica edad–peso puede mostrar que Ramón **ganó peso** con la edad, **perdió** un poco entre los 7 y 8 años y **se estabilizó** antes del «estirón» adolescente.",
        "Los **tramos** del dibujo cuentan la historia: subidas, bajadas y tramos planos tienen sentido en el contexto.",
      ],
    },
    {
      id: "desplazamiento",
      type: "concept",
      title: "Distancia y tiempo",
      content: [
        "En gráficas **tiempo–distancia** (ir al colegio, un viaje en coche…), la pendiente indica **velocidad**.",
        "Tramo horizontal: **parado** (distancia constante). Tramo oblicuo hacia arriba: **en movimiento**.",
        "Compara recorridos leyendo distancia inicial, tiempo total y tramos de parada.",
      ],
    },
    {
      id: "check-independiente",
      type: "multiple_choice",
      title: "Variable independiente",
      question: "En un gráfico que relaciona **tiempo** (eje X) y **distancia recorrida** (eje Y), ¿cuál es la variable independiente?",
      options: [
        { id: "a", text: "La distancia" },
        { id: "b", text: "El tiempo" },
        { id: "c", text: "Ninguna: son iguales" },
      ],
      correctOptionId: "b",
      explanation: "Suele tomarse el tiempo como $x$ y la distancia como $y$ dependiente del tiempo transcurrido.",
    },
    {
      id: "check-parada",
      type: "fill_in_blank",
      title: "Tramo horizontal",
      question:
        "En una gráfica distancia–tiempo, un tramo **horizontal** significa que la distancia no cambia: ¿qué está ocurriendo? (una palabra: parado / acelerando / retrocediendo)",
      correctAnswers: ["parado", "parada", "detenido"],
      explanation: "Distancia constante → no hay avance: está parado.",
    },
  ],
};
