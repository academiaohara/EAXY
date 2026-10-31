import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fuerzasLeyesNewtonFb1Lesson: InteractiveLesson = {
  slug: "fuerzas-leyes-newton-fb1",
  title: "1. Fuerzas y leyes de Newton",
  subtitle: FB1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("fuerza", "Qué es una fuerza", [
      { kind: "steps", items: [
        "Una **fuerza** es la interacción que cambia el estado de movimiento de un cuerpo o lo deforma. Es **vectorial**: módulo, dirección, sentido y punto de aplicación. Unidad: **newton** (1 N = 1 kg·m/s²).",
        "**Fuerza resultante** ΣF: suma vectorial de todas las que actúan. Se suma por **componentes**: Fₓ = F·cos α y F_y = F·sen α.",
        "**Fuerzas de contacto** (normal, tensión, rozamiento, elástica) y **a distancia** (peso, eléctrica, magnética).",
        "El **peso** P = m·g es la fuerza gravitatoria sobre un cuerpo; la **masa** es una propiedad del cuerpo (kg) y **no cambia** de un lugar a otro, el peso sí.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Suma de fuerzas", [
      { kind: "text", text: "Pon varias fuerzas con distintos ángulos y mira su resultante. ¿Puedes dejar el cuerpo en equilibrio con tres fuerzas?" },
    ], tool("fb1-fuerzas-resultante-explorador"), "visual-top"),
    slide("leyes", "Las tres leyes de Newton", [
      { kind: "steps", items: [
        "**1.ª ley (inercia)**: si **ΣF = 0**, el cuerpo sigue en reposo o con **MRU**. Los sistemas donde se cumple son **inerciales**.",
        "**2.ª ley (dinámica)**: **ΣF = m·a** (más general: ΣF = dp/dt). La aceleración tiene la dirección y sentido de la resultante.",
        "**3.ª ley (acción y reacción)**: si A ejerce F sobre B, B ejerce **−F** sobre A. Actúan sobre **cuerpos distintos**, por eso no se anulan.",
        "**Método**: dibujar el **diagrama de fuerzas** de cada cuerpo, elegir ejes, escribir ΣF = m·a en cada eje y resolver.",
      ] },
    ], undefined, "stack"),
    slide("peso", "Peso, normal y ascensor", [
      { kind: "steps", items: [
        "En un cuerpo apoyado en suelo horizontal en reposo: **N = m·g**. La normal no es la reacción del peso (la reacción del peso está en el centro de la Tierra).",
        "**Ascensor** que sube con aceleración a: **N − m·g = m·a** → **N = m·(g + a)**: el peso aparente **aumenta**. Si baja acelerando: **N = m·(g − a)**.",
        "En **caída libre** (a = g) la normal es nula: **ingravidez** aparente, aunque la gravedad sigue actuando.",
      ] },
    ], undefined, "stack"),
    calc("calc-res", "Resultante perpendicular", "Dos fuerzas perpendiculares de 6 N y 8 N actúan sobre un cuerpo. ¿Cuánto vale la resultante, en N?", nums(10), "R = √(36 + 64) = 10 N.", "Pitágoras."),
    calc("calc-a", "Segunda ley", "Una fuerza resultante de 30 N actúa sobre un cuerpo de 6 kg. ¿Qué aceleración adquiere, en m/s²?", nums(5), "a = 30/6 = 5 m/s².", "a = F/m."),
    calc("calc-asc", "Peso aparente", "Una persona de 60 kg está en un ascensor que sube con a = 2 m/s². ¿Qué fuerza normal sobre ella, en N? (g = 10 m/s²)", nums(720), "N = 60·(10 + 2) = 720 N.", "N − mg = ma."),
    calc("calc-F", "Fuerza para frenar", "Un coche de 1000 kg que va a 20 m/s frena hasta pararse en 5 s. ¿Qué fuerza media de frenado se necesita, en N?", nums(4000), "a = 4 m/s² → F = 1000·4 = 4000 N.", "Primero la aceleración."),
    sort("clasifica", "Acción y reacción", "Indica si cada pareja es acción-reacción (3.ª ley) o no.",
      [["si", "Acción-reacción", "emerald"], ["no", "No lo es", "rose"]],
      [["La Tierra atrae a la Luna / la Luna atrae a la Tierra", "si"], ["Peso de un libro sobre una mesa / normal de la mesa", "no"], ["Un martillo golpea un clavo / el clavo empuja al martillo", "si"], ["Tensión de una cuerda sobre un cuerpo / el cuerpo sobre la cuerda", "si"], ["Peso de un cuerpo / su peso aparente", "no"], ["Empuje de un cohete a los gases / de los gases al cohete", "si"]],
      "Misma magnitud, sentido opuesto y sobre cuerpos distintos.",
    ),
    pick("check", "Inercia", "Un cuerpo se mueve con velocidad constante en línea recta. ¿Qué se puede afirmar?",
      "La fuerza resultante sobre él es nula",
      [["Hay una fuerza a favor del movimiento", "Eso aceleraría el cuerpo."], ["No hay ninguna fuerza actuando sobre él", "Puede haber varias que se compensen."], ["Su masa es nula", "No tiene relación."]],
      "ΣF = 0 implica a = 0 (MRU o reposo).",
    ),
  ],
};
