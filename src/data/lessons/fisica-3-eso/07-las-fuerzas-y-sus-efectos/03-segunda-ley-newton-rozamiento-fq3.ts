import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const segundaLeyNewtonRozamientoFq3Lesson: InteractiveLesson = {
  slug: "segunda-ley-newton-rozamiento-fq3",
  title: "3. Segunda ley de Newton, peso, normal y rozamiento",
  subtitle: FQ3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("ley2", "Segunda ley: F = m · a", [
      { kind: "steps", items: [
        "**Segunda ley de Newton**: la **fuerza neta** sobre un cuerpo es igual al producto de su **masa** por su **aceleración**: **ΣF = m · a**.",
        "La aceleración tiene la **misma dirección y sentido** que la fuerza neta, y es **inversamente proporcional a la masa**.",
        "Unidad: **1 N = 1 kg · m/s²**: la fuerza que da a 1 kg una aceleración de 1 m/s².",
        "Despejando: **a = ΣF / m**.",
      ] },
    ], undefined, "stack"),
    slide("fuerzas", "Fuerzas habituales", [
      { kind: "steps", items: [
        "**Peso** P = m · g: la fuerza con que la Tierra atrae a un cuerpo (g ≈ 9,8 N/kg, a veces se usa 10). Apunta hacia el **centro de la Tierra**.",
        "**Normal** N: la fuerza que una **superficie** ejerce sobre el cuerpo apoyado, **perpendicular** a ella. En un suelo horizontal, N = P.",
        "**Tensión** T: la fuerza que transmite una **cuerda** o cable al tirar de un cuerpo.",
        "**Rozamiento** Fr: se **opone al movimiento** y vale como máximo **μ · N**.",
      ] },
    ]),
    slide("explora", "Un bloque que se empuja", [
      { kind: "text", text: "Empuja el bloque con distintas fuerzas y cambia la masa y el rozamiento. ¿Cuándo se mueve?" },
    ], tool("fq3-newton2-rozamiento-explorador"), "visual-top"),
    calc("calc-f", "Fuerza necesaria", "¿Qué fuerza neta hay que aplicar a un carro de 20 kg para que acelere a 3 m/s², en N?", nums(60), "F = 20 · 3 = 60 N.", "ΣF = m·a."),
    calc("calc-a", "Aceleración", "Sobre una caja de 10 kg actúa una fuerza neta de 25 N. ¿Cuánto vale su aceleración, en m/s²?", nums(2.5), "a = 25 / 10 = 2,5 m/s².", "a = F/m."),
    calc("calc-p", "Peso", "¿Cuánto pesa un cuerpo de 20 kg? (g = 10 N/kg)", nums(200), "P = 20 · 10 = 200 N.", "P = m·g."),
    calc("calc-fr", "Rozamiento", "Un bloque de 20 kg (peso 200 N) se desliza con μ = 0,2. ¿Cuánto vale el rozamiento, en N?", nums(40), "Fr = 0,2 · 200 = 40 N.", "Fr = μ·N, con N = P."),
    calc("calc-neta", "Con rozamiento", "Si empujas ese bloque con 60 N y el rozamiento es de 40 N, ¿cuál es su aceleración, en m/s²?", nums(1), "Fuerza neta 20 N; a = 20 / 20 = 1 m/s².", "Resta el rozamiento y divide entre la masa."),
    sort("clasifica", "¿Qué fuerza es?", "Asocia cada descripción con la fuerza correspondiente.",
      [["pe", "Peso", "amber"], ["no", "Normal", "cobalt"], ["ro", "Rozamiento", "rose"]],
      [["Apunta hacia el centro de la Tierra", "pe"], ["Vale m·g", "pe"], ["Perpendicular a la superficie de apoyo", "no"], ["La ejerce la mesa sobre el libro", "no"], ["Se opone al deslizamiento", "ro"], ["Vale como máximo μ·N", "ro"]],
      "Cada fuerza tiene un origen y una dirección distinta.",
    ),
    pick("check", "Masa y aceleración", "Se aplica la misma fuerza neta a dos cuerpos, uno con el doble de masa. ¿Qué ocurre?",
      "El de más masa adquiere la mitad de aceleración",
      [["El de más masa acelera el doble", "Es al revés."], ["Aceleran igual", "a = F/m depende de la masa."], ["El de más masa no se mueve", "Se mueve, pero acelera menos."]],
      "a = F/m: a mayor masa, menor aceleración.",
    ),
  ],
};
