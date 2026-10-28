import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const espiralesEvolventeDt1Lesson: InteractiveLesson = {
  slug: "espirales-evolvente-dt1",
  title: "5. Espirales, volutas y evolvente",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Curvas abiertas de curvatura creciente", [
      { kind: "steps", items: [
        "Una **espiral** es una curva abierta que se aleja de un punto con radio creciente. Las **espirales técnicas** se trazan con **arcos de circunferencia** tangentes.",
        "**Espiral de dos centros**: semicircunferencias alternas centradas en dos puntos A y B, con radios $d, 2d, 3d, \\dots$ ($d = AB$).",
        "**Espiral de tres centros**: igual, centrando en los tres vértices de un **triángulo equilátero**; los arcos son de 120° y los radios crecen $d, 2d, 3d, \\dots$",
        "La **voluta** es una espiral decorativa usada en los capiteles jónicos.",
        "La **evolvente de la circunferencia** es otra curva técnica distinta: la traza el extremo de un hilo que se desenrolla.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Espiral y evolvente", [
      { kind: "text", text: "Prueba la espiral de dos centros con distinto número de semicircunferencias y desenrolla la evolvente." },
    ], tool("dt1-espiral-evolvente-explorador"), "visual-top"),
    slide("usos", "Aplicaciones", [
      { kind: "steps", items: [
        "**Espiral**: levas, muelles planos, volutas de bombas centrífugas y caracoles de turbinas.",
        "**Evolvente**: perfil de los **dientes de engranaje**: los dientes engranan con **relación de velocidades constante** aunque varíe la distancia entre ejes.",
        "**Hélice cilíndrica** (en el espacio): tornillos y muelles; su proyección es una circunferencia o una sinusoide.",
      ] },
    ]),
    calc("calc-paso", "Paso de la espiral", "Una espiral de dos centros con d = 5 mm. ¿Cuánto vale el paso, es decir, lo que crece el radio en una vuelta completa (dos semicircunferencias), en mm?", nums(10), "El paso por vuelta es 2d = 10 mm.", "2 · d."),
    calc("calc-r4", "Radio del cuarto arco", "En esa espiral, ¿qué radio tiene el cuarto arco, en mm?", nums(20), "El arco k tiene radio k · d = 4 · 5 = 20 mm.", "Multiplica k por d."),
    calc("calc-long", "Longitud de 4 arcos", "Con d = 1 cm, ¿qué longitud tienen los cuatro primeros arcos (π·d·n(n + 1)/2), en cm? (un decimal)", nums(31.4, 31.42), "π · 1 · 4 · 5 / 2 = 10π ≈ 31,4 cm.", "Suma de π·k para k = 1..4."),
    sort("clasifica-curva", "¿Qué curva usa?", "Asocia cada aplicación con su curva.",
      [["esp", "Espiral", "cobalt"], ["evo", "Evolvente", "amber"]],
      [["Muelle plano de un reloj", "esp"], ["Voluta de una bomba centrífuga", "esp"], ["Capitel jónico", "esp"], ["Diente de un engranaje", "evo"], ["Perfil de una rueda dentada de relojería", "evo"], ["Curva del extremo de un hilo que se desenrolla", "evo"]],
      "La evolvente da engranajes de velocidad constante; las espirales, perfiles de crecimiento.",
    ),
    pick("check-hilo", "El hilo", "En la evolvente de una circunferencia, ¿cómo es el hilo tenso respecto a la circunferencia y a la curva?",
      "Tangente a la circunferencia y normal (perpendicular) a la evolvente",
      [["Normal a la circunferencia y tangente a la evolvente", "Es al revés."], ["Tangente a ambas", "Es normal a la evolvente."], ["Paralelo al eje", "No tiene relación."]],
      "El hilo es la normal a la evolvente: el centro de curvatura está en el punto donde el hilo toca la circunferencia.",
    ),
  ],
};
