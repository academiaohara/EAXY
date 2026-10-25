import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ahorroMaterialesEnergiaEsoLesson: InteractiveLesson = {
  slug: "ahorro-materiales-energia-eso",
  title: "3. Ahorro de materiales y de energía",
  subtitle: TECESO1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("materiales", "Ahorrar materiales", [
      { kind: "steps", items: [
        "**Diseñar con menos material**: perfiles huecos, paredes más finas, piezas que cumplan su función sin sobrar nada.",
        "**Aprovechar los recortes** y los restos de material en el taller.",
        "**Elegir materiales reciclados o reciclables.**",
        "**Hacer productos duraderos y reparables**, con piezas que se puedan cambiar.",
      ] },
    ], undefined, "stack"),
    slide("energia", "Energía = potencia × tiempo", [
      { kind: "definition", text: "La **energía** que consume un aparato es la **potencia** (W) por el **tiempo** que está encendido. Se mide en **kilovatios hora (kWh)**: la energía de un aparato de 1 000 W funcionando durante 1 hora." },
      { kind: "rule", title: "Energía consumida", formula: "E\\ (\\text{kWh}) = \\dfrac{P\\ (\\text{W}) \\cdot t\\ (\\text{h})}{1000}" },
      { kind: "example", title: "Una bombilla de 60 W, 5 horas al día", lines: [{ math: "E = \\dfrac{60 \\cdot 5}{1000} = 0{,}3\\ \\text{kWh al día}" }, { math: "0{,}3 \\cdot 30 = 9\\ \\text{kWh al mes}" }] },
    ]),
    slide("explora", "Compara aparatos", [
      { kind: "text", text: "Cambia las horas de uso y compara el consumo anual de un aparato antiguo y uno eficiente. Observa el ahorro en energía, dinero y emisiones." },
    ], tool("ahorro-energia-explorador", { n: 0 }), "visual-top"),
    calc("calc-energia", "Calcula el consumo", "Una bombilla de 60 W está encendida 5 horas. ¿Cuántos kWh consume? (Usa coma o punto decimal.)",
      nums("0.3", "0.30"), "E = 60 W · 5 h ÷ 1000 = 0,3 kWh.", "Multiplica potencia por horas y divide entre 1000."),
    calc("calc-coste", "Calcula el coste", "Un aparato consume 40 kWh al mes y cada kWh cuesta 0,15 €. ¿Cuántos euros cuesta al mes?",
      nums(6), "40 · 0,15 = 6 €.", "Multiplica la energía por el precio del kWh."),
    sort("clasifica-ahorro", "Ahorra energía o no", "Decide qué acciones ahorran energía.",
      [["aho", "Ahorra energía", "emerald"], ["des", "Gasta energía de más", "rose"]],
      [["Cambiar a bombillas LED", "aho"], ["Apagar la luz al salir", "aho"], ["Desenchufar los cargadores que no se usan", "aho"], ["Dejar la tele en espera toda la noche", "des"], ["Abrir las ventanas con la calefacción encendida", "des"], ["Dejar el ordenador encendido todo el día sin usarlo", "des"]],
      "Reducir el tiempo de uso o la potencia de los aparatos reduce el consumo; el modo en espera sigue gastando.",
    ),
    pick("check-led", "Cambiar a LED", "Una bombilla incandescente de 60 W y una LED de 8 W dan una luz parecida. Si están 4 h al día, ¿cuál consume menos y cuánto menos al año aproximadamente?",
      "La LED, unos 76 kWh menos al año (60 W − 8 W = 52 W; 52 · 4 · 365 ÷ 1000 ≈ 76)",
      [["La incandescente, porque da más luz", "Consume más potencia para dar la misma luz."], ["Consumen lo mismo", "Con 8 W frente a 60 W hay una diferencia grande."], ["La LED, pero solo 1 kWh menos", "La diferencia anual es de unos 76 kWh."]],
      "Una LED da la misma luz con una fracción de la potencia: el ahorro acumulado en un año es importante.",
    ),
  ],
};
