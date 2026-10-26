import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pwmMotoresServos3esoLesson: InteractiveLesson = {
  slug: "pwm-motores-servos-3eso",
  title: "4. Controlar motores y servos con PWM",
  subtitle: TECESO3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Simular tensiones intermedias", [
      { kind: "text", text: "El PWM enciende y apaga la salida muy deprisa; la proporción de tiempo en alto fija la tensión media." },
    ], anim("eso3-pwm-ciclo"), "text-top"),
    slide("pwm", "PWM y servo", [
      { kind: "text", text: "Cambia el valor de analogWrite o el ancho del pulso de un servo." },
    ], tool("eso3-pwm-explorador"), "visual-top"),
    slide("actuadores", "Los actuadores más comunes", [
      { kind: "steps", items: [
        "**Motor de corriente continua**: gira más rápido con más tensión media (PWM). Se conecta mediante un **transistor** o un **driver**, nunca directamente al pin.",
        "**Servomotor**: gira a un **ángulo** concreto (0–180°) según el pulso que recibe.",
        "**Motor paso a paso**: gira por pasos exactos (impresoras 3D).",
        "**Zumbador**: suena con una señal; con PWM se puede cambiar el tono.",
      ] },
      { kind: "warning", title: "Cuidado", text: "Un pin de la placa da solo unos 20 mA. Un motor necesita más: hay que usar un transistor o un driver y una alimentación adecuada." },
    ]),
    calc("calc-pwm", "Tensión media", "Con analogWrite(pin, 204) en una placa de 5 V, ¿cuántos V de tensión media hay? (204 / 255 · 5)", nums(4), "204 / 255 = 0,8; 0,8 · 5 = 4 V.", "Valor entre 255 por 5 V."),
    calc("calc-duty", "Ciclo de trabajo", "analogWrite(pin, 64) da un ciclo de trabajo de aproximadamente… (en %, redondea)", nums(25), "64 / 255 ≈ 0,25 = 25 %.", "Valor entre 255."),
    calc("calc-servo", "Ángulo del servo", "Un pulso de 1,5 ms coloca el servo a… (en grados)", nums(90), "1 ms = 0°, 2 ms = 180°: 1,5 ms es la mitad, 90°.", "Interpola entre 1 ms y 2 ms."),
    sort("clasifica-act", "¿Qué actuador?", "Relaciona cada necesidad con el actuador.",
      [["mot", "Motor de continua", "cobalt"], ["ser", "Servo", "emerald"], ["pap", "Paso a paso", "amber"]],
      [["Hacer girar la rueda de un robot", "mot"], ["Un ventilador", "mot"], ["Mover el brazo de un robot a un ángulo", "ser"], ["Orientar una cámara", "ser"], ["Desplazar el cabezal de una impresora 3D", "pap"], ["Avanzar una cantidad exacta de pasos", "pap"]],
      "El de continua gira libre, el servo se posiciona y el paso a paso avanza por pasos.",
    ),
    pick("check-driver", "El driver", "¿Por qué no se conecta un motor directamente a un pin de la placa?",
      "Porque el pin da muy poca corriente y el motor necesita más",
      [["Porque el motor no funciona con 5 V", "Funciona, pero necesita más corriente."], ["Porque el pin lo apagaría siempre", "No es esa la razón."], ["No hay ninguna razón", "Podría dañar la placa."]],
      "Se usa un transistor o un driver que maneje la corriente del motor con la señal del pin.",
    ),
  ],
};
