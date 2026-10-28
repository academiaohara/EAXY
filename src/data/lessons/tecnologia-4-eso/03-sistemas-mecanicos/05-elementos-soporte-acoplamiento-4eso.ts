import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const elementosSoporteAcoplamiento4esoLesson: InteractiveLesson = {
  slug: "elementos-soporte-acoplamiento-4eso",
  title: "5. Ejes, rodamientos, frenos y acoplamientos",
  subtitle: TECESO4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los elementos que hacen posible la transmisión", [
      { kind: "steps", items: [
        "**Eje**: pieza que gira y soporta ruedas, poleas o engranajes. Un **árbol** además transmite par.",
        "**Rodamiento (cojinete)**: soporta el eje y reduce el rozamiento (bolas, rodillos, agujas).",
        "**Acoplamiento**: une dos ejes para transmitir el giro (rígido, elástico, junta cardan).",
        "**Embrague**: une o separa a voluntad el motor de la transmisión.",
        "**Freno**: reduce la velocidad convirtiendo energía cinética en calor (de tambor, de disco, de zapatas).",
        "**Chaveta y anclajes**: fijan las piezas al eje para que no resbalen.",
      ] },
    ], undefined, "stack"),
    slide("caja", "En la caja de cambios", [
      { kind: "text", text: "Todos estos elementos se ven en una caja de cambios: ejes, engranajes y rodamientos. Repasa cómo se combinan." },
    ], tool("eso3-caja-cambios-explorador"), "visual-top"),
    slide("correas", "Poleas y correas", [
      { kind: "text", text: "Las correas son un acoplamiento flexible: absorben vibraciones y permiten distancias largas." },
    ], tool("eso2-poleas-correas-explorador"), "visual-top"),
    slide("freno", "Frenar", [
      { kind: "steps", items: [
        "Frenar es **disipar energía cinética** E = ½·m·v² en forma de calor por rozamiento.",
        "La energía crece con el **cuadrado de la velocidad**: a doble velocidad, **cuádruple de energía**.",
        "Los frenos se **calientan**: necesitan refrigeración y materiales que aguanten.",
        "Los vehículos eléctricos recuperan parte con el **frenado regenerativo**.",
      ] },
    ]),
    calc("calc-ec", "Energía cinética", "Un coche de 1 000 kg a 20 m/s (72 km/h). ¿Cuántos kJ de energía cinética tiene? (½·m·v² / 1 000)", nums(200), "0,5 · 1 000 · 400 = 200 000 J = 200 kJ.", "Mitad de masa por velocidad al cuadrado."),
    calc("calc-ec2", "Doble velocidad", "Si el coche va al doble de velocidad (40 m/s), ¿cuántas veces mayor es su energía cinética?", nums(4), "Es proporcional a v²: 2² = 4.", "La energía depende del cuadrado de la velocidad."),
    sort("clasifica-elem", "¿Qué elemento es?", "Relaciona cada función con el elemento.",
      [["eje", "Eje o árbol", "cobalt"], ["rod", "Rodamiento", "amber"], ["acop", "Acoplamiento o embrague", "emerald"], ["fre", "Freno", "rose"]],
      [["Soporta ruedas dentadas y gira con ellas", "eje"], ["Transmite el par entre las ruedas", "eje"], ["Reduce el rozamiento del eje", "rod"], ["Tiene bolas o rodillos", "rod"], ["Une o separa motor y transmisión", "acop"], ["Une dos ejes en línea", "acop"], ["Transforma energía cinética en calor", "fre"], ["Detiene la máquina", "fre"]],
      "Cada elemento tiene su función concreta.",
    ),
    pick("check-rod", "Rodamiento", "¿Para qué se usa un rodamiento en lugar de un cojinete liso?",
      "Para sustituir deslizamiento por rodadura y reducir el rozamiento y las pérdidas",
      [["Para aumentar el rozamiento", "Se busca lo contrario."], ["Para que el eje no gire", "Permite girar."], ["Para ahorrar peso solamente", "Su función es reducir fricción."]],
      "Rodar pierde mucho menos energía que deslizar.",
    ),
  ],
};
