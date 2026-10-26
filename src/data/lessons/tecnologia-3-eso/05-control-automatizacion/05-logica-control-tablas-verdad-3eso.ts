import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const logicaControlTablasVerdad3esoLesson: InteractiveLesson = {
  slug: "logica-control-tablas-verdad-3eso",
  title: "5. Lógica de control: del enunciado a la tabla de verdad",
  subtitle: TECESO3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Traducir un problema", [
      { kind: "steps", items: [
        "**1.** Identifica las **entradas** (sensores, pulsadores) y las **salidas**.",
        "**2.** Escribe el **enunciado** con condiciones («suena si está armada y se abre una puerta o ventana»).",
        "**3.** Traduce a **lógica**: «y» = AND, «o» = OR, «no» = NOT.",
        "**4.** Construye la **tabla de verdad** y **comprueba** todos los casos.",
        "**5.** Impleméntalo con **puertas**, un **circuito** o un **programa**.",
      ] },
    ], undefined, "stack"),
    slide("alarma", "Una alarma doméstica", [
      { kind: "text", text: "La sirena suena si la alarma está armada **y** hay puerta, ventana **o** movimiento. Prueba todas las combinaciones." },
    ], tool("eso3-alarma-explorador"), "visual-top"),
    slide("prio", "Prioridad y paréntesis", [
      { kind: "text", text: "Igual que en matemáticas, los paréntesis deciden el orden. «A Y (B O C)» no es lo mismo que «(A Y B) O C»: revisa siempre qué se agrupa." },
    ]),
    calc("calc-8", "Filas de la tabla", "Un sistema con 4 entradas, ¿cuántas filas tiene su tabla de verdad? (2⁴)", nums(16), "2⁴ = 16 combinaciones.", "2 elevado al número de entradas."),
    calc("calc-suena", "Casos en que suena", "En la alarma de la actividad (armada Y (puerta O ventana O movimiento)), ¿en cuántas de las 16 combinaciones suena la sirena?", nums(7), "Debe estar armada (8 combinaciones) y no todos los sensores en 0: 8 − 1 = 7.", "Armada = 1 y al menos un sensor en 1."),
    sort("clasifica-cond", "«Y» u «O»", "Elige la puerta que traduce cada condición.",
      [["and", "AND («y»)", "cobalt"], ["or", "OR («o»)", "amber"]],
      [["El motor arranca si hay corriente y la puerta está cerrada", "and"], ["La luz se enciende si es de noche y hay movimiento", "and"], ["El pulsador de emergencia y el seguro están activados", "and"], ["La alarma suena si se abre la puerta o la ventana", "or"], ["La ventilación se activa si hace calor o hay humo", "or"], ["Se llama al ascensor desde el piso 1 o el piso 2", "or"]],
      "«Y» exige todas las condiciones; «o» basta con una.",
    ),
    pick("check-expr", "Expresión correcta", "Un ventilador debe funcionar si la temperatura es alta O hay humo, pero solo si el sistema está encendido. ¿Cuál es la expresión?",
      "Encendido Y (Temperatura alta O Humo)",
      [["Encendido O Temperatura alta O Humo", "Funcionaría aunque estuviera apagado."], ["Encendido Y Temperatura alta Y Humo", "Exige las dos condiciones."], ["Temperatura alta Y Humo", "Ignora el estado del sistema."]],
      "Los paréntesis agrupan el «o» antes de aplicar el «y» con el encendido.",
    ),
  ],
};
