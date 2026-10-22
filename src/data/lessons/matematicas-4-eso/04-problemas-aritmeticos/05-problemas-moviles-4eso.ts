import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const problemasMoviles4esoLesson: InteractiveLesson = {
  slug: "problemas-moviles-4eso",
  title: "5. Problemas de móviles: encuentros y alcances",
  subtitle: TEMA_4ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "encuentros",
      type: "slide",
      help: [
        {
          label: "Idea clave",
          message: "Si se acercan uno a otro, la distancia entre ellos disminuye con la **suma** de las velocidades: es la **velocidad de aproximación**.",
        },
        {
          label: "Hora",
          message: "$1{,}75$ h $= 1$ h $45$ min. Se suma a la hora de salida: $9{:}00 + 1{:}45 = 10{:}45$.",
        },
      ],
      title: "Encuentros: sentidos opuestos, se suman",
      blocks: [
        {
          kind: "text",
          text: "Dos poblaciones distan $350$ km. A las $9$ sale de A un camión a $80$ km/h y, a la vez, de B un coche a $120$ km/h. ¿A qué hora se cruzan?",
        },
        {
          kind: "rule",
          title: "Sentidos opuestos",
          formula: "v_{\\text{aprox}} = v_1 + v_2 \\qquad t = \\dfrac{d}{v_1 + v_2}",
        },
        {
          kind: "example",
          lines: [{ math: "t = \\dfrac{350}{80 + 120} = 1{,}75\\ \\text{h} = 1\\ \\text{h}\\ 45\\ \\text{min} \\to 10{:}45" }],
        },
      ],
      visual: { kind: "anim", scene: "movil-encuentro", params: { mov: "opuesto", nums: [80, 120, 350, 0] } },
    },
    {
      id: "alcances",
      type: "slide",
      help: [
        {
          label: "Mismo sentido",
          message: "Si van en el mismo sentido y el de atrás es más rápido, la distancia disminuye con la **diferencia** de velocidades.",
        },
        {
          label: "Si el rápido va delante",
          message: "Si el que va delante es más rápido, la distancia crece y **nunca** se alcanzan.",
        },
      ],
      title: "Alcances: mismo sentido, se restan",
      blocks: [
        {
          kind: "text",
          text: "Un ciclista profesional va a $38$ km/h. A $22$ km por delante, un cicloturista va a $14$ km/h en el mismo sentido. ¿Cuánto tarda el primero en alcanzarlo?",
        },
        {
          kind: "rule",
          title: "Mismo sentido",
          formula: "v_{\\text{aprox}} = v_2 - v_1 \\qquad t = \\dfrac{\\text{ventaja}}{v_2 - v_1}",
        },
        {
          kind: "example",
          lines: [{ math: "t = \\dfrac{22}{38 - 14} = \\dfrac{11}{12}\\ \\text{h} = 55\\ \\text{min}" }],
        },
      ],
      visual: { kind: "anim", scene: "movil-encuentro", params: { mov: "alcance", nums: [14, 38, 22, 0] } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Con retraso",
          message: "Si el segundo sale más tarde, el primero ya ha recorrido $v_1 \\cdot \\text{retraso}$: esa distancia se **suma a la ventaja**.",
        },
      ],
      title: "Explora: ¿se cruzan o se alcanzan?",
      blocks: [
        {
          kind: "text",
          text: "Cambia entre «Se cruzan» y «Alcance». En el alcance, prueba a poner el segundo más lento: **nunca alcanzará** al primero. Añade también un retraso en la salida.",
        },
        {
          kind: "warning",
          text: "Pasa siempre los tiempos a horas (o las velocidades a km/min) antes de operar: $15$ min $= 0{,}25$ h.",
        },
      ],
      visual: { kind: "tool", tool: "moviles-explorador", params: { n: 1 }, initial: [18, 22, 0, 30], hint: "Alarga el retraso: ¿cuánto crece el tiempo hasta el alcance?" },
    },
    {
      id: "check-cruce",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Se suman",
          message: "$100 + 80 = 180$ km/h de aproximación. $270 : 180 = 1{,}5$ h $= 1$ h $30$ min.",
        },
      ],
      title: "¿A qué hora se cruzan?",
      question: "A y B distan $270$ km. A las $12{:}00$ sale de A un coche a $100$ km/h y, a la vez, de B otro a $80$ km/h. ¿Cuántos minutos tardan en cruzarse? (solo el número)",
      correctAnswers: ["90"],
      explanation: "$t = \\frac{270}{100 + 80} = 1{,}5$ h $= 90$ min. Se cruzan a las $13{:}30$.",
    },
    {
      id: "check-504",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Suma",
          message: "$504 : (120 + 90) = 2{,}4$ h. $0{,}4$ h son $24$ min.",
        },
      ],
      title: "Un coche y un camión",
      question: "Un coche va a $120$ km/h y un camión a $90$ km/h. Si están a $504$ km y se dirigen uno hacia el otro, ¿cuánto tardan en cruzarse?",
      choices: [
        { id: "a", label: "$2$ h $24$ min" },
        { id: "b", label: "$16{,}8$ h", incorrectFeedback: "Esa sería la solución si solo se moviese el camión ($504 : 30$). Se acercan los dos: se **suman** las velocidades." },
        { id: "c", label: "$4$ h $12$ min", incorrectFeedback: "Esa cuenta usa solo la velocidad del coche ($504 : 120$)." },
        { id: "d", label: "$2$ h $40$ min", incorrectFeedback: "Revisa la suma: $120 + 90 = 210$ km/h, y $504 : 210 = 2{,}4$ h." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$t = \\frac{504}{120 + 90} = 2{,}4$ h $= 2$ h $24$ min.",
    },
    {
      id: "check-persecucion",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Ventaja de media hora",
          message: "Cuando sale el segundo, el primero ya lleva $18 \\cdot 0{,}5 = 9$ km. Se acerca a $22 - 18 = 4$ km/h.",
        },
      ],
      title: "Persecución con salida tardía",
      question: "Un ciclista sale a $18$ km/h. Media hora más tarde sale tras él, del mismo lugar, otro a $22$ km/h. ¿Cuántos minutos tarda el segundo en alcanzarlo? (solo el número)",
      correctAnswers: ["135"],
      explanation: "Ventaja: $9$ km. $t = \\frac{9}{22 - 18} = 2{,}25$ h $= 135$ min ($2$ h $15$ min).",
    },
    {
      id: "check-tren",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Distancia recorrida",
          message: "Tiempo: $90 : (110 - 70) = 2{,}25$ h. El rápido recorre $110 \\cdot 2{,}25$ km.",
        },
      ],
      title: "Dos trenes",
      question: "Un tren a $70$ km/h lleva una ventaja de $90$ km a otro que va por una vía paralela a $110$ km/h. ¿Cuántos kilómetros recorre el segundo hasta alcanzarlo? (escribe el número con coma)",
      correctAnswers: ["247,5", "247.5"],
      explanation: "$t = \\frac{90}{110 - 70} = 2{,}25$ h. Distancia: $110 \\cdot 2{,}25 = 247{,}5$ km.",
    },
    {
      id: "check-camion-coche",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Llegan a la vez",
          message: "Si el camión tarda $T$ h, el coche tarda $T - 0{,}25$ h y recorren la misma distancia: $80T = 120(T - 0{,}25)$.",
        },
      ],
      title: "Llegan a la vez",
      question: "Un camión sale de A hacia B a $80$ km/h. Un cuarto de hora después sale un coche, en el mismo sentido, a $120$ km/h, y llegan a B a la vez. ¿Qué distancia hay entre A y B? (solo el número, en km)",
      correctAnswers: ["60"],
      explanation: "$80T = 120(T - 0{,}25)$ → $40T = 30$ → $T = 0{,}75$ h. Distancia: $80 \\cdot 0{,}75 = 60$ km.",
    },
  ],
};
