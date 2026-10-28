import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sensoresDivisorTension3esoLesson: InteractiveLesson = {
  slug: "sensores-divisor-tension-3eso",
  title: "5. Sensores analógicos y divisor de tensión",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Sensores y actuadores", [
      { kind: "steps", items: [
        "Un **sensor** convierte una magnitud física (luz, temperatura, posición, sonido) en una señal eléctrica.",
        "Un **actuador** hace lo contrario: convierte una señal eléctrica en una acción (luz, movimiento, sonido).",
        "Sensores sencillos: **LDR** (luz), **NTC** (temperatura), **potenciómetro** (posición), **micrófono**.",
        "Actuadores: **LED**, **zumbador**, **motor**, **servo**, **relé**.",
      ] },
    ], undefined, "stack"),
    slide("divisor", "Del sensor a una tensión", [
      { kind: "rule", title: "Divisor de tensión", text: "Dos resistencias en serie reparten la tensión de la pila. La tensión sobre la segunda es:", formula: "Vout = Vin · R2 / (R1 + R2)" },
      { kind: "text", text: "Con un sensor como una de las resistencias, la tensión de salida cambia con la luz o la temperatura. Pruébalo." },
    ], tool("eso3-sensor-divisor-explorador"), "visual-top"),
    slide("analog", "Señales analógicas y digitales", [
      { kind: "compare",
        left: { title: "Analógica", text: "Puede tomar **cualquier valor** en un rango (por ejemplo, 0–5 V). Es la forma natural de los sensores.", tone: "info" },
        right: { title: "Digital", text: "Solo toma **dos valores**: alto (1) o bajo (0). Es la que entienden las puertas lógicas y los microcontroladores.", tone: "key" } },
    ]),
    calc("calc-div", "Divisor con R iguales", "Un divisor con dos resistencias iguales de 10 kΩ se alimenta con 5 V. ¿Cuántos V hay en la salida?", nums(2.5), "Vout = 5 · 10 / (10 + 10) = 2,5 V: la mitad.", "Con R iguales, Vout es la mitad."),
    calc("calc-div2", "Divisor con sensor", "R1 = 10 kΩ y el sensor (R2) vale 30 kΩ. Con Vin = 5 V, ¿cuántos V hay sobre el sensor?", nums(3.75), "Vout = 5 · 30 / (10 + 30) = 3,75 V.", "Vout = Vin · R2 / (R1 + R2)."),
    sort("clasifica-sensor", "¿Qué mide?", "Relaciona cada componente con la magnitud que detecta o la acción que realiza.",
      [["luz", "Luz", "amber"], ["tem", "Temperatura", "rose"], ["act", "Es un actuador", "emerald"]],
      [["LDR", "luz"], ["Fotodiodo", "luz"], ["NTC", "tem"], ["Termistor", "tem"], ["Zumbador", "act"], ["Motor", "act"], ["LED", "act"]],
      "Los sensores miden una magnitud; los actuadores realizan una acción.",
    ),
    pick("check-ldr", "La LDR", "Al aumentar la luz sobre una LDR, ¿qué ocurre con su resistencia?",
      "Disminuye",
      [["Aumenta", "Es al revés: más luz, menos resistencia."], ["Se mantiene", "Depende de la luz."], ["Se hace infinita", "Con poca luz crece, no con mucha."]],
      "La LDR es una resistencia que baja con la luz.",
    ),
  ],
};
