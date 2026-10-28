import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const economiaCircularReparacion4esoLesson: InteractiveLesson = {
  slug: "economia-circular-reparacion-4eso",
  title: "4. Economía circular, reparación y obsolescencia",
  subtitle: TECESO4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Lineal frente a circular", [
      { kind: "text", text: "Mira cómo cambia el recorrido de un producto en una economía circular." },
    ], anim("eso4-economia-circular"), "text-top"),
    slide("def", "Las erres", [
      { kind: "steps", items: [
        "**Rechazar** lo innecesario y **reducir** el consumo.",
        "**Reutilizar**: dar otra vida al objeto (segunda mano, donar).",
        "**Reparar**: arreglar en vez de sustituir; **derecho a reparar**.",
        "**Reciclar**: recuperar los materiales cuando ya no hay otra opción.",
        "Se aplican **por este orden**: el reciclaje es el último recurso.",
      ] },
    ], undefined, "stack"),
    slide("rep", "¿Reparar o comprar nuevo?", [
      { kind: "text", text: "Compara el coste y el CO₂ por año de uso de las dos opciones." },
    ], tool("eso4-reparar-explorador"), "visual-top"),
    slide("res", "Los residuos del hogar", [
      { kind: "text", text: "Separar bien los residuos permite reciclar más." },
    ], tool("eso2-residuos-hogar-explorador"), "visual-top"),
    slide("obs", "La obsolescencia", [
      { kind: "steps", items: [
        "**Obsolescencia programada**: el fabricante diseña el producto para que dure menos.",
        "**Obsolescencia psicológica**: se deja de usar por moda aunque funcione.",
        "**Obsolescencia por software**: las actualizaciones lo dejan lento o sin soporte.",
        "Contramedidas: **diseño modular**, **piezas de repuesto**, **garantías largas**, **manuales de reparación**.",
      ] },
    ]),
    calc("calc-anual", "Impacto por año", "Fabricar un aparato emite 300 kg de CO₂. Si dura 6 años, ¿cuántos kg por año?", nums(50), "300 / 6 = 50 kg/año.", "Impacto entre años de uso."),
    calc("calc-alarga", "Alargar la vida", "Si se alarga su vida a 10 años, ¿cuántos kg por año salen?", nums(30), "300 / 10 = 30 kg/año.", "Reparte el mismo impacto en más años."),
    sort("clasifica-r", "¿Qué erre es?", "Relaciona cada acción con la erre.",
      [["red", "Reducir", "cobalt"], ["reu", "Reutilizar o reparar", "amber"], ["rec", "Reciclar", "emerald"]],
      [["No comprar lo que no necesitas", "red"], ["Elegir menos embalaje", "red"], ["Vender un móvil usado", "reu"], ["Cambiar la correa de una lavadora", "reu"], ["Echar el vidrio al contenedor verde", "rec"], ["Fundir latas de aluminio", "rec"]],
      "Reducir y reutilizar ahorran más que reciclar.",
    ),
    pick("check-circ", "La mejor erre", "¿Cuál es la opción que menos impacto tiene?",
      "Reducir: lo que no se fabrica no genera residuos",
      [["Reciclar siempre", "Es el último recurso."], ["Tirarlo todo", "Genera más residuos."], ["Comprar nuevo cada año", "Aumenta el impacto."]],
      "La jerarquía de residuos prioriza reducir y reutilizar.",
    ),
  ],
};
