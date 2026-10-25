import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const senalesAnalogicasDigitalesLesson: InteractiveLesson = {
  slug: "senales-analogicas-digitales",
  title: "6. Señales analógicas y digitales",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "Continua o discreta", [
      { kind: "compare",
        left: { title: "Señal analógica", text: "Toma **cualquier valor** dentro de un rango y varía de forma continua: la tensión de un micrófono, de un sensor de temperatura.", tone: "info" },
        right: { title: "Señal digital", text: "Toma **valores discretos** (normalmente solo dos, 0 y 1): un pulsador, la salida de un comparador.", tone: "key" } },
      { kind: "steps", title: "Niveles lógicos", items: [
        "En un sistema de 5 V, una tensión por debajo de ~1,5 V se lee como **0 (bajo)**.",
        "Por encima de ~3,5 V se lee como **1 (alto)**.",
        "La zona intermedia es **indefinida**: puede leerse de cualquier forma. Hay que evitarla.",
      ] },
    ], anim("senal-analogica-digital"), "split"),
    slide("adc", "Conversión analógico-digital", [
      { kind: "text", text: "Un **conversor A/D** mide la tensión y la convierte en un número entero. Con $n$ bits hay $2^n$ niveles; cuantos más bits, más resolución. Mueve el valor y cambia los bits." },
      { kind: "formula", tex: "\\text{resolución} = \\dfrac{V_{\\text{fondo de escala}}}{2^n}" },
    ], tool("cuantizacion-ad-explorador", { a: 35, b: 3 }), "split"),
    slide("ruido", "Umbral, ruido e histéresis", [
      { kind: "text", text: "Una señal real lleva **ruido**. Si se compara con un único umbral, el ruido provoca cambios espurios cerca del umbral. Experimenta con el ruido y con la banda de histéresis." },
    ], tool("senal-umbral-explorador", { a: 2, b: 2, c: 0.1 }), "visual-top"),
    slide("hist", "Cómo funciona la histéresis", [
      { kind: "text", text: "En vez de un umbral hay **dos**: uno para pasar de 0 a 1 y otro, más bajo, para volver de 1 a 0. Una vez cambiado el estado, el ruido ya no alcanza el otro umbral." },
    ], anim("histeresis-comparador"), "split"),
    calc("calc-resol", "Resolución de un conversor", "Un conversor A/D de $10$ bits mide de $0$ a $5$ V. ¿Cuál es su resolución aproximada, en mV? (1 decimal)",
      nums(4.9, 4.89, 4.88), "$5\\ \\text{V}/1024 \\approx 4{,}9$ mV por nivel.", "Divide el rango entre 2¹⁰."),
    calc("calc-niveles", "Número de niveles", "¿Cuántos niveles distintos distingue un conversor de $8$ bits?",
      nums(256), "$2^8 = 256$ niveles.", "2 elevado al número de bits."),
    sort("clasifica-senal", "Analógica o digital", "Clasifica cada señal.",
      [["ana", "Analógica", "cobalt"], ["dig", "Digital", "amber"]],
      [["Tensión de un sensor de temperatura", "ana"], ["Señal de un micrófono", "ana"], ["Posición de un potenciómetro", "ana"], ["Estado de un pulsador (0/1)", "dig"], ["Salida de una puerta lógica", "dig"], ["Bits que llegan por un cable de datos", "dig"]],
      "Si puede tomar cualquier valor intermedio, es analógica; si solo hay valores discretos, digital.",
    ),
    pick("check-hist", "Para qué la histéresis", "Un termostato conmuta el relé de la caldera constantemente porque la temperatura oscila alrededor de la consigna. ¿Qué lo soluciona?",
      "Una banda de histéresis: dos umbrales distintos para encender y para apagar",
      [["Subir la temperatura de consigna", "No elimina la oscilación en torno al umbral."], ["Quitar el sensor", "Sin sensor no hay control."], ["Usar un conversor de menos bits", "Menos resolución no resuelve el rebote."]],
      "La histéresis evita las conmutaciones continuas y alarga la vida de relés y contactores.",
    ),
  ],
};
