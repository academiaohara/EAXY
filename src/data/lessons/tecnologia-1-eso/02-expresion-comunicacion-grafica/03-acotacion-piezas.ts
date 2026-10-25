import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const acotacionPiezasLesson: InteractiveLesson = {
  slug: "acotacion-piezas",
  title: "3. Acotación de piezas",
  subtitle: TECESO1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Acotar es dar las medidas", [
      { kind: "definition", text: "**Acotar** es escribir en el dibujo todas las medidas necesarias para fabricar la pieza. Cada medida se llama **cota**." },
      { kind: "steps", items: [
        "**Línea de cota**: fina, con una flecha en cada extremo; señala la medida.",
        "**Líneas auxiliares** (o de referencia): finas, salen de la pieza y limitan la línea de cota.",
        "**Cifra**: la medida en milímetros, sin escribir la unidad, encima de la línea de cota.",
        "**Símbolos**: Ø para el diámetro y R para el radio.",
      ] },
    ], undefined, "stack"),
    slide("pasos", "Cómo se acota una pieza", [
      { kind: "text", text: "Fíjate en el orden: líneas auxiliares, línea de cota, flechas y cifra. Después se acotan los agujeros." },
    ], anim("acotar-pieza-pasos"), "split"),
    slide("normas", "Normas de acotación", [
      { kind: "steps", items: [
        "**Cada medida, una sola vez**: no se repiten cotas.",
        "No acotar **dentro** de la pieza si se puede evitar, ni cruzar las líneas de cota entre sí.",
        "Poner las cotas **más pequeñas cerca** de la pieza y las mayores más lejos.",
        "Escribir las cifras **legibles**: horizontales o girando el dibujo hacia la derecha.",
        "Acotar siempre **las medidas reales**, aunque el dibujo esté a escala.",
      ] },
    ]),
    slide("explora", "Pieza bien y mal acotada", [
      { kind: "text", text: "Cambia el modo de acotación y las dimensiones. Mira qué ocurre con las cotas repetidas." },
    ], tool("acotacion-explorador", { a: 100, b: 60, c: 12 }), "visual-top"),
    sort("clasifica-cota", "Elementos de la acotación", "Clasifica cada elemento: ¿es línea de cota, línea auxiliar o cifra/símbolo?",
      [["cot", "Línea de cota", "amber"], ["aux", "Línea auxiliar", "cobalt"], ["cif", "Cifra o símbolo", "emerald"]],
      [["Línea fina con flechas en los extremos", "cot"], ["Se dibuja entre las dos líneas auxiliares", "cot"], ["Sale del contorno de la pieza sin tocarlo", "aux"], ["Marca dónde empieza y acaba la medida", "aux"], ["Ø 24", "cif"], ["R 15", "cif"], ["100", "cif"]],
      "La línea de cota lleva flechas; las auxiliares la limitan; la cifra (con Ø o R si hace falta) dice cuánto mide.",
    ),
    calc("calc-cota", "Medida de un agujero", "El taladro de un agujero tiene 12 mm de radio. ¿Qué cifra escribes tras el símbolo Ø de su diámetro?",
      nums(24), "El diámetro es el doble del radio: Ø = 2 × 12 mm = 24 mm.", "El diámetro es el doble del radio."),
    pick("check-repetida", "Una cota repetida", "Una pieza mide 100 mm de largo en total. Tiene dos tramos acotados de 30 y 70 mm. ¿Qué haces con la cota de 100?",
      "Quitarla: se obtiene sumando 30 + 70, así que está repetida",
      [["Dejarla, así hay más información", "Repetir cotas puede provocar contradicciones si se cambia solo una."], ["Cambiarla por 130", "El largo total sí es 100; el problema es que sobra."], ["Quitar las dos cotas parciales", "Entonces faltaría saber dónde está el agujero."]],
      "Cada medida se escribe una sola vez; el total se deduce de las parciales (o al revés).",
    ),
  ],
};
