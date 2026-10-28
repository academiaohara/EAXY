import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pesoMasaGravedadFq2Lesson: InteractiveLesson = {
  slug: "peso-masa-gravedad-fq2",
  title: "2. Peso, masa y gravedad",
  subtitle: FQ2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "No es lo mismo pesar que tener masa", [
      { kind: "steps", items: [
        "La **masa** es la cantidad de materia de un cuerpo. Se mide en **kg** con una **balanza** y **no cambia** de un lugar a otro.",
        "El **peso** es la **fuerza** con que un astro **atrae** al cuerpo. Se mide en **newton (N)** con un **dinamómetro**.",
        "El peso **depende del lugar**: en la Luna, un astronauta pesa unas 6 veces menos que en la Tierra, pero tiene la misma masa.",
        "El peso apunta **hacia el centro** del astro y se aplica en el **centro de gravedad** del cuerpo.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Tu peso en otros mundos", [
      { kind: "text", text: "Cambia la masa y el astro. La masa no cambia; el peso, sí." },
    ], tool("fq2-peso-masa-explorador"), "visual-top"),
    slide("form", "P = m · g", [
      { kind: "steps", items: [
        "**P = m · g**: el peso es la masa por la **intensidad del campo gravitatorio** g.",
        "En la **Tierra**, g ≈ **9,8 N/kg** (a veces se redondea a 10). Significa que cada kilo de masa pesa 9,8 N.",
        "En la **Luna**, g ≈ 1,6 N/kg; en **Marte**, 3,7 N/kg; en **Júpiter**, 24,8 N/kg.",
        "La **gravedad** es una fuerza de atracción **a distancia** entre todos los cuerpos con masa; solo se nota cuando uno de ellos es enorme, como un planeta.",
      ] },
    ]),
    calc("calc-P", "Peso en la Tierra", "Una persona de 60 kg. ¿Cuánto pesa en la Tierra (g = 9,8 N/kg), en N?", nums(588), "P = 60 · 9,8 = 588 N.", "Multiplica la masa por g."),
    calc("calc-luna", "Peso en la Luna", "Esa persona (60 kg) en la Luna (g = 1,6 N/kg). ¿Cuánto pesa, en N?", nums(96), "P = 60 · 1,6 = 96 N.", "Usa el g de la Luna."),
    calc("calc-m", "Masa a partir del peso", "Un objeto pesa 49 N en la Tierra (g = 9,8). ¿Cuál es su masa, en kg?", nums(5), "m = P / g = 49 / 9,8 = 5 kg.", "Divide el peso entre g."),
    sort("clasifica", "Masa o peso", "Clasifica cada afirmación.",
      [["mas", "Masa", "cobalt"], ["pes", "Peso", "amber"]],
      [["Se mide en kilogramos", "mas"], ["Es la misma en la Luna y en la Tierra", "mas"], ["Se mide con una balanza", "mas"], ["Se mide en newton", "pes"], ["Es una fuerza", "pes"], ["Cambia según el astro", "pes"]],
      "La masa es la cantidad de materia; el peso, una fuerza.",
    ),
    pick("check", "En la Luna", "Un astronauta pasa de la Tierra a la Luna. ¿Qué ocurre?",
      "Su masa no cambia y su peso disminuye",
      [["Su masa disminuye", "La masa es la misma."], ["Su peso no cambia", "La gravedad lunar es menor."], ["Su masa y su peso aumentan", "Disminuye el peso."]],
      "La masa es una propiedad del cuerpo; el peso depende de la gravedad del lugar.",
    ),
  ],
};
