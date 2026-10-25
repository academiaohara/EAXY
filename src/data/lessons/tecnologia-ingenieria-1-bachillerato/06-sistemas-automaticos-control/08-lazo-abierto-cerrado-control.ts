import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const lazoAbiertoCerradoControlLesson: InteractiveLesson = {
  slug: "lazo-abierto-cerrado-control",
  title: "8. Sistemas de lazo abierto y lazo cerrado",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "Con y sin realimentación", [
      { kind: "compare",
        left: { title: "Lazo abierto", text: "La acción de control **no depende** de la salida real. No mide ni corrige. Ejemplos: temporizador de la lavadora, tostador, semáforo con tiempos fijos.", tone: "info" },
        right: { title: "Lazo cerrado", text: "Un sensor **mide la salida** y la compara con la referencia; el controlador actúa sobre el **error**. Ejemplos: termostato, crucero, mantenimiento de nivel.", tone: "key" } },
    ], anim("lazo-abierto-cerrado"), "split"),
    slide("termostato", "El mismo problema, dos soluciones", [
      { kind: "text", text: "Dos calefactores para la misma habitación: el rojo, con potencia fija calculada para un día normal; el verde, con termostato. Abre la ventana (perturbación) y compara. Cambia también la temperatura exterior." },
    ], tool("termostato-lazo-explorador", { a: 21, b: 5, n: 1 }), "visual-top"),
    slide("perturbacion", "Perturbaciones y corrección", [
      { kind: "text", text: "En lazo cerrado, la salida se desvía y el error crece; el controlador reacciona y la **corrige**. Cambia la perturbación y la ganancia del regulador en este modelo simplificado de control proporcional." },
    ], tool("lazo-perturbacion-explorador", { a: 50, b: -20, c: 10 }), "visual-top"),
    slide("limites", "Qué tipo elegir", [
      { kind: "compare",
        left: { title: "Lazo abierto: ventajas", text: "Sencillo, barato y estable. Basta si el proceso es predecible y no hay perturbaciones relevantes.", tone: "ok" },
        right: { title: "Lazo cerrado: ventajas", text: "Más preciso y capaz de compensar perturbaciones. Más complejo, más caro y puede volverse **inestable** si se corrige con demasiada agresividad.", tone: "warn" } },
      { kind: "text", text: "Un termostato **todo/nada** es la forma más sencilla de lazo cerrado; controles más finos (proporcional, PID) modulan la acción según el error." },
    ]),
    calc("calc-error", "Error en lazo cerrado", "La referencia es de $22$ °C y la habitación está a $20$ °C. ¿Cuánto vale el error $e = r - y$ en °C?",
      nums(2), "$e = 22 - 20 = 2\\ ^\\circ\\text{C}$. Es positivo: hay que calentar.", "e = r − y."),
    sort("clasifica-lazo", "Abierto o cerrado", "Clasifica cada sistema.",
      [["ab", "Lazo abierto", "cobalt"], ["ce", "Lazo cerrado", "emerald"]],
      [["Tostador con temporizador", "ab"], ["Semáforo con tiempos fijos", "ab"], ["Lavadora con duración fija del programa", "ab"], ["Termostato de calefacción", "ce"], ["Control de crucero", "ce"], ["Depósito con sensor de nivel que abre la entrada", "ce"]],
      "Si hay un sensor que devuelve la salida al controlador, es lazo cerrado.",
    ),
    pick("check-perturb", "Efecto de la ventana", "Se abre una ventana en invierno. ¿Qué hace cada sistema?",
      "El de lazo abierto no se entera y la habitación se enfría; el de lazo cerrado detecta el descenso y aporta más calor",
      [["Los dos se enteran y compensan", "El de lazo abierto no mide la temperatura, así que no puede enterarse."], ["Ninguno se entera", "El de lazo cerrado mide la temperatura real con su sensor."], ["El de lazo abierto compensa mejor", "Al revés: no tiene realimentación."]],
      "La realimentación permite reaccionar ante perturbaciones que nadie previó.",
    ),
  ],
};
