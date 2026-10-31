import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, calc, nums, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const instrumentosParalelasDt1Lesson: InteractiveLesson = {
  slug: "instrumentos-paralelas-dt1",
  title: "1. Instrumentos de dibujo y paralelas con escuadra y cartabón",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("mesa", "Los instrumentos del delineante", [
      { kind: "text", text: "Un plano se lee igual en cualquier país porque todos trazan con los mismos instrumentos y la misma precisión. Seis cubren casi todo lo que harás en este curso." },
      { kind: "text", text: "Toca cada uno en la mesa: qué hace y qué dato conviene recordar." },
    ], bench("instrumentos-catalogo"), "visual-top"),

    slide("triangulos", "Escuadra y cartabón: cinco ángulos con dos piezas", [
      { kind: "compare",
        left: { title: "Escuadra", text: "Triángulo rectángulo **isósceles**.", math: ["90^\\circ,\\ 45^\\circ,\\ 45^\\circ"], tone: "info" },
        right: { title: "Cartabón", text: "Triángulo rectángulo **escaleno**, mitad de un equilátero.", math: ["90^\\circ,\\ 60^\\circ,\\ 30^\\circ"], tone: "warn" } },
      { kind: "rule", title: "Se fabrican a juego", text: "El cateto largo del cartabón mide lo mismo que la hipotenusa de la escuadra. Por eso pueden apoyarse un lado contra el otro y deslizarse con holgura." },
      { kind: "text", text: "Combinadas dan todos los múltiplos de 15° hasta 180°: 15°, 30°, 45°, 60°, 75°, 90°, 105°… Lo verás en la próxima lección." },
    ], undefined, "stack"),

    slide("lapiz", "El lápiz también es un instrumento", [
      { kind: "text", text: "La mina se clasifica por dureza: **H** (hard, dura) deja trazo fino y claro; **B** (black, blanda) deja trazo grueso y oscuro; **HB** está en medio." },
      { kind: "compare",
        left: { title: "Construcción", text: "Minas duras (**H** o **2H**): líneas finas y suaves que se pueden borrar o dejar sin estorbar.", tone: "info" },
        right: { title: "Trazado final", text: "Mina media o blanda (**HB**): contorno visible, oscuro y uniforme.", tone: "key" } },
      { kind: "warning", text: "Una mina blanda sobre un trazado de construcción mancha el papel y la línea no se puede corregir. Una dura apretada en exceso marca el papel." },
    ], undefined, "stack"),

    pick("check-lapiz", "Qué mina uso", "Vas a trazar las rectas auxiliares con las que localizarás un punto, y después el contorno definitivo de la figura. ¿Qué mina eliges para cada fase?",
      "Dura (2H) para lo auxiliar y media o blanda (HB) para el contorno",
      [["Blanda (B) para todo, para que se vea bien", "Lo auxiliar quedaría grueso, manchado y difícil de borrar."], ["Dura (2H) para todo, para no manchar", "El contorno saldría pálido y no se distinguiría de las auxiliares."], ["Blanda para lo auxiliar y dura para el contorno", "Justo al revés: lo auxiliar debe ser fino y el contorno, oscuro."]],
      "Las construcciones se hacen finas y claras; el trazado final, más oscuro, para que destaque.",
    ),

    slide("paralela", "Paralela por un punto con escuadra y cartabón", [
      { kind: "steps", title: "Dada la recta r y el punto P", items: [
        "Apoya un lado de la **escuadra** sobre r.",
        "Pega el **cartabón** contra otro lado de la escuadra y **sujétalo**: no debe moverse.",
        "**Desliza la escuadra** a lo largo del cartabón hasta que el lado que estaba sobre r pase por P.",
        "Traza por ese lado: es la paralela.",
      ] },
      { kind: "text", text: "Hazlo con las manos: arrastra la escuadra sobre el cartabón o usa el deslizador." },
    ], bench("paralelas-escuadra-cartabon", { a: 12, b: 70 }), "visual-top"),

    pick("check-paralela", "Por qué sale paralela", "¿Por qué la recta trazada es paralela a r?",
      "Porque la escuadra solo se traslada: no gira, así que su lado conserva la dirección de r",
      [["Porque el cartabón mide 30° y 60°", "Los ángulos del cartabón no intervienen: sirve solo de guía."], ["Porque la escuadra tiene un ángulo recto", "Con cualquier otro triángulo también saldría paralela: lo que cuenta es que no gire."], ["Porque P está más cerca de la escuadra", "La distancia a P decide dónde se traza, no la dirección."]],
      "Una traslación mueve todos los puntos la misma cantidad y en la misma dirección; las rectas conservan su dirección.",
    ),

    calc("calc-desliz", "Cuánto hay que deslizar", "P está a 60 mm de r. La escuadra desliza sobre su hipotenusa (a 45° de r). ¿Cuántos milímetros hay que deslizarla sobre el cartabón, redondeando al milímetro?",
      nums(85, 84.9, 84.85),
      "El borde sube 60 mm perpendicularmente a r; al deslizar a 45°, cada mm de recorrido avanza 1/√2 mm: 60 · √2 ≈ 84,85 mm.",
      "Recorrido · sen 45° = 60 mm.",
    ),

    sort("clasifica-instrumento", "Qué instrumento para cada tarea", "Reparte las tareas según el instrumento que mejor las resuelve.",
      [["escuadra", "Escuadra y cartabón", "cobalt"], ["compas", "Compás", "amber"], ["transp", "Transportador", "emerald"]],
      [["Trazar una paralela a una recta", "escuadra"], ["Levantar una perpendicular", "escuadra"], ["Dibujar un ángulo de 60°", "escuadra"], ["Trazar una circunferencia de radio 4 cm", "compas"], ["Llevar una distancia a otro sitio sin medirla", "compas"], ["Medir un ángulo de 37°", "transp"], ["Dibujar un ángulo de 130°", "transp"]],
      "Los ángulos que sí salen de escuadra y cartabón (múltiplos de 15°) no necesitan transportador; el resto, sí.",
    ),

    slide("transferencia", "Otra recta, otro punto", [
      { kind: "text", text: "Ahora r está inclinada hacia el otro lado y P queda más lejos. El procedimiento es el mismo; comprueba que la escuadra sigue sin girar." },
      { kind: "rule", title: "Qué retener", text: "Con una escuadra y un cartabón se trazan paralelas a cualquier recta: uno se sujeta, el otro se desliza." },
    ], bench("paralelas-escuadra-cartabon", { a: -8, b: 95 }, "Cambia la inclinación de r y vuelve a trazar: la construcción no cambia."), "visual-top"),
  ],
};
