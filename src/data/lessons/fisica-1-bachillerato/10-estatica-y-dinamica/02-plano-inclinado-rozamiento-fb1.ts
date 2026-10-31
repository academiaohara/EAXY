import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planoInclinadoRozamientoFb1Lesson: InteractiveLesson = {
  slug: "plano-inclinado-rozamiento-fb1",
  title: "2. Rozamiento y plano inclinado",
  subtitle: FB1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("roz", "La fuerza de rozamiento", [
      { kind: "steps", items: [
        "El **rozamiento** aparece entre superficies en contacto y **se opone** al movimiento (o a la tendencia a moverse). Es paralelo a la superficie.",
        "**Rozamiento estático**: se adapta a la fuerza aplicada hasta un máximo **F_r,máx = μₑ·N**. **Cinético**: constante **F_r = μ_c·N**, con **μ_c < μₑ**.",
        "μ es **adimensional** y depende de las superficies, no del área de contacto. N es la fuerza **normal**, no siempre igual al peso.",
        "Con una fuerza aplicada F: si F ≤ μₑ·N el cuerpo **no se mueve** (F_r = F); si F > μₑ·N, **acelera** con a = (F − μ_c·N)/m.",
      ] },
    ], undefined, "stack"),
    slide("desc", "Descomponer el peso", [
      { kind: "text", text: "En un plano inclinado hay que descomponer el peso. Mira cómo se obtienen la normal y la fuerza que tira hacia abajo." },
    ], anim("fb1-plano"), "visual-top"),
    slide("explora", "Prueba un plano inclinado", [
      { kind: "text", text: "Cambia el ángulo y el rozamiento. ¿A partir de qué ángulo empieza a deslizar? ¿Influye la masa?" },
    ], tool("fb1-plano-inclinado-explorador"), "visual-top"),
    slide("res", "Resumen de fórmulas", [
      { kind: "steps", items: [
        "**Eje perpendicular**: N = m·g·cos θ. **Eje paralelo**: m·g·sen θ − F_r = m·a.",
        "**Sin rozamiento**: a = g·sen θ. **Con rozamiento (deslizando)**: **a = g·(sen θ − μ·cos θ)**.",
        "**Ángulo límite** de deslizamiento: **tg θ = μ**. **Subiendo** por el plano, el rozamiento apunta hacia abajo: a = −g·(sen θ + μ·cos θ).",
        "Con una **fuerza externa F** paralela al plano, se añade al balance: ΣF = F ± m·g·sen θ − F_r.",
      ] },
    ], undefined, "stack"),
    calc("calc-fr", "Rozamiento máximo", "Una caja de 20 kg sobre suelo horizontal tiene μ = 0,4. ¿Cuál es la fuerza de rozamiento máxima, en N? (g = 10 m/s²)", nums(80), "F = 0,4·20·10 = 80 N.", "F = μ·N con N = m·g."),
    calc("calc-acel", "Aceleración con rozamiento", "Se empuja la caja anterior con 120 N horizontales (μ_c = 0,4). ¿Qué aceleración adquiere, en m/s²? (g = 10 m/s²)", nums(2), "a = (120 − 80)/20 = 2 m/s².", "ΣF = F − F_r."),
    calc("calc-plano", "Plano sin rozamiento", "Un bloque desliza por un plano de 30° sin rozamiento. ¿Qué aceleración tiene, en m/s²? (g = 10 m/s²; sen 30° = 0,5)", nums(5), "a = g·sen θ = 5 m/s².", "a = g sen θ."),
    calc("calc-pl2", "Normal en el plano", "Un cuerpo de 10 kg está sobre un plano de 60°. ¿Cuánto vale la normal, en N? (g = 10 m/s²; cos 60° = 0,5)", nums(50), "N = 100·0,5 = 50 N.", "N = m·g·cos θ."),
    sort("clasifica", "¿Desliza o no?", "En un plano de μ = 0,5 (tg θ = ángulo límite ≈ 26,6°), ¿qué ocurre?",
      [["des", "Desliza", "rose"], ["rep", "Permanece en reposo", "cobalt"]],
      [["θ = 10°", "rep"], ["θ = 20°", "rep"], ["θ = 30°", "des"], ["θ = 45°", "des"], ["θ = 25°", "rep"], ["θ = 60°", "des"]],
      "Desliza si tg θ > μ, es decir, si θ > 26,6°.",
    ),
    pick("check", "Masa y aceleración", "En un plano inclinado con rozamiento, si se duplica la masa del bloque, ¿qué le ocurre a la aceleración?",
      "No cambia, porque la masa se simplifica",
      [["Se duplica", "Peso y rozamiento también se duplican."], ["Se reduce a la mitad", "No."], ["Se anula", "No."]],
      "a = g·(sen θ − μ·cos θ) no contiene la masa.",
    ),
  ],
};
