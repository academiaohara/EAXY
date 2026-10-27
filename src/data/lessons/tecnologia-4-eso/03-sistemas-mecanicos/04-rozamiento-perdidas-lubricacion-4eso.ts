import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const rozamientoPerdidasLubricacion4esoLesson: InteractiveLesson = {
  slug: "rozamiento-perdidas-lubricacion-4eso",
  title: "4. Rozamiento, pérdidas y lubricación",
  subtitle: TECESO4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "La fuerza que se opone al movimiento", [
      { kind: "steps", items: [
        "El **rozamiento** es la fuerza que se opone al deslizamiento entre dos superficies.",
        "$F_r$ = μ · N: depende del coeficiente μ (materiales y estado) y de la fuerza normal N, no del área de contacto.",
        "Es **útil** en frenos, neumáticos y correas; es **perjudicial** en cojinetes y engranajes: **pierde energía en forma de calor** y desgasta.",
        "Se reduce con **lubricantes**, **rodamientos** (rodar en vez de deslizar) y **superficies pulidas**.",
      ] },
    ], undefined, "stack"),
    slide("plano", "Un bloque en un plano inclinado", [
      { kind: "text", text: "Cambia la masa, la inclinación y μ. Mira cuándo el bloque desliza y qué fuerza hace falta para subirlo." },
    ], tool("eso4-rozamiento-explorador"), "visual-top"),
    slide("rend", "Rendimiento mecánico", [
      { kind: "text", text: "El rozamiento hace que el rendimiento sea siempre menor del 100 %." },
    ], tool("eso3-rendimiento-explorador"), "visual-top"),
    slide("lub", "Lubricación y mantenimiento", [
      { kind: "steps", items: [
        "El lubricante forma una **película** entre las piezas y reduce μ (aceite, grasa).",
        "Elegir la **viscosidad** adecuada: demasiado espeso aumenta pérdidas; demasiado fino no protege.",
        "**Mantenimiento preventivo**: revisar, limpiar y lubricar antes de que haya averías.",
        "El **calor** y el **ruido** inusuales avisan de un exceso de rozamiento.",
      ] },
    ]),
    calc("calc-N", "Fuerza normal", "Un bloque de 10 kg sobre una superficie horizontal (g = 9,81 m/s²). ¿Cuánto vale la fuerza normal, en N? (redondea a un entero)", nums(98, 98.1), "N = m·g = 98,1 N.", "En horizontal, la normal iguala al peso."),
    calc("calc-Fr", "Rozamiento", "Con μ = 0,3 y N = 98,1 N, ¿cuánto vale el rozamiento máximo, en N? (redondea a un entero)", nums(29, 29.4), "0,3 · 98,1 = 29,4 N.", "μ por N."),
    calc("calc-calor", "Calor generado", "Una pieza pierde 15 W por rozamiento durante 10 minutos. ¿Cuántos J se transforman en calor? (P·t)", nums(9000), "15 · 600 = 9 000 J.", "Pasa los minutos a segundos."),
    sort("clasifica-roz", "¿Útil o perjudicial?", "Decide si el rozamiento ayuda o estorba.",
      [["uti", "Útil", "emerald"], ["per", "Perjudicial", "rose"]],
      [["Frenar un coche", "uti"], ["Agarre de los neumáticos", "uti"], ["Una correa que arrastra una polea", "uti"], ["El eje de un motor en su cojinete", "per"], ["Los dientes de un engranaje", "per"], ["Un cajón que se atasca", "per"]],
      "Se busca aumentarlo cuando ayuda y reducirlo cuando estorba.",
    ),
    pick("check-area", "El área de contacto", "Un bloque pesado se apoya primero por su cara grande y luego por la pequeña. ¿Cambia el rozamiento?",
      "No, porque depende de μ y de la fuerza normal, no del área",
      [["Sí, es mayor con más área", "No depende del área."], ["Sí, es menor con más área", "No depende del área."], ["Depende de la hora", "No tiene relación."]],
      "El rozamiento vale Fr = μ·N.",
    ),
  ],
};
