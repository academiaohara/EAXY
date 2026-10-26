import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const necesidadesRequisitos2esoLesson: InteractiveLesson = {
  slug: "necesidades-requisitos-2eso",
  title: "1. Necesidades, investigación y requisitos",
  subtitle: TECESO2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("ciclo", "El proyecto como ciclo", [
      { kind: "text", text: "Un proyecto no es una línea recta: se prueba, se detectan fallos y se vuelve a mejorar." },
    ], anim("eso2-ciclo-diseno"), "text-top"),
    slide("necesidad", "Identificar la necesidad", [
      { kind: "steps", items: [
        "**Observa** tu entorno: ¿qué problema tienen las personas (en casa, en clase, en el barrio)?",
        "Define **quién** tiene el problema, **dónde** y **cuándo** aparece.",
        "**Investiga** qué soluciones existen ya: ¿qué hacen bien y mal?",
        "Pregunta a las **personas usuarias**: son quienes mejor conocen el problema.",
      ] },
    ], undefined, "stack"),
    slide("requisitos", "Requisitos y especificaciones", [
      { kind: "definition", text: "Los **requisitos** son las condiciones que debe cumplir la solución. Las **especificaciones** los concretan con valores medibles, de modo que se pueda comprobar si el producto final los cumple." },
      { kind: "text", text: "Escribe un requisito y comprueba si se puede verificar." },
    ], tool("eso2-requisitos-explorador"), "visual-top"),
    slide("tipos", "Tipos de requisitos", [
      { kind: "steps", items: [
        "**Funcionales**: lo que debe hacer (sujetar un móvil, plegarse).",
        "**Restricciones**: límites de coste, tiempo, tamaño o materiales disponibles.",
        "**De seguridad y normas**: sin aristas vivas, materiales no tóxicos.",
        "**De uso y aspecto**: fácil de usar, accesible, agradable.",
      ] },
    ]),
    calc("calc-requisito", "Convertir en medible", "«El soporte debe ser barato». Se concreta como «debe costar menos de 5 €». ¿Cuál es el valor límite de coste, en €?", nums(5), "El valor medible es 5 €: así se puede comprobar con el presupuesto final.", "Busca el número del requisito concretado."),
    sort("clasifica-req", "Tipo de requisito", "Clasifica cada requisito.",
      [["fun", "Funcional", "cobalt"], ["res", "Restricción", "amber"], ["seg", "Seguridad", "rose"]],
      [["Debe sujetar un móvil de hasta 300 g", "fun"], ["Debe plegarse en un volumen menor que un libro", "fun"], ["No debe costar más de 5 €", "res"], ["Debe terminarse en 3 semanas", "res"], ["No debe tener aristas cortantes", "seg"], ["Debe usar pintura no tóxica", "seg"]],
      "Los funcionales dicen qué hace; las restricciones, qué límites tiene; los de seguridad, qué riesgos evita.",
    ),
    pick("check-medible", "Requisito verificable", "¿Cuál de estos requisitos se puede comprobar con una medida?",
      "«La base debe aguantar 2 kg sin volcar»",
      [["«La base debe ser fuerte»", "«Fuerte» es subjetivo."], ["«Debe quedar bonito»", "No se puede medir."], ["«Debe ser cómodo»", "Falta un criterio comprobable."]],
      "Un valor con unidad permite saber, al final, si el requisito se cumple.",
    ),
  ],
};
