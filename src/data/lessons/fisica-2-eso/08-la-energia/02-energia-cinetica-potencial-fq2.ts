import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const energiaCineticaPotencialFq2Lesson: InteractiveLesson = {
  slug: "energia-cinetica-potencial-fq2",
  title: "2. Energía cinética y potencial",
  subtitle: FQ2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Energía de movimiento y de posición", [
      { kind: "steps", items: [
        "La **energía cinética** es la que tiene un cuerpo por estar **en movimiento**. Depende de su **masa** y de su **velocidad**.",
        "La **energía potencial gravitatoria** es la que tiene por estar a **cierta altura** sobre el suelo. Depende de su **masa** y de su **altura**.",
        "Un cuerpo **parado y en el suelo** no tiene ninguna de las dos (respecto del suelo).",
        "La suma de ambas es la **energía mecánica**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Masa, altura y velocidad", [
      { kind: "text", text: "Cambia la masa, la altura y la velocidad. Observa qué energía cambia con cada una." },
    ], tool("fq2-cinetica-potencial-explorador"), "visual-top"),
    slide("form", "Las fórmulas", [
      { kind: "steps", items: [
        "**Ec = ½ · m · v²**, con m en kg y v en m/s; el resultado sale en **julios**.",
        "**Ep = m · g · h**, con g = 9,8 N/kg y h en metros.",
        "Si se **duplica la velocidad**, la energía cinética se **cuadruplica** (depende de v²).",
        "Si se **duplica la altura**, la potencial se **duplica** (es proporcional a h).",
      ] },
    ]),
    calc("calc-ec", "Cinética", "Un ciclista de 70 kg (con la bici) va a 10 m/s. ¿Cuál es su energía cinética, en J?", nums(3500), "Ec = ½ · 70 · 10² = 3500 J.", "Calcula ½ · m · v²."),
    calc("calc-ep", "Potencial", "Una maceta de 2 kg está en un balcón a 10 m del suelo. ¿Cuál es su energía potencial, en J? (g = 9,8)", nums(196), "Ep = 2 · 9,8 · 10 = 196 J.", "Multiplica m, g y h."),
    calc("calc-dob", "Doble velocidad", "Un coche con Ec = 100 kJ duplica su velocidad. ¿Cuántos kJ de energía cinética tendrá?", nums(400), "Se multiplica por 2² = 4: 400 kJ.", "La energía depende de v²."),
    sort("clasifica", "Cinética o potencial", "Clasifica cada situación según la energía mecánica principal.",
      [["cin", "Cinética", "cobalt"], ["pot", "Potencial", "amber"]],
      [["Un tren a 100 km/h", "cin"], ["Una pelota que rueda", "cin"], ["Un nadador en movimiento", "cin"], ["Un libro en la estantería alta", "pot"], ["Una piedra en lo alto de un acantilado", "pot"], ["Un esquiador parado en la cima", "pot"]],
      "Cinética si se mueve; potencial si está en altura.",
    ),
    pick("check", "Velocidad", "Si un cuerpo triplica su velocidad, ¿qué le pasa a su energía cinética?",
      "Se multiplica por 9",
      [["Se multiplica por 3", "Depende de v², no de v."], ["Se multiplica por 6", "No es lineal."], ["No cambia", "Cambia con la velocidad."]],
      "La energía cinética depende de v²: 3² = 9.",
    ),
  ],
};
