import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const asociacionResistenciasLesson: InteractiveLesson = {
  slug: "asociacion-resistencias",
  title: "4. Asociación de resistencias",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("serie-paralelo", "Serie y paralelo", [
      { kind: "compare",
        left: { title: "En serie", text: "Un único camino. La **intensidad** es la misma en todas; la **tensión** se reparte. $R_{eq} = R_1 + R_2 + \\dots$", tone: "key" },
        right: { title: "En paralelo", text: "Varios caminos. La **tensión** es la misma en todas; la **intensidad** se reparte. $\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$", tone: "info" } },
      { kind: "text", text: "Dos resistencias en paralelo: $R_{eq} = \\dfrac{R_1 R_2}{R_1 + R_2}$, siempre menor que la menor de las dos." },
    ], anim("serie-paralelo-reparto"), "split"),
    slide("sim", "Conecta resistencias", [
      { kind: "text", text: "Cambia el tipo de asociación y los valores. Comprueba la tabla: en serie la columna de intensidad se repite; en paralelo, la de tensión." },
    ], tool("resistencias-explorador", { a: 100, b: 200, c: 300, n: 0 }), "visual-top"),
    slide("mixto", "Circuitos mixtos: reducir paso a paso", [
      { kind: "steps", title: "Método", items: [
        "Localiza los **grupos en paralelo** y sustitúyelos por su equivalente.",
        "Localiza los **grupos en serie** y súmalos.",
        "Repite hasta tener una sola resistencia $R_{eq}$ y calcula $I = V/R_{eq}$.",
        "**Deshaz** el proceso para obtener tensiones e intensidades de cada resistencia.",
      ] },
      { kind: "example", title: "R₁ = 10 Ω en serie con (20 Ω ‖ 20 Ω), con 12 V", lines: [
        { math: "20\\,\\|\\,20 = \\dfrac{20\\cdot 20}{40} = 10\\ \\Omega" },
        { math: "R_{eq} = 10 + 10 = 20\\ \\Omega" },
        { math: "I = 12/20 = 0{,}6\\ \\text{A}", note: "cada rama del paralelo lleva 0,3 A" },
      ] },
    ]),
    slide("divisores", "Divisor de tensión", [
      { kind: "rule", title: "Dos resistencias en serie", text: "La tensión se reparte en proporción a cada resistencia.", formula: "V_2 = V\\cdot\\dfrac{R_2}{R_1 + R_2}" },
      { kind: "text", text: "Es la base de muchos sensores: si $R_2$ cambia con la luz o la temperatura, $V_2$ cambia y se puede medir. En paralelo existe un **divisor de corriente**: por la rama de menor resistencia pasa más corriente." },
    ]),
    calc("calc-serie", "Resistencia equivalente", "Se conectan en serie $10\\ \\Omega$, $20\\ \\Omega$ y $30\\ \\Omega$ a $12$ V. ¿Qué intensidad circula, en mA?",
      nums(200), "$R_{eq} = 60\\ \\Omega$; $I = 12/60 = 0{,}2$ A $= 200$ mA.", "Suma las resistencias."),
    calc("calc-paralelo", "Dos resistencias en paralelo", "Dos resistencias de $60\\ \\Omega$ y $30\\ \\Omega$ están en paralelo. ¿Cuál es la resistencia equivalente, en ohmios?",
      nums(20), "$R_{eq} = 60\\cdot 30/(60+30) = 1800/90 = 20\\ \\Omega$.", "Producto entre suma."),
    calc("calc-divisor", "Divisor de tensión", "Con una pila de $12$ V se conectan en serie $R_1 = 1\\ \\text{k}\\Omega$ y $R_2 = 2\\ \\text{k}\\Omega$. ¿Qué tensión cae en $R_2$, en V?",
      nums(8), "$V_2 = 12\\cdot 2/(1+2) = 8$ V (y 4 V en R₁).", "Usa la proporción R₂/(R₁+R₂)."),
    sort("clasifica-asoc", "Serie o paralelo", "Clasifica cada afirmación según la asociación a la que corresponde.",
      [["ser", "Serie", "cobalt"], ["par", "Paralelo", "amber"]],
      [["Misma intensidad en todos los elementos", "ser"], ["La resistencia total es la suma", "ser"], ["Si uno se funde, el resto se apaga", "ser"], ["Misma tensión en todos los elementos", "par"], ["La resistencia total es menor que la menor", "par"], ["Las viviendas se conectan así", "par"]],
      "En serie manda la intensidad común y la suma de resistencias; en paralelo, la tensión común y una resistencia total menor. Las viviendas usan paralelo para que cada aparato reciba 230 V de forma independiente.",
    ),
    pick("check-paralelo", "Añadir una rama", "Se añade una nueva resistencia en paralelo a un circuito alimentado a tensión fija. ¿Qué pasa con la corriente total que entrega la fuente?",
      "Aumenta, porque la resistencia equivalente baja",
      [["Disminuye, porque hay más resistencias", "En paralelo hay más caminos y baja la resistencia equivalente."], ["No cambia", "Aparece una nueva corriente por la rama añadida."], ["Se anula", "No hay motivo para que se anule."]],
      "Cada rama en paralelo aporta su propia corriente V/R: la total es la suma.",
    ),
  ],
};
