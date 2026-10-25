import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fuerzaParPotenciaLesson: InteractiveLesson = {
  slug: "fuerza-par-potencia",
  title: "8. Fuerza, par y potencia mecánica",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("par", "Momento de una fuerza (par)", [
      { kind: "definition", text: "El **momento** de una fuerza, o **par**, mide su efecto de giro: depende de la fuerza y de la distancia perpendicular al eje (**brazo**)." },
      { kind: "rule", formula: "M = F\\cdot d\\qquad [M] = \\text{N·m}" },
      { kind: "example", title: "Llave de 40 cm con 50 N", lines: [
        { math: "M = 50\\ \\text{N}\\cdot 0{,}40\\ \\text{m} = 20\\ \\text{N·m}", note: "con una llave de 80 cm, bastarían 25 N" },
      ] },
      { kind: "warning", title: "N·m no es julio", text: "Aunque las unidades coincidan, el par es una magnitud vectorial de giro; el trabajo es una energía. No hay que confundirlos." },
    ], undefined, "stack"),
    slide("trabajo", "Trabajo y potencia", [
      { kind: "facts", items: [
        { tex: "W = F\\cdot d", label: "trabajo (J), con F paralela al desplazamiento" },
        { tex: "P = \\dfrac{W}{t}", label: "potencia (W = J/s)" },
        { tex: "P = F\\cdot v", label: "potencia con movimiento lineal" },
      ] },
      { kind: "text", text: "En un eje que gira, el trabajo en una vuelta es $M\\cdot 2\\pi$ y la potencia es el producto del par por la velocidad angular:" },
      { kind: "rule", title: "Potencia en rotación", formula: "P = M\\cdot\\omega\\qquad(\\omega\\ \\text{en rad/s})" },
    ]),
    slide("motor", "Motor virtual: par, velocidad y potencia", [
      { kind: "text", text: "Para una misma potencia, más par exige menos velocidad. Mueve el punto de trabajo y comprueba cuándo supera la potencia nominal." },
    ], tool("motor-virtual-explorador", { a: 8, b: 1200 }), "visual-top"),
    calc("calc-potencia", "Potencia de un eje", "Un motor entrega un par de $20$ N·m a $1\\,500$ rpm. ¿Qué potencia desarrolla, en W? (redondea a la unidad)",
      nums(3142, 3141.6, 3141.59), "$\\omega = 2\\pi\\cdot 1500/60 = 157{,}08$ rad/s; $P = M\\omega = 20\\cdot 157{,}08 = 3\\,141{,}6 \\approx 3\\,142$ W.", "ω en rad/s antes de multiplicar."),
    calc("calc-elevar", "Potencia de una grúa", "Una grúa eleva una carga de $100$ kg una altura de $10$ m en $20$ s. ¿Qué potencia útil desarrolla, en W? ($g = 9{,}81$)",
      nums(490.5), "$W = m g h = 100\\cdot 9{,}81\\cdot 10 = 9\\,810$ J; $P = W/t = 9810/20 = 490{,}5$ W.", "Calcula primero el trabajo."),
    calc("calc-par", "Par de apriete", "Se aprieta una tuerca con una llave de $0{,}25$ m aplicando $80$ N perpendicularmente. ¿Qué par aplica, en N·m?",
      nums(20), "$M = F\\cdot d = 80\\cdot 0{,}25 = 20$ N·m.", "M = F·d."),
    sort("clasifica-unidad", "¿En qué unidad?", "Asocia cada magnitud con su unidad en el SI.",
      [["n", "newton (N)", "cobalt"], ["nm", "newton·metro (N·m)", "amber"], ["j", "julio (J)", "emerald"], ["w", "vatio (W)", "violet"]],
      [["Fuerza", "n"], ["Peso", "n"], ["Par de giro", "nm"], ["Trabajo", "j"], ["Energía", "j"], ["Potencia", "w"]],
      "La fuerza y el peso se miden en newtons; el par en N·m; trabajo y energía en julios; la potencia en vatios (J/s).",
    ),
    pick("check-pot", "Más par, menos velocidad", "Un motor de potencia constante de 2 kW se conecta a un reductor que reduce la velocidad a la mitad. Sin pérdidas, ¿qué ocurre con el par?",
      "Se duplica, porque P = M·ω se mantiene",
      [["Se reduce a la mitad", "Si ω baja a la mitad y P es la misma, M debe subir al doble."], ["No cambia", "Sin cambio de par la potencia caería a la mitad."], ["Se anula", "El par no se anula."]],
      "Con $P = M\\omega$ constante, si $\\omega$ se divide por 2, $M$ se multiplica por 2: así funciona un reductor.",
    ),
  ],
};
