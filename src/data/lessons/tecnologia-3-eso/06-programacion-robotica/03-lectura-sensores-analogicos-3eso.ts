import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const lecturaSensoresAnalogicos3esoLesson: InteractiveLesson = {
  slug: "lectura-sensores-analogicos-3eso",
  title: "3. Leer sensores analógicos",
  subtitle: TECESO3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la tensión a un número", [
      { kind: "steps", items: [
        "Los pines **analógicos** (A0, A1…) tienen un ADC de **10 bits**: valores de **0 a 1023**.",
        "«analogRead(A0)» devuelve ese número: 0 equivale a 0 V y 1023, a 5 V.",
        "Para usar el dato hay que **convertirlo** a la magnitud real (tensión, temperatura, porcentaje).",
        "La función «map(v, a, b, c, d)» reescala un valor del rango [a, b] al rango [c, d].",
      ] },
    ], undefined, "stack"),
    slide("explora", "Del número a la magnitud", [
      { kind: "text", text: "Mueve el valor leído y observa la tensión, la temperatura de un sensor lineal y el reescalado con map()." },
    ], tool("eso3-lectura-analogica-explorador"), "visual-top"),
    slide("umbral", "Tomar decisiones con un umbral", [
      { kind: "example", title: "Luz automática", lines: [
        { math: "valor \\leftarrow analogRead(A0)" },
        { math: "si\\ valor < 300\\ \\rightarrow\\ encender\\ LED", note: "300 es el umbral de oscuridad." },
      ] },
      { kind: "text", text: "Se elige el umbral probando con la luz real; se mide primero con la consola serie." },
    ]),
    calc("calc-v", "Valor a tensión", "analogRead devuelve 512 en un ADC de 10 bits con 5 V. ¿Cuántos V hay en el pin? (redondea a un decimal)", nums(2.5), "512 · 5 / 1 023 ≈ 2,5 V.", "Tensión = lectura · 5 / 1 023."),
    calc("calc-temp", "Temperatura", "Un sensor de 10 mV por °C da 0,25 V. ¿Qué temperatura mide, en °C?", nums(25), "0,25 V / 0,010 V/°C = 25 °C.", "Divide la tensión entre 0,01 V por grado."),
    calc("calc-map", "map()", "map(512, 0, 1023, 0, 180) reescala la lectura a un ángulo. ¿Qué ángulo da (redondea a un entero)?", nums(90), "512 / 1 023 · 180 ≈ 90°.", "Es casi la mitad del rango."),
    sort("clasifica-sensor", "Analógico o digital", "¿Qué tipo de lectura necesita cada sensor?",
      [["ana", "analogRead", "amber"], ["dig", "digitalRead", "cobalt"]],
      [["LDR (cantidad de luz)", "ana"], ["Sensor de temperatura LM35", "ana"], ["Potenciómetro", "ana"], ["Pulsador", "dig"], ["Final de carrera", "dig"], ["Sensor PIR (hay o no hay movimiento)", "dig"]],
      "Si la magnitud varía de forma continua, se lee con analogRead.",
    ),
    pick("check-rango", "El rango", "¿Cuál es el valor máximo que devuelve analogRead en un ADC de 10 bits?",
      "1023",
      [["1024", "Van de 0 a 1023."], ["255", "Eso es de 8 bits."], ["5", "Eso es la tensión máxima."]],
      "Con 10 bits hay 1 024 valores, de 0 a 1 023.",
    ),
  ],
};
