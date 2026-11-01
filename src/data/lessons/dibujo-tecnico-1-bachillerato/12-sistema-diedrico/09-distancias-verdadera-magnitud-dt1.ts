import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const distanciasVerdaderaMagnitudDt1Lesson: InteractiveLesson = {
  slug: "distancias-verdadera-magnitud-dt1",
  title: "9. Distancias y verdadera magnitud",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("def", "Medir en el espacio", [
      { kind: "steps", items: [
        "En una épura, **una distancia casi nunca se ve en verdadera magnitud**: solo cuando el segmento es **paralelo** a un plano de proyección.",
        "Para medirla hay que **colocar** el segmento en una de esas posiciones, o construir un **triángulo rectángulo** con la información que sí se ve.",
        "**Distancia entre dos puntos** = verdadera magnitud del segmento que los une.",
        "Las demás distancias (**punto–recta**, **punto–plano**, **entre rectas**) se reducen a esta usando perpendiculares.",
      ] },
    ], undefined, "stack"),
    slide("triangulo", "El triángulo de la verdadera magnitud", [
      { kind: "text", text: "Mueve B. Los catetos son la proyección horizontal ab y la diferencia de cotas; la hipotenusa es la distancia real." },
    ], tool("dt1-distancia-verdadera-explorador"), "visual-top"),
    slide("metodos", "Otros métodos (Dibujo Técnico II)", [
      { kind: "steps", items: [
        "**Giro**: se hace girar el segmento alrededor de un eje vertical hasta ponerlo paralelo al PV.",
        "**Cambio de plano**: se introduce un nuevo plano de proyección paralelo al segmento.",
        "**Abatimiento**: se abate el plano que contiene al elemento sobre un plano de proyección.",
        "Los tres dan la **misma** verdadera magnitud; la elección depende de lo que sea más cómodo trazar.",
      ] },
    ]),
    calc("calc-vm1", "Verdadera magnitud", "Un segmento tiene proyección horizontal de 5 cm y los extremos con cotas 1 y 5 cm. ¿Cuánto mide el segmento real, en cm? (dos decimales)", nums(6.4, 6.4031, 6.40), "√(5² + 4²) = √41 ≈ 6,40 cm.", "Pitágoras con 5 y 4."),
    calc("calc-vm2", "Un caso exacto", "Con proyección horizontal de 3 cm y diferencia de cotas de 4 cm, ¿cuánto mide el segmento, en cm?", nums(5), "√(9 + 16) = 5 cm.", "La terna 3-4-5."),
    calc("calc-inc", "Inclinación", "En ese segmento (cateto horizontal 3 cm y vertical 4 cm), ¿qué ángulo forma con el PH, en grados? (un decimal)", nums(53.1, 53.13), "arctg(4/3) ≈ 53,1°.", "tg θ = 4/3."),
    sort("clasifica-dist", "¿Cómo se ve la distancia?", "Clasifica cada segmento según se vea en verdadera magnitud.",
      [["vm", "En verdadera magnitud", "cobalt"], ["no", "Hay que construirla", "amber"]],
      [["Una recta horizontal: su proyección horizontal", "vm"], ["Una recta frontal: su proyección vertical", "vm"], ["Una recta vertical: su proyección vertical", "vm"], ["Una recta oblicua en cualquiera de sus proyecciones", "no"], ["Una recta de perfil en cualquiera de sus proyecciones", "no"]],
      "La proyección es real si el segmento es paralelo al plano sobre el que se proyecta.",
    ),
    pick("check-hipo", "Los catetos", "Para hallar la distancia entre dos puntos en la épura, ¿qué catetos se usan en el triángulo rectángulo?",
      "La proyección horizontal del segmento y la diferencia de cotas",
      [["Las dos proyecciones del segmento", "Se necesita la diferencia de cotas, no la otra proyección."], ["La traza horizontal y la vertical", "No determinan la distancia."], ["La LT y la cota", "La LT no es un cateto."]],
      "Un cateto está en el PH (ab) y el otro es perpendicular a él (Δcota).",
    ),
  ],
};
