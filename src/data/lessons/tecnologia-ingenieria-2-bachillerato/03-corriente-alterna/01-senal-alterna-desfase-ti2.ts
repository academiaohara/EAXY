import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const senalAlternaDesfaseTi2Lesson: InteractiveLesson = {
  slug: "senal-alterna-desfase-ti2",
  title: "1. La señal alterna senoidal, el valor eficaz y el desfase",
  subtitle: TECTI2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una señal que cambia de sentido", [
      { kind: "steps", items: [
        "En corriente alterna (CA) la tensión y la corriente cambian de valor y de sentido de forma periódica. La red eléctrica usa una señal senoidal: v(t) = $V_p$·sen(ω·t + φ).",
        "**Periodo** T (s), **frecuencia** f = 1/T (Hz) y **pulsación** ω = 2π·f (rad/s). En España, f = 50 Hz y T = 20 ms.",
        "Valor eficaz: V = $V_p$/√2. Es el valor de una tensión continua que daría la misma potencia en una resistencia. Los 230 V de la red son eficaces; el pico es 325 V.",
        "**Desfase** φ: diferencia de fase entre dos señales de igual frecuencia (360° = un periodo).",
      ] },
    ], undefined, "stack"),
    slide("anim", "Resistencia, bobina y condensador", [
      { kind: "text", text: "Mira cómo se desfasan la tensión y la corriente según el tipo de carga." },
    ], anim("ti2-fase-carga"), "text-top"),
    slide("tool", "Dos señales desfasadas", [
      { kind: "text", text: "Cambia la frecuencia y el desfase. Observa el tiempo que equivale al ángulo." },
    ], tool("ti2-senoidal-explorador"), "visual-top"),
    slide("fasor", "Representación fasorial", [
      { kind: "steps", items: [
        "Una señal senoidal se representa con un **fasor**: un vector que gira con velocidad ω, cuyo módulo es el valor eficaz y cuyo ángulo es la fase.",
        "Sumar o restar señales senoidales de igual frecuencia equivale a sumar o restar **fasores**.",
        "Con números **complejos**: V = V∠φ = V·(cosφ + j·senφ). Las operaciones con fasores son más sencillas que con funciones del tiempo.",
        "Un fasor adelantado respecto a otro va **por delante** en el sentido antihorario.",
      ] },
    ]),
    calc("calc-ef", "Valor eficaz", "Una señal tiene 325 V de pico. ¿Cuántos V eficaces? ($V_p$/√2, redondea a un entero)", nums(230, 229.8), "325 / 1,414 ≈ 230 V.", "Divide el pico entre la raíz de 2."),
    calc("calc-w", "Pulsación", "A 50 Hz, ¿cuántos rad/s vale la pulsación? (2π·50, redondea a un entero)", nums(314, 314.16), "2π · 50 ≈ 314,16 rad/s.", "ω = 2π·f."),
    calc("calc-t", "Desfase en el tiempo", "A 50 Hz, un desfase de 30° equivale a un retraso de ¿cuántos ms? (30/360 · 20 ms, redondea a un decimal)", nums(1.7, 1.67), "30 / 360 · 20 ms ≈ 1,67 ms.", "Fracción del periodo por el periodo."),
    sort("clasifica-carga", "¿Qué carga es?", "Relaciona cada comportamiento con el elemento.",
      [["res", "Resistencia", "emerald"], ["bob", "Bobina", "amber"], ["con", "Condensador", "cobalt"]],
      [["Corriente y tensión en fase", "res"], ["Solo disipa calor", "res"], ["La corriente se retrasa 90°", "bob"], ["Almacena energía en un campo magnético", "bob"], ["La corriente se adelanta 90°", "con"], ["Almacena energía en un campo eléctrico", "con"]],
      "El desfase depende de cómo almacena o disipa energía cada elemento.",
    ),
    pick("check-ef", "Qué marca un polímetro", "Un polímetro en CA marca 230 V en un enchufe. ¿Qué valor mide?",
      "El valor eficaz, equivalente a una tensión continua que daría la misma potencia",
      [["El valor de pico (325 V)", "Marca el eficaz."], ["El valor medio, que es 0", "El valor medio sería nulo."], ["El valor mínimo", "No es lo que mide."]],
      "Los aparatos y los instrumentos trabajan con valores eficaces.",
    ),
  ],
};
