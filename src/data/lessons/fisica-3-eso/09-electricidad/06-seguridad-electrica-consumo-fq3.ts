import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadElectricaConsumoFq3Lesson: InteractiveLesson = {
  slug: "seguridad-electrica-consumo-fq3",
  title: "6. Efectos de la corriente, seguridad y uso responsable",
  subtitle: FQ3_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("efectos", "Efectos de la corriente", [
      { kind: "steps", items: [
        "**Térmico** (efecto Joule): el conductor se calienta (estufa, fusible).",
        "**Luminoso**: la corriente produce luz (bombillas, LED).",
        "**Magnético**: crea un campo magnético (electroimanes, timbres, motores).",
        "**Químico**: provoca reacciones (electrólisis, carga de pilas).",
        "**Fisiológico**: sobre el cuerpo humano puede provocar desde hormigueo hasta la muerte.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una descarga", [
      { kind: "text", text: "¿Qué intensidad atraviesa el cuerpo con la piel seca o mojada?" },
    ], tool("fq3-seguridad-electrica-explorador"), "visual-top"),
    slide("prot", "Protecciones", [
      { kind: "steps", items: [
        "**Fusible** y **magnetotérmico**: cortan el circuito si la intensidad es excesiva (cortocircuito o sobrecarga).",
        "**Interruptor diferencial**: corta si detecta una **fuga** (unos 30 mA), protegiendo a las personas.",
        "**Toma de tierra**: lleva a tierra las fugas de la carcasa de los aparatos.",
        "**Aislantes**: los cables se recubren de plástico.",
      ] },
    ]),
    slide("reglas", "Reglas de seguridad", [
      { kind: "steps", items: [
        "No tocar aparatos o enchufes con las **manos mojadas** ni descalzo sobre suelo mojado.",
        "No **manipular** instalaciones con corriente; **desenchufar** antes de reparar.",
        "No **sobrecargar** regletas ni usar cables deteriorados.",
        "Ante una persona electrizada: **cortar la corriente** antes de tocarla, y llamar al **112**.",
      ] },
    ]),
    calc("calc-seca", "Piel seca", "Con la piel seca (≈ 100 000 Ω) y 230 V, ¿qué intensidad atraviesa el cuerpo, en mA?", nums(2.3), "I = 230 / 100 000 = 0,0023 A = 2,3 mA.", "I = V/R, y pasa a mA."),
    calc("calc-mojada", "Piel mojada", "Con la piel mojada (≈ 1000 Ω) y 230 V, ¿qué intensidad atraviesa el cuerpo, en mA?", nums(230), "I = 230 / 1000 = 0,23 A = 230 mA.", "I = V/R."),
    calc("calc-veces", "Comparación", "¿Cuántas veces mayor es la corriente con la piel mojada que con la seca?", nums(100), "100 000 / 1000 = 100 veces.", "Cociente de resistencias."),
    sort("clasifica", "Protección o riesgo", "Clasifica cada elemento.",
      [["pr", "Protección", "emerald"], ["ri", "Riesgo", "rose"]],
      [["Interruptor diferencial", "pr"], ["Toma de tierra", "pr"], ["Fusible", "pr"], ["Manos mojadas", "ri"], ["Cable pelado", "ri"], ["Regleta sobrecargada", "ri"]],
      "Las protecciones cortan o desvían la corriente peligrosa.",
    ),
    pick("check", "Peligro", "¿Qué determina principalmente el peligro de una descarga?",
      "La intensidad que atraviesa el cuerpo y el tiempo",
      [["Solo el color del cable", "No influye."], ["Solo la potencia de la bombilla", "No es lo relevante."], ["La altura a la que estés", "No es la causa."]],
      "El daño depende de la intensidad, su recorrido y su duración.",
    ),
  ],
};
