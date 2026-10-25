import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const propiedadesFisicasMecanicasLesson: InteractiveLesson = {
  slug: "propiedades-fisicas-mecanicas",
  title: "3. Propiedades físicas, químicas, mecánicas y tecnológicas",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("mapa", "Cuatro grupos de propiedades", [
      { kind: "steps", items: [
        "**Físicas**: densidad, punto de fusión, conductividad térmica y eléctrica, dilatación.",
        "**Químicas**: resistencia a la corrosión y a la oxidación, reactividad frente a ácidos o a la humedad.",
        "**Mecánicas**: cómo responde a fuerzas: resistencia, dureza, elasticidad, plasticidad, tenacidad, fragilidad, fatiga.",
        "**Tecnológicas**: cómo se deja trabajar: fusibilidad, colabilidad, forjabilidad, maleabilidad, ductilidad, soldabilidad, maquinabilidad.",
      ] },
      { kind: "text", text: "Para elegir un material no basta una propiedad aislada; se trabaja con **varias a la vez**." },
    ], undefined, "stack"),
    slide("mecanicas", "Propiedades mecánicas, sin confundirlas", [
      { kind: "relations", items: [
        { left: "Elasticidad", relation: "recupera la forma al quitar la carga", right: "muelle", tone: "ok" },
        { left: "Plasticidad", relation: "queda deformado de forma permanente", right: "plastilina", tone: "info" },
        { left: "Dureza", relation: "resiste ser rayado o penetrado", right: "diamante", tone: "key" },
        { left: "Tenacidad", relation: "absorbe energía antes de romper", right: "acero de chasis", tone: "ok" },
        { left: "Fragilidad", relation: "rompe sin deformarse apenas", right: "vidrio", tone: "warn" },
      ] },
      { kind: "warning", title: "Duro no es resistente ni tenaz", text: "El vidrio es duro y frágil: se raya con dificultad, pero se rompe de un golpe. Dureza, resistencia y tenacidad miden cosas distintas." },
    ]),
    slide("comparador", "Comparar propiedades", [
      { kind: "text", text: "Elige dos materiales y compara. Observa la última fila: **resistencia específica** (σ/ρ) mide cuánto aguanta por kilo de material. Por eso el avión es de aluminio y composites, no de acero." },
    ], tool("propiedades-comparador-explorador", { a: 0, b: 6 }), "visual-top"),
    slide("formulas", "Dos fórmulas básicas", [
      { kind: "rule", title: "Densidad", text: "Masa por unidad de volumen.", formula: "\\rho = \\dfrac{m}{V}\\qquad m = \\rho\\cdot V" },
      { kind: "rule", title: "Dilatación lineal", text: "Una barra se alarga al calentarse.", formula: "\\Delta L = \\alpha\\, L_0\\,\\Delta T" },
      { kind: "example", title: "Cubo de aluminio de 10 cm", lines: [
        { math: "V = (0{,}10\\ \\text{m})^3 = 10^{-3}\\ \\text{m}^3" },
        { math: "m = 2700\\ \\tfrac{\\text{kg}}{\\text{m}^3}\\cdot 10^{-3}\\ \\text{m}^3 = 2{,}7\\ \\text{kg}" },
      ] },
    ]),
    calc("calc-masa", "Masa de una pieza", "Una barra de acero ($\\rho = 7850\\ \\text{kg/m}^3$) mide $2$ m de largo y tiene una sección de $4\\ \\text{cm}^2$. ¿Cuántos kg pesa?",
      nums(6.28), "Sección: $4\\ \\text{cm}^2 = 4\\cdot 10^{-4}\\ \\text{m}^2$. Volumen: $2\\cdot 4\\cdot 10^{-4} = 8\\cdot 10^{-4}\\ \\text{m}^3$. Masa: $7850\\cdot 8\\cdot 10^{-4} = 6{,}28$ kg.", "Pasa cm² a m² antes de multiplicar."),
    calc("calc-dilat", "Dilatación de una barra", "Una barra de aluminio ($\\alpha = 23\\cdot 10^{-6}\\ \\text{°C}^{-1}$) mide $2$ m a $20$ °C. ¿Cuántos mm se alarga al calentarla hasta $70$ °C?",
      nums(2.3), "$\\Delta L = \\alpha L_0 \\Delta T = 23\\cdot 10^{-6}\\cdot 2\\ \\text{m}\\cdot 50 = 2{,}3\\cdot 10^{-3}\\ \\text{m} = 2{,}3$ mm.", "La variación de temperatura es 70 − 20."),
    sort("clasifica-prop", "¿De qué tipo es la propiedad?", "Clasifica cada propiedad.",
      [["fis", "Física", "cobalt"], ["mec", "Mecánica", "amber"], ["tec", "Tecnológica", "emerald"], ["qui", "Química", "violet"]],
      [["Densidad", "fis"], ["Conductividad térmica", "fis"], ["Tenacidad", "mec"], ["Dureza", "mec"], ["Soldabilidad", "tec"], ["Maquinabilidad", "tec"], ["Resistencia a la corrosión", "qui"], ["Reactividad con ácidos", "qui"]],
      "Las físicas describen su comportamiento sin fuerzas ni reacciones; las mecánicas, la respuesta a fuerzas; las tecnológicas, cómo se trabaja; las químicas, su reacción con el entorno.",
    ),
    pick("check-seleccion", "¿Qué propiedad prima?", "Quieres fabricar la carcasa de un portátil que sea ligera y rígida. ¿Qué dos propiedades debes comparar primero?",
      "Densidad y módulo de elasticidad (rigidez)",
      [["Color y brillo", "Son estéticas y no determinan la función estructural."], ["Punto de fusión y calor específico", "No tienen relación directa con ser ligera y rígida."], ["Conductividad eléctrica y magnetismo", "Podrían importar en otros diseños, pero no definen ligereza ni rigidez."]],
      "Ligera se mide con la densidad y rígida con el módulo de Young; juntas dan la rigidez específica E/ρ.",
    ),
  ],
};
