import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const formasTransformacionesEnergiaFq2Lesson: InteractiveLesson = {
  slug: "formas-transformaciones-energia-fq2",
  title: "1. Formas y transformaciones de la energía",
  subtitle: FQ2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "¿Qué es la energía?", [
      { kind: "steps", items: [
        "La **energía** es la **capacidad** que tiene un cuerpo o un sistema para producir **cambios**: mover cosas, calentarlas, iluminarlas…",
        "Se mide en **julios (J)**. También se usan la **caloría** (1 cal = 4,18 J) y el **kilovatio-hora** (kWh) en la factura eléctrica.",
        "Hay muchas **formas** de energía: **cinética**, **potencial**, **térmica**, **química**, **eléctrica**, **luminosa**, **nuclear**, **sonora**.",
        "Es una **magnitud escalar**: tiene valor pero no dirección.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cadenas de energía", [
      { kind: "text", text: "Elige un sistema y sigue cómo la energía pasa de una forma a otra." },
    ], tool("fq2-transformaciones-energia-explorador"), "visual-top"),
    slide("trans", "Transformaciones y transferencias", [
      { kind: "steps", items: [
        "La energía **no se crea ni se destruye**: se **transforma** de una forma en otra (un panel solar convierte luz en electricidad).",
        "También se **transfiere** de un cuerpo a otro: como **calor** (por diferencia de temperatura) o como **trabajo** (al aplicar una fuerza).",
        "En casi todas las transformaciones, **parte** de la energía se convierte en **calor** que no se puede aprovechar: se **disipa**.",
        "La energía total **se conserva**, pero no toda es **útil**.",
      ] },
    ]),
    calc("calc-kcal", "De caloría a julio", "Una cantidad de energía es de 100 cal. ¿Cuántos julios son? (1 cal = 4,18 J)", nums(418), "100 · 4,18 = 418 J.", "Multiplica por 4,18."),
    calc("calc-kwh", "Kilovatio-hora", "Una estufa de 2 kW funciona durante 3 horas. ¿Cuántos kWh consume?", nums(6), "E = P · t = 2 · 3 = 6 kWh.", "Potencia por tiempo."),
    sort("clasifica", "Forma de energía", "Asocia cada situación con la forma de energía principal.",
      [["cin", "Cinética", "cobalt"], ["pot", "Potencial", "amber"], ["qui", "Química", "emerald"], ["ele", "Eléctrica", "rose"]],
      [["Un coche en marcha", "cin"], ["Un balón que rueda", "cin"], ["Una maceta en un balcón", "pot"], ["Agua embalsada", "pot"], ["Los alimentos", "qui"], ["La gasolina", "qui"], ["La corriente en un cable", "ele"], ["Una pila cargada", "qui"]],
      "Cada forma se reconoce por lo que almacena o produce.",
    ),
    pick("check", "Sin crear energía", "¿Es posible crear energía de la nada?",
      "No: la energía solo se transforma o se transfiere",
      [["Sí, en las centrales eléctricas", "Las centrales transforman otras energías."], ["Sí, con una pila", "Una pila transforma energía química."], ["Sí, con el Sol", "El Sol transforma energía nuclear en luz y calor."]],
      "Principio de conservación de la energía: no se crea ni se destruye.",
    ),
  ],
};
