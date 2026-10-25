import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const palancasPoleasEquilibrioLesson: InteractiveLesson = {
  slug: "palancas-poleas-equilibrio",
  title: "6. Palancas, poleas y equilibrio",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("generos", "La palanca y sus tres géneros", [
      { kind: "definition", text: "Una **palanca** es una barra rígida que gira alrededor de un punto de apoyo. Permite equilibrar o mover una **carga** $Q$ con una **fuerza** $F$ aplicada a otra distancia del apoyo." },
      { kind: "text", text: "El género depende de cuál de los tres puntos (apoyo, fuerza, carga) queda en medio." },
    ], anim("palanca-generos"), "split"),
    slide("momentos", "Ley de la palanca", [
      { kind: "rule", title: "Equilibrio de momentos", text: "El momento de la fuerza respecto al apoyo iguala al de la carga.", formula: "F\\cdot b_F = Q\\cdot b_Q\\qquad\\text{ventaja mecánica}\\ \\ VM=\\dfrac{Q}{F}=\\dfrac{b_F}{b_Q}" },
      { kind: "text", text: "Con $b_F > b_Q$ se necesita menos fuerza que la carga (VM > 1). Ninguna palanca ahorra **trabajo**: lo que se gana en fuerza se pierde en recorrido." },
      { kind: "example", title: "Carga de 60 kg a 20 cm del apoyo; F a 80 cm", lines: [
        { math: "F = \\dfrac{Q\\,g\\,b_Q}{b_F} = \\dfrac{60\\cdot 9{,}81\\cdot 0{,}20}{0{,}80} = 147{,}2\\ \\text{N}" },
      ] },
    ]),
    slide("sim", "Palanca con apoyo móvil", [
      { kind: "text", text: "Mueve el apoyo, la carga y la fuerza. Busca el equilibrio ajustando F; observa cómo cambia el género al reordenar los puntos." },
    ], tool("palanca-explorador"), "visual-top"),
    slide("poleas", "Poleas y polipastos", [
      { kind: "steps", items: [
        "**Polea fija**: solo cambia la dirección de la fuerza ($F = Q$). Cómoda para tirar hacia abajo.",
        "**Polea móvil**: la carga cuelga de ella y la sostienen dos tramos de cuerda ($F = Q/2$).",
        "**Polipasto**: combinación de poleas fijas y móviles. Si $N$ tramos de cuerda sostienen la carga, $F = Q/N$ (sin pérdidas).",
      ] },
      { kind: "rule", title: "Lo que se gana en fuerza se paga en cuerda", formula: "F = \\dfrac{Q\\,g}{N\\,\\eta}\\qquad \\text{cuerda recogida} = N\\cdot h" },
    ], tool("polipasto-explorador", { a: 4, b: 120, c: 90 }), "split"),
    calc("calc-F", "Fuerza para equilibrar", "Una carga de $60$ kg está a $20$ cm del apoyo. ¿Qué fuerza, en N, hay que aplicar al otro lado a $80$ cm? (usa $g = 9{,}81$ m/s²)",
      nums(147.15, 147.2, 147), "$F = Q g b_Q / b_F = 60\\cdot 9{,}81\\cdot 0{,}20 / 0{,}80 = 147{,}15$ N.", "F·b_F = Q·g·b_Q."),
    calc("calc-polipasto", "Polipasto", "Un polipasto con $4$ cuerdas sostiene una carga de $200$ kg (sin pérdidas). ¿Qué fuerza de tiro hace falta, en N? ($g = 9{,}81$)",
      nums(490.5), "$F = Q g / N = 200\\cdot 9{,}81 / 4 = 490{,}5$ N. Para subir 1 m la carga hay que recoger 4 m de cuerda.", "Divide el peso entre el número de cuerdas."),
    sort("clasifica-genero", "¿De qué género es?", "Clasifica cada herramienta.",
      [["g1", "1.er género", "cobalt"], ["g2", "2.º género", "emerald"], ["g3", "3.er género", "amber"]],
      [["Tijeras", "g1"], ["Alicates", "g1"], ["Carretilla", "g2"], ["Cascanueces", "g2"], ["Pinzas de depilar", "g3"], ["Caña de pescar", "g3"]],
      "Tijeras y alicates tienen el apoyo en medio; carretilla y cascanueces, la carga en medio; pinzas y caña, la fuerza en medio.",
    ),
    pick("check-trabajo", "¿Se ahorra trabajo?", "Con un polipasto de 4 cuerdas sin rozamiento se levanta una carga haciendo 4 veces menos fuerza. ¿Qué pasa con el trabajo realizado?",
      "Es el mismo, porque se recoge 4 veces más cuerda",
      [["Es 4 veces menor", "La fuerza es menor, pero el recorrido es mayor en la misma proporción."], ["Es 4 veces mayor", "No hay motivo para que aumente sin rozamiento."], ["No se puede comparar", "Se compara con W = F·d y resulta igual."]],
      "Sin pérdidas: $W = F\\cdot d = (Q g/4)(4h) = Q g h$. Las máquinas simples cambian fuerza por recorrido, no crean energía.",
    ),
  ],
};
