import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const corrienteContinuaAlterna4esoLesson: InteractiveLesson = {
  slug: "corriente-continua-alterna-4eso",
  title: "1. Corriente continua y corriente alterna",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dos formas de mover cargas", [
      { kind: "compare",
        left: { title: "Corriente continua (CC)", text: "La tensión mantiene **siempre el mismo sentido**. La dan **pilas, baterías, paneles solares** y las fuentes de alimentación. La usa la electrónica.", tone: "info" },
        right: { title: "Corriente alterna (CA)", text: "La tensión **cambia de sentido** periódicamente (senoidal). La produce un **alternador** y llega a casa por la red: **230 V y 50 Hz**.", tone: "key" } },
    ]),
    slide("senal", "La señal alterna", [
      { kind: "text", text: "Una señal alterna se describe con su **tensión de pico**, su **frecuencia** y su **valor eficaz**. Cambia los valores." },
    ], tool("eso4-alterna-explorador"), "visual-top"),
    slide("por-que", "¿Por qué se usa alterna en la red?", [
      { kind: "steps", items: [
        "Con un **transformador** se puede subir la tensión para transportar la energía con **menos pérdidas** (menos corriente) y bajarla en el destino.",
        "Los **alternadores** y los motores de inducción son sencillos y robustos.",
        "Para la electrónica se convierte a continua con una **fuente de alimentación** (tema siguiente).",
      ] },
    ]),
    calc("calc-ef", "Valor eficaz", "Una señal alterna tiene 325 V de pico. ¿Cuál es su valor eficaz, en V? (Vef = Vpico / √2, redondea a un entero)", nums(230, 229.8), "325 / 1,414 ≈ 230 V.", "Divide entre la raíz de 2."),
    calc("calc-T", "Periodo", "La red tiene una frecuencia de 50 Hz. ¿Cuántos ms dura un ciclo? (T = 1/f)", nums(20), "1 / 50 = 0,02 s = 20 ms.", "El periodo es la inversa de la frecuencia."),
    calc("calc-f", "Frecuencia", "Una señal tarda 4 ms en completar un ciclo. ¿Qué frecuencia tiene, en Hz?", nums(250), "1 / 0,004 = 250 Hz.", "La frecuencia es la inversa del periodo."),
    sort("clasifica-cc-ca", "¿Continua o alterna?", "Clasifica cada fuente o uso.",
      [["cc", "Continua", "cobalt"], ["ca", "Alterna", "amber"]],
      [["Pila de 9 V", "cc"], ["Panel solar", "cc"], ["Batería del coche", "cc"], ["Enchufe de casa", "ca"], ["Alternador de una central", "ca"], ["Línea de alta tensión", "ca"]],
      "La electrónica funciona con continua; la red distribuye alterna.",
    ),
    pick("check-ef", "El polímetro", "Un polímetro en CA marca 230 V en el enchufe. ¿Qué valor mide?",
      "El valor eficaz, equivalente a una tensión continua que daría la misma potencia",
      [["El valor de pico (325 V)", "Marca el eficaz."], ["El valor medio, que es 0", "El medio sería cero."], ["El valor mínimo", "No es lo que mide."]],
      "Los aparatos se rotulan con el valor eficaz.",
    ),
  ],
};
