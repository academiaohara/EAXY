import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const analisisNecesidadesEspecificaciones4esoLesson: InteractiveLesson = {
  slug: "analisis-necesidades-especificaciones-4eso",
  title: "1. Del problema al producto: necesidades y especificaciones",
  subtitle: TECESO4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("anim", "El ciclo de un proyecto de ingeniería", [
      { kind: "text", text: "Mira las fases de un proyecto y cómo se repite hasta cumplir lo que se pidió." },
    ], anim("eso4-ciclo-ingenieria"), "text-top"),
    slide("def", "Analizar la necesidad", [
      { kind: "steps", items: [
        "Un proyecto empieza con una **necesidad**: ¿quién tiene el problema, dónde y cuándo?",
        "Se **investiga el contexto**: usuarios, productos que ya existen, normas y límites (coste, plazo, medio ambiente).",
        "Se distinguen **requisitos del cliente** (lo que quiere) y **especificaciones técnicas** (valores medibles).",
        "La **casa de la calidad** traduce unos en otras y señala **qué es más importante** resolver.",
      ] },
    ], undefined, "stack"),
    slide("qfd", "Traduce las necesidades", [
      { kind: "text", text: "Puntúa la importancia de cada necesidad y mira qué característica técnica debe cuidarse más." },
    ], tool("eso4-casa-calidad-explorador"), "visual-top"),
    slide("spec", "Especificaciones medibles", [
      { kind: "text", text: "Comprueba si un prototipo cumple las especificaciones y con qué margen." },
    ], tool("eso3-especificaciones-explorador"), "visual-top"),
    calc("calc-prior", "Prioridad", "Una necesidad de importancia 4 se relaciona con una característica con valor 9 y otra de importancia 5 con valor 3 (otras relaciones nulas). ¿Qué prioridad suma la característica? (4·9 + 5·3)", nums(51), "36 + 15 = 51.", "Suma importancia por relación."),
    calc("calc-pct", "Porcentaje", "Una característica suma 51 de un total de 204 puntos. ¿Qué porcentaje es?", nums(25), "51 / 204 = 0,25 = 25 %.", "Parte entre total."),
    sort("clasifica-req", "¿Requisito o especificación?", "Clasifica cada enunciado.",
      [["req", "Requisito del cliente", "cobalt"], ["esp", "Especificación técnica", "amber"]],
      [["Quiero que sea ligera", "req"], ["Que sea fácil de montar", "req"], ["Que no cueste mucho", "req"], ["Masa ≤ 500 g", "esp"], ["Montaje en menos de 10 min", "esp"], ["Coste de materiales ≤ 12 €", "esp"]],
      "Los requisitos expresan deseos; las especificaciones los convierten en números.",
    ),
    pick("check-nec", "Primer paso", "¿Cuál es el primer paso razonable ante un problema real?",
      "Analizar la necesidad y el contexto antes de proponer soluciones",
      [["Empezar a construir", "Sin análisis se construye lo que no hace falta."], ["Comprar materiales", "Es prematuro."], ["Copiar el primer producto que se encuentre", "No resuelve tu necesidad."]],
      "Entender bien el problema ahorra tiempo y dinero.",
    ),
  ],
};
