import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadSaludAccesibilidadDisenoLesson: InteractiveLesson = {
  slug: "seguridad-salud-accesibilidad-diseno",
  title: "6. Seguridad, salud y accesibilidad en el diseño",
  subtitle: TECESO1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Diseñar para todas las personas", [
      { kind: "definition", text: "Un buen diseño no solo funciona: es **seguro**, protege la **salud** de las personas y es **accesible** para todas, con independencia de su edad o de sus capacidades." },
      { kind: "steps", items: [
        "**Seguridad**: evitar accidentes (esquinas redondeadas, materiales no tóxicos, aislamiento eléctrico).",
        "**Salud y ergonomía**: adaptar los objetos al cuerpo para evitar dolores (altura de la silla, pantalla, agarres).",
        "**Accesibilidad**: que puedan usarlo personas con movilidad reducida, con discapacidad visual o auditiva, niños y mayores.",
      ] },
    ], undefined, "stack"),
    slide("ergonomia", "Ergonomía en tu mesa de trabajo", [
      { kind: "steps", items: [
        "**Silla**: pies apoyados en el suelo y rodillas a unos 90°.",
        "**Espalda** recta y apoyada en el respaldo.",
        "**Pantalla** a la altura de los ojos y a un brazo de distancia.",
        "**Descansos** cada hora para estirar y mirar a lo lejos.",
      ] },
    ]),
    slide("rampa", "Una rampa accesible", [
      { kind: "text", text: "Una rampa debe ser lo bastante larga para que se pueda subir sin esfuerzo en silla de ruedas. Cambia el desnivel y la longitud y comprueba si cumple." },
    ], tool("rampa-accesibilidad-explorador", { a: 30, b: 2 }), "visual-top"),
    calc("calc-pend", "Calcula la pendiente", "Una rampa de 4 m de longitud salva un desnivel de 20 cm. ¿Qué pendiente tiene, en %? (pendiente = desnivel ÷ longitud · 100)",
      nums(5), "20 cm = 0,20 m. 0,20 ÷ 4 = 0,05 = 5 %.", "Pasa los centímetros a metros y divide entre la longitud."),
    sort("clasifica-acc", "Accesible o no", "Decide si cada solución mejora la accesibilidad.",
      [["si", "Mejora la accesibilidad", "emerald"], ["no", "Dificulta la accesibilidad", "rose"]],
      [["Rampa con barandilla junto a unos escalones", "si"], ["Semáforo con señal sonora", "si"], ["Ascensor con botones en braille", "si"], ["Escalón de 20 cm en la entrada, sin rampa", "no"], ["Puerta estrecha de 60 cm", "no"], ["Información solo en letra muy pequeña", "no"]],
      "Una solución es accesible si permite a cualquier persona usarla con autonomía: rampas, señales sonoras y táctiles, buen contraste, puertas anchas.",
    ),
    pick("check-diseno", "Diseño para todos", "¿Qué significa «diseño universal»?",
      "Diseñar productos y espacios que pueda usar todo el mundo, sin adaptaciones especiales",
      [["Diseñar productos solo para personas jóvenes y sanas", "Es lo contrario: se piensa en todas las personas."], ["Diseñar productos muy caros", "No tiene relación con el precio."], ["Diseñar un producto distinto para cada persona", "Se busca un diseño válido para el mayor número posible."]],
      "El diseño universal beneficia a todos: una puerta ancha sirve igual a una silla de ruedas, a un carrito o a quien lleva una maleta.",
    ),
  ],
};
