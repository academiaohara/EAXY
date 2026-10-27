import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const inteligenciaArtificialAprendizajeTi2Lesson: InteractiveLesson = {
  slug: "inteligencia-artificial-aprendizaje-ti2",
  title: "4. Inteligencia artificial y aprendizaje automático",
  subtitle: TECTI2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Cómo aprende una máquina", [
      { kind: "text", text: "Observa el ciclo de un sistema de aprendizaje automático, desde los datos hasta la evaluación." },
    ], anim("ti2-ciclo-aprendizaje"), "text-top"),
    slide("def", "IA, aprendizaje automático y aprendizaje profundo", [
      { kind: "steps", items: [
        "La **inteligencia artificial (IA)** es la rama de la informática que crea sistemas capaces de realizar tareas que requieren inteligencia: percibir, razonar, decidir, comunicarse.",
        "El **aprendizaje automático** (machine learning) es una forma de hacerlo: el sistema **aprende de ejemplos** en lugar de seguir reglas escritas a mano.",
        "El **aprendizaje profundo** (deep learning) usa **redes neuronales** con muchas capas; es la base de la visión por ordenador, el reconocimiento de voz y los modelos de lenguaje.",
        "Tipos: **supervisado** (datos con respuesta), **no supervisado** (descubre grupos), **por refuerzo** (aprende por prueba, error y recompensa).",
      ] },
    ], undefined, "stack"),
    slide("clas", "Un clasificador sencillo", [
      { kind: "text", text: "Separa dos clases de puntos con una recta. Prueba a mano o pulsa «Entrenar» para que el perceptrón corrija sus pesos." },
    ], tool("ti2-clasificador-explorador"), "visual-top"),
    slide("aplic", "Aplicaciones", [
      { kind: "steps", items: [
        "**Visión**: reconocer objetos, caras, matrículas, defectos en una cadena de producción.",
        "**Lenguaje**: traducción, asistentes, generación de texto.",
        "**Recomendación**: qué serie, canción o producto mostrar.",
        "**Predicción**: mantenimiento de máquinas, consumo de energía, tráfico.",
        "**Robótica y vehículos autónomos**: percibir y decidir en tiempo real.",
      ] },
    ]),
    calc("calc-acc", "Aciertos", "Un clasificador acierta 10 de 12 puntos de ejemplo. ¿Qué porcentaje de aciertos tiene? (redondea a un entero)", nums(83, 83.3), "10 / 12 = 0,833 ≈ 83 %.", "Aciertos entre total."),
    calc("calc-w", "Un paso del perceptrón", "Un perceptrón con w₁ = −0,5 recibe un punto de coordenada x = 6 mal clasificado (error = 1) y una tasa de aprendizaje de 0,1. ¿Cuánto vale el nuevo w₁? (w₁ + 0,1·error·x)", nums(0.1), "−0,5 + 0,1 · 1 · 6 = 0,1.", "Aplica la regla de actualización."),
    calc("calc-prm", "Parámetros", "Una red tiene una capa de 10 entradas conectada a 5 neuronas (cada una con un sesgo). ¿Cuántos parámetros tiene esa capa? (10·5 + 5)", nums(55), "50 pesos más 5 sesgos = 55.", "Pesos más sesgos."),
    sort("clasifica-apr", "¿Qué tipo de aprendizaje?", "Relaciona cada ejemplo con el tipo.",
      [["sup", "Supervisado", "cobalt"], ["nos", "No supervisado", "amber"], ["ref", "Por refuerzo", "emerald"]],
      [["Clasificar correos como spam o no, con ejemplos etiquetados", "sup"], ["Predecir el precio de una vivienda a partir de casos pasados", "sup"], ["Agrupar clientes con hábitos parecidos sin etiquetas", "nos"], ["Detectar patrones en datos sin conocer la respuesta", "nos"], ["Un robot que aprende a caminar por prueba y error", "ref"], ["Un programa que aprende a jugar ganando puntos", "ref"]],
      "Depende de si hay etiquetas, de si no las hay o de si se aprende con recompensas.",
    ),
    pick("check-ml", "Aprender de ejemplos", "¿Qué distingue al aprendizaje automático de la programación tradicional?",
      "Que las reglas no se escriben a mano: se aprenden a partir de datos de ejemplo",
      [["Que no usa ordenador", "Se ejecuta en ordenadores."], ["Que siempre acierta", "Puede equivocarse."], ["Que no necesita datos", "Los datos son imprescindibles."]],
      "Los datos reemplazan a las reglas escritas por el programador.",
    ),
  ],
};
