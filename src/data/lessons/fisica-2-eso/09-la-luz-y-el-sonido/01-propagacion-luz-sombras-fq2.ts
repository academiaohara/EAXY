import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const propagacionLuzSombrasFq2Lesson: InteractiveLesson = {
  slug: "propagacion-luz-sombras-fq2",
  title: "1. Propagación de la luz y sombras",
  subtitle: FQ2_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo viaja la luz", [
      { kind: "steps", items: [
        "La **luz** es una forma de energía que se propaga como **onda electromagnética** y **no necesita medio material**: llega del Sol a la Tierra por el vacío.",
        "Se propaga en **línea recta** y en todas direcciones desde el **foco** (Sol, bombilla, llama). Un **rayo** es la línea que representa esa dirección.",
        "Su velocidad en el vacío es de unos **300 000 km/s**: la mayor posible. La luz del Sol tarda unos **8 minutos** en llegar.",
        "Según dejen pasar la luz, los materiales son **transparentes**, **translúcidos** u **opacos**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Sombras", [
      { kind: "text", text: "Mueve el objeto y la pantalla. Observa cómo cambia el tamaño de la sombra." },
    ], tool("fq2-sombras-explorador"), "visual-top"),
    slide("sombra", "Sombra, penumbra y eclipses", [
      { kind: "steps", items: [
        "Un objeto **opaco** detiene los rayos y proyecta una **sombra** detrás de él. Si el foco es **puntual**, la sombra tiene bordes nítidos.",
        "Si el foco es **grande**, aparece también una zona de **penumbra**, donde solo llega parte de la luz.",
        "En un **eclipse de Sol**, la **Luna** se interpone entre el Sol y la Tierra. En un **eclipse de Luna**, es la **Tierra** la que tapa al Sol y proyecta su sombra sobre la Luna.",
      ] },
    ]),
    calc("calc-sombra", "Tamaño de la sombra", "Un foco puntual está a 50 cm de un objeto de 10 cm, y la pantalla está 100 cm detrás del objeto. ¿Qué tamaño tiene la sombra, en cm? (sombra = tamaño · (a + b) / a)", nums(30), "10 · (50 + 100) / 50 = 30 cm.", "Suma las dos distancias y divide entre la del foco."),
    calc("calc-tiempo", "Luz del Sol", "El Sol está a unos 150 000 000 km. La luz va a 300 000 km/s. ¿Cuántos segundos tarda en llegar?", nums(500), "t = d / v = 150 000 000 / 300 000 = 500 s (unos 8 minutos).", "Divide la distancia entre la velocidad."),
    sort("clasifica", "Tipo de material", "Clasifica cada material según la luz que deja pasar.",
      [["tr", "Transparente", "cobalt"], ["tl", "Translúcido", "amber"], ["op", "Opaco", "rose"]],
      [["Un cristal de ventana", "tr"], ["El aire", "tr"], ["Un papel vegetal", "tl"], ["Un cristal esmerilado", "tl"], ["Una pared", "op"], ["Una caja de madera", "op"]],
      "Transparente deja pasar casi toda la luz, translúcido la dispersa, opaco la detiene.",
    ),
    pick("check", "Eclipse de Sol", "¿Qué ocurre en un eclipse de Sol?",
      "La Luna se interpone entre el Sol y la Tierra",
      [["La Tierra se interpone entre el Sol y la Luna", "Eso es un eclipse de Luna."], ["El Sol se apaga unos minutos", "El Sol sigue luciendo."], ["La Luna deja de reflejar luz", "No se trata de eso."]],
      "La sombra de la Luna cae sobre una zona de la Tierra.",
    ),
  ],
};
