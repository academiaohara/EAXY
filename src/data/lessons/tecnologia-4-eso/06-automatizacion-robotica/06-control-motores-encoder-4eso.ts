import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const controlMotoresEncoder4esoLesson: InteractiveLesson = {
  slug: "control-motores-encoder-4eso",
  title: "6. Control de motores: velocidad, par y encoder",
  subtitle: TECESO4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Motor y realimentación", [
      { kind: "steps", items: [
        "Un **motor de continua** gira más deprisa al subir la tensión media (**PWM**) y baja de velocidad al aumentar la carga.",
        "Un **encoder** cuenta los pulsos del eje y permite medir **velocidad y posición**.",
        "Con esa medida se cierra el lazo: el controlador **ajusta el PWM** para mantener la velocidad pedida.",
        "El **servo** incorpora ya un sensor de posición y un lazo cerrado interno; el **motor paso a paso** avanza en pasos fijos.",
      ] },
    ], undefined, "stack"),
    slide("pwm", "Velocidad con PWM", [
      { kind: "text", text: "Recuerda cómo el ciclo de trabajo del PWM cambia la tensión media y la velocidad." },
    ], tool("eso3-pwm-explorador"), "visual-top"),
    slide("enc", "Mide con el encoder", [
      { kind: "text", text: "Con los pulsos contados en un intervalo se calcula la velocidad del eje, la del robot y la potencia." },
    ], tool("eso4-motor-explorador"), "visual-top"),
    slide("tipos", "Qué motor elegir", [
      { kind: "steps", items: [
        "**DC con reductora**: mucho par a poca velocidad; robots móviles.",
        "**Servo**: ángulo preciso (0–180°); brazos y pinzas.",
        "**Paso a paso**: posición exacta sin sensor; impresoras 3D, CNC.",
        "**Brushless**: alto rendimiento y vida larga; drones y vehículos.",
      ] },
    ]),
    calc("calc-rpm", "Revoluciones", "Un encoder de 20 pulsos por vuelta cuenta 50 pulsos en 100 ms. ¿A cuántas rpm gira? ((50/20) · 600)", nums(1500), "2,5 vueltas en 0,1 s = 25 vueltas/s = 1 500 rpm.", "Pulsos entre pulsos por vuelta, por 600."),
    calc("calc-v", "Velocidad del robot", "Con una rueda de 65 mm de diámetro a 1 500 rpm, ¿qué velocidad lineal tiene, en m/s? (π · 0,065 · 1 500 / 60, redondea a un decimal)", nums(5.1), "π · 0,065 · 25 ≈ 5,1 m/s.", "Perímetro por vueltas por segundo."),
    calc("calc-pm", "Potencia mecánica", "Un motor da 0,05 N·m a 1 500 rpm. ¿Cuántos W de potencia mecánica? (par · 2π · rpm / 60, redondea a un decimal)", nums(7.9, 7.85), "0,05 · 157,08 ≈ 7,85 W.", "Potencia = par por velocidad angular."),
    sort("clasifica-motor", "¿Qué motor?", "Relaciona cada aplicación con el motor.",
      [["dc", "DC con reductora", "cobalt"], ["ser", "Servo", "amber"], ["pap", "Paso a paso", "emerald"]],
      [["Ruedas de un robot", "dc"], ["Cinta transportadora pequeña", "dc"], ["Giro de una pinza hasta 90°", "ser"], ["Timón de un avión de radiocontrol", "ser"], ["Posicionar el cabezal de una impresora 3D", "pap"], ["Máquina de grabado CNC", "pap"]],
      "Cada tipo prima una cualidad: fuerza, ángulo o precisión de pasos.",
    ),
    pick("check-enc", "Para qué el encoder", "¿Para qué se añade un encoder a un motor de un robot?",
      "Para medir la velocidad real y poder mantenerla aunque cambie la carga",
      [["Para que gire más deprisa", "No le da velocidad."], ["Para que consuma menos", "No es su función."], ["Para cambiar el sentido de giro", "Eso lo hace el puente en H."]],
      "Medir permite cerrar el lazo.",
    ),
  ],
};
