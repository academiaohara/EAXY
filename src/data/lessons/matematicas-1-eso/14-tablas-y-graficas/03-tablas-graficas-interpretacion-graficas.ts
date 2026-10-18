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
      help: [
        {
          label: "¿Cuál es la independiente?",
          message: "La que tú eliges o avanza sola, como el tiempo. La otra reacciona a ella.",
        },
        {
          label: "«$y$ es función de $x$»",
          message: "Quiere decir que para cada valor de $x$ hay un único valor de $y$.",
        },
        {
          label: "Un ejemplo",
          message: "El coste de una llamada depende de los minutos que hables: minutos es $x$, coste es $y$.",
        },
      ],
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
      help: [
        {
          label: "De izquierda a derecha",
          message: "Imagina el tiempo pasando: ¿la línea sube, baja o se queda plana?",
        },
        {
          label: "Antes de describir",
          message: "Fíjate en las unidades de cada eje. Una subida de «5» no significa nada hasta que sabes si son minutos o euros.",
        },
      ],
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
      help: [
        {
          label: "¿Qué es la cuota de establecimiento?",
          message: "Un coste fijo que pagas al empezar la llamada, aunque aún no hayas hablado. Por eso la gráfica no parte de cero.",
        },
        {
          label: "Cómo leer la escala",
          message: "Mira cuánto vale un cuadrito en cada eje. Sin la escala, las alturas no significan nada.",
        },
        {
          label: "Un coste fijo más uno variable",
          message: "El precio total es la cuota inicial más lo que se suma cada minuto.",
        },
      ],
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
      help: [
        {
          label: "La gráfica cuenta una historia",
          message: "Una subida es ganar peso, una bajada es perderlo y un tramo plano es estar estable.",
        },
        {
          label: "Relaciónalo con la vida real",
          message: "Pregúntate por qué podría haber pasado: ¿una enfermedad?, ¿el crecimiento?",
        },
      ],
      title: "Ejemplo: peso y edad",
      content: [
        "Una gráfica edad–peso puede mostrar que Ramón **ganó peso** con la edad, **perdió** un poco entre los 7 y 8 años y **se estabilizó** antes del «estirón» adolescente.",
        "Los **tramos** del dibujo cuentan la historia: subidas, bajadas y tramos planos tienen sentido en el contexto.",
      ],
    },
    {
      id: "desplazamiento",
      type: "concept",
      help: [
        {
          label: "Tramos y movimiento",
          message: "Línea que sube: te mueves. Línea plana: estás parado. Línea que baja: vuelves hacia atrás.",
        },
        {
          label: "¿Qué es la pendiente?",
          message: "Cuánto sube la distancia por cada unidad de tiempo: es la velocidad. Más inclinada, más rápido.",
        },
      ],
      title: "Distancia y tiempo",
      content: [
        "En gráficas **tiempo–distancia** (ir al colegio, un viaje en coche…), la pendiente indica **velocidad**.",
        "Tramo horizontal: **parado** (distancia constante). Tramo oblicuo hacia arriba: **en movimiento**.",
        "Compara recorridos leyendo distancia inicial, tiempo total y tramos de parada.",
      ],
    },
    {
      id: "check-independiente",
      type: "classify",
      help: [
        {
          label: "¿Cuál depende de cuál?",
          message: "Pregúntate qué magnitud cambia cuando se mueve la otra. Esa es la dependiente.",
        },
        {
          label: "Pruébalo con una frase",
          message: "Di «el precio depende de los kilos» y «los kilos dependen del precio». ¿Cuál suena natural?",
        },
        {
          label: "El tiempo",
          message: "El tiempo suele ser la variable independiente: avanza solo, no depende de nada.",
        },
      ],
      title: "Variable independiente",
      question:
        "En cada gráfico, la primera magnitud va en el eje X y la segunda en el eje Y. Clasifica cada magnitud como variable independiente o dependiente.",
      groups: [
        { id: "independiente", label: "Independiente (eje X)", tone: "cobalt" },
        { id: "dependiente", label: "Dependiente (eje Y)", tone: "amber" },
      ],
      items: [
        { id: "t", text: "Tiempo, en un gráfico tiempo–distancia recorrida", group: "independiente" },
        { id: "d", text: "Distancia recorrida, en un gráfico tiempo–distancia recorrida", group: "dependiente" },
        { id: "e", text: "Edad, en un gráfico edad–estatura", group: "independiente" },
        { id: "h", text: "Estatura, en un gráfico edad–estatura", group: "dependiente" },
        { id: "k", text: "Kilos de fruta, en un gráfico kilos–precio", group: "independiente" },
        { id: "p", text: "Precio a pagar, en un gráfico kilos–precio", group: "dependiente" },
      ],
      hint: "La variable dependiente es la que cambia **en función de** la otra.",
      explanation:
        "Suele tomarse el tiempo como $x$ y la distancia como $y$ dependiente del tiempo transcurrido. Igual ocurre con la estatura (depende de la edad) y el precio (depende de los kilos).",
    },
    {
      id: "check-parada",
      type: "fill_in_blank",
      help: [
        {
          label: "Lee la gráfica",
          message: "Avanza hacia la derecha: pasa el tiempo. Si la línea no sube ni baja, la distancia no cambia.",
        },
        {
          label: "Imagínalo",
          message: "Si te mueves, tu distancia al punto de partida cambia. Si no cambia mientras pasa el tiempo, ¿qué estás haciendo?",
        },
      ],
      title: "Tramo horizontal",
      question:
        "En una gráfica distancia–tiempo, un tramo **horizontal** significa que la distancia no cambia: ¿qué está ocurriendo? (una palabra: parado / acelerando / retrocediendo)",
      correctAnswers: ["parado", "parada", "detenido"],
      explanation: "Distancia constante → no hay avance: está parado.",
    },
  ],
};
