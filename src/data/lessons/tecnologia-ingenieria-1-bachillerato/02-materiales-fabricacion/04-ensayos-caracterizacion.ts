import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ensayosCaracterizacionLesson: InteractiveLesson = {
  slug: "ensayos-caracterizacion",
  title: "4. Ensayos y caracterización de materiales",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "Para qué se ensaya", [
      { kind: "definition", text: "Un **ensayo** somete una probeta normalizada a unas condiciones controladas para **medir una propiedad** de forma repetible." },
      { kind: "compare",
        left: { title: "Destructivos", text: "Dañan o rompen la probeta: tracción, impacto (Charpy), dureza (marca), fatiga.", tone: "warn" },
        right: { title: "No destructivos", text: "No la dañan: ultrasonidos, radiografía, líquidos penetrantes, partículas magnéticas, inspección visual.", tone: "ok" } },
      { kind: "steps", title: "Ensayos más comunes", items: [
        "**Tracción**: resistencia, límite elástico y alargamiento.",
        "**Dureza** (Brinell, Vickers, Rockwell): resistencia a la penetración.",
        "**Impacto** (Charpy): energía que absorbe al romper de un golpe (tenacidad).",
      ] },
    ], undefined, "stack"),
    slide("traccion", "El ensayo de tracción", [
      { kind: "text", text: "Se estira una probeta hasta romperla, midiendo la **fuerza** y el **alargamiento**. Se dividen por la sección inicial y la longitud inicial para independizarse del tamaño de la probeta." },
      { kind: "facts", items: [
        { tex: "\\sigma = \\dfrac{F}{A_0}", label: "tensión (MPa = N/mm²)" },
        { tex: "\\varepsilon = \\dfrac{\\Delta l}{l_0}", label: "deformación (sin unidades)" },
        { tex: "E = \\dfrac{\\sigma}{\\varepsilon}", label: "módulo de Young (zona elástica)" },
      ] },
    ], anim("varilla-traccion"), "split"),
    slide("calculo", "Tensión y deformación de una probeta", [
      { kind: "text", text: "Cambia la fuerza, el diámetro y el alargamiento: la tensión depende de F y de la sección; la deformación, de cuánto se alarga respecto a su longitud inicial." },
    ], tool("tension-deformacion-explorador", { a: 30, b: 13.8, c: 0.1 }), "visual-top"),
    slide("curva", "Curva tensión-deformación", [
      { kind: "steps", title: "Zonas de la curva", items: [
        "**Elástica**: recta; al descargar vuelve a la longitud inicial. Su pendiente es E.",
        "**Límite elástico**: tensión a partir de la cual hay deformación permanente.",
        "**Plástica**: se deforma permanentemente; la tensión sigue creciendo.",
        "**Resistencia máxima**: la mayor tensión que soporta.",
        "**Rotura**: la probeta se parte. El alargamiento total mide la ductilidad.",
      ] },
      { kind: "text", text: "Elige distintos materiales y recorre la curva: ¿cuánto se deforma el frágil frente al dúctil antes de romper?" },
    ], tool("diagrama-traccion-explorador", { a: 0 }), "visual-top"),
    calc("calc-sigma", "Tensión en la probeta", "Una barra de $150\\ \\text{mm}^2$ de sección soporta una fuerza de $30$ kN. ¿Qué tensión soporta, en MPa?",
      nums(200), "$\\sigma = F/A_0 = 30\\,000\\ \\text{N} / 150\\ \\text{mm}^2 = 200$ N/mm² $= 200$ MPa.", "Pasa kN a N."),
    calc("calc-young", "Módulo de Young", "En la zona elástica, esa barra de $100$ mm se alarga $0{,}1$ mm con $200$ MPa. ¿Cuál es su módulo de Young en GPa?",
      nums(200), "$\\varepsilon = 0{,}1/100 = 10^{-3}$. $E = \\sigma/\\varepsilon = 200\\ \\text{MPa}/10^{-3} = 200\\,000\\ \\text{MPa} = 200$ GPa, valor típico del acero.", "ε = Δl / l₀ antes de dividir."),
    sort("clasifica-ensayo", "Destructivo o no destructivo", "Clasifica cada ensayo.",
      [["des", "Destructivo", "amber"], ["nodes", "No destructivo", "emerald"]],
      [["Tracción hasta rotura", "des"], ["Impacto Charpy", "des"], ["Fatiga hasta fallo", "des"], ["Ultrasonidos", "nodes"], ["Líquidos penetrantes", "nodes"], ["Radiografía de una soldadura", "nodes"]],
      "Los ensayos que miden la rotura necesariamente la provocan. Los no destructivos buscan defectos sin dañar la pieza, por lo que pueden hacerse a todas las piezas.",
    ),
    pick("check-error", "Errores de medida", "Al repetir tres veces un ensayo de dureza se obtienen 62, 63 y 61 HRC. ¿Qué conviene hacer?",
      "Dar la media (62 HRC) indicando que los resultados varían ±1 HRC",
      [["Quedarse con el valor más alto", "Escoger el mejor resultado sesga la medida."], ["Repetir hasta que salgan tres iguales", "Forzar coincidencias oculta la variabilidad real."], ["Descartar el ensayo porque no coinciden", "Un pequeño margen de variación es normal."]],
      "Toda medida tiene incertidumbre. Se repite, se da la media y se indica su variación.",
    ),
  ],
};
