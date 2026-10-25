import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const leyDeOhmCircuitosLesson: InteractiveLesson = {
  slug: "ley-de-ohm-circuitos",
  title: "2. Ley de Ohm",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("ley", "La relación entre V, I y R", [
      { kind: "definition", text: "La **ley de Ohm** dice que, en un conductor óhmico, la intensidad es **directamente proporcional** a la tensión aplicada e **inversamente proporcional** a la resistencia." },
      { kind: "formula", tex: "V = I\\cdot R\\qquad I = \\dfrac{V}{R}\\qquad R = \\dfrac{V}{I}" },
      { kind: "facts", items: [
        { tex: "V\\uparrow\\ \\Rightarrow\\ I\\uparrow", label: "directa: doblas V, se dobla I" },
        { tex: "R\\uparrow\\ \\Rightarrow\\ I\\downarrow", label: "inversa: doblas R, I se reduce a la mitad" },
      ] },
      { kind: "warning", title: "Unidades coherentes", text: "V en voltios, I en amperios y R en ohmios. Si usas mA o kΩ, conviértelos antes." },
    ], undefined, "stack"),
    slide("sim", "Simulador con gráfica V–I", [
      { kind: "text", text: "Mueve la tensión y la resistencia. La gráfica muestra la recta de la resistencia (pendiente $1/R$) y el punto de funcionamiento. Después cambia a la bombilla." },
    ], tool("ohm-explorador", { a: 6, b: 100 }), "visual-top"),
    slide("limites", "Limitaciones de la ley", [
      { kind: "text", text: "La ley de Ohm describe a los **componentes óhmicos** (resistencias, cables), cuya resistencia no depende de V ni de I. No cumplen la ley:" },
      { kind: "steps", items: [
        "**Bombilla de filamento**: al calentarse, su resistencia aumenta mucho; la gráfica V–I se curva.",
        "**Diodos y LED**: no conducen hasta superar un umbral y luego la corriente crece muy deprisa.",
        "**Termistores (NTC, PTC) y LDR**: su resistencia cambia con la temperatura o la luz.",
      ] },
      { kind: "text", text: "En todos ellos se sigue pudiendo definir $R = V/I$ en cada punto, pero ya no es constante." },
    ]),
    calc("calc-I", "Calcular la intensidad", "Una resistencia de $48\\ \\Omega$ se conecta a $12$ V. ¿Qué intensidad circula, en mA?",
      nums(250), "$I = V/R = 12/48 = 0{,}25$ A $= 250$ mA.", "I = V/R, y 1 A = 1000 mA."),
    calc("calc-R", "Calcular la resistencia", "Un receptor conectado a $9$ V consume $30$ mA. ¿Cuál es su resistencia en ohmios?",
      nums(300), "$R = V/I = 9/0{,}030 = 300\\ \\Omega$.", "30 mA = 0,030 A."),
    calc("calc-V", "Calcular la tensión", "Por una resistencia de $20\\ \\Omega$ circula $0{,}5$ A. ¿Qué tensión hay entre sus extremos, en V?",
      nums(10), "$V = I\\cdot R = 0{,}5\\cdot 20 = 10$ V.", "V = I·R."),
    sort("clasifica-ohm", "Óhmico o no óhmico", "Clasifica cada componente.",
      [["oh", "Se comporta de forma óhmica", "emerald"], ["no", "No es óhmico", "amber"]],
      [["Resistencia de carbón", "oh"], ["Hilo de cobre", "oh"], ["Potenciómetro a posición fija", "oh"], ["LED", "no"], ["Bombilla de filamento", "no"], ["Diodo", "no"]],
      "Resistencias y cables mantienen R constante; LED, diodo y bombilla tienen resistencia que depende de la tensión o de la temperatura.",
    ),
    pick("check-prop", "Proporcionalidad", "Se duplica la tensión sobre una resistencia fija. ¿Qué pasa con la intensidad?",
      "Se duplica",
      [["Se reduce a la mitad", "Eso ocurriría si se duplicase la resistencia."], ["No cambia", "La intensidad depende de la tensión."], ["Se cuadruplica", "No hay relación cuadrática en una resistencia óhmica (la potencia sí se cuadruplica)."]],
      "I = V/R es proporcional a V: con R fija, doblar V dobla I (y la potencia, V²/R, se cuadruplica).",
    ),
  ],
};
