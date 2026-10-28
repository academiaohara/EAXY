import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transformadorFuenteAlimentacion4esoLesson: InteractiveLesson = {
  slug: "transformador-fuente-alimentacion-4eso",
  title: "4. El transformador y la fuente de alimentación",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("anim", "De la red a la continua", [
      { kind: "text", text: "Mira cómo se convierte la tensión de la red en una tensión continua para la electrónica." },
    ], anim("eso4-fuente-alimentacion"), "text-top"),
    slide("trafo", "El transformador", [
      { kind: "steps", items: [
        "Dos **bobinas** enrolladas en un **núcleo** de hierro: primario y secundario.",
        "La tensión se reparte según las vueltas: **V₁ / V₂ = N₁ / N₂**.",
        "Solo funciona con **alterna**.",
        "Si el transformador es ideal, la potencia se conserva: **V₁·I₁ = V₂·I₂**. Si baja la tensión, sube la corriente.",
      ] },
    ]),
    slide("fuente", "Diseña una fuente", [
      { kind: "text", text: "Elige las vueltas del secundario y el condensador de filtro. Observa la tensión continua y el rizado." },
    ], tool("eso4-fuente-explorador"), "visual-top"),
    slide("cond", "El condensador de filtro", [
      { kind: "text", text: "El condensador se carga y se descarga: cuanto mayor, más alisa la tensión." },
    ], tool("eso3-condensador-explorador"), "visual-top"),
    calc("calc-ns", "Tensión del secundario", "Un transformador de 230 V con 1 150 vueltas en el primario y 60 en el secundario. ¿Cuántos V da? (230·60/1 150)", nums(12), "230 · 60 / 1 150 = 12 V.", "Proporción de vueltas."),
    calc("calc-i", "Corriente del primario", "El secundario entrega 12 V y 2 A. Suponiendo un transformador ideal, ¿cuántos mA toma del primario a 230 V? (redondea a un entero)", nums(104, 104.3), "Potencia 24 W; 24 / 230 = 0,104 A ≈ 104 mA.", "La potencia se conserva."),
    calc("calc-rizado", "Rizado", "Con 0,5 A de carga, 50 Hz de red (rectificación de onda completa) y 2 200 µF, ¿cuántos V de rizado? (I / (2·f·C), un decimal)", nums(2.3, 2.27), "0,5 / (2 · 50 · 0,0022) ≈ 2,27 V.", "Pasa los µF a F."),
    sort("clasifica-fuente", "Etapa de la fuente", "Relaciona cada elemento con su etapa.",
      [["tra", "Transformador", "cobalt"], ["rec", "Rectificador", "amber"], ["fil", "Filtro", "emerald"], ["reg", "Regulador", "rose"]],
      [["Baja la tensión de 230 V", "tra"], ["Cuatro diodos en puente", "rec"], ["Convierte alterna en pulsante", "rec"], ["Condensador en paralelo con la carga", "fil"], ["Reduce el rizado", "fil"], ["Mantiene exactamente 5 V", "reg"]],
      "Cada etapa mejora la señal para la siguiente.",
    ),
    pick("check-cond", "Más rizado", "¿Qué ocurre con el rizado si aumenta la corriente que consume la carga?",
      "Aumenta, porque el condensador se descarga más entre crestas",
      [["Disminuye", "El condensador se vacía antes."], ["Queda igual", "Depende de I."], ["Desaparece", "Nunca es cero."]],
      "ΔV = I / (2·f·C).",
    ),
  ],
};
