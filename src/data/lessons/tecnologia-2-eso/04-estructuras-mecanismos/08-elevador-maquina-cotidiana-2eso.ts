import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const elevadorMaquinaCotidiana2esoLesson: InteractiveLesson = {
  slug: "elevador-maquina-cotidiana-2eso",
  title: "8. Calcular una máquina completa: el elevador",
  subtitle: TECESO2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("plan", "Un motor, un reductor y un tambor", [
      { kind: "definition", text: "Un **elevador** (cabrestante) usa un **motor** que gira rápido y con poco par, un **reductor** que baja las rpm y sube el par, y un **tambor** que enrolla la cuerda de la que cuelga la carga." },
      { kind: "steps", items: [
        "**Par necesario en el tambor** = peso de la carga × radio del tambor (M = P · r).",
        "**Par necesario en el motor** = par del tambor ÷ (i · rendimiento).",
        "**Velocidad de subida** = 2 · π · r · n_tambor / 60, con n_tambor = n_motor / i.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Diseña tu elevador", [
      { kind: "text", text: "Prueba a elevar distintas cargas variando el reductor, el radio del tambor y el rendimiento." },
    ], tool("eso2-elevador-explorador"), "visual-top"),
    slide("ejemplo", "Un ejemplo resuelto", [
      { kind: "example", title: "Carga de 200 N con tambor de 10 cm y reductor 10 : 1", lines: [
        { math: "M_{tambor} = P \\cdot r = 200 \\cdot 0{,}1 = 20\\ N\\cdot m" },
        { math: "M_{motor} = 20 / 10 = 2\\ N\\cdot m", note: "Sin pérdidas. Con un rendimiento del 80 %, hay que dividir además entre 0,8." },
      ] },
    ]),
    calc("calc-tambor", "Par en el tambor", "Una carga de 200 N cuelga de un tambor de radio 0,1 m. ¿Qué par hay que hacer en el tambor, en N·m?", nums(20), "M = P · r = 200 · 0,1 = 20 N·m.", "M = fuerza · radio."),
    calc("calc-motor", "Par en el motor", "Con un reductor 10 : 1 sin pérdidas, ¿qué par debe dar el motor para mover ese tambor, en N·m?", nums(2), "M_motor = 20 / 10 = 2 N·m.", "Divide el par del tambor entre la relación del reductor."),
    calc("calc-rpmt", "Velocidad del tambor", "El motor gira a 1 500 rpm con un reductor 30 : 1. ¿A cuántas rpm gira el tambor?", nums(50), "n = 1 500 / 30 = 50 rpm.", "Divide entre la relación del reductor."),
    sort("clasifica-diseno", "Cambios en el diseño", "¿Qué efecto tiene cada cambio en el elevador?",
      [["fuerza", "Hace falta menos par del motor", "emerald"], ["veloz", "La carga sube más deprisa", "amber"]],
      [["Aumentar la relación del reductor", "fuerza"], ["Reducir el radio del tambor", "fuerza"], ["Mejorar el rendimiento (menos rozamiento)", "fuerza"], ["Reducir la relación del reductor", "veloz"], ["Aumentar el radio del tambor", "veloz"], ["Poner un motor más rápido", "veloz"]],
      "Reductor grande y tambor pequeño dan fuerza; reductor pequeño y tambor grande dan velocidad.",
    ),
    pick("check-compromiso", "Fuerza o velocidad", "Un elevador no consigue mover la carga. ¿Qué cambio resuelve el problema a costa de subir más despacio?",
      "Aumentar la relación del reductor",
      [["Reducir la relación del reductor", "Aumentaría la velocidad, pero disminuiría el par."], ["Aumentar el radio del tambor", "Haría falta aún más par."], ["Aumentar las rpm del motor sin cambiar nada más", "No cambia el par disponible."]],
      "Un reductor mayor multiplica el par, pero la salida gira más despacio: lo que se gana en fuerza se pierde en velocidad.",
    ),
  ],
};
