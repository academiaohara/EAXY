import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ensayoTraccionHooke4esoLesson: InteractiveLesson = {
  slug: "ensayo-traccion-hooke-4eso",
  title: "1. Ensayo de tracción, ley de Hooke y coeficiente de seguridad",
  subtitle: TECESO4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Estirar hasta romper", [
      { kind: "text", text: "Observa cómo se obtiene la curva tensión-deformación de un material." },
    ], anim("eso4-ensayo-traccion"), "text-top"),
    slide("def", "Tensión y deformación", [
      { kind: "steps", items: [
        "**Tensión** σ = F / A: fuerza por unidad de sección (en N/mm² = **MPa**).",
        "**Deformación unitaria** ε = ΔL / L₀: alargamiento relativo (sin unidades, o en %).",
        "En la zona elástica **σ = E · ε** (ley de Hooke); **E** es el **módulo de Young**: mide la **rigidez**.",
        "El **límite elástico** separa la deformación recuperable de la permanente; la **resistencia a tracción** es la tensión máxima.",
        "**Coeficiente de seguridad** = límite elástico / tensión de trabajo: se diseña con un margen (típicamente ≥ 2).",
      ] },
    ], undefined, "stack"),
    slide("hooke", "Estira una barra", [
      { kind: "text", text: "Elige el material, la fuerza y las medidas de la barra: mira la tensión, el alargamiento y el coeficiente de seguridad." },
    ], tool("eso4-hooke-explorador"), "visual-top"),
    slide("curva", "La curva de un material real", [
      { kind: "text", text: "Compara las curvas de distintos materiales: unos son rígidos y frágiles; otros, dúctiles." },
    ], tool("eso2-curva-traccion-explorador"), "visual-top"),
    calc("calc-sig", "Tensión", "Una barra de 10 mm de diámetro soporta 5 kN. ¿Qué tensión tiene, en MPa? (F/A con A = π·10²/4, redondea a un entero)", nums(64, 63.7), "A = 78,54 mm²; 5 000 / 78,54 ≈ 63,7 MPa.", "Pasa kN a N y calcula el área del círculo."),
    calc("calc-eps", "Alargamiento", "Esa barra es de acero (E = 210 000 MPa) y mide 500 mm. ¿Cuántos mm se alarga con 63,7 MPa? (σ/E · L, tres decimales)", nums(0.152, 0.15), "63,7 / 210 000 · 500 ≈ 0,152 mm.", "ε = σ/E y ΔL = ε·L."),
    calc("calc-cs", "Seguridad", "El acero tiene un límite elástico de 250 MPa y trabaja a 63,7 MPa. ¿Cuál es el coeficiente de seguridad? (un decimal)", nums(3.9, 3.92), "250 / 63,7 ≈ 3,9.", "Límite elástico entre tensión de trabajo."),
    sort("clasifica-curva", "¿Qué zona de la curva?", "Relaciona cada hecho con la zona.",
      [["ela", "Zona elástica", "emerald"], ["pla", "Zona plástica", "amber"], ["rot", "Estricción y rotura", "rose"]],
      [["Al soltar, recupera su longitud", "ela"], ["La tensión es proporcional a la deformación", "ela"], ["Queda más larga aunque se suelte", "pla"], ["Se supera el límite elástico", "pla"], ["La probeta se estrecha en un punto", "rot"], ["Se alcanza la resistencia máxima y se rompe", "rot"]],
      "Cada zona tiene un comportamiento distinto.",
    ),
    pick("check-e", "Rigidez", "Dos barras iguales soportan la misma fuerza: una de acero y otra de aluminio. ¿Cuál se alarga más?",
      "La de aluminio, porque su módulo de Young es menor",
      [["La de acero", "Es más rígida."], ["Las dos igual", "E es distinto."], ["Ninguna se alarga", "Toda barra se alarga algo."]],
      "A igual tensión, ε = σ/E es mayor cuanto menor es E.",
    ),
  ],
};
