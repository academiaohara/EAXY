import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const variablesPenduloFq3Lesson: InteractiveLesson = {
  slug: "variables-pendulo-fq3",
  title: "1. Investigar: variables y control",
  subtitle: FQ3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Diseñar una investigación", [
      { kind: "steps", items: [
        "Toda investigación parte de una **pregunta** y de una **hipótesis**: una respuesta provisional que se puede **comprobar** con un experimento.",
        "La **variable independiente** es la que **cambiamos** a propósito. La **dependiente** es la que **medimos** para ver el efecto.",
        "Las **variables controladas** son las que se **mantienen fijas** para que la comparación sea justa.",
        "Se cambia **una sola variable cada vez** y se **repite** la medida varias veces para reducir el error.",
      ] },
    ], undefined, "stack"),
    slide("explora", "El péndulo", [
      { kind: "text", text: "¿Qué influye en el periodo de un péndulo: la longitud, la masa o el ángulo? Cambia una variable cada vez." },
    ], tool("fq3-pendulo-variables-explorador"), "visual-top"),
    slide("concl", "Sacar conclusiones", [
      { kind: "steps", items: [
        "Si al cambiar una variable el resultado **no varía**, esa variable **no influye**.",
        "Aquí el periodo depende de la **longitud**, pero no de la **masa** ni (para ángulos pequeños) del **ángulo**.",
        "Una conclusión debe apoyarse en los **datos**, indicar si la **hipótesis** se confirma y reconocer las **limitaciones**.",
      ] },
    ]),
    calc("calc-per", "Periodo", "Un péndulo de 1 m de longitud (g = 9,8 m/s²) tiene T = 2π·√(L/g). ¿Cuánto vale T, en s? (redondea a un decimal)", nums(2, 2.0), "T = 2π·√(1/9,8) ≈ 2,0 s.", "Calcula la raíz de 1/9,8 y multiplica por 2π."),
    calc("calc-osc", "Oscilaciones", "Con T = 2 s, ¿cuántas oscilaciones completas hace el péndulo en 60 s?", nums(30), "60 / 2 = 30 oscilaciones.", "Divide el tiempo total entre el periodo."),
    sort("clasifica", "Tipo de variable", "En un experimento para ver cómo influye la temperatura del agua en lo rápido que se disuelve el azúcar, clasifica cada elemento.",
      [["ind", "Independiente", "cobalt"], ["dep", "Dependiente", "amber"], ["con", "Controlada", "emerald"]],
      [["La temperatura del agua", "ind"], ["El tiempo que tarda en disolverse", "dep"], ["La cantidad de azúcar", "con"], ["El volumen de agua", "con"], ["La forma de remover", "con"], ["Los distintos valores de temperatura que probamos", "ind"]],
      "Lo que se cambia es independiente; lo que se mide, dependiente; lo que se mantiene, controlada.",
    ),
    pick("check", "Experimento justo", "Quieres saber si la masa influye en el periodo de un péndulo. ¿Qué haces?",
      "Cambias solo la masa y mantienes la longitud y el ángulo",
      [["Cambias masa y longitud a la vez", "Así no sabrás cuál influye."], ["Mides una sola vez", "Hay que repetir las medidas."], ["Cambias solo el ángulo", "Esa no es la variable estudiada."]],
      "Se cambia una sola variable cada vez.",
    ),
  ],
};
