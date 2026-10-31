import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const graficasProblemasCinematicaFb1Lesson: InteractiveLesson = {
  slug: "graficas-problemas-cinematica-fb1",
  title: "5. Composición de movimientos y resolución de problemas",
  subtitle: FB1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("rel", "Movimiento relativo", [
      { kind: "steps", items: [
        "La velocidad **depende del sistema de referencia**. Si un sistema S' se mueve con velocidad **V** respecto a S: **v = v' + V** (suma vectorial).",
        "**Ejemplos**: un pasajero que camina en un tren; un avión con viento; una barca en un río; la lluvia vista desde un coche.",
        "**Principio de independencia**: los movimientos **perpendiculares** se estudian por separado (tiempo de travesía solo depende de la componente perpendicular).",
        "En **mecánica clásica** los tiempos y las distancias son los mismos en todos los sistemas inerciales (relatividad galileana).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cruza un río", [
      { kind: "text", text: "Cambia la velocidad de la barca, la de la corriente y la dirección de la proa. ¿Con qué proa se cruza más rápido? ¿Y para llegar justo enfrente?" },
    ], tool("fb1-barca-rio-explorador"), "visual-top"),
    slide("gr", "Interpretar gráficas", [
      { kind: "steps", items: [
        "**x–t**: pendiente = velocidad; curva hacia arriba = aceleración positiva; tramo horizontal = reposo; cruce de dos curvas = encuentro.",
        "**v–t**: pendiente = aceleración; **área** = desplazamiento (suma de áreas con signo); cruce con el eje = cambio de sentido.",
        "**a–t**: el área da la variación de velocidad.",
        "Pasar de una gráfica a otra: derivar (pendiente) o integrar (área).",
      ] },
    ], undefined, "stack"),
    slide("vial", "Seguridad vial", [
      { kind: "steps", items: [
        "**Distancia de reacción** = v·t_reacción (MRU durante ≈ 1 s). **Distancia de frenado** = v²/(2a), con a = μ·g.",
        "**Distancia de detención** = reacción + frenado. Crece con v²: al doblar la velocidad, la de frenado se **cuadruplica**.",
        "En una **persecución** (policía y coche): se igualan posiciones y se resuelve el tiempo de alcance.",
      ] },
    ], undefined, "stack"),
    calc("calc-tiempo", "Tiempo de travesía", "Una barca navega a 4 m/s perpendicularmente a las orillas de un río de 100 m de ancho. ¿Cuánto tarda en cruzar, en s?", nums(25), "t = 100/4 = 25 s (la corriente no influye).", "Solo cuenta la componente perpendicular."),
    calc("calc-deriva", "Deriva", "Con la corriente a 2 m/s y los 25 s de travesía, ¿cuánto se desplaza la barca aguas abajo, en m?", nums(50), "x = 2·25 = 50 m.", "Deriva = v_corriente · t."),
    calc("calc-rel", "Velocidad relativa", "Un tren va a 30 m/s y un pasajero camina por el pasillo a 2 m/s en el mismo sentido. ¿Qué velocidad lleva respecto al suelo, en m/s?", nums(32), "v = 30 + 2 = 32 m/s.", "Suma de velocidades."),
    calc("calc-pers", "Persecución", "Un coche A pasa a 20 m/s por un punto. 5 s después sale de allí un coche B a 30 m/s en el mismo sentido. ¿Cuánto tarda B en alcanzarlo desde que sale, en s?", nums(10), "A lleva 100 m de ventaja: 100/(30 − 20) = 10 s.", "Velocidad relativa 10 m/s."),
    sort("clasifica", "Qué lectura de la gráfica", "¿Qué se obtiene con cada operación sobre una gráfica?",
      [["pen", "Pendiente", "cobalt"], ["are", "Área bajo la curva", "emerald"]],
      [["Velocidad en x–t", "pen"], ["Aceleración en v–t", "pen"], ["Desplazamiento en v–t", "are"], ["Variación de velocidad en a–t", "are"], ["Velocidad instantánea (tangente)", "pen"], ["Distancia recorrida en v–t (con módulo)", "are"]],
      "Pendiente = derivada; área = integral.",
    ),
    pick("check", "Cruzar un río", "¿Con qué dirección de la proa se cruza un río en el menor tiempo?",
      "Perpendicular a las orillas, aunque la corriente arrastre la barca",
      [["Contra corriente", "Reduce la componente perpendicular."], ["A favor de la corriente", "No acorta la travesía."], ["Da igual", "Depende de la componente perpendicular."]],
      "t = anchura / v_perpendicular: máxima con proa a 90°.",
    ),
  ],
};
