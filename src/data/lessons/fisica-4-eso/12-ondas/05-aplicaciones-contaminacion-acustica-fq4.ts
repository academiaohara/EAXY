import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const aplicacionesContaminacionAcusticaFq4Lesson: InteractiveLesson = {
  slug: "aplicaciones-contaminacion-acustica-fq4",
  title: "5. Aplicaciones y contaminación acústica",
  subtitle: FQ4_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("apl", "Aplicaciones de las ondas", [
      { kind: "steps", items: [
        "**Comunicaciones**: radio, televisión, telefonía móvil y wifi usan ondas electromagnéticas (radio y microondas); la **fibra óptica** transmite datos con luz mediante reflexión total.",
        "**Medicina**: **ecografías** (ultrasonidos), **radiografías** (rayos X), **radioterapia** (rayos gamma), endoscopios.",
        "**Medida y exploración**: **sonar** (barcos), **radar** (aviones), **GPS**, sismología para estudiar el interior de la Tierra.",
        "**Energía**: paneles solares, microondas domésticos, energía de las olas.",
      ] },
    ], undefined, "stack"),
    slide("ruido", "Qué es la contaminación acústica", [
      { kind: "steps", items: [
        "El **ruido** es un sonido no deseado. Se habla de **contaminación acústica** cuando es excesivo y perjudica a la salud o al medio ambiente.",
        "El nivel se mide en **decibelios (dB)**, una escala **logarítmica**: **+10 dB = 10 veces** más intensidad; **+3 dB = el doble**.",
        "Fuentes: **tráfico**, obras, industria, ocio nocturno, aeropuertos y el uso de auriculares a gran volumen.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cuánto ruido es demasiado", [
      { kind: "text", text: "Sube el nivel sonoro y mira el tiempo máximo de exposición diaria. ¿Qué ocurre cada vez que aumentas 3 dB?" },
    ], tool("fq4-contaminacion-acustica-explorador"), "visual-top"),
    slide("efectos", "Efectos y soluciones", [
      { kind: "steps", items: [
        "**Efectos**: pérdida de audición (irreversible por encima de 85 dB mantenidos), estrés, insomnio, problemas cardiovasculares y bajo rendimiento escolar.",
        "**Soluciones**: **aislamiento acústico** (doble ventana, materiales absorbentes), **pantallas acústicas** en las carreteras, asfaltos silenciosos y **normativa** de límites de ruido.",
        "**Hábitos**: bajar el volumen de los auriculares (regla del 60/60: máximo 60 % del volumen, 60 minutos), respetar el descanso, evitar el ruido innecesario.",
      ] },
    ], undefined, "stack"),
    calc("calc-dist", "Doble distancia", "Si se duplica la distancia a una fuente puntual, el nivel sonoro disminuye aproximadamente… (en dB)", nums(6), "Al duplicar la distancia, baja ≈ 6 dB.", "20·log₁₀(2) ≈ 6."),
    calc("calc-sum", "Intensidad", "Un sonido sube de 60 dB a 80 dB. ¿Cuántas veces mayor es su intensidad?", nums(100), "20 dB = 2·10 dB → 10² = 100 veces.", "Cada +10 dB multiplica por 10."),
    calc("calc-tiempo", "Tiempo de exposición", "Con 85 dB se tolera 8 h al día; con +3 dB, la mitad. ¿Cuántas horas se tolera a 91 dB?", nums(2), "91 dB = 85 + 6: 8/2/2 = 2 h.", "Cada 3 dB, mitad de tiempo."),
    sort("clasifica", "¿Es peligroso?", "Indica si el nivel es seguro o peligroso con exposición prolongada.",
      [["seg", "Seguro", "emerald"], ["pel", "Peligroso", "rose"]],
      [["Una conversación (60 dB)", "seg"], ["Una biblioteca (35 dB)", "seg"], ["Una discoteca (110 dB)", "pel"], ["Auriculares a tope (100 dB)", "pel"], ["Tráfico denso en la calle (≈ 90 dB)", "pel"], ["Una oficina tranquila (50 dB)", "seg"]],
      "A partir de 85 dB mantenidos hay riesgo para el oído.",
    ),
    pick("check", "Escala de decibelios", "¿Cuántas veces más intensidad tiene un sonido de 90 dB frente a uno de 80 dB?",
      "10 veces más",
      [["Un 12,5 % más", "La escala es logarítmica."], ["Dos veces más", "+3 dB duplican; +10 dB, ×10."], ["Igual", "La diferencia es notable."]],
      "+10 dB = × 10 de intensidad.",
    ),
  ],
};
