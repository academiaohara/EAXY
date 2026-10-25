import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const cienciaTecnicaTecnologiaIngenieriaLesson: InteractiveLesson = {
  slug: "ciencia-tecnica-tecnologia-ingenieria",
  title: "3. Ciencia, técnica, tecnología e ingeniería",
  subtitle: TECESO1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("cuatro", "Cuatro conceptos que se relacionan", [
      { kind: "steps", items: [
        "**Ciencia**: estudia la naturaleza para entender **por qué** ocurren las cosas.",
        "**Técnica**: conjunto de procedimientos y habilidades para **hacer** algo (tejer, forjar, soldar).",
        "**Tecnología**: aplica ciencia y técnica para **resolver necesidades** con objetos, procesos o servicios.",
        "**Ingeniería**: profesión que **diseña, calcula y dirige** la construcción de soluciones tecnológicas.",
      ] },
    ], undefined, "stack"),
    slide("puente", "El ejemplo del puente", [
      { kind: "text", text: "Un puente reúne los cuatro conceptos. Mira cómo se reparte cada uno en un mismo proyecto." },
    ], anim("ciencia-tecnica-tecnologia"), "split"),
    slide("diferencias", "Ciencia frente a tecnología", [
      { kind: "compare",
        left: { title: "Ciencia", text: "Su objetivo es **conocer**. Formula preguntas y comprueba hipótesis. Ejemplo: descubrir cómo se transmite la electricidad.", tone: "info" },
        right: { title: "Tecnología", text: "Su objetivo es **resolver**. Crea soluciones para necesidades. Ejemplo: diseñar una linterna con esa electricidad.", tone: "key" } },
      { kind: "warning", title: "Ojo", text: "Las dos se alimentan entre sí: la ciencia ofrece conocimientos a la tecnología, y la tecnología construye instrumentos (microscopios, telescopios) que permiten avanzar a la ciencia." },
    ]),
    sort("clasifica-actividad", "¿Ciencia, técnica o tecnología?", "Clasifica cada actividad según su objetivo principal.",
      [["cie", "Ciencia", "cobalt"], ["tec", "Técnica", "amber"], ["tnl", "Tecnología", "emerald"]],
      [["Descubrir por qué flota el hielo", "cie"], ["Medir la velocidad del sonido", "cie"], ["Soldar dos tubos con estaño", "tec"], ["Tejer una cesta de mimbre", "tec"], ["Diseñar un purificador de agua para una aldea", "tnl"], ["Fabricar un brazo ortopédico impreso en 3D", "tnl"]],
      "La ciencia busca explicar; la técnica es el saber hacer; la tecnología usa ambas para resolver una necesidad concreta.",
    ),
    pick("check-ing", "¿Qué hace un ingeniero?", "¿Qué tarea es propia de la ingeniería?",
      "Calcular y diseñar cómo construir un puente seguro",
      [["Observar estrellas para descubrir leyes del universo", "Es una tarea propia de la ciencia (astronomía)."], ["Tejer a mano una cesta tradicional", "Es una técnica artesanal."], ["Pintar un cuadro", "Es arte, no ingeniería."]],
      "La ingeniería aplica conocimientos para diseñar, calcular y construir soluciones.",
    ),
    pick("check-tecnica", "Técnica sin ciencia", "Los antiguos romanos construían acueductos muy duraderos sin conocer las leyes modernas de la hidráulica. ¿Qué demuestra?",
      "Que la técnica puede existir antes de la explicación científica",
      [["Que no necesitaban técnica", "Hacía falta mucha técnica para tallar y colocar las piedras."], ["Que la ciencia no sirve para nada", "La ciencia moderna permite diseñar con más seguridad y menos material."], ["Que fueron los primeros ingenieros del mundo", "Hubo constructores antes; lo importante es que la técnica avanzó con la práctica."]],
      "Las personas dominaron muchas técnicas por ensayo y error antes de entender científicamente por qué funcionaban.",
    ),
  ],
};
