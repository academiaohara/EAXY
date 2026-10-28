import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const equilibrioEstaticoTi2Lesson: InteractiveLesson = {
  slug: "equilibrio-estatico-ti2",
  title: "3. Equilibrio estático",
  subtitle: TECTI2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un sólido en reposo", [
      { kind: "steps", items: [
        "Un sólido está en **equilibrio estático** si no se traslada ni gira.",
        "En el plano hay tres ecuaciones: Σ$F_x$ = 0, Σ$F_y$ = 0 y ΣM = 0 (respecto a cualquier punto).",
        "El **momento** de una fuerza respecto a un punto es **M = F · d**, siendo d la distancia perpendicular desde el punto a la línea de acción.",
        "Convenio: los momentos que giran en **sentido antihorario** se toman positivos.",
        "Se aísla el cuerpo (**diagrama de sólido libre**) y se dibujan todas las fuerzas y reacciones.",
      ] },
    ], undefined, "stack"),
    slide("palanca", "Una palanca en equilibrio", [
      { kind: "text", text: "La palanca es el ejemplo más simple de equilibrio de momentos. Cambia las cargas y las distancias." },
    ], tool("palanca-equilibrio-explorador"), "visual-top"),
    slide("pasos", "Método para resolver", [
      { kind: "steps", items: [
        "**1.** Dibuja el diagrama de sólido libre con todas las cargas y reacciones.",
        "**2.** Elige un punto conveniente (por ejemplo, un apoyo) para eliminar incógnitas con **ΣM = 0**.",
        "**3.** Aplica **ΣF = 0** para las demás.",
        "**4.** Comprueba con otro punto: la suma de momentos también debe ser cero.",
      ] },
    ]),
    calc("calc-m", "Momento", "Una fuerza de 40 N actúa a 0,25 m del punto de giro, perpendicularmente. ¿Cuántos N·m vale su momento?", nums(10), "40 · 0,25 = 10 N·m.", "Fuerza por distancia."),
    calc("calc-eq", "Equilibrio de una palanca", "Una carga de 300 N está a 0,2 m del punto de apoyo. ¿Qué fuerza hay que aplicar a 0,6 m del apoyo para equilibrarla, en N?", nums(100), "300 · 0,2 = F · 0,6; F = 100 N.", "Iguala los momentos."),
    calc("calc-apoyo", "Reacción en el apoyo", "Con esa palanca en equilibrio (300 N y 100 N en lados opuestos), ¿cuánto vale la reacción del apoyo, en N?", nums(400), "ΣF = 0: R = 300 + 100 = 400 N.", "Suma las dos cargas."),
    sort("clasifica-eq", "¿Qué ecuación?", "Decide qué ecuación del equilibrio se usa.",
      [["f", "ΣF = 0", "cobalt"], ["m", "ΣM = 0", "amber"]],
      [["La suma de fuerzas verticales es cero", "f"], ["La reacción total iguala a las cargas", "f"], ["No hay traslación", "f"], ["Los giros se compensan", "m"], ["Se toman momentos respecto a un apoyo", "m"], ["No hay rotación", "m"]],
      "Las fuerzas evitan la traslación; los momentos, el giro.",
    ),
    pick("check-punto", "Elegir el punto", "¿Por qué conviene tomar momentos respecto a un apoyo?",
      "Porque la reacción de ese apoyo tiene momento nulo y se elimina de la ecuación",
      [["Porque así el momento siempre vale cero", "Solo se anula el de esa reacción."], ["Porque el apoyo no soporta carga", "Sí la soporta."], ["No importa, no se puede elegir", "Se puede elegir cualquier punto."]],
      "Elegir bien el punto reduce el número de incógnitas por ecuación.",
    ),
  ],
};
