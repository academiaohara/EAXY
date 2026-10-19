import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasInformacionPuntosLesson: InteractiveLesson = {
  slug: "tablas-graficas-informacion-puntos",
  title: "2. Información mediante puntos",
  subtitle: TEMA_14_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "contexto-real",
      type: "slide",
      help: [
        {
          label: "¿Qué representa un punto?",
          message: "Un individuo con dos medidas a la vez: su edad y su estatura, por ejemplo.",
        },
        {
          label: "No basta mirar la forma",
          message: "Antes de interpretar, lee qué magnitud va en cada eje.",
        },
      ],
      title: "Dos variables en un diagrama",
      blocks: [
        {
          kind: "definition",
          text: "En un diagrama cartesiano de una **situación real**, cada punto representa un dato y sus coordenadas son dos **magnitudes** relacionadas.",
        },
        {
          kind: "warning",
          text: "Para interpretar el gráfico hay que saber **qué mide cada eje**: no basta con mirar la forma del dibujo.",
        },
      ],
    },
    {
      id: "familia",
      type: "slide",
      help: [
        {
          label: "Comparar puntos",
          message: "Más alto es más arriba. Mayor es más a la derecha.",
        },
        {
          label: "Dos puntos a la misma altura",
          message: "Si están a la misma altura tienen la misma estatura. Se diferencian por la edad.",
        },
      ],
      title: "Ejemplo: edad y estatura",
      blocks: [
        {
          kind: "steps",
          title: "Qué mirar",
          items: [
            "**Ordenada** (vertical): la estatura. Más arriba, más alto.",
            "**Abscisa** (horizontal): la edad. Más a la derecha, mayor.",
            "Cerca del origen: valores pequeños en los dos ejes.",
          ],
        },
        {
          kind: "text",
          text: "Comparar puntos es comparar las dos magnitudes que representan.",
        },
      ],
      visual: { kind: "anim", scene: "diagrama-puntos", beatMs: 3500 },
    },
    {
      id: "check-ordenada",
      type: "classify",
      help: [
        {
          label: "¿Qué va en cada eje?",
          message: "Lee los ejes del enunciado: la edad en el eje X (horizontal) y la estatura en el eje Y (vertical).",
        },
        {
          label: "Una pregunta, una coordenada",
          message: "Si preguntan por la altura de alguien, mira cuán arriba está su punto. Si preguntan por la edad, mira cuán a la derecha.",
        },
      ],
      title: "Interpretar la ordenada",
      question:
        "En el gráfico de la familia, la **edad** va en el eje X y la **estatura** en el eje Y. ¿Qué coordenada hay que mirar para responder a cada pregunta?",
      groups: [
        { id: "abscisa", label: "La abscisa (edad)", tone: "cobalt" },
        { id: "ordenada", label: "La ordenada (estatura)", tone: "emerald" },
      ],
      items: [
        { id: "alto", text: "¿Quién es la persona más alta?", group: "ordenada" },
        { id: "bajo", text: "¿Quién es la persona más baja?", group: "ordenada" },
        { id: "supera", text: "¿Mide Bernardo más que Flora?", group: "ordenada" },
        { id: "mayor", text: "¿Quién es la persona de mayor edad?", group: "abscisa" },
        { id: "joven", text: "¿Quién es la más joven?", group: "abscisa" },
        { id: "misma-edad", text: "¿Tienen dos personas la misma edad?", group: "abscisa" },
      ],
      hint: "La ordenada es la coordenada vertical; la abscisa, la horizontal. ¿Qué magnitud va en cada eje?",
      explanation:
        "La ordenada corresponde a la estatura en ese diagrama: la mayor ordenada es la persona más alta. Las preguntas sobre la edad se responden con la abscisa.",
    },
    {
      id: "vehiculos",
      type: "slide",
      help: [
        {
          label: "Leer una esquina",
          message: "Arriba a la derecha: caro y rápido. Abajo a la izquierda: barato y lento.",
        },
        {
          label: "Colocar un punto nuevo",
          message: "Compáralo con los que ya están: ¿más caro?, ¿más rápido? Eso decide hacia dónde moverlo.",
        },
      ],
      title: "Precio y velocidad",
      blocks: [
        {
          kind: "compare",
          left: { title: "Arriba a la derecha", text: "Caro y rápido: precio alto y velocidad máxima alta.", tone: "info" },
          right: { title: "Abajo a la izquierda", text: "Barato y lento: precio bajo y velocidad máxima baja.", tone: "ok" },
        },
        {
          kind: "text",
          text: "Con **precio** en el eje X y **velocidad máxima** en el eje Y, puedes **situar** un punto nuevo si sabes cómo se compara con los demás.",
        },
      ],
    },
    {
      id: "check-misma-estatura",
      type: "fill_in_blank",
      help: [
        {
          label: "Misma estatura, misma altura en el gráfico",
          message: "Dos puntos que representan la misma estatura están al mismo nivel vertical. ¿Qué coordenada mide la altura de un punto?",
        },
        {
          label: "Nombres de las coordenadas",
          message: "A la horizontal se le llama abscisa. La vertical tiene otro nombre distinto.",
        },
      ],
      title: "Misma estatura",
      question:
        "Dos personas con la **misma estatura** tienen la misma coordenada en el eje vertical. ¿Cómo se llama esa coordenada? (una palabra)",
      correctAnswers: ["ordenada", "y"],
      hint: "La coordenada vertical del punto.",
      explanation: "La estatura se representa en el eje Y: comparten **ordenada**.",
    },
    {
      id: "moto-nueva",
      type: "predict",
      help: [
        {
          label: "Compara con los demás",
          message: "Un punto más a la derecha es más caro; uno más arriba es más rápido.",
        },
        {
          label: "Un eje cada vez",
          message: "Decide primero hacia dónde se mueve en horizontal (precio) y luego en vertical (velocidad).",
        },
      ],
      title: "Una moto nueva",
      question:
        "En un diagrama con el precio en el eje horizontal y la velocidad máxima en el vertical, se quiere marcar una moto más barata que todas las demás, pero más rápida que la mayoría. ¿Dónde irá su punto?",
      mode: "choice",
      choices: [
        { id: "a", label: "A la izquierda de todos los puntos y bastante alto" },
        {
          id: "b",
          label: "A la derecha de todos los puntos y bastante alto",
          incorrectFeedback: "A la derecha están los más **caros**. La moto es la más barata: su punto va a la izquierda.",
        },
        {
          id: "c",
          label: "A la izquierda de todos los puntos y bastante bajo",
          incorrectFeedback: "Bajo significa poca velocidad. La moto es más rápida que la mayoría, así que va **alta**.",
        },
        {
          id: "d",
          label: "Justo en el origen",
          incorrectFeedback: "El origen sería precio $0$ y velocidad $0$: ni cuesta nada ni se mueve. No tiene sentido para una moto.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Barata → pequeña abscisa (a la izquierda); rápida → gran ordenada (arriba).",
    },
  ],
};
