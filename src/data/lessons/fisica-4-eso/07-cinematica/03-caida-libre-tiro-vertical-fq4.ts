import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const caidaLibreTiroVerticalFq4Lesson: InteractiveLesson = {
  slug: "caida-libre-tiro-vertical-fq4",
  title: "3. Caída libre y tiro vertical",
  subtitle: FQ4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "La gravedad como aceleración", [
      { kind: "steps", items: [
        "Cerca de la superficie terrestre, todos los cuerpos que caen (sin rozamiento del aire) tienen la **misma aceleración**: **g ≈ 9,8 m/s²**, dirigida hacia abajo.",
        "Es un **MRUA** con a = −g si el eje vertical apunta **hacia arriba**.",
        "**Caída libre**: se suelta el cuerpo (v₀ = 0). **Tiro vertical**: se lanza hacia arriba (v₀ > 0) o hacia abajo (v₀ < 0).",
        "Un martillo y una pluma caen igual en el vacío; en el aire, el rozamiento hace caer más despacio a la pluma.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Lanza un objeto", [
      { kind: "text", text: "Elige la altura y la velocidad iniciales y mueve el instante. ¿Cuándo está en el punto más alto? ¿Con qué rapidez llega al suelo?" },
    ], tool("fq4-tiro-vertical-explorador"), "visual-top"),
    slide("ec", "Ecuaciones", [
      { kind: "steps", items: [
        "**v = v₀ − g·t**  y  **h = h₀ + v₀·t − ½·g·t²**  (eje hacia arriba).",
        "En el **punto más alto**, v = 0: **t_subida = v₀/g** y **h_máx = h₀ + v₀²/(2g)**.",
        "El tiempo de **subida** es igual al de **bajada** hasta la altura de lanzamiento, y la rapidez al volver es la misma que al salir.",
        "Caída libre desde h: **t = √(2h/g)** y **v = √(2gh)**.",
      ] },
    ], undefined, "stack"),
    slide("nota", "Sobre el rozamiento", [
      { kind: "text", text: "Las ecuaciones son un modelo **sin rozamiento del aire**. Para objetos pesados y compactos y alturas moderadas funciona muy bien; para una pluma, un paracaidista o gotas de lluvia no: el aire los frena hasta alcanzar una **velocidad límite** constante." },
    ]),
    calc("calc-t", "Tiempo de caída", "Se deja caer una piedra desde 19,6 m. ¿Cuánto tarda en llegar al suelo, en s? (g = 9,8 m/s²)", nums(2), "t = √(2·19,6/9,8) = √4 = 2 s.", "t = √(2h/g)."),
    calc("calc-v", "Velocidad de impacto", "Una piedra cae libremente durante 3 s. ¿Con qué velocidad llega, en m/s? (g = 10 m/s²)", nums(30), "v = g·t = 10·3 = 30 m/s.", "v = g·t."),
    calc("calc-hmax", "Altura máxima", "Se lanza una pelota hacia arriba a 20 m/s desde el suelo. ¿Qué altura máxima alcanza, en m? (g = 10 m/s²)", nums(20), "h = v₀²/(2g) = 400/20 = 20 m.", "h = v₀²/(2g)."),
    sort("clasifica", "Signos en el punto más alto", "¿Qué valen estas magnitudes en el punto más alto de un tiro vertical?",
      [["cero", "Vale cero", "cobalt"], ["nocero", "No vale cero", "rose"]],
      [["La velocidad", "cero"], ["La aceleración", "nocero"], ["La rapidez", "cero"], ["La altura sobre el suelo", "nocero"], ["La fuerza del peso", "nocero"]],
      "Solo la velocidad se anula; la gravedad sigue actuando.",
    ),
    pick("check", "Sube y baja", "Se lanza una pelota hacia arriba. ¿Cuánto vale su aceleración en el punto más alto?",
      "g, hacia abajo",
      [["Cero", "La velocidad es cero, pero la aceleración no."], ["g, hacia arriba", "La gravedad apunta hacia abajo."], ["Depende de la altura alcanzada", "En el modelo, g es constante."]],
      "La aceleración es siempre g hacia abajo.",
    ),
  ],
};
