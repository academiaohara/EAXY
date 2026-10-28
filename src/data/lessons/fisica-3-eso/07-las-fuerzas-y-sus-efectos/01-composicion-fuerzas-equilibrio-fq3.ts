import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const composicionFuerzasEquilibrioFq3Lesson: InteractiveLesson = {
  slug: "composicion-fuerzas-equilibrio-fq3",
  title: "1. Composición de fuerzas y equilibrio",
  subtitle: FQ3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Las fuerzas son vectores", [
      { kind: "steps", items: [
        "Una **fuerza** es una interacción que puede **cambiar el estado de movimiento** de un cuerpo o **deformarlo**. Se mide en **newtons (N)**, con un **dinamómetro**.",
        "Es una **magnitud vectorial**: se caracteriza por su **módulo** (valor), su **dirección** y su **sentido**, y se dibuja como una **flecha**.",
        "Sobre un cuerpo suelen actuar **varias fuerzas** a la vez. Su efecto conjunto es el de una sola, la **fuerza resultante** (ΣF).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Sumar fuerzas", [
      { kind: "text", text: "Cambia el módulo de las dos fuerzas y el ángulo entre ellas. ¿Cuándo es mayor la resultante?" },
    ], tool("fq3-composicion-fuerzas-explorador"), "visual-top"),
    slide("casos", "Casos sencillos", [
      { kind: "steps", items: [
        "**Misma dirección y sentido**: se **suman**: R = F₁ + F₂.",
        "**Misma dirección y sentido contrario**: se **restan**: R = F₁ − F₂ (y el sentido es el de la mayor).",
        "**Perpendiculares**: **Pitágoras**: R = √(F₁² + F₂²).",
        "**Equilibrio**: si **ΣF = 0** el cuerpo está en reposo o se mueve con velocidad constante.",
      ] },
    ]),
    calc("calc-suma", "Mismo sentido", "Dos personas empujan una caja en el mismo sentido con 30 N y 40 N. ¿Cuánto vale la resultante, en N?", nums(70), "30 + 40 = 70 N.", "Se suman."),
    calc("calc-resta", "Sentidos opuestos", "En un juego de la cuerda, un equipo tira con 500 N y el otro con 450 N en sentido contrario. ¿Cuánto vale la fuerza neta, en N?", nums(50), "500 − 450 = 50 N hacia el equipo que más tira.", "Se restan."),
    calc("calc-perp", "Perpendiculares", "Dos fuerzas perpendiculares de 30 N y 40 N actúan sobre un cuerpo. ¿Cuánto vale la resultante, en N?", nums(50), "√(30² + 40²) = √2500 = 50 N.", "Teorema de Pitágoras."),
    calc("calc-eq", "Equilibrio", "Un cuerpo en equilibrio está sometido a una fuerza de 20 N hacia la derecha y otra desconocida hacia la izquierda. ¿Cuánto vale esta, en N?", nums(20), "Para que ΣF = 0, debe valer 20 N.", "La resultante debe ser cero."),
    sort("clasifica", "¿Equilibrio?", "Clasifica cada situación.",
      [["eq", "En equilibrio (ΣF = 0)", "emerald"], ["ne", "No está en equilibrio", "rose"]],
      [["Un libro sobre una mesa", "eq"], ["Un coche a 90 km/h constantes por una recta", "eq"], ["Un paracaidista a velocidad constante", "eq"], ["Un coche que frena", "ne"], ["Una piedra que cae", "ne"], ["Un cohete que acelera", "ne"]],
      "Equilibrio: sin aceleración.",
    ),
    pick("check", "Fuerzas iguales y opuestas", "Dos fuerzas iguales y opuestas actúan sobre el mismo cuerpo. ¿Qué ocurre?",
      "La resultante es cero: no cambia su movimiento",
      [["Se mueve hacia la derecha", "No hay fuerza neta."], ["Se deforma siempre", "Puede deformarse, pero no acelera."], ["Se duplica la fuerza", "Se anulan."]],
      "La fuerza neta es cero: ΣF = 0.",
    ),
  ],
};
