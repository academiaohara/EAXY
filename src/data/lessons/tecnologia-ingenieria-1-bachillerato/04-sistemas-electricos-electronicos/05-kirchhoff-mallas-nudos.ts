import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const kirchhoffMallasNudosLesson: InteractiveLesson = {
  slug: "kirchhoff-mallas-nudos",
  title: "5. Análisis de circuitos y leyes de Kirchhoff",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("definiciones", "Nudos, ramas y mallas", [
      { kind: "steps", items: [
        "**Nudo**: punto donde se unen tres o más conductores.",
        "**Rama**: tramo entre dos nudos con uno o más elementos en serie (la misma intensidad).",
        "**Malla**: camino cerrado que no pasa dos veces por el mismo nudo.",
      ] },
      { kind: "text", text: "La ley de Ohm y las asociaciones no bastan cuando hay **varias fuentes** o redes que no se pueden reducir. Para ellas se usan las leyes de Kirchhoff." },
    ], undefined, "stack"),
    slide("leyes", "Las dos leyes", [
      { kind: "rule", title: "Ley de nudos (corrientes)", text: "La carga no se acumula en un nudo.", formula: "\\sum I_{\\text{entran}} = \\sum I_{\\text{salen}}\\qquad\\Longleftrightarrow\\qquad \\sum I = 0" },
      { kind: "rule", title: "Ley de mallas (tensiones)", text: "Al recorrer una malla completa, la suma algebraica de tensiones es cero.", formula: "\\sum V = 0\\qquad\\text{(subidas de fuentes} = \\text{caídas en resistencias)}" },
    ], anim("kirchhoff-nodo-malla"), "split"),
    slide("sim", "Dos fuentes y tres ramas", [
      { kind: "text", text: "Cambia las fuentes y resistencias. El simulador resuelve el sistema de ecuaciones y comprueba las dos leyes. Un signo **negativo** significa que la corriente real va al revés del sentido supuesto." },
    ], tool("kirchhoff-explorador"), "visual-top"),
    slide("metodo", "Método de resolución", [
      { kind: "steps", items: [
        "Asigna un **sentido supuesto** a la corriente de cada rama.",
        "Escribe **una ecuación de nudo** por cada nudo independiente.",
        "Escribe **una ecuación de malla** por cada malla independiente, usando $V = IR$ en las resistencias.",
        "Resuelve el sistema. Si una corriente sale **negativa**, es que va en sentido contrario al supuesto.",
        "**Comprueba** con una malla o un nudo que no hayas usado.",
      ] },
      { kind: "example", title: "Dos mallas, I₃ = I₁ + I₂", lines: [
        { math: "V_1 = I_1 R_1 + I_3 R_3" },
        { math: "V_2 = I_2 R_2 + I_3 R_3" },
        { math: "I_3 = I_1 + I_2", note: "tres ecuaciones, tres incógnitas" },
      ] },
    ]),
    calc("calc-nudo", "Corriente en un nudo", "A un nudo llegan $2$ A y $3$ A, y salen $1$ A por una rama y $I_3$ por otra. ¿Cuánto vale $I_3$ en A?",
      nums(4), "Entran $2 + 3 = 5$ A; salen $1 + I_3$. Por tanto $I_3 = 5 - 1 = 4$ A.", "Entradas = salidas."),
    calc("calc-malla", "Tensión en una malla", "Una malla tiene una fuente de $24$ V y tres resistencias en serie. Dos caídas miden $6$ V y $10$ V. ¿Cuánto cae en la tercera, en V?",
      nums(8), "$24 = 6 + 10 + V_3 \\Rightarrow V_3 = 8$ V.", "Subidas = caídas."),
    sort("clasifica-kir", "¿Qué ley se usa?", "Asocia cada situación con la ley de Kirchhoff que la resuelve.",
      [["nu", "Ley de nudos", "cobalt"], ["ma", "Ley de mallas", "amber"]],
      [["Hallar la corriente que falta en una unión de tres cables", "nu"], ["Comprobar que la suma de corrientes que entran y salen es cero", "nu"], ["Calcular la caída de tensión que falta en un camino cerrado", "ma"], ["Plantear 12 − 4 − 3 − V = 0", "ma"], ["Repartir una corriente entre ramas en paralelo", "nu"], ["Recorrer el circuito sumando subidas y bajadas de potencial", "ma"]],
      "La ley de nudos trata de corrientes en una unión; la de mallas, de tensiones en un camino cerrado.",
    ),
    pick("check-signo", "Un signo negativo", "Al resolver un circuito, una corriente de rama sale I = −0,11 A. ¿Qué significa?",
      "Que circula con 0,11 A de intensidad en sentido contrario al que se había supuesto",
      [["Que el cálculo es erróneo", "Es perfectamente normal: solo indica un sentido supuesto incorrecto."], ["Que la corriente es nula", "Vale 0,11 A en valor absoluto."], ["Que la rama está abierta", "Una rama abierta daría exactamente 0."]],
      "El signo negativo no es un error: el sentido supuesto era el contrario al real.",
    ),
  ],
};
