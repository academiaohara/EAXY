import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const instrumentosParalelasDt1Lesson: InteractiveLesson = {
  slug: "instrumentos-paralelas-dt1",
  title: "1. Instrumentos de dibujo y paralelas con escuadra y cartabón",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("mesa", "Los instrumentos del delineante", [], bench("instrumentos-catalogo", [
      { title: "Regla graduada", text: "Sirve para **medir** longitudes y trazar rectas. En dibujo técnico se mide en **milímetros**: cada rayita es 1 mm.", fact: "30 cm; divisiones de 1 mm" },
      { title: "Escuadra", text: "Triángulo rectángulo **isósceles**. Traza perpendiculares y paralelas, y ángulos de 45° y 90°.", fact: "Ángulos 90°; 45°; 45°" },
      { title: "Cartabón", text: "Triángulo rectángulo **escaleno**, mitad de un triángulo equilátero. Traza ángulos de 30° y 60°.", fact: "Ángulos 90°; 60°; 30°" },
      { title: "Transportador", text: "Mide y dibuja **cualquier ángulo** de 0° a 180° cuando no sale con escuadra y cartabón.", fact: "Precisión de 1°" },
      { title: "Compás", text: "Traza **circunferencias y arcos** y traslada distancias sin medirlas. Una pata lleva la **punta seca** (se clava en el centro) y la otra, la **mina**.", fact: "Punta seca + mina" },
      { title: "Lápiz o portaminas", text: "Todo lo que trazas es tan bueno como la línea que dejas: **fina, uniforme y sin manchar**. Lo veremos con las minas.", fact: "H = dura; B = blanda" },
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
      { title: "Dureza de la mina", text: "**H** (del inglés hard: dura) deja un trazo **fino y claro**; **B** (black: blanda) deja un trazo **grueso y oscuro**; **HB** está en medio.", fact: "2H; H; HB; B; 2B" },
      { title: "Cada fase, su mina", text: "Las **construcciones** se hacen con mina dura (H o 2H): líneas finas que se pueden borrar. El **trazado final** se hace con mina media o blanda (HB): contorno oscuro y uniforme." },
      { title: "Dos errores típicos", text: "Una mina **blanda** sobre una construcción mancha el papel y la línea no se corrige bien. Una mina **dura** apretada en exceso marca un surco en el papel.", fact: "Trazo seguro: ni mancha ni surco" },
    ]), "stack"),

    benchTask("paralela", "Paralela por un punto con escuadra y cartabón", "paralelas-escuadra-cartabon", [
      { title: "Apoya la escuadra sobre r", text: "Dada la recta $r$ y el punto $P$, coloca un lado de la **escuadra** sobre $r$." },
      { title: "Pega el cartabón", text: "Apoya el **cartabón** contra la hipotenusa de la escuadra y **sujétalo**: no debe moverse en todo el proceso." },
      { title: "Traza la paralela por P", text: "**Arrastra la escuadra** a lo largo del cartabón hasta que el lado que estaba sobre $r$ pase por $P$.", fact: "La escuadra se desliza, no gira" },
    ], {
      question: "Traza por P la paralela a r deslizando la escuadra sobre el cartabón.",
      hint: "Arrastra la escuadra hasta que su borde pase justo por P.",
      explanation: "Al deslizar sin girar, el lado de la escuadra conserva la dirección de r: por eso la recta trazada es paralela.",
      params: { a: 12, b: 70 },
    }),
  ],
};
