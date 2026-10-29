import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const graficasSeguridadVialFq4Lesson: InteractiveLesson = {
  slug: "graficas-seguridad-vial-fq4",
  title: "5. Gráficas y seguridad vial",
  subtitle: FQ4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("graf", "Leer gráficas", [
      { kind: "steps", items: [
        "En la gráfica **x–t**: la **pendiente** es la **velocidad**. Recta inclinada: MRU; parábola: MRUA; recta horizontal: reposo.",
        "En la gráfica **v–t**: la **pendiente** es la **aceleración** y el **área** bajo la curva es el **desplazamiento**.",
        "En la gráfica **a–t** de un MRUA: recta horizontal; el área es la variación de velocidad.",
        "Un **cambio de pendiente** indica un cambio de movimiento.",
      ] },
    ], undefined, "stack"),
    slide("explora-vt", "Arranca, mantén y frena", [
      { kind: "text", text: "Cambia los tramos. La distancia total es el área bajo la gráfica v–t." },
    ], tool("fq3-grafica-vt-explorador"), "visual-top"),
    slide("frenada", "Distancia de detención", [
      { kind: "steps", items: [
        "**Distancia de reacción** = v · t_reacción (MRU mientras el conductor reacciona; ≈ 1 s).",
        "**Distancia de frenada** = v²/(2a), con **a = μ·g** (μ es el coeficiente de rozamiento con la calzada).",
        "**Distancia de detención** = reacción + frenada.",
        "La frenada crece con **v²**: al **doblar** la velocidad, la distancia de frenada se **cuadruplica**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Seguridad vial", [
      { kind: "text", text: "Cambia la velocidad, el tiempo de reacción y la superficie. ¿Llega a detenerse antes del obstáculo?" },
    ], tool("fq4-seguridad-vial-explorador"), "visual-top"),
    calc("calc-area", "Área v–t", "Un móvil acelera de 0 a 10 m/s en 5 s. ¿Qué distancia recorre en ese tiempo, en m? (área del triángulo)", nums(25), "Área = ½·5·10 = 25 m.", "Triángulo: base · altura / 2."),
    calc("calc-pend", "Pendiente v–t", "En una gráfica v–t, la velocidad pasa de 4 a 16 m/s en 3 s. ¿Cuánto vale la aceleración en m/s²?", nums(4), "a = (16 − 4)/3 = 4 m/s².", "Pendiente = Δv/Δt."),
    calc("calc-react", "Distancia de reacción", "Un coche va a 20 m/s y el conductor tarda 1,5 s en reaccionar. ¿Cuántos metros recorre antes de frenar?", nums(30), "d = v·t = 20·1,5 = 30 m.", "MRU durante la reacción."),
    calc("calc-frena", "Distancia de frenada", "Un coche a 20 m/s frena con a = 5 m/s². ¿Qué distancia recorre hasta pararse, en m?", nums(40), "d = v²/(2a) = 400/10 = 40 m.", "d = v²/(2a)."),
    sort("clasifica", "Factor de riesgo", "¿Aumenta la distancia de reacción o la de frenada?",
      [["rea", "Aumenta la reacción", "cobalt"], ["fre", "Aumenta la frenada", "rose"]],
      [["Conducir cansado", "rea"], ["Usar el móvil", "rea"], ["Beber alcohol", "rea"], ["Calzada mojada", "fre"], ["Neumáticos desgastados", "fre"], ["Ir más rápido", "fre"]],
      "Los factores humanos alargan la reacción; los de la vía y el vehículo, la frenada.",
    ),
    pick("check", "Doble velocidad", "Si un coche duplica su velocidad, ¿cómo cambia su distancia de frenada?",
      "Se multiplica por 4",
      [["Se duplica", "Depende de v², no de v."], ["Se multiplica por 3", "No es el caso."], ["No cambia", "Cambia mucho."]],
      "d = v²/(2a): (2v)² = 4v².",
    ),
  ],
};
