import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sensoresActuadoresSistema4esoLesson: InteractiveLesson = {
  slug: "sensores-actuadores-sistema-4eso",
  title: "8. Sensores y actuadores en un sistema electrónico",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Entradas y salidas", [
      { kind: "compare",
        left: { title: "Sensores (entradas)", text: "Convierten una magnitud física en una señal eléctrica: **LDR** (luz), **NTC** (temperatura), **PIR** (movimiento), **ultrasonidos** (distancia), **final de carrera** (contacto).", tone: "info" },
        right: { title: "Actuadores (salidas)", text: "Convierten una señal eléctrica en una acción: **LED**, **zumbador**, **motor**, **servo**, **relé**, **electroválvula**.", tone: "key" } },
    ]),
    slide("sensor", "Un sensor analógico", [
      { kind: "text", text: "Un sensor resistivo se lee con un divisor de tensión. Cambia el estímulo y observa la tensión." },
    ], tool("eso3-sensor-divisor-explorador"), "visual-top"),
    slide("adc", "Del analógico al digital", [
      { kind: "text", text: "Un microcontrolador solo entiende números: un conversor ADC convierte la tensión en un valor." },
    ], tool("eso3-conversor-adc-explorador"), "visual-top"),
    slide("acond", "Acondicionar la señal", [
      { kind: "steps", items: [
        "Un sensor puede dar **señales muy pequeñas** o fuera de rango: se **amplifica** y se **filtra**.",
        "Un **comparador** convierte una señal analógica en digital con un **umbral**.",
        "Un **actuador de potencia** necesita una **etapa de potencia**: transistor o relé, y una fuente adecuada.",
        "Se debe **calibrar** el sensor y **documentar** el rango y las unidades.",
      ] },
    ]),
    calc("calc-div", "Divisor de tensión", "Un LDR de 10 kΩ en serie con una resistencia de 10 kΩ y 5 V. ¿Qué tensión hay en la resistencia fija, en V?", nums(2.5), "5 · 10 / 20 = 2,5 V.", "Divisor: Vout = Vin · R2 / (R1+R2)."),
    calc("calc-adc", "Valor digital", "Un ADC de 10 bits (0–1 023) mide 2,5 V con referencia de 5 V. ¿Qué valor da, aproximadamente?", nums(512, 511.5), "2,5 / 5 · 1 023 ≈ 511,5 ≈ 512.", "Regla de tres con 1 023."),
    sort("clasifica-sa", "Sensor o actuador", "Clasifica cada dispositivo.",
      [["sen", "Sensor", "cobalt"], ["act", "Actuador", "amber"]],
      [["LDR", "sen"], ["Sensor de ultrasonidos", "sen"], ["Final de carrera", "sen"], ["Servomotor", "act"], ["Relé", "act"], ["Zumbador", "act"]],
      "Los sensores miden; los actuadores actúan.",
    ),
    pick("check-pot", "Etapa de potencia", "¿Por qué un microcontrolador no suele conectar un motor directamente a un pin?",
      "Porque el pin da muy poca corriente y hace falta una etapa de potencia (transistor o driver)",
      [["Porque el motor no funciona con 5 V", "Algunos sí."], ["Porque el pin da demasiada corriente", "Da muy poca."], ["Porque está prohibido", "Es una limitación eléctrica."]],
      "Un pin típico da unos 20 mA; un motor necesita cientos.",
    ),
  ],
};
