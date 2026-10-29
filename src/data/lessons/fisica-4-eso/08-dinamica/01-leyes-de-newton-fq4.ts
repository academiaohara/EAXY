import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const leyesDeNewtonFq4Lesson: InteractiveLesson = {
  slug: "leyes-de-newton-fq4",
  title: "1. Leyes de Newton y diagramas de fuerzas",
  subtitle: FQ4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("fuerza", "Qué es una fuerza", [
      { kind: "steps", items: [
        "Una **fuerza** es una interacción entre cuerpos capaz de **deformarlos** o de **cambiar su estado de movimiento**. Es una magnitud **vectorial**: módulo, dirección y sentido.",
        "Se mide en **newtons (N)**: 1 N = 1 kg·m/s².",
        "Varias fuerzas sobre un cuerpo se sustituyen por su **resultante** ΣF, la suma vectorial: en la misma recta se suman o restan según el sentido.",
        "La **dinámica** relaciona las fuerzas con el movimiento. Se apoya en las **tres leyes de Newton**.",
      ] },
    ], undefined, "stack"),
    slide("diagrama", "Diagrama de fuerzas", [
      { kind: "text", text: "Para resolver un problema, se **aísla** el cuerpo y se dibujan solo las fuerzas **que actúan sobre él**." },
    ], anim("fq4-diagrama-fuerzas"), "visual-top"),
    slide("leyes", "Las tres leyes", [
      { kind: "steps", items: [
        "**1.ª ley (inercia)**: si la resultante es nula, el cuerpo **sigue en reposo o con MRU**. Un cuerpo no cambia su velocidad sin una fuerza neta.",
        "**2.ª ley**: **ΣF = m·a**. La aceleración tiene la dirección de la resultante; a igual fuerza, más masa implica menos aceleración.",
        "**3.ª ley (acción y reacción)**: si A ejerce una fuerza sobre B, B ejerce sobre A otra **igual y de sentido contrario**. Actúan sobre **cuerpos distintos**: no se anulan.",
        "La **masa** mide la **inercia** del cuerpo (kg); el **peso** es una fuerza (N).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prueba la segunda ley", [
      { kind: "text", text: "Cambia la masa y las dos fuerzas. ¿Qué pasa cuando se igualan?" },
    ], tool("fq4-newton-explorador"), "visual-top"),
    calc("calc-a", "Segunda ley", "Una fuerza resultante de 60 N actúa sobre un cuerpo de 12 kg. ¿Qué aceleración adquiere, en m/s²?", nums(5), "a = ΣF/m = 60/12 = 5 m/s².", "a = ΣF/m."),
    calc("calc-res", "Resultante", "Dos personas empujan una caja: una con 50 N hacia la derecha y otra con 20 N hacia la izquierda. ¿Cuánto vale la resultante, en N?", nums(30), "ΣF = 50 − 20 = 30 N hacia la derecha.", "Resta si van en sentidos contrarios."),
    calc("calc-m", "Masa", "Una fuerza de 100 N produce una aceleración de 4 m/s². ¿Cuál es la masa del cuerpo, en kg?", nums(25), "m = F/a = 100/4 = 25 kg.", "m = ΣF/a."),
    sort("clasifica", "¿Qué ley es?", "Relaciona cada situación con la ley que la explica.",
      [["l1", "1.ª ley (inercia)", "cobalt"], ["l2", "2.ª ley (F = m·a)", "emerald"], ["l3", "3.ª ley (acción-reacción)", "rose"]],
      [["Los pasajeros se inclinan hacia delante cuando el autobús frena", "l1"], ["Un carrito vacío acelera más que uno cargado con la misma fuerza", "l2"], ["Un cohete avanza al expulsar gases hacia atrás", "l3"], ["Un objeto deslizando por hielo casi no se detiene", "l1"], ["Al saltar de una barca, esta retrocede", "l3"]],
      "Inercia: sin fuerza no cambia el movimiento. 2.ª: relaciona fuerza y aceleración. 3.ª: par de fuerzas en cuerpos distintos.",
    ),
    pick("check", "Acción y reacción", "Una persona empuja una pared con 100 N. ¿Con qué fuerza empuja la pared a la persona?",
      "Con 100 N, en sentido contrario",
      [["Con 0 N, porque la pared no se mueve", "La pared ejerce fuerza aunque esté quieta."], ["Con más de 100 N", "Son iguales."], ["Con 100 N en el mismo sentido", "El sentido es contrario."]],
      "Acción y reacción: mismo módulo, sentido opuesto.",
    ),
  ],
};
