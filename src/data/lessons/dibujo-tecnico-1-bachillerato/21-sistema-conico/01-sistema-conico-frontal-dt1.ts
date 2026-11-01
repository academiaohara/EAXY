import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sistemaConicoFrontalDt1Lesson: InteractiveLesson = {
  slug: "sistema-conico-frontal-dt1",
  title: "1. Sistema cónico: fundamentos y perspectiva frontal",
  subtitle: DT1_SUBTITLES[21],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ver como ve el ojo", [
      { kind: "steps", items: [
        "El **sistema cónico** proyecta desde un **centro de proyección propio**, el **punto de vista V** (el ojo del observador). Los rayos forman un **cono**.",
        "Elementos: el **plano del cuadro (PC)**, donde se dibuja; el **plano geometral (PG)**, horizontal, donde se apoya el objeto; la **línea de tierra (LT)**, su intersección.",
        "El **plano del horizonte** pasa por V y es horizontal; corta al cuadro en la **línea del horizonte (LH)**, a la altura de los ojos.",
        "La proyección de V sobre el cuadro es el **punto principal P**, y la distancia de V al cuadro, la **distancia principal d**.",
      ] },
    ], undefined, "stack"),
    slide("traza", "Perspectiva frontal", [
      { kind: "text", text: "Una cara paralela al cuadro, en verdadera forma, y las aristas de fondo fugando a un único punto." },
    ], anim("dt1-perspectiva-frontal"), "visual-top"),
    slide("explora", "Mueve al observador", [
      { kind: "text", text: "Acerca y aleja al observador y sube o baja el horizonte. Observa qué caras se ven." },
    ], tool("dt1-perspectiva-conica-explorador"), "visual-top"),
    slide("reglas", "Reglas de la perspectiva", [
      { kind: "steps", items: [
        "Las rectas **paralelas al cuadro** se dibujan **paralelas** (y en verdadera forma si están en un plano paralelo al cuadro).",
        "Las rectas **no paralelas al cuadro**, si son paralelas entre sí, **convergen en un punto de fuga** de la LH.",
        "Las rectas **perpendiculares al cuadro** fugan al **punto principal P**.",
        "Cuanto **más lejos** está el objeto, **más pequeño** se ve: la reducción es $\\dfrac{d}{d + y}$.",
      ] },
    ]),
    calc("calc-red", "Reducción", "El observador está a d = 10 cm del cuadro. Un punto situado a 10 cm por detrás del cuadro, ¿qué factor de reducción tiene? (d/(d + y))", nums(0.5), "10/(10 + 10) = 0,5.", "Divide d entre d + y."),
    calc("calc-x", "Posición lateral", "Con ese factor, un punto de x = 6 cm, ¿en qué x′ se proyecta sobre el cuadro, en cm?", nums(3), "x′ = 6 · 0,5 = 3 cm.", "Multiplica por el factor."),
    calc("calc-z", "Altura", "El ojo está a h = 2 cm sobre el geometral. Un punto del geometral (z = 0) a 10 cm por detrás del cuadro se proyecta a z′ = h + (z − h)·0,5. ¿Cuánto vale z′, en cm?", nums(1), "z′ = 2 + (0 − 2)·0,5 = 1 cm: sube hacia el horizonte.", "El punto se acerca a la línea del horizonte."),
    sort("clasifica-conico", "¿Qué elemento es?", "Asocia cada descripción con el elemento del sistema cónico.",
      [["lh", "Línea del horizonte", "cobalt"], ["lt", "Línea de tierra", "amber"], ["p", "Punto principal", "emerald"], ["v", "Punto de vista", "rose"]],
      [["Está a la altura de los ojos del observador", "lh"], ["Corte del plano horizontal del observador con el cuadro", "lh"], ["Corte del geometral con el cuadro", "lt"], ["Donde se apoya el dibujo", "lt"], ["Proyección del punto de vista sobre el cuadro", "p"], ["Punto de fuga de las rectas perpendiculares al cuadro", "p"], ["El ojo del observador", "v"]],
      "Cada elemento tiene su plano de referencia.",
    ),
    pick("check-fuga", "Líneas de fuga", "¿Qué ocurre con las aristas perpendiculares al cuadro en una perspectiva frontal?",
      "Convergen en el punto principal P de la línea del horizonte",
      [["Se dibujan paralelas", "Solo las paralelas al cuadro."], ["Convergen en la línea de tierra", "Fugan sobre el horizonte."], ["Se dibujan en verdadera magnitud", "Se reducen con la distancia."]],
      "El punto de fuga de las rectas perpendiculares al cuadro es la proyección del ojo: el punto principal.",
    ),
  ],
};
