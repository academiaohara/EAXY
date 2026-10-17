import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasInformacionPuntosLesson: InteractiveLesson = {
  slug: "tablas-graficas-informacion-puntos",
  title: "2. Información mediante puntos",
  subtitle: TEMA_14_SUBTITLE,
  steps: [
    {
      id: "contexto-real",
      type: "concept",
      title: "Dos variables en un diagrama",
      content: [
        "En un diagrama cartesiano de una **situación real**, cada punto representa un dato.",
        "Las coordenadas son dos **magnitudes** relacionadas: por ejemplo **edad** (eje X) y **estatura** (eje Y) de los miembros de una familia.",
        "Para interpretar el gráfico hay que saber **qué significa cada eje** — no basta con mirar la forma del dibujo.",
      ],
    },
    {
      id: "familia",
      type: "concept",
      title: "Ejemplo: edad y estatura",
      content: [
        "**Bernardo** (el hijo mayor) es el más alto: su punto tiene la **mayor ordenada** (estatura).",
        "**Cristina** y **Flora** miden lo mismo: sus puntos comparten **ordenada**, pero Flora es mayor (mayor **abscisa**).",
        "**David**, el pequeño, tiene la menor estatura y la menor edad: su punto está **más cerca del origen**.",
        "Comparar puntos = comparar las dos magnitudes que representan.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Qué mirar en el gráfico",
          items: [
            { title: "Ordenada", caption: "Mayor → más alto en este ejemplo.", tone: "emerald" },
            { title: "Abscisa", caption: "Mayor → mayor edad.", tone: "cobalt" },
            { title: "Cerca de O", caption: "Valores pequeños en ambos ejes.", tone: "amber" },
          ],
        },
      ],
    },
    {
      id: "vehiculos",
      type: "concept",
      title: "Precio y velocidad",
      content: [
        "Otro diagrama puede tener **precio** en un eje y **velocidad máxima** en el otro.",
        "Un coche **caro y rápido** queda arriba a la derecha; uno **barato y lento**, abajo a la izquierda.",
        "Puedes **situar** un punto nuevo si conoces cómo se compara con los demás (más caro, menos veloz…).",
      ],
    },
    {
      id: "check-ordenada",
      type: "classify",
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
      id: "check-misma-estatura",
      type: "fill_in_blank",
      title: "Misma estatura",
      question:
        "Dos personas con la **misma estatura** tienen la misma coordenada en el eje vertical. ¿Cómo se llama esa coordenada? (una palabra)",
      correctAnswers: ["ordenada", "y"],
      hint: "La coordenada vertical del punto.",
      explanation: "La estatura se representa en el eje Y: comparten **ordenada**.",
    },
  ],
};
