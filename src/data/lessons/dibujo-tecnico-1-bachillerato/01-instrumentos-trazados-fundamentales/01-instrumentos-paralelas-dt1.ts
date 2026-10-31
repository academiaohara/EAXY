import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, calc, nums, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const instrumentosParalelasDt1Lesson: InteractiveLesson = {
  slug: "instrumentos-paralelas-dt1",
  title: "1. Instrumentos de dibujo y paralelas con escuadra y cartabón",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("mesa", "Los instrumentos del delineante", [], bench("instrumentos-catalogo", [
      { title: "Regla graduada", text: "Sirve para **medir** longitudes y trazar rectas. En dibujo técnico se mide en **milímetros**: cada rayita es 1 mm.", fact: "30 cm · divisiones de 1 mm" },
      { title: "Escuadra", text: "Triángulo rectángulo **isósceles**. Traza perpendiculares y paralelas, y ángulos de 45° y 90°.", fact: "Ángulos 90° · 45° · 45°" },
      { title: "Cartabón", text: "Triángulo rectángulo **escaleno**, mitad de un triángulo equilátero. Traza ángulos de 30° y 60°.", fact: "Ángulos 90° · 60° · 30°" },
      { title: "Transportador", text: "Mide y dibuja **cualquier ángulo** de 0° a 180° cuando no sale con escuadra y cartabón.", fact: "Precisión de 1°" },
      { title: "Compás", text: "Traza **circunferencias y arcos** y traslada distancias sin medirlas. Una pata lleva la **punta seca** (se clava en el centro) y la otra, la **mina**.", fact: "Punta seca + mina" },
      { title: "Lápiz o portaminas", text: "Todo lo que trazas es tan bueno como la línea que dejas: **fina, uniforme y sin manchar**. Lo veremos con las minas.", fact: "H = dura · B = blanda" },
    ]), "stack"),

    slide("angulos", "Todos los múltiplos de 15° con dos piezas", [], bench("escuadra-cartabon-angulos", [
      { title: "La escuadra: 90°, 45° y 45°", text: "Es la mitad de un **cuadrado** cortado por su diagonal, por eso tiene dos ángulos iguales.", fact: "Isósceles: dos lados iguales" },
      { title: "El cartabón: 90°, 60° y 30°", text: "Es la mitad de un **triángulo equilátero** cortado por una altura, por eso sus lados son todos distintos.", fact: "Escaleno: tres lados distintos" },
      { title: "Se fabrican a juego", text: "El cateto largo del cartabón mide **lo mismo** que la hipotenusa de la escuadra. Así se apoyan un lado contra el otro y se deslizan con holgura." },
      { title: "Restando: 15°", text: "Con el mismo vértice y la misma base, la diferencia entre el rayo de la escuadra y el del cartabón es $45^\\circ - 30^\\circ = 15^\\circ$.", fact: "45° − 30° = 15°" },
      { title: "Sumando: 75°", text: "Se traza un rayo a 45° con la escuadra y, apoyando el cartabón en él, se suman otros 30°: $45^\\circ + 30^\\circ = 75^\\circ$.", fact: "45° + 30° = 75°" },
      { title: "Sumando: 105°", text: "Con 60° del cartabón más 45° de la escuadra se llega a $105^\\circ$. Así salen todos los **múltiplos de 15°**: 15°, 30°, 45°, 60°, 75°, 90°, 105°…", fact: "60° + 45° = 105°" },
    ]), "stack"),

    slide("lapiz", "El lápiz también es un instrumento", [], bench("lapices-dureza", [
      { title: "Dureza de la mina", text: "**H** (del inglés hard: dura) deja un trazo **fino y claro**; **B** (black: blanda) deja un trazo **grueso y oscuro**; **HB** está en medio.", fact: "2H · H · HB · B · 2B" },
      { title: "Cada fase, su mina", text: "Las **construcciones** se hacen con mina dura (H o 2H): líneas finas que se pueden borrar. El **trazado final** se hace con mina media o blanda (HB): contorno oscuro y uniforme." },
      { title: "Dos errores típicos", text: "Una mina **blanda** sobre una construcción mancha el papel y la línea no se corrige bien. Una mina **dura** apretada en exceso marca un surco en el papel.", fact: "Trazo seguro: ni mancha ni surco" },
    ]), "stack"),

    pick("check-lapiz", "Qué mina uso", "Vas a trazar las rectas auxiliares con las que localizarás un punto, y después el contorno definitivo de la figura. ¿Qué mina eliges para cada fase?",
      "Dura (2H) para lo auxiliar y media o blanda (HB) para el contorno",
      [["Blanda (B) para todo, para que se vea bien", "Lo auxiliar quedaría grueso, manchado y difícil de borrar."], ["Dura (2H) para todo, para no manchar", "El contorno saldría pálido y no se distinguiría de las auxiliares."], ["Blanda para lo auxiliar y dura para el contorno", "Justo al revés: lo auxiliar debe ser fino y el contorno, oscuro."]],
      "Las construcciones se hacen finas y claras; el trazado final, más oscuro, para que destaque.",
    ),

    slide("paralela", "Paralela por un punto con escuadra y cartabón", [], bench("paralelas-escuadra-cartabon", [
      { title: "Apoya la escuadra sobre r", text: "Dada la recta $r$ y el punto $P$, coloca un lado de la **escuadra** sobre $r$." },
      { title: "Pega el cartabón", text: "Apoya el **cartabón** contra la hipotenusa de la escuadra y **sujétalo**: no debe moverse en todo el proceso." },
      { title: "Desliza la escuadra", text: "**Arrastra la escuadra** a lo largo del cartabón hasta que el lado que estaba sobre $r$ pase por $P$. Después traza." },
    ], { a: 12, b: 70 }), "stack"),

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

    slide("transferencia", "Otra recta, otro punto", [], bench("paralelas-escuadra-cartabon", [
      { title: "Misma recta, otro punto", text: "Ahora $r$ está inclinada hacia el otro lado y $P$ queda más lejos. Apoya la escuadra sobre $r$ como antes." },
      { title: "El cartabón no cambia de papel", text: "Se pega igual contra la hipotenusa y se sujeta. Lo único distinto es **cuánto** tendrás que deslizar." },
      { title: "Desliza y traza", text: "Arrastra la escuadra hasta $P$ y comprueba que sigue sin girar.", fact: "Una escuadra y un cartabón trazan paralelas a cualquier recta" },
    ], { a: -8, b: 95 }), "stack"),
  ],
};
