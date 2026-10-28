import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const axonometriaSolidosDt2Lesson: InteractiveLesson = {
  slug: "axonometria-solidos-dt2",
  title: "1. Axonometría ortogonal de sólidos",
  subtitle: DT2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "De los puntos al sólido", [
      { kind: "steps", items: [
        "Un sólido se dibuja en axonometría **llevando las coordenadas** de cada vértice sobre los ejes (con los coeficientes de reducción) y **uniendo** los vértices.",
        "Se parte de la **base** (en el plano XY), se levantan las **aristas laterales** paralelas al eje Z y se cierra la figura.",
        "En **isométrica** los tres coeficientes son iguales: los ejes forman **120°** y se suele dibujar a **escala 1** (sin reducir).",
        "Hay que distinguir las **aristas vistas** (trazo continuo) de las **ocultas** (discontinuo).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prisma y pirámide en isométrica", [
      { kind: "text", text: "Cambia el sólido, los lados y la altura. Observa qué caras ves y qué aristas quedan ocultas." },
    ], tool("dt2-solido-isometrico-explorador"), "visual-top"),
    slide("visibilidad", "Qué se ve y qué no", [
      { kind: "steps", items: [
        "El observador mira desde la **parte positiva de los tres ejes**: se ve la **cara superior** y las caras laterales que miran hacia él.",
        "Una **arista** es visible si pertenece a **al menos una cara visible**.",
        "Las aristas de la **base** que quedan detrás son **ocultas**, y también las aristas verticales o al vértice entre dos caras ocultas.",
        "La **circunferencia** de la base se dibuja como una **elipse** (en isométrica, de eje mayor 1,22 D a escala 1).",
      ] },
    ]),
    calc("calc-amp", "Dibujo a escala 1", "El coeficiente de reducción de la isométrica es 0,816. ¿Por cuánto queda ampliado un dibujo a escala 1 respecto de la proyección real? (dos decimales)", nums(1.22, 1.2247), "1 / 0,816 ≈ 1,22.", "Divide 1 entre el coeficiente."),
    calc("calc-ang", "Ángulo entre ejes", "En isométrica, ¿qué ángulo forman entre sí los ejes en el dibujo, en grados?", nums(120), "Los tres ejes se reparten el giro completo: 360 / 3 = 120°.", "Son tres ejes iguales."),
    sort("clasifica", "Aristas en isométrica", "Clasifica cada arista de un prisma hexagonal según se vea o esté oculta, desde el observador isométrico.",
      [["vis", "Vista (continua)", "cobalt"], ["ocu", "Oculta (discontinua)", "amber"]],
      [["Arista de la tapa superior", "vis"], ["Arista vertical entre dos caras visibles", "vis"], ["Arista de la base en una cara visible", "vis"], ["Arista de la base del lado opuesto al observador", "ocu"], ["Arista vertical entre dos caras traseras", "ocu"], ["Arista de la base trasera de la pirámide", "ocu"]],
      "Es visible la arista que toca alguna cara visible.",
    ),
    pick("check", "Isométrica", "En una axonometría isométrica ortogonal, ¿cómo son los coeficientes de reducción de los tres ejes?",
      "Iguales entre sí",
      [["Distintos entre sí", "Eso sería trimetría."], ["Dos iguales y uno distinto", "Eso sería dimetría."], ["Todos 1", "Solo al dibujar a escala 1."]],
      "En la isométrica los tres coeficientes valen √(2/3) ≈ 0,816.",
    ),
  ],
};
