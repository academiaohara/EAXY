import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasInterpretacionGraficasLesson: InteractiveLesson = {
  slug: "tablas-graficas-interpretacion-graficas",
  title: "3. Interpretación de gráficas",
  subtitle: TEMA_14_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "variables-funcion",
      type: "slide",
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
      blocks: [
        {
          kind: "definition",
          text: "Las **gráficas** describen relaciones entre **dos variables**. La variable $y$ es **función** de la variable $x$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "x", label: "eje horizontal: variable independiente" },
            { tex: "y", label: "eje vertical: variable dependiente" },
          ],
        },
        {
          kind: "text",
          text: "Se interpreta **de izquierda a derecha**: ¿cómo varía $y$ cuando aumenta $x$?",
        },
      ],
      visual: { kind: "anim", scene: "grafica-tramos", beatMs: 3500 },
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
      id: "llamadas",
      type: "slide",
      help: [
        {
          label: "¿Qué es la cuota de establecimiento?",
          message: "Un coste fijo que pagas al empezar la llamada, aunque aún no hayas hablado. Por eso la gráfica no parte de cero.",
        },
        {
          label: "Cómo leer la escala",
          message: "Mira cuánto vale un cuadrito en cada eje. Sin la escala, las alturas no significan nada.",
        },
      ],
      title: "Ejemplo: coste de una llamada",
      blocks: [
        {
          kind: "text",
          text: "Antes de describir una gráfica, identifica las **unidades** y la **escala** de cada eje.",
        },
        {
          kind: "example",
          title: "Coste de una llamada",
          lines: [
            { math: "y(0) = 0{,}40\\ €", note: "cuota fija al descolgar" },
            { math: "y(4) = 0{,}40 + 4 \\cdot 0{,}20 = 1{,}20\\ €", note: "0,20 € más por minuto" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "grafica-llamadas", beatMs: 3500 },
    },
    {
      id: "historia-graficas",
      type: "slide",
      help: [
        {
          label: "La gráfica cuenta una historia",
          message: "Una subida es ganar peso, una bajada es perderlo y un tramo plano es estar estable.",
        },
        {
          label: "¿Qué es la pendiente?",
          message: "Cuánto sube la distancia por cada unidad de tiempo: es la velocidad. Más inclinada, más rápido.",
        },
      ],
      title: "Los tramos cuentan una historia",
      blocks: [
        {
          kind: "steps",
          title: "En una gráfica tiempo–distancia",
          items: [
            "Tramo **oblicuo hacia arriba**: te estás moviendo; cuanto más inclinado, más deprisa.",
            "Tramo **horizontal**: la distancia no cambia, estás parado.",
            "Tramo **hacia abajo**: vuelves hacia atrás.",
          ],
        },
        {
          kind: "text",
          text: "En una gráfica edad–peso, las subidas son ganar peso, las bajadas perderlo y los tramos planos, estabilidad. Interpreta cada tramo en su contexto.",
        },
      ],
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
    {
      id: "ciclista",
      type: "predict",
      help: [
        {
          label: "Mira la inclinación",
          message: "Cuanto más empinado el tramo, más distancia se recorre en el mismo tiempo.",
        },
        {
          label: "Compara dos tramos",
          message: "Si dos tramos duran lo mismo, gana el que sube más en el eje vertical.",
        },
      ],
      title: "Una ruta en bici",
      question:
        "En la gráfica distancia–tiempo de una ruta en bici hay un primer tramo que sube poco a poco y un segundo tramo, de la misma duración, mucho más empinado. ¿Qué ocurrió?",
      mode: "choice",
      choices: [
        { id: "a", label: "En el segundo tramo fue más deprisa que en el primero" },
        {
          id: "b",
          label: "En el segundo tramo estuvo parado",
          incorrectFeedback: "Estar parado se ve como un tramo **horizontal**. Aquí el tramo sube, y muy deprisa.",
        },
        {
          id: "c",
          label: "En el segundo tramo volvió hacia el punto de partida",
          incorrectFeedback: "Volver al inicio se ve como un tramo que **baja**. Este tramo sube: se sigue alejando.",
        },
        {
          id: "d",
          label: "En los dos tramos fue a la misma velocidad",
          incorrectFeedback: "Con la misma duración, un tramo más empinado cubre más distancia: la velocidad es mayor.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La pendiente indica la velocidad: en el mismo tiempo, el tramo más empinado recorre más distancia.",
    },
  ],
};
