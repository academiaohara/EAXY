import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const resultanteEquilibrioFq2Lesson: InteractiveLesson = {
  slug: "resultante-equilibrio-fq2",
  title: "5. Resultante y equilibrio de fuerzas",
  subtitle: FQ2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Varias fuerzas a la vez", [
      { kind: "steps", items: [
        "Sobre un cuerpo suelen actuar **varias fuerzas** a la vez.",
        "Su efecto conjunto es el de **una sola fuerza**, la **resultante** (o fuerza neta).",
        "Si las fuerzas tienen la **misma dirección y sentido**, la resultante es su **suma**.",
        "Si tienen **sentidos opuestos**, la resultante es su **diferencia** y apunta en el sentido de la mayor.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Sumar y restar fuerzas", [
      { kind: "text", text: "Mira cómo se calcula la resultante en cuatro casos y cuándo hay equilibrio." },
    ], anim("fq2-fuerzas-resultante"), "visual-top"),
    slide("explora", "Dos fuerzas opuestas", [
      { kind: "text", text: "Cambia las dos fuerzas y busca cuándo la resultante es cero." },
    ], tool("fq2-equilibrio-fuerzas-explorador"), "visual-top"),
    slide("inercia", "Equilibrio e inercia", [
      { kind: "steps", items: [
        "Si la **resultante es cero**, las fuerzas están en **equilibrio**.",
        "Un cuerpo en equilibrio **no cambia su velocidad**: si estaba parado, sigue parado; si se movía, sigue con **velocidad constante** en línea recta.",
        "Es la **primera ley de Newton** o **ley de la inercia**.",
        "Si la resultante **no es cero**, el cuerpo **cambia su velocidad** (acelera, frena o cambia de dirección).",
      ] },
    ]),
    calc("calc-sum", "Mismo sentido", "Dos personas empujan una caja en el mismo sentido con 120 N y 80 N. ¿Cuánto vale la resultante, en N?", nums(200), "120 + 80 = 200 N.", "Se suman."),
    calc("calc-res", "Sentidos opuestos", "En una pelea de cuerda, un equipo tira con 500 N y el otro con 450 N. ¿Cuánto vale la resultante, en N?", nums(50), "500 − 450 = 50 N hacia el equipo más fuerte.", "Se restan."),
    calc("calc-eq", "Equilibrio", "Un cuerpo está en equilibrio con dos fuerzas opuestas. Si una es de 35 N, ¿cuánto vale la otra, en N?", nums(35), "Para que la resultante sea cero, deben ser iguales.", "Misma intensidad."),
    sort("clasifica", "¿Hay equilibrio?", "Clasifica cada situación (fuerzas en la misma recta).",
      [["eq", "Equilibrio (R = 0)", "cobalt"], ["no", "No hay equilibrio (R ≠ 0)", "amber"]],
      [["40 N hacia la derecha y 40 N hacia la izquierda", "eq"], ["Un libro quieto sobre una mesa", "eq"], ["Un paracaidista que cae a velocidad constante", "eq"], ["50 N a la derecha y 30 N a la izquierda", "no"], ["Un coche que arranca", "no"], ["Una piedra que cae acelerando", "no"]],
      "Equilibrio: las fuerzas se compensan y la velocidad no cambia.",
    ),
    pick("check", "Inercia", "Un bloque se desliza con velocidad constante sobre hielo sin rozamiento. ¿Qué fuerza neta actúa sobre él?",
      "Ninguna (resultante cero)",
      [["Una fuerza hacia delante", "No hace falta fuerza para mantener la velocidad."], ["Una fuerza hacia atrás", "No hay rozamiento."], ["Su peso", "El peso se equilibra con la normal."]],
      "Sin fuerza neta, un cuerpo mantiene su velocidad: ley de la inercia.",
    ),
  ],
};
