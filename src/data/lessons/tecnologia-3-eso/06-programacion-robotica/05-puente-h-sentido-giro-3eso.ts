import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const puenteHSentidoGiro3esoLesson: InteractiveLesson = {
  slug: "puente-h-sentido-giro-3eso",
  title: "5. Cambiar el sentido de giro: el puente en H",
  subtitle: TECESO3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Girar en los dos sentidos", [
      { kind: "definition", text: "Un motor de corriente continua cambia de sentido al **invertir su polaridad**. El **puente en H** lo consigue con cuatro interruptores (transistores) dispuestos en forma de H con el motor en el centro." },
      { kind: "steps", items: [
        "**S1 y S4** cerrados: la corriente va de izquierda a derecha, **gira hacia delante**.",
        "**S3 y S2** cerrados: la corriente va en sentido contrario, **gira hacia atrás**.",
        "**S2 y S4** (o S1 y S3): el motor se **frena**.",
        "**S1 y S2** (o S3 y S4) a la vez: **cortocircuito**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Controla el motor", [
      { kind: "text", text: "Cierra los interruptores y descubre qué combinaciones hacen girar el motor y cuáles son peligrosas." },
    ], tool("eso3-puente-h-explorador"), "visual-top"),
    slide("drivers", "Drivers listos para usar", [
      { kind: "steps", items: [
        "Los circuitos integrados **L293D** y **L298N** contienen puentes en H con **protecciones**.",
        "Se controlan con **dos o tres pines**: uno para cada sentido y otro (PWM) para la velocidad.",
        "Cada uno puede manejar **dos motores**: los de las ruedas de un robot.",
      ] },
    ]),
    calc("calc-comb", "Combinaciones", "Con 4 interruptores abiertos o cerrados, ¿cuántas combinaciones distintas hay? (2⁴)", nums(16), "2⁴ = 16 combinaciones distintas.", "2 elevado a 4."),
    calc("calc-giro", "Combinaciones de giro", "De las 16 combinaciones, ¿cuántas hacen girar el motor (una hacia delante y otra hacia atrás)?", nums(2), "Solo S1+S4 (hacia delante) y S3+S2 (hacia atrás).", "Una por cada sentido."),
    sort("clasifica-puente", "¿Qué ocurre?", "Clasifica cada combinación de interruptores cerrados.",
      [["gir", "Gira", "emerald"], ["fre", "Se frena o para", "amber"], ["cor", "Cortocircuito", "rose"]],
      [["S1 y S4", "gir"], ["S3 y S2", "gir"], ["S2 y S4", "fre"], ["Todos abiertos", "fre"], ["S1 y S2", "cor"], ["S3 y S4", "cor"]],
      "Los dos interruptores de un mismo lado nunca deben estar cerrados a la vez.",
    ),
    pick("check-polaridad", "Invertir el giro", "¿Cómo se invierte el sentido de giro de un motor de corriente continua?",
      "Invirtiendo la polaridad de su alimentación",
      [["Subiendo la tensión", "Solo cambia la velocidad."], ["Quitando la resistencia", "No afecta al sentido."], ["No se puede", "Con un puente en H sí."]],
      "Cambiar el + y el − del motor invierte el sentido.",
    ),
  ],
};
