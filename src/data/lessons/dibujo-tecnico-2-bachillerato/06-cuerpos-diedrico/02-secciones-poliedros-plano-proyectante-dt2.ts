import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seccionesPoliedrosPlanoProyectanteDt2Lesson: InteractiveLesson = {
  slug: "secciones-poliedros-plano-proyectante-dt2",
  title: "2. Secciones planas de poliedros",
  subtitle: DT2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cortar un sólido con un plano", [
      { kind: "steps", items: [
        "La **sección plana** de un poliedro es el polígono en que un plano corta sus caras. Sus **vértices** son los puntos donde el plano corta las **aristas**.",
        "Si el plano es **proyectante** (perpendicular a un plano de proyección), en esa proyección se ve como **una recta** y los puntos de corte se leen directamente.",
        "Los demás puntos se obtienen proyectándolos hasta las aristas en la otra vista.",
        "La **verdadera forma** de la sección se obtiene por **abatimiento** (o cambio de plano).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Corte de un prisma", [
      { kind: "text", text: "Cambia la inclinación del plano y el número de lados. Mira la sección en planta y su verdadera forma." },
    ], tool("dt2-seccion-prisma-explorador"), "visual-top"),
    slide("pasos", "Procedimiento", [
      { kind: "steps", items: [
        "Se dibujan las **dos proyecciones** del sólido y la **traza** del plano proyectante.",
        "Los puntos donde la traza corta las proyecciones de las **aristas** son los **vértices** de la sección en esa vista.",
        "Se **bajan** esos puntos a la otra proyección sobre las mismas aristas.",
        "Se **unen** los puntos en orden, por las caras que comparten, y se marca lo oculto.",
        "Se **abate** el plano para dibujar la sección **en verdadera forma**.",
      ] },
    ]),
    slide("pirámide", "En una pirámide", [
      { kind: "steps", items: [
        "El procedimiento es el mismo, pero la planta de la sección **no** coincide con la base: los puntos se desplazan sobre las **aristas inclinadas**.",
        "Si el plano pasa por el **vértice**, la sección es un **triángulo**.",
        "Si el plano es **paralelo a la base**, la sección es un polígono **semejante** a ella: se obtiene por **homotecia** desde el vértice.",
      ] },
    ]),
    calc("calc-area", "Área real", "El área de la base de un prisma recto es 12 cm². Un plano proyectante lo corta con una inclinación de 60° respecto del PH. ¿Qué área real tiene la sección, base / cos α, en cm²?", nums(24), "12 / cos 60° = 12 / 0,5 = 24 cm².", "cos 60° = 0,5."),
    calc("calc-vert", "Puntos de la sección", "Un plano z = 2 + tg α · x con α = 30° corta una arista vertical situada en x = 2. ¿A qué cota corta, en cm? (dos decimales)", nums(3.15, 3.155), "z = 2 + 0,577·2 ≈ 3,15 cm.", "tg 30° ≈ 0,577."),
    sort("clasifica", "Plano de corte", "Clasifica cada propiedad según el tipo de plano de corte.",
      [["pro", "Plano proyectante", "cobalt"], ["par", "Plano paralelo a la base", "amber"]],
      [["En una vista se ve como una recta", "pro"], ["Se lee la sección directamente en esa vista", "pro"], ["Su verdadera forma se halla abatiendo", "pro"], ["La sección es semejante a la base", "par"], ["Se obtiene por homotecia desde el vértice", "par"], ["En el alzado es una horizontal", "par"]],
      "El proyectante se ve de canto; el paralelo a la base da una figura semejante.",
    ),
    pick("check", "Prisma vertical", "En un prisma recto vertical cortado por un plano proyectante, ¿cómo es la planta de la sección?",
      "Coincide con la base",
      [["Es siempre un triángulo", "Depende de la base."], ["Es un segmento", "Eso es el alzado."], ["Es mayor que la base", "No."]],
      "Las aristas son verticales y se proyectan como puntos de la base.",
    ),
  ],
};
