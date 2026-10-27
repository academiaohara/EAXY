import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const arquitecturaSistemaControl4esoLesson: InteractiveLesson = {
  slug: "arquitectura-sistema-control-4eso",
  title: "1. Arquitectura de un sistema de control",
  subtitle: TECESO4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Lazo abierto y lazo cerrado", [
      { kind: "text", text: "Observa cómo se construye un lazo de control cerrado, bloque a bloque." },
    ], anim("eso4-lazo-cerrado"), "text-top"),
    slide("bloques", "Los bloques", [
      { kind: "steps", items: [
        "**Consigna (referencia)**: el valor que se quiere conseguir.",
        "**Sensor**: mide la salida real del proceso.",
        "**Comparador**: calcula el **error** = consigna − medida.",
        "**Controlador**: decide la orden a partir del error (microcontrolador, PLC, circuito analógico).",
        "**Actuador**: ejecuta la orden (motor, resistencia calefactora, válvula).",
        "**Proceso o planta**: lo que se controla; sufre **perturbaciones** externas.",
      ] },
    ]),
    slide("lazo", "Compara los dos tipos", [
      { kind: "text", text: "Un calefactor con potencia fija (lazo abierto) frente a un termostato (lazo cerrado). Cambia la temperatura exterior." },
    ], tool("eso3-lazo-control-explorador"), "visual-top"),
    slide("comp", "Ventajas e inconvenientes", [
      { kind: "compare",
        left: { title: "Lazo abierto", text: "Sencillo y barato; no corrige errores ni perturbaciones. Ejemplos: tostadora con temporizador, lavadora con programa fijo.", tone: "info" },
        right: { title: "Lazo cerrado", text: "Mide y corrige: más preciso y estable, pero necesita sensor y más complejidad. Ejemplos: termostato, crucero del coche, piloto automático.", tone: "key" } },
    ]),
    calc("calc-error", "El error", "La consigna es 22 °C y el sensor mide 19,5 °C. ¿Cuánto vale el error, en °C?", nums(2.5), "22 − 19,5 = 2,5 °C.", "Consigna menos medida."),
    calc("calc-nbloques", "Bloques del lazo", "Un lazo cerrado tiene comparador, controlador, actuador, proceso y sensor. ¿Cuántos bloques hay en total?", nums(5), "Cinco bloques.", "Cuenta los bloques nombrados."),
    sort("clasifica-lazo", "¿Abierto o cerrado?", "Clasifica cada sistema.",
      [["abi", "Lazo abierto", "amber"], ["cer", "Lazo cerrado", "emerald"]],
      [["Semáforo con tiempos fijos", "abi"], ["Lavadora con programa fijo", "abi"], ["Tostadora con temporizador", "abi"], ["Termostato de una caldera", "cer"], ["Control de crucero del coche", "cer"], ["Aire acondicionado con sensor", "cer"]],
      "Si hay realimentación (sensor que mide la salida), es lazo cerrado.",
    ),
    pick("check-pert", "Perturbación", "Se abre una ventana en una habitación con termostato. ¿Cómo responde el lazo cerrado?",
      "Detecta que baja la temperatura y aumenta la potencia del calefactor",
      [["No se entera hasta que lo ajusta una persona", "Eso es lazo abierto."], ["Apaga el calefactor", "Haría lo contrario."], ["Se rompe", "No es lo que ocurre."]],
      "La realimentación permite compensar perturbaciones.",
    ),
  ],
};
