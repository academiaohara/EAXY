import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const velocidadLinealAngularLesson: InteractiveLesson = {
  slug: "velocidad-lineal-angular",
  title: "7. Velocidad lineal y angular",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("mag", "Magnitudes del movimiento circular", [
      { kind: "facts", items: [
        { tex: "T", label: "periodo: tiempo de una vuelta (s)" },
        { tex: "f = 1/T", label: "frecuencia: vueltas por segundo (Hz)" },
        { tex: "n", label: "velocidad en rpm (revoluciones por minuto)" },
        { tex: "\\omega", label: "velocidad angular: ángulo por segundo (rad/s)" },
      ] },
      { kind: "rule", title: "Conversiones", formula: "\\omega = 2\\pi f = \\dfrac{2\\pi\\, n}{60}\\qquad f = \\dfrac{n}{60}\\qquad T = \\dfrac{1}{f}" },
      { kind: "text", text: "Una vuelta completa son $2\\pi$ rad $= 360^\\circ$. Por eso $1\\ \\text{rpm} = 2\\pi/60 \\approx 0{,}105$ rad/s." },
    ], undefined, "stack"),
    slide("lineal", "Velocidad lineal de un punto", [
      { kind: "rule", title: "Velocidad tangencial", text: "Un punto a distancia $r$ del eje recorre una circunferencia: cuanto más lejos, más rápido va, aunque la velocidad angular sea la misma.", formula: "v = \\omega\\cdot r" },
      { kind: "warning", title: "Unidades", text: "Para que $v = \\omega r$ salga en m/s, $\\omega$ debe estar en rad/s y $r$ en metros." },
    ]),
    slide("disco", "Disco giratorio", [
      { kind: "text", text: "Fija las rpm y mueve el punto desde el centro hacia el borde: ω es la misma en todo el disco, v crece con r. Pausa el giro para estudiar un instante." },
    ], tool("disco-giratorio-explorador", { a: 300, b: 15 }), "visual-top"),
    calc("calc-omega", "De rpm a rad/s", "Un motor gira a $3\\,000$ rpm. ¿Cuál es su velocidad angular en rad/s? (da el valor con 1 decimal)",
      nums(314.2, 314.16, 314), "$\\omega = 2\\pi\\cdot 3000/60 = 100\\pi \\approx 314{,}2$ rad/s.", "ω = 2π·n/60."),
    calc("calc-v", "Velocidad de un coche", "Una rueda de $0{,}60$ m de diámetro gira a $300$ rpm. ¿Con qué velocidad avanza el coche, en km/h? (1 decimal)",
      nums(33.9, 33.93, 34), "$\\omega = 2\\pi\\cdot 300/60 = 31{,}42$ rad/s; $v = \\omega r = 31{,}42\\cdot 0{,}30 = 9{,}42$ m/s $= 33{,}9$ km/h.", "r = 0,30 m; multiplica m/s por 3,6."),
    calc("calc-periodo", "Periodo", "Un ventilador gira a $1\\,200$ rpm. ¿Cuánto dura una vuelta, en segundos?",
      nums(0.05), "$f = 1200/60 = 20$ Hz; $T = 1/f = 0{,}05$ s.", "T = 1/f."),
    sort("clasifica-mag", "¿Qué magnitud es?", "Asocia cada valor con la magnitud que describe.",
      [["w", "Velocidad angular", "cobalt"], ["v", "Velocidad lineal", "amber"], ["f", "Frecuencia / periodo", "emerald"]],
      [["31,4 rad/s", "w"], ["5 rad/s", "w"], ["9,4 m/s", "v"], ["36 km/h", "v"], ["50 Hz", "f"], ["0,02 s por vuelta", "f"]],
      "rad/s describe ángulo por segundo; m/s o km/h, distancia por tiempo; Hz y s por vuelta, el ritmo del giro.",
    ),
    pick("check-radio", "Dos puntos del mismo disco", "Un disco gira a velocidad constante. Un punto A está a 5 cm del centro y otro B a 20 cm. ¿Qué se cumple?",
      "Tienen la misma velocidad angular, pero B tiene mayor velocidad lineal",
      [["A y B tienen la misma velocidad lineal", "La velocidad lineal depende del radio: v = ω·r."], ["A tiene mayor velocidad angular", "Todos los puntos de un sólido que gira comparten ω."], ["B tiene menor velocidad lineal por estar más lejos", "Al revés: cuanto más lejos del eje, más rápido se mueve."]],
      "El sólido gira como un todo (misma ω); la velocidad tangencial es proporcional a la distancia al eje.",
    ),
  ],
};
