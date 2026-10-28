import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const conicaSolidosDt2Lesson: InteractiveLesson = {
  slug: "conica-solidos-dt2",
  title: "3. Cónica de sólidos: una casa",
  subtitle: DT2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la planta a la perspectiva", [
      { kind: "steps", items: [
        "En el **sistema cónico** se parte de la **planta** del objeto sobre el plano geometral, el punto de vista y el cuadro.",
        "Se perspectiva cada **vértice** de la base y se levantan las **alturas** reales sobre las perpendiculares a la línea de tierra.",
        "Las rectas **paralelas entre sí** convergen en el mismo **punto de fuga**, sobre la **línea del horizonte**.",
        "Un edificio sencillo se descompone en **prismas**: el cuerpo, el tejado a dos aguas, una chimenea…",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una casa en perspectiva", [
      { kind: "text", text: "Gira la casa, acerca o aleja al observador y sube o baja el horizonte. Mira qué caras se ven." },
    ], tool("dt2-conica-casa-explorador"), "visual-top"),
    slide("tejado", "El tejado", [
      { kind: "steps", items: [
        "El **caballete** es paralelo a los **aleros** de ese lado: comparten el mismo punto de fuga.",
        "Las dos **faldones** (aguas) del tejado son planos inclinados: su **línea de máxima pendiente** es perpendicular al caballete.",
        "El vértice del **hastial** (el triángulo del extremo) está sobre la **vertical** del punto medio del lado: se halla perspectivando ese punto y llevando la altura del caballete.",
        "Para curvas o chimeneas se usan los mismos puntos de fuga y la **división de la perspectiva** de un segmento (proporción perspectiva).",
      ] },
    ]),
    calc("calc-pf", "Punto de fuga", "Una arista horizontal forma 45° con el cuadro y el observador está a 10 cm de él. El punto de fuga está a x = d · dx / dy de la vertical del observador, con dx = dy. ¿Cuánto vale x, en cm?", nums(10), "Con dx = dy, x = d = 10 cm.", "La razón dx/dy es 1."),
    calc("calc-pa", "Fugas", "¿Cuántos puntos de fuga horizontales tiene una caja girada respecto del cuadro (cónica oblicua)?", nums(2), "Dos: uno por cada dirección horizontal de sus aristas.", "Largo y ancho."),
    sort("clasifica", "Elementos", "Asocia cada elemento con su función en el cónico.",
      [["lh", "Línea del horizonte", "cobalt"], ["lt", "Línea de tierra", "amber"], ["pf", "Punto de fuga", "emerald"]],
      [["Está a la altura de los ojos del observador", "lh"], ["Contiene los puntos de fuga de las rectas horizontales", "lh"], ["Intersección del cuadro con el geometral", "lt"], ["Sobre ella se miden las dimensiones reales", "lt"], ["Hacia él convergen las rectas paralelas", "pf"], ["Está sobre la línea del horizonte", "pf"]],
      "El horizonte es la altura de los ojos; la LT, la base del cuadro; los puntos de fuga, donde convergen las paralelas.",
    ),
    pick("check", "Horizonte alto", "Si subes la línea del horizonte por encima del tejado, ¿qué verás?",
      "El tejado desde arriba",
      [["El tejado desde abajo", "Ocurre al bajar el horizonte."], ["Solo la fachada", "También se ven las aguas."], ["Nada cambia", "Cambia el punto de vista."]],
      "Con el horizonte alto, el observador está por encima y ve la cubierta.",
    ),
  ],
};
