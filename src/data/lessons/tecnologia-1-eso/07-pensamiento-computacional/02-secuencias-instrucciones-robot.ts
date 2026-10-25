import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const secuenciasInstruccionesRobotLesson: InteractiveLesson = {
  slug: "secuencias-instrucciones-robot",
  title: "2. Secuencias ordenadas de instrucciones",
  subtitle: TECESO1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un programa es una secuencia", [
      { kind: "definition", text: "Un **programa** es un algoritmo escrito en un lenguaje que entiende una máquina. La estructura más simple es la **secuencia**: las instrucciones se ejecutan **una tras otra, en el orden en que están escritas**." },
      { kind: "steps", items: [
        "El ordenador **no interpreta ni adivina**: hace exactamente lo que se le dice.",
        "Una instrucción mal colocada cambia el resultado.",
        "Para dar instrucciones a un robot necesitamos conocer **hacia dónde mira**: no es lo mismo girar a la izquierda que a la derecha.",
      ] },
    ], undefined, "stack"),
    slide("robot", "Guía al robot hasta la meta", [
      { kind: "text", text: "Usa solo **avanzar**, **girar a la izquierda** y **girar a la derecha**. El robot empieza mirando a la derecha. Ejecuta el programa y observa el recorrido." },
    ], tool("programa-bloques-explorador", { n: 0 }), "visual-top"),
    slide("giros", "Los giros dependen de hacia dónde mires", [
      { kind: "compare",
        left: { title: "Girar a la izquierda", text: "El robot mira al **este** (derecha) y gira a la izquierda: pasa a mirar al **norte** (arriba).", tone: "info" },
        right: { title: "Girar a la derecha", text: "El robot mira al **este** y gira a la derecha: pasa a mirar al **sur** (abajo).", tone: "key" } },
      { kind: "warning", title: "Ojo", text: "Los giros se hacen **desde el punto de vista del robot**, no del que mira la pantalla. Si el robot mira hacia abajo, su izquierda es el **este**." },
    ]),
    sort("clasifica-giro", "Hacia dónde mira", "El robot mira al este. Dónde queda mirando tras cada giro.",
      [["nor", "Norte (arriba)", "cobalt"], ["sur", "Sur (abajo)", "amber"], ["oes", "Oeste (izquierda)", "emerald"]],
      [["Girar a la izquierda", "nor"], ["Girar a la derecha", "sur"], ["Girar a la izquierda dos veces", "oes"], ["Girar a la derecha dos veces", "oes"], ["Girar a la izquierda tres veces", "sur"]],
      "Cada giro es de 90°. Desde el este: una izquierda lleva al norte; dos giros seguidos del mismo lado, al oeste; tres izquierdas (norte, oeste, sur) equivalen a una derecha.",
    ),
    pick("check-seq", "Predice el recorrido", "Un robot mira al este y ejecuta: avanzar, avanzar, girar a la derecha, avanzar. ¿Dónde acaba respecto del punto de partida?",
      "Dos casillas al este y una al sur",
      [["Tres casillas al este", "El tercer avance es después del giro a la derecha, así que va al sur."], ["Una casilla al sur y dos al norte", "Se avanza solo una vez tras girar."], ["En el mismo punto de partida", "Hay tres avances: no vuelve al origen."]],
      "Avanza dos al este, gira a la derecha (mira al sur) y avanza una al sur.",
    ),
    pick("check-orden", "Un cambio de orden", "Tu programa es: avanzar, girar a la izquierda, avanzar. Cambias el orden y queda: girar a la izquierda, avanzar, avanzar. ¿Qué ha cambiado?",
      "El robot ya no recorre el mismo camino: acaba en otro sitio",
      [["Nada, el recorrido es el mismo", "El giro cambia la dirección en la que avanzan los pasos siguientes."], ["El robot no se mueve", "Sigue avanzando."], ["El programa da error", "Se ejecuta sin error, pero con otro resultado."]],
      "El orden de una secuencia determina el resultado: las mismas instrucciones en otro orden pueden llevar a otro lugar.",
    ),
  ],
};
