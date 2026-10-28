import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const proyectoLuzAutomatica3esoLesson: InteractiveLesson = {
  slug: "proyecto-luz-automatica-3eso",
  title: "9. Mini proyecto: luz automática nocturna",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("plan", "Un circuito que usa todo lo visto", [
      { kind: "definition", text: "Diseñaremos una **luz que se enciende sola al anochecer**: un **sensor de luz** (LDR) con un **potenciómetro** forma un divisor de tensión; un **transistor** activa un **LED** (con su resistencia limitadora)." },
      { kind: "steps", items: [
        "**Entrada**: LDR + potenciómetro (divisor de tensión).",
        "**Proceso**: el transistor conduce si la base supera 0,7 V.",
        "**Salida**: LED con resistencia en serie.",
        "**Alimentación**: una pila de 5 V (o 4 pilas AA de 1,5 V).",
      ] },
    ], undefined, "stack"),
    slide("simula", "Pruébalo", [
      { kind: "text", text: "Cambia la luz ambiente y ajusta el potenciómetro para decidir a qué nivel se enciende." },
    ], tool("eso3-luz-automatica-explorador"), "visual-top"),
    slide("pasos", "Del esquema a la realidad", [
      { kind: "steps", items: [
        "Dibuja el **esquema** con los símbolos normalizados.",
        "Calcula la **resistencia del LED** (por ejemplo, 330 Ω para un LED rojo a 5 V y unos 9 mA).",
        "**Simula** y ajusta el potenciómetro.",
        "**Monta** en la protoboard y **mide** las tensiones con el polímetro.",
        "Haz una **tabla de pruebas** (luz, tensión de base, LED) y documenta el resultado.",
      ] },
    ]),
    calc("calc-vb", "Tensión de base", "LDR y potenciómetro valen 10 kΩ cada uno, con Vcc = 5 V y la LDR en la parte baja del divisor. ¿Cuántos V hay en la base?", nums(2.5), "Vb = 5 · 10 / (10 + 10) = 2,5 V.", "Divisor con resistencias iguales."),
    calc("calc-enc", "¿Se enciende?", "Con esos 2,5 V en la base y un umbral de 0,7 V, ¿el LED se enciende (1) o no (0)?", nums(1), "2,5 V ≥ 0,7 V: el transistor conduce y el LED se enciende (1).", "Compara con 0,7 V."),
    sort("clasifica-bloque", "¿Entrada, proceso o salida?", "Clasifica cada componente del sistema.",
      [["ent", "Entrada", "cobalt"], ["pro", "Proceso", "amber"], ["sal", "Salida", "emerald"]],
      [["LDR", "ent"], ["Potenciómetro de ajuste", "ent"], ["Transistor", "pro"], ["Divisor de tensión", "pro"], ["LED", "sal"], ["Resistencia limitadora del LED", "sal"]],
      "Todo sistema de control se organiza en entradas, proceso y salidas.",
    ),
    pick("check-umbral", "Ajustar la sensibilidad", "Quieres que la luz se encienda solo cuando esté muy oscuro. ¿Qué haces con el potenciómetro?",
      "Subir su resistencia para que solo con muy poca luz la tensión de la base llegue a 0,7 V",
      [["Bajar su resistencia a cero", "Se encendería con mucha luz."], ["Quitarlo", "Perdería el ajuste."], ["No influye", "Fija el umbral del divisor."]],
      "El potenciómetro desplaza el umbral de luz en el que el transistor conduce.",
    ),
  ],
};
