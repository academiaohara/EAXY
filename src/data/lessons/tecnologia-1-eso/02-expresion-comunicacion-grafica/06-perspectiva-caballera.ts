import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, tool } from "@/data/lessons/tec1-helpers";

export const perspectivaCaballeraLesson: InteractiveLesson = {
  slug: "perspectiva-caballera",
  title: "6. Perspectiva caballera",
  subtitle: TECESO1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ver la pieza en volumen", [
      { kind: "definition", text: "Las vistas muestran la pieza en planos separados. La **perspectiva** la dibuja en una sola imagen, en volumen, como la vería una persona." },
      { kind: "text", text: "La **perspectiva caballera** es un sistema sencillo: la cara frontal se dibuja **sin deformar** y la profundidad se representa con rectas inclinadas." },
    ], undefined, "stack"),
    slide("reglas", "Reglas de la caballera", [
      { kind: "steps", items: [
        "La **cara frontal** se dibuja en **verdadera magnitud** (medidas reales y ángulos rectos).",
        "Las **aristas de fondo** se dibujan inclinadas, normalmente a **45°** (también 30° o 60°).",
        "Las medidas del fondo se **reducen a la mitad** (coeficiente de reducción 0,5) para que el dibujo no parezca alargado.",
        "Las aristas ocultas se dibujan con trazo discontinuo.",
      ] },
    ]),
    slide("pasos", "Construcción paso a paso", [
      { kind: "text", text: "Observa el orden: cara frontal, rectas de fondo, medida reducida y cara trasera." },
    ], anim("caballera-pasos"), "split"),
    slide("explora", "Cambia las dimensiones", [
      { kind: "text", text: "Modifica el largo, el alto, el fondo y el ángulo. Fíjate en que la cara frontal siempre conserva su forma." },
    ], tool("perspectiva-explorador", { n: 0, a: 60, b: 40, c: 50 }), "visual-top"),
    calc("calc-reduccion", "Fondo en la caballera", "Una caja mide 80 mm de fondo. ¿Cuántos milímetros se dibujan para el fondo en perspectiva caballera con coeficiente 0,5?",
      nums(40), "80 mm × 0,5 = 40 mm.", "Multiplica el fondo por 0,5."),
    pick("check-frontal", "La cara que no se deforma", "En perspectiva caballera, ¿qué cara de un cubo se dibuja con su forma real?",
      "La cara frontal",
      [["La cara superior", "La superior se ve como un paralelogramo."], ["La cara lateral derecha", "La lateral también se deforma."], ["Ninguna", "En la caballera la frontal sí conserva su forma."]],
      "Por eso conviene colocar al frente la cara más complicada de la pieza, por ejemplo la que tiene agujeros circulares.",
    ),
    pick("check-uso", "Cuándo conviene la caballera", "Quieres dibujar una pieza con un agujero circular en su cara delantera. ¿Por qué es buena idea la caballera?",
      "Porque la cara frontal no se deforma y el círculo sigue siendo un círculo",
      [["Porque no necesita escuadra", "Se sigue necesitando para trazar a 45°."], ["Porque todas las caras se ven iguales", "Solo la frontal está sin deformar."], ["Porque las medidas del fondo se dibujan al doble", "Se dibujan a la mitad."]],
      "En la caballera el círculo frontal se traza con el compás; en otras perspectivas se convertiría en elipse.",
    ),
  ],
};
