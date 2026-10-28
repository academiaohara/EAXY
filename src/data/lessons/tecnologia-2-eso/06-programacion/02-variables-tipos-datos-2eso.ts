import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const variablesTiposDatos2esoLesson: InteractiveLesson = {
  slug: "variables-tipos-datos-2eso",
  title: "2. Variables y tipos de datos",
  subtitle: TECESO2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("var", "Una variable es una caja con nombre", [
      { kind: "text", text: "Una **variable** guarda un dato en la memoria del ordenador con un **nombre** que elegimos." },
    ], anim("variable-caja"), "text-top"),
    slide("tipos", "Tipos de datos", [
      { kind: "steps", items: [
        "**Entero**: números sin decimales (7, −3, 120).",
        "**Decimal** (real): números con decimales (2,5; 3,14).",
        "**Texto** (cadena): letras y símbolos entre comillas («hola», «7»).",
        "**Booleano**: solo dos valores, **verdadero** o **falso**.",
        "El **tipo** decide qué operaciones se pueden hacer con el dato.",
      ] },
      { kind: "warning", title: "Cuidado", text: "El número 7 y el texto «7» no son lo mismo: con números, 7 + 7 = 14; con textos, «7» + «7» = «77»." },
    ]),
    slide("explora", "Combina datos de distinto tipo", [
      { kind: "text", text: "Prueba a sumar y comparar datos. Observa cuándo el resultado es un número, un texto o un error." },
    ], tool("eso2-tipos-datos-explorador"), "visual-top"),
    slide("nombres", "Buenos nombres de variable", [
      { kind: "steps", items: [
        "Descriptivos: **edad**, **precio_total**, **nota_final**.",
        "Sin espacios ni tildes; se suele usar **guion bajo** o mayúscula intermedia.",
        "Nunca una palabra reservada del lenguaje (como «si» o «mientras»).",
        "Una variable puede **cambiar de valor** durante el programa: `contador ← contador + 1`.",
      ] },
    ]),
    calc("calc-var", "Seguir una variable", "contador ← 5; después contador ← contador + 3; después contador ← contador · 2. ¿Qué vale contador al final?", nums(16), "5 → 8 → 16.", "Aplica cada asignación en orden."),
    sort("clasifica-tipo", "¿De qué tipo es?", "Clasifica cada dato por su tipo.",
      [["ent", "Entero", "cobalt"], ["dec", "Decimal", "amber"], ["tex", "Texto", "emerald"], ["boo", "Booleano", "violet"]],
      [["42", "ent"], ["−7", "ent"], ["3,14", "dec"], ["0,5", "dec"], ["«Ana»", "tex"], ["«2025»", "tex"], ["verdadero", "boo"], ["falso", "boo"]],
      "Lo que va entre comillas es texto aunque parezca un número; los booleanos solo son verdadero o falso.",
    ),
    pick("check-tipo", "Un error de tipos", "¿Qué ocurre si se intenta sumar el número 5 y el texto «hola»?",
      "Error: no se pueden sumar tipos distintos sin convertir antes",
      [["Da 5hola", "Eso sería unir textos, no sumar un número y un texto."], ["Da 5", "El texto no se ignora."], ["Da 0", "No hay una operación definida."]],
      "Hay que convertir los datos al mismo tipo antes de operar con ellos.",
    ),
  ],
};
