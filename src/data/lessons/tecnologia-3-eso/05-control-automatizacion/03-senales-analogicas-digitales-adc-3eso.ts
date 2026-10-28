import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const senalesAnalogicasDigitalesAdc3esoLesson: InteractiveLesson = {
  slug: "senales-analogicas-digitales-adc-3eso",
  title: "3. Señales analógicas, digitales y conversión",
  subtitle: TECESO3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dos lenguajes", [
      { kind: "compare",
        left: { title: "Señal analógica", text: "Varía de forma **continua**: puede valer cualquier cosa entre 0 y 5 V. Es lo que dan los sensores (luz, temperatura, sonido).", tone: "info" },
        right: { title: "Señal digital", text: "Solo tiene **dos niveles** (alto o bajo, 1 o 0) o grupos de bits. Es lo que entienden las puertas lógicas y los microcontroladores.", tone: "key" } },
    ]),
    slide("adc", "El conversor analógico-digital", [
      { kind: "text", text: "Un **ADC** convierte una tensión en un número. Con **n bits** hay **2ⁿ niveles**. Cambia la tensión y la resolución." },
    ], tool("eso3-conversor-adc-explorador"), "visual-top"),
    slide("dac", "Y al revés", [
      { kind: "steps", items: [
        "Un **DAC** (conversor digital-analógico) convierte un número en una tensión: así suenan los altavoces y se controlan motores.",
        "Muchas placas usan **PWM** (modulación por ancho de pulso): una señal digital que cambia la **proporción de tiempo en alto** para simular valores intermedios.",
        "Con más **bits** y más **muestras por segundo**, la señal digital se parece más a la original.",
      ] },
    ]),
    calc("calc-niveles", "Niveles de un ADC", "Un conversor de 8 bits, ¿cuántos niveles distintos tiene? (2⁸)", nums(256), "2⁸ = 256 niveles.", "Eleva 2 al número de bits."),
    calc("calc-res", "Resolución", "Un ADC de 10 bits mide de 0 a 5 V. ¿Cuántos mV vale cada nivel (aprox., con un decimal)? (5 V / 1 024)", nums(4.9, 4.88), "5 / 1 024 ≈ 0,0049 V ≈ 4,9 mV.", "Tensión máxima entre el número de niveles."),
    calc("calc-2bits", "Pocos bits", "Un ADC de 2 bits, ¿cuántos niveles tiene?", nums(4), "2² = 4 niveles.", "2 elevado a 2."),
    sort("clasifica-senal", "¿Analógica o digital?", "Clasifica cada señal.",
      [["ana", "Analógica", "cobalt"], ["dig", "Digital", "amber"]],
      [["Tensión de una LDR", "ana"], ["Señal de un micrófono", "ana"], ["Temperatura de una NTC", "ana"], ["Un pulsador (abierto o cerrado)", "dig"], ["Salida de una puerta lógica", "dig"], ["Un número de 10 bits", "dig"]],
      "La analógica es continua; la digital tiene valores discretos.",
    ),
    pick("check-bits", "Más bits", "¿Qué ocurre al aumentar los bits de un ADC?",
      "Hay más niveles y la medida es más precisa",
      [["Hay menos niveles", "Aumentan."], ["La medida es menos precisa", "Mejora."], ["No cambia nada", "La resolución depende de los bits."]],
      "Cada bit extra duplica los niveles y reduce el paso de cuantización a la mitad.",
    ),
  ],
};
