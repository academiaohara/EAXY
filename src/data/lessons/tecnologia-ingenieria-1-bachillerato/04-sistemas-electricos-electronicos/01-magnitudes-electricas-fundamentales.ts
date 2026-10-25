import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const magnitudesElectricasFundamentalesLesson: InteractiveLesson = {
  slug: "magnitudes-electricas-fundamentales",
  title: "1. Magnitudes eléctricas fundamentales",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("cargas", "Carga, tensión, intensidad y resistencia", [
      { kind: "facts", items: [
        { tex: "Q\\ (\\text{C})", label: "carga eléctrica: culombio" },
        { tex: "V\\ (\\text{V})", label: "tensión o diferencia de potencial: voltio" },
        { tex: "I\\ (\\text{A})", label: "intensidad de corriente: amperio" },
        { tex: "R\\ (\\Omega)", label: "resistencia: ohmio" },
      ] },
      { kind: "steps", items: [
        "**Carga**: propiedad de la materia (positiva o negativa). El electrón tiene $-1{,}6\\cdot 10^{-19}$ C.",
        "**Tensión**: «empuje» entre dos puntos; hace falta para que haya corriente.",
        "**Intensidad**: cuántas cargas atraviesan una sección por segundo: $I = Q/t$.",
        "**Resistencia**: oposición del material al paso de corriente.",
      ] },
    ], anim("carga-movil-circuito"), "split"),
    slide("explora", "Cambia tensión y resistencia", [
      { kind: "text", text: "Observa cuántas cargas se dibujan y a qué ritmo: más tensión, más corriente; más resistencia, menos. Fíjate también en la carga total $Q = I\\cdot t$ que pasa en cierto tiempo." },
    ], tool("carga-corriente-explorador", { a: 6, b: 30, c: 10 }), "visual-top"),
    slide("conv", "Convenios y símbolos", [
      { kind: "compare",
        left: { title: "Sentido convencional", text: "De $+$ a $-$ por fuera de la pila. Es el que se usa en esquemas y fórmulas.", tone: "key" },
        right: { title: "Sentido real de los electrones", text: "En un metal los electrones van de $-$ a $+$. Los efectos son los mismos con cualquiera de los dos sentidos.", tone: "info" } },
      { kind: "steps", title: "Algunos símbolos", items: [
        "Pila o generador: dos placas, la larga es $+$.",
        "Resistencia: rectángulo o zigzag.",
        "Interruptor: segmento que abre o cierra el contacto.",
        "Lámpara: círculo con aspa. Cable: línea continua.",
      ] },
    ]),
    slide("unid", "Múltiplos y submúltiplos", [
      { kind: "text", text: "En electrónica se usan prefijos del SI. Conviértelos antes de calcular:" },
      { kind: "facts", items: [
        { tex: "1\\ \\text{mA} = 10^{-3}\\ \\text{A}" },
        { tex: "1\\ \\mu\\text{A} = 10^{-6}\\ \\text{A}" },
        { tex: "1\\ \\text{k}\\Omega = 10^{3}\\ \\Omega" },
        { tex: "1\\ \\text{M}\\Omega = 10^{6}\\ \\Omega" },
      ] },
      { kind: "warning", title: "Error típico", text: "Usar kΩ con mA en una fórmula sin convertir. Con $V$ en voltios y $R$ en kΩ, la intensidad sale en mA (porque V/kΩ = mA)." },
    ]),
    calc("calc-carga", "Carga que circula", "Por un conductor circula una intensidad de $2$ A durante $30$ s. ¿Qué carga, en culombios, ha pasado?",
      nums(60), "$Q = I\\cdot t = 2\\cdot 30 = 60$ C.", "I = Q / t."),
    calc("calc-intensidad", "Intensidad", "En $60$ s pasan $120$ C por un hilo. ¿Cuál es la intensidad en amperios?",
      nums(2), "$I = Q/t = 120/60 = 2$ A.", "Divide la carga entre el tiempo."),
    sort("clasifica-mag", "¿Qué magnitud y unidad?", "Asocia cada valor con su magnitud.",
      [["v", "Tensión", "cobalt"], ["i", "Intensidad", "amber"], ["r", "Resistencia", "emerald"], ["q", "Carga", "violet"]],
      [["12 V", "v"], ["230 V", "v"], ["0,5 A", "i"], ["30 mA", "i"], ["220 Ω", "r"], ["4,7 kΩ", "r"], ["60 C", "q"]],
      "Los voltios miden tensión; los amperios y miliamperios, intensidad; los ohmios y kΩ, resistencia; el culombio, la carga.",
    ),
    pick("check-sentido", "Sentido de la corriente", "Según el convenio habitual, ¿hacia dónde circula la corriente fuera de la pila?",
      "Del borne positivo al negativo",
      [["Del borne negativo al positivo", "Es el sentido real de los electrones en un metal, no el convencional."], ["Depende de la lámpara", "El sentido lo fija la pila, no el receptor."], ["En los dos sentidos a la vez", "En corriente continua circula en un solo sentido."]],
      "El sentido convencional (de + a −) es el que se usa en los esquemas, aunque los electrones se muevan al contrario.",
    ),
  ],
};
