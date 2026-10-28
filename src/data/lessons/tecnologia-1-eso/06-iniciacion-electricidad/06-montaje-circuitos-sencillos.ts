import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const montajeCircuitosSencillosLesson: InteractiveLesson = {
  slug: "montaje-circuitos-sencillos",
  title: "6. Montaje y representación de circuitos sencillos",
  subtitle: TECESO1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("metodo", "Del esquema al montaje", [
      { kind: "steps", items: [
        "**Diseña el esquema**: decide qué componentes necesitas y cómo se conectan.",
        "**Reúne los materiales**: pila o portapilas, cables, interruptor, receptor.",
        "**Monta** los componentes siguiendo el esquema, empezando por la pila.",
        "**Comprueba**: cierra el interruptor y observa si funciona.",
        "**Si falla**, revisa conexión por conexión: ¿cable suelto? ¿pila agotada? ¿receptor fundido?",
      ] },
    ], undefined, "stack"),
    slide("monta", "Monta un circuito", [
      { kind: "text", text: "Conecta los terminales con cables para que la pila encienda la lámpara pasando por el interruptor. Si unes los dos polos de la pila sin receptor, tendrás un cortocircuito." },
    ], tool("montaje-circuito-explorador"), "visual-top"),
    slide("herramientas", "Herramientas y materiales", [
      { kind: "steps", items: [
        "**Pelacables**: quita el aislante sin cortar el cobre.",
        "**Alicates y destornilladores** pequeños para apretar bornes.",
        "**Cinta aislante** para cubrir empalmes.",
        "**Placa de montaje (protoboard)** o regleta de conexiones, para probar sin soldar.",
        "**Multímetro**: mide tensión, intensidad y resistencia y comprueba la continuidad de un cable.",
      ] },
    ]),
    sort("clasifica-fallo", "Diagnostica el fallo", "Relaciona cada síntoma con su causa más probable.",
      [["ab", "Circuito abierto", "amber"], ["co", "Cortocircuito", "violet"], ["ok", "Componente estropeado", "cobalt"]],
      [["No luce y el interruptor está abierto", "ab"], ["Hay un cable suelto", "ab"], ["El cable se calienta mucho y la pila se agota enseguida", "co"], ["Dos cables pelados se tocan", "co"], ["Todo conectado y no luce: la bombilla está fundida", "ok"], ["La pila está agotada", "ok"]],
      "Un circuito abierto no tiene camino completo; un cortocircuito tiene un camino sin receptor; y a veces el problema es una pieza estropeada.",
    ),
    pick("check-corto", "Qué es un cortocircuito", "¿Qué es un cortocircuito?",
      "Una conexión directa entre los dos polos de la pila sin ningún receptor en el camino",
      [["Un circuito con muchos receptores", "Eso es un circuito con varios receptores, no un cortocircuito."], ["Un circuito con el interruptor abierto", "Eso es un circuito abierto: no circula corriente."], ["Un cable demasiado corto", "La longitud del cable no es la causa."]],
      "Sin receptor que la limite, la corriente se hace muy grande: los cables se calientan y la pila se agota rápidamente.",
    ),
    pick("check-orden", "Montar con orden", "Estás montando un circuito con una pila, un interruptor y una bombilla. ¿Qué haces antes de conectar la pila?",
      "Dejar el interruptor abierto y comprobar el esquema",
      [["Conectar todo con el interruptor cerrado para ahorrar tiempo", "Es mejor tener el circuito abierto mientras se monta."], ["Quitar el aislante a todos los cables y juntarlos", "Podría provocar cortocircuitos."], ["Soldar los extremos de la pila", "No se sueldan las pilas: se conectan con portapilas."]],
      "Se monta con el circuito abierto y se cierra al final para probar.",
    ),
  ],
};
