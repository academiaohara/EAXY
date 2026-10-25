import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sensoresTransductoresLesson: InteractiveLesson = {
  slug: "sensores-transductores",
  title: "3. Sensores y transductores",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Medir el mundo físico", [
      { kind: "definition", text: "Un **sensor** detecta una variable física (luz, temperatura, distancia, presión, movimiento) y la convierte en una **señal eléctrica**. Un **transductor** es cualquier dispositivo que convierte una forma de energía en otra." },
      { kind: "steps", title: "Algunos sensores habituales", items: [
        "**Luz**: LDR (resistencia que baja con la luz), fotodiodo.",
        "**Temperatura**: NTC y PTC (resistencias que cambian con T), termopar, sensores digitales.",
        "**Distancia**: ultrasonidos (tiempo de eco) e infrarrojos.",
        "**Presión**: galgas extensométricas, piezoeléctricos.",
        "**Movimiento y posición**: PIR (infrarrojo pasivo), encoders, finales de carrera.",
      ] },
    ], undefined, "stack"),
    slide("divisor", "De la resistencia a la tensión", [
      { kind: "text", text: "La mayoría de sensores resistivos se montan en un **divisor de tensión**, para que el controlador lea una tensión." },
    ], anim("sensor-divisor-tension"), "split"),
    slide("habitacion", "Habitación virtual con sensores", [
      { kind: "text", text: "Cambia la luz, la temperatura y la distancia: cada sensor traduce la magnitud a una señal distinta. Observa la **lectura de 10 bits** (0–1023) que recibe el controlador." },
    ], tool("sensores-habitacion-explorador", { a: 100, b: 25, c: 100 }), "visual-top"),
    slide("parametros", "Características de un sensor", [
      { kind: "steps", items: [
        "**Rango**: valores mínimo y máximo que puede medir.",
        "**Sensibilidad**: cuánto cambia la señal por unidad de la magnitud (por ejemplo, 10 mV/°C).",
        "**Resolución**: la mínima variación que distingue.",
        "**Precisión y calibración**: cuánto se acerca a la realidad y cómo se ajusta contra un patrón.",
        "**Tiempo de respuesta**: lo que tarda en reaccionar.",
      ] },
      { kind: "formula", tex: "S = \\dfrac{\\Delta\\,\\text{señal}}{\\Delta\\,\\text{magnitud}}" },
    ]),
    calc("calc-sens", "Sensibilidad", "Un sensor de temperatura entrega $10$ mV por cada °C. ¿Cuántos mV cambia su salida si la temperatura sube $5\\ ^\\circ\\text{C}$?",
      nums(50), "$\\Delta V = S\\cdot\\Delta T = 10\\cdot 5 = 50$ mV.", "Multiplica sensibilidad por variación."),
    calc("calc-eco", "Distancia con ultrasonidos", "Un sensor de ultrasonidos mide un eco de $11\\,662\\ \\mu\\text{s}$. Con $v = 343$ m/s, ¿a qué distancia, en metros, está el obstáculo?",
      nums(2, 2.0, 2.0), "$d = v\\,t/2 = 343\\cdot 0{,}011662/2 \\approx 2$ m. Se divide entre 2 porque el sonido hace ida y vuelta.", "Ida y vuelta: divide entre 2."),
    sort("clasifica-sensor", "¿Qué mide?", "Asocia cada sensor con la magnitud que mide.",
      [["luz", "Luz", "amber"], ["tem", "Temperatura", "cobalt"], ["dis", "Distancia o presencia", "emerald"]],
      [["LDR", "luz"], ["Fotodiodo", "luz"], ["NTC", "tem"], ["Termopar", "tem"], ["Ultrasonidos", "dis"], ["PIR", "dis"]],
      "LDR y fotodiodo detectan luz; NTC y termopar, temperatura; ultrasonidos y PIR, distancia y presencia.",
    ),
    pick("check-calib", "Calibración", "Un sensor de temperatura marca 2 °C de más en todo su rango. ¿Qué es lo más adecuado?",
      "Calibrarlo contra un patrón y restar la desviación en el programa",
      [["Ignorarlo: 2 °C no importan nunca", "Depende de la aplicación; en un control fino sí importan."], ["Cambiar el actuador", "El fallo está en la medida, no en el actuador."], ["Subir la referencia 2 °C", "Compensaría un fallo con otro y haría el sistema poco fiable."]],
      "Un error sistemático (siempre el mismo) se corrige con la calibración.",
    ),
  ],
};
