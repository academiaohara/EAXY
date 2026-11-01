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
      { title: "15°: restando 45° − 30°", text: "El cartabón apoyado por su cateto largo deja su hipotenusa a 30°. Si apoyas **un cateto de la escuadra** en esa hipotenusa, la hipotenusa de la escuadra queda a $45^\\circ - 30^\\circ = 15^\\circ$ de la horizontal (y $165^\\circ$ por el otro lado).", fact: "15° y 165°" },
      { title: "30°: el cartabón solo", text: "Con el **cateto largo** sobre la horizontal, la hipotenusa del cartabón marca $30^\\circ$; dándole la vuelta, $150^\\circ$.", fact: "30° y 150°" },
      { title: "45°: la escuadra sola", text: "Con un **cateto** de la escuadra sobre la horizontal, su hipotenusa marca $45^\\circ$ y el otro cateto, $90^\\circ$.", fact: "45° y 90°" },
      { title: "60°: el cartabón sobre su cateto corto", text: "Apoyado por su **cateto corto**, la hipotenusa del cartabón marca $60^\\circ$; al revés, $120^\\circ$.", fact: "60° y 120°" },
      { title: "75°: sumando 45° + 30°", text: "Con el cartabón en su hipotenusa, apoya el cateto de la escuadra **por el otro lado**: la hipotenusa de la escuadra queda a $45^\\circ + 30^\\circ = 75^\\circ$ (y $105^\\circ$ por el otro lado).", fact: "75° y 105°" },
      { title: "135°: la escuadra al revés", text: "Dándole la vuelta a la escuadra, su hipotenusa marca $135^\\circ$ (o $45^\\circ$ medidos desde el otro lado). Con las **seis posiciones** salen todos los múltiplos de 15° entre 0° y 180°.", fact: "135° y 45°" },
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
