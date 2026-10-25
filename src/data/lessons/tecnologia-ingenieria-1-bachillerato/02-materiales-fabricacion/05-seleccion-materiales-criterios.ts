import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seleccionMaterialesCriteriosLesson: InteractiveLesson = {
  slug: "seleccion-materiales-criterios",
  title: "5. Selección de materiales",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("intro", "No hay un mejor material, hay un mejor compromiso", [
      { kind: "definition", text: "Seleccionar un material es encontrar el que **cumple la función** al menor coste global, con la mayor sostenibilidad posible, entre muchos candidatos." },
      { kind: "steps", title: "Método", items: [
        "**Función**: ¿qué debe hacer la pieza? (soportar, conducir, aislar, proteger…).",
        "**Restricciones**: valores que sí o sí se deben cumplir (resistencia mínima, temperatura máxima, masa máxima).",
        "**Objetivos**: lo que se quiere minimizar o maximizar (masa, coste, impacto).",
        "**Cribado**: descartar los que incumplen una restricción.",
        "**Clasificación**: ordenar los que quedan con una matriz de decisión.",
      ] },
    ], undefined, "stack"),
    slide("matriz", "Selector multicriterio: cuadro de bicicleta", [
      { kind: "text", text: "Cambia los pesos de ligereza, resistencia, coste y reciclabilidad. Un ciclista de competición y un repartidor urbano **no deberían** llegar al mismo material." },
    ], tool("matriz-decision-explorador", { n: 2 }), "visual-top"),
    slide("indice", "Índices de mérito", [
      { kind: "text", text: "Cuando la masa importa, no se compara la resistencia sola, sino su cociente con la densidad." },
      { kind: "rule", title: "Resistencia específica", text: "Cuánto aguanta por unidad de masa.", formula: "\\dfrac{\\sigma}{\\rho}\\ \\left(\\dfrac{\\text{kJ}}{\\text{kg}}\\right)" },
      { kind: "example", title: "Acero frente a aluminio (valores típicos)", lines: [
        { math: "\\dfrac{400\\ \\text{MPa}}{7850\\ \\text{kg/m}^3} \\approx 51\\ \\text{kJ/kg}", note: "acero" },
        { math: "\\dfrac{300\\ \\text{MPa}}{2700\\ \\text{kg/m}^3} \\approx 111\\ \\text{kJ/kg}", note: "aluminio 6061" },
      ] },
      { kind: "warning", title: "El coste no es solo el precio por kilo", text: "Cuenta el mecanizado, la vida útil, el mantenimiento, el transporte y el reciclado al final de su vida." },
    ]),
    slide("condiciones", "Condiciones de servicio y fin de vida", [
      { kind: "steps", items: [
        "**Condiciones de servicio**: temperatura, humedad, ambiente corrosivo, cargas repetidas, radiación UV.",
        "**Disponibilidad**: ¿se encuentra en las formas y medidas necesarias?",
        "**Fabricabilidad**: ¿se puede soldar, mecanizar o moldear con los medios disponibles?",
        "**Fin de vida**: ¿se recicla, se reutiliza, se puede desmontar?",
      ] },
    ]),
    calc("calc-masa-ahorro", "Ahorro de masa", "Una pieza estructural de acero ($7850\\ \\text{kg/m}^3$) ocupa $0{,}004\\ \\text{m}^3$. Si, con el mismo volumen, se hiciera de aluminio ($2700\\ \\text{kg/m}^3$), ¿cuántos kg se ahorrarían?",
      nums(20.6), "Acero: $7850\\cdot 0{,}004 = 31{,}4$ kg. Aluminio: $2700\\cdot 0{,}004 = 10{,}8$ kg. Ahorro: $31{,}4 - 10{,}8 = 20{,}6$ kg. (En la práctica el aluminio exige algo más de volumen para igual rigidez.)", "Calcula primero las dos masas."),
    pick("check-materiales", "Elegir con criterio", "Para la carcasa de una carretilla de obra que se golpea mucho y trabaja a la intemperie, con presupuesto ajustado, ¿qué es más razonable?",
      "Chapa de acero con pintura o galvanizado",
      [["Fibra de carbono", "Muy ligera y resistente, pero cara y mala frente a golpes: es una elección fuera de presupuesto."], ["Titanio", "Excelente, pero costoso para una aplicación de uso rudo y bajo coste."], ["Vidrio", "Se rompería con el primer golpe."]],
      "Entre los candidatos viables, el acero protegido da el mejor compromiso entre tenacidad, coste y disponibilidad.",
    ),
    sort("clasifica-criterio", "Restricción u objetivo", "Decide si cada enunciado es una restricción (se cumple o se descarta) o un objetivo (se optimiza).",
      [["res", "Restricción", "amber"], ["obj", "Objetivo", "emerald"]],
      [["La masa no puede superar 3 kg", "res"], ["Debe soportar 120 °C", "res"], ["Debe poder soldarse", "res"], ["Minimizar el coste", "obj"], ["Minimizar el impacto ambiental", "obj"], ["Maximizar la rigidez por kilo", "obj"]],
      "Una restricción es un umbral que se cumple o no; un objetivo es una magnitud que se quiere mejorar todo lo posible.",
    ),
  ],
};
