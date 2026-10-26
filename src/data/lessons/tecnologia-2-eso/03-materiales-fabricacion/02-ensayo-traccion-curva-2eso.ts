import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ensayoTraccionCurva2esoLesson: InteractiveLesson = {
  slug: "ensayo-traccion-curva-2eso",
  title: "2. Ensayos: la curva de tracción",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Estirar una probeta hasta romperla", [
      { kind: "text", text: "Observa cómo se construye la curva de un ensayo de tracción." },
    ], anim("eso2-curva-traccion"), "text-top"),
    slide("def", "Tensión y deformación", [
      { kind: "steps", items: [
        "**Tensión**: σ = F / A, fuerza entre sección (MPa).",
        "**Deformación unitaria**: ε = ΔL / L₀, alargamiento entre longitud inicial (se puede dar en %).",
        "**Zona elástica**: la deformación desaparece al soltar; **zona plástica**: queda permanente.",
        "**Dúctil**: se deforma mucho antes de romper (cobre, acero dulce). **Frágil**: rompe casi sin deformarse (vidrio, hierro fundido).",
      ] },
    ], undefined, "stack"),
    slide("curva", "Compara materiales", [
      { kind: "text", text: "Estira una probeta de cada material y observa en qué zona está y cuándo rompe." },
    ], tool("eso2-curva-traccion-explorador"), "visual-top"),
    slide("ensayo", "Un ensayo con barras", [
      { kind: "text", text: "Prueba cómo se comporta cada material al cargarlo." },
    ], tool("ensayo-material-explorador"), "visual-top"),
    calc("calc-sigma", "Calcula la tensión", "Una barra de 50 mm² de sección soporta 12 000 N de tracción. ¿Qué tensión soporta, en MPa?", nums(240), "σ = F / A = 12 000 / 50 = 240 MPa.", "σ = F / A."),
    calc("calc-eps", "Deformación en %", "Una probeta de 100 mm se alarga 2 mm. ¿Cuál es su deformación, en %?", nums(2), "ε = 2 / 100 = 0,02 = 2 %.", "ε = alargamiento / longitud inicial."),
    sort("clasifica-ductil", "Dúctil o frágil", "Clasifica cada comportamiento.",
      [["duc", "Dúctil", "emerald"], ["fra", "Frágil", "rose"]],
      [["Se estira mucho antes de romper", "duc"], ["Se puede convertir en hilos (cobre)", "duc"], ["Avisa antes de romper", "duc"], ["Rompe casi sin deformarse", "fra"], ["Se parte en trozos al caer (vidrio)", "fra"], ["La curva termina enseguida tras el límite", "fra"]],
      "Los materiales dúctiles avisan deformándose; los frágiles rompen de golpe.",
    ),
    pick("check-elastica", "Zona elástica", "Si una probeta se estira dentro de la zona elástica y se suelta, ¿qué ocurre?",
      "Recupera su longitud inicial",
      [["Queda deformada para siempre", "Eso ocurre en la zona plástica."], ["Se rompe", "La rotura es al final del ensayo."], ["Se alarga aún más", "Al soltar la fuerza, desaparece la deformación elástica."]],
      "La zona elástica termina en el límite elástico: por debajo de él la deformación es reversible.",
    ),
  ],
};
