import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const maquinasSimplesVentajaMecanica2esoLesson: InteractiveLesson = {
  slug: "maquinas-simples-ventaja-mecanica-2eso",
  title: "4. Máquinas simples y ventaja mecánica",
  subtitle: TECESO2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("palanca", "La ley de la palanca", [
      { kind: "text", text: "Una palanca está en equilibrio cuando el momento de la fuerza iguala al de la resistencia." },
    ], anim("palanca-ley"), "text-top"),
    slide("formulas", "Fuerzas y brazos", [
      { kind: "rule", title: "Ley de la palanca", text: "La fuerza multiplicada por su brazo es igual a la resistencia multiplicada por el suyo.", formula: "F · bF = R · bR" },
      { kind: "steps", items: [
        "**Ventaja mecánica** = resistencia ÷ fuerza. Si es mayor que 1, la máquina «ayuda».",
        "**Polipasto**: con n tramos de cuerda en las poleas móviles, **F = P / n**.",
        "**Plano inclinado**: sin rozamiento, **F = P · h / L** (altura entre longitud).",
        "En todas, **lo que se gana en fuerza se pierde en recorrido**: el trabajo no cambia.",
      ] },
    ], undefined, "stack"),
    slide("poleas", "Poleas fijas y móviles", [
      { kind: "text", text: "Una polea fija cambia la dirección de la fuerza; una móvil la reduce a la mitad pero hay que tirar de más cuerda." },
    ], anim("polea-fija-movil"), "text-top"),
    slide("explora", "Compara las tres máquinas", [
      { kind: "text", text: "Elige una máquina y varía su parámetro. Observa la fuerza necesaria y el recorrido." },
    ], tool("eso2-ventaja-mecanica-explorador"), "visual-top"),
    calc("calc-palanca", "Calcula la fuerza en una palanca", "Una resistencia de 300 N está a 20 cm del apoyo. Aplicas la fuerza a 60 cm del apoyo. ¿Qué fuerza necesitas, en N?", nums(100), "F = R · bR / bF = 300 · 20 / 60 = 100 N.", "F · bF = R · bR."),
    calc("calc-polipasto", "Calcula con un polipasto", "Un polipasto con 4 tramos de cuerda eleva una carga de 800 N. ¿Qué fuerza hay que hacer, en N?", nums(200), "F = P / n = 800 / 4 = 200 N.", "F = P / n."),
    calc("calc-rampa", "Calcula en un plano inclinado", "Para subir una carga de 500 N a 1 m de altura se usa una rampa de 5 m. ¿Qué fuerza se necesita, sin rozamiento, en N?", nums(100), "F = P · h / L = 500 · 1 / 5 = 100 N.", "F = P · h / L."),
    sort("clasifica-genero", "¿Qué se gana y qué se pierde?", "Clasifica cada afirmación.",
      [["gana", "Se gana", "emerald"], ["pierde", "Se paga", "rose"]],
      [["Menos fuerza con una rampa larga", "gana"], ["Menos fuerza con un polipasto", "gana"], ["Más comodidad al elevar una carga pesada", "gana"], ["Más recorrido en la rampa", "pierde"], ["Más cuerda que recoger con un polipasto", "pierde"], ["Más recorrido de la mano en una palanca de brazo largo", "pierde"]],
      "Una máquina simple reduce la fuerza a costa de aumentar el recorrido: el trabajo (fuerza × distancia) es el mismo.",
    ),
    pick("check-trabajo", "¿Se ahorra trabajo?", "¿Una máquina simple sin rozamiento ahorra trabajo?",
      "No: reduce la fuerza pero aumenta el recorrido, y el trabajo es el mismo",
      [["Sí, siempre ahorra trabajo", "El trabajo se conserva."], ["Sí, pero solo las palancas", "Ninguna máquina simple lo ahorra."], ["No, y además aumenta la fuerza", "Se puede reducir la fuerza."]],
      "Trabajo = fuerza × distancia. Con rozamientos, el trabajo necesario es incluso algo mayor.",
    ),
  ],
};
