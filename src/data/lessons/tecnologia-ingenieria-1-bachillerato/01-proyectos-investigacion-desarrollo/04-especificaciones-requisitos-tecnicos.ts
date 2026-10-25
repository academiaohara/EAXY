import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { nums, pick, slide, sort, tool, calc } from "@/data/lessons/tec1-helpers";

export const especificacionesRequisitosTecnicosLesson: InteractiveLesson = {
  slug: "especificaciones-requisitos-tecnicos",
  title: "4. Especificaciones y requisitos técnicos",
  subtitle: TEC1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("intro", "De la necesidad al requisito", [
      { kind: "definition", text: "Un **requisito** es una condición que la solución debe cumplir. Una **especificación** lo expresa con un valor y una unidad, de modo que se pueda **verificar**." },
      { kind: "compare",
        left: { title: "Requisito funcional", text: "Qué debe hacer: soportar el portátil, plegarse, cargar el móvil.", tone: "info" },
        right: { title: "Requisito no funcional", text: "Cómo debe ser: masa, dimensiones, coste, seguridad, durabilidad, impacto ambiental.", tone: "key" } },
      { kind: "text", text: "Las **restricciones** son límites impuestos (presupuesto, plazo, normativa). Los **criterios de aceptación** dicen cuándo se da por bueno: «la masa medida en balanza es ≤ 700 g»." },
    ], undefined, "stack"),
    slide("medible", "Preferencia frente a requisito verificable", [
      { kind: "rule", title: "Un requisito verificable tiene tres partes", text: "Magnitud + valor límite + forma de comprobarlo.", formula: "\\underbrace{\\text{masa}}_{\\text{magnitud}}\\ \\le\\ \\underbrace{700\\ \\text{g}}_{\\text{límite}}\\ \\text{(pesada en balanza)}" },
      { kind: "compare",
        left: { title: "Ambiguo", text: "«Ligero», «resistente», «barato», «cómodo».", tone: "warn" },
        right: { title: "Medible", text: "«≤ 700 g», «soporta 8 kg sin deformación permanente», «≤ 25 €», «ángulo ajustable entre 15° y 45°».", tone: "ok" } },
    ]),
    slide("ficha", "Ficha de requisitos con cumplimiento", [
      { kind: "text", text: "Cambia las medidas del prototipo y mira cuántos requisitos se cumplen. Observa la fila de abajo: una **preferencia** no se puede marcar como cumplida porque no tiene umbral." },
    ], tool("requisitos-verificables-explorador"), "visual-top"),
    slide("ejemplo", "Ejemplo: convertir una necesidad ambigua", [
      { kind: "text", text: "Necesidad: «un soporte portátil para el portátil que sea ligero y resistente»." },
      { kind: "example", title: "Traducción a requisitos", lines: [
        { math: "\\text{ligero}\\ \\to\\ m \\le 700\\ \\text{g}", note: "balanza del taller" },
        { math: "\\text{resistente}\\ \\to\\ F \\ge 8\\ \\text{kg} \\cdot 9{,}8 = 78{,}4\\ \\text{N}", note: "sin deformación permanente" },
        { math: "\\text{portátil}\\ \\to\\ \\text{plegado} \\le 30\\times 5\\ \\text{cm}", note: "caber en la mochila" },
      ] },
    ]),
    sort("clasifica-req", "¿Verificable o preferencia?", "Clasifica cada enunciado.",
      [["ver", "Requisito verificable", "emerald"], ["pref", "Preferencia / ambiguo", "amber"]],
      [["La altura se regula entre 15 y 45 cm", "ver"], ["Pesa como máximo 700 g", "ver"], ["Coste de materiales ≤ 25 €", "ver"], ["Tiene que ser bonito", "pref"], ["Debe ser muy resistente", "pref"], ["Que se sienta de buena calidad", "pref"]],
      "Si hay magnitud, límite y manera de medir, es verificable. «Bonito», «muy resistente» o «buena calidad» necesitan traducirse a medidas.",
    ),
    calc("calc-fuerza", "De kilos a newtons", "Un requisito dice que el soporte debe aguantar $8$ kg. ¿Qué fuerza es esa en newtons? (usa $g = 9{,}8\\ \\text{m/s}^2$)",
      nums("78.4", "78,4"), "$F = m\\cdot g = 8\\cdot 9{,}8 = 78{,}4$ N. Los requisitos mecánicos se expresan en N, no en kg, para poder calcular con ellos.", "Fuerza = masa × gravedad."),
    pick("check-criterio", "Criterio de aceptación", "¿Cuál de estos es un criterio de aceptación bien formulado para una mochila?",
      "Soporta 10 kg durante 5 minutos sin rotura de costuras ni deformación visible",
      [["Que aguante mucho peso", "«Mucho» no tiene valor ni tiempo."], ["Que sea mejor que las de la competencia", "No indica con qué medida se compara."], ["Que a los usuarios les guste", "Es una preferencia; haría falta, por ejemplo, una encuesta con umbral."]],
      "Un buen criterio fija la magnitud, el valor, las condiciones y se puede repetir como ensayo.",
    ),
  ],
};
