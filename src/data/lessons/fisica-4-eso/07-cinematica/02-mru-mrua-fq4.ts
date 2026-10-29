import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const mruMruaFq4Lesson: InteractiveLesson = {
  slug: "mru-mrua-fq4",
  title: "2. MRU y MRUA",
  subtitle: FQ4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("mru", "Movimiento rectilíneo uniforme", [
      { kind: "steps", items: [
        "**MRU**: trayectoria recta y **velocidad constante** (a = 0).",
        "Ecuación: **x = x₀ + v·t**. La gráfica x–t es una **recta** cuya pendiente es la velocidad; la v–t es una recta horizontal.",
        "Si la velocidad es negativa, el móvil se mueve en sentido contrario al eje.",
      ] },
    ], undefined, "stack"),
    slide("mrua", "Movimiento uniformemente acelerado", [
      { kind: "steps", items: [
        "**MRUA**: trayectoria recta y **aceleración constante**.",
        "**v = v₀ + a·t**; **x = x₀ + v₀·t + ½·a·t²**; y sin tiempo: **v² = v₀² + 2·a·Δx**.",
        "La gráfica x–t es una **parábola**; la v–t, una recta con pendiente a; la a–t, una recta horizontal.",
        "Si **a** y **v** tienen el mismo signo, el móvil **acelera**; si tienen signo contrario, **frena**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Encuentro de dos móviles", [
      { kind: "text", text: "Cambia las velocidades y aceleraciones de los dos móviles. ¿Cuándo y dónde se encuentran?" },
    ], tool("fq4-encuentro-explorador"), "visual-top"),
    slide("pasos", "Método para problemas", [
      { kind: "steps", items: [
        "**1.** Elige el **origen** y el **sentido positivo**, y anota el signo de cada dato.",
        "**2.** Escribe las **ecuaciones** de cada móvil (x₀, v₀, a).",
        "**3.** Para un encuentro, **iguala** posiciones; para una parada, impón **v = 0**.",
        "**4.** Resuelve y **comprueba** que el resultado tiene sentido (t ≥ 0, unidades).",
      ] },
    ], undefined, "stack"),
    calc("calc-mru", "Tiempo en MRU", "Un coche circula a 20 m/s. ¿Cuánto tarda en recorrer 500 m?", nums(25), "t = x/v = 500/20 = 25 s.", "t = x/v."),
    calc("calc-mrua", "Velocidad en MRUA", "Un coche parte del reposo con a = 3 m/s². ¿Qué velocidad tiene a los 8 s, en m/s?", nums(24), "v = a·t = 3·8 = 24 m/s.", "v = v₀ + a·t con v₀ = 0."),
    calc("calc-x", "Distancia en MRUA", "Un coche parte del reposo con a = 2 m/s². ¿Qué distancia recorre en 10 s, en m?", nums(100), "x = ½·a·t² = ½·2·100 = 100 m.", "x = ½·a·t²."),
    calc("calc-enc", "Encuentro", "A parte de x = 0 con 10 m/s y B parte de x = 300 m hacia A a 20 m/s (a = 0 los dos). ¿En qué instante se encuentran, en s?", nums(10), "10·t = 300 − 20·t → t = 10 s.", "Iguala x_A y x_B."),
    sort("clasifica", "MRU o MRUA", "Clasifica cada situación.",
      [["mru", "MRU (a = 0)", "cobalt"], ["mrua", "MRUA (a constante ≠ 0)", "rose"]],
      [["Un tren a 90 km/h constantes en recta", "mru"], ["Un coche que arranca con aceleración constante", "mrua"], ["Una cinta transportadora uniforme", "mru"], ["Un coche que frena con a constante", "mrua"], ["Una bola que rueda por un plano inclinado", "mrua"]],
      "Si la velocidad cambia de forma constante, es MRUA.",
    ),
    pick("check", "Gráfica", "En una gráfica x–t de un MRUA, ¿qué forma tiene la curva?",
      "Una parábola",
      [["Una recta", "Eso sería un MRU."], ["Una recta horizontal", "Indicaría reposo."], ["Una circunferencia", "No es el caso."]],
      "x depende del cuadrado del tiempo.",
    ),
  ],
};
