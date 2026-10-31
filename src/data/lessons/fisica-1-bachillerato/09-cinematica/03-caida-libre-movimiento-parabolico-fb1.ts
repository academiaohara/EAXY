import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const caidaLibreMovimientoParabolicoFb1Lesson: InteractiveLesson = {
  slug: "caida-libre-movimiento-parabolico-fb1",
  title: "3. Caída libre y movimiento parabólico",
  subtitle: FB1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("lib", "Caída libre y tiro vertical", [
      { kind: "steps", items: [
        "Cerca de la superficie y sin rozamiento, todos los cuerpos tienen la misma aceleración **g = 9,8 m/s²** hacia abajo: es un **MRUA** con **a = −g** (eje y hacia arriba).",
        "**v = v₀ − g·t**; **y = y₀ + v₀·t − ½·g·t²**. En el punto más alto v = 0: **t = v₀/g** y **h_máx = y₀ + v₀²/(2g)**.",
        "Subida y bajada **duran lo mismo** hasta la altura de lanzamiento y la rapidez al volver es la misma que al salir.",
        "**Caída desde el reposo** desde h: t = √(2h/g) y v = √(2gh), independientes de la masa.",
      ] },
    ], undefined, "stack"),
    slide("comp", "Composición de movimientos", [
      { kind: "text", text: "El **principio de superposición** (Galileo): si un móvil participa en varios movimientos a la vez, cada uno se desarrolla **independientemente** y el real es la suma vectorial. Los componentes **perpendiculares** no se influyen." },
    ], anim("fb1-parabolico"), "visual-top"),
    slide("explora", "Lanza un proyectil", [
      { kind: "text", text: "Cambia la rapidez, el ángulo y la altura inicial. ¿A qué ángulo es máximo el alcance? ¿Qué pasa con ángulos complementarios?" },
    ], tool("fb1-parabolico-explorador"), "visual-top"),
    slide("ec", "Ecuaciones del tiro oblicuo", [
      { kind: "steps", items: [
        "**Horizontal (MRU)**: **vₓ = v₀·cos θ**; **x = vₓ·t**. **Vertical (MRUA, a = −g)**: **v_y = v₀·sen θ − g·t**; **y = h₀ + v₀·sen θ·t − ½·g·t²**.",
        "**Tiempo de vuelo** (h₀ = 0): **2·v₀·sen θ/g**. **Altura máxima**: **v₀²·sen²θ/(2g)**. **Alcance**: **v₀²·sen 2θ/g**, **máximo a 45°**.",
        "**Tiro horizontal** (θ = 0, desde una altura h): **t = √(2h/g)** y **alcance = v₀·t**.",
        "**Ecuación de la trayectoria**: eliminando t resulta una **parábola**: y = x·tg θ − g·x²/(2·v₀²·cos²θ).",
      ] },
    ], undefined, "stack"),
    calc("calc-caida", "Caída libre", "Se deja caer una piedra desde 80 m. ¿Cuánto tarda en llegar al suelo, en s? (g = 10 m/s²)", nums(4), "t = √(2·80/10) = 4 s.", "t = √(2h/g)."),
    calc("calc-hmax", "Altura máxima", "Un proyectil sale del suelo a 30 m/s verticalmente. ¿Qué altura máxima alcanza, en m? (g = 10 m/s²)", nums(45), "h = 900/20 = 45 m.", "h = v₀²/(2g)."),
    calc("calc-vx", "Componente horizontal", "Un balón sale a 20 m/s con 60° sobre la horizontal. ¿Cuánto vale vₓ, en m/s? (cos 60° = 0,5)", nums(10), "vₓ = 20·0,5 = 10 m/s.", "vₓ = v₀ cos θ."),
    calc("calc-horiz", "Tiro horizontal", "Desde una mesa de 1,25 m de altura se lanza horizontalmente una bola a 4 m/s. ¿A qué distancia horizontal cae, en m? (g = 10 m/s²)", nums(2), "t = √(2·1,25/10) = 0,5 s → x = 4·0,5 = 2 m.", "Primero el tiempo de caída."),
    sort("clasifica", "Componente del tiro oblicuo", "Indica a qué componente corresponde cada afirmación.",
      [["hor", "Horizontal (MRU)", "cobalt"], ["ver", "Vertical (MRUA)", "rose"]],
      [["La velocidad es constante", "hor"], ["La aceleración es −g", "ver"], ["La velocidad se anula en el punto más alto", "ver"], ["Determina el alcance (junto con el tiempo)", "hor"], ["Determina el tiempo de vuelo", "ver"], ["Es la misma al salir y al llegar", "hor"]],
      "Horizontal: sin aceleración; vertical: gravedad.",
    ),
    pick("check", "Ángulo", "¿Con qué ángulo es máximo el alcance de un proyectil (sin rozamiento, mismo nivel)?",
      "45°",
      [["30°", "El alcance es menor."], ["60°", "Tiene el mismo alcance que 30°, no el máximo."], ["90°", "Sería un tiro vertical, alcance nulo."]],
      "Alcance = v₀² sen 2θ/g: máximo con sen 2θ = 1.",
    ),
  ],
};
