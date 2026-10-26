import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pruebasDepuracionRobot3esoLesson: InteractiveLesson = {
  slug: "pruebas-depuracion-robot-3eso",
  title: "8. Pruebas, depuración y optimización del robot",
  subtitle: TECESO3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un robot que no hace lo previsto", [
      { kind: "steps", items: [
        "**Prueba por partes**: primero cada sensor y cada motor por separado, y después todo junto.",
        "**Consola serie**: imprime los valores de los sensores para comprobar qué lee el robot.",
        "**Casos de prueba**: situaciones concretas con el resultado que esperas.",
        "**Cambia una cosa cada vez** y vuelve a probar.",
        "**Optimiza**: ajusta umbrales y velocidades para que sea más fiable y más rápido.",
      ] },
    ], undefined, "stack"),
    slide("pruebas", "Encuentra el error", [
      { kind: "text", text: "El robot no frena ante un obstáculo cercano. Ajusta el umbral hasta que superen todas las pruebas." },
    ], tool("eso3-robot-pruebas-explorador"), "visual-top"),
    slide("tipos", "Errores típicos de un robot", [
      { kind: "steps", items: [
        "**Cableado**: patillas cambiadas, mal contacto, sin masa común.",
        "**Alimentación**: pilas casi agotadas; los motores «hunden» la tensión y la placa se reinicia.",
        "**Umbrales** mal ajustados (luz, distancia).",
        "**Lógica**: un si … si no mal planteado o un caso sin cubrir.",
        "**Mecánica**: ruedas que patinan, centro de gravedad alto.",
      ] },
    ]),
    calc("calc-pasan", "Pruebas superadas", "Con el umbral de frenado en 10 cm, el robot supera las pruebas de «camino libre», «línea a la izquierda» y «línea a la derecha», pero falla con obstáculos a 12 cm y a 19 cm. De las 5 pruebas, ¿cuántas supera?", nums(3), "Supera 3 de 5.", "Cuenta las que pasan."),
    calc("calc-umbral", "Un umbral válido", "Para detectar un obstáculo a 19 cm se necesita un umbral mayor que 19 cm. ¿Cuál es el menor valor entero que sirve, en cm?", nums(20), "Con distancia < 20, los 19 cm se detectan: el menor valor entero es 20.", "La condición es «distancia < umbral»."),
    sort("clasifica-fallo", "¿Qué tipo de fallo es?", "Clasifica cada síntoma por su causa más probable.",
      [["ele", "Eléctrico o cableado", "amber"], ["pro", "Programa", "cobalt"], ["aju", "Ajuste de valores", "emerald"]],
      [["La placa se reinicia al arrancar los motores", "ele"], ["Un motor no gira nunca", "ele"], ["El robot gira a la derecha cuando debería a la izquierda", "pro"], ["Una condición nunca se cumple", "pro"], ["No frena a tiempo ante el obstáculo", "aju"], ["Detecta la línea con luz de sol y falla en interior", "aju"]],
      "Identificar el tipo de fallo ayuda a decidir dónde buscar.",
    ),
    pick("check-depura", "Un método", "Tu robot falla y no sabes por qué. ¿Cuál es la mejor primera acción?",
      "Probar cada sensor y cada motor por separado y mostrar sus valores",
      [["Cambiar todo el programa a la vez", "No sabrás qué ha cambiado."], ["Comprar otra placa", "Probablemente no es necesario."], ["Ignorar el fallo", "No se resuelve solo."]],
      "Aislar el problema es la base de la depuración.",
    ),
  ],
};
