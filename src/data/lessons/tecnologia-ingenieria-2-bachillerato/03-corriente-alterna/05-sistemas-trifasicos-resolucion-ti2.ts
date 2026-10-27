import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sistemasTrifasicosResolucionTi2Lesson: InteractiveLesson = {
  slug: "sistemas-trifasicos-resolucion-ti2",
  title: "5. Sistemas trifásicos y resolución de circuitos",
  subtitle: TECTI2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tres fases", [
      { kind: "steps", items: [
        "Un **sistema trifásico** son tres tensiones senoidales de igual valor eficaz y frecuencia, **desfasadas 120°** entre sí.",
        "Es el sistema usado para **generar, transportar y distribuir** la energía: ahorra cable y permite **motores** sencillos y robustos (campo giratorio).",
        "En la red de baja tensión: **400 V entre fases** (tensión de línea) y **230 V entre fase y neutro**.",
        "Los receptores se conectan en **estrella** (Y) o en **triángulo** (Δ).",
        "En un sistema equilibrado: P = √3·$V_L$·$I_L$·cosφ.",
      ] },
    ], undefined, "stack"),
    slide("tool", "Estrella y triángulo", [
      { kind: "text", text: "Compara las magnitudes de línea y de fase y la potencia en cada conexión." },
    ], tool("ti2-trifasica-explorador"), "visual-top"),
    slide("rel", "Relaciones entre línea y fase", [
      { kind: "steps", items: [
        "Estrella: $V_L$ = √3·$V_f$ y $I_L$ = $I_f$.",
        "Triángulo: $V_L$ = $V_f$ y $I_L$ = √3·$I_f$.",
        "Un motor trifásico conectado en triángulo a 230 V tiene sus fases a la misma tensión que en estrella a 400 V: por eso se puede **arrancar en estrella y pasar a triángulo** para reducir la corriente de arranque.",
      ] },
    ]),
    slide("met", "Método para resolver un circuito de CA", [
      { kind: "steps", items: [
        "1. Calcula las reactancias $X_L$ y $X_C$ a la frecuencia de trabajo.",
        "**2.** Obtén la impedancia Z y el ángulo φ (en serie se suman impedancias; en paralelo, las admitancias).",
        "**3.** Calcula la corriente con V = I·Z y las tensiones parciales.",
        "**4.** Calcula las potencias P, Q y S y el factor de potencia.",
        "**5.** Comprueba con S² = P² + Q² y con el balance de potencias.",
      ] },
    ]),
    calc("calc-pt", "Potencia trifásica", "Una carga trifásica a 400 V consume 10 A con cosφ = 1. ¿Cuántos W? (√3·400·10, redondea a un entero)", nums(6928, 6928.2), "1,732 · 400 · 10 ≈ 6 928 W.", "P = √3·V_L·I_L·cosφ."),
    calc("calc-vf", "Tensión de fase en estrella", "En una red de 400 V entre líneas, ¿cuántos V hay entre fase y neutro? (400/√3, redondea a un entero)", nums(231, 230.9), "400 / 1,732 ≈ 231 V.", "V_f = V_L/√3."),
    calc("calc-if", "Corriente de fase en triángulo", "Un receptor en triángulo absorbe 20 A de línea. ¿Cuántos A por cada fase? (20/√3, redondea a un decimal)", nums(11.5, 11.55), "20 / 1,732 ≈ 11,5 A.", "I_f = I_L/√3."),
    sort("clasifica-con", "Estrella o triángulo", "Relaciona cada relación con la conexión.",
      [["est", "Estrella", "cobalt"], ["tri", "Triángulo", "amber"]],
      [["V_L = √3·V_f", "est"], ["I_L = I_f", "est"], ["Existe un punto neutro común", "est"], ["V_L = V_f", "tri"], ["I_L = √3·I_f", "tri"], ["Cada fase soporta la tensión de línea", "tri"]],
      "Se distinguen por cómo se reparten tensiones y corrientes.",
    ),
    pick("check-tri", "Ventaja de la trifásica", "¿Qué ventaja principal tiene un sistema trifásico frente a uno monofásico para transportar potencia?",
      "Transporta más potencia con menos cable y da un campo giratorio para los motores",
      [["Que no necesita cables", "Necesita cables."], ["Que tiene siempre cosφ = 1", "Depende de la carga."], ["Que es de corriente continua", "Es alterna."]],
      "Por eso se utiliza en la generación, el transporte y los motores industriales.",
    ),
  ],
};
