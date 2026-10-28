import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const conservacionEnergiaFq2Lesson: InteractiveLesson = {
  slug: "conservacion-energia-fq2",
  title: "3. Conservación de la energía",
  subtitle: FQ2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "La energía se conserva", [
      { kind: "steps", items: [
        "**Principio de conservación de la energía**: la energía **no se crea ni se destruye**, solo se **transforma** y se transfiere.",
        "En una caída **sin rozamiento**, la **energía mecánica** (Ep + Ec) **se mantiene constante**.",
        "Lo que **pierde** la energía potencial lo **gana** la cinética, y al revés si el cuerpo sube.",
        "Así se explican las **montañas rusas**, los **péndulos** y los saltos de trampolín.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Una bola en una rampa", [
      { kind: "text", text: "Mira cómo cambian la energía potencial y la cinética durante la bajada, y su suma." },
    ], anim("fq2-conservacion-energia"), "visual-top"),
    slide("explora", "Con y sin rozamiento", [
      { kind: "text", text: "Cambia la altura de la bola. Compara el caso sin rozamiento con el caso en que parte de la energía se pierde como calor." },
    ], tool("fq2-conservacion-energia-explorador"), "visual-top"),
    slide("roz", "Cuando hay rozamiento", [
      { kind: "steps", items: [
        "Con **rozamiento**, parte de la energía mecánica se convierte en **calor** (energía térmica) y se **disipa**.",
        "La energía mecánica **disminuye**, pero la energía **total** (mecánica + calor) **sigue siendo la misma**.",
        "Por eso un péndulo acaba **parándose** y una bola que rueda se **detiene**: la energía se ha ido en forma de calor.",
        "Ninguna máquina **real** aprovecha el 100 % de la energía.",
      ] },
    ]),
    calc("calc-v", "Velocidad al caer", "Una bola de 2 kg cae desde 10 m sin rozamiento. Al llegar al suelo toda su Ep se ha convertido en Ec (196 J). ¿Cuánto vale su velocidad, en m/s? (v = √(2·Ec/m), un decimal)", nums(14, 14.0), "v = √(2 · 196 / 2) = √196 = 14 m/s.", "Despeja v de Ec = ½ m v²."),
    calc("calc-ec", "Energía cinética a media altura", "La bola de 2 kg tiene 196 J de energía potencial arriba. A mitad de altura tiene 98 J de Ep. ¿Cuánta energía cinética tiene, en J?", nums(98), "196 − 98 = 98 J.", "La suma se conserva."),
    calc("calc-calor", "Calor disipado", "Una bola pierde 196 J de energía potencial y gana solo 150 J de energía cinética. ¿Cuántos julios se disipan como calor?", nums(46), "196 − 150 = 46 J.", "Resta la cinética de la liberada."),
    sort("clasifica", "Con o sin conservación", "Clasifica cada afirmación.",
      [["sin", "Caída sin rozamiento", "cobalt"], ["con", "Caída con rozamiento", "amber"]],
      [["La energía mecánica se conserva", "sin"], ["Ep + Ec es constante", "sin"], ["Toda la Ep se convierte en Ec", "sin"], ["Parte de la energía se transforma en calor", "con"], ["La energía mecánica disminuye", "con"], ["El cuerpo llega más despacio de lo previsto", "con"]],
      "El rozamiento disipa energía en forma de calor.",
    ),
    pick("check", "Péndulo", "¿Por qué un péndulo termina parándose?",
      "Porque el rozamiento transforma su energía mecánica en calor",
      [["Porque la energía desaparece", "La energía se conserva."], ["Porque la gravedad se agota", "La gravedad no se agota."], ["Porque pierde masa", "La masa no cambia."]],
      "La energía mecánica se disipa como calor por el rozamiento con el aire y el eje.",
    ),
  ],
};
