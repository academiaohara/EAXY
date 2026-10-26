import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const eficienciaAhorroHogar3esoLesson: InteractiveLesson = {
  slug: "eficiencia-ahorro-hogar-3eso",
  title: "5. Eficiencia energética y ahorro en el hogar",
  subtitle: TECESO3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Hacer lo mismo con menos energía", [
      { kind: "steps", items: [
        "**Eficiencia**: obtener el mismo servicio (luz, calor, frío) consumiendo menos energía.",
        "La **etiqueta energética** clasifica los aparatos de la A (más eficiente) a la G.",
        "Las **bombillas LED** consumen un 80 % menos que las incandescentes.",
        "El **consumo en espera** (stand-by) puede ser el 5–10 % de la factura.",
        "Las **tecnologías domóticas** (termostatos, sensores, programadores) ajustan el uso a la necesidad.",
      ] },
    ], undefined, "stack"),
    slide("factura", "Lee tu factura", [
      { kind: "text", text: "La factura combina potencia contratada y energía consumida. Calcula y compara." },
    ], tool("eso2-factura-explorador"), "visual-top"),
    slide("consumo", "Tus aparatos", [
      { kind: "text", text: "Estima qué aparatos consumen más y qué ahorrarías al cambiarlos." },
    ], tool("consumo-energia-explorador"), "visual-top"),
    slide("domo", "Automatiza para ahorrar", [
      { kind: "text", text: "Un sistema de control puede apagar la luz o bajar la calefacción cuando no hace falta. Es el lazo de control de 3.º: sensor, comparador y actuador." },
    ], tool("eso3-lazo-control-explorador"), "visual-top"),
    calc("calc-led", "Ahorro con LED", "Una bombilla incandescente de 60 W se sustituye por un LED de 9 W y está encendida 4 h al día. ¿Cuántos kWh ahorra al año? ((60 − 9) · 4 · 365 / 1 000, redondea a un entero)", nums(74, 74.5), "51 · 4 · 365 / 1 000 = 74,46 kWh.", "Diferencia de potencia por horas al año, entre 1 000."),
    calc("calc-euros", "Ahorro en euros", "Con ese ahorro de 74 kWh y un precio de 0,20 €/kWh, ¿cuántos euros ahorras al año? (redondea a un entero)", nums(15, 14.9), "74,5 · 0,20 ≈ 14,9 € ≈ 15 €.", "Energía por precio."),
    sort("clasifica-ahorro", "¿Qué medida es?", "Clasifica cada medida de ahorro.",
      [["hab", "Hábito", "emerald"], ["equ", "Equipo eficiente", "cobalt"], ["env", "Mejora de la vivienda", "amber"]],
      [["Apagar la luz al salir", "hab"], ["Desenchufar cargadores", "hab"], ["Lavadora clase A", "equ"], ["Bombillas LED", "equ"], ["Doble acristalamiento", "env"], ["Aislar la cubierta", "env"]],
      "Los hábitos son gratis; los equipos y la envolvente son inversiones.",
    ),
    pick("check-ef", "Eficiencia o ahorro", "Sustituir una bombilla halógena por una LED para dar la misma luz, ¿es?",
      "Eficiencia: mismo servicio con menos energía",
      [["Ahorro por privarse de luz", "Sigue habiendo la misma luz."], ["Más consumo", "Consume menos."], ["Generación renovable", "No genera energía."]],
      "La eficiencia no sacrifica el servicio.",
    ),
  ],
};
